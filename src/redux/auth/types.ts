import { LoadingState } from '../loading'

export type AuthState = {
  token: string
} & LoadingState

export type TokenPayload = {
  aud: string
  iss: string
  exp: number
}
