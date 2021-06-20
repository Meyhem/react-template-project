import axios, { AxiosRequestConfig, CancelTokenSource, default as staticAxios } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createRequestConfiguration } from '../utils/api'

interface UseApiConfig {
  cancelPrevious?: boolean
}

export function useApi<T>(hookConfig?: UseApiConfig) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [done, setDone] = useState(false)
  const cancelRef = useRef<CancelTokenSource | null>(null)

  const request = useCallback(
    async (config: AxiosRequestConfig) => {
      if (hookConfig?.cancelPrevious && cancelRef.current) {
        cancelRef.current.cancel()
      }
      const cancel = staticAxios.CancelToken.source()
      cancelRef.current = cancel

      const reqConfig = createRequestConfiguration(config, {
        cancelToken: cancel.token
      })
      setLoading(true)
      setDone(false)

      try {
        const res = (await axios(reqConfig)) as unknown as T
        setError(null)
        return res
      } catch (e) {
        setError(e)
        throw e
      } finally {
        setLoading(false)
        setDone(true)
      }
    },
    [hookConfig?.cancelPrevious]
  )

  useEffect(() => {
    return () => cancelRef.current?.cancel()
  }, [])

  return {
    request,
    loading,
    done,
    error,
    cancel: () => cancelRef.current?.cancel()
  }
}
