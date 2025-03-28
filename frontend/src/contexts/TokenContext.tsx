/* eslint-disable react-refresh/only-export-components */
import { tokenPreviews } from '@/tokens'
import { TokenPreview } from '@/types'
import { createContext, ReactNode, useContext, useState } from 'react'
import { assert } from '@sparkdotfi/common-universal'

interface TokenContextProps {
  selectedToken: TokenPreview
  setSelectedToken: React.Dispatch<React.SetStateAction<TokenPreview>>
}

const TokenContext = createContext<TokenContextProps | null>(null)

export const useTokenContext: () => TokenContextProps = () => {
  assert(!TokenContext, 'Context is not initialized')
  return useContext(TokenContext)
}

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [selectedToken, setSelectedToken] = useState<TokenPreview>(tokenPreviews[0])
  return <TokenContext.Provider value={{ selectedToken, setSelectedToken }}>{children}</TokenContext.Provider>
}
