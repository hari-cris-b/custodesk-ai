import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "./providers"
import "./globals.css"
import "./calendly.css"
import "./grid.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CustoDesk AI - Transform Your Customer Support",
  description: "Transform your customer support with AI-powered solutions. CustoDesk AI provides intelligent automation, instant responses, and 24/7 customer service.",
  metadataBase: new URL("https://custodesk-ai.vercel.app"),
  keywords: [
    "AI customer service",
    "customer support automation",
    "AI chatbot",
    "help desk automation",
    "customer service platform",
  ],
  authors: [
    {
      name: "CustoDesk AI",
      url: "https://custodesk-ai.vercel.app",
    },
  ],
  creator: "CustoDesk AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://custodesk-ai.vercel.app",
    title: "CustoDesk AI - Next Generation Customer Service",
    description:
      "Transform your customer service with AI. CustoDesk AI provides intelligent automation, real-time insights, and seamless integration.",
    siteName: "CustoDesk AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CustoDesk AI - Next Generation Customer Service",
    description:
      "Transform your customer service with AI. CustoDesk AI provides intelligent automation, real-time insights, and seamless integration.",
    creator: "@custodesk",
  },
  icons: {
    icon: [
      {
        url: '/images/logo.png',
        href: '/images/logo.png',
      }
    ],
    shortcut: ['/images/logo.png'],
    apple: ['/images/logo.png'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className={cn(
        inter.className,
        "min-h-screen antialiased",
        "bg-white dark:bg-zinc-950",
        "text-zinc-950 dark:text-zinc-50",
      )}>
        <ThemeProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
