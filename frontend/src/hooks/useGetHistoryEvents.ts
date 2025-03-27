import { TokenPreview } from '@/types'
import { wagmiConfig } from '@/wagmi.config'
import { getPublicClient } from '@wagmi/core'
import { sepolia } from '@wagmi/core/chains'
import { useEffect, useState } from 'react'
import { Log } from 'viem'

export const useGetHistoryEvents = (selectedToken: TokenPreview, limit: number) => {
  const [events, setEvents] = useState<Log[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<Error | null>(null)

  useEffect(() => {
    const getHistoryLogs = async () => {
      setIsLoading(true)
      try {
        const publicClient = getPublicClient(wagmiConfig, { chainId: sepolia.id })

        const latestBlock = await publicClient.getBlockNumber()
        const fromBlockLimit = latestBlock - 10000n
        const fromBlock = fromBlockLimit > 0n ? fromBlockLimit : 'earliest'

        const events = await publicClient.getContractEvents({
          address: selectedToken.address,
          abi: selectedToken.abi,
          fromBlock,
          toBlock: latestBlock,
        })

        const latestLogs = events.slice(-limit).reverse()
        setEvents(latestLogs)
      } catch (err) {
        setIsError(err as Error)
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getHistoryLogs()
  }, [selectedToken, limit])

  return { events, isLoading, isError }
}
