import { useTokenContext } from '@/contexts/TokenContext'
import { getBasedContract } from '@/utils/getBaseContract'
import { useReadContracts } from 'wagmi'
import { TokenPreview } from '@/types'
import { BaseUnitNumber } from '@sparkdotfi/common-universal'
import { keepPreviousData } from '@tanstack/react-query'

interface Props {
  amount: bigint
  underlyingAssetPreview: TokenPreview
}

export const WithdrawTransactionOverview = ({ amount, underlyingAssetPreview }: Props) => {
  const { selectedToken } = useTokenContext()
  const baseContract = getBasedContract(selectedToken)

  const { data } = useReadContracts({
    contracts: [
      {
        ...baseContract,
        functionName: 'convertToAssets',
        args: [amount],
      },
      { ...baseContract, functionName: 'decimals' },
    ],
    query: {
      enabled: !!amount,
      placeholderData: keepPreviousData,
    },
  })

  const assets = data?.[0]?.result
  const decimals = data?.[1]?.result
  const convertedAssets = data && BaseUnitNumber.toNormalizedUnit(BaseUnitNumber(assets!), decimals!).toFixed(8)

  return (
    <div>
      <p className="text-sm text-muted-foreground">Transaction overview</p>
      <div className="flex gap-3 mt-2 bg-secondary p-5 items-center rounded-sm">
        <div className="grow">
          <div className="font-bold">Outcome</div>
          <div className="text-lg flex gap-2 items-center">
            {amount ? convertedAssets : '-'}
            <span>{underlyingAssetPreview.title}</span>
          </div>
        </div>
        <underlyingAssetPreview.Icon size={50} />
      </div>
    </div>
  )
}
