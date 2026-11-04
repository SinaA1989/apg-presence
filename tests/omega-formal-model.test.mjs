import test from 'node:test';
import assert from 'node:assert/strict';

// APG Omega v0.1: formal labels, not real 0/1/infinity.
// Index order: ZERO, ONE, OMEGA.
const S = ['ZERO', 'ONE', 'OMEGA'];
const table = [
  [0, 0, 1],
  [0, 1, 2],
  [1, 2, 2],
];
function op(a, b) {
  assert.ok(Number.isInteger(a) && a >= 0 && a < 3);
  assert.ok(Number.isInteger(b) && b >= 0 && b < 3);
  return table[a][b];
}

test('the APG Omega formal equation holds under its stated custom operation', () => {
  assert.equal(op(2, 0), 1, 'OMEGA ⊗ ZERO = ONE');
  assert.equal(op(0, 2), 1, 'ZERO ⊗ OMEGA = ONE');
});

test('the formal multiplication is total, closed and commutative', () => {
  for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
    assert.ok(S[op(a, b)]);
    assert.equal(op(a, b), op(b, a));
  }
});

test('ONE is a two-sided identity', () => {
  for (let a = 0; a < 3; a++) {
    assert.equal(op(1, a), a);
    assert.equal(op(a, 1), a);
  }
});

test('the operation is deliberately NOT associative, hence not a monoid or ring multiplication', () => {
  assert.equal(op(op(0, 0), 2), 1);
  assert.equal(op(0, op(0, 2)), 0);
  assert.notEqual(op(op(0, 0), 2), op(0, op(0, 2)));
});

test('ZERO is deliberately not an absorbing element', () => {
  assert.equal(op(0, 2), 1);
  assert.notEqual(op(0, 2), 0);
});
