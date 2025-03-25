import { shortenText } from '@/utils/shortenText'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { Button } from '../ui/button'
import { Container } from '../custom/Container'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  const formattedAddress = shortenText(address, 6, 4)

  return (
    <Container>
      <div className="flex justify-center items-center gap-5">
        <Button onClick={() => disconnect()}>Disconnect</Button>
        <div className="flex gap-2 items-center">
          {address && (
            <div className="font-medium">{ensName ? `${ensName} (${formattedAddress})` : formattedAddress}</div>
          )}
          {ensAvatar ? (
            <img alt="ENS Avatar" src={ensAvatar} />
          ) : (
            <div className="w-[40px] h-[40px] rounded-full bg-secondary-foreground"></div>
          )}
        </div>
      </div>
    </Container>
  )
}
