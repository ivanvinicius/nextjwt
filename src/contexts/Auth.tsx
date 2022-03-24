import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import Router from 'next/router'
import { setCookie, parseCookies } from 'nookies'

import { clientSideApi } from '../services/api/clientSide'
import { SignOut } from '../utils/signOut'

interface IUserData {
  email: string
  roles: ['administrator' | 'editor']
  permissions: ['users.list' | 'users.create' | 'metrics.list']
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
      const response = await clientSideApi.post('/sessions', {
        email,
        password
      })

      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'nextjwt.token', token, {
        maxAge: TIME_IN_DAYS,
        path: '/'
      })

      setCookie(undefined, 'nextjwt.refreshToken', refreshToken, {
        maxAge: TIME_IN_DAYS,
        path: '/'
      })

      /** When we sign in to application for the first time, the headers['Authorization']
       * located in services/api are not setted yet. So, if we access the dashboard
       * page and make an API request, it will throw an error of 'token not present'.
       * To correct this behavior, after we sign in to application, we can set the
       * api.default.headers as showned below */
      clientSideApi.defaults.headers['Authorization'] = `Bearer ${token}`

      setUser({ email, permissions, roles })

      Router.push('/dashboard')
    } catch (err) {
      console.log('signin err: ', err)
    }
  }

  useEffect(() => {
    async function loadUserInfo() {
      const { 'nextjwt.token': token } = parseCookies()

      if (token) {
        try {
          const response = await clientSideApi.get('/me')
          const { email, permissions, roles } = response.data

          setUser({ email, permissions, roles })
        } catch (err) {
          SignOut()
        }
      }
    }

    loadUserInfo()
  }, [])

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
