import Router from 'next/router'
import { destroyCookie } from 'nookies'

export function SignOut() {
  destroyCookie(undefined, 'nextjwt.token')
  destroyCookie(undefined, 'nextjwt.refreshToken')

  Router.push('/')
}
