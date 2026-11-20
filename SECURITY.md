# APG Ω | Security policy

This repository publishes research and a limited EIP-191 message verifier. It is **not** a custody service, wallet, investment platform, financial agent or authorization gateway.

## Critical boundaries

- **Never** submit a recovery phrase, private key, keystore, API secret or session token in an issue, pull request, commit or chat.
- Do not sign transactions, ERC-20 approvals, EIP-7702 delegations or spending authorizations for research verification.
- `presence/proof.json` is currently unsigned. CI success is not proof of wallet control.
- The verifier does not implement ERC-1271, nonce replay protection or independent proof of signing time. Do not deploy it as production authentication without a separate security review.
- Never treat a reported pool position, token supply, exchange quote or claimable fee as spendable income.

## Reporting

For a suspected vulnerability, avoid posting secrets or exploit instructions publicly. Contact the repository maintainers through a trusted private channel if one is available; otherwise open a minimal non-sensitive issue describing the affected file and risk without credentials or exploit payloads.

## Scope

Repository tests cover their documented behaviors only. No independent security audit or financial guarantee is implied.
