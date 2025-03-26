import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { useAccount, useReadContracts } from 'wagmi'
import { ConnectedUserData } from './connected-user-data/ConnectedUserData'
import { getBasedContract } from '@/utils/getBaseContract'
import { useTokenContext } from '@/contexts/TokenContext'

export const TokenContent = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(({ className, ...props }, ref) => {
  const { selectedToken } = useTokenContext()!
  const { isConnected } = useAccount()
  const baseContract = getBasedContract(selectedToken)
  const { data } = useReadContracts({
    contracts: [
      {
        ...baseContract,
        functionName: 'name',
      },
      {
        ...baseContract,
        functionName: 'symbol',
      },
      {
        ...baseContract,
        functionName: 'totalSupply',
      },
      {
        ...baseContract,
        functionName: 'asset',
      },
    ],
  })

  const name = data?.[0]?.result as string
  const symbol = data?.[1]?.result as string
  const totalSupply = parseInt(data?.[2]?.result as string)
  const asset = data?.[3]?.result as string

  return (
    <div ref={ref} className={cn('rounded-lg bg-secondary text-card-foreground shadow-sm p-5', className)} {...props}>
      {data && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center">
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold tracking-tight">{name}</h2>
              {asset && (
                <p className="text-sm text-muted-foreground">
                  Underlying asset address: <span>{asset}</span>
                </p>
              )}
            </div>
            <div className="flex flex-col items-center bg-primary text-primary-foreground font-semibold text-sm p-3 rounded-lg">
              <p>Total supply</p>
              <p>
                {totalSupply} <span>{symbol}</span>
              </p>
            </div>
          </div>
          {isConnected && <ConnectedUserData />}
        </div>
      )}
    </div>
  )
})
