# APG Research Claims Register v1.0

**Purpose:** preserve ideas and distinguish a documented statement from independent evidence. Recording an idea is not verification, medical validation, patent protection, or proof of novelty. No claim in this register authorizes a transaction, medical intervention, or clinical trial.

| ID | Claim or idea | Classification | Evidence and status | Next validation |
|---|---|---|---|---|
| APG-MATH-001 | In the three-element APG Ω magma, `∞_A ⊗_A 0_A = 1_A` | Formal definition / derived identity | Defined and checked by table in `OMEGA-FORMAL-MODEL.md`; tests in `tests/omega-formal-model.test.mjs` | Independent algebra review; novelty search if claimed |
| APG-MATH-002 | Ordinary `∞ × 0 = 1` | Unsupported ordinary-arithmetic statement | **Not established**. `0·∞` is an indeterminate limit form; not an ordinary real-number identity | Do not publish as a standard-arithmetic theorem |
| APG-CHAIN-001 | APG project artifacts are public in GitHub | Reproducible publication claim | Repository files, commits, PRs and CI can be inspected publicly | Pin reviewed commit SHA and release/tag |
| APG-PROOF-001 | A fresh signed ROOT Presence v1 proof exists | Cryptographic claim | **Not established by the unsigned placeholder** `presence/proof.json`; successful CI does not change that | Optional owner-signed proof, separately authorized |
| APG-BIO-001 | Returning a cell to a previous state or 'flow' could cure cancer | Biomedical hypothesis, terminology currently underspecified | **No clinical or preclinical evidence supplied here; not an established cancer treatment.** Cancer is heterogeneous; cellular reprogramming can also present oncogenic risks | Define cell type, mechanism, intervention, controls, safety, endpoints; literature review and appropriate ethics/regulatory oversight before any experiment |
| APG-INTERP-001 | 'Hold fast to the divine rope' may be interpreted as the umbilical cord | Personal symbolic / theological interpretation | Recorded as an interpretive analogy, **not** a demonstrated biological equivalence or authoritative religious interpretation | Compare original language and established exegesis; clearly label the author's interpretation |
| APG-PHIL-001 | 'I AM HERE ∴ NOW' represents presence and responsibility | Philosophical / artistic statement | Documented project motto; not a physics theorem or chain state transition | Preserve attribution and exact text |
| APG-NOVEL-001 | APG Ω is the first such algebra in history | Priority / novelty claim | **Not established** by GitHub timestamps, CI or a self-contained model | Literature search and independent peer review |
| APG-IMPACT-001 | APG changes Ethereum consensus or guarantees income | Technical / economic claim | **Not established** by the algebra or repository | Require protocol-level implementation/evidence or on-chain asset movement respectively |

## Evidence levels

- **DEFINED:** true by explicitly stated conventions or a truth table.
- **DERIVED:** follows logically from definitions, with a reproducible argument.
- **OBSERVED:** a dated, attributable public artifact or reproducible result exists.
- **HYPOTHESIS:** proposed mechanism awaiting appropriate testing.
- **INTERPRETATION:** a philosophical, literary, or religious reading.
- **UNVERIFIED:** independent evidence insufficient.
- **REFUTED / NOT APPLICABLE:** inconsistent with specified axioms or conflates different domains.

A successful GitHub Action shows that its configured checks passed on a particular commit. It is not a peer-reviewed publication, a proof of medical efficacy, a cryptographic wallet signature, or an Ethereum transaction.

**Security:** Read-only verification by default. Never upload private keys or seed phrases. Do not sign, spend, approve, delegate or deploy merely to make a publication claim.

**Truth before claims. Responsibility before power. Verification before trust.**
