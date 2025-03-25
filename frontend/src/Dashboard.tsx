import { MenuPanel } from './components/MenuPanel'
import { TokenDisplay } from './components/token-display/TokenDisplay'

export function Dashboard() {
  return (
    <div className="flex flex-col w-full max-w-[1024px] m-[0_auto]">
      <MenuPanel />
      <TokenDisplay />
    </div>
  )
}
