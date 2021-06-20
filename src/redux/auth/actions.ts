import { ActionType, createAction } from 'typesafe-actions'

export const AuthActions = {
  setToken: createAction('AUTH/set-token')<{
    token: string
  }>(),
  logout: createAction('AUTH/logout')()
}

export type AuthActions = ActionType<typeof AuthActions>
