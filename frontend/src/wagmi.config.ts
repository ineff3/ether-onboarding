import { createConfig, webSocket } from '@wagmi/core'
import { sepolia } from '@wagmi/core/chains'
import { metaMask } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [metaMask()],
  transports: {
    [sepolia.id]: webSocket(import.meta.env.VITE_SEPOLIA_RPC_URL),
  },
})
