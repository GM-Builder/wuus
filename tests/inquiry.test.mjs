import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiry, createInquiryHandler, createOwnerGuard, calculateCommissionEstimate, isOwner, validateStatusChange, MAX_BODY_BYTES } from '../lib/inquiry.ts';
import { requestIdentity, submitInquiry } from '../lib/inquiry-client.ts';

const payload = () => ({
  requestId: '5d3fe66a-4176-4b4f-bd83-3c6c2d3842c2', hotelName: 'Example Hotel',
  websiteUrl: 'example.com', contactName: 'Example Owner', email: 'OWNER@example.com',
  notes: '', requestType: 'review', source: 'review', consent: true, companyWebsite: '',
});
const request = (body = payload(), headers = {}) => new Request('https://webuntukusaha.com/api/inquiries', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://webuntukusaha.com', ...headers }, body: JSON.stringify(body),
});
const handler = (save, ready = true) => createInquiryHandler({ ready: () => ready, originAllowed: origin => origin === 'https://webuntukusaha.com', save });

test('normalizes business link and email without changing the requested service', () => {
  const validated = validateInquiry(payload());
  assert.equal(validated.websiteUrl, 'https://example.com/');
  assert.equal(validated.email, 'owner@example.com');
});

for (const [name, changes] of [
  ['consent missing', { consent: false }], ['consent string', { consent: 'true' }],
  ['invalid email', { email: 'no-email' }], ['unsafe URL', { websiteUrl: 'javascript:alert(1)' }],
  ['URL credentials', { websiteUrl: 'https://name:password@example.com' }],
  ['long notes', { notes: 'x'.repeat(3001) }], ['empty hotel', { hotelName: '  ' }],
  ['invalid source', { source: 'spoof' }], ['invalid request type', { requestType: 'ai' }],
  ['honeypot', { companyWebsite: 'spam.example' }], ['invalid retry ID', { requestId: 'same' }],
]) {
  test(`${name} is rejected before persistence`, async () => {
    let called = false;
    const response = await handler(async () => { called = true; return 'saved'; })(request({ ...payload(), ...changes }));
    assert.equal(response.status, 400); assert.equal(called, false);
  });
}

test('success waits for confirmed persistence', async () => {
  let resolve;
  const pending = new Promise(done => { resolve = done; });
  let complete = false;
  const responsePromise = handler(async () => { await pending; return 'saved'; })(request()).then(response => { complete = true; return response; });
  await new Promise(done => setTimeout(done, 10));
  assert.equal(complete, false); resolve();
  const response = await responsePromise;
  assert.equal(response.status, 201); assert.equal((await response.json()).received, true);
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

test('storage failure does not leak error or claim receipt', async () => {
  const response = await handler(async () => { throw new Error('secret database details'); })(request());
  assert.equal(response.status, 503);
  const result = await response.json(); assert.equal(result.received, undefined); assert.ok(!result.error.includes('secret'));
});

test('missing configuration fails closed without calling storage', async () => {
  let called = false;
  const response = await handler(async () => { called = true; return 'saved'; }, false)(request());
  assert.equal(response.status, 503); assert.equal(called, false);
});

for (const [outcome, status] of [['duplicate', 200], ['conflict', 409], ['limited', 429]]) {
  test(`${outcome} result maps to ${status}`, async () => {
    const response = await handler(async () => outcome)(request());
    assert.equal(response.status, status);
    if (outcome === 'limited') assert.equal(response.headers.get('retry-after'), '900');
  });
}

test('cross-origin or absent origin is rejected', async () => {
  for (const origin of ['https://attacker.example', 'null', '']) {
    const response = await handler(async () => { assert.fail('must not persist'); })(request(payload(), { Origin: origin }));
    assert.equal(response.status, 403);
  }
});

test('oversized body is rejected even without content-length', async () => {
  const response = await handler(async () => { assert.fail('must not persist'); })(request({ ...payload(), notes: 'x'.repeat(MAX_BODY_BYTES) }));
  assert.equal(response.status, 413);
});

test('invalid JSON and media type fail before storage', async () => {
  const invoke = handler(async () => { assert.fail('must not persist'); });
  const response = await invoke(new Request('https://webuntukusaha.com/api/inquiries', { method: 'POST', headers: { Origin: 'https://webuntukusaha.com', 'Content-Type': 'application/json' }, body: '{' }));
  assert.equal(response.status, 400);
  assert.equal((await invoke(request(payload(), { 'Content-Type': 'text/plain' }))).status, 415);
});

test('owner allowlist is exact, nonempty and server controlled', () => {
  assert.equal(isOwner('owner-id', ' other, owner-id '), true);
  for (const [user, list] of [[undefined, 'owner-id'], ['owner-id', ''], ['owner-id', undefined], ['owner', 'owner-id'], ['other-id', 'owner-id']]) assert.equal(isOwner(user, list), false);
});

test('admin requires a verified token and rejects non-owner identities', async () => {
  const ownerRequest = token => new Request('https://webuntukusaha.com/api/admin/inquiries', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  let verifications = 0;
  const verify = async token => { verifications++; return token === 'valid-owner-token' ? 'owner-id' : token === 'valid-other-token' ? 'other-id' : undefined; };
  const guard = createOwnerGuard({ configured: true, allowlist: 'owner-id', verify });
  await assert.rejects(guard(ownerRequest()), error => error.status === 401);
  assert.equal(verifications, 0);
  await assert.rejects(guard(ownerRequest('forged')), error => error.status === 401);
  await assert.rejects(guard(ownerRequest('valid-other-token')), error => error.status === 403);
  await guard(ownerRequest('valid-owner-token'));
  const closed = createOwnerGuard({ configured: true, allowlist: '', verify: async () => { assert.fail('must not verify'); } });
  await assert.rejects(closed(ownerRequest('valid-owner-token')), error => error.status === 503);
});

test('status changes reject invalid status and filter injection', () => {
  assert.deepEqual(validateStatusChange({ id: '123', status: 'review_sent' }), { id: '123', status: 'review_sent' });
  assert.throws(() => validateStatusChange({ id: '123', status: 'paid' }));
  assert.throws(() => validateStatusChange({ id: '1,2', status: 'won' }));
});

test('browser retry keeps the ID until the payload changes', () => {
  const initial = requestIdentity({ hotel: 'Example' }, null);
  assert.deepEqual(requestIdentity({ hotel: 'Example' }, initial), initial);
  assert.notEqual(requestIdentity({ hotel: 'Different' }, initial).id, initial.id);
});

test('browser does not accept an HTTP error or unconfirmed success', async () => {
  const originalFetch = globalThis.fetch;
  try {
    for (const response of [Response.json({ error: 'Unavailable' }, { status: 503 }), Response.json({ received: false })]) {
      globalThis.fetch = async () => response;
      await assert.rejects(submitInquiry(payload()));
    }
    globalThis.fetch = async () => Response.json({ received: true }, { status: 201 });
    await submitInquiry(payload());
  } finally { globalThis.fetch = originalFetch; }
});

test('commission estimate cannot claim savings beyond commission or use negative/infinite revenue', () => {
  assert.deepEqual(calculateCommissionEstimate(9500, 15, 10), { commission: 1425, saving: 143 });
  assert.deepEqual(calculateCommissionEstimate(-100, 15, 10), { commission: 0, saving: 0 });
  assert.deepEqual(calculateCommissionEstimate(Infinity, 15, 10), { commission: 0, saving: 0 });
  assert.deepEqual(calculateCommissionEstimate(100, 200, 200), { commission: 100, saving: 100 });
});
