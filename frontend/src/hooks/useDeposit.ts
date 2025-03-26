import { TokenPreview } from '@/types'
import { getBasedContract } from '@/utils/getBaseContract'
import { getTokenPreviewByTitle } from '@/utils/getTokenPreviewByTitle'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

export const useDeposit = (tokenPreview: TokenPreview) => {
  const { address: account } = useAccount()
  const baseContract = getBasedContract(tokenPreview)
  const { writeContract, isPending, data } = useWriteContract()

  const { isLoading: isTxLoading, isSuccess: isTxFinished } = useWaitForTransactionReceipt({
    hash: data,
  })

  const deposit = (assets: number, options?: { onSuccess?: () => void; onError?: (error: Error) => void }) => {
    const underlyingAssetAddress = getTokenPreviewByTitle(tokenPreview.underlyingAssetTitle!).address
    if (!underlyingAssetAddress) {
      return
    }

    writeContract(
      {
        ...baseContract,
        functionName: 'deposit',
        args: [assets, account],
      },
      options,
    )
  }

  return { deposit, isPending, isTxLoading, isTxFinished }
}
