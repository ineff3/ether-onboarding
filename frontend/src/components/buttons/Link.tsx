import styled from 'styled-components'
import { AnchorHTMLAttributes, ReactNode } from 'react'
import { CommonButtonStyleProps, commonButtonStyles } from './common.ts'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'big' | 'normal' | 'small' | 'extraSmall'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  children?: ReactNode
}

export const Link = ({ variant = 'primary', size = 'normal', children, icon, ...props }: LinkProps) => {
  return (
    <StyledLink variant={variant} size={size} {...props}>
      {icon}
      {children}
    </StyledLink>
  )
}

const StyledLink = styled.a<CommonButtonStyleProps>`
  ${commonButtonStyles}
`
