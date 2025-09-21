"use client"

import { useState, useMemo } from "react"
import { ItemCard } from "./item-card"
import { ItemDetailDialog } from "./item-detail-dialog"
import { ItemSearchFilter } from "./item-search-filter"
import { EmptyState } from "./empty-state"
import type { Item } from "@/types/item"
import { mockItems } from "@/lib/mock-data"
import { Package } from "lucide-react"

interface FilterState {
  search: string
  stockStatus: "all" | "inStock" | "lowStock" | "outOfStock"
  location: string
  category: string
}

export function ItemList() {
  const [items, setItems] = useState<Item[]>(mockItems)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    stockStatus: "all",
    location: "all",
    category: "all",
  })

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 検索フィルタ
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        if (
          !item.name.toLowerCase().includes(searchLower) &&
          !item.sku.toLowerCase().includes(searchLower) &&
          !item.description?.toLowerCase().includes(searchLower)
        ) {
          return false
        }
      }

      // 在庫状態フィルタ
      if (filters.stockStatus !== "all") {
        if (filters.stockStatus === "inStock" && (item.stock <= 0 || item.low)) return false
        if (filters.stockStatus === "lowStock" && !item.low) return false
        if (filters.stockStatus === "outOfStock" && item.stock > 0) return false
      }

      // ロケーションフィルタ
      if (filters.location !== "all") {
        if (filters.location === "shelf" && !item.locations.includes("棚")) return false
        if (filters.location === "case" && !item.locations.includes("ケース")) return false
        if (filters.location === "warehouse" && !item.locations.includes("倉庫")) return false
      }

      // カテゴリフィルタ
      if (filters.category !== "all" && item.category !== filters.category) {
        return false
      }

      return true
    })
  }, [items, filters])

  const handleQuantityChange = (itemId: string, change: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newStock = Math.max(0, item.stock + change)
          return {
            ...item,
            stock: newStock,
            low: newStock <= item.minStock,
            lastUpdated: new Date().toISOString(),
          }
        }
        return item
      }),
    )
  }

  const handleEdit = (item: Item) => {
    setSelectedItem(item)
    setIsDetailOpen(true)
  }

  const handleMove = (item: Item) => {
    console.log("[v0] アイテム移動:", item.name)
    // TODO: 在庫移動ダイアログを開く
  }

  const handleSave = (updatedItem: Item) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === updatedItem.id ? { ...updatedItem, lastUpdated: new Date().toISOString() } : item,
      ),
    )
    setIsDetailOpen(false)
    setSelectedItem(null)
  }

  const handleCSVImport = () => {
    console.log("[v0] CSV インポート")
  }

  return (
    <div className="p-4 space-y-4">
      <ItemSearchFilter onFilterChange={setFilters} />

      {filteredItems.length > 0 ? (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onEdit={handleEdit}
              onMove={handleMove}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={
            filters.search || filters.stockStatus !== "all" ? "該当するアイテムがありません" : "アイテムがありません"
          }
          description={
            filters.search || filters.stockStatus !== "all"
              ? "検索条件を変更してお試しください。"
              : "アイテムを登録して在庫管理を開始しましょう。CSVファイルからの一括登録も可能です。"
          }
          actionLabel="CSVから登録"
          onAction={handleCSVImport}
          icon={<Package className="h-12 w-12" />}
        />
      )}

      <ItemDetailDialog
        item={selectedItem}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false)
          setSelectedItem(null)
        }}
        onSave={handleSave}
      />
    </div>
  )
}
