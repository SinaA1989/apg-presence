# Three states, one repeatable cycle

**APG Ω · Educational example · Public author: NULL**

> A small model earns its meaning through a result anyone can reproduce.

This example applies the [formal APG model](../OMEGA-FORMAL-MODEL.md) to a rotating three-phase indicator. It demonstrates a group action, not a new algebra or a deployed autonomous process.

## The mapping

| Phase | Coordinate modulo 3 | APG label | One step later |
|---|---|---|---|
| READY | 0 | ONE | ACTIVE |
| ACTIVE | 1 | ZERO | REVIEW |
| REVIEW | 2 | OMEGA | READY |

For a state with coordinate i and a move of k steps, the resulting coordinate is (i+k) mod 3. A zero-step move is ONE, a one-step move is ZERO, and a two-step move is OMEGA. The code applies the operation from the canonical APG table rather than defining another table.

In particular, a one-step move followed by a two-step move returns any phase to itself. This is how ZERO ⊗ OMEGA = ONE appears in the example: the combined move is the identity. It does not mean that READY and ONE are ordinary arithmetic one, or that ZERO is arithmetic zero.

## Run it

From the repository root with Node.js 22, no extra dependency is needed for this example:

```sh
node scripts/demo-cycle.mjs
node --test tests/three-state-cycle.test.mjs
```

Expected output:

```text
READY -> ACTIVE -> REVIEW -> READY
Two steps from READY: REVIEW
Three steps from READY: READY
```

The reusable functions are [advance and composeSteps](../examples/three-state-cycle.mjs). Step counts must be nonnegative safe integers; invalid input is rejected. Composed moves are returned as a residue in 0..2. Full turn counts are intentionally not retained.

## What the tests establish

Tests compare all three starting phases against a separate rotation specification, check all 27 state-and-move composition cases, confirm return after three steps, and cover invalid input and the largest safe integer. The implementation reuses the documented algebra; the independent expectations help detect a mistaken mapping.

## Scope

This is useful for teaching cyclic symmetry or driving a visual phase indicator. An equally valid implementation uses ordinary addition modulo three; no superiority over that representation is claimed.

READY, ACTIVE and REVIEW are illustrative phase names. They do not certify readiness, successful execution, approval, completed review or any real project status. Because the action is reversible and has only three states, it is not an authorization system or a complete workflow engine. It has no wallet, network, signature, transaction or persistence operation.

[Review the formal model independently](https://github.com/SinaA1989/apg-presence/issues/15). Please distinguish feedback on this teaching example from claims about scientific novelty.

∴
