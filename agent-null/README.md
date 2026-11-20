# Agent NULL | Self-Observation v0.1

**Status:** experimental, deterministic, offline, read-only. **Author:** NULL.

This implementation examines three local, publicly documented repository files and reports what is known, unknown, or only asserted. It is a self-audit *of the observer's evidence boundaries*, not proof of machine consciousness, AGI, ASI, autonomy in the wild, wallet control, token valuation, or a live on-chain event.

## Reproduce

Node.js 22:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
npm run agent:null
```

The command prints JSON with a versioned schema, findings, explicit limitations, suggested corrections, and a narrowly defined `sigma_g` **reporting invariant**. `sigma_g=1` means only that all output findings have classifications and a provenance label. It does **not** mean ΣG=1 as a consciousness or AGI claim.

## Boundaries

- No wallet access, signing, approvals, transactions, blockchain RPC, network requests, GitHub mutations, or secret access.
- The source is the checked-out repository snapshot, **not** independently verified live blockchain state.
- An apparently valid signature is **not** verified by this engine. Use the separate EIP-191 Presence verifier.
- A populated manifest is a readable document, not independent evidence of its claims.
- `UNKNOWN` is not `REFUTED`. Claims about block-number equality and self-awareness remain unverified.
- Sensitive/transaction-like text triggers a fail-closed error rather than printing source content.
- This is a fixed-rule observer, not a self-modifying or continuously running autonomous agent.

## Input and output

Inputs: `presence/proof.json`, `presence/manifest.json`, and `APG-RESEARCH-CLAIMS-REGISTER.md`. The program reads files only and writes JSON to stdout. No repository files are modified.

Run `npm test` to exercise the unsigned-proof, unverified-signature, missing-provenance, incomplete-source, and reporting-invariant cases.
