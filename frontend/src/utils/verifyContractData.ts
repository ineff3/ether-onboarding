import { MulticallReturnType } from '@wagmi/core'

export const verifyContractData = (data: MulticallReturnType): boolean => {
  return !data.some((contract) => contract.status === 'failure')
}
