"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Send, Trash2, RefreshCw } from "lucide-react"
import { mockNotificationDestinations, mockNotificationRules } from "@/lib/settings-mock-data"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const [destinations, setDestinations] = useState(mockNotificationDestinations)
  const [rules, setRules] = useState(mockNotificationRules)
  const [testDestination, setTestDestination] = useState("")
  const { toast } = useToast()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="default" className="bg-success text-success-foreground">
            接続済
          </Badge>
        )
      case "disconnected":
        return <Badge variant="destructive">未接続</Badge>
      case "pending":
        return <Badge variant="secondary">保留中</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRuleLabel = (type: string) => {
    switch (type) {
      case "stock_threshold":
        return "在庫閾値割れ"
      case "shipping_deadline":
        return "発送期限リマインド"
      case "undelivered":
        return "未持込通知"
      case "quota":
        return "クォータ通知"
      default:
        return type
    }
  }

  const handleTestSend = () => {
    if (!testDestination) {
      toast({
        title: "エラー",
        description: "送信先を選択してください",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "テスト送信完了",
      description: "通知が正常に送信されました",
    })
  }

  const handleRuleToggle = (ruleId: string, enabled: boolean) => {
    setRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled } : rule)))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* 宛先リスト */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">通知宛先</CardTitle>
            <Button size="sm" className="tap-target">
              <Plus className="h-4 w-4 mr-1" />
              追加
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {destinations.map((dest) => (
              <div key={dest.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{dest.name}</span>
                    {getStatusBadge(dest.status)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dest.type === "group" ? "グループ" : dest.type === "individual" ? "個人チャット" : "LINE Notify"} •{" "}
                    {dest.externalId}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 tap-target">
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 tap-target">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm font-medium mb-2">接続手順</p>
            <ol className="text-xs text-muted-foreground space-y-1">
              <li>1. グループにBotを招待</li>
              <li>2. グループで /connect を送信</li>
              <li>3. この画面で「更新」ボタンをクリック</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* 通知ルール */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">通知ルール</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={(enabled) => handleRuleToggle(rule.id, enabled)}
                    className="tap-target"
                  />
                  <span className="font-medium text-sm">{getRuleLabel(rule.type)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {rule.type === "shipping_deadline" && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={rule.settings.hoursBeforeDeadline}
                        className="w-16 h-6 text-xs"
                        disabled={!rule.enabled}
                      />
                      <span>時間前に通知</span>
                    </div>
                  )}
                  {rule.type === "undelivered" && (
                    <div className="flex items-center gap-2">
                      <span>当日</span>
                      <Input
                        type="time"
                        value={rule.settings.notificationTime}
                        className="w-20 h-6 text-xs"
                        disabled={!rule.enabled}
                      />
                      <span>に一括通知</span>
                    </div>
                  )}
                  {rule.type === "quota" && <span>80%, 90%, 100%で通知</span>}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* テスト送信 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">送信テスト</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={testDestination} onValueChange={setTestDestination}>
              <SelectTrigger className="flex-1 tap-target">
                <SelectValue placeholder="送信先を選択" />
              </SelectTrigger>
              <SelectContent>
                {destinations
                  .filter((dest) => dest.status === "connected")
                  .map((dest) => (
                    <SelectItem key={dest.id} value={dest.id}>
                      {dest.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button onClick={handleTestSend} className="tap-target">
              <Send className="h-4 w-4 mr-1" />
              送信
            </Button>
          </div>

          {/* 送信ログ */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">直近の送信ログ</Label>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">時刻</TableHead>
                    <TableHead className="text-xs">宛先</TableHead>
                    <TableHead className="text-xs">種別</TableHead>
                    <TableHead className="text-xs">結果</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-xs">5/18 14:30</TableCell>
                    <TableCell className="text-xs">管理者グループ</TableCell>
                    <TableCell className="text-xs">閾値割れ</TableCell>
                    <TableCell className="text-xs">
                      <Badge variant="default" className="bg-success text-success-foreground text-xs">
                        成功
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">5/18 12:00</TableCell>
                    <TableCell className="text-xs">田中（個人）</TableCell>
                    <TableCell className="text-xs">期限リマインド</TableCell>
                    <TableCell className="text-xs">
                      <Badge variant="destructive" className="text-xs">
                        失敗
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
