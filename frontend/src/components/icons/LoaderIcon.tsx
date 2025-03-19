import styled, { keyframes } from 'styled-components'
import { IconProps } from './Icon.tsx'

export const LoaderIcon = ({ size = 16, ...rest }: Omit<IconProps, 'color'>) => {
  return (
    <LoadingIcon width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/LoadingIcon" {...rest}>
      <g className="spinner">
        <circle cx="12" cy="2.5" r="1.5" fill="#FFFFFF" />
        <circle cx="16.75" cy="3.77" r="1.5" fill="#F8F9FB" />
        <circle cx="20.23" cy="7.25" r="1.5" fill="#E7EAF3" />
        <circle cx="21.50" cy="12.00" r="1.5" fill="#D0D6E6" />
        <circle cx="20.23" cy="16.75" r="1.5" fill="#9FAAC4" />
        <circle cx="16.75" cy="20.23" r="1.5" fill="#7A859E" />
        <circle cx="12" cy="21.5" r="1.5" fill="#515A6C" />
      </g>
    </LoadingIcon>
  )
}

const loading = keyframes`
8% {transform:rotate(30deg);}
16%{transform:rotate(60deg);}
25%{transform:rotate(90deg);}
33%{transform:rotate(120deg);}
42%{transform:rotate(150deg);}
50%{transform:rotate(180deg);}
58%{transform:rotate(210deg);}
67%{transform:rotate(240deg);}
75%{transform:rotate(270deg);}
83%{transform:rotate(300deg);}
92%{transform:rotate(330deg);}
100%{transform:rotate(360deg);}
`

const LoadingIcon = styled.svg`
  & .spinner {
    transform-origin: center;
    animation: ${loading} 0.75s step-end infinite;
  }
`
