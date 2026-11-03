# APG ROOT presence proof

The repository currently contains **no signed ROOT proof**. CI passing does not prove ROOT control. No World ID integration, transactions, approvals or delegation are included.

To create a proof, the owner must locally generate a random unique nonce (16–128 ASCII letters/digits/_/-), set `issued_at` and `expires_at` in UTC ISO 8601 seconds (max seven days apart), and sign the **exact** message below using EIP-191 `personal_sign` with ROOT. Never share private keys or seed phrases.

```text
APG Presence Proof v1
Address: 0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2
Nonce: <NONCE>
Issued At: <YYYY-MM-DDTHH:MM:SSZ>
Expires At: <YYYY-MM-DDTHH:MM:SSZ>
Purpose: Public proof of ROOT wallet control only; no transactions, approvals or delegation.
```

Fill `nx1-proof.json` with `schema: apg-presence/v1`, `status: SIGNED`, `message` containing `address`, `nonce`, `issued_at`, `expires_at`, and `signature` (65-byte 0x-prefixed hex). The verifier reconstructs the message exactly. Check the entire text before signing; do not sign permits or typed-data approvals.

**Security:** The proof is publicly replayable as evidence of the historical signature. Its expiration only limits this verifier's acceptance; it does not revoke a signature everywhere. CI tests use a public throwaway test key, not ROOT. A previously signed message with a different format cannot be substituted.
