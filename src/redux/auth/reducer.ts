import { getType, Reducer } from 'typesafe-actions'

import { AuthActions } from './actions'
import { AuthState } from './types'

export const initialState: AuthState = {
  token: ''
}

export const authReducer: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
  switch (action.type) {
    case getType(AuthActions.setToken):
      return {
        ...state,
        token: action.payload.token
      }
    case getType(AuthActions.logout):
      return {
        ...state,
        token: ''
      }
    default:
      return state
  }
}
