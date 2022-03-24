// high order function
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import decode from 'jwt-decode'

import { AuthTokenError } from '../errors/AuthTokenError'

import { validateUserPermissions } from './validateUserPermissions'

type SSPCtx = GetServerSidePropsContext

interface IWithSSRAuthOptions {
  roles?: ['administrator' | 'editor']
  permissions?: ['users.list' | 'users.create' | 'metrics.list']
}

interface IDecodeResponse {
  roles: ['administrator' | 'editor']
  permissions: ['users.list' | 'users.create' | 'metrics.list']
}

// Verifing token present in cookies. If it doest not exists, no permission to app
export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: IWithSSRAuthOptions
): GetServerSideProps {
  return async (ctx: SSPCtx): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies['nextjwt.token']

    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      }
    }

    if (options !== undefined) {
      const user = decode(token) as IDecodeResponse
      const { roles, permissions } = options

      const userHasValidPermissions = validateUserPermissions({
        user,
        roles,
        permissions
      })

      if (!userHasValidPermissions) {
        return {
          notFound: true
          // redirect: {
          //   permanent: false,
          //   destination: '/dashboard'
          // }
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'nextjwt.token')
        destroyCookie(ctx, 'nextjwt.refreshToken')

        return {
          redirect: {
            permanent: false,
            destination: '/'
          }
        }
      }
    }
  }
}
