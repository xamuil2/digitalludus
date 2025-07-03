import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        
        {/* Additional meta tags */}
        <meta name="description" content="DigitalLudus - Interactive Latin Learning Platform" />
        <meta name="keywords" content="Latin, learning, education, interactive, digital" />
        <meta name="author" content="DigitalLudus" />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content="DigitalLudus - Interactive Latin Learning" />
        <meta property="og:description" content="Learn Latin through interactive lessons, vocabulary drills, and engaging content." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo-with-text.svg" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DigitalLudus - Interactive Latin Learning" />
        <meta name="twitter:description" content="Learn Latin through interactive lessons, vocabulary drills, and engaging content." />
        <meta name="twitter:image" content="/logo-with-text.svg" />
        
        {/* Preload fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
