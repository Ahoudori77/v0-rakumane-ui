"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationSettings } from "./notification-settings"
import { MemberPlanManagement } from "./member-plan-management"
import { CSVImport } from "./csv-import"
import { SettingsHelp } from "./settings-help"

export function MoreMenu() {
  return (
    <div className="p-4">
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-4 text-xs">
          <TabsTrigger value="notifications" className="text-xs">
            通知
          </TabsTrigger>
          <TabsTrigger value="members" className="text-xs">
            メンバー
          </TabsTrigger>
          <TabsTrigger value="import" className="text-xs">
            インポート
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs">
            設定
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-4">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="members" className="mt-4">
          <MemberPlanManagement />
        </TabsContent>

        <TabsContent value="import" className="mt-4">
          <CSVImport />
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <SettingsHelp />
        </TabsContent>
      </Tabs>
    </div>
  )
}
