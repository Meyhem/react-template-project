import { ComponentType, lazy, LazyExoticComponent } from 'react'

type Factory<T> = () => Promise<{ default: T }>

function retryImport<T>(fn: Factory<T>, retriesLeft: number, interval: number) {
  return new Promise<{ default: T }>((resolve, reject) => {
    fn()
      .then(resolve)
      .catch(() => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            window.location.reload()
            return
          }
          retryImport(fn, retriesLeft - 1, interval).then(resolve, reject)
        }, interval)
      })
  })
}

export function importLazy<T extends ComponentType<any>>(
  fn: Factory<T>,
  retriesLeft = 2,
  interval = 500
): LazyExoticComponent<T> {
  return lazy<T>(() => retryImport(fn, retriesLeft, interval))
}
