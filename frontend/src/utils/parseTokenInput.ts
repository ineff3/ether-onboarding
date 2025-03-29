import { NormalizedUnitNumber, toBigInt } from '@sparkdotfi/common-universal'

export const parseTokenInput = (amount: number | ''): bigint => {
  const parsedAmount = amount === '' || isNaN(amount) ? 0 : amount
  const convertedAmount = toBigInt(NormalizedUnitNumber.toBaseUnit(NormalizedUnitNumber(parsedAmount), 18))

  return convertedAmount
}
