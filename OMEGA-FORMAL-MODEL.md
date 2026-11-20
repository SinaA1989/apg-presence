# APG Ω | A relation, with its rules visible

**Formal model · v0.2 · Public author: NULL**
[دفتر پژوهش فارسی](research/README.md) · [Original v0.1](research/archive/OMEGA-FORMAL-MODEL-v0.1.md)

> A precise statement carries its assumptions with it.

This revision preserves ZERO ⊗ OMEGA = ONE and makes the operation associative by changing exactly two entries. It is isomorphic to the known cyclic group C3. It is a formal construction, not a new law of ordinary multiplication or a claim of scientific priority.

## Domain and table

Let S = {ZERO, ONE, OMEGA} contain three distinct labels, also written 0_A, 1_A, Ω_A. OMEGA is a label, not physical or real-number infinity. ZERO is not an absorbing zero. ONE is the identity.

The following JSON is the canonical table consumed by the implementation. Indices use the order ZERO, ONE, OMEGA.

```json
[[2,0,1],[0,1,2],[1,2,0]]
```

| ⊗_A | 0_A | 1_A | Ω_A |
|---|---|---|---|
| **0_A** | Ω_A | 0_A | 1_A |
| **1_A** | 0_A | 1_A | Ω_A |
| **Ω_A** | 1_A | Ω_A | 0_A |

Relative to v0.1, only ZERO ⊗ ZERO = OMEGA and OMEGA ⊗ OMEGA = ZERO change. The archived table remains nonassociative; its existing tests retain that meaning.

## Existence and associativity

Define a bijection f to integers modulo 3 by f(ONE)=0, f(ZERO)=1, f(OMEGA)=2. Define:

$$a\otimes_A b=f^{-1}((f(a)+f(b))\bmod3).$$

Addition modulo 3 is associative and commutative, so this operation is too. Its identity is ONE. ZERO and OMEGA are mutual inverses. In particular, 0_A ⊗_A Ω_A = 1_A.

## Uniqueness within the stated assumptions

Assume the same three distinct elements, closure, associativity, two-sided identity ONE, commutativity and ZERO ⊗ OMEGA = ONE. Every element is invertible, hence the structure is a group. ZERO squared cannot equal ZERO (cancellation would make ZERO = ONE), and cannot equal ONE (uniqueness of inverses would make ZERO = OMEGA). It must equal OMEGA. The symmetric argument gives OMEGA squared = ZERO. All entries are therefore forced.

This is uniqueness on this labeled set under these assumptions, not uniqueness among all mathematical models. The result is C3 with different labels.

## Reproduce

With Node.js 22:

```sh
node --test tests/omega-associative-model.test.mjs
```

Tests read the canonical table through scripts/omega-associative-model.mjs, check the displayed Markdown table, evaluate all 27 associativity cases, verify the bijection to C3, and exhaust all nine assignments to the two free entries. Exactly one assignment satisfies associativity.

## Interpretation

The project shorthand ∞ × 0 = 1 refers, when explicitly so defined, to this custom relation. Ordinary multiplication has not been redefined. In classical limits, x(1/x)=1, x(1/x²)→0 and x(1/√x)→∞ as x→+∞; the 0·∞ limit form remains indeterminate.

No inference about consciousness, universal physics, financial value, token ownership or a blockchain execution follows from this algebra. The [philosophical text](research/PRESENCE-MIRROR.fa.md) carries the literary interpretation.

∴
