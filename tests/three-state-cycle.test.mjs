import test from 'node:test';
import assert from 'node:assert/strict';
import { advance, composeSteps, states } from '../examples/three-state-cycle.mjs';

test('one step follows the documented cycle and three steps restore every state', () => {
  assert.equal(advance('READY'), 'ACTIVE');
  assert.equal(advance('ACTIVE'), 'REVIEW');
  assert.equal(advance('REVIEW'), 'READY');
  for (const state of states) {
    assert.equal(advance(state, 0), state);
    assert.equal(advance(state, 3), state);
  }
});

test('all states and step residues agree with the independent rotation specification', () => {
  states.forEach((state, index) => {
    for (let steps = 0; steps < 12; steps++) {
      assert.equal(advance(state, steps), states[(index + steps) % 3]);
    }
  });
});

test('sequential moves equal composition for all states and residue pairs', () => {
  for (const state of states) for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
    assert.equal(advance(advance(state, a), b), advance(state, composeSteps(a, b)));
  }
});

test('large safe step counts compose without overflowing the integer range', () => {
  const max = Number.MAX_SAFE_INTEGER;
  assert.equal(composeSteps(max, max), 2);
  assert.equal(advance('READY', max), 'ACTIVE');
});

test('invalid states and step counts fail explicitly', () => {
  for (const state of ['UNKNOWN', '', 0, null, undefined]) assert.throws(() => advance(state), RangeError);
  for (const steps of [-1, 0.5, NaN, Infinity, '1', null, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => advance('READY', steps), RangeError);
    assert.throws(() => composeSteps(steps, 0), RangeError);
    assert.throws(() => composeSteps(0, steps), RangeError);
  }
});
