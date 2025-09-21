"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, Trash2, AlertTriangle, Crown, Shield, User, Eye } from "lucide-react"
import { mockMembers, mockUsageStats } from "@/lib/settings-mock-data"
import { useToast } from "@/hooks/use-toast"

export function MemberPlanManagement() {
  const [members, setMembers] = useState(mockMembers)
  const [usage, setUsage] = useState(mockUsageStats)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [showQuotaDialog, setShowQuotaDialog] = useState(false)
  const { toast } = useToast()

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4 text-warning" />
      case "admin":
        return <Shield className="h-4 w-4 text-primary" />
      case "staff":
        return <User className="h-4 w-4 text-muted-foreground" />
      case "field":
        return <User className="h-4 w-4 text-muted-foreground" />
      case "viewer":
        return <Eye className="h-4 w-4 text-muted-foreground" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "owner":
        return "オーナー"
      case "admin":
        return "管理者"
      case "staff":
        return "スタッフ"
      case "field":
        return "現場"
      case "viewer":
        return "閲覧者"
      default:
        return role
    }
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 100) return "text-danger"
    if (percentage >= 90) return "text-warning"
    if (percentage >= 80) return "text-warning"
    return "text-foreground"
  }

  const getUsageVariant = (percentage: number) => {
    if (percentage >= 100) return "destructive"
    if (percentage >= 90) return "secondary"
    return "default"
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "未ログイン"
    return new Date(dateString).toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleAddMember = () => {
    const activeMembers = members.filter((m) => m.status === "active").length
    if (activeMembers >= 1) {
      // ライトプランは1席まで
      setShowUpgradeDialog(true)
    } else {
      toast({
        title: "招待リンク生成",
        description: "新しいメンバーの招待リンクを生成しました",
      })
    }
  }

  const handleRemoveMember = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId))
    toast({
      title: "メンバー削除",
      description: "メンバーを削除しました",
    })
  }

  const handleQuotaTest = () => {
    setShowQuotaDialog(true)
  }

  const activeSeats = members.filter((m) => m.status === "active").length
  const totalSeats = 1 // ライトプラン

  return (
    <div className="space-y-6">
      {/* メンバー管理 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">メンバー管理</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  席 {activeSeats}/{totalSeats} 使用中
                </Badge>
              </div>
            </div>
            <Button size="sm" onClick={handleAddMember} className="tap-target">
              <UserPlus className="h-4 w-4 mr-1" />
              招待
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">メンバー</TableHead>
                  <TableHead className="text-xs">ロール</TableHead>
                  <TableHead className="text-xs">状態</TableHead>
                  <TableHead className="text-xs">最終ログイン</TableHead>
                  <TableHead className="text-xs w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getRoleIcon(member.role)}
                        <span className="text-xs">{getRoleLabel(member.role)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.status === "active" ? "default" : "secondary"} className="text-xs">
                        {member.status === "active" ? "有効" : "無効"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{formatDate(member.lastLogin)}</TableCell>
                    <TableCell>
                      {member.role !== "owner" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(member.id)}
                          className="h-8 w-8 p-0 tap-target"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 使用量 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">プラン・使用量</CardTitle>
            <Button variant="outline" size="sm" onClick={handleQuotaTest} className="tap-target bg-transparent">
              <AlertTriangle className="h-4 w-4 mr-1" />
              100%テスト
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ストレージ */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">ストレージ</span>
              <span className={`text-sm ${getUsageColor((usage.storage.used / usage.storage.total) * 100)}`}>
                {usage.storage.used}MB / {usage.storage.total}MB
              </span>
            </div>
            <Progress value={(usage.storage.used / usage.storage.total) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round((usage.storage.used / usage.storage.total) * 100)}% 使用中
            </p>
          </div>

          {/* 転送量 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">転送量（月間）</span>
              <span className={`text-sm ${getUsageColor((usage.egress.used / usage.egress.total) * 100)}`}>
                {usage.egress.used}GB / {usage.egress.total}GB
              </span>
            </div>
            <Progress value={(usage.egress.used / usage.egress.total) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round((usage.egress.used / usage.egress.total) * 100)}% 使用中
            </p>
          </div>

          {/* 画像数 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">画像数</span>
              <span className={`text-sm ${getUsageColor((usage.images.used / usage.images.total) * 100)}`}>
                {usage.images.used} / {usage.images.total}
              </span>
            </div>
            <Progress value={(usage.images.used / usage.images.total) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round((usage.images.used / usage.images.total) * 100)}% 使用中
            </p>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">現在のプラン</span>
              <Badge variant="outline">ライト</Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-3">1席、1GB ストレージ、100GB 転送量、2,000画像まで</p>
            <Button className="w-full tap-target">プランをアップグレード</Button>
          </div>
        </CardContent>
      </Card>

      {/* アップグレード案内ダイアログ */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>席数の上限に達しました</DialogTitle>
            <DialogDescription>
              ライトプランは1席までです。追加のメンバーを招待するには、上位プランにアップグレードしてください。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium mb-1">スタンダードプラン</p>
              <p className="text-xs text-muted-foreground">5席、10GB ストレージ、500GB 転送量</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowUpgradeDialog(false)}
                className="flex-1 tap-target bg-transparent"
              >
                後で
              </Button>
              <Button className="flex-1 tap-target">アップグレード</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* クォータ100%ダイアログ */}
      <Dialog open={showQuotaDialog} onOpenChange={setShowQuotaDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>書き込み停止中</DialogTitle>
            <DialogDescription>
              ストレージ使用量が100%に到達しました。参照は可能ですが、新しいデータの書き込みは停止されています。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
              <p className="text-sm font-medium text-danger-foreground mb-1">影響する機能</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 新規アイテム登録</li>
                <li>• 画像アップロード</li>
                <li>• 在庫数量の更新</li>
                <li>• CSVインポート</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">上位プランにアップグレードすると即座に復帰できます。</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowQuotaDialog(false)}
                className="flex-1 tap-target bg-transparent"
              >
                閉じる
              </Button>
              <Button className="flex-1 tap-target">アップグレード</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
