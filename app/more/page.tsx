import { AppShell } from "@/components/app-shell"
import { MoreMenu } from "@/components/more-menu"

export default function MorePage() {
  return (
    <AppShell currentTab="more">
      <MoreMenu />
    </AppShell>
  )
}
