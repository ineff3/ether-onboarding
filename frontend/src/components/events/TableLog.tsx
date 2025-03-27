import { Log } from 'viem'

interface Props {
  event: Log
}

export const TableLog = ({ event }: Props) => {
  return <div>{event.logIndex}</div>
}
