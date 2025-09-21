export interface Item {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  locations: string
  low: boolean
  minStock: number
  maxStock: number
  category?: string
  description?: string
  images?: string[]
  lastUpdated: string
}

export interface ItemHistory {
  id: string
  itemId: string
  date: string
  change: number
  reason: string
  location?: string
}
