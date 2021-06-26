import { call, put } from 'redux-saga/effects'
import { Callable } from '../../utils/types'
import { LoadingActions } from './actions'

export function* loadingCall<A extends LoadingActions>(
  actions: A,
  callee: Callable<any>,
  ...params: any[]
): Generator<any> {
  try {
    yield put(actions.setLoading({ loading: true }))
    yield call(callee, ...params)
  } finally {
    yield put(actions.setLoading({ loading: false }))
  }
}
