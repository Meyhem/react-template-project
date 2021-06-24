import { getType } from 'typesafe-actions'
import { all, takeLatest, put } from 'redux-saga/effects'
import { AuthActions } from './actions'

export function* handleLogout() {
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
  yield all([
    takeLatest(getType(AuthActions.logout), handleLogout),
    takeLatest(getType(AuthActions.refreshToken), handleRefreshToken)
  ])
}
