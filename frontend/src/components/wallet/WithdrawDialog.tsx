import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { useTokenContext } from '@/contexts/TokenContext'
import { useEffect, useState } from 'react'
import { useWithdraw } from '@/hooks/useWithdraw'
import { WithdrawTransactionOverview } from './WithdrawTransactionOverview'
import { Spinner } from '../custom/Spinner'
import { useQueryClient } from '@tanstack/react-query'
import { parseTokenInput } from '@/utils/parseTokenInput'
import { SupportedToken } from '@/types'
import { tokenPreviews } from '@/tokens'

interface FormType {
  amount: number | ''
}

export const WithdrawDialog = () => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const { selectedToken } = useTokenContext()
  const [underlyingAssetTitle] = useState<SupportedToken>(selectedToken.underlyingAssetTitle!)
  const underlyingTokenPreview = tokenPreviews[underlyingAssetTitle]
  const { withdraw, isPending, isTxLoading, isTxFinished } = useWithdraw()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isDirty },
  } = useForm<FormType>({
    defaultValues: {
      amount: '',
    },
  })
  const amount = watch('amount')
  const convertedAmount = parseTokenInput(amount)

  useEffect(() => {
    if (isTxFinished) {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['readContracts'], exact: false })
      reset()
    }
  }, [isTxFinished, queryClient, reset])

  const onSubmit: SubmitHandler<FormType> = () => {
    if (!convertedAmount) {
      return
    }
    withdraw(selectedToken, convertedAmount)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={!selectedToken.underlyingAssetTitle}>
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw to get {underlyingAssetTitle}</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 items-center">
            <div className="shrink-0">
              <selectedToken.Icon size={40} />
            </div>
            <Input
              step="any"
              type="number"
              placeholder="0"
              {...register('amount', {
                valueAsNumber: true,
                min: 0,
              })}
            />
          </div>
          <WithdrawTransactionOverview amount={convertedAmount} underlyingAssetPreview={underlyingTokenPreview} />
          <Button disabled={!(isDirty && isValid)} type="submit" className="mt-20" size="lg">
            {(isPending || isTxLoading) && <Spinner />}
            <span>Convert</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
