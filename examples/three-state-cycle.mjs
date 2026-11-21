import { op } from '../scripts/omega-associative-model.mjs';

// State and step encodings use the same C3 coordinates:
// READY/0 steps = ONE, ACTIVE/1 step = ZERO, REVIEW/2 steps = OMEGA.
export const states = Object.freeze(['READY', 'ACTIVE', 'REVIEW']);
const coordinateToLabel = [1, 0, 2];
const labelToCoordinate = [1, 0, 2];

function stepCoordinate(steps) {
  if (!Number.isSafeInteger(steps) || steps < 0) {
    throw new RangeError('steps must be a nonnegative safe integer');
  }
  return steps % 3;
}

export function advance(state, steps = 1) {
  const coordinate = states.indexOf(state);
  if (coordinate < 0) throw new RangeError('Unknown cycle state');
  const result = op(coordinateToLabel[coordinate], coordinateToLabel[stepCoordinate(steps)]);
  return states[labelToCoordinate[result]];
}

export function composeSteps(first, second) {
  // Reduce each operand before combining to avoid unsafe integer sums.
  const result = op(coordinateToLabel[stepCoordinate(first)], coordinateToLabel[stepCoordinate(second)]);
  return labelToCoordinate[result];
}
