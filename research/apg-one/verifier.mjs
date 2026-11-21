// APG ONE v0.2: read-only receipt verifier. No signer or write operations.
// Provider is injected. A trusted, independently operated RPC is required.
import { Interface, getAddress } from 'ethers';
const iface = new Interface(['event Transfer(address indexed from,address indexed to,uint256 value)']);
export async function verifyErc20Inbound({provider, chainId, txHash, token, recipient, minConfirmations=1}) {
  const unknown = (reason) => ({status:'UNKNOWN', spendable:'UNKNOWN', reason});
  if (!provider || !['getNetwork','getTransactionReceipt','getBlockNumber'].every(k => typeof provider[k] === 'function')) return unknown('No trusted read-only provider');
  if (!/^0x[0-9a-fA-F]{64}$/.test(txHash || '')) return {status:'REFUTED', spendable:'UNKNOWN', reason:'Invalid submitted transaction hash'};
  let tokenAddress, toAddress;
  try { tokenAddress=getAddress(token.toLowerCase()); toAddress=getAddress(recipient.toLowerCase()); }
  catch { return {status:'REFUTED', spendable:'UNKNOWN', reason:'Invalid submitted token or recipient address'}; }
  try {
    const network=await provider.getNetwork();
    if (BigInt(network.chainId)!==BigInt(chainId)) return unknown('RPC chain ID mismatch');
    const receipt=await provider.getTransactionReceipt(txHash);
    if (!receipt) return unknown('Receipt unavailable');
    if (receipt.status!==1) return {status:'REFUTED',spendable:'UNKNOWN',reason:'Transaction failed; no successful inbound transfer'};
    const height=await provider.getBlockNumber();
    if (height-receipt.blockNumber+1<minConfirmations) return unknown('Insufficient confirmations');
    let total=0n;
    for(const log of receipt.logs || []) {
      if (log.address.toLowerCase()!==tokenAddress.toLowerCase()) continue;
      try {
        const event=iface.parseLog({topics:log.topics,data:log.data});
        if(event?.name==='Transfer' && getAddress(event.args.to)===toAddress) total+=event.args.value;
      } catch { /* Ignore non-Transfer logs */ }
    }
    if(total===0n) return {status:'REFUTED',spendable:'UNKNOWN',reason:'No matching positive Transfer event in this receipt',txHash,chainId:String(chainId)};
    return {status:'FACT',fact:'Confirmed ERC-20 Transfer log to recipient (not independently proven spendable)',amountRaw:total.toString(),token:tokenAddress,recipient:toAddress,chainId:String(chainId),txHash,blockNumber:receipt.blockNumber,confirmations:height-receipt.blockNumber+1,spendable:'UNKNOWN'};
  } catch { return unknown('RPC or parsing error; no positive claim'); }
}
