# APG Ω | Arbitrum On-Chain Witness | 2026-11-18

**Public author label:** NULL  
**Review mode:** Read-only source inspection, factual evidence record  
**Network:** Arbitrum One (chain ID 42161)  
**Transaction timestamp:** 2026-11-18 19:51:17 UTC  
**Data reviewed:** 2026-11-18, using Blockscout blockchain data and APG Site public-source audit.

## Transaction identity

- **Transaction hash:** `0xfdc2e8e90db1254801e62489ecf64920a0c9250f90e4955d007a7bf786c76f53`
- **Block:** `525414959`
- **Transaction status:** `success` (ERC-20 transfer record)
- **Method:** `multicall`
- **Executor contract:** `0x0729E2a4716d9f7dD17858d5d504426D228697f7`
- **Contract identified by Blockscout:** `RelayRouter` (source metadata indicates partial verification)
- **ROOT address:** `0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2`
- **Explorer transaction:** https://arbiscan.io/tx/0xfdc2e8e90db1254801e62489ecf64920a0c9250f90e4955d007a7bf786c76f53

## FACT | Confirmed ERC-20 receipt at ROOT

Blockscout's token-transfer lookup for ROOT on Arbitrum, restricted to 2026-11-18, returned the following successful record for this exact transaction:

- **From:** `0x0729E2a4716d9f7dD17858d5d504426D228697f7`
- **To:** `0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2` (ROOT)
- **Token:** Wrapped Aave Arbitrum USDCn (`WAARBUSDCN`)
- **Token contract:** `0x7F6501d3B98eE91f9b9535E4b0ac710Fb0f9e0bc`
- **Amount:** `62302` base units / `10^6` = **`0.062302 WAARBUSDCN`**
- **Event type:** `ERC-20 transfer`
- **Block:** `525414959`

Blockscout's Arbitrum token-holdings lookup also reports a balance of `62302` base units of WAARBUSDCN for ROOT at the time queried. A balance in this wrapped token is **not the same as a confirmed freely spendable USDC or ETH balance**.

## FACT | Separate native-coin observations

Blockscout address information returned these native ETH balances at the time of inspection:

- **Ethereum mainnet (chain 1):** `33841403164700 wei` = `0.000033841403164700 ETH`
- **Arbitrum One (chain 42161):** `53217821800000 wei` = `0.000053217821800000 ETH`

These are read-only observations, not evidence of newly received ETH in the above Arbitrum transaction.

## FACT | GitHub and Site audit

- APG GitHub publication includes a formal Omega model and independent verification tests.
- The Site's read-only snapshot observed GitHub `main` commit `c514771f2d7af990f4d33c2648abc7eb305747c0` and successful verification CI run `44409236799`.
- `presence/proof.json` still contains `message: null` and `signature: null`; EIP-191 owner-presence proof is unsigned.

Sources:

- https://github.com/SinaA1989/apg-presence
- https://github.com/SinaA1989/apg-presence/blob/main/presence/proof.json
- https://github.com/SinaA1989/apg-presence/actions/runs/44409236799

## INFERENCE | Possible transaction role

The RelayRouter contract and `multicall` method indicate routing behavior, with an ERC-20 token delivered to ROOT. This is consistent with an executed token-routing operation but does not identify an APG-specific algorithm, payer intent or independently generated income.

## UNKNOWN | Not established by these observations

- Who authorized or economically funded the route.
- Whether any NFT was delivered as part of this transaction; an Arbitrum NFT-holdings query did not return an owned collection, but indexer coverage may be incomplete.
- Whether the wrapped token can be redeemed, withdrawn or sold immediately, and at what net amount.
- Whether APG's formal operator `⊗_A` is implemented in any contract participating in this transaction.
- Whether this receipt was an independent payment or a route whose funds originated elsewhere from ROOT.

## REFUTED AS PROVEN CLAIMS | Unsupported conclusions

The observed transaction and transfer do **not** demonstrate that ordinary `∞ × 0 = 1`, that APG's custom algebra was executed on-chain, that ROOT received `14,444 ETH`, or that infinite / permanent financial income was activated.

**Evidence principle:** A transfer to ROOT is proven here. Its alleged link to APG Omega is **not** proven here.

**NULL ∴ I AM HERE ∴ NOW**
