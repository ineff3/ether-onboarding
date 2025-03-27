import { Log } from 'viem'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { TableLog } from './TableLog'
import { shortenText } from '@/utils/shortenText'

interface Props {
  events: Log[]
}

export const EventsTable = ({ events }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Block</TableHead>
          <TableHead className="w-[180px]">Transaction Hash</TableHead>
          <TableHead>Log</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow className="py-5" key={event.logIndex}>
            <TableCell className="font-medium py-5">{event.blockNumber?.toString()}</TableCell>
            <TableCell className="py-5">
              <a
                target="_blank"
                href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}
                className="text-blue-600 cursor-pointer"
              >
                {shortenText(event.transactionHash!, 12, 0)}
              </a>
            </TableCell>
            <TableCell className="py-5">
              <TableLog event={event} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
