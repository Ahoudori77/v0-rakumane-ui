export interface ShippingOrder {
  id: string
  orderNumber: string
  date: string
  status: "picking" | "packing" | "labeled" | "droppedOff" | "tracking"
  deadline: string
  channel: "mercari" | "minne" | "event" | "other"
  customer: string
  items: ShippingItem[]
  total: number
  trackingNumber?: string
  qrCode?: string
  notes?: string
  assignee?: string
}

export interface ShippingItem {
  id: string
  name: string
  sku: string
  quantity: number
  price: number
}

export interface Location {
  id: string
  name: string
  type: "shelf" | "case" | "event" | "consignment"
  itemCount: number
  capacity: number
}
