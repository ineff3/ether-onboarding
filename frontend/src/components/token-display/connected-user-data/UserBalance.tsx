import { useTokenContext } from '@/contexts/TokenContext'
import { getBasedContract } from '@/utils/getBaseContract'
import { useAccount, useReadContracts } from 'wagmi'
import { BaseUnitNumber } from '@sparkdotfi/common-universal'
import { verifyContractData } from '@/utils/verifyContractData'

export const UserBalance = () => {
  const { selectedToken } = useTokenContext()!
  const { address: account } = useAccount()

  const baseContract = getBasedContract(selectedToken)
  const { data, isLoading } = useReadContracts({
    contracts: [
      { ...baseContract, functionName: 'balanceOf', args: [account!] },
      { ...baseContract, functionName: 'decimals' },
    ],
  })

  if (isLoading || !data) {
    return null
  }
  if (!verifyContractData(data)) {
    return <div>Error happened</div>
  }
  const balance = data?.[0]?.result
  const decimals = data?.[1]?.result

  const convertedBalance = BaseUnitNumber.toNormalizedUnit(BaseUnitNumber(balance!), decimals!).toFixed(8)

  return <div className="text-6xl">{convertedBalance}</div>
}
