import { shortenText } from '@/utils/shortenText'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { Button } from '../ui/button'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  const formattedAddress = shortenText(address, 6, 4)

  return (
    <div className="flex justify-center items-center bg-secondary py-3 px-4 rounded-lg gap-5">
      <Button variant="outline" onClick={() => disconnect()}>
        Disconnect
      </Button>
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
  )
}
