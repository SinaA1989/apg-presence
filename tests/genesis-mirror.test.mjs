import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
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
  altered.result.logs[0].data = '0x' + '0'.repeat(63) + '1';
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

test('unrelated receipt contexts never certify transfer claims', () => {
  for (const change of [
    f => { f.chainId = '0x1'; },
    f => { f.result.transactionHash = '0x' + 'f'.repeat(64); },
    f => { f.result.status = '0x0'; },
    f => { delete f.chainId; },
    f => { delete f.result.transactionHash; },
    f => { delete f.result.blockNumber; },
    f => { f.result.status = 'unreadable'; },
  ]) {
    const f = structuredClone(fixture);
    change(f);
    const results = evaluateGenesisMirror(claims, f);
    assert.ok(results.filter(r => r.id.startsWith('transfer:')).every(r => r.verdict === 'UNKNOWN'));
    assert.notEqual(overallVerdict(results), 'FACT');
  }
});

test('missing or malformed logs stay UNKNOWN; a supplied empty list refutes matches', () => {
  for (const change of [
    f => { delete f.result.logs; },
    f => { f.result.logs = null; },
    f => { f.result.logs[0].data = '0x01'; },
    f => { f.result.logs[0].topics.push('0x' + '0'.repeat(64)); },
    f => { f.result.logs[0].topics[1] = '0x1' + '0'.repeat(63); },
    f => { f.result.logs[0].removed = true; },
    f => { f.result.logs.push(null); },
  ]) {
    const f = structuredClone(fixture);
    change(f);
    assert.equal(overallVerdict(evaluateGenesisMirror(claims, f)), 'UNKNOWN');
  }
  const f = structuredClone(fixture);
  f.result.logs = [];
  assert.equal(overallVerdict(evaluateGenesisMirror(claims, f)), 'REFUTED');
});

test('non-receipt RPC payloads never become facts', () => {
  for (const result of [[], 'invalid', 1]) {
    assert.equal(overallVerdict(evaluateGenesisMirror(claims, { result })), 'UNKNOWN');
  }
});

test('CLI distinguishes fixture success from missing live evidence by mode and exit code', () => {
  const env = { ...process.env };
  delete env.BASE_RPC_URL;
  const run = args => spawnSync(process.execPath, ['scripts/verify-genesis-mirror.mjs', ...args], {
    cwd: new URL('../', import.meta.url), env, encoding: 'utf8', timeout: 5000,
  });
  const unknown = run([]);
  assert.equal(unknown.status, 2, unknown.stderr);
  assert.equal(JSON.parse(unknown.stdout).overall, 'UNKNOWN');
  const snapshot = run(['--fixture']);
  assert.equal(snapshot.status, 0, snapshot.stderr);
  const output = JSON.parse(snapshot.stdout);
  assert.equal(output.mode, 'committed-snapshot');
  assert.equal(output.observedAt, fixture.observedAt);
});
