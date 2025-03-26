import { useTokenContext } from '@/contexts/TokenContext'
import { getBasedContract } from '@/utils/getBaseContract'
import { useReadContract } from 'wagmi'
import { Spinner } from '../custom/Spinner'

interface Props {
  amount: number | ''
}

export const TransactionOverview = ({ amount }: Props) => {
  const { selectedToken } = useTokenContext()!
  const baseContract = getBasedContract(selectedToken)

  const { data, isFetching } = useReadContract({
    ...baseContract,
    functionName: 'convertToShares',
    args: [amount],
    query: {
      enabled: !!amount,
    },
  })

  const parsedData = data && parseInt(data as string)

  return (
    <div>
      <p className="text-sm text-muted-foreground">Transaction overview</p>
      <div className="flex gap-3 mt-2 bg-secondary p-5 items-center rounded-sm">
        <div className="grow">
          <div className="font-bold">Estimated Shares</div>
          <div className="text-lg flex gap-2 items-center">
            {isFetching ? <Spinner /> : ((parsedData as string) ?? '0')} <span>{selectedToken.title}</span>
          </div>
        </div>
        <selectedToken.Icon size={50} />
      </div>
    </div>
  )
}
