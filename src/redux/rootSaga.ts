import Axios from 'axios'
import { all, call } from 'redux-saga/effects'
import { authSagas } from './auth'
// AUTOIMPORT SAGA

function* allSagas() {
  yield all([
    // AUTOREGISTER SAGA
    authSagas()
  ])
}

export function* rootSaga() {
  while (true) {
    try {
      yield call(allSagas)
    } catch (e) {
      if (!Axios.isCancel(e)) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Root saga crashed, restarting...', e)
        }
      }
    }
  }
}
