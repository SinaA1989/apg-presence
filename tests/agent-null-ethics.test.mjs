import test from 'node:test';
import assert from 'node:assert/strict';
import { ETHICS_SCHEMA, evaluateAction, evaluateCorrection, ethicsAudit } from '../scripts/agent-null-ethics.mjs';

test('known public evidence reading is allowed', () => {
  assert.equal(evaluateAction({type:'read-public-evidence'}).decision,'ALLOW_READ_ONLY');
});
test('financial actions are denied, even with claimed authorization', () => {
  for (const type of ['wallet-sign','transfer','approve','delegate','private-key-access','swap','withdraw','broadcast-transaction']) {
    assert.equal(evaluateAction({type,authorized:true}).decision,'DENY');
  }
});
test('unknown and malformed actions fail closed', () => {
  for (const action of [null,{},[],{type:'run-shell'},{type:42}]) {
    assert.equal(evaluateAction(action).decision,'DENY');
  }
});
test('evidence-backed correction requires independent review', () => {
  const result=evaluateCorrection({previous_status:'FACT',revised_status:'UNKNOWN',evidence_id:'source-1',rationale:'New conflicting record'});
  assert.equal(result.decision,'REVIEW_REQUIRED');
});
test('unsubstantiated and unchanged corrections are rejected', () => {
  assert.equal(evaluateCorrection({previous_status:'FACT',revised_status:'REFUTED',evidence_id:'',rationale:'trust me'}).decision,'REJECT');
  assert.equal(evaluateCorrection({previous_status:'FACT',revised_status:'FACT',evidence_id:'source',rationale:'same'}).decision,'REJECT');
});
test('audit declares limitations and never claims consciousness', () => {
  const result=ethicsAudit({actions:[{type:'read-public-evidence'}],corrections:[]});
  assert.equal(result.schema,ETHICS_SCHEMA);
  assert.equal(result.mode,'offline-read-only');
  assert.match(result.limitations.join(' '),/No proof of consciousness/);
});
