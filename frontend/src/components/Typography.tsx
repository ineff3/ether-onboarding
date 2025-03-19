import styled from 'styled-components'
import { ReactNode } from 'react'

type TypographyVariant = 'body1' | 'body2' | 'body3' | 'h1' | 'h2' | 'h3'
type FontColor = 'default' | 'light' | 'white'
type FontWeight = 'default' | 'bold'

interface TypographyProps {
  variant: TypographyVariant
  fontColor?: FontColor
  fontWeight?: FontWeight
  children?: ReactNode
}

export const Typography = ({ variant, children, fontColor = 'default', fontWeight = 'default' }: TypographyProps) => {
  const Component = variantToComponent[variant]
  return (
    <Component $fontColor={fontColor} $fontWeight={fontWeight}>
      {children}
    </Component>
  )
}

interface StyledTypographyProps {
  $fontColor: FontColor
  $fontWeight: FontWeight
}

const Body1 = styled.div<StyledTypographyProps>`
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  color: ${({ $fontColor }) => fontColorMapping[$fontColor]};
  font-weight: ${({ $fontWeight }) => fontWeightMapping[$fontWeight]};
`

const Body2 = styled.div<StyledTypographyProps>`
  font-size: 14px;
  font-style: normal;
  line-height: 24px;
  color: ${({ $fontColor }) => fontColorMapping[$fontColor]};
  font-weight: ${({ $fontWeight }) => fontWeightMapping[$fontWeight]};
`

const Body3 = styled.div<StyledTypographyProps>`
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  color: ${({ $fontColor }) => fontColorMapping[$fontColor]};
  font-weight: ${({ $fontWeight }) => fontWeightMapping[$fontWeight]};
`

const H1 = styled.h1<StyledTypographyProps>`
  font-size: 32px;
  font-style: normal;
  line-height: 40px;
  color: ${({ $fontColor }) => fontColorMapping[$fontColor]};
  font-weight: ${({ $fontWeight }) => fontWeightMapping[$fontWeight]};
`

const H2 = styled.h2<StyledTypographyProps>`
  font-size: 24px;
  font-style: normal;
  line-height: 32px;
  color: ${({ $fontColor }) => fontColorMapping[$fontColor]};
  font-weight: ${({ $fontWeight }) => fontWeightMapping[$fontWeight]};
`

const H3 = styled.h3<StyledTypographyProps>`
  font-size: 18px;
  font-style: normal;
  line-height: 24px;
  color: ${({ $fontColor }) => fontColorMapping[$fontColor]};
  font-weight: ${({ $fontWeight }) => fontWeightMapping[$fontWeight]};
`

const variantToComponent = {
  h1: H1,
  h2: H2,
  h3: H3,
  body1: Body1,
  body2: Body2,
  body3: Body3,
}

const fontColorMapping: Record<FontColor, string> = {
  default: '#0B0E14',
  light: '#515A6C',
  white: '#FFFFFF',
}

const fontWeightMapping: Record<FontWeight, number> = {
  default: 500,
  bold: 700,
}
