import { ReactNode } from 'react'

import { AuthProvider } from './Auth'

interface IAppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: IAppProviderProps) {
  return <AuthProvider>{children}</AuthProvider>
}
