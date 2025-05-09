import { useTokenContext } from '@/contexts/TokenContext'
import { getBasedContract } from '@/utils/getBaseContract'
import { useReadContracts } from 'wagmi'
import { BaseUnitNumber } from '@sparkdotfi/common-universal'
import { keepPreviousData } from '@tanstack/react-query'

interface Props {
  amount: bigint
}

export const DepositTransactionOverview = ({ amount }: Props) => {
  const { selectedToken } = useTokenContext()
  const baseContract = getBasedContract(selectedToken)

  const { data } = useReadContracts({
    contracts: [
      {
        ...baseContract,
        functionName: 'convertToShares',
        args: [amount],
      },
      { ...baseContract, functionName: 'decimals' },
    ],
    query: {
      enabled: !!amount,
      placeholderData: keepPreviousData,
    },
  })
  const shares = data?.[0]?.result
  const decimals = data?.[1]?.result
  const convertedShares = data && BaseUnitNumber.toNormalizedUnit(BaseUnitNumber(shares!), decimals!).toFixed(8)

  return (
    <div>
      <p className="text-sm text-muted-foreground">Transaction overview</p>
      <div className="flex gap-3 mt-2 bg-secondary p-5 items-center rounded-sm">
        <div className="grow">
          <div className="font-bold">Estimated Shares</div>
          <div className="text-lg flex gap-2 items-center">
            {amount ? convertedShares : '-'}
            <span>{selectedToken.title}</span>
          </div>
        </div>
        <selectedToken.Icon size={50} />
      </div>
    </div>
  )
}
