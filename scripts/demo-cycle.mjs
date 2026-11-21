import { advance } from '../examples/three-state-cycle.mjs';

let state = 'READY';
const trace = [state];
for (let i = 0; i < 3; i++) {
  state = advance(state);
  trace.push(state);
}
console.log(trace.join(' -> '));
console.log(`Two steps from READY: ${advance('READY', 2)}`);
console.log(`Three steps from READY: ${advance('READY', 3)}`);
