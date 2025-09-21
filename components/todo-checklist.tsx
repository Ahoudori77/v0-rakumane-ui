"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface TodoItem {
  id: string
  title: string
  subtitle: string
  completed: boolean
  priority?: "high" | "medium" | "low"
}

export function TodoChecklist() {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: "1",
      title: "ピック作業",
      subtitle: "3件の注文をピッキング",
      completed: false,
      priority: "high",
    },
    {
      id: "2",
      title: "梱包作業",
      subtitle: "2件の梱包を完了",
      completed: false,
      priority: "high",
    },
    {
      id: "3",
      title: "持込・集荷",
      subtitle: "1件の発送手続き",
      completed: true,
      priority: "medium",
    },
    {
      id: "4",
      title: "棚卸リマインド",
      subtitle: "月次棚卸の準備",
      completed: false,
      priority: "low",
    },
  ])

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-danger text-danger-foreground"
      case "medium":
        return "bg-warning text-warning-foreground"
      case "low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">今日のToDo</CardTitle>
          <Badge variant="outline">
            {completedCount}/{totalCount}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
              className="mt-0.5 tap-target"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className={`text-sm font-medium ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                  {todo.title}
                </p>
                {todo.priority && (
                  <Badge variant="secondary" className={`text-xs px-1.5 py-0.5 ${getPriorityColor(todo.priority)}`}>
                    {todo.priority === "high" ? "高" : todo.priority === "medium" ? "中" : "低"}
                  </Badge>
                )}
              </div>
              <p
                className={`text-xs ${todo.completed ? "line-through text-muted-foreground" : "text-muted-foreground"}`}
              >
                {todo.subtitle}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
