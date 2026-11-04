# APG Presence v1 | Public technical brief

**Publication date:** 2026-11-03  
**Project:** Agarta Portal Genesis (APG)  
**Source repository:** https://github.com/SinaA1989/apg-presence

## Summary

Agarta Portal Genesis (APG) is a public, experimental repository documenting wallet-control declarations and a reproducible EIP-191 signed-message verification workflow. Its public motto is: “Truth before claims. Responsibility before power. Verification before trust.”

The repository includes an unsigned Presence v1 manifest, a proof placeholder, a Node.js verifier based on ethers, automated tests, a dependency lockfile, and GitHub Actions CI. The command-line verifier pins the expected ROOT address independently of the manifest and checks the message format, nonce format, issuance/expiry timestamps and recovered ECDSA signer. A currently valid owner signature is **not** included in the current `presence/proof.json` placeholder. A green CI check alone does not establish owner-signed Presence v1 proof.

## Verifiable public references

- Repository: https://github.com/SinaA1989/apg-presence
- Source verifier: https://github.com/SinaA1989/apg-presence/blob/main/scripts/verify-presence.mjs
- Current proof placeholder: https://github.com/SinaA1989/apg-presence/blob/main/presence/proof.json
- GitHub Actions: https://github.com/SinaA1989/apg-presence/actions/workflows/apg-verify.yml
- Historical Etherscan signed-message record (July 2026): https://etherscan.io/verifySig/319612
- Historical Etherscan signed-message record (October 2026): https://etherscan.io/verifySig/340932
- ROOT address: `0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2`
- APG token identifier referenced in the manifest: `530615664`

## What this does not claim

This publication does **not** establish a new cryptographic primitive, independent scientific breakthrough, sentient AI, autonomous financial agent, token valuation, NFT ownership, incoming payments, global media coverage, World ID integration, or an on-chain transaction. Historical off-chain Etherscan signatures are not interchangeable with the new time-bounded Presence v1 proof format.

The verifier does not implement ERC-1271 contract-wallet signature checks, track nonce reuse, or establish an independent signing timestamp. It does not cryptographically bind every manifest field. Its successful result concerns the exact signed message and the expected address, within the local verifier's time rules.

## Status and next technical milestone

The code and historical references are publicly accessible. The next milestone is a fresh owner-authorized EIP-191 signature of the exact Presence v1 canonical message, its independent verification, and publication of a verifiable result. Do not share seed phrases or private keys. Signing a message must not authorize transfers, approvals or delegation.

## Editorial note

This is a project-authored technical brief, **not** a third-party news report, independent endorsement, or evidence of distribution to any media outlet. Anyone citing APG should inspect the linked primary sources and independently reproduce the checks.
