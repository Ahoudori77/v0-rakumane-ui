export interface NotificationDestination {
  id: string
  name: string
  type: "individual" | "group" | "line_notify"
  externalId: string
  status: "connected" | "disconnected" | "pending"
}

export interface NotificationRule {
  id: string
  type: "stock_threshold" | "shipping_deadline" | "undelivered" | "quota"
  enabled: boolean
  settings: Record<string, any>
}

export interface Member {
  id: string
  name: string
  email: string
  role: "owner" | "admin" | "staff" | "field" | "viewer"
  status: "active" | "inactive"
  avatar?: string
  lastLogin?: string
}

export interface UsageStats {
  storage: { used: number; total: number }
  egress: { used: number; total: number }
  images: { used: number; total: number }
}

export interface CSVImportHistory {
  id: string
  date: string
  filename: string
  format: "paypay" | "square" | "custom"
  recordsTotal: number
  recordsSuccess: number
  recordsFailed: number
  status: "success" | "partial" | "failed"
}
