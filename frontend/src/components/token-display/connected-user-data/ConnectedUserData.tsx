import { TokenPreview } from '@/types'
import { UserBalance } from './UserBalance'

interface Props {
  tokenPreview: TokenPreview
}

export const ConnectedUserData = ({ tokenPreview }: Props) => {
  return (
    <div className="flex gap-3 items-center">
      {tokenPreview.icon}
      <UserBalance tokenPreview={tokenPreview} />
    </div>
  )
}
