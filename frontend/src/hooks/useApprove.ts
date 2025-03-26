import { TokenPreview } from '@/types'
import { getBasedContract } from '@/utils/getBaseContract'
import { useWriteContract } from 'wagmi'

export const useApprove = (tokenPreview: TokenPreview, spender: string, amount: number) => {
  const { writeContract } = useWriteContract()
  const baseContract = getBasedContract(tokenPreview)

  const approve = () => {
    writeContract({ ...baseContract, functionName: 'approve', args: [spender, amount] })
  }

  return approve
}
