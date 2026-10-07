// Isolated integration check: real local Postgres + a simulated Supabase HTTP
// adapter + the actual Next.js API. No production keys, databases or accounts.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn, execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';

const database = new PGlite();
const ownerId = '0b2e3106-11fd-470b-96f9-52953565b9df';
const base = 'http://127.0.0.1:3110';
let storageFailure = false;
let tableRequests = 0;
let app;
let appOutput = '';
const results = [];
const reply = (response, value, status = 200) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(value));
};
const mock = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/auth/v1/user') {
      const token = request.headers.authorization;
      const id = token === 'Bearer qa-owner-token' ? ownerId : token === 'Bearer qa-other-token' ? 'd3acdbd7-60bc-4308-8de6-5b099b0d30fe' : null;
      return id ? reply(response, { id, aud: 'authenticated', role: 'authenticated', email: 'qa@example.com', app_metadata: {}, user_metadata: {}, created_at: new Date().toISOString() })
        : reply(response, { message: 'Invalid token', code: 'bad_jwt' }, 401);
    }
    assert.equal(request.headers.apikey, 'qa-service-key');
    if (storageFailure) return reply(response, { message: 'Synthetic unavailable storage' }, 503);
    let body = '';
    for await (const chunk of request) body += chunk.toString();
    if (url.pathname === '/rest/v1/rpc/submit_wuus_inquiry') {
      const input = JSON.parse(body);
      const result = await database.query('SELECT public.submit_wuus_inquiry($1::uuid,$2::text,$3::jsonb) AS outcome', [input.p_request_id, input.p_network_key, JSON.stringify(input.p_payload)]);
      return reply(response, result.rows[0].outcome);
    }
    if (url.pathname === '/rest/v1/hospitality_inquiries') {
      tableRequests++;
      if (request.method === 'GET') {
        const result = await database.query('SELECT id,hotel_name,website_url,contact_name,email,notes,status,created_at,source,request_type,consent_at,consent_version FROM public.hospitality_inquiries ORDER BY created_at DESC LIMIT 500');
        return reply(response, result.rows);
      }
      if (request.method === 'PATCH') {
        const input = JSON.parse(body);
        const id = url.searchParams.get('id')?.replace(/^eq\./, '');
        const result = await database.query('UPDATE public.hospitality_inquiries SET status=$1 WHERE id=$2 RETURNING id,status', [input.status, id]);
        return reply(response, result.rows);
      }
    }
    reply(response, { message: 'Unknown QA endpoint' }, 404);
  } catch { reply(response, { message: 'QA adapter failed' }, 500); }
});

async function call(path, method, body, token, expected) {
  const response = await fetch(base + path, {
    method, headers: { 'Content-Type': 'application/json', Origin: base, ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(30_000),
  });
  const result = await response.json();
  assert.equal(response.status, expected, `${method} ${path}: ${JSON.stringify(result)}`);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  results.push(`${method} ${path} → ${expected}`);
  return result;
}

try {
  await database.exec('CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;');
  await database.exec(await readFile(new URL('../supabase/migrations/202610070001_secure_inquiries.sql', import.meta.url), 'utf8'));
  await new Promise(resolve => mock.listen(0, '127.0.0.1', resolve));
  const mockUrl = `http://127.0.0.1:${mock.address().port}`;
  app = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--port', '3110', '--hostname', '127.0.0.1'], {
    cwd: process.cwd(), windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1',
      NEXT_PUBLIC_SUPABASE_URL: mockUrl, NEXT_PUBLIC_SUPABASE_ANON_KEY: 'qa-anon-key',
      SUPABASE_SERVICE_ROLE_KEY: 'qa-service-key', WUUS_ADMIN_USER_IDS: ownerId,
      WUUS_RATE_LIMIT_SECRET: 'local-qa-secret-never-use-in-production-32',
      WUUS_ALLOWED_ORIGINS: base, VERCEL: '0',
    },
  });
  app.stdout.on('data', chunk => { appOutput = (appOutput + chunk.toString()).slice(-6000); });
  app.stderr.on('data', chunk => { appOutput = (appOutput + chunk.toString()).slice(-6000); });
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    if (app.exitCode !== null) throw new Error('QA app exited before ready.');
    try { ready = (await fetch(base + '/api/admin/inquiries', { signal: AbortSignal.timeout(1000) })).status === 401; }
    catch { /* local startup */ }
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  assert.ok(ready, 'QA app did not start; ensure no other next dev runs in this repository.');
  const payload = {
    requestId: randomUUID(), hotelName: 'WUUS QA ONLY', websiteUrl: 'example.com', contactName: 'QA Owner',
    email: 'qa@example.com', notes: 'Synthetic only', source: 'review', requestType: 'review', consent: true, companyWebsite: '',
  };
  assert.equal((await call('/api/inquiries', 'POST', payload, null, 201)).received, true);
  assert.equal((await call('/api/inquiries', 'POST', payload, null, 200)).received, true);
  await call('/api/inquiries', 'POST', { ...payload, notes: 'Changed retry' }, null, 409);
  const list = await call('/api/admin/inquiries', 'GET', undefined, 'qa-owner-token', 200);
  assert.equal(list.inquiries.length, 1);
  assert.ok(list.inquiries[0].consent_at);
  assert.equal(list.inquiries[0].consent_version, '2026-10-07');
  assert.equal(list.inquiries[0].website_url, 'https://example.com/');
  const readsBeforeDenied = tableRequests;
  await call('/api/admin/inquiries', 'GET', undefined, null, 401);
  await call('/api/admin/inquiries', 'GET', undefined, 'forged-token', 401);
  await call('/api/admin/inquiries', 'GET', undefined, 'qa-other-token', 403);
  await call('/api/admin/inquiries', 'PATCH', { id: String(list.inquiries[0].id), status: 'won' }, 'qa-other-token', 403);
  assert.equal(tableRequests, readsBeforeDenied, 'Denied identity reached the inquiry table.');
  await call('/api/admin/inquiries', 'PATCH', { id: String(list.inquiries[0].id), status: 'won' }, 'qa-owner-token', 200);
  assert.equal((await database.query('SELECT status FROM public.hospitality_inquiries')).rows[0].status, 'won');
  await call('/api/admin/inquiries', 'PATCH', { id: String(list.inquiries[0].id), status: 'paid' }, 'qa-owner-token', 400);
  await call('/api/admin/inquiries', 'PATCH', { id: '999999', status: 'won' }, 'qa-owner-token', 404);
  storageFailure = true;
  await call('/api/inquiries', 'POST', { ...payload, requestId: randomUUID() }, null, 503);
  await call('/api/admin/inquiries', 'PATCH', { id: String(list.inquiries[0].id), status: 'new' }, 'qa-owner-token', 503);
  storageFailure = false;
  await call('/api/inquiries', 'POST', { ...payload, requestId: randomUUID(), source: 'hospitality', requestType: 'proposal' }, null, 201);
  for (let index = 0; index < 3; index++) await call('/api/inquiries', 'POST', { ...payload, requestId: randomUUID() }, null, 201);
  await call('/api/inquiries', 'POST', { ...payload, requestId: randomUUID() }, null, 429);
  assert.equal((await database.query('SELECT count(*)::int AS total FROM public.hospitality_inquiries')).rows[0].total, 5);
  console.log(JSON.stringify({ passed: results.length, checks: results, limitation: 'Local Postgres with simulated Auth/PostgREST. Real Supabase staging and production still required.' }, null, 2));
} catch (error) {
  console.error(error.message);
  // All environment values here are synthetic; never add real user keys to this harness.
  if (appOutput) console.error(appOutput);
  process.exitCode = 1;
} finally {
  if (app?.pid && app.exitCode === null) {
    if (process.platform === 'win32') await new Promise(resolve => execFile('taskkill', ['/PID', String(app.pid), '/T', '/F'], { windowsHide: true }, () => resolve()));
    else app.kill('SIGTERM');
  }
  await new Promise(resolve => mock.close(resolve));
  await database.close();
}
