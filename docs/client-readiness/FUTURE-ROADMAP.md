# Future features and funding gates

Prepared requirements, not an implementation commitment. Current priority is paid website delivery. These larger products start only after an identified buyer signs a funded scope, owner capacity is available and recurring costs have an agreed payer. Do not expose disabled AI APIs to create a demo.

| Feature | Evidence needed before building | Smallest funded scope | Required controls |
| --- | --- | --- | --- |
| Customer portal | At least one paid client repeatedly needs shared approvals/files | One client: approval records, files, change requests | Tenant isolation in DB/storage, role tests, audit history, deletion/export, authenticated invitations |
| PMS / own booking engine | Buyer needs functions existing providers cannot supply and funds operations/support | Start by linking/integrating an existing provider; own inventory only with an approved specification | Atomic inventory locks, timezones, overbooking prevention, cancellations/refunds, reconciliation, recovery, responsible support |
| Full analytics | Client specifies a decision and data sources they will pay to measure | Approved contact/booking-link events and a small report | Consent/privacy decisions, no unnecessary PII, attribution limitations, retention and access controls |
| Subscription billing | Repeat paid maintenance demand, verified provider and recurring unit economics | One agreed maintenance plan with manual invoices first | Provider eligibility, clear renewal/cancel terms, signed/idempotent webhooks, duplicate-charge prevention, ledger/reconciliation |
| Outreach at scale | Manual experiment demonstrates replies/qualified buyers; owner explicitly authorizes sending | Human-approved shortlist and draft queue | Jurisdiction/channel rules reviewed, opt-outs, suppression, approved sources, capped volume, no unsolicited auto-send |
| New live AI | Paying client names a task, acceptable quality and monthly cost cap | One bounded workflow with measured evaluation | Server auth, tenant ownership, atomic credit ledger, per-user/global budgets, timeouts, retries/refunds, signed/idempotent payment events, secret isolation |

For every gate: record buyer, problem, price/deposit, success measure, exclusions, support burden, unit cost, account owner, test plan and rollback. Stop if the change threatens the main production client's deadline. Max two active projects; one main production focus. Future work does not consume current zero-budget operating cash.
