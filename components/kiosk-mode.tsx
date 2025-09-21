"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Minus, Plus, Wifi, WifiOff } from "lucide-react"
import { mockItems } from "@/lib/mock-data"

export function KioskMode() {
  const [isKioskMode, setIsKioskMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [searchInput, setSearchInput] = useState("")
  const [isOnline, setIsOnline] = useState(true)
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [pinInput, setPinInput] = useState("")

  const handleSearch = (barcode: string) => {
    const item = mockItems.find((item) => item.sku === barcode || item.name.includes(barcode))
    setSelectedItem(item)
  }

  const handleQuantityChange = (change: number) => {
    if (selectedItem) {
      console.log("[v0] キオスク数量変更:", selectedItem.name, change)
      // Update item quantity in mock data
    }
  }

  const handleExitAttempt = () => {
    setShowExitDialog(true)
  }

  const handleExitConfirm = () => {
    if (pinInput === "1234") {
      // Mock PIN
      setIsKioskMode(false)
      setShowExitDialog(false)
      setPinInput("")
    } else {
      alert("PINが正しくありません")
    }
  }

  if (!isKioskMode) {
    return (
      <div className="p-4">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">キオスクモード</h2>
            <p className="text-muted-foreground mb-6 text-pretty">
              フルスクリーンで数量調整を行うモードです。バーコードスキャンと大きなボタンで効率的な作業が可能です。
            </p>
            <Button onClick={() => setIsKioskMode(true)} className="tap-target">
              キオスクモードを開始
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">キオスクモード</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isOnline ? <Wifi className="h-4 w-4 text-success" /> : <WifiOff className="h-4 w-4 text-danger" />}
            <span className="text-sm">{isOnline ? "オンライン" : "オフライン"}</span>
          </div>
          <Button variant="outline" onClick={handleExitAttempt} className="tap-target bg-transparent">
            終了
          </Button>
        </div>
      </div>

      {/* オフライン警告バナー */}
      {!isOnline && (
        <div className="bg-warning/10 border-warning/20 border-b p-3">
          <p className="text-sm text-warning-foreground text-center">オフライン。入力は端末内に保存→回復時に送信。</p>
        </div>
      )}

      {/* 検索バー */}
      <div className="p-4 border-b">
        <Input
          placeholder="バーコードをスキャンまたは入力..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(searchInput)
              setSearchInput("")
            }
          }}
          className="text-lg h-12 tap-target"
          autoFocus
        />
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {selectedItem ? (
          <div className="text-center space-y-8 max-w-md w-full">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-balance">{selectedItem.name}</h2>
              <p className="text-muted-foreground">SKU: {selectedItem.sku}</p>
              <Badge variant={selectedItem.low ? "destructive" : "default"} className="mt-2">
                現在の在庫: {selectedItem.stock}個
              </Badge>
            </div>

            <div className="flex items-center justify-center gap-8">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleQuantityChange(-1)}
                disabled={selectedItem.stock <= 0}
                className="h-20 w-20 text-2xl tap-target bg-transparent"
              >
                <Minus className="h-8 w-8" />
              </Button>

              <div className="text-center">
                <div className="text-4xl font-bold">{selectedItem.stock}</div>
                <div className="text-sm text-muted-foreground">在庫数</div>
              </div>

              <Button
                variant="default"
                size="lg"
                onClick={() => handleQuantityChange(1)}
                className="h-20 w-20 text-2xl tap-target"
              >
                <Plus className="h-8 w-8" />
              </Button>
            </div>

            <Button variant="ghost" onClick={() => setSelectedItem(null)} className="tap-target">
              別のアイテムを選択
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-6xl">📦</div>
            <h2 className="text-xl font-medium">アイテムを選択してください</h2>
            <p className="text-muted-foreground">バーコードをスキャンするか、上の検索バーに入力してください</p>
          </div>
        )}
      </div>

      {/* 終了確認ダイアログ */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>キオスクモード終了</DialogTitle>
            <DialogDescription>PINを入力してキオスクモードを終了してください</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="PIN"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="tap-target"
              maxLength={4}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowExitDialog(false)}
                className="flex-1 tap-target bg-transparent"
              >
                キャンセル
              </Button>
              <Button onClick={handleExitConfirm} className="flex-1 tap-target">
                終了
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
