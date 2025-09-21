"use client"

import { useState } from "react"
import { ShippingFilter } from "./shipping-filter"
import { ShippingCard } from "./shipping-card"
import { ShippingDetailDialog } from "./shipping-detail-dialog"
import { EmptyState } from "./empty-state"
import type { ShippingOrder } from "@/types/shipping"
import { mockShippingOrders } from "@/lib/shipping-mock-data"
import { Truck } from "lucide-react"

export function ShippingList() {
  const [orders, setOrders] = useState<ShippingOrder[]>(mockShippingOrders)
  const [selectedOrder, setSelectedOrder] = useState<ShippingOrder | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleStatusUpdate = (orderId: string, status: ShippingOrder["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  const handleTrackingUpdate = (orderId: string, trackingNumber: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, trackingNumber } : order)))
  }

  const handleDetailClick = (order: ShippingOrder) => {
    setSelectedOrder(order)
    setIsDetailOpen(true)
  }

  const handleSave = (updatedOrder: ShippingOrder) => {
    setOrders((prev) => prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)))
  }

  const handleFilterChange = (filters: any) => {
    console.log("[v0] フィルタ変更:", filters)
    // TODO: Apply filters to orders
  }

  return (
    <div className="p-4 space-y-4">
      <ShippingFilter onFilterChange={handleFilterChange} />

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <ShippingCard
              key={order.id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
              onTrackingUpdate={handleTrackingUpdate}
              onDetailClick={handleDetailClick}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="発送待ちの注文がありません"
          description="新しい注文が入ると、こちらに表示されます。"
          actionLabel="注文を追加"
          icon={<Truck className="h-12 w-12" />}
        />
      )}

      <ShippingDetailDialog
        order={selectedOrder}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false)
          setSelectedOrder(null)
        }}
        onSave={handleSave}
      />
    </div>
  )
}
