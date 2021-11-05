import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios'
import { call, cancelled } from 'redux-saga/effects'

// istanbul ignore next
export const executeApiCall = (axios: AxiosInstance, config: AxiosRequestConfig) => axios(config)

export function createRequestConfiguration(
  config: AxiosRequestConfig,
  { cancelToken }: { cancelToken?: CancelToken } = {}
) {
  const reqData: AxiosRequestConfig = {
    ...config,
    headers: {
      ...config.headers
    },
    cancelToken
  }

  return reqData
}

export function* apiCall<Response>(
  apiCallConfiguration: AxiosRequestConfig
): Generator<any, AxiosResponse<Response>, any> {
  return yield call(api, apiCallConfiguration)
}

export function* api<Response>(apiCallConfiguration: AxiosRequestConfig): Generator<any, AxiosResponse<Response>, any> {
  const source = axios.CancelToken.source()
  try {
    const reqData = createRequestConfiguration(apiCallConfiguration, {
      cancelToken: source.token
    })

    return yield call(executeApiCall, axios, reqData)
  } finally {
    if (yield cancelled()) {
      source.cancel('cancelled')
    }
  }
}
