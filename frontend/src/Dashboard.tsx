import { MenuPanel } from './components/MenuPanel'
import { TokenDisplay } from './components/token-display/TokenDisplay'
import { TokenProvider } from './contexts/TokenContext'

export function Dashboard() {
  return (
    <div className="flex flex-col w-full max-w-[1024px] m-[0_auto]">
      <TokenProvider>
        <MenuPanel />
        <TokenDisplay />
      </TokenProvider>
    </div>
  )
}
