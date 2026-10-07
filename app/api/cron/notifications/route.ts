import { timingSafeEqual } from 'node:crypto';
import { jsonResponse } from '@/lib/inquiry';
import { dispatchNotifications } from '@/lib/notification-server';
export const runtime = 'nodejs';
export const maxDuration = 60;
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const token = request.headers.get('authorization') ?? '';
  const expected = `Bearer ${secret}`;
  if (!secret || secret.length < 32 || Buffer.byteLength(token) !== Buffer.byteLength(expected)
    || !timingSafeEqual(Buffer.from(token), Buffer.from(expected))) return jsonResponse({ error: 'Unauthorized.' }, 401);
  try { return jsonResponse(await dispatchNotifications()); }
  catch { return jsonResponse({ error: 'Notification processing unavailable.' }, 503); }
}
