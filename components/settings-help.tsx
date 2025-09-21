"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Send, Settings, HelpCircle, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SettingsHelp() {
  const [contactForm, setContactForm] = useState({
    email: "",
    subject: "",
    message: "",
  })
  const { toast } = useToast()

  const handleContactSubmit = () => {
    if (!contactForm.email || !contactForm.message) {
      toast({
        title: "エラー",
        description: "メールアドレスと本文を入力してください",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "送信完了",
      description: "お問い合わせを送信しました。24時間以内に返信いたします。",
    })

    setContactForm({ email: "", subject: "", message: "" })
  }

  return (
    <Tabs defaultValue="settings" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="settings">設定</TabsTrigger>
        <TabsTrigger value="help">ヘルプ</TabsTrigger>
      </TabsList>

      <TabsContent value="settings" className="space-y-6">
        {/* 基本設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="h-4 w-4" />
              基本設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>税率 (%)</Label>
                <Input type="number" defaultValue="10" className="tap-target" />
              </div>
              <div className="space-y-2">
                <Label>小数点桁数</Label>
                <Input type="number" defaultValue="0" min="0" max="2" className="tap-target" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>通貨</Label>
              <Input defaultValue="JPY" disabled className="tap-target" />
            </div>
          </CardContent>
        </Card>

        {/* ロケーション管理 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">ロケーション管理</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {["棚1", "棚8", "棚9", "ケース1", "ケース2", "ケース4", "イベント会場", "委託先A"].map((location) => (
                <Badge key={location} variant="outline" className="text-xs">
                  {location}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="tap-target bg-transparent">
              ロケーションを追加
            </Button>
          </CardContent>
        </Card>

        {/* 外部リンク */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">外部リンク</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {[
                { name: "メルカリ取引ページ", url: "https://mercari.com" },
                { name: "日本郵便追跡", url: "https://trackings.post.japanpost.jp" },
                { name: "ヤマト運輸アプリ", url: "https://www.kuronekoyamato.co.jp" },
              ].map((link) => (
                <div key={link.name} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{link.name}</span>
                  <Button variant="ghost" size="sm" className="tap-target">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="help" className="space-y-6">
        {/* チュートリアル */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              1分チュートリアル
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                  1
                </span>
                <span>アイテムを登録（CSVインポートまたは手動入力）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                  2
                </span>
                <span>在庫数量を調整（±ボタンまたはキオスクモード）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                  3
                </span>
                <span>クイック販売で在庫を減らす</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                  4
                </span>
                <span>発送待ちで追跡番号を登録</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                  5
                </span>
                <span>通知設定でLINE連携を設定</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">よくある質問</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="qr">
                <AccordionTrigger className="text-sm">QRコードは生成できますか？</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  ラクマネではQRコードの生成は行いません。各配送会社や販売プラットフォームが提供する公式のQR/追跡番号を「登録」して運用します。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="terms">
                <AccordionTrigger className="text-sm">利用規約はどこで確認できますか？</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  利用規約は設定画面の「法的情報」セクションからご確認いただけます。重要な変更がある場合は事前に通知いたします。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="capacity">
                <AccordionTrigger className="text-sm">容量制限に達するとどうなりますか？</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  容量が100%に達すると新しいデータの書き込みが停止されますが、既存データの参照は可能です。上位プランにアップグレードすると即座に復帰できます。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* お問い合わせ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="h-4 w-4" />
              お問い合わせ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-email">メールアドレス</Label>
              <Input
                id="contact-email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="tap-target"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-subject">件名（任意）</Label>
              <Input
                id="contact-subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="tap-target"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">お問い合わせ内容</Label>
              <Textarea
                id="contact-message"
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="tap-target"
              />
            </div>
            <Button onClick={handleContactSubmit} className="w-full tap-target">
              <Send className="h-4 w-4 mr-2" />
              送信
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
