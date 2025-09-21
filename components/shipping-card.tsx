"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Camera, ImageIcon, ExternalLink } from "lucide-react"
import type { ShippingOrder } from "@/types/shipping"

interface ShippingCardProps {
  order: ShippingOrder
  onStatusUpdate: (orderId: string, status: ShippingOrder["status"]) => void
  onTrackingUpdate: (orderId: string, trackingNumber: string) => void
  onDetailClick: (order: ShippingOrder) => void
}

export function ShippingCard({ order, onStatusUpdate, onTrackingUpdate, onDetailClick }: ShippingCardProps) {
  const [trackingInput, setTrackingInput] = useState(order.trackingNumber || "")
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    picking: order.status !== "picking",
    packing: ["packing", "labeled", "droppedOff", "tracking"].includes(order.status),
    labeled: ["labeled", "droppedOff", "tracking"].includes(order.status),
    droppedOff: ["droppedOff", "tracking"].includes(order.status),
    tracking: order.status === "tracking",
  })

  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case "mercari":
        return "メルカリ"
      case "minne":
        return "minne"
      case "event":
        return "イベント"
      default:
        return "その他"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "picking":
        return "ピック中"
      case "packing":
        return "梱包中"
      case "labeled":
        return "ラベル済"
      case "droppedOff":
        return "持込済"
      case "tracking":
        return "追跡中"
      default:
        return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "picking":
        return "secondary"
      case "packing":
        return "default"
      case "labeled":
        return "default"
      case "droppedOff":
        return "default"
      case "tracking":
        return "default"
      default:
        return "secondary"
    }
  }

  const getDeadlineVariant = () => {
    const now = new Date()
    const deadline = new Date(order.deadline)
    const hoursUntilDeadline = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursUntilDeadline < 0) return "destructive"
    if (hoursUntilDeadline < 24) return "secondary"
    return "outline"
  }

  const getDeadlineLabel = () => {
    const now = new Date()
    const deadline = new Date(order.deadline)
    const hoursUntilDeadline = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursUntilDeadline < 0) return "期限切れ"
    if (hoursUntilDeadline < 24) return "今日中"
    if (hoursUntilDeadline < 48) return "明日"
    return "期限内"
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleStepChange = (step: string, checked: boolean) => {
    setCheckedSteps((prev) => ({ ...prev, [step]: checked }))
    // Update order status based on completed steps
    if (checked) {
      if (step === "tracking") onStatusUpdate(order.id, "tracking")
      else if (step === "droppedOff") onStatusUpdate(order.id, "droppedOff")
      else if (step === "labeled") onStatusUpdate(order.id, "labeled")
      else if (step === "packing") onStatusUpdate(order.id, "packing")
    }
  }

  const handleTrackingSubmit = () => {
    if (trackingInput.trim()) {
      onTrackingUpdate(order.id, trackingInput.trim())
    }
  }

  const progressValue = Object.values(checkedSteps).filter(Boolean).length * 20

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">#{order.orderNumber}</h3>
            <Badge variant="outline" className="text-xs">
              {getChannelLabel(order.channel)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusVariant(order.status)} className="text-xs">
              {getStatusLabel(order.status)}
            </Badge>
            <Badge variant={getDeadlineVariant()} className="text-xs">
              {getDeadlineLabel()}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDate(order.date)}</span>
          <span>{order.customer}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* アイテム一覧 */}
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <span className="text-pretty">
                {item.name} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between font-medium text-sm pt-2 border-t">
            <span>合計</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* QR/追跡番号セクション */}
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">QR/追跡番号</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 px-2 tap-target">
                <Camera className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 tap-target">
                <ImageIcon className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="追跡番号を入力..."
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              className="flex-1 h-8 text-sm tap-target"
            />
            <Button size="sm" onClick={handleTrackingSubmit} className="h-8 px-3 tap-target">
              登録
            </Button>
          </div>
          {order.trackingNumber && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs tap-target">
                <ExternalLink className="h-3 w-3 mr-1" />
                取引
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs tap-target">
                <ExternalLink className="h-3 w-3 mr-1" />
                配送
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs tap-target">
                追跡
              </Button>
            </div>
          )}
          <p className="text-xs text-muted-foreground">QRは生成しません。公式のQR/追跡番号を"登録"して運用します。</p>
        </div>

        {/* 進捗ステッパー */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">進捗</span>
            <span className="text-xs text-muted-foreground">{Math.round(progressValue)}%</span>
          </div>
          <Progress value={progressValue} className="h-2" />
          <div className="space-y-2">
            {[
              { key: "picking", label: "ピック" },
              { key: "packing", label: "梱包" },
              { key: "labeled", label: "ラベル" },
              { key: "droppedOff", label: "持込/集荷" },
              { key: "tracking", label: "追跡" },
            ].map((step) => (
              <div key={step.key} className="flex items-center gap-2">
                <Checkbox
                  checked={checkedSteps[step.key]}
                  onCheckedChange={(checked) => handleStepChange(step.key, checked as boolean)}
                  className="tap-target"
                />
                <span className="text-sm">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {order.notes && (
          <div className="p-2 bg-muted/50 rounded text-xs text-muted-foreground text-pretty">{order.notes}</div>
        )}

        <Button variant="outline" onClick={() => onDetailClick(order)} className="w-full tap-target bg-transparent">
          詳細を見る
        </Button>
      </CardContent>
    </Card>
  )
}
