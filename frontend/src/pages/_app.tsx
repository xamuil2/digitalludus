import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  useEffect(() => {
    // Only initialize database connection on server-side or in API routes
    // Client-side database initialization is removed to prevent browser errors
  }, [])

  return (
    <SessionProvider session={session}>
      <Head>
        <title>DigitalLudus - Interactive Latin Learning</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
