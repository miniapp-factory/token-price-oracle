import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { WatchlistAbi } from '@/lib/abis/watchlist';

const rpcUrl = process.env.NEXT_PUBLIC_BASE_RPC!;
const client = createPublicClient({
  chain: base,
  transport: http(rpcUrl),
});

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function readContractFn(fn: string, args: any[]): Promise<unknown> {
  return await client.readContract({
    address: process.env.NEXT_PUBLIC_WATCHLIST_CONTRACT!,
    abi: WatchlistAbi,
    functionName: fn,
    args,
  });
}

export async function writeContractFn(fn: string, args: any[]): Promise<void> {
  // Signing logic omitted for brevity; in production use wagmi or viem wallet
}
