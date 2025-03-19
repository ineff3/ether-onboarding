import { GlobalStyle } from './GlobalStyle.ts'
import { Dashboard } from './Dashboard.tsx'
import styled from 'styled-components'

const App = () => (
  <Background>
    <GlobalStyle />
    <Dashboard />
  </Background>
)

const Background = styled.div`
  background-color: #f8f9fb;
`

export default App
