import { EVENTS_QUERY_KEY } from '@/queryKeyStore'
import { TokenPreview } from '@/types'
import { wagmiConfig } from '@/wagmi.config'
import { useQuery } from '@tanstack/react-query'
import { getPublicClient } from '@wagmi/core'
import { sepolia } from '@wagmi/core/chains'
import { Log } from 'viem'

export const useGetHistoryEvents = (selectedToken: TokenPreview, limit: number) => {
  const publicClient = getPublicClient(wagmiConfig, { chainId: sepolia.id })

  const { data: latestBlock } = useQuery({ queryKey: ['latestBlock'], queryFn: () => publicClient.getBlockNumber() })

  const queryData = useQuery<Log[]>({
    queryKey: [EVENTS_QUERY_KEY, { limit, tokenTitle: selectedToken.title }],
    queryFn: () => {
      const fromBlockLimit = latestBlock! - 10000n
      const fromBlock = fromBlockLimit > 0n ? fromBlockLimit : 'earliest'

      return publicClient.getContractEvents({
        address: selectedToken.address,
        abi: selectedToken.abi,
        fromBlock,
        toBlock: latestBlock,
      })
    },
    enabled: !!latestBlock,
    select: (data) => {
      return data.slice(-limit).reverse()
    },
  })

  return queryData
}
