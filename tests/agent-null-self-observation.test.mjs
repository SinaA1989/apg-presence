import test from 'node:test';
import assert from 'node:assert/strict';
import { assess, observe, SCHEMA } from '../scripts/agent-null-self-observation.mjs';

const input = (proof = {message:null,signature:null}) => ({
  proof, manifest:{schema:'test'}, claims:['one claim'], provenance:'test-fixture'
});

test('schema and read-only mode', () => {
  const r=assess(input()); assert.equal(r.schema,SCHEMA); assert.equal(r.mode,'offline-read-only');
});
test('unsigned proof is never described as verified', () => {
  const r=assess(input()); assert.equal(r.findings.find(f=>f.id==='presence-proof').status,'FACT');
  assert.match(r.findings[0].observation,/not complete/);
});
test('signature-looking input remains unverified', () => {
  const r=assess(input({message:'hello',signature:'0x'+'a'.repeat(130)}));
  assert.equal(r.findings[0].status,'UNKNOWN'); assert.match(r.findings[0].observation,/NOT been cryptographically verified/);
});
test('missing provenance prevents sigma flag', () => {
  assert.equal(assess({...input(),provenance:''}).sigma_g.value,0);
});
test('complete classification yields reporting invariant only', () => {
  const r=assess(input()); assert.equal(r.sigma_g.value,1);
  assert.match(r.sigma_g.definition,/NOT intelligence or consciousness/);
});
test('no chain activation or consciousness claims', () => {
  const r=assess(input()); for (const id of ['block-token-equality','agent-consciousness'])
    assert.equal(r.findings.find(f=>f.id===id).status,'UNKNOWN');
});
test('manifest and claims missing are explicitly unknown', () => {
  const r=assess({...input(),manifest:null,claims:[]});
  assert.equal(r.findings.find(f=>f.id==='manifest').status,'UNKNOWN');
  assert.equal(r.findings.find(f=>f.id==='claims').status,'UNKNOWN');
});
test('real repository files can be inspected without network', async () => {
  const r=await observe(); assert.equal(r.mode,'offline-read-only');
  assert.equal(r.findings[0].id,'presence-proof');
});
