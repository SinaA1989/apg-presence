import { readFileSync } from 'node:fs';
import { verifyMessage, getAddress } from 'ethers';

// This public address is the trust anchor for the APG command-line verifier.
export const ROOT = '0xC124e0B40d3AFA80836c146EB2919b617b4d6CB2';

function normalizeAddress(value) {
  if (typeof value !== 'string' || !/^0x[0-9a-fA-F]{40}$/.test(value)) throw Error('Invalid address');
  // Compare the 20 address bytes; the published ROOT display casing is not EIP-55.
  return getAddress(value.toLowerCase());
}

function validateManifest(manifest, expectedAddress) {
  if (!manifest || manifest.schema !== 'apg-presence/v1') throw Error('Invalid manifest schema');
  if (manifest.signatureScheme !== 'EIP-191 personal_sign' || manifest.chainId !== 1) throw Error('Invalid manifest');
  const expected = normalizeAddress(expectedAddress);
  if (normalizeAddress(manifest.subject) !== expected) throw Error('Unexpected manifest subject');
  return expected;
}

function parseTimestamp(value) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 19) !== value.slice(0, 19)) {
    throw Error('Invalid UTC timestamp');
  }
  return timestamp;
}

// expectedAddress and now can be supplied by a caller that already trusts them.
// The command-line entry point always uses the ROOT address and the real clock.
export function verifyPresence(manifest, proof, { expectedAddress = ROOT, now = Date.now() } = {}) {
  const expected = validateManifest(manifest, expectedAddress);
  if (!proof || proof.schema !== 'apg-presence-proof/v1') throw Error('Invalid proof schema');
  if (typeof proof.message !== 'string' || typeof proof.signature !== 'string') throw Error('Unsigned proof');
  const match = /^APG PRESENCE v1\nWallet: (0x[0-9a-fA-F]{40})\nChain ID: 1\nNonce: ([a-zA-Z0-9_-]{16,128})\nIssued At: (\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z)\nExpires At: (\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z)\nPurpose: Public proof of wallet control only; no transaction, approval or delegation\nI AM HERE ∴ NOW$/.exec(proof.message);
  if (!match || normalizeAddress(match[1]) !== expected) throw Error('Invalid signed message');
  const issued = parseTimestamp(match[3]);
  const expires = parseTimestamp(match[4]);
  if (!Number.isFinite(now) || expires <= issued || expires - issued > 86400000) throw Error('Invalid time window');
  if (now < issued || now >= expires) throw Error('Proof expired or not yet valid');
  if (getAddress(verifyMessage(proof.message, proof.signature)) !== expected) throw Error('Signature mismatch');
  return true;
}

export function presenceStatus(manifest, proof, options = {}) {
  validateManifest(manifest, options.expectedAddress ?? ROOT);
  if (!proof || proof.schema !== 'apg-presence-proof/v1') throw Error('Invalid proof schema');
  if (proof.message === null && proof.signature === null) return 'UNSIGNED';
  verifyPresence(manifest, proof, options);
  return 'VERIFIED';
}

if (process.argv[1]?.endsWith('verify-presence.mjs')) {
  try {
    const manifest = JSON.parse(readFileSync('presence/manifest.json', 'utf8'));
    const proof = JSON.parse(readFileSync('presence/proof.json', 'utf8'));
    const status = presenceStatus(manifest, proof);
    if (status === 'UNSIGNED') {
      if (!process.argv.includes('--allow-unsigned')) throw Error('Unsigned proof');
      console.log('PENDING OWNER SIGNATURE; NOT VERIFIED');
    } else {
      console.log('VERIFIED: EIP-191 signature matches the expected ROOT address');
    }
  } catch (error) {
    console.error('NOT VERIFIED:', error.message);
    process.exitCode = 1;
  }
}
