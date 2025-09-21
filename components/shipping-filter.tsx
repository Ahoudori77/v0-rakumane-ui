"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ShippingFilterProps {
  onFilterChange: (filters: ShippingFilters) => void
}

export interface ShippingFilters {
  channel: string
  deadline: string
  assignee: string
  search: string
}

export function ShippingFilter({ onFilterChange }: ShippingFilterProps) {
  const handleFilterChange = (key: keyof ShippingFilters, value: string) => {
    // This would normally update state and call onFilterChange
    console.log("[v0] フィルタ変更:", key, value)
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="注文番号、顧客名で検索..."
          className="pl-10 tap-target"
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Select onValueChange={(value) => handleFilterChange("channel", value)}>
          <SelectTrigger className="w-auto min-w-[120px] tap-target">
            <SelectValue placeholder="チャネル" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="mercari">メルカリ</SelectItem>
            <SelectItem value="minne">minne</SelectItem>
            <SelectItem value="event">イベント</SelectItem>
            <SelectItem value="other">その他</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange("deadline", value)}>
          <SelectTrigger className="w-auto min-w-[120px] tap-target">
            <SelectValue placeholder="期限" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="today">今日中</SelectItem>
            <SelectItem value="tomorrow">明日</SelectItem>
            <SelectItem value="overdue">期限切れ</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange("assignee", value)}>
          <SelectTrigger className="w-auto min-w-[120px] tap-target">
            <SelectValue placeholder="担当者" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="user1">田中</SelectItem>
            <SelectItem value="user2">佐藤</SelectItem>
            <SelectItem value="unassigned">未割当</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
