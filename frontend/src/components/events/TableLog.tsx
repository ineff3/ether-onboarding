import { Log } from 'viem'

interface Props {
  event: Log
}

export const TableLog = ({ event }: Props) => {
  const args = 'args' in event ? (event.args as Record<string, bigint | string>) : null

  return (
    <div className="flex flex-col gap-2">
      {args &&
        Object.keys(args).map((argsKey) => (
          <div key={argsKey} className="flex gap-2 ">
            <p className="text-sm text-muted-foreground w-[60px]">{argsKey}</p>
            <p>{typeof args[argsKey] === 'bigint' ? args[argsKey].toString() : args[argsKey]} </p>
          </div>
        ))}
    </div>
  )
}
