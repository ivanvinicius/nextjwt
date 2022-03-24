// high order function
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies } from 'nookies'

type SSPCtx = GetServerSidePropsContext

// Verifing token present in cookies. If it doest not exists, no permission to app
export function withSSRAuth<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (ctx: SSPCtx): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (!cookies['nextjwt.token']) {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      }
    }

    return fn(ctx)
  }
}
