import { Abi } from 'viem'

export type TokenPreview = {
  address: string
  abi: Abi
  title: string
  icon: JSX.Element
}
