import { AppShell } from "@/components/app-shell"
import { HomeDashboard } from "@/components/home-dashboard"

export default function HomePage() {
  return (
    <AppShell currentTab="home">
      <HomeDashboard />
    </AppShell>
  )
}
