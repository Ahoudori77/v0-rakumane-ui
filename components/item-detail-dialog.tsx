"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Save, X, Upload } from "lucide-react"
import type { Item } from "@/types/item"
import { mockItemHistory } from "@/lib/mock-data"
import Image from "next/image"

interface ItemDetailDialogProps {
  item: Item | null
  isOpen: boolean
  onClose: () => void
  onSave: (item: Item) => void
}

export function ItemDetailDialog({ item, isOpen, onClose, onSave }: ItemDetailDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState<Item | null>(null)

  if (!item) return null

  const itemHistory = mockItemHistory.filter((h) => h.itemId === item.id)

  const handleEdit = () => {
    setEditedItem({ ...item })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedItem) {
      onSave(editedItem)
      setIsEditing(false)
      setEditedItem(null)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedItem(null)
  }

  const updateEditedItem = (field: keyof Item, value: any) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [field]: value })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(price)
  }

  const currentItem = editedItem || item

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-balance">{currentItem.name}</DialogTitle>
              <DialogDescription>SKU: {currentItem.sku}</DialogDescription>
            </div>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={handleEdit} className="tap-target bg-transparent">
                <Edit className="h-4 w-4 mr-1" />
                編集
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel} className="tap-target bg-transparent">
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleSave} className="tap-target">
                  <Save className="h-4 w-4 mr-1" />
                  保存
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">詳細</TabsTrigger>
            <TabsTrigger value="history">履歴</TabsTrigger>
            <TabsTrigger value="memo">メモ</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            {/* 画像 */}
            <div className="space-y-2">
              <Label>画像</Label>
              <div className="flex gap-2 overflow-x-auto">
                {currentItem.images?.map((image, index) => (
                  <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${currentItem.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {isEditing && (
                  <Button variant="outline" className="w-20 h-20 flex-shrink-0 tap-target bg-transparent">
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {isEditing && <p className="text-xs text-muted-foreground">画像はWebP/最大1600px推奨</p>}
            </div>

            {/* 基本情報 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">商品名</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={currentItem.name}
                    onChange={(e) => updateEditedItem("name", e.target.value)}
                    className="tap-target"
                  />
                ) : (
                  <p className="text-sm">{currentItem.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                {isEditing ? (
                  <Input
                    id="sku"
                    value={currentItem.sku}
                    onChange={(e) => updateEditedItem("sku", e.target.value)}
                    className="tap-target"
                  />
                ) : (
                  <p className="text-sm">{currentItem.sku}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">価格</Label>
                {isEditing ? (
                  <Input
                    id="price"
                    type="number"
                    value={currentItem.price}
                    onChange={(e) => updateEditedItem("price", Number(e.target.value))}
                    className="tap-target"
                  />
                ) : (
                  <p className="text-sm">{formatPrice(currentItem.price)}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">カテゴリ</Label>
                {isEditing ? (
                  <Select value={currentItem.category} onValueChange={(value) => updateEditedItem("category", value)}>
                    <SelectTrigger className="tap-target">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="アート">アート</SelectItem>
                      <SelectItem value="クラフト">クラフト</SelectItem>
                      <SelectItem value="デザイン">デザイン</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm">{currentItem.category}</p>
                )}
              </div>
            </div>

            {/* 在庫情報 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">在庫情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">現在の在庫</span>
                  <Badge variant={currentItem.low ? "destructive" : "secondary"}>{currentItem.stock}個</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">最小在庫</span>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={currentItem.minStock}
                      onChange={(e) => updateEditedItem("minStock", Number(e.target.value))}
                      className="w-20 h-8 text-right tap-target"
                    />
                  ) : (
                    <span className="text-sm">{currentItem.minStock}個</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">最大在庫</span>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={currentItem.maxStock}
                      onChange={(e) => updateEditedItem("maxStock", Number(e.target.value))}
                      className="w-20 h-8 text-right tap-target"
                    />
                  ) : (
                    <span className="text-sm">{currentItem.maxStock}個</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ロケーション</span>
                  {isEditing ? (
                    <Input
                      value={currentItem.locations}
                      onChange={(e) => updateEditedItem("locations", e.target.value)}
                      className="w-32 h-8 text-right tap-target"
                    />
                  ) : (
                    <span className="text-sm">{currentItem.locations}</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 説明 */}
            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  value={currentItem.description || ""}
                  onChange={(e) => updateEditedItem("description", e.target.value)}
                  rows={3}
                  className="tap-target"
                />
              ) : (
                <p className="text-sm text-muted-foreground text-pretty">{currentItem.description}</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-3">
            {itemHistory.length > 0 ? (
              itemHistory.map((history) => (
                <Card key={history.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        {history.change > 0 ? "+" : ""}
                        {history.change}個
                      </span>
                      <Badge variant={history.change > 0 ? "default" : "secondary"} className="text-xs">
                        {history.reason}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDate(history.date)}</span>
                      {history.location && <span>{history.location}</span>}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">履歴がありません</p>
            )}
          </TabsContent>

          <TabsContent value="memo" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="memo">メモ</Label>
              <Textarea id="memo" placeholder="このアイテムに関するメモを入力..." rows={4} className="tap-target" />
            </div>
            <Button className="w-full tap-target">
              <Save className="h-4 w-4 mr-2" />
              メモを保存
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
