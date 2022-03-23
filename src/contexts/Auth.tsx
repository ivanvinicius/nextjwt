import { createContext, ReactNode, useContext } from 'react'

interface IAuthProviderProps {
  children: ReactNode
}

interface ICredentialsProps {
  email: string
  password: string
}

interface IAuthContextData {
  isAuthenticated: boolean
  SignIn(credentials: ICredentialsProps): Promise<void>
}

const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: IAuthProviderProps) {
  const isAuthenticated = false

  async function SignIn({ email, password }: ICredentialsProps): Promise<void> {
    console.log({ email, password })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, SignIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth hook must be wrapped by Auth provider')
  }

  return context
}
