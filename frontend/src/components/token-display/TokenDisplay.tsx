import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { TokenTab } from './TokenTab'
import { TokenContent } from './TokenContent'
import { tokenPreviews } from '@/tokens'
import { useTokenContext } from '@/contexts/TokenContext'
import { SupportedToken } from '@/types'

export const TokenDisplay = () => {
  const { selectedToken, setSelectedToken } = useTokenContext()

  const onTabChange = (title: string) => {
    if (!(title in tokenPreviews)) {
      return
    }
    setSelectedToken(tokenPreviews[title as SupportedToken])
  }

  const tokens = Object.values(tokenPreviews)

  return (
    <Tabs
      orientation="vertical"
      value={selectedToken.title}
      onValueChange={onTabChange}
      className="flex flex-row gap-10 h-[310px]"
    >
      <TabsList className="w-fit flex flex-col gap-5 h-full justify-start bg-background p-0">
        {tokens.map((tokenPreview) => (
          <TabsTrigger className="" asChild key={tokenPreview.title} value={tokenPreview.title}>
            <TokenTab tokenPreview={tokenPreview} />
          </TabsTrigger>
        ))}
      </TabsList>
      {tokens.map((tokenPreview) => (
        <TabsContent key={tokenPreview.title} value={tokenPreview.title}>
          <TokenContent />
        </TabsContent>
      ))}
    </Tabs>
  )
}
