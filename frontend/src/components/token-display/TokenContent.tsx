import { cn } from '@/lib/utils'
import { TokenPreview } from '@/types'
import { forwardRef } from 'react'

interface Props extends React.ComponentProps<'div'> {
  tokenPreview: TokenPreview
}

export const TokenContent = forwardRef<HTMLDivElement, Props>(({ tokenPreview, className, ...props }: Props, ref) => {
  return (
    <div ref={ref} className={cn('border bg-card shadow rounded-lg p-5', className)} {...props}>
      TokenContent
    </div>
  )
})
