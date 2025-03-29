import { EVENTS_QUERY_KEY } from '@/queryKeyStore'
import { TokenPreview } from '@/types'
import { wagmiConfig } from '@/wagmi.config'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getPublicClient } from '@wagmi/core'
import { sepolia } from '@wagmi/core/chains'
import { Log } from 'viem'
import { useBlockNumber } from 'wagmi'

export const useGetHistoryEvents = (selectedToken: TokenPreview, limit: number) => {
  const publicClient = getPublicClient(wagmiConfig, { chainId: sepolia.id })

  const { data: latestBlock } = useBlockNumber()

  const queryData = useQuery<Log[]>({
    queryKey: [EVENTS_QUERY_KEY, { limit, tokenTitle: selectedToken.title, latestBlock: latestBlock?.toString() }],
    queryFn: () => {
      return publicClient.getContractEvents({
        address: selectedToken.address,
        abi: selectedToken.abi,
        fromBlock: selectedToken.contractDeploymentBlock,
        toBlock: latestBlock,
      })
    },
    enabled: !!latestBlock,
    select: (data) => {
      return data.slice(-limit).reverse()
    },
    placeholderData: keepPreviousData,
  })

  return queryData
}
