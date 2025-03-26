import { Container } from '../custom/Container'
import { DepositDialog } from './DepositDialog'
import { WithdrawDialog } from './WithdrawDialog'

export const WalletActionPanel = () => {
  return (
    <Container>
      <div className="flex items-center justify-center gap-20">
        <h1 className="text-lg font-bold">Ether-Onboarding</h1>
        <div className="flex items-center gap-3">
          <DepositDialog />
          <WithdrawDialog />
        </div>
      </div>
    </Container>
  )
}
