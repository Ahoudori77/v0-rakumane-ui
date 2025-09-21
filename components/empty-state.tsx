"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Upload } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  actionLabel: string
  onAction?: () => void
  icon?: React.ReactNode
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <Card className="text-center py-8">
      <CardHeader>
        <div className="mx-auto mb-4 text-muted-foreground">{icon || <FileText className="h-12 w-12" />}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-pretty">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onAction} className="tap-target">
          <Upload className="h-4 w-4 mr-2" />
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  )
}
