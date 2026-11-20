# APG Ω | Genesis Mirror Verification

This verifier is an adversarial, read-only companion to `GENESIS-MIRROR.md`.
It does not defend the narrative. It attempts to reproduce or refute a bounded
set of machine-readable claims.

## Verdicts

- `FACT`: every required field for the claim matches the supplied evidence.
- `REFUTED`: supplied evidence contradicts the claim.
- `UNKNOWN`: the required evidence was not returned or could not be read.

Absence of evidence never becomes `FACT`. An RPC outage never becomes
`REFUTED`.

## Deterministic reproduction

Run:

    npm ci --ignore-scripts
    npm test
    npm run verify:genesis-mirror:fixture

The committed minimal receipt snapshot records only the receipt fields and
ERC-20 `Transfer` logs required by the bounded claims. It identifies its public
RPC source and UTC observation time. It is evidence for reproducibility, not a
substitute for an independent live read.

## Independent live read

Set a Base JSON-RPC endpoint and run:

    BASE_RPC_URL=https://your-independent-base-rpc.example \
      npm run verify:genesis-mirror

The live verifier calls only `eth_chainId` and `eth_getTransactionReceipt`. It
does not hold a private key, sign a message, submit a transaction, request an
approval, or alter chain state.

## Scope boundary

The verifier tests receipt existence, successful execution, chain ID, block
number, and three exact ERC-20 `Transfer` logs. It does not establish current
ownership, current balances, transferability, liquidity, market value,
spendability, income to ROOT, human identity, or autonomous-agent operation.

## Files

- `evidence/genesis-mirror/claims.json`: expected, falsifiable claims.
- `evidence/genesis-mirror/receipt-minimal.json`: bounded public-RPC snapshot.
- `scripts/verify-genesis-mirror.mjs`: deterministic and live verifier.
- `tests/genesis-mirror.test.mjs`: fail-closed tests.

**Truth before claims. Presence before interpretation. Proof before conclusion.**
