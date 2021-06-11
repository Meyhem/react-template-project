import axios, { AxiosError } from 'axios'
import { Store } from 'redux'
import { AuthActions } from '../redux/auth'
import { getToken } from '../redux/auth/selectors'

function formatAuthHeader(token: string) {
  return `Bearer ${token}`
}

export function applyAxiosInterceptors(store: Store) {
  axios.interceptors.request.use(
    config => {
      const token = getToken(store.getState())
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: formatAuthHeader(token)
        }
      }
      return config
    },
    error => Promise.reject(error)
  )

  axios.interceptors.response.use(undefined, async (error: AxiosError<any>) => {
    if (axios.isCancel(error)) return Promise.reject(error)
    if (error.response) {
      switch (error.response.status) {
        case 401: {
          store.dispatch(AuthActions.logout())
          break
        }
      }
    }
    return Promise.reject(error)
  })
}
