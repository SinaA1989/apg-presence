import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const TRANSFER_TOPIC =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

const FACT = 'FACT';
const REFUTED = 'REFUTED';
const UNKNOWN = 'UNKNOWN';

function address(value) {
  if (typeof value !== 'string' || !/^0x[0-9a-fA-F]{40}$/.test(value)) {
    throw new Error(`Invalid address: ${value}`);
  }
  return value.toLowerCase();
}

function topicAddress(value) {
  if (typeof value !== 'string' || !/^0x[0-9a-fA-F]{64}$/.test(value)) return null;
  return `0x${value.slice(-40)}`.toLowerCase();
}

function quantity(value) {
  if (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0) return BigInt(value);
  if (typeof value !== 'string' || !/^(0x[0-9a-fA-F]+|[0-9]+)$/.test(value)) return null;
  return BigInt(value);
}

function result(id, verdict, detail) {
  return { id, verdict, detail };
}

export function evaluateGenesisMirror(claims, observation) {
  if (!claims || claims.schema !== 'apg-genesis-mirror-claims/v1') {
    throw new Error('Invalid claims schema');
  }

  const receipt =
    observation && Object.prototype.hasOwnProperty.call(observation, 'result')
      ? observation.result
      : observation;
  if (!receipt) {
    return [result('receipt-exists', UNKNOWN, 'No receipt was returned by the selected source')];
  }

  const results = [result('receipt-exists', FACT, 'A transaction receipt was supplied')];
  const expectedHash = claims.transactionHash.toLowerCase();
  const actualHash = receipt.transactionHash?.toLowerCase();
  results.push(
    actualHash === expectedHash
      ? result('transaction-hash', FACT, actualHash)
      : result('transaction-hash', REFUTED, `Expected ${expectedHash}; received ${actualHash ?? 'missing'}`),
  );

  results.push(
    receipt.status === '0x1'
      ? result('execution-status', FACT, 'Receipt status is successful (0x1)')
      : receipt.status == null
        ? result('execution-status', UNKNOWN, 'Receipt status is missing')
        : result('execution-status', REFUTED, `Receipt status is ${receipt.status}`),
  );

  const actualBlock = quantity(receipt.blockNumber);
  const expectedBlock = BigInt(claims.expectedBlockNumber);
  results.push(
    actualBlock == null
      ? result('block-number', UNKNOWN, 'Receipt block number is missing or invalid')
      : actualBlock === expectedBlock
        ? result('block-number', FACT, actualBlock.toString())
        : result('block-number', REFUTED, `Expected ${expectedBlock}; received ${actualBlock}`),
  );

  const observedChainId = quantity(observation?.chainId);
  results.push(
    observedChainId == null
      ? result('chain-id', UNKNOWN, 'Chain ID was not captured with the receipt')
      : observedChainId === BigInt(claims.network.chainId)
        ? result('chain-id', FACT, observedChainId.toString())
        : result('chain-id', REFUTED, `Expected ${claims.network.chainId}; received ${observedChainId}`),
  );

  const token = address(claims.token.address);
  const logs = Array.isArray(receipt.logs) ? receipt.logs : [];
  const transfers = logs.filter(
    (log) => log?.address && address(log.address) === token && log.topics?.[0]?.toLowerCase() === TRANSFER_TOPIC,
  );

  for (const expected of claims.expectedTransfers) {
    const match = transfers.find((log) => {
      const amount = quantity(log.data);
      return (
        topicAddress(log.topics?.[1]) === address(expected.from) &&
        topicAddress(log.topics?.[2]) === address(expected.to) &&
        amount === BigInt(expected.amountBaseUnits)
      );
    });
    results.push(
      match
        ? result(`transfer:${expected.id}`, FACT, expected.amountBaseUnits)
        : result(`transfer:${expected.id}`, REFUTED, 'No matching ERC-20 Transfer log was found'),
    );
  }

  return results;
}

export function overallVerdict(results) {
  if (results.some((entry) => entry.verdict === REFUTED)) return REFUTED;
  if (results.some((entry) => entry.verdict === UNKNOWN)) return UNKNOWN;
  return FACT;
}

export async function fetchObservation(rpcUrl, transactionHash, fetchImpl = fetch) {
  if (!rpcUrl) return { error: 'BASE_RPC_URL is not set', result: null };
  try {
    const rpc = async (method, params) => {
      const response = await fetchImpl(rpcUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      if (payload.error) throw new Error(payload.error.message ?? 'JSON-RPC error');
      return payload.result;
    };
    const [chainId, result] = await Promise.all([
      rpc('eth_chainId', []),
      rpc('eth_getTransactionReceipt', [transactionHash]),
    ]);
    return { chainId, result };
  } catch (error) {
    return { error: error.message, result: null };
  }
}

async function main() {
  const claims = JSON.parse(readFileSync('evidence/genesis-mirror/claims.json', 'utf8'));
  const fixture = process.argv.includes('--fixture');
  const observation = fixture
    ? JSON.parse(readFileSync('evidence/genesis-mirror/receipt-minimal.json', 'utf8'))
    : await fetchObservation(process.env.BASE_RPC_URL, claims.transactionHash);
  const results = evaluateGenesisMirror(claims, observation);
  const output = { schema: 'apg-genesis-mirror-verdict/v1', overall: overallVerdict(results), results };
  console.log(JSON.stringify(output, null, 2));
  if (output.overall === REFUTED) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
