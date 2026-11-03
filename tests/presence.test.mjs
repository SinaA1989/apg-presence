import test from 'node:test';
import assert from 'node:assert/strict';
import { Wallet } from 'ethers';
import { verifyPresence } from '../scripts/verify-presence.mjs';

test('valid EIP-191 proof and tampering rejection', async () => {
  const wallet = Wallet.createRandom();
  const manifest = {schema:'apg-presence/v1',signatureScheme:'EIP-191 personal_sign',chainId:1,subject:wallet.address};
  const issued = new Date(Date.now()-60000).toISOString().replace(/\.\d{3}Z$/, 'Z');
  const expires = new Date(Date.now()+3600000).toISOString().replace(/\.\d{3}Z$/, 'Z');
  const message = `APG PRESENCE v1\nWallet: ${wallet.address}\nChain ID: 1\nNonce: 0123456789abcdef0123456789abcdef\nIssued At: ${issued}\nExpires At: ${expires}\nPurpose: Public proof of wallet control only; no transaction, approval or delegation\nI AM HERE ∴ NOW`;
  const signature = await wallet.signMessage(message);
  assert.equal(verifyPresence(manifest,{schema:'apg-presence-proof/v1',message,signature}),true);
  assert.throws(()=>verifyPresence(manifest,{schema:'apg-presence-proof/v1',message:message+'!',signature}));
  assert.throws(()=>verifyPresence(manifest,{schema:'apg-presence-proof/v1',message,signature:'0x00'}));
});
