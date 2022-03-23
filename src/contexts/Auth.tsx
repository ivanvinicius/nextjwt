import { createContext, ReactNode, useContext, useState } from 'react'
import Router from 'next/router'
import { setCookie } from 'nookies'

import { api } from '../services/api'

interface IUserData {
  email: string
  permissions: string[]
  roles: string[]
}

interface IAuthProviderProps {
  children: ReactNode
}

interface ICredentialsProps {
  email: string
  password: string
}

interface IAuthContextData {
  isAuthenticated: boolean
  user: IUserData
  SignIn(credentials: ICredentialsProps): Promise<void>
}

const TIME_IN_DAYS = 60 * 60 * 24 * 30 // 30 days
const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUserData>({} as IUserData)
  const isAuthenticated = !!user

  async function SignIn({ email, password }: ICredentialsProps): Promise<void> {
    try {
      const response = await api.post('/sessions', { email, password })

      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'nextjwt.token', token, {
        maxAge: TIME_IN_DAYS,
        path: '/'
      })

      setCookie(undefined, 'nextjwt.refreshToken', refreshToken, {
        maxAge: TIME_IN_DAYS,
        path: '/'
      })

      setUser({ email, permissions, roles })

      Router.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, SignIn }}>
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
