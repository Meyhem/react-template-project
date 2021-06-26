import { createAction } from 'typesafe-actions'

export function createLoadingActions<T extends string>(scope: T) {
  return {
    setLoading: createAction(`${scope}/LOADING`)<{ loading: boolean }>()
  }
}

export type LoadingActions = ReturnType<typeof createLoadingActions>
