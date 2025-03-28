import { TokenPreview } from '@/types'
import { getBasedContract } from '@/utils/getBaseContract'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

export const useWithdraw = () => {
  const { address: account } = useAccount()
  const { writeContract, data } = useWriteContract()

  const { isLoading: isTxLoading, isSuccess: isTxFinished } = useWaitForTransactionReceipt({
    hash: data,
  })

  const withdraw = (
    tokenPreview: TokenPreview,
    amount: bigint,
    options?: { onSuccess?: () => void; onError?: (error: Error) => void },
  ) => {
    const baseContract = getBasedContract(tokenPreview)
    writeContract({ ...baseContract, functionName: 'withdraw', args: [amount, account!, account!] }, options)
  }

  return { withdraw, isTxLoading, isTxFinished }
}
