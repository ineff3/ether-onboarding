import { useTokenContext } from '@/contexts/TokenContext'
import { getBasedContract } from '@/utils/getBaseContract'
import { useAccount, useReadContracts } from 'wagmi'
import { BaseUnitNumber } from '@sparkdotfi/common-universal'

export const UserBalance = () => {
  const { selectedToken } = useTokenContext()!
  const { address: account } = useAccount()

  const baseContract = getBasedContract(selectedToken)
  const { data, isLoading } = useReadContracts({
    contracts: [
      { ...baseContract, functionName: 'balanceOf', args: [account] },
      { ...baseContract, functionName: 'decimals' },
    ],
  })

  if (isLoading) {
    return null
  }
  const balance = data?.[0]?.result as string
  const decimals = data?.[1]?.result as number
  const convertedBalance = BaseUnitNumber.toNormalizedUnit(BaseUnitNumber(balance), decimals).toFixed(8)

  return <div className="text-6xl">{convertedBalance}</div>
}
