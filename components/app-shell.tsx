"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Package, Truck, Zap, MoreHorizontal, QrCode, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

interface AppShellProps {
  children: React.ReactNode
  currentTab?: string
}

const tabs = [
  { id: "home", label: "ホーム", icon: Home, href: "/" },
  { id: "items", label: "アイテム", icon: Package, href: "/items" },
  { id: "shipping", label: "発送待ち", icon: Truck, href: "/shipping" },
  { id: "quick", label: "クイック", icon: Zap, href: "/quick" },
  { id: "more", label: "その他", icon: MoreHorizontal, href: "/more" },
]

export function AppShell({ children, currentTab = "home" }: AppShellProps) {
  const [activeTab, setActiveTab] = useState(currentTab)
  const router = useRouter()

  const handleTabChange = (tabId: string, href: string) => {
    setActiveTab(tabId)
    router.push(href)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b border-border bg-card">
        <h1 className="text-xl font-bold text-foreground">ラクマネ</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="tap-target">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="tap-target">
            <QrCode className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto">{children}</main>

      <nav className="border-t border-border bg-card">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id, tab.href)}
                className={`
                  flex-1 flex flex-col items-center justify-center py-2 px-1 tap-target relative
                  transition-colors duration-200
                  ${isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}
                `}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
                {tab.id === "shipping" && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                    8
                  </Badge>
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
