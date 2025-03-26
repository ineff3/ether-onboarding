import { TokenPreview } from '@/types'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface Props extends React.ComponentProps<'button'> {
  tokenPreview: TokenPreview
}

export const TokenTab = forwardRef<HTMLButtonElement, Props>(({ tokenPreview, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'w-[180px] max-h-[100px] flex flex-col gap-2 border  data-[state=active]:border-primary bg-secondary/50',
        className,
      )}
      {...props}
    >
      {tokenPreview.icon}
      <p>{tokenPreview.title}</p>
    </button>
  )
})
