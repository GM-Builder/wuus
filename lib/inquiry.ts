export const INQUIRY_STATUSES = ['new', 'audit_prepared', 'review_sent', 'won', 'archived'] as const;
export const CONSENT_VERSION = '2026-10-07';
export const MAX_BODY_BYTES = 16_384;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];
export type InquiryInput = {
  requestId: string;
  hotelName: string;
  websiteUrl: string;
  contactName: string;
  email: string;
  notes: string;
  requestType: 'review' | 'proposal';
  source: 'hospitality' | 'review';
  consent: true;
};

export class RequestError extends Error {
  status: number;
  constructor(message: string, status = 400) { super(message); this.status = status; }
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new RequestError('Invalid request.');
  return value as Record<string, unknown>;
}

function field(value: unknown, label: string, max: number, required = true): string {
  if (typeof value !== 'string') throw new RequestError(`Please check ${label}.`);
  const result = value.trim();
  if ((required && !result) || result.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(result)) {
    throw new RequestError(`Please check ${label} (maximum ${max} characters).`);
  }
  return result;
}

export function calculateCommissionEstimate(revenue: number, commission: number, shift: number) {
  const safeRevenue = Number.isFinite(revenue) ? Math.max(0, revenue) : 0;
  const safeCommission = Number.isFinite(commission) ? Math.max(0, Math.min(100, commission)) : 0;
  const safeShift = Number.isFinite(shift) ? Math.max(0, Math.min(100, shift)) : 0;
  const commissionAmount = safeRevenue * safeCommission / 100;
  return { commission: Math.round(commissionAmount), saving: Math.round(commissionAmount * safeShift / 100) };
}

export function validateInquiry(value: unknown): InquiryInput {
  const input = object(value);
  if (input.companyWebsite !== undefined && field(input.companyWebsite, 'form', 200, false)) {
    throw new RequestError('Unable to accept this request.');
  }
  if (input.consent !== true) throw new RequestError('Please agree to the privacy statement.');
  const requestId = field(input.requestId, 'request ID', 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) {
    throw new RequestError('Please refresh the page and try again.');
  }
  const email = field(input.email, 'email', 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new RequestError('Please enter a valid email address.');
  const rawUrl = field(input.websiteUrl, 'hotel link', 2048);
  let websiteUrl: string;
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(rawUrl) ? rawUrl : `https://${rawUrl}`);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || !url.hostname.includes('.')) throw new Error();
    websiteUrl = url.href;
  } catch { throw new RequestError('Please enter a valid website, listing, or social profile link.'); }
  if (input.requestType !== 'review' && input.requestType !== 'proposal') throw new RequestError('Please choose a valid request type.');
  if (input.source !== 'review' && input.source !== 'hospitality') throw new RequestError('Invalid request source.');
  return {
    requestId, email, websiteUrl,
    hotelName: field(input.hotelName, 'hotel name', 160),
    contactName: field(input.contactName, 'your name', 120),
    notes: field(input.notes ?? '', 'message', 3000, false),
    requestType: input.requestType, source: input.source, consent: true,
  };
}

export async function readJson(request: Request): Promise<unknown> {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    throw new RequestError('Use application/json.', 415);
  }
  const length = request.headers.get('content-length');
  if (length && (!/^\d+$/.test(length) || Number(length) > MAX_BODY_BYTES)) throw new RequestError('Request too large.', 413);
  if (!request.body) throw new RequestError('Request body required.');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RequestError('Request too large.', 413);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body)); }
  catch { throw new RequestError('Invalid JSON.'); }
}

export function jsonResponse(body: unknown, status = 200, headers?: Record<string, string>) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

export type SaveOutcome = 'saved' | 'duplicate' | 'conflict' | 'limited';
type Dependencies = {
  ready: () => boolean;
  originAllowed: (origin: string | null) => boolean;
  save: (input: InquiryInput, request: Request) => Promise<SaveOutcome>;
};

export function createInquiryHandler(dependencies: Dependencies) {
  return async (request: Request): Promise<Response> => {
    try {
      if (!dependencies.originAllowed(request.headers.get('origin'))) return jsonResponse({ error: 'Request origin not allowed.' }, 403);
      const input = validateInquiry(await readJson(request));
      if (!dependencies.ready()) return jsonResponse({ error: 'The form is temporarily unavailable. Please email WUUS directly.' }, 503);
      const result = await dependencies.save(input, request);
      if (result === 'limited') return jsonResponse({ error: 'Too many requests. Please wait 15 minutes or email WUUS directly.' }, 429, { 'Retry-After': '900' });
      if (result === 'conflict') return jsonResponse({ error: 'This request changed during a retry. Please refresh and submit again.' }, 409);
      return jsonResponse({ received: true, requestId: input.requestId }, result === 'saved' ? 201 : 200);
    } catch (error) {
      if (error instanceof RequestError) return jsonResponse({ error: error.message }, error.status);
      return jsonResponse({ error: 'Your request could not be saved. Please try again or email WUUS directly.' }, 503);
    }
  };
}

export function isOwner(userId: string | undefined, allowlist: string | undefined): boolean {
  return Boolean(userId && allowlist?.split(',').map(id => id.trim()).filter(Boolean).includes(userId));
}

export function createOwnerGuard(dependencies: {
  configured: boolean; allowlist: string | undefined;
  verify: (token: string) => Promise<string | undefined>;
}) {
  return async (request: Request) => {
    const header = request.headers.get('authorization');
    if (!header?.startsWith('Bearer ') || header.length > 8192 || header.length === 7) throw new RequestError('Please sign in.', 401);
    if (!dependencies.configured || !dependencies.allowlist?.trim()) throw new RequestError('Admin configuration required.', 503);
    const userId = await dependencies.verify(header.slice(7));
    if (!userId) throw new RequestError('Please sign in again.', 401);
    if (!isOwner(userId, dependencies.allowlist)) throw new RequestError('Access denied.', 403);
  };
}

export function validateStatusChange(value: unknown) {
  const input = object(value);
  const id = field(input.id, 'inquiry ID', 40);
  if (!/^\d+$/.test(id) && !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)) throw new RequestError('Invalid inquiry ID.');
  if (!INQUIRY_STATUSES.includes(input.status as InquiryStatus)) throw new RequestError('Invalid inquiry status.');
  return { id, status: input.status as InquiryStatus };
}
