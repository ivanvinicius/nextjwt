// high order function
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies } from 'nookies'

type SSPCtx = GetServerSidePropsContext

// Verifing token present in cookies. If it exists and valid, guest permission to app
export function withSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (ctx: SSPCtx): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (cookies['nextjwt.token']) {
      return {
        redirect: {
          permanent: false,
          destination: '/dashboard'
        }
      }
    }

    return fn(ctx)
  }
}
