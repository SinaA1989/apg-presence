import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { op, table } from '../scripts/omega-associative-model.mjs';

test('all 27 triples are associative, with identity and mutual inverses', () => {
  assert.equal(op(0, 2), 1);
  assert.equal(op(2, 0), 1);
  for (let a = 0; a < 3; a++) {
    assert.equal(op(1, a), a);
    assert.equal(op(a, 1), a);
    for (let b = 0; b < 3; b++) {
      assert.equal(op(a, b), op(b, a));
      for (let c = 0; c < 3; c++) assert.equal(op(op(a, b), c), op(a, op(b, c)));
    }
  }
});

test('the claimed bijection preserves addition modulo three', () => {
  const f = [1, 0, 2];
  assert.equal(new Set(f).size, 3);
  for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
    assert.equal(f[op(a, b)], (f[a] + f[b]) % 3);
  }
});

test('exactly one of nine completions is associative', () => {
  const solutions = [];
  for (let z = 0; z < 3; z++) for (let w = 0; w < 3; w++) {
    const t = [[z, 0, 1], [0, 1, 2], [1, 2, w]];
    let valid = true;
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) {
      if (t[t[a][b]][c] !== t[a][t[b][c]]) valid = false;
    }
    if (valid) solutions.push(t);
  }
  assert.deepEqual(solutions, [table]);
});

test('the displayed table agrees with the canonical table', () => {
  const text = readFileSync(new URL('../OMEGA-FORMAL-MODEL.md', import.meta.url), 'utf8');
  const rows = text.split('\n').filter(line => /^\| \*\*/.test(line));
  const symbols = ['0_A', '1_A', 'Ω_A'];
  assert.equal(rows.length, 3);
  rows.forEach((row, a) => assert.deepEqual(row.split('|').slice(2, 5).map(x => x.trim()), table[a].map(x => symbols[x])));
});

test('invalid label indices are rejected', () => {
  for (const invalid of [-1, 3, 0.5, NaN, '0', undefined]) {
    assert.throws(() => op(invalid, 1), RangeError);
    assert.throws(() => op(1, invalid), RangeError);
  }
});
