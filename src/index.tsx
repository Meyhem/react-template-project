import 'antd/dist/antd.css'
import axios from 'axios'
import qs from 'qs'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { Persistor } from 'redux-persist/es/types'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components/macro'
import { App } from './app'
import { config } from './applicationConfig'
import { ViewportSizeContextProvider } from './components/ViewPortSizeContextProvider'
import { i18n } from './i18n'
import { createReduxStore } from './redux/store'
import { GlobalStyle, theme } from './theme/theme'
import { applyAxiosInterceptors } from './utils/axios'

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
  axios.defaults.baseURL = config.API_URL

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
