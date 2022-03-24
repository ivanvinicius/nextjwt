import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

import { AuthTokenError } from '../../errors/AuthTokenError'
import { SignOut } from '../../utils/signOut'

const TIME_IN_DAYS = 60 * 60 * 24 * 30 // 30 days
let isRefreshingToken = false
let failedRequestsQueue = []

// Server Side Api
export function serverSideApi(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Baerer ${cookies['nextjwt.token']}`
    }
  })

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx)

          // originalConfig: it has all the request informations
          const originalConfig = error.config

          const { 'nextjwt.refreshToken': refreshToken } = cookies

          /** If the token is not already refreshing, then, refresh it. We need to
           * verify this case because sometimes the application request a new token
           * many times. Why it happens? Imagine that you have some requests to the
           * backend and the requests fail because the token present in those past
           * requests are obslote, it throws an error, the axios try to renew the
           * token and a request loop happens. */
          if (!isRefreshingToken) {
            isRefreshingToken = true

            api
              .post('/refresh', {
                refreshToken
              })
              .then((response) => {
                const { token, refreshToken: newRefreshToken } = response.data

                setCookie(ctx, 'nextjwt.token', token, {
                  maxAge: TIME_IN_DAYS,
                  path: '/'
                })

                setCookie(ctx, 'nextjwt.refreshToken', newRefreshToken, {
                  maxAge: TIME_IN_DAYS,
                  path: '/'
                })

                api.defaults.headers['Authorization'] = `Bearer ${token}`

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                )

                failedRequestsQueue = []
              })
              .catch((err) => {
                console.log('err.config: ', err.config)

                failedRequestsQueue.forEach((request) => request.onFailure(err))

                failedRequestsQueue = []

                if (typeof window !== 'undefined') {
                  SignOut()
                }
              })
              .finally(() => {
                isRefreshingToken = false
              })
          }

          /** When the token is refreshing and other requests fail during this time
           * We sign these failed requests on array, and later, execute them */
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`

                resolve(api(originalConfig))
              },

              onFailure: (err: AxiosError) => {
                reject(err)
              }
            })
          })
        } else {
          /** To avoid an error thar occour when a request to api is made by
           * server side redering, Router browser does not exists yet and
           * throw an error */
          if (typeof window !== 'undefined') {
            SignOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
