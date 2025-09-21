"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { Bell, QrCode } from "lucide-react"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-svh bg-background text-foreground">
      {/* ヘッダー（タップ44px以上・スクロール時も見失わないよう sticky） */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-2 border-b bg-card px-4 py-3">
        <h1 className="text-xl font-bold">ラクマネ</h1>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="tap-target" aria-label="通知">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="tap-target" aria-label="スキャナ">
            <QrCode className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* コンテンツ。下はボトムタブ高さ + Safe Areaぶん空ける */}
      <main className="px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+72px)]">
        {children}
      </main>

      {/* 固定ボトムタブ（当たり判定56px＋Safe Area対応） */}
      <BottomNav />
    </div>
  )
}
