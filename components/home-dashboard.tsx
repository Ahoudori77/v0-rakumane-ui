"use client"

import { Button } from "@/components/ui/button"
import { Plus, QrCode } from "lucide-react"
import { KPICards } from "./kpi-cards"
import { TodoChecklist } from "./todo-checklist"
import { NotificationList } from "./notification-list"
import { QuotaWarningBanner } from "./quota-warning-banner"
import { EmptyState } from "./empty-state"

export function HomeDashboard() {
  const handleNewItem = () => {
    console.log("[v0] 新規アイテム追加")
  }

  const handleScanner = () => {
    console.log("[v0] スキャナー起動")
  }

  const handleCSVImport = () => {
    console.log("[v0] CSV インポート")
  }

  return (
    <div className="p-4 space-y-6">
      {/* クォータ警告バナー */}
      <QuotaWarningBanner />

      {/* アクションボタン */}
      <div className="flex gap-2">
        <Button onClick={handleNewItem} className="flex-1 tap-target">
          <Plus className="h-4 w-4 mr-2" />
          新規アイテム
        </Button>
        <Button variant="outline" onClick={handleScanner} className="tap-target bg-transparent">
          <QrCode className="h-4 w-4" />
        </Button>
      </div>

      {/* KPIカード */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-balance">概要</h2>
        <KPICards />
      </div>

      {/* 今日のToDo */}
      <TodoChecklist />

      {/* 最近の通知 */}
      <NotificationList />

      {/* 空状態の例 */}
      <div className="mt-8">
        <h3 className="text-base font-medium mb-3">データがない場合の表示例</h3>
        <EmptyState
          title="データがありません"
          description="アイテムデータを登録して、在庫管理を開始しましょう。CSVファイルからの一括登録も可能です。"
          actionLabel="CSVから登録"
          onAction={handleCSVImport}
        />
      </div>
    </div>
  )
}
