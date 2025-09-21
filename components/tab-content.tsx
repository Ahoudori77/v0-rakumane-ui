import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TabContentProps {
  tabId: string
  title: string
  description: string
}

export function TabContent({ tabId, title, description }: TabContentProps) {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">{title}</CardTitle>
          <CardDescription className="text-pretty">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">この画面は現在開発中です。以下の機能が実装予定です：</p>
          <div className="space-y-2">
            {getFeatureList(tabId).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 tap-target">
            {tabId === "home" ? "ダッシュボードを見る" : `${title}を開始`}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function getFeatureList(tabId: string): string[] {
  switch (tabId) {
    case "home":
      return [
        "KPIカード（未発送・今日出荷・欠品候補・使用量）",
        "今日のToDoチェックリスト",
        "最近の通知（LINEミラー）",
        "クォータ警告バナー",
      ]
    case "items":
      return ["アイテム一覧・検索・フィルタ", "アイテム詳細・編集", "在庫数量調整", "画像管理"]
    case "shipping":
      return ["発送待ち一覧・フィルタ", "QR/追跡番号登録", "発送ステータス管理", "期限アラート"]
    case "quick":
      return ["クイック販売（カートUI）", "キオスクモード", "在庫移動・棚卸", "バーコードスキャン"]
    case "more":
      return ["売上・照合機能", "通知設定", "メンバー・プラン管理", "設定・ヘルプ"]
    default:
      return []
  }
}
