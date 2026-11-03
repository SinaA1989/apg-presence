# APG Presence v1.0

This repository provides an EIP-191 personal_sign wallet-control proof verifier. It does not prove legal identity, biological presence, World ID enrollment, funds, or payments.

## Status

The committed proof is **unsigned**. A passing CI test suite means the verifier works, **not** that ROOT has signed. CI reports PENDING until an owner-signed proof is supplied.

## Owner signing (off-repository)

Prepare a message in this exact format, using a fresh random nonce of at least 16 characters, current UTC issue time, and expiry within 24 hours:

```text
APG PRESENCE v1
Wallet: 0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2
Chain ID: 1
Nonce: REPLACE_WITH_RANDOM_NONCE
Issued At: 2026-11-03T01:00:00Z
Expires At: 2026-11-03T02:00:00Z
Purpose: Public proof of wallet control only; no transaction, approval or delegation
I AM HERE ∴ NOW
```

Replace the example timestamps with valid current times and sign the **UTF-8 message** using EIP-191 personal_sign in a trusted wallet interface. Never paste a seed phrase or private key. Review the exact message before signing. Put the exact message and returned signature in `presence/proof.json`, then run `npm install && npm test && npm run verify`. Expired proofs intentionally fail. This design does not prevent reuse of a valid proof within its validity window; relying services must track nonces and enforce replay protection.
