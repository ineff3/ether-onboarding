import { TokenPreview } from '@/types'
import { getBasedContract } from '@/utils/getBaseContract'
import { Address } from 'viem'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

export const useApprove = (spender: Address) => {
  const { writeContract, data } = useWriteContract()

  const { isLoading: isTxLoading, isSuccess: isTxFinished } = useWaitForTransactionReceipt({
    hash: data,
  })

  const approve = (underlyingTokenPreview: TokenPreview, amount: bigint) => {
    const baseContract = getBasedContract(underlyingTokenPreview)
    writeContract({ ...baseContract, functionName: 'approve', args: [spender, amount] })
  }

  return { approve, isTxLoading, isTxFinished }
}
