import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { TokenTab } from './TokenTab'
import { TokenContent } from './TokenContent'
import { tokenPreviews } from '@/tokens'
import { useTokenContext } from '@/contexts/TokenContext'

export const TokenDisplay = () => {
  const { selectedToken, setSelectedToken } = useTokenContext()

  const onTabChange = (title: string) => {
    setSelectedToken(tokenPreviews.find((tokenPreview) => tokenPreview.title === title)!)
  }

  return (
    <Tabs
      orientation="vertical"
      value={selectedToken.title}
      onValueChange={onTabChange}
      className="flex flex-row gap-10 h-[280px]"
    >
      <TabsList className="w-fit flex flex-col gap-5 h-full justify-start bg-background p-0">
        {tokenPreviews.map((tokenPreview) => (
          <TabsTrigger className="" asChild key={tokenPreview.title} value={tokenPreview.title}>
            <TokenTab tokenPreview={tokenPreview} />
          </TabsTrigger>
        ))}
      </TabsList>
      {tokenPreviews.map((tokenPreview) => (
        <TabsContent key={tokenPreview.title} value={tokenPreview.title}>
          <TokenContent />
        </TabsContent>
      ))}
    </Tabs>
  )
}
