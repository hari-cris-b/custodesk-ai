import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './calendly.css'
import './grid.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://custodesk.ai'),
  title: {
    default: 'CustoDesk AI - Intelligent Customer Support Platform',
    template: '%s | CustoDesk AI'
  },
  description: 'Transform your customer support with AI-powered automation. CustoDesk AI delivers instant, accurate responses and exceptional support 24/7.',
  keywords: ['AI customer support', 'customer service automation', 'AI chatbot', 'help desk automation', 'customer support platform'],
  authors: [{ name: 'CustoDesk AI' }],
  creator: 'CustoDesk AI',
  publisher: 'CustoDesk AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://custodesk.ai',
    title: 'CustoDesk AI - Intelligent Customer Support Platform',
    description: 'Transform your customer support with AI-powered automation. CustoDesk AI delivers instant, accurate responses and exceptional support 24/7.',
    siteName: 'CustoDesk AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CustoDesk AI - Intelligent Customer Support Platform',
    description: 'Transform your customer support with AI-powered automation. CustoDesk AI delivers instant, accurate responses and exceptional support 24/7.',
    creator: '@custodeskAI',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`dark scroll-smooth ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="/images/logo.png"
          as="image"
          type="image/png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        {children}
      </body>
    </html>
  )
}
