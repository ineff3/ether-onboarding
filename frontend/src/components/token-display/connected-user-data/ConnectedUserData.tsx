import { UserBalance } from './UserBalance'
import { useTokenContext } from '@/contexts/TokenContext'

export const ConnectedUserData = () => {
  const { selectedToken } = useTokenContext()!
  return (
    <div className="flex gap-3 items-center">
      {selectedToken.icon}
      <UserBalance />
    </div>
  )
}
