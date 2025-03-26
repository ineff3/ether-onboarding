import { IconProps } from '@/components/icons/Icon'
import { supportedTokens } from '@/tokens'
import { ComponentType } from 'react'
import { Abi, Address } from 'viem'

export type TokenTitle = keyof typeof supportedTokens

export type TokenPreview = {
  address: Address
  abi: Abi
  title: TokenTitle
  Icon: ComponentType<IconProps>
  underlyingAssetTitle?: TokenTitle
}
