import { ActionType, getType, Reducer } from 'typesafe-actions'
import { LoadingActions } from './actions'
import { LoadingState } from './types'

export const initialLoadingState: LoadingState = { loading: false }

export function withLoading<S extends LoadingState, A extends LoadingActions, R extends Reducer<S, ActionType<A>>>(
  initialState: S,
  actions: A,
  reducer: R
) {
  return (state: S = initialState, action: ActionType<A>) => {
    switch (action.type) {
      case getType(actions.setLoading):
        return {
          ...state,
          loading: action.payload.loading
        }
      default:
        return reducer(state, action)
    }
  }
}
