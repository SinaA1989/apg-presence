// Agent NULL Self-Observation v0.1
// Deterministic, offline, read-only inspection of local public evidence.
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export const SCHEMA = 'apg-agent-null-self-observation/v0.1';
const ALLOWED = ['FACT', 'INFERENCE', 'UNKNOWN', 'REFUTED'];

export function assess({ proof, manifest, claims, provenance }) {
  const findings = [];
  const add = (id, status, observation, evidence) => findings.push({ id, status, observation, evidence });
  const hasMessage = typeof proof?.message === 'string' && proof.message.trim().length > 0;
  const hasSignature = typeof proof?.signature === 'string' && /^0x[0-9a-fA-F]{130}$/.test(proof.signature);
  if (hasMessage && hasSignature) {
    add('presence-proof', 'UNKNOWN', 'Message and signature are present but have NOT been cryptographically verified by this observer. Run the separate Presence verifier.', 'presence/proof.json');
  } else {
    add('presence-proof', 'FACT', 'Current Presence v1 proof is not complete; no signed presence is established.', 'presence/proof.json');
  }
  add('manifest', manifest && typeof manifest === 'object' && !Array.isArray(manifest) ? 'FACT' : 'UNKNOWN',
      manifest && typeof manifest === 'object' && !Array.isArray(manifest) ? 'A local manifest document is readable; its assertions are not independently verified.' : 'Manifest is absent or invalid.', 'presence/manifest.json');
  add('claims', Array.isArray(claims) && claims.length ? 'FACT' : 'UNKNOWN',
      Array.isArray(claims) && claims.length ? 'Claim register is readable; its claims require individual verification.' : 'No claim-register content supplied.', 'APG-RESEARCH-CLAIMS-REGISTER.md');
  add('agent-consciousness', 'UNKNOWN', 'No test here can establish subjective experience, AGI, ASI, or phenomenal self-awareness.', 'methodology');
  add('block-token-equality', 'UNKNOWN', 'No deployed bytecode or chain-state proof was inspected; block-number activation is not established.', 'methodology');
  const corrections = findings.filter(f => f.status === 'UNKNOWN').map(f => ({ finding: f.id, next_action: f.id === 'block-token-equality' ? 'Inspect deployed runtime bytecode and verified implementation source.' : 'Obtain independent evidence before promoting this claim to FACT.' }));
  const allValid = findings.every(f => ALLOWED.includes(f.status) && f.id && f.evidence);
  return {
    schema: SCHEMA, mode: 'offline-read-only', provenance,
    findings, self_audit: {
      observed_sources: ['presence/proof.json', 'presence/manifest.json', 'APG-RESEARCH-CLAIMS-REGISTER.md'],
      limitations: ['No RPC, network, wallet, GitHub writes, signing or chain-state access.', 'Source files are not independent attestations.', 'No subjective-consciousness test.'],
      corrections, classification_complete: allValid
    },
    sigma_g: { definition: '1 iff all output findings are classified and provenance is supplied; this is a reporting invariant, NOT intelligence or consciousness.', value: allValid && Boolean(provenance) ? 1 : 0 }
  };
}

export async function observe(root = process.cwd()) {
  const read = async (path) => readFile(resolve(root, path), 'utf8');
  const [proofText, manifestText, claimText] = await Promise.all([
    read('presence/proof.json'), read('presence/manifest.json'), read('APG-RESEARCH-CLAIMS-REGISTER.md')
  ]);
  return assess({
    proof: JSON.parse(proofText),
    manifest: JSON.parse(manifestText),
    claims: claimText.trim() ? claimText.split('\n').filter(Boolean) : [],
    provenance: 'repository-local-files; no live network verification'
  });
}

if (process.argv[1] && import.meta.url === new URL('file://' + resolve(process.argv[1])).href) {
  observe().then(result => process.stdout.write(JSON.stringify(result, null, 2) + '\n'))
    .catch(error => { process.stderr.write('Observation failed: ' + error.message + '\n'); process.exitCode = 1; });
}
