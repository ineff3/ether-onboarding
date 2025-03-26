import { TokenPreview } from '@/types'
import { getBasedContract } from '@/utils/getBaseContract'
import { useWriteContract } from 'wagmi'

export const useDeposit = (tokenPreview: TokenPreview, assets: number, underlyingAsset: string) => {
  const baseContract = getBasedContract(tokenPreview)
  const { writeContract } = useWriteContract()

  const deposit = () => {
    writeContract({
      ...baseContract,
      functionName: 'deposit',
      args: [assets, underlyingAsset],
    })
  }

  return deposit
}
