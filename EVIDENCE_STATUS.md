# APG Evidence Status

Snapshot: 2026-11-05. This is an evidence ledger, not a live oracle.

| Claim | Status | Source and limit |
|---|---|---|
| Public APG repository and Git history | FACT | [History](https://github.com/SinaA1989/apg-presence/commits/main/): publication, not proof of claims |
| Public APG Ω declaration | FACT | [Commit](https://github.com/SinaA1989/apg-presence/commit/07a3ea5761d4e79ef2e8047fed3607395d27a56e): philosophical declaration |
| Ethereum APG contract | Independently checkable | [Blockscout](https://eth.blockscout.com/address/0xD1894468F50f8F8c4eE1fBE9d378f02b79C3e2c0) |
| Historical Etherscan messages | Historical records | [#319612](https://etherscan.io/verifySig/319612), [#340932](https://etherscan.io/verifySig/340932); different formats from Presence v1 |
| Current Presence v1 owner signature | **UNSIGNED** | [Proof placeholder](presence/proof.json) contains null fields |
| Automated tests and CI | Automation exists | [Workflow](.github/workflows/apg-verify.yml): passing tests do not sign as ROOT |
| Mathematical theorem ♾️ × 0 = 1 | **NOT ESTABLISHED** | See [formal model](OMEGA-FORMAL-MODEL.md) for an explicitly *different* multiplication operation |
| On-chain attestation of Ω document hash | **NOT PROVIDED** | Requires a separately authorized blockchain transaction |
| Independent revenue, NFT ownership, market adoption | **NOT ESTABLISHED HERE** | Need specific independent on-chain or third-party evidence |

**Independent reproduction:** Inspect a specific Git commit, run Node.js 22 `npm ci --ignore-scripts`, `npm test`, `npm run verify:ci`. The strict `npm run verify` is expected to fail on the unsigned placeholder. Verify contract state on an explorer independently. GitHub commit verification, CI, a historic Etherscan signature, and a new owner-signed Presence proof are four distinct facts.

No seed phrase, private key, transaction, approval, delegation, or spending is required for publication.
