import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'

import { makeRootReducer } from './rootReducer'
import { rootSaga } from './rootSaga'
import { history } from '../utils/history'

export const createReduxStore = () => {
  const rootReducer = makeRootReducer(history)

  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers =
    (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const middleware = [routerMiddleware(history), sagaMiddleware]
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

  sagaMiddleware.run(rootSaga)

  const persistor = persistStore(store)
  return { persistor, store }
}
