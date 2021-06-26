import { getType, Reducer } from 'typesafe-actions'
import { initialLoadingState, withLoading } from '../loading'

import { AuthActions } from './actions'
import { AuthState } from './types'

export const initialState: AuthState = {
  token: '',
  ...initialLoadingState
}

export const authReducerBase: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
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

export const authReducer = withLoading(initialState, AuthActions, authReducerBase)
