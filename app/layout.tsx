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
  // セーフエリアを効かせるため viewport-fit=cover を追加
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
  themeColor: "#3B82F6",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body
        className={`min-h-svh bg-background text-foreground font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          {/* モバイル外枠：幅390px、左右パディング、セーフエリア、下はボトムタブぶんの余白 */}
          <div className="mx-auto w-[390px] max-w-full min-h-svh px-4
                          pt-[env(safe-area-inset-top)]
                          pb-[calc(env(safe-area-inset-bottom)+72px)]">
            {children}
          </div>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
