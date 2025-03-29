import { DialogDescription } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { WalletOptions } from './WalletOptions'

export const ConnectWalletDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect a Wallet</DialogTitle>
          <DialogDescription>
            Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs.
          </DialogDescription>
          <WalletOptions />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
