import { TokenPreview } from '@/types'
import { sepolia } from 'wagmi/chains'

export const getBasedContract = (tokenPreview: TokenPreview) => {
  return {
    address: tokenPreview.address,
    abi: tokenPreview.abi,
    chainId: sepolia.id,
  }
}
