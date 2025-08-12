import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import FloatingAIChat from '@/components/FloatingAIChat'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  useEffect(() => {
    // Page load fade-in is handled by CSS on body

    // IntersectionObserver: fade-in elements on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )

    // Auto-mark common content blocks for reveal-on-scroll if they don't opt out
    const candidates = Array.from(
      document.querySelectorAll(
        'main, section, article, header, footer, aside, li, .card, .container, .prose > *,[data-animate="fade-in"]'
      )
    ) as HTMLElement[]

    candidates.forEach((el) => {
      if (!el.classList.contains('reveal-on-scroll') && !el.hasAttribute('data-no-reveal')) {
        el.classList.add('reveal-on-scroll')
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <SessionProvider session={session}>
      <Head>
        <title>DigitalLudus - Interactive Latin Learning</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
      <FloatingAIChat />
    </SessionProvider>
  )
}
