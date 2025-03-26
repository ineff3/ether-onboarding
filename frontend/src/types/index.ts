import { supportedTokens } from '@/tokens'
import { Abi, Address } from 'viem'

export type TokenTitle = keyof typeof supportedTokens

export type TokenPreview = {
  address: Address
  abi: Abi
  title: TokenTitle
  icon: JSX.Element
  underlyingAssetTitle?: TokenTitle
}
