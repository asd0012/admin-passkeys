'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient())
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('../mocks/browser').then(({ worker }) => worker.start())
    }
  }, [])
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

