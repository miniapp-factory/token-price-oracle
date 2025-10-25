import { createPublicClient, http, encodeFunctionData } from 'viem';
import { base } from 'viem/chains';
import { WatchlistAbi } from '@/lib/abis/watchlist';

const rpcUrl = process.env.NEXT_PUBLIC_BASE_RPC!;
const client = createPublicClient({
  chain: base,
  transport: http(rpcUrl),
});

export async function readContractFn(fn: string, args: any[]) {
  return await client.readContract({
    address: process.env.NEXT_PUBLIC_WATCHLIST_CONTRACT!,
    abi: WatchlistAbi,
    functionName: fn,
    args,
  });
}

export async function writeContractFn(fn: string, args: any[]) {
  // Signing logic omitted for brevity; in production use wagmi or viem wallet
}
