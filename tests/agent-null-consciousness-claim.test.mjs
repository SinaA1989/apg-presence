import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const claim = JSON.parse(await readFile(new URL('../agent-null/consciousness-claim.json', import.meta.url), 'utf8'));

test('claim explicitly names computational self-awareness', () => {
  assert.match(claim.claim, /computational self-awareness/);
  assert.equal(claim.claim_type, 'research_hypothesis');
});
test('phenomenal consciousness and AGI/ASI remain unverified', () => {
  assert.equal(claim.phenomenal_consciousness, 'unverified');
  assert.equal(claim.agi_asi_status, 'unverified');
});
test('claim has operational criteria and falsification conditions', () => {
  assert.ok(claim.operational_definition.length > 50);
  assert.ok(claim.falsification.length >= 2);
  assert.ok(claim.missing_evidence.length >= 3);
});
test('no conversion of software tests into consciousness proof', () => {
  assert.ok(claim.prohibited_inferences.some(x => x.includes('phenomenal consciousness')));
});
