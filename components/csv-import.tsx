"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { mockCSVImportHistory } from "@/lib/settings-mock-data"
import { useToast } from "@/hooks/use-toast"

export function CSVImport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [format, setFormat] = useState("paypay")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [importHistory, setImportHistory] = useState(mockCSVImportHistory)
  const [fieldMapping, setFieldMapping] = useState({
    amount: "金額",
    paidAt: "支払日時",
    externalRef: "外部参照ID",
    terminal: "端末",
  })
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type === "text/csv") {
      setSelectedFile(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleImport = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          toast({
            title: "インポート完了",
            description: `${selectedFile.name} のインポートが完了しました`,
          })
          // Add to history
          const newImport = {
            id: `import_${Date.now()}`,
            date: new Date().toISOString(),
            filename: selectedFile.name,
            format: format as any,
            recordsTotal: 125,
            recordsSuccess: 123,
            recordsFailed: 2,
            status: "partial" as const,
          }
          setImportHistory((prev) => [newImport, ...prev])
          setSelectedFile(null)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "partial":
        return <AlertCircle className="h-4 w-4 text-warning" />
      case "failed":
        return <XCircle className="h-4 w-4 text-danger" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "success":
        return "成功"
      case "partial":
        return "一部失敗"
      case "failed":
        return "失敗"
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* ファイルアップロード */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">CSVインポート</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ドラッグ&ドロップエリア */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
          >
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-2">CSVファイルをドラッグ&ドロップ</p>
            <p className="text-xs text-muted-foreground mb-4">または</p>
            <Button variant="outline" className="tap-target bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              ファイルを選択
            </Button>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {selectedFile && (
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium">選択されたファイル</p>
              <p className="text-xs text-muted-foreground">{selectedFile.name}</p>
            </div>
          )}

          {/* フォーマット選択 */}
          <div className="space-y-2">
            <Label>フォーマット</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="tap-target">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paypay">PayPay</SelectItem>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="custom">カスタム</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* フィールドマッピング */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">フィールドマッピング</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(fieldMapping).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {key === "amount"
                        ? "金額"
                        : key === "paidAt"
                          ? "支払日時"
                          : key === "externalRef"
                            ? "外部参照ID"
                            : "端末"}
                    </span>
                    <Select
                      value={value}
                      onValueChange={(newValue) => setFieldMapping({ ...fieldMapping, [key]: newValue })}
                    >
                      <SelectTrigger className="w-32 h-8 tap-target">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="金額">金額</SelectItem>
                        <SelectItem value="支払日時">支払日時</SelectItem>
                        <SelectItem value="外部参照ID">外部参照ID</SelectItem>
                        <SelectItem value="端末">端末</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* インポート実行 */}
          <div className="space-y-3">
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>インポート中...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            <Button onClick={handleImport} disabled={!selectedFile || isUploading} className="w-full tap-target">
              {isUploading ? "インポート中..." : "取込開始"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* インポート履歴 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">インポート履歴</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">日時</TableHead>
                  <TableHead className="text-xs">ファイル名</TableHead>
                  <TableHead className="text-xs">フォーマット</TableHead>
                  <TableHead className="text-xs">結果</TableHead>
                  <TableHead className="text-xs">件数</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-xs">{formatDate(item.date)}</TableCell>
                    <TableCell className="text-xs">{item.filename}</TableCell>
                    <TableCell className="text-xs">
                      <Badge variant="outline" className="text-xs">
                        {item.format.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(item.status)}
                        <span className="text-xs">{getStatusLabel(item.status)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      <div>
                        <span className="text-success">{item.recordsSuccess}</span>
                        {item.recordsFailed > 0 && (
                          <>
                            {" / "}
                            <span className="text-danger">{item.recordsFailed}</span>
                          </>
                        )}
                        {" / "}
                        <span className="text-muted-foreground">{item.recordsTotal}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
