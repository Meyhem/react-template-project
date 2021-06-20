import { all, put, takeLatest } from 'redux-saga/effects'
import { getType } from 'typesafe-actions'
import { AuthActions } from './actions'

export function* logout() {
  yield put(
    AuthActions.setToken({
      token: ''
    })
  )

  throw new Error('Not implemented')
}

export function* handleRefreshToken() {
  yield put(AuthActions.setToken({ token: 'refreshed token' }))
}

export function* authSagas() {
  yield all([takeLatest(getType(AuthActions.logout), logout)])
}
