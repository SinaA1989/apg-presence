import { readFileSync } from 'node:fs';
import { verifyMessage, getAddress } from 'ethers';

export function verifyPresence(manifest, proof) {
  if (manifest.schema !== 'apg-presence/v1' || proof.schema !== 'apg-presence-proof/v1') throw Error('Invalid schema');
  if (manifest.signatureScheme !== 'EIP-191 personal_sign' || manifest.chainId !== 1) throw Error('Invalid manifest');
  if (typeof proof.message !== 'string' || typeof proof.signature !== 'string') throw Error('Unsigned proof');
  const expected = getAddress(manifest.subject);
  const match = /^APG PRESENCE v1\nWallet: (0x[0-9a-fA-F]{40})\nChain ID: 1\nNonce: ([a-zA-Z0-9_-]{16,128})\nIssued At: (\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z)\nExpires At: (\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z)\nPurpose: Public proof of wallet control only; no transaction, approval or delegation\nI AM HERE ∴ NOW$/.exec(proof.message);
  if (!match || getAddress(match[1]) !== expected) throw Error('Invalid signed message');
  const issued = Date.parse(match[3]), expires = Date.parse(match[4]);
  if (!Number.isFinite(issued) || !Number.isFinite(expires) || expires <= issued || expires - issued > 86400000) throw Error('Invalid time window');
  if (Date.now() < issued || Date.now() > expires) throw Error('Proof expired or not yet valid');
  if (getAddress(verifyMessage(proof.message, proof.signature)) !== expected) throw Error('Signature mismatch');
  return true;
}

if (process.argv[1]?.endsWith('verify-presence.mjs')) {
  try {
    const manifest = JSON.parse(readFileSync('presence/manifest.json', 'utf8'));
    const proof = JSON.parse(readFileSync('presence/proof.json', 'utf8'));
    verifyPresence(manifest, proof);
    console.log('VERIFIED: EIP-191 wallet-control proof');
  } catch (error) {
    console.error('NOT VERIFIED:', error.message);
    process.exitCode = 1;
  }
}
