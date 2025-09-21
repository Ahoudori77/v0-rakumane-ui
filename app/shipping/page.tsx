import { AppShell } from "@/components/app-shell"
import { ShippingList } from "@/components/shipping-list"

export default function ShippingPage() {
  return (
    <AppShell currentTab="shipping">
      <ShippingList />
    </AppShell>
  )
}
