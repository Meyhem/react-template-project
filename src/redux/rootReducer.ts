import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import persistReducer from 'redux-persist/es/persistReducer'
import localStorage from 'redux-persist/lib/storage'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

import { authReducer } from './auth'
import { reducer as tableReducer } from './table'
// AUTOIMPORT REDUCER

const persistedUserReducer = persistReducer(
  {
    key: 'user',
    whitelist: ['token'],
    storage: localStorage
  },
  authReducer
)

const persistedTableReducer = persistReducer(
  {
    key: 'table',
    storage: localStorage,
    stateReconciler: autoMergeLevel1
  },
  tableReducer
)

export const makeRootReducer = (history: History) =>
  combineReducers({
    // AUTOREGISTER REDUCER
    router: connectRouter(history),
    auth: persistedUserReducer,
    table: persistedTableReducer
  })
