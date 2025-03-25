import { useConnect } from 'wagmi'
import { MetamaskIcon } from '../icons/MetamaskIcon'

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return (
    <ul className="py-5 w-full">
      {connectors.map((connector) => (
        <li className="w-full" key={connector.uid}>
          <button
            onClick={() => connect({ connector })}
            className="flex gap-3 items-center py-3 px-5 rounded-lg bg-secondary w-full hover:bg-secondary/70"
          >
            {connector.name === 'MetaMask' && <MetamaskIcon size={20} />}
            <span className=" font-medium">{connector.name}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
