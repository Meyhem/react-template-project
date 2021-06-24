import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { PersistGate } from 'redux-persist/integration/react'
import { Persistor } from 'redux-persist/es/types'
import qs from 'qs'
import { App } from './app'
import { createReduxStore } from './redux/store'
import { i18n } from './i18n'
import { Store } from 'redux'
import axios from 'axios'
import { GlobalStyle, theme } from './theme/theme'
import { ThemeProvider } from 'styled-components/macro'
import 'antd/dist/antd.css'
import { applyAxiosInterceptors } from './utils/axios'
import { ViewportSizeContextProvider } from './components/ViewPortSizeContextProvider'

const init = () =>
  new Promise<{ store: Store; persistor: Persistor }>(resolve => {
    const { store, persistor } = createReduxStore()

    applyAxiosInterceptors(store)

    resolve({
      store,
      persistor
    })
  })

export function stringifyGetParams(query: object) {
  return qs.stringify(query, { allowDots: true })
}

Promise.all([init()]).then(([{ store, persistor }]) => {
  axios.defaults.paramsSerializer = stringifyGetParams

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <ViewportSizeContextProvider>
              <GlobalStyle />
              <App />
            </ViewportSizeContextProvider>
          </I18nextProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )
})
