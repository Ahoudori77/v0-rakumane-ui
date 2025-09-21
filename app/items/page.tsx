import { AppShell } from "@/components/app-shell"
import { ItemList } from "@/components/item-list"

export default function ItemsPage() {
  return (
    <AppShell currentTab="items">
      <ItemList />
    </AppShell>
  )
}
