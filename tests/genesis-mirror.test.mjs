import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  evaluateGenesisMirror,
  fetchObservation,
  overallVerdict,
} from '../scripts/verify-genesis-mirror.mjs';

const claims = JSON.parse(readFileSync('evidence/genesis-mirror/claims.json', 'utf8'));
const fixture = JSON.parse(readFileSync('evidence/genesis-mirror/receipt-minimal.json', 'utf8'));

test('the committed receipt snapshot reproduces every bounded claim', () => {
  const results = evaluateGenesisMirror(claims, fixture);
  assert.equal(overallVerdict(results), 'FACT');
  assert.ok(results.every((entry) => entry.verdict === 'FACT'));
});

test('a missing receipt remains UNKNOWN rather than becoming FACT or REFUTED', () => {
  const results = evaluateGenesisMirror(claims, { chainId: '0x2105', result: null });
  assert.equal(overallVerdict(results), 'UNKNOWN');
});

test('a failed transaction refutes the execution-status claim', () => {
  const altered = structuredClone(fixture);
  altered.result.status = '0x0';
  const results = evaluateGenesisMirror(claims, altered);
  assert.equal(overallVerdict(results), 'REFUTED');
  assert.equal(results.find((entry) => entry.id === 'execution-status').verdict, 'REFUTED');
});

test('an altered issuance amount is detected', () => {
  const altered = structuredClone(fixture);
  altered.result.logs[0].data = '0x01';
  const results = evaluateGenesisMirror(claims, altered);
  assert.equal(overallVerdict(results), 'REFUTED');
  assert.equal(results.find((entry) => entry.id === 'transfer:initial-issuance').verdict, 'REFUTED');
});

test('RPC failure is represented as UNKNOWN', async () => {
  const failingFetch = async () => ({ ok: false, status: 503 });
  const observation = await fetchObservation('https://example.invalid', claims.transactionHash, failingFetch);
  const results = evaluateGenesisMirror(claims, observation);
  assert.equal(overallVerdict(results), 'UNKNOWN');
});
