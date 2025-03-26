import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { useDeposit } from '@/hooks/useDeposit'
import { useTokenContext } from '@/contexts/TokenContext'
import { useApprove } from '@/hooks/useApprove'
import { getTokenPreviewByTitle } from '@/utils/getTokenPreviewByTitle'
import { TokenTitle } from '@/types'
import { useState } from 'react'
import { TransactionOverview } from './TransactionOverview'

interface FormType {
  amount: number | ''
}

export const DepositDialog = () => {
  const [open, setOpen] = useState(false)
  const { selectedToken } = useTokenContext()!
  const [underlyingAssetTitle] = useState<TokenTitle>(selectedToken.underlyingAssetTitle!)
  const approve = useApprove(selectedToken.address)
  const deposit = useDeposit(selectedToken)
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, isDirty },
  } = useForm<FormType>({
    defaultValues: {
      amount: '',
    },
  })
  const amount = watch('amount')

  const underlyingTokenPreview = getTokenPreviewByTitle(underlyingAssetTitle)

  const onSubmit: SubmitHandler<FormType> = ({ amount }) => {
    if (!amount) {
      return
    }

    approve(underlyingTokenPreview, amount, {
      onError: (error) => {
        console.log(error)
      },
      onSuccess: () => {
        deposit(amount, {
          onSuccess: () => {
            setOpen(false)
          },
        })
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
              type="number"
              placeholder="0"
              {...register('amount', {
                valueAsNumber: true,
                min: 0,
              })}
            />
          </div>
          <TransactionOverview amount={amount} />
          <Button
            disabled={!(isDirty && isValid && !isNaN(amount as number))}
            type="submit"
            className="mt-20"
            size="lg"
          >
            Convert
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
