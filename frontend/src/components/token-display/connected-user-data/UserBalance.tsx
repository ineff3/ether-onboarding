import { TokenPreview } from '@/types'
import { getBasedContract } from '@/utils/getBaseContract'
import { useAccount, useReadContract } from 'wagmi'

interface Props {
  tokenPreview: TokenPreview
}

export const UserBalance = ({ tokenPreview }: Props) => {
  const { address: account } = useAccount()

  const baseContract = getBasedContract(tokenPreview)
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
