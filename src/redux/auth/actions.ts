import { ActionType, createAction } from 'typesafe-actions'

export const AuthActions = {
  setToken: createAction('AUTH/set-token')<{
    token: string
  }>(),
  refreshToken: createAction('AUTH/refresh-token')(),
  logout: createAction('AUTH/logout')()
}

export type AuthActions = ActionType<typeof AuthActions>
