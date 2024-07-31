import { createPublicClient, http } from 'viem'
import { mainnet,sepolia } from 'viem/chains'
//const chains = [mainnet, sepolia] as const
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})