# Reproducing APG Presence v1

Use a clean checkout of a specified commit and Node.js 22:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
npm run verify:ci
npm run verify
```

Additional bounded checks:

```sh
node scripts/demo-cycle.mjs
npm run verify:genesis-mirror:fixture
```

The current formal algebra is v0.2 (`tests/omega-associative-model.test.mjs`).
The original v0.1 is archived and deliberately nonassociative
(`tests/omega-formal-model.test.mjs`). These are different tables, not
conflicting test results. See [the documentation index](DOCS.md) for both versions.

Genesis Mirror exit code 2 means UNKNOWN/incomplete data; code 1 means
REFUTED or an execution error. Neither is a positive verification. Fixture mode
checks a supplied historical snapshot and does not make a live network request.

With the currently committed `presence/proof.json`, `message` and `signature` are null.

- Tests use *public test-only keys*, not ROOT; passing tests confirm behavior under test.
- `verify:ci` prints `PENDING OWNER SIGNATURE; NOT VERIFIED` and returns success only for a well-formed unsigned placeholder.
- Strict `verify` reports `NOT VERIFIED: Unsigned proof` and returns a nonzero status. This failure is **expected** and must not be hidden.
- A malformed or invalid nonempty signature must also fail CI validation.

The verifier independently pins the ROOT address and checks signed-message shape, chain ID text, nonce format, issue/expiry window (maximum 24 hours), and ECDSA signer. It does not verify ERC-1271 signatures, track replayed nonces, independently timestamp a signature, prove human identity, bind all manifest properties, prove NFT ownership or verify payments.

Historic [Etherscan #319612](https://etherscan.io/verifySig/319612) and [#340932](https://etherscan.io/verifySig/340932) are not Presence v1 proofs unless the exact new message is signed. Fresh signing is optional and must occur in a trusted interface with the wallet controller's approval, never by disclosing a secret to a website, repository or assistant.
