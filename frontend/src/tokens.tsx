import { Abi } from 'viem'
import { GoldIcon } from './components/icons/GoldIcon'
import { TokenIcon } from './components/icons/TokenIcon'
import { TokenPreview } from './types'
import simpleVaultTokenABI from '@/abis/simpleVaultTokenABI.json'
import goldTokenABI from '@/abis/goldTokenABI.json'

export const tokenPreviews: TokenPreview[] = [
  {
    title: 'SVT',
    address: import.meta.env.VITE_SIMPLE_VAULT_TOKEN_ADDRESS,
    abi: simpleVaultTokenABI as Abi,
    icon: <TokenIcon size={50} />,
  },
  {
    title: 'GLD',
    address: import.meta.env.VITE_GOLD_TOKEN_ADDRESS,
    abi: goldTokenABI as Abi,
    icon: <GoldIcon size={50} />,
  },
]
