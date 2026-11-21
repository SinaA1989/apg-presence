// APG ONE v0.1: offline, deterministic, read-only assessment.
// Supplied assertions are NOT independent evidence of an on-chain fact.
export const STATUSES = Object.freeze(['FACT', 'UNKNOWN', 'REFUTED']);
export function classify(record) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) throw new TypeError('record must be an object');
  const required = ['chainId', 'txHash', 'recipient', 'asset', 'amount', 'source'];
  const missing = required.filter(k => typeof record[k] !== 'string' || record[k].trim() === '');
  if (missing.length) return {status:'UNKNOWN', missing, spendable:'UNKNOWN', reason:'Required fields missing'};
  if (!/^0x[a-fA-F0-9]{64}$/.test(record.txHash)) return {status:'REFUTED', missing:[], spendable:'UNKNOWN', reason:'Invalid record: malformed transaction hash; no claim about underlying transfer'};
  // Even success/inbound/control flags are unverified user-supplied assertions.
  // A later version may return FACT/YES only with an independent verifier.
  return {status:'UNKNOWN', missing:['independent receipt and event verification','independent current balance, control and transferability checks'], spendable:'UNKNOWN', reason:'Assertions received, not independently verified'};
}
export function assess(record) {
  return {schema:'apg-one-assessment/v0.1', principles:['THINK: evaluate evidence','SPEAK: disclose uncertainty','ACT: no financial actions'], ...classify(record)};
}
