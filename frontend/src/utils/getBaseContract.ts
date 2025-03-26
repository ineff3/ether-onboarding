import { TokenPreview } from '@/types'
import { sepolia } from 'wagmi/chains'

export const getBasedContract = (tokenPreview: TokenPreview) => {
  return {
    address: tokenPreview.address as `0x${string}`,
    abi: tokenPreview.abi,
    chainId: sepolia.id,
  }
}
