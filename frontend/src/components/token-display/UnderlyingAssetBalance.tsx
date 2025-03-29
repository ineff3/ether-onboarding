import { tokenPreviews } from '@/tokens'
import { SupportedToken } from '@/types'
import { getBasedContract } from '@/utils/getBaseContract'
import { Address } from 'viem'
import { useReadContracts } from 'wagmi'
import { BaseUnitNumber } from '@sparkdotfi/common-universal'
import { verifyContractData } from '@/utils/verifyContractData'

interface Props {
  selectedAssetAddress: Address
  underlyingAssetTitle: SupportedToken
  decimals: number
}

export const UnderlyingAssetBalance = ({ underlyingAssetTitle, selectedAssetAddress, decimals }: Props) => {
  const underlyingBaseContract = getBasedContract(tokenPreviews[underlyingAssetTitle])

  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        ...underlyingBaseContract,
        functionName: 'balanceOf',
        args: [selectedAssetAddress],
      },
      { ...underlyingBaseContract, functionName: 'symbol' },
    ],
  })

  if (isLoading || !data) {
    return null
  }

  if (!verifyContractData(data)) {
    return <div>Error happened</div>
  }

  const balance = data?.[0].result
  const symbol = data?.[1].result

  const convertedBalance = BaseUnitNumber.toNormalizedUnit(BaseUnitNumber(balance!), decimals).toFixed(3)

  return (
    <div className="text-sm text-muted-foreground flex">
      <p className="w-[60px]">balance:</p> <p>{convertedBalance}</p> <p>{symbol}</p>
    </div>
  )
}
