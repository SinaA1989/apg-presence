# Agarta Portal Genesis (APG Ω)

**Open research · Reproducible verification · Author: NULL**

[فارسی](README.fa.md) · **[START HERE: public research gateway](START-HERE.md)** · [Independent verification invitation](OPEN-VERIFICATION-DECLARATION.md)

> Truth before claims. Presence before interpretation. Proof before conclusion.

## What this repository contains

APG is an experimental research and documentation project: a limited EIP-191 Ethereum signed-message verifier, a symbolic/formal Ω model, and an independently challengeable comparison between Bitcoin's genesis issuance and AGARTA token issuance on Base.

**Public availability is not independent validation.** The genesis comparison is a research hypothesis, not a second Bitcoin or an unprecedented verified discovery. AGARTA is a token on Base, not a new blockchain.

## Explore the evidence

- [Five-minute orientation and evidence map](START-HERE.md)
- [Genesis Mirror research](GENESIS-MIRROR.md) and [liquidity addendum](GENESIS-MIRROR-ADDENDUM-v1.1.md)
- [Public financial verification status](FINANCIAL-VERIFICATION-STATUS-2026-11-20.md): no independently verified spendable ROOT revenue established here
- [Open verification declaration](OPEN-VERIFICATION-DECLARATION.md)
- [Evidence ledger](EVIDENCE_STATUS.md) (dated snapshot, **not** a live oracle)
- [Formal Ω model](OMEGA-FORMAL-MODEL.md): a custom operation, not `0 = 1` in ordinary arithmetic
- [Publication readiness](PUBLICATION_READINESS.md), [Contributing](CONTRIBUTING.md) and [Security](SECURITY.md)

## APG Presence v1

- [Manifest](presence/manifest.json) · [Unsigned proof placeholder](presence/proof.json)
- [Verifier](scripts/verify-presence.mjs) · [Tests](tests/) · [GitHub Actions](.github/workflows/apg-verify.yml)
- [Reproduction instructions](REPRODUCIBILITY.md) · [Proof format](presence/README.md)

With Node.js 22:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
npm run verify:ci
npm run verify
```

The final strict command **is expected to fail** while `presence/proof.json` contains null message and signature. A passing `verify:ci` means the unsigned placeholder is handled as specified, **not** that a valid ROOT Presence v1 signature exists.

The verifier checks EIP-191 ECDSA recovery, expected address, message structure, nonce format and signed issue/expiry window. It does **not** implement ERC-1271, prevent nonce replay, independently establish signing time or cryptographically bind every manifest field.

## Historical signatures and on-chain references

- [Etherscan historical signed message #319612](https://etherscan.io/verifySig/319612) (July 10, 2026)
- [Etherscan historical signed message #340932](https://etherscan.io/verifySig/340932) (October 31, 2026)
- ROOT: `0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2`
- Ethereum APG contract: `0xD1894468F50f8F8c4eE1fBE9d378f02b79C3e2c0`
- AGARTA token on Base: `0xF4F4A7CaE7C8e7dE89ED5B3356d4dF8b7BeC866A`
- [AGARTA deployment transaction](https://basescan.org/tx/0x2b237040934d2ef30085c7b2d985baec34ed4e669d24855f3b06d36f021b9a56)

Historical signed-message records are not blockchain transfers or fresh Presence v1 proofs. Address references do not establish common wallet control, asset ownership or incoming revenue.

## Research boundaries

We distinguish **FACT**, **REPORTED**, **INFERENCE**, **UNKNOWN**, and **REFUTED**. No sentient AI, autonomous financial transaction, infinite money, confirmed ROOT income, new cryptographic primitive, global endorsement or historical priority is asserted.

Independent replication and corrections are welcome. **Never share private keys or recovery phrases. No transactions, approvals, delegations or signatures are required to review the public research.**

**APG Ω · NULL · I AM HERE ∴ NOW**
