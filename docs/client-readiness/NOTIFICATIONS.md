# Owner inquiry notifications

Migration `202610070002_inquiry_notifications.sql` adds an outbox written in the same transaction as each new inquiry. Visitor/nonowner database roles cannot read or mutate it. The email contains only a request ID and owner dashboard link; lead details remain behind owner authentication.

The form acknowledges a stored inquiry. Email failure never turns that stored lead into a failed submission. Next.js `after()` attempts delivery after the response. A fixed recipient/from address and server-only Resend key prevent a visitor selecting recipients or spending the email API on arbitrary messages.

Configure these separately for staging and production in the correct hosting account: `RESEND_API_KEY`, `WUUS_NOTIFICATION_FROM` (plain verified email address), `WUUS_OWNER_EMAIL` (one owner address). Verify the sender domain and its DNS in the provider's account; preserve existing mail MX/SPF/DKIM records. Do not put keys in Git/chat or use a visitor-supplied sender.

Admin `/admin/inquiries` shows provider configuration and pending/processing/provider-accepted/failed counts. Owner-only POST `/api/admin/notifications` retries up to five eligible jobs. Optional authenticated scheduler: GET `/api/cron/notifications` with `Authorization: Bearer <CRON_SECRET>`, at least 32 random characters. No scheduler is provisioned or billed automatically. Choose a frequency compatible with the commercial host and provider quotas (e.g. every 15 minutes). Without a scheduler, automatic recovery depends on the next valid retry/owner action; check admin/inbox twice each workday.

Jobs use a database lease and the same Resend idempotency key on retries. Backoff increases, automatic attempts stop at five, and retries stop after 23 hours from the first attempt. Resend retains idempotency keys for 24 hours, so do not automatically reissue old uncertain deliveries. Inspect provider history and recipient inbox before an owner manually resends. `sent` in storage means provider accepted, not delivery confirmed. No webhook or bounce tracking is claimed in this initial scope.

Release test: one synthetic inquiry → one outbox row → one provider ID → actual owner inbox receipt. Retry identical inquiry → no extra lead/email. Provider outage → lead remains visible + pending job. Nonowner and forged scheduler token → denied. Alert the owner through normal operational checks if failed count is nonzero. Existing legacy inquiries are not mass-emailed by migration.

Retention: deleting an inquiry cascades its outbox row. Also purge expired network buckets under the privacy retention process. Keep payment records under the separately verified obligations; do not delete those as lead correspondence.

Provider references: https://resend.com/docs/api-reference/emails/send-email and https://resend.com/docs/dashboard/emails/idempotency-keys
