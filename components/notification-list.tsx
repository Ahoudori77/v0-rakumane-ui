"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Truck, TrendingUp, ExternalLink } from "lucide-react"

interface NotificationItem {
  id: string
  type: "threshold" | "deadline" | "shipping" | "quota"
  title: string
  message: string
  time: string
  priority: "high" | "medium" | "low"
  actionUrl?: string
}

export function NotificationList() {
  const notifications: NotificationItem[] = [
    {
      id: "1",
      type: "threshold",
      title: "在庫閾値割れ",
      message: "作品A（SKU: A-001）の在庫が最小値を下回りました",
      time: "5分前",
      priority: "high",
      actionUrl: "/items/A-001",
    },
    {
      id: "2",
      type: "deadline",
      title: "発送期限",
      message: "3件の注文が今日中に発送期限を迎えます",
      time: "15分前",
      priority: "high",
      actionUrl: "/shipping",
    },
    {
      id: "3",
      type: "shipping",
      title: "未持込",
      message: "2件の荷物が集荷予定時刻を過ぎています",
      time: "1時間前",
      priority: "medium",
      actionUrl: "/shipping",
    },
    {
      id: "4",
      type: "quota",
      title: "クォータ90%",
      message: "ストレージ使用量が90%に到達しました",
      time: "2時間前",
      priority: "medium",
      actionUrl: "/settings/plan",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "threshold":
        return <AlertTriangle className="h-4 w-4 text-danger" />
      case "deadline":
        return <Clock className="h-4 w-4 text-warning" />
      case "shipping":
        return <Truck className="h-4 w-4 text-primary" />
      case "quota":
        return <TrendingUp className="h-4 w-4 text-warning" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-danger text-danger-foreground"
      case "medium":
        return "bg-warning text-warning-foreground"
      case "low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">最近の通知</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs">
            すべて見る
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <Badge
                  variant="secondary"
                  className={`text-xs px-1.5 py-0.5 ${getPriorityColor(notification.priority)}`}
                >
                  {notification.priority === "high" ? "高" : notification.priority === "medium" ? "中" : "低"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2 text-pretty">{notification.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{notification.time}</span>
                {notification.actionUrl && (
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    詳細 <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
