import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { createRequestConfiguration } from '../utils/api'

export function useApiData<T = any>(params: AxiosRequestConfig, config: { skip?: boolean } = {}) {
  const { skip } = config
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (skip) {
      setData(undefined)
      return
    }
    setLoading(true)

    const requestConfig = createRequestConfiguration(params)

    const config: AxiosRequestConfig = {
      ...requestConfig,
      params: params.params
    }

    const cancel = axios.CancelToken.source()
    axios(config)
      .then(res => {
        setData(res.data)
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
    return () => cancel.cancel()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params), skip])

  return [data, loading] as const
}
