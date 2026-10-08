# Payment route and receipt verification

Before accepting a deposit:

- [ ] Account is active and belongs to the verified supplier/payee.
- [ ] Provider permits the intended business use and country/currency route.
- [ ] Client can pay from their country using the agreed route.
- [ ] Fees, conversion, settlement currency and who absorbs deductions are written in the proposal.
- [ ] Current provider instructions are independently verified; no unverified IBAN/SEPA claims.
- [ ] A small real route test or provider confirmation is recorded. Reference/date: ____.
- [ ] PayPal held/pending funds are distinguished from cleared/available funds; no duplicate request is sent solely because a hold exists.

For each invoice:

- [ ] Open the bank/provider account directly; locate a cleared incoming transaction.
- [ ] Reconcile payee, amount, currency, sender/invoice reference and settlement date.
- [ ] Record credited invoice amount separately from net settlement amount/currency.
- [ ] Store the account statement/transaction reference privately. A sender's screenshot is insufficient.
- [ ] Record as VERIFIED and issue a receipt only after the above checks.
- [ ] Reconcile refunds/chargebacks separately; do not overwrite the original receipt.

Wise's guide explains transfers of IDR to Indonesian accounts. It does not establish that this owner has a Wise balance, EUR IBAN or eligibility for every client's route. Confirm the actual route/account before using it: https://wise.com/help/articles/2932330/guide-to-idr-transfers

Current recommendation and client instructions: [PAYMENTS.md](../PAYMENTS.md). For EUR/USD invoice settled in IDR, record the agreed recipient IDR amount, conversion source/time/expiry and invoice credit separately from net IDR. Payment note may not appear unchanged on a bank payout; reconcile transfer ID/amount/date directly. Fees agreed as supplier-borne do not turn an otherwise fully paid gross invoice into a client underpayment.
