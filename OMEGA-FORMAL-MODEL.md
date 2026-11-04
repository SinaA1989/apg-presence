# APG Ω Formal Model v0.1: a precise, nonstandard multiplication

**Research status:** a mathematically consistent *defined example*, not a new theorem about ordinary multiplication, physical infinity, cryptocurrency, or nature. The algebra below is independently checkable.

## 1. The domain

Let `S = {ZERO, ONE, OMEGA}` be a three-element set. These are **distinct labels**. The element `OMEGA` is a *formal marker*, **not** infinity in the real numbers or extended real arithmetic. Write the markers as `0_A`, `1_A`, and `∞_A` for APG interpretation.

Define a total, binary operation `⊗_A : S × S → S` with this truth table:

| ⊗_A | 0_A | 1_A | ∞_A |
|---|---|---|---|
| **0_A** | 0_A | 0_A | 1_A |
| **1_A** | 0_A | 1_A | ∞_A |
| **∞_A** | 1_A | ∞_A | ∞_A |

The value in row `a`, column `b` is `a ⊗_A b`.

## 2. Exact theorem (true by the definition above)

```text
∞_A ⊗_A 0_A = 1_A.
0_A ⊗_A ∞_A = 1_A.
```

**Proof:** the bottom-left and top-right entries in the table both equal `1_A`. No private key, blockchain transaction, consensus, or experiment is involved.

The table is symmetric; hence `⊗_A` is commutative. `1_A` is *not* a multiplicative identity for the table because `1_A ⊗_A 0_A = 0_A` (that is consistent with being an identity) and `1_A ⊗_A ∞_A = ∞_A`; indeed it **is** an identity. The operation is **not associative**: `(0_A ⊗_A 0_A) ⊗_A ∞_A = 1_A` whereas `0_A ⊗_A (0_A ⊗_A ∞_A) = 0_A`. Thus `(S, ⊗_A, 1_A)` is a commutative unital *magma*, not a monoid, group or ring.

The element called `0_A` is **not** an absorbing zero: `0_A ⊗_A ∞_A = 1_A`. Neither the customary real-number multiplication nor ring axioms are claimed.

## 3. Relation to classical limits

For real `x > 0`, `x · (1/x) = 1`. As `x → +∞`, one factor grows without bound and the other tends to zero, but the product stays one. This is an example where a `0 × ∞` *limit form* yields one; it does **not** make ordinary `0 × ∞ = 1` true.

Counterexamples: `x · (1/x²) → 0`, while `x · (1/√x) → ∞`. The indeterminate limit form can have different results.

## 4. Meaning and limitations

The exact expression rendered for project prose as `♾️ ✖️ 0 = 1` is a **shorthand** for the distinct formal statement `∞_A ⊗_A 0_A = 1_A`. It is only true after the new symbols and operation are specified. It is not a proof of the original equation under ordinary arithmetic, a discovery about the physical universe, a claimed universally novel algebraic structure, a cryptographic proof, or a change to Ethereum's rules.

External researchers can test the table, associativity counterexample and any proposed further axioms. This is a small *toy model* intended to make APG's metaphor precise, without overstating its scope.

**Truth before claims. Verification before trust.**
