import type { NotificationDestination, NotificationRule, Member, UsageStats, CSVImportHistory } from "@/types/settings"

export const mockNotificationDestinations: NotificationDestination[] = [
  {
    id: "dest1",
    name: "管理者グループ",
    type: "group",
    externalId: "group_12345",
    status: "connected",
  },
  {
    id: "dest2",
    name: "田中（個人）",
    type: "individual",
    externalId: "user_67890",
    status: "connected",
  },
  {
    id: "dest3",
    name: "LINE Notify",
    type: "line_notify",
    externalId: "notify_abcde",
    status: "disconnected",
  },
]

export const mockNotificationRules: NotificationRule[] = [
  {
    id: "rule1",
    type: "stock_threshold",
    enabled: true,
    settings: { threshold: 5 },
  },
  {
    id: "rule2",
    type: "shipping_deadline",
    enabled: true,
    settings: { hoursBeforeDeadline: 24 },
  },
  {
    id: "rule3",
    type: "undelivered",
    enabled: true,
    settings: { notificationTime: "18:00" },
  },
  {
    id: "rule4",
    type: "quota",
    enabled: true,
    settings: { thresholds: [80, 90, 100] },
  },
]

export const mockMembers: Member[] = [
  {
    id: "member1",
    name: "田中太郎",
    email: "tanaka@example.com",
    role: "owner",
    status: "active",
    lastLogin: "2024-05-18T10:30:00Z",
  },
  {
    id: "member2",
    name: "佐藤花子",
    email: "sato@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-05-17T15:45:00Z",
  },
  {
    id: "member3",
    name: "山田次郎",
    email: "yamada@example.com",
    role: "staff",
    status: "inactive",
    lastLogin: "2024-05-15T09:20:00Z",
  },
]

export const mockUsageStats: UsageStats = {
  storage: { used: 850, total: 1000 }, // MB
  egress: { used: 45, total: 100 }, // GB
  images: { used: 1250, total: 2000 }, // count
}

export const mockCSVImportHistory: CSVImportHistory[] = [
  {
    id: "import1",
    date: "2024-05-18T14:30:00Z",
    filename: "sales_20240518.csv",
    format: "paypay",
    recordsTotal: 150,
    recordsSuccess: 148,
    recordsFailed: 2,
    status: "partial",
  },
  {
    id: "import2",
    date: "2024-05-17T10:15:00Z",
    filename: "square_export.csv",
    format: "square",
    recordsTotal: 89,
    recordsSuccess: 89,
    recordsFailed: 0,
    status: "success",
  },
]
