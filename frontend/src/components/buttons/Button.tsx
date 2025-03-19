import styled from 'styled-components'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonSize, ButtonVariant, CommonButtonStyleProps, commonButtonStyles } from './common.ts'
import { LoaderIcon } from '../icons/LoaderIcon.tsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  loading?: boolean
  size?: ButtonSize
  icon?: ReactNode
  children?: ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'normal',
  children,
  icon,
  disabled,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton variant={variant} size={size} disabled={disabled || loading} {...props}>
      {loading && (
        <ButtonLoading>
          <LoaderIcon />
        </ButtonLoading>
      )}
      {icon}
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<CommonButtonStyleProps>`
  ${commonButtonStyles}
`

const ButtonLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  position: absolute;
  border-radius: inherit;
  width: 100%;
  height: 100%;
`
