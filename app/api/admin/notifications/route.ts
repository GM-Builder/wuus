import { jsonResponse, RequestError } from '@/lib/inquiry';
import { requireOwner } from '@/lib/inquiry-server';
import { dispatchNotifications, notificationHealth } from '@/lib/notification-server';
export const runtime = 'nodejs';
export const maxDuration = 60;

function failure(error: unknown) {
  return error instanceof RequestError ? jsonResponse({ error: error.message }, error.status)
    : jsonResponse({ error: 'Notification service unavailable. Leads remain in the inquiry dashboard.' }, 503);
}
export async function GET(request: Request) {
  try { await requireOwner(request); return jsonResponse(await notificationHealth()); }
  catch (error) { return failure(error); }
}
export async function POST(request: Request) {
  try { await requireOwner(request); return jsonResponse(await dispatchNotifications()); }
  catch (error) { return failure(error); }
}
