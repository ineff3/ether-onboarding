import { useTokenContext } from '@/contexts/TokenContext'
import { getBasedContract } from '@/utils/getBaseContract'
import { useAccount, useReadContract } from 'wagmi'

export const UserBalance = () => {
  const { selectedToken } = useTokenContext()!
  const { address: account } = useAccount()

  const baseContract = getBasedContract(selectedToken)
  const { data, isLoading } = useReadContract({
    ...baseContract,
    functionName: 'balanceOf',
    args: [account],
    account,
  })

  if (isLoading) {
    return null
  }

  const convertedBalance = parseInt(data as string)

  return <div className="text-6xl">{convertedBalance}</div>
}
