import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import localStorage from 'redux-persist/lib/storage'
import { authReducer } from './auth'
import { searchReducer } from './search'
// AUTOIMPORT REDUCER

const persistedAuthReducer = persistReducer(
  {
    key: 'user',
    whitelist: ['token'],
    storage: localStorage
  },
  authReducer
)

export const makeRootReducer = (history: History) =>
  combineReducers({
    // AUTOREGISTER REDUCER
    search: searchReducer,
    router: connectRouter(history),
    auth: persistedAuthReducer
  })
