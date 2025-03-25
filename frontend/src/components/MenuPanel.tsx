import { useAccount, useBalance } from 'wagmi'
import { Account } from './wallet/Account'
import { ConnectWalletDialog } from './wallet/ConnectWalletDialog'
import { sepolia } from 'viem/chains'

export const MenuPanel = () => {
  const { address, isConnected } = useAccount()

  const result = useBalance({
    address,
    chainId: sepolia.id,
  })
  console.log(result.data)

  return (
    <div className="flex w-full justify-end items-center p-5">
      {isConnected ? <Account /> : <ConnectWalletDialog />}
    </div>
  )
}
