import { useAccount } from 'wagmi'
import { Container } from '../custom/Container'
import { Button } from '../ui/button'

export const WalletActionPanel = () => {
  const { isConnected } = useAccount()

  return (
    <Container>
      <div className="flex items-center justify-center gap-20">
        <h1 className="text-lg font-bold">Ether-Onboarding</h1>
        <div className="flex items-center gap-3">
          <Button variant="default" disabled={!isConnected}>
            Deposit
          </Button>
          <Button variant="outline" disabled={!isConnected}>
            Withdraw
          </Button>
        </div>
      </div>
    </Container>
  )
}
