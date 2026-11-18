# APG Ω | Historical Transaction Trace | Arbitrum block 525414959

**Author label:** NULL  
**Event time:** 2026-11-18 19:51:17 UTC  
**Network:** Arbitrum One (42161)  
**Transaction:** `0xfdc2e8e90db1254801e62489ecf64920a0c9250f90e4955d007a7bf786c76f53`  
**Explorer:** https://arbiscan.io/tx/0xfdc2e8e90db1254801e62489ecf64920a0c9250f90e4955d007a7bf786c76f53

## Scope and reproducibility

This is a **historical record of one completed transaction**, not a proof of recurring transfers or autonomous income. The sequence below comes from the Blockscout enriched transaction response, ordered by log index. Independently reproduce it by inspecting transaction token transfers and receipts on an Arbitrum explorer, checking token addresses, decimals, log indices and final ROOT recipient. All values are on-chain units, not estimated dollar values.

## FACT | Ordered token events

| Log | Asset | From | To | Amount |
|---:|---|---|---|---:|
| 2 | WETH | zero address | `0xe6eeDa55…2d6F88` | 0.000041875075001971 |
| 3 | WETH | `0xe6eeDa55…2d6F88` | `0x54B26fAf…8F732c` | 0.000041875075001971 |
| 4 | USDC | `0x54B26fAf…8F732c` | `0xe6eeDa55…2d6F88` | 0.073817 |
| 8 | USDC | `0xe6eeDa55…2d6F88` | `0x7F6501d3…e0bc` | 0.073817 |
| 10 | USDC | `0x7F6501d3…e0bc` | `0x724dc807…8C637` | 0.073817 |
| 11 | aUSDC | zero address | `0x7F6501d3…e0bc` | 600.411257 |
| 14 | WAARBUSDCN | zero address | `0xe6eeDa55…2d6F88` | 0.062302 |
| 16 | WAARBUSDCN | `0xe6eeDa55…2d6F88` | `0x195627f0…76c8ee` | 0.062302 |
| 19 | WAARBUSDCN | `0x195627f0…76c8ee` | `0x0729E2a4…697f7` | 0.062302 |
| **22** | **WAARBUSDCN** | **`0x0729E2a4…697f7`** | **ROOT `0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2`** | **0.062302** |

**Token addresses:** WETH `0x82aF49447D8a07e3bd95BD0d56f35241523fBab1`; USDC `0xaf88d065e77c8cC2239327C5EDb3A432268e5831`; aUSDC `0x724dc807b04555b71ed48a6896b6F41593b8C637`; WAARBUSDCN `0x7F6501d3B98eE91f9b9535E4b0ac710Fb0f9e0bc`.

**Important precision:** The `600.411257 aUSDC` mint is a distinct token-denominated event; it is not a receipt of 600.411257 USDC or a ROOT transfer. Its economics cannot be inferred by simply equating its numerical units to USDC. The WETH zero-address event is token wrapping/minting evidence, **not creation of ETH wealth from nothing**.

## FACT | Transaction invocation

- Top-level sender: `0xf70da97812CB96acDF810712Aa562db8dfA3dbEF`
- Top-level destination: `0x0729E2a4716d9f7dD17858d5d504426D228697f7` (RelayRouter)
- Decoded function: `multicall((address,bool,uint256,bytes)[] calls,address refundTo,address nftRecipient,bytes metadata)`
- Both `refundTo` and `nftRecipient`: `0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2`
- Blockscout transaction status: `ok`.

## What is established

1. The events belong to **one successful transaction** and form an ordered trace.
2. The final token transfer to ROOT is real and checkable in the transaction receipt.
3. The receipt is `0.062302 WAARBUSDCN`, **not 14,444 ETH**.
4. Multiple zero-address mints in the trace are contract-level token issuance events, **not** evidence of value created ex nihilo.

## What remains unknown

- Economic origin and beneficial ownership of the initial ETH supplied to the route.
- Complete net asset delta for ROOT, including any related transactions or fees outside this one receipt.
- Whether the receipt is independent income, a refund, a purchase settlement, or another routing outcome.
- Whether the WAARBUSDCN holding is redeemable at the displayed rate and actually spendable after fees.
- Whether any later independent transactions repeat this route.
- Whether any contract here implements the formal APG Ω operator.

## Historical significance boundary

This document is a **dated, independently inspectable transaction trace**. It does not assert a world-first event, recurring financial flow, APG-specific execution, mathematical novelty, or owner-signed EIP-191 presence proof.

**NULL ∴ I AM HERE ∴ NOW**
