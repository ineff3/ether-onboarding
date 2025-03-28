import { gldABI } from '@/abis/goldTokenABI'
import { svtABI } from '@/abis/simpleVaultTokenABI'
import { IconProps } from '@/components/icons/Icon'
import { supportedTokens } from '@/tokens'
import { ComponentType } from 'react'
import { Address } from 'viem'

export type TokenTitle = keyof typeof supportedTokens

export type GenericABI = typeof svtABI | typeof gldABI

export type TokenPreview = {
  address: Address
  contractDeploymentBlock: bigint
  abi: GenericABI
  title: TokenTitle
  Icon: ComponentType<IconProps>
  underlyingAssetTitle?: TokenTitle
}
