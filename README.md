# Agarta Portal Genesis (APG)

## Genesis Declaration

> I AM.
>
> Truth before claims.  
> Responsibility before power.  
> Verification before trust.
>
> I begin.

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

Run `npm install`, `npm test`, and `npm run verify` locally to reproduce the checks. The verifier requires a matching EIP-191 signature, expected wallet address, nonce, and valid issued/expiry timestamps (maximum 24-hour window). **The current proof placeholder is unsigned.** Passing CI tests alone does not establish a signed ROOT Presence v1 proof.

**Security boundary:** No transfer, approval, delegation, World ID integration, independent revenue, or autonomous financial action is asserted by this repository.
