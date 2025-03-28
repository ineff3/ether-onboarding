import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { useDeposit } from '@/hooks/useDeposit'
import { useTokenContext } from '@/contexts/TokenContext'
import { useApprove } from '@/hooks/useApprove'
import { getTokenPreviewByTitle } from '@/utils/getTokenPreviewByTitle'
import { TokenTitle } from '@/types'
import { useEffect, useState } from 'react'
import { DepositTransactionOverview } from './DepositTransactionOverview'
import { Spinner } from '../custom/Spinner'
import { useQueryClient } from '@tanstack/react-query'
import { parseTokenInput } from '@/utils/parseTokenInput'

interface FormType {
  amount: number | ''
}

export const DepositDialog = () => {
  const [open, setOpen] = useState(false)
  const { selectedToken } = useTokenContext()
  const queryClient = useQueryClient()
  const [underlyingAssetTitle] = useState<TokenTitle>(selectedToken.underlyingAssetTitle!)
  const approve = useApprove(selectedToken.address)
  const { deposit, isPending, isTxFinished, isTxLoading } = useDeposit(selectedToken)
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, isDirty },
    reset,
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

  const underlyingTokenPreview = getTokenPreviewByTitle(underlyingAssetTitle)

  const onSubmit: SubmitHandler<FormType> = () => {
    if (!convertedAmount) {
      return
    }

    approve(underlyingTokenPreview, convertedAmount, {
      onSuccess: () => {
        deposit(convertedAmount)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!selectedToken.underlyingAssetTitle}>Deposit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit to get SVT</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 items-center">
            <div className="shrink-0">
              <underlyingTokenPreview.Icon size={40} />
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
          <DepositTransactionOverview amount={convertedAmount} />
          <Button disabled={!(isDirty && isValid)} type="submit" className="mt-20" size="lg">
            {(isPending || isTxLoading) && <Spinner />}
            <span>Convert</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
