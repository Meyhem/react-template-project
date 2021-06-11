export type AuthState = {
  token: string
}

export type TokenPayload = {
  aud: string
  iss: string
  exp: number
}
