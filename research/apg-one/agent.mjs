// APG ONE v0.1: deterministic, read-only evidence classifier.
// No wallet, network, signing, transactions, or autonomous execution.
export const STATUSES = Object.freeze(['FACT', 'UNKNOWN', 'REFUTED']);
export function classify(record) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) throw new TypeError('record must be an object');
  const required = ['chainId', 'txHash', 'recipient', 'asset', 'amount', 'source'];
  const missing = required.filter(k => typeof record[k] !== 'string' || record[k].trim() === '');
  if (missing.length) return {status:'UNKNOWN', missing, spendable:'UNKNOWN', reason:'Insufficient evidence'};
  if (!/^0x[a-fA-F0-9]{64}$/.test(record.txHash)) return {status:'REFUTED', missing:[], spendable:'UNKNOWN', reason:'Malformed transaction hash'};
  if (record.receiptStatus === 'failed') return {status:'REFUTED', missing:[], spendable:'NO', reason:'Failed transaction receipt'};
  if (record.receiptStatus !== 'success' || record.inboundConfirmed !== true) return {status:'UNKNOWN', missing:['successful receipt and independently confirmed inbound transfer'], spendable:'UNKNOWN', reason:'Transfer not established'};
  const spendable = record.currentBalanceConfirmed === true && record.controlConfirmed === true && record.transferableConfirmed === true ? 'YES' : 'UNKNOWN';
  return {status:'FACT', missing:[], spendable, reason:'Inbound transfer recorded; spendability separately evaluated'};
}
export function assess(record) {
  const result = classify(record);
  return {schema:'apg-one-assessment/v0.1', principles:['THINK: evaluate evidence','SPEAK: disclose uncertainty','ACT: no financial actions'], ...result};
}
