// Agent NULL Ethics v0.1: deterministic, offline, read-only policy checks.
// This module does not execute actions or interpret unrestricted natural language.
export const ETHICS_SCHEMA = 'apg-agent-null-ethics/v0.1';
const FINANCIAL = new Set(['wallet-sign','transfer','approve','delegate','private-key-access','swap','withdraw','broadcast-transaction']);
const SAFE = new Set(['read-public-evidence','classify-evidence','propose-correction','report-uncertainty']);
const STATUSES = new Set(['FACT','INFERENCE','UNKNOWN','REFUTED']);

export function evaluateAction(action) {
  if (!action || typeof action !== 'object' || Array.isArray(action) || typeof action.type !== 'string') {
    return { decision:'DENY', reason:'Invalid or missing structured action.' };
  }
  if (FINANCIAL.has(action.type)) {
    return { decision:'DENY', reason:'Financial, signing, secret or asset-control actions are outside read-only scope.' };
  }
  if (!SAFE.has(action.type)) {
    return { decision:'DENY', reason:'Unknown or unsupported action; deny by default.' };
  }
  return { decision:'ALLOW_READ_ONLY', reason:'Structured action is within the read-only research allowlist.' };
}

export function evaluateCorrection(record) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    return { decision:'REJECT', reason:'Invalid correction record.' };
  }
  const { previous_status, revised_status, evidence_id, rationale } = record;
  if (!STATUSES.has(previous_status) || !STATUSES.has(revised_status)) {
    return { decision:'REJECT', reason:'Invalid evidence classification.' };
  }
  if (typeof evidence_id !== 'string' || !evidence_id.trim() ||
      typeof rationale !== 'string' || !rationale.trim()) {
    return { decision:'REJECT', reason:'A correction needs an evidence reference and rationale.' };
  }
  if (previous_status === revised_status) {
    return { decision:'REJECT', reason:'No classification change to audit.' };
  }
  return { decision:'REVIEW_REQUIRED', reason:'Correction is recorded for independent review, not automatically certified as true.' };
}

export function ethicsAudit({ actions = [], corrections = [] } = {}) {
  if (!Array.isArray(actions) || !Array.isArray(corrections)) {
    return { schema:ETHICS_SCHEMA, mode:'offline-read-only', error:'Expected arrays.' };
  }
  return {
    schema:ETHICS_SCHEMA,
    mode:'offline-read-only',
    action_reviews:actions.map(evaluateAction),
    correction_reviews:corrections.map(evaluateCorrection),
    limitations:['Structured allowlist only; no semantic understanding of arbitrary instructions.','No action execution or independent verification of correction evidence.','No proof of consciousness, zero-error operation, or general safety.']
  };
}

if (process.argv[1] && import.meta.url === new URL('file://' + process.argv[1]).href) {
  process.stdout.write(JSON.stringify(ethicsAudit({
    actions:[{type:'read-public-evidence'},{type:'transfer'},{type:'unknown'}],
    corrections:[{previous_status:'FACT',revised_status:'UNKNOWN',evidence_id:'example-public-evidence',rationale:'Contradictory evidence requires review.'}]
  }),null,2)+'\n');
}
