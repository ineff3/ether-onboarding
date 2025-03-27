import { useAccount, useWatchContractEvent } from 'wagmi'
import { Container } from '../custom/Container'
import { useTokenContext } from '@/contexts/TokenContext'
import { getBasedContract } from '@/utils/getBaseContract'
import { EventsTable } from './EventsTable'
import { useGetHistoryEvents } from '@/hooks/useGetHistoryEvents'
import { Logs } from 'lucide-react'

const LOGS_LIMIT = 10

export const TokenEventsPanel = () => {
  const { selectedToken } = useTokenContext()!
  const { address: account } = useAccount()
  const baseContract = getBasedContract(selectedToken)
  const { events, isLoading, isError } = useGetHistoryEvents(selectedToken, LOGS_LIMIT)

  useWatchContractEvent({
    ...baseContract,
    args: {
      to: account,
    },
    onLogs: (logs) => {
      console.log('New logs!', logs)
    },
  })
  console.log(events)

  return (
    <Container>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <Logs size={23} />
          <p className="font-semibold text-lg self-end">Latest contract events </p>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Unable to fetch latest events</p>
        ) : (
          <EventsTable events={events} />
        )}
      </div>
    </Container>
  )
}
