"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Minus, Plus, Search, Trash2, Truck } from "lucide-react"
import { mockItems } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  sku: string
  price: number
  quantity: number
  image?: string
}

export function QuickSales() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [discount, setDiscount] = useState({ type: "none", value: 0 })
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [showPaymentSheet, setShowPaymentSheet] = useState(false)
  const [showQuotaDialog, setShowQuotaDialog] = useState(false)
  const [isQuotaFull, setIsQuotaFull] = useState(false)
  const { toast } = useToast()

  const searchResults = mockItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const addToCart = (item: any) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCartItems((prev) =>
        prev.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          id: item.id,
          name: item.name,
          sku: item.sku,
          price: item.price,
          quantity: 1,
          image: item.images?.[0],
        },
      ])
    }
  }

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount =
    discount.type === "fixed" ? discount.value : discount.type === "percent" ? (subtotal * discount.value) / 100 : 0
  const total = Math.max(0, subtotal - discountAmount)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(price)
  }

  const handlePayment = () => {
    if (isQuotaFull) {
      setShowQuotaDialog(true)
      return
    }

    // Simulate payment processing
    toast({
      title: "支払い完了",
      description: "在庫を更新しました",
    })

    // Clear cart and show shipping options
    setCartItems([])
    setShowPaymentSheet(true)
  }

  const handleShipping = () => {
    setShowPaymentSheet(false)
    toast({
      title: "発送待ちに追加",
      description: "発送待ちタブで確認できます",
    })
  }

  return (
    <div className="p-4 space-y-4">
      {/* 検索 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="アイテムを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 tap-target"
        />
      </div>

      {/* 検索結果 */}
      {searchQuery && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">検索結果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => addToCart(item)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded bg-muted flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.images?.[0] || "/placeholder.svg?height=40&width=40&query=item"}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-balance">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                  <Badge variant={item.low ? "destructive" : "secondary"} className="text-xs">
                    {item.stock}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* カート */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">カート</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg border">
                <div className="w-12 h-12 rounded bg-muted flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg?height=48&width=48&query=item"}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-balance">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, -1)}
                    className="h-8 w-8 p-0 tap-target"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, 1)}
                    className="h-8 w-8 p-0 tap-target"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="h-8 w-8 p-0 tap-target"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">カートが空です</p>
          )}
        </CardContent>
      </Card>

      {/* 支払いフッター */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 max-w-md mx-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>小計</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            {/* 割引 */}
            <div className="flex items-center gap-2">
              <Select value={discount.type} onValueChange={(value) => setDiscount({ ...discount, type: value as any })}>
                <SelectTrigger className="w-24 h-8 tap-target">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">割引なし</SelectItem>
                  <SelectItem value="fixed">固定額</SelectItem>
                  <SelectItem value="percent">パーセント</SelectItem>
                </SelectContent>
              </Select>
              {discount.type !== "none" && (
                <Input
                  type="number"
                  placeholder={discount.type === "fixed" ? "100" : "10"}
                  value={discount.value || ""}
                  onChange={(e) => setDiscount({ ...discount, value: Number(e.target.value) })}
                  className="w-20 h-8 tap-target"
                />
              )}
            </div>

            {/* 支払方法 */}
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="tap-target">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">現金</SelectItem>
                <SelectItem value="paypay">PayPay</SelectItem>
                <SelectItem value="other">その他</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-between font-bold">
              <span>合計</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Button onClick={handlePayment} className="w-full tap-target">
              支払い済み
            </Button>
          </div>
        </div>
      )}

      {/* 支払い完了シート */}
      <Sheet open={showPaymentSheet} onOpenChange={setShowPaymentSheet}>
        <SheetContent side="bottom" className="max-w-md mx-auto">
          <SheetHeader>
            <SheetTitle>支払い完了</SheetTitle>
            <SheetDescription>在庫を更新しました。発送手続きを行いますか？</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Button onClick={handleShipping} className="w-full tap-target">
              <Truck className="h-4 w-4 mr-2" />
              発送へ
            </Button>
          </div>
        </SheetContent>
      </Sheet>

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
