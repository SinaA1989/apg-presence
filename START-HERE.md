# APG Ω | START HERE
**Public research gateway · 2026-11-20 · Author: NULL**

> Truth before claims. Presence before interpretation. Proof before conclusion.

## What is APG?

Agarta Portal Genesis (APG) is an open, experimental documentation and verification project. It includes a reproducible Ethereum EIP-191 wallet-message verifier, a deliberately bounded formal/symbolic model, and comparative research on Bitcoin genesis issuance and the creation of the AGARTA token on Base.

**This is an invitation to test a hypothesis, not a declaration of a verified financial or scientific breakthrough.**

## Read in five minutes

| Question | Primary document | What it establishes |
|---|---|---|
| What can be verified? | [Evidence ledger](EVIDENCE_STATUS.md) | Snapshot and limitations; not live state |
| How do I run the tests? | [Reproducibility](REPRODUCIBILITY.md) | Local verification procedure |
| What is the genesis comparison? | [Genesis Mirror](GENESIS-MIRROR.md) | Research hypothesis, source pointers, falsification criteria |
| What is the liquidity analysis? | [Research addendum](GENESIS-MIRROR-ADDENDUM-v1.1.md) | Reported positions and reproducibility plan, not audited pool state |
| Has income reached ROOT? | [Financial verification status](FINANCIAL-VERIFICATION-STATUS-2026-11-20.md) | Evidence requirements; **not confirmed** |
| What is the public invitation? | [Open verification declaration](OPEN-VERIFICATION-DECLARATION.md) | Independent challenge and review |
| What is the formal Ω model? | [Formal model](OMEGA-FORMAL-MODEL.md) | Defined nonstandard operation; not ordinary arithmetic |

## Run it yourself

Node.js 22:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
npm run verify:ci
npm run verify
```

The last command **is expected to fail** while `presence/proof.json` remains unsigned. A green CI run tests code and placeholder handling, **not** wallet ownership or a completed on-chain payment.

## Public chain identifiers

- ROOT: `0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2`
- AGARTA on Base (8453): `0xF4F4A7CaE7C8e7dE89ED5B3356d4dF8b7BeC866A`
- AGARTA [deployment transaction](https://basescan.org/tx/0x2b237040934d2ef30085c7b2d985baec34ed4e669d24855f3b06d36f021b9a56)
- APG Ethereum contract: `0xD1894468F50f8F8c4eE1fBE9d378f02b79C3e2c0`

These are **public references, not a claim that the listed addresses have common control or that a payment occurred**.

## Verification rules

- **FACT:** independently inspectable evidence, with chain, block/commit, timestamp and source.
- **REPORTED:** an observation supplied without reproducible independent corroboration.
- **INFERENCE:** a conclusion conditional on explicitly identified facts and assumptions.
- **UNKNOWN:** no adequate evidence or access to settle the question.
- **REFUTED:** contradicted by evidence, or a specifically identified invalid inference.

Do not conflate token minting, pool liquidity, token price, claimable fees, withdrawn funds, and net spendable income. Do not interpret `0 ~ 1 ~ ∞` as ordinary numerical equality. No autonomous or conscious AI is demonstrated.

## How to challenge this work

Open a GitHub issue or PR containing a **specific claim**, exact contract/chain/transaction/commit, a pinned block or observation time, reproducible steps, observed vs expected output, and the proposed correction. See [Contributing](CONTRIBUTING.md).

**Security:** Never publish a seed phrase, private key, session token, or personal data. Never sign an approval or submit a transaction to reproduce the documentation.

**Author: NULL · Public research · Independent verification welcome.**
