import { useAccount } from 'wagmi'
import { Account } from './wallet/Account'
import { ConnectWalletDialog } from './wallet/ConnectWalletDialog'
import { WalletActionPanel } from './wallet/WalletActionPanel'

export const MenuPanel = () => {
  const { isConnected } = useAccount()

  return (
    <div className="flex w-full items-center pt-5 pb-10">
      <div className="flex grow">
        <WalletActionPanel />
      </div>
      {isConnected ? <Account /> : <ConnectWalletDialog />}
    </div>
  )
}
