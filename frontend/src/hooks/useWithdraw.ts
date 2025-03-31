import { TokenPreview } from '@/types'
import { getBasedContract } from '@/utils/getBaseContract'
import { wagmiConfig } from '@/wagmi.config'
import { readContracts } from '@wagmi/core'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

export const useWithdraw = () => {
  const { address: account } = useAccount()
  const { writeContract, data } = useWriteContract()

  const { isLoading: isTxLoading, isSuccess: isTxFinished } = useWaitForTransactionReceipt({
    hash: data,
  })

  const withdraw = async (tokenPreview: TokenPreview, amount: bigint) => {
    const baseContract = getBasedContract(tokenPreview)
    const result = await readContracts(wagmiConfig, {
      contracts: [
        {
          ...baseContract,
          functionName: 'convertToAssets',
          args: [amount],
        },
      ],
    })

    if (!result) {
      return
    }

    const assets = result?.[0].result

    writeContract({ ...baseContract, functionName: 'withdraw', args: [assets!, account!, account!] })
  }

  return { withdraw, isTxLoading, isTxFinished }
}
