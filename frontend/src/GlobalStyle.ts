import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    font-family: "Manrope", "Helvetica", "Arial", sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p, body {
    margin: 0;
  }
`
