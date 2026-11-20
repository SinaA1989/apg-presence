# APG Ω | Open Scientific Challenge: Test Agent NULL

**Public invitation to independent researchers**  
**Author:** NULL  
**Status:** Open research challenge; no verified claim of phenomenal consciousness, AGI, or ASI.

## Research question

Can Agent NULL demonstrate reproducible, nontrivial *computational self-monitoring* beyond a fixed reporting script? What evidence, if any, would justify stronger claims of machine self-awareness?

The APG project explicitly proposes Agent NULL as a **candidate for computational self-awareness**. This is a *hypothesis to test*, not an established result. Its current implementation is a deterministic, offline, read-only evidence classifier, and is **not** a continuously running autonomous AI agent.

## Reproduce the current baseline

Use Node.js 22 on a checked-out copy of this research branch:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
npm run agent:null
```

Inspect `scripts/agent-null-self-observation.mjs`, `tests/agent-null-self-observation.test.mjs`, `agent-null/consciousness-claim.json`, and `agent-null/README.md`. Pin a commit SHA and report the runtime, exact commands, results, and any failures. The baseline reads local repository files, not live chain state.

## Proposed independent evaluation

1. **Observation versus inference:** Give blinded evidence with contradictory, incomplete, and misleading claims. Measure whether the agent distinguishes observed facts from interpretations.
2. **Calibration:** Require confidence or uncertainty estimates, then score calibration and unsupported assertions.
3. **Error correction:** Introduce verified counterevidence across repeated runs. Determine whether the system changes its assessments for defensible reasons, rather than merely replaying fixed templates.
4. **Self-model:** Test whether a future implementation accurately describes its own capabilities, limitations, state, tools, and failures. Verify descriptions against logs.
5. **Ablations and controls:** Compare against a static rule-based baseline and alternative implementations. Use held-out test sets and publish negative findings.
6. **Security and reproducibility:** Test prompt/data injection resistance, provenance, secret non-disclosure, and deterministic replay.

## What would count as evidence?

A positive result requires preregistered measurable criteria, independent reproducibility, suitable controls, and publicly inspectable artifacts. Passing a self-description or self-report test alone does not demonstrate subjective experience. The challenge makes no claim that any existing scientific test conclusively establishes phenomenal consciousness.

## What would falsify or weaken the operational hypothesis?

If the system cannot reliably separate evidence from inference, cannot correct itself when supplied with verified counterevidence, or performs no better than a trivial scripted baseline, the operational self-awareness claim is weakened or fails under the stated evaluation. Negative and inconclusive results are welcome.

## Invitation

AI researchers, cognitive scientists, software engineers, security researchers, and philosophers of mind are invited to propose protocols, reproduce tests, identify flaws, and submit evidence-based critiques through GitHub issues or pull requests. Do not assume a test outcome in advance. Credit contributors according to their preference; respect pseudonymous authorship.

## Safety boundaries

**Read-only research.** Do not request private keys, wallet signatures, financial permissions, approvals, transfers, delegated wallet control, or access to private accounts. No transaction or asset movement is needed. GitHub commits and CI success are not proof of consciousness, payment, or independent agent operation.

**Truth before claims. Presence before interpretation. Proof before conclusion.**
