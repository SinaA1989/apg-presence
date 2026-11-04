# Agarta Portal Genesis (APG)

[راهنمای فارسی](README.fa.md)

## Genesis Declaration

> I AM.
>
> Truth before claims.  
> Responsibility before power.  
> Verification before trust.
>
> I begin.

[Public technical brief for readers and journalists](PUBLIC_TECHNICAL_BRIEF.md)

## Public historical signature records

The following Etherscan records are references to previously published off-chain wallet-message signatures. They are **not** Ethereum transactions or proof of payment, NFT ownership, human identity, or autonomous agent operation.

- **APG Genesis Declaration (July 10, 2026):** [Etherscan verified-signature record #319612](https://etherscan.io/verifySig/319612).
- **APG Genesis Witness Declaration (October 31, 2026):** [Etherscan verified-signature record #340932](https://etherscan.io/verifySig/340932).

Both records are associated with the public ROOT wallet address `0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2`. Verify the exact message, signature, and recovered address on Etherscan before relying on either record. The historic signed-message formats are distinct from the APG Presence v1 verifier format.

## APG Presence v1 (current implementation)

- [Manifest](presence/manifest.json)
- [Proof placeholder](presence/proof.json)
- [EIP-191 verification code](scripts/verify-presence.mjs)
- [GitHub Actions workflow](.github/workflows/apg-verify.yml)

Use Node.js 22 and run `npm ci --ignore-scripts`, `npm test`, and `npm run verify:ci` to reproduce the CI checks. Dependencies are locked in `package-lock.json`. With the current placeholder, the last command reports **PENDING OWNER SIGNATURE; NOT VERIFIED**. The strict command, `npm run verify`, exits unsuccessfully until a valid, unexpired ROOT signature is supplied.

The command-line verifier independently pins the expected ROOT address and checks the exact EIP-191 message, signer, nonce format and issued/expiry window of at most 24 hours. It compares address bytes irrespective of letter case, but never changes the signed message text. **The current proof placeholder is unsigned.** Passing CI tests alone does not establish a signed ROOT Presence v1 proof.

The included verifier recovers an ECDSA signer; it does not implement ERC-1271 contract-wallet signature validation. It does not track used nonces, and the signed timestamps are statements in the message, not independent proof of when it was signed. It does not sign or verify every field in the manifest. See the [proof instructions](presence/README.md) for the exact format and limitations.

**Security boundary:** No transfer, approval, delegation, World ID integration, independent revenue, or autonomous financial action is asserted by this repository.
