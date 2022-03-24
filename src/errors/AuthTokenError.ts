export class AuthTokenError extends Error {
  constructor() {
    super('Something went wrong with token')
  }
}
