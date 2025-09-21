"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Edit, Move, AlertTriangle } from "lucide-react"
import type { Item } from "@/types/item"
import Image from "next/image"

interface ItemCardProps {
  item: Item
  onQuantityChange: (itemId: string, change: number) => void
  onEdit: (item: Item) => void
  onMove: (item: Item) => void
}

export function ItemCard({ item, onQuantityChange, onEdit, onMove }: ItemCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (change: number) => {
    setIsUpdating(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
    onQuantityChange(item.id, change)
    setIsUpdating(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(price)
  }

  return (
    <Card className={`${item.low ? "border-warning/50 bg-warning/5" : ""}`}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* サムネイル */}
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={item.images?.[0] || "/placeholder.svg?height=64&width=64&query=item"}
              alt={item.name}
              fill
              className="object-cover"
            />
            {item.low && (
              <div className="absolute top-1 right-1">
                <AlertTriangle className="h-3 w-3 text-warning" />
              </div>
            )}
          </div>

          {/* アイテム情報 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-sm text-balance">{item.name}</h3>
                <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                <Badge variant={item.low ? "destructive" : "secondary"} className="text-xs">
                  在庫: {item.stock}
                </Badge>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-3 text-pretty">{item.locations}</p>

            {/* 数量調整ボタン */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={isUpdating || item.stock <= 0}
                  className="h-8 w-8 p-0 tap-target"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium min-w-[2rem] text-center">{isUpdating ? "..." : item.stock}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={isUpdating}
                  className="h-8 w-8 p-0 tap-target"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => onMove(item)} className="h-8 px-2 tap-target">
                  <Move className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEdit(item)} className="h-8 px-2 tap-target">
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
