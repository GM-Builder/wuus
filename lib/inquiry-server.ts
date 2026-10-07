import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';
import { CONSENT_VERSION, createOwnerGuard, RequestError, type InquiryInput, type SaveOutcome } from './inquiry';

const timeoutFetch: typeof fetch = (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(10_000) });

export function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new RequestError('Service configuration required.', 503);
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: timeoutFetch } });
}

export function inquiryConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && (process.env.WUUS_RATE_LIMIT_SECRET?.length ?? 0) >= 32);
}

export function allowedOrigin(origin: string | null) {
  const origins = ['https://webuntukusaha.com', ...(process.env.WUUS_ALLOWED_ORIGINS ?? '').split(',').map(value => value.trim()).filter(Boolean)];
  if (process.env.NODE_ENV !== 'production') origins.push('http://localhost:3000', 'http://localhost:3100', 'http://127.0.0.1:3100');
  return origin !== null && origins.includes(origin);
}

export async function saveInquiry(input: InquiryInput, request: Request): Promise<SaveOutcome> {
  // Only use Vercel's platform-owned header. Other hosts share a conservative bucket
  // until a trusted client-IP adapter is configured; x-forwarded-for is not trusted.
  const candidate = process.env.VERCEL === '1' ? request.headers.get('x-vercel-forwarded-for')?.trim() : undefined;
  const address = candidate && isIP(candidate) ? candidate : 'unavailable';
  const networkKey = createHmac('sha256', process.env.WUUS_RATE_LIMIT_SECRET!).update(address).digest('hex');
  const { data, error } = await serviceClient().rpc('submit_wuus_inquiry', {
    p_request_id: input.requestId, p_network_key: networkKey,
    p_payload: {
      hotel_name: input.hotelName, website_url: input.websiteUrl, contact_name: input.contactName,
      email: input.email, notes: input.notes, request_type: input.requestType,
      source: input.source, consent_version: CONSENT_VERSION,
    },
  });
  if (error || !['saved', 'duplicate', 'conflict', 'limited'].includes(data)) throw new Error('Inquiry storage unavailable.');
  return data as SaveOutcome;
}

export async function requireOwner(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createOwnerGuard({
    configured: Boolean(url && key), allowlist: process.env.WUUS_ADMIN_USER_IDS,
    verify: async token => {
      const client = createClient(url!, key!, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: timeoutFetch } });
      const { data, error } = await client.auth.getUser(token);
      return error ? undefined : data.user?.id;
    },
  })(request);
}
