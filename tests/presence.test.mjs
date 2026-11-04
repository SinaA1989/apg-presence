import test from 'node:test';
import assert from 'node:assert/strict';
import { Wallet } from 'ethers';
import { presenceStatus, ROOT, verifyPresence } from '../scripts/verify-presence.mjs';

// Public test-only keys; neither key controls ROOT or protects any assets.
const wallet = new Wallet('0x' + '11'.repeat(32));
const otherWallet = new Wallet('0x' + '22'.repeat(32));
const now = Date.parse('2026-11-03T12:00:00Z');
const options = { expectedAddress: wallet.address, now };
const manifest = {
  schema: 'apg-presence/v1', signatureScheme: 'EIP-191 personal_sign',
  chainId: 1, subject: wallet.address,
};

async function signedProof({
  address = wallet.address,
  signer = wallet,
  nonce = '0123456789abcdef0123456789abcdef',
  issued = '2026-11-03T11:00:00Z',
  expires = '2026-11-03T13:00:00Z',
} = {}) {
  const message = `APG PRESENCE v1\nWallet: ${address}\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${issued}\nExpires At: ${expires}\nPurpose: Public proof of wallet control only; no transaction, approval or delegation\nI AM HERE ∴ NOW`;
  return { schema: 'apg-presence-proof/v1', message, signature: await signer.signMessage(message) };
}

test('a valid signature passes the complete verifier', async () => {
  const proof = await signedProof();
  assert.equal(verifyPresence(manifest, proof, options), true);
  assert.equal(presenceStatus(manifest, proof, options), 'VERIFIED');
});

test('the published ROOT casing and non-checksummed message casing are accepted', async () => {
  const empty = { schema: 'apg-presence-proof/v1', message: null, signature: null };
  assert.equal(presenceStatus({ ...manifest, subject: ROOT }, empty), 'UNSIGNED');
  const chars = wallet.address.slice(2).split('');
  const index = chars.findIndex((character) => /[a-fA-F]/.test(character));
  chars[index] = chars[index] === chars[index].toLowerCase() ? chars[index].toUpperCase() : chars[index].toLowerCase();
  const alternateCase = '0x' + chars.join('');
  const proof = await signedProof({ address: alternateCase });
  assert.equal(verifyPresence({ ...manifest, subject: alternateCase }, proof, options), true);
});

test('a changed nonce fails while the original signed proof succeeds', async () => {
  const proof = await signedProof();
  assert.equal(verifyPresence(manifest, proof, options), true);
  const changed = { ...proof, message: proof.message.replace('0123456789abcdef0123456789abcdef', '1123456789abcdef0123456789abcdef') };
  assert.throws(() => verifyPresence(manifest, changed, options), /Signature mismatch/);
});

test('a valid signature by another wallet is rejected', async () => {
  const proof = await signedProof({ signer: otherWallet });
  assert.throws(() => verifyPresence(manifest, proof, options), /Signature mismatch/);
});

test('manifest subject cannot replace the independently expected address', async () => {
  const proof = await signedProof();
  assert.throws(() => verifyPresence(manifest, proof), /Unexpected manifest subject/);
  assert.throws(() => verifyPresence({ ...manifest, subject: otherWallet.address }, proof, options), /Unexpected manifest subject/);
  assert.notEqual(wallet.address, ROOT);
});

test('correctly signed expired and future proofs are rejected', async () => {
  const expired = await signedProof({ issued: '2026-11-03T10:00:00Z', expires: '2026-11-03T11:00:00Z' });
  const future = await signedProof({ issued: '2026-11-03T13:00:00Z', expires: '2026-11-03T14:00:00Z' });
  const boundary = await signedProof({ issued: '2026-11-03T11:00:00Z', expires: '2026-11-03T12:00:00Z' });
  for (const proof of [expired, future, boundary]) {
    assert.throws(() => verifyPresence(manifest, proof, options), /expired or not yet valid/);
  }
});

test('a correctly signed proof cannot exceed the 24-hour window', async () => {
  const proof = await signedProof({ issued: '2026-11-03T11:00:00Z', expires: '2026-11-04T11:00:01Z' });
  assert.throws(() => verifyPresence(manifest, proof, options), /Invalid time window/);
});

test('impossible calendar dates and invalid nonces are rejected', async () => {
  const invalidDate = await signedProof({ issued: '2026-02-30T11:00:00Z', expires: '2026-03-03T11:00:00Z' });
  const invalidNonce = await signedProof({ nonce: 'short' });
  assert.throws(() => verifyPresence(manifest, invalidDate, options), /Invalid UTC timestamp/);
  assert.throws(() => verifyPresence(manifest, invalidNonce, options), /Invalid signed message/);
});

test('unsigned placeholders are explicit and malformed placeholders fail', () => {
  const empty = { schema: 'apg-presence-proof/v1', message: null, signature: null };
  assert.equal(presenceStatus(manifest, empty, options), 'UNSIGNED');
  assert.throws(() => verifyPresence(manifest, empty, options), /Unsigned proof/);
  assert.throws(() => presenceStatus(manifest, { ...empty, schema: 'wrong' }, options), /Invalid proof schema/);
  assert.throws(() => presenceStatus(manifest, { ...empty, signature: '0x00' }, options), /Unsigned proof/);
  assert.throws(() => presenceStatus({ ...manifest, chainId: 10 }, empty, options), /Invalid manifest/);
  assert.throws(() => presenceStatus({ ...manifest, subject: otherWallet.address }, empty, options), /Unexpected manifest subject/);
});

test('the verifier rejects a non-finite verification clock', async () => {
  const proof = await signedProof();
  assert.throws(() => verifyPresence(manifest, proof, { ...options, now: NaN }), /Invalid time window/);
});
