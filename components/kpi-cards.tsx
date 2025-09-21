"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Package, Truck, AlertTriangle, HardDrive } from "lucide-react"

interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  variant?: "default" | "warning" | "danger" | "success"
  progress?: number
}

function KPICard({ title, value, subtitle, icon, variant = "default", progress }: KPICardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "warning":
        return "border-warning/20 bg-warning/5"
      case "danger":
        return "border-danger/20 bg-danger/5"
      case "success":
        return "border-success/20 bg-success/5"
      default:
        return "border-border"
    }
  }

  const getValueColor = () => {
    switch (variant) {
      case "warning":
        return "text-warning"
      case "danger":
        return "text-danger"
      case "success":
        return "text-success"
      default:
        return "text-foreground"
    }
  }

  return (
    <Card className={`min-w-[140px] ${getVariantStyles()}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="text-muted-foreground">{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className={`text-2xl font-bold ${getValueColor()}`}>{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        {progress !== undefined && (
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{progress}%</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function KPICards() {
  const kpiData = [
    {
      title: "未発送",
      value: 8,
      subtitle: "件",
      icon: <Package className="h-4 w-4" />,
      variant: "danger" as const,
    },
    {
      title: "今日出荷",
      value: 5,
      subtitle: "件",
      icon: <Truck className="h-4 w-4" />,
      variant: "success" as const,
    },
    {
      title: "欠品候補",
      value: 3,
      subtitle: "SKU",
      icon: <AlertTriangle className="h-4 w-4" />,
      variant: "warning" as const,
    },
    {
      title: "使用量",
      value: "68%",
      icon: <HardDrive className="h-4 w-4" />,
      progress: 68,
    },
  ]

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {kpiData.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  )
}
