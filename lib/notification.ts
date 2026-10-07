export type NotificationConfig = { key: string; from: string; to: string };
const address = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export function notificationConfig(env: Record<string, string | undefined>): NotificationConfig | undefined {
  const key = env.RESEND_API_KEY?.trim();
  const from = env.WUUS_NOTIFICATION_FROM?.trim();
  const to = env.WUUS_OWNER_EMAIL?.trim();
  if (!key || !from || !to || !address.test(from) || !address.test(to)) return undefined;
  return { key, from, to };
}

export async function sendOwnerNotification(config: NotificationConfig, requestId: string, transport: typeof fetch = fetch) {
  if (!/^[0-9a-f-]{36}$/i.test(requestId)) throw new Error('invalid_notification_id');
  const response = await transport('https://api.resend.com/emails', {
    method: 'POST', signal: AbortSignal.timeout(8_000),
    headers: { Authorization: `Bearer ${config.key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `wuus-inquiry/${requestId}` },
    body: JSON.stringify({ from: config.from, to: [config.to], subject: 'WUUS: new website inquiry',
      text: `A website inquiry has been saved.\n\nSign in to read and reply:\nhttps://webuntukusaha.com/admin/inquiries\n\nRequest ID: ${requestId}\n\nThis notification contains no guest contact details. Provider acceptance does not confirm inbox delivery.` }),
  });
  if (!response.ok) throw new Error(response.status === 429 ? 'provider_rate_limit' : 'provider_rejected');
  const result = await response.json();
  if (typeof result.id !== 'string' || !result.id || result.id.length > 300) throw new Error('provider_unconfirmed');
  return result.id as string;
}
