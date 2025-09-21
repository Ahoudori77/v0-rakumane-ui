"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Camera, ImageIcon, ExternalLink, Save } from "lucide-react"
import type { ShippingOrder } from "@/types/shipping"

interface ShippingDetailDialogProps {
  order: ShippingOrder | null
  isOpen: boolean
  onClose: () => void
  onSave: (order: ShippingOrder) => void
}

export function ShippingDetailDialog({ order, isOpen, onClose, onSave }: ShippingDetailDialogProps) {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [pickupTime, setPickupTime] = useState("")
  const [notes, setNotes] = useState("")

  if (!order) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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

  const handleSave = () => {
    const updatedOrder: ShippingOrder = {
      ...order,
      trackingNumber: trackingNumber || order.trackingNumber,
      notes: notes || order.notes,
    }
    onSave(updatedOrder)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-balance">発送詳細 - #{order.orderNumber}</DialogTitle>
          <DialogDescription>
            {order.customer} - {getChannelLabel(order.channel)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 注文サマリ */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">注文サマリ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">注文日時</span>
                <span>{formatDate(order.date)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">発送期限</span>
                <Badge variant="outline" className="text-xs">
                  {formatDate(order.deadline)}
                </Badge>
              </div>
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
            </CardContent>
          </Card>

          {/* チェックリスト進捗 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">チェックリスト</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { key: "picking", label: "ピック作業完了" },
                { key: "packing", label: "梱包作業完了" },
                { key: "labeled", label: "ラベル貼付完了" },
                { key: "droppedOff", label: "持込/集荷完了" },
                { key: "tracking", label: "追跡開始" },
              ].map((step) => (
                <div key={step.key} className="flex items-center gap-3">
                  <Checkbox className="tap-target" />
                  <span className="text-sm">{step.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* QR/追跡番号登録 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">QR/追跡番号</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tracking">追跡番号</Label>
                <div className="flex gap-2">
                  <Input
                    id="tracking"
                    placeholder="追跡番号を入力..."
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 tap-target"
                  />
                  <Button variant="outline" size="icon" className="tap-target bg-transparent">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="tap-target bg-transparent">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 tap-target bg-transparent">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    取引ページ
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 tap-target bg-transparent">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    配送会社
                  </Button>
                </div>
              )}

              <Button variant="outline" className="w-full tap-target bg-transparent">
                追跡リンクを生成
              </Button>
            </CardContent>
          </Card>

          {/* 持込/集荷日時 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">持込/集荷日時</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup-date">日付</Label>
                  <div className="relative">
                    <Input
                      id="pickup-date"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="tap-target"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickup-time">時刻</Label>
                  <div className="relative">
                    <Input
                      id="pickup-time"
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="tap-target"
                    />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* メモ */}
          <div className="space-y-2">
            <Label htmlFor="notes">メモ</Label>
            <Textarea
              id="notes"
              placeholder="発送に関するメモを入力..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="tap-target"
            />
          </div>

          {/* アクションボタン */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1 tap-target bg-transparent">
              閉じる
            </Button>
            <Button onClick={handleSave} className="flex-1 tap-target">
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
