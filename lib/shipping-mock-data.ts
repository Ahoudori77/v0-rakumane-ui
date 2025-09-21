import type { ShippingOrder, Location } from "@/types/shipping"

export const mockShippingOrders: ShippingOrder[] = [
  {
    id: "A240518-12",
    orderNumber: "A240518-12",
    date: "2024-05-18T10:30:00Z",
    status: "packing",
    deadline: "2024-05-18T18:00:00Z",
    channel: "mercari",
    customer: "田中様",
    items: [
      { id: "1", name: "作品A", sku: "A-001", quantity: 1, price: 1200 },
      { id: "2", name: "作品B", sku: "B-104", quantity: 2, price: 800 },
    ],
    total: 2800,
    notes: "丁寧な梱包をお願いします",
  },
  {
    id: "B240518-05",
    orderNumber: "B240518-05",
    date: "2024-05-18T14:15:00Z",
    status: "labeled",
    deadline: "2024-05-19T12:00:00Z",
    channel: "minne",
    customer: "佐藤様",
    items: [{ id: "3", name: "作品C", sku: "C-210", quantity: 1, price: 1800 }],
    total: 1800,
    trackingNumber: "1234-5678-9012",
  },
  {
    id: "C240517-08",
    orderNumber: "C240517-08",
    date: "2024-05-17T16:45:00Z",
    status: "droppedOff",
    deadline: "2024-05-17T18:00:00Z",
    channel: "event",
    customer: "山田様",
    items: [{ id: "4", name: "作品D", sku: "D-305", quantity: 1, price: 2500 }],
    total: 2500,
    trackingNumber: "9876-5432-1098",
  },
]

export const mockLocations: Location[] = [
  { id: "shelf-1", name: "棚1", type: "shelf", itemCount: 45, capacity: 60 },
  { id: "shelf-8", name: "棚8", type: "shelf", itemCount: 32, capacity: 50 },
  { id: "shelf-9", name: "棚9", type: "shelf", itemCount: 28, capacity: 40 },
  { id: "case-1", name: "ケース1", type: "case", itemCount: 15, capacity: 20 },
  { id: "case-2", name: "ケース2", type: "case", itemCount: 8, capacity: 15 },
  { id: "case-4", name: "ケース4", type: "case", itemCount: 12, capacity: 18 },
  { id: "event-1", name: "イベント会場", type: "event", itemCount: 5, capacity: 30 },
  { id: "consign-1", name: "委託先A", type: "consignment", itemCount: 22, capacity: 50 },
]
