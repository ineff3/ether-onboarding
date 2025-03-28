import { GoldIcon } from './components/icons/GoldIcon'
import { TokenIcon } from './components/icons/TokenIcon'
import { SupportedToken, TokenPreview } from './types'
import { svtABI } from './abis/simpleVaultTokenABI'
import { gldABI } from './abis/goldTokenABI'

export const tokenPreviews = {
  SVT: {
    title: 'SVT',
    address: import.meta.env.VITE_SIMPLE_VAULT_TOKEN_ADDRESS,
    contractDeploymentBlock: 7979668n,
    abi: svtABI,
    Icon: TokenIcon,
    underlyingAssetTitle: 'GLD',
  },
  GLD: {
    title: 'GLD',
    address: import.meta.env.VITE_GOLD_TOKEN_ADDRESS,
    contractDeploymentBlock: 7979668n,
    abi: gldABI,
    Icon: GoldIcon,
  },
} satisfies Record<SupportedToken, TokenPreview>
