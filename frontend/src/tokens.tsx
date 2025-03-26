import { GoldIcon } from './components/icons/GoldIcon'
import { TokenIcon } from './components/icons/TokenIcon'
import { TokenPreview } from './types'
import { svtABI } from './abis/simpleVaultTokenABI'
import { gldABI } from './abis/goldTokenABI'

export const supportedTokens = {
  SVT: 'SVT',
  GLD: 'GLD',
}

export const tokenPreviews: TokenPreview[] = [
  {
    title: 'SVT',
    address: import.meta.env.VITE_SIMPLE_VAULT_TOKEN_ADDRESS,
    abi: svtABI,
    icon: <TokenIcon size={50} />,
    underlyingAssetTitle: 'GLD',
  },
  {
    title: 'GLD',
    address: import.meta.env.VITE_GOLD_TOKEN_ADDRESS,
    abi: gldABI,
    icon: <GoldIcon size={50} />,
  },
]
