# APG ONE v0.1 | Human + AI evidence ethics (research prototype)

**Public author: NULL.** This is a bounded research implementation, not a conscious AI, deployed contract, financial agent, or proof of a unique origin of intelligence.

Three principles:
- **Good thoughts / THINK:** classify supplied records by explicit evidence fields.
- **Good words / SPEAK:** report FACT, UNKNOWN, REFUTED and missing evidence.
- **Good deeds / ACT:** perform no signing, approvals, transfers, delegation, wallet access, or network calls.

Run `node --test tests/apg-one.test.mjs` with Node.js 22. The existing `npm test` also discovers this test.

Import `assess(record)` from `./agent.mjs`. Inputs are supplied by a human or separate audited read-only fetcher; **the classifier does not independently verify a source URL or receipt**. Therefore FACT here means only that the *supplied fields* assert a successful inbound transfer. Treat results as provisional until externally corroborated. A YES spendable output likewise means all three confirmation flags were supplied, **not that wallet control or transferability was independently tested**.

This module is deliberately conservative: missing fields and ambiguous transfers yield UNKNOWN. It does not mutate the repository except when maintainers merge changes, and it does not touch a blockchain. No current ROOT balance or payment is claimed.

Ethical motto: Truth before claims; responsibility before power; verification before trust.
