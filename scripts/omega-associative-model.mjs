import { readFileSync } from 'node:fs';

export const labels = Object.freeze(['ZERO', 'ONE', 'OMEGA']);
const document = readFileSync(new URL('../OMEGA-FORMAL-MODEL.md', import.meta.url), 'utf8');
const match = document.match(/```json\s*\n([^]*?)\n```/);
if (!match) throw new Error('Missing canonical Omega v0.2 table');
const parsed = JSON.parse(match[1]);
if (!Array.isArray(parsed) || parsed.length !== 3 || parsed.some(row =>
  !Array.isArray(row) || row.length !== 3 || row.some(x => !Number.isInteger(x) || x < 0 || x > 2))) {
  throw new Error('Invalid Omega v0.2 table');
}
export const table = Object.freeze(parsed.map(row => Object.freeze(row)));
export function op(a, b) {
  for (const index of [a, b]) {
    if (!Number.isInteger(index) || index < 0 || index > 2) throw new RangeError('Expected a label index in 0..2');
  }
  return table[a][b];
}
