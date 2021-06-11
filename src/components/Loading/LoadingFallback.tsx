import { Suspense } from 'react'

export const LoadingFallback = ({ children }: { children: JSX.Element }) => (
  <Suspense fallback={'Loading'}>{children}</Suspense>
)
