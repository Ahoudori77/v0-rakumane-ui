"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface FilterState {
  search: string
  stockStatus: "all" | "inStock" | "lowStock" | "outOfStock"
  location: string
  category: string
}

interface ItemSearchFilterProps {
  onFilterChange: (filters: FilterState) => void
}

export function ItemSearchFilter({ onFilterChange }: ItemSearchFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    stockStatus: "all",
    location: "all",
    category: "all",
  })

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      search: "",
      stockStatus: "all",
      location: "all",
      category: "all",
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters =
    filters.search || filters.stockStatus !== "all" || filters.location !== "all" || filters.category !== "all"

  return (
    <div className="space-y-4">
      {/* 検索バー */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="アイテム名、SKU、説明で検索..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-10 tap-target"
        />
      </div>

      {/* フィルタチップ */}
      <div className="flex flex-wrap gap-2">
        <Select value={filters.stockStatus} onValueChange={(value) => updateFilter("stockStatus", value)}>
          <SelectTrigger className="w-auto min-w-[120px] tap-target">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="inStock">在庫あり</SelectItem>
            <SelectItem value="lowStock">閾値割れ</SelectItem>
            <SelectItem value="outOfStock">在庫切れ</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
          <SelectTrigger className="w-auto min-w-[120px] tap-target">
            <SelectValue placeholder="ロケーション" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="shelf">棚</SelectItem>
            <SelectItem value="case">ケース</SelectItem>
            <SelectItem value="warehouse">倉庫</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
          <SelectTrigger className="w-auto min-w-[120px] tap-target">
            <SelectValue placeholder="カテゴリ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="アート">アート</SelectItem>
            <SelectItem value="クラフト">クラフト</SelectItem>
            <SelectItem value="デザイン">デザイン</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="tap-target">
            <X className="h-4 w-4 mr-1" />
            クリア
          </Button>
        )}
      </div>

      {/* アクティブフィルタ表示 */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              検索: {filters.search}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("search", "")} />
            </Badge>
          )}
          {filters.stockStatus !== "all" && (
            <Badge variant="secondary" className="gap-1">
              在庫:{" "}
              {filters.stockStatus === "inStock"
                ? "在庫あり"
                : filters.stockStatus === "lowStock"
                  ? "閾値割れ"
                  : "在庫切れ"}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("stockStatus", "all")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
