import { AppShell } from "@/components/app-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuickSales } from "@/components/quick-sales"
import { KioskMode } from "@/components/kiosk-mode"

export default function QuickPage() {
  return (
    <AppShell currentTab="quick">
      <div className="p-4">
        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sales">クイック販売</TabsTrigger>
            <TabsTrigger value="kiosk">キオスクモード</TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="mt-4">
            <QuickSales />
          </TabsContent>
          <TabsContent value="kiosk" className="mt-4">
            <KioskMode />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
