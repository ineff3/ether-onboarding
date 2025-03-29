import { useTokenContext } from '@/contexts/TokenContext'
import { Button } from '../ui/button'
import { useApprove } from '@/hooks/useApprove'
import { tokenPreviews } from '@/tokens'
import { Spinner } from '../custom/Spinner'
import { useDeposit } from '@/hooks/useDeposit'
import { useEffect } from 'react'

interface Props {
  convertedAmount: bigint
  isFormInvalid: boolean
  onDepositFinished: () => void
}

export const DepositActions = ({ convertedAmount, isFormInvalid, onDepositFinished }: Props) => {
  const { selectedToken } = useTokenContext()
  const underlyingTokenPreview = tokenPreviews[selectedToken.underlyingAssetTitle!]
  const {
    approve,
    isTxLoading: isApproveTxLoading,
    isTxFinished: isApproveTxFinished,
  } = useApprove(selectedToken.address)

  const { deposit, isTxLoading: isDepositTxLoading, isTxFinished: isDepositTxFinished } = useDeposit(selectedToken)

  useEffect(() => {
    if (isDepositTxFinished) {
      onDepositFinished()
    }
  }, [isDepositTxFinished, onDepositFinished])

  const onApprove = () => {
    approve(underlyingTokenPreview, convertedAmount)
  }

  const onDeposit = () => {
    deposit(convertedAmount)
  }

  return (
    <div>
      <p className=" text-sm text-muted-foreground">Actions</p>
      <div className="border rounded-md mt-2 flex flex-col ">
        <div className="flex p-5 gap-5 items-center font-medium border-b min-h-[81px]">
          <div className="bg-secondary py-2 px-4 rounded">1</div>
          <div className="grow flex items-center gap-2">
            {<selectedToken.Icon size={30} />}
            <span>Approve {selectedToken.title}</span>
          </div>
          {!isApproveTxFinished && (
            <div>
              <Button
                variant="outline"
                disabled={isFormInvalid || isApproveTxLoading}
                type="button"
                onClick={onApprove}
              >
                {isApproveTxLoading && <Spinner />}
                <span>Approve</span>
              </Button>
            </div>
          )}
        </div>
        <div className="flex p-5 gap-5 items-center font-medium min-h-[81px]">
          <div className="bg-secondary py-2 px-4 rounded">2</div>
          <div className="grow flex items-center">
            <div className="flex">
              <selectedToken.Icon size={30} />
              <div className="relative -left-2">
                <underlyingTokenPreview.Icon size={30} />
              </div>
            </div>
            <span>
              Convert {selectedToken.underlyingAssetTitle} to {selectedToken.title}
            </span>
          </div>
          <div>
            <Button
              variant="outline"
              disabled={!isApproveTxFinished || isDepositTxLoading}
              type="button"
              onClick={onDeposit}
            >
              {isDepositTxLoading && <Spinner />}
              <span>Convert</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
