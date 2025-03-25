import { TokenPreview } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { TokenTab } from './TokenTab'
import { TokenIcon } from '../icons/TokenIcon'
import { TokenContent } from './TokenContent'

const tokenPreviews: TokenPreview[] = [
  {
    title: 'SVT',
    address: import.meta.env.SIMPLE_VAULT_TOKEN_ADDRESS,
    icon: <TokenIcon size={30} />,
  },
]

export const TokenDisplay = () => {
  return (
    <Tabs orientation="vertical" defaultValue={tokenPreviews[0].title} className="flex flex-row gap-10 h-[500px]">
      <TabsList className="w-fit flex flex-col h-full justify-start bg-background p-0">
        {tokenPreviews.map((tokenPreview) => (
          <TabsTrigger className="" asChild key={tokenPreview.title} value={tokenPreview.title}>
            <TokenTab tokenPreview={tokenPreview} />
          </TabsTrigger>
        ))}
      </TabsList>
      <div>
        {tokenPreviews.map((tokenPreview) => (
          <TabsContent key={tokenPreview.title} value={tokenPreview.title}>
            <TokenContent tokenPreview={tokenPreview} />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
