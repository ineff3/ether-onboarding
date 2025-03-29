import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { useTokenContext } from '@/contexts/TokenContext'
import { useCallback, useState } from 'react'
import { DepositTransactionOverview } from './DepositTransactionOverview'
import { useQueryClient } from '@tanstack/react-query'
import { parseTokenInput } from '@/utils/parseTokenInput'
import { DepositFormType, SupportedToken } from '@/types'
import { tokenPreviews } from '@/tokens'
import { useAccount } from 'wagmi'
import { DepositActions } from './DepositActions'

export const DepositDialog = () => {
  const [open, setOpen] = useState(false)
  const { address: account } = useAccount()
  const { selectedToken } = useTokenContext()
  const queryClient = useQueryClient()
  const [underlyingAssetTitle] = useState<SupportedToken>(selectedToken.underlyingAssetTitle!)
  const {
    register,
    watch,
    formState: { isValid, isDirty },
    reset,
  } = useForm<DepositFormType>({
    defaultValues: {
      amount: '',
    },
  })
  const amount = watch('amount')
  const convertedAmount = parseTokenInput(amount)

  const onDepositFinished = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['readContracts'] })
    setOpen(false)
    reset()
  }, [setOpen, reset, queryClient])

  const underlyingTokenPreview = tokenPreviews[underlyingAssetTitle]

  const isFormInvalid = !(isDirty && isValid)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!selectedToken.underlyingAssetTitle || !account}>Deposit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit to get SVT</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-5">
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
          <DepositActions
            convertedAmount={convertedAmount}
            isFormInvalid={isFormInvalid}
            onDepositFinished={onDepositFinished}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}
