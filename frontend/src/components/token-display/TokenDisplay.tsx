import { TokenPreview } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { TokenTab } from './TokenTab'
import { TokenIcon } from '../icons/TokenIcon'
import { TokenContent } from './TokenContent'
import simpleVaultTokenABI from '@/abis/simpleVaultTokenABI.json'
import goldTokenABI from '@/abis/goldTokenABI.json'
import { Abi } from 'viem'
import { GoldIcon } from '../icons/GoldIcon'

const tokenPreviews: TokenPreview[] = [
  {
    title: 'SVT',
    address: import.meta.env.VITE_SIMPLE_VAULT_TOKEN_ADDRESS,
    abi: simpleVaultTokenABI as Abi,
    icon: <TokenIcon size={50} />,
  },
  {
    title: 'GLD',
    address: import.meta.env.VITE_GOLD_TOKEN_ADDRESS,
    abi: goldTokenABI as Abi,
    icon: <GoldIcon size={50} />,
  },
]

export const TokenDisplay = () => {
  return (
    <Tabs orientation="vertical" defaultValue={tokenPreviews[0].title} className="flex flex-row gap-10 h-[500px]">
      <TabsList className="w-fit flex flex-col gap-5 h-full justify-start bg-background p-0">
        {tokenPreviews.map((tokenPreview) => (
          <TabsTrigger className="" asChild key={tokenPreview.title} value={tokenPreview.title}>
            <TokenTab tokenPreview={tokenPreview} />
          </TabsTrigger>
        ))}
      </TabsList>
      {tokenPreviews.map((tokenPreview) => (
        <TabsContent key={tokenPreview.title} value={tokenPreview.title}>
          <TokenContent tokenPreview={tokenPreview} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
