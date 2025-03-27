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
          <TableHead className="w-[50px]">№</TableHead>
          <TableHead className="w-[100px]">Block</TableHead>
          <TableHead className="w-[180px]">Transaction Hash</TableHead>
          <TableHead>Event Name</TableHead>
          <TableHead>Arguments</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event, index) => (
          <TableRow key={event.logIndex}>
            <TableCell className="py-5 align-top">{index + 1}</TableCell>
            <TableCell className="font-medium py-5 align-top">{event.blockNumber?.toString()}</TableCell>
            <TableCell className="py-5 align-top">
              <a
                target="_blank"
                href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}
                className="text-blue-600 cursor-pointer"
              >
                {shortenText(event.transactionHash!, 12, 0)}
              </a>
            </TableCell>
            <TableCell className="py-5 align-top">
              {'eventName' in event ? (event.eventName as string) : null}
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
