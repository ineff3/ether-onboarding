import { NormalizedUnitNumber } from '@sparkdotfi/common-universal'

export const parseTokenInput = (amount: number | ''): bigint => {
  const parsedAmount = amount === '' || isNaN(amount) ? 0 : amount
  const convertedAmount = BigInt(NormalizedUnitNumber.toBaseUnit(NormalizedUnitNumber(parsedAmount), 18).toNumber())

  return convertedAmount
}
