import { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'big' | 'normal' | 'small' | 'extraSmall'

export interface CommonButtonStyleProps {
  variant: ButtonVariant
  size: ButtonSize
}

export const commonButtonStyles = css<CommonButtonStyleProps>`
  display: flex;
  height: ${({ size }) => sizeMapping[size]};
  width: fit-content;
  padding: ${({ size }) => (size === 'extraSmall' ? '4px' : '4px 8px')};
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 64px;
  border-width: 0;
  cursor: pointer;
  position: relative;
  background-color: ${({ variant }) => (variant === 'primary' ? '#637BD5' : '#FFFFFF')};
  color: ${({ variant }) => (variant === 'primary' ? '#FFFFFF' : '#0B0E14')};

  &:disabled {
    background-color: #f8f9fb;
    color: #9faac4;
    cursor: not-allowed;
  }

  ${({ variant }) =>
    variant === 'secondary' &&
    css`
      border-width: 1px;
      border-style: solid;
      border-color: #e7eaf3;
    `}
`

const sizeMapping: Record<ButtonSize, number> = {
  big: 56,
  normal: 40,
  small: 32,
  extraSmall: 24,
}
