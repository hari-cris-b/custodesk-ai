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
  title: "CustoDesk AI - Next Generation Customer Service",
  description:
    "Transform your customer service with AI. CustoDesk AI provides intelligent automation, real-time insights, and seamless integration.",
  metadataBase: new URL("https://custodesk.ai"),
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
      url: "https://custodesk.ai",
    },
  ],
  creator: "CustoDesk AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://custodesk.ai",
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
      <head />
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
