import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "ラクマネ - 物流・在庫管理SaaS",
  description: "効率的な物流・在庫管理を実現するSaaSプラットフォーム",
  generator: "v0.app",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#3B82F6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="mobile-container min-h-screen">{children}</div>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
