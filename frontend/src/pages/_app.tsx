import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import { initializeDatabase } from '@/lib/prisma'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  useEffect(() => {
    // Initialize database connection on app startup
    initializeDatabase().catch(console.error)
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
