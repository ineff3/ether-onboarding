import { tokenPreviews } from '@/tokens'
import { TokenPreview } from '@/types'
import { getBasedContract } from '@/utils/getBaseContract'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

export const useDeposit = (tokenPreview: TokenPreview) => {
  const { address: account } = useAccount()
  const baseContract = getBasedContract(tokenPreview)
  const { writeContract, data } = useWriteContract()

  const { isLoading: isTxLoading, isSuccess: isTxFinished } = useWaitForTransactionReceipt({
    hash: data,
  })

  const deposit = (assets: bigint) => {
    const underlyingAssetAddress = tokenPreviews[tokenPreview.underlyingAssetTitle!].address
    if (!underlyingAssetAddress) {
      return
    }

    writeContract({
      ...baseContract,
      functionName: 'deposit',
      args: [assets, account!],
    })
  }

  return { deposit, isTxLoading, isTxFinished }
}
