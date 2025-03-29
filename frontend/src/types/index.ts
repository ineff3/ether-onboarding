import { gldABI } from '@/abis/goldTokenABI'
import { svtABI } from '@/abis/simpleVaultTokenABI'
import { IconProps } from '@/components/icons/Icon'
import { ComponentType } from 'react'
import { Address } from 'viem'

export type SupportedToken = 'SVT' | 'GLD'

export type GenericABI = typeof svtABI | typeof gldABI

export type TokenPreview = {
  address: Address
  contractDeploymentBlock: bigint
  abi: GenericABI
  title: SupportedToken
  Icon: ComponentType<IconProps>
  underlyingAssetTitle?: SupportedToken
}

export interface DepositFormType {
  amount: number | ''
}
