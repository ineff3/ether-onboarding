import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { useAccount, useReadContracts } from 'wagmi'
import { ConnectedUserData } from './connected-user-data/ConnectedUserData'
import { getBasedContract } from '@/utils/getBaseContract'
import { useTokenContext } from '@/contexts/TokenContext'
import { BaseUnitNumber } from '@sparkdotfi/common-universal'
import { UnderlyingAssetBalance } from './UnderlyingAssetBalance'
import { verifyContractData } from '@/utils/verifyContractData'

export const TokenContent = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(({ className, ...props }, ref) => {
  const { selectedToken } = useTokenContext()
  const { isConnected } = useAccount()
  const baseContract = getBasedContract(selectedToken)
  const { data, isLoading } = useReadContracts({
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
      {
        ...baseContract,
        functionName: 'decimals',
      },
    ],
  })

  if (isLoading || !data) {
    return null
  }
  const { underlyingAssetTitle } = selectedToken
  if (underlyingAssetTitle && !verifyContractData(data)) {
    return <div>Error happened</div>
  }

  const name = data?.[0]?.result
  const symbol = data?.[1]?.result
  const totalSupply = data?.[2]?.result
  const asset = data?.[3]?.result
  const decimals = data?.[4]?.result

  const convertedTotalSupply = BaseUnitNumber.toNormalizedUnit(BaseUnitNumber(totalSupply!), decimals!).toFixed(3)

  return (
    <div ref={ref} className={cn('rounded-lg bg-secondary text-card-foreground shadow-sm p-5', className)} {...props}>
      {data && (
        <div className="flex flex-col gap-10">
          <div className="flex items-center">
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold tracking-tight">{name}</h2>
              {underlyingAssetTitle && (
                <div className="mt-2">
                  <p>Underlying asset</p>
                  <div className="text-sm text-muted-foreground flex">
                    <p className="w-[60px]">address:</p> <p>{asset}</p>
                  </div>
                  <UnderlyingAssetBalance
                    underlyingAssetTitle={underlyingAssetTitle}
                    selectedAssetAddress={selectedToken.address}
                    decimals={decimals!}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col items-center bg-primary text-primary-foreground text-sm p-3 rounded-lg">
              <p className="font-bold">Total supply</p>
              <p className="text-lg">
                {convertedTotalSupply} <span>{symbol}</span>
              </p>
            </div>
          </div>
          {isConnected && <ConnectedUserData />}
        </div>
      )}
    </div>
  )
})
