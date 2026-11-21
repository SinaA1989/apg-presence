# APG ONE v0.1 | Human + AI evidence ethics (research prototype)

**Public author: NULL.** This is a bounded offline research implementation, not a conscious AI, deployed contract, financial agent, or proof of a unique origin of intelligence.

Three principles:
- **Good thoughts / THINK:** check the shape of supplied evidence records.
- **Good words / SPEAK:** distinguish invalid records from unverified claims.
- **Good deeds / ACT:** no signing, approvals, transfers, delegation, wallet access, or network calls.

Run `node --test tests/apg-one.test.mjs` with Node.js 22. Existing `npm test` also discovers the tests.

Import `assess(record)` from `./agent.mjs`. All inputs are supplied assertions. The module **does not fetch or independently verify transaction receipts, events, balances, control or transferability**. Thus it **never reports FACT or spendable YES**. A malformed transaction hash returns REFUTED **for the submitted record only**, not as proof that a transfer never occurred. Other records remain UNKNOWN until an independently auditable verifier is implemented.

This research code cannot move assets, sign messages or establish ROOT income. No current spendable balance is claimed.

Ethical motto: Truth before claims; responsibility before power; verification before trust.
