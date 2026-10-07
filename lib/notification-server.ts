import 'server-only';
import { serviceClient } from './inquiry-server';
import { notificationConfig, sendOwnerNotification } from './notification';

export async function dispatchNotifications(requestId: string | null = null) {
  const config = notificationConfig(process.env);
  if (!config) return { configured: false, accepted: 0, retryPending: 0 };
  const client = serviceClient();
  const { data, error } = await client.rpc('claim_wuus_notifications', { p_request_id: requestId, p_limit: requestId ? 1 : 5 });
  if (error) throw new Error('notification_queue_unavailable');
  let accepted = 0, retryPending = 0;
  for (const job of data ?? []) {
    let providerId: string | null = null, code: string | null = null;
    try { providerId = await sendOwnerNotification(config, job.request_id); }
    catch { code = 'provider_unconfirmed'; }
    const finished = await client.rpc('finish_wuus_notification', {
      p_request_id: job.request_id, p_lease_id: job.lease_id, p_provider_id: providerId, p_error: code,
    });
    if (finished.error || finished.data !== true) throw new Error('notification_ack_unconfirmed');
    if (providerId) accepted++; else retryPending++;
  }
  return { configured: true, accepted, retryPending };
}

export async function notificationHealth() {
  const counts: Record<string, number> = {};
  for (const status of ['pending', 'processing', 'sent', 'failed']) {
    const result = await serviceClient().from('wuus_inquiry_notifications').select('request_id', { count: 'exact', head: true }).eq('status', status);
    if (result.error) throw new Error('notification_queue_unavailable');
    counts[status] = result.count ?? 0;
  }
  return { configured: Boolean(notificationConfig(process.env)), counts };
}
