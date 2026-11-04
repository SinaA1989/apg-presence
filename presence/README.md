# APG Presence v1.0

This repository checks an EIP-191 `personal_sign` message against the expected ROOT address. The command-line verifier pins that address independently of the manifest. It does not sign, send transactions, or prove a human identity, payment, NFT ownership, or present-day access to a key.

## Current status

The committed proof is **unsigned**. CI validates the manifest, runs tests, and explicitly reports `PENDING OWNER SIGNATURE; NOT VERIFIED` for a well-formed unsigned placeholder. CI success is not a signed ROOT proof.

With Node.js 22, run:

```sh
npm ci --ignore-scripts
npm test
npm run verify:ci
npm run verify
```

The last command is strict: an unsigned, invalid, future-dated or expired proof exits with a nonzero status. `verify:ci` allows only a well-formed empty placeholder; a populated but invalid proof still fails. A committed proof will eventually expire, so later CI runs will fail until it is renewed or the placeholder is restored.

## Owner signing (off-repository)

If a new proof is desired, prepare a message in this exact format, using a fresh random nonce of 16–128 ASCII letters, digits, `_` or `-`, current UTC issue time, and expiry within 24 hours:

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

Replace the example nonce and timestamps, review the exact UTF-8 text, then sign it with `personal_sign` in a trusted wallet interface. Preserve the exact signed text, including address letter case and line breaks, in `presence/proof.json` together with the returned signature. Address comparisons ignore letter case, but changing any character in the signed message invalidates its signature. Never enter a seed phrase or private key into this repository or a website.

The established ROOT display spelling above is not EIP-55 checksummed; its equivalent checksummed form is `0xc124e0B40d3AFA80836c146EB2919b617b4d6CB2`. Both spellings denote the same address bytes. Preserve whichever exact spelling was actually signed in the proof message.

## Verification limits

- Verification recovers an ECDSA signer; ERC-1271 contract-wallet verification is not implemented.
- The nonce format is checked, but this repository does not record used nonces or prevent replay. A service that uses a proof for authentication must generate and track its own challenges.
- Issued and expiry times are included in the signed text and evaluated using the verifier's clock; they are not independent evidence of when a signature was created. Expiration limits this verifier's acceptance and does not revoke a published signature elsewhere.
- The exact signed message includes the wallet address and chain ID text, but it does not bind all manifest fields or establish an on-chain transaction, token ownership, a transfer, or financial value.
- Historic Etherscan signature records use different message formats and cannot be substituted as a Presence v1 proof without signing the exact new message.
