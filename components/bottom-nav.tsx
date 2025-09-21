"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Boxes, Package, ShoppingCart, MoreHorizontal } from "lucide-react"

// あるなら "@/lib/utils" の cn を使ってOK。無ければ下の簡易版を使う
const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ")

type Tab = {
  href: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const TABS: Tab[] = [
  { href: "/",          label: "ホーム",   icon: Home },
  { href: "/items",     label: "アイテム", icon: Boxes },
  { href: "/shipments", label: "発送待ち", icon: Package },
  { href: "/quick",     label: "クイック", icon: ShoppingCart },
  { href: "/more",      label: "その他",   icon: MoreHorizontal },
]

export function BottomNav() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"))

  return (
    <nav
      role="navigation"
      aria-label="メイン"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      {/* モバイル幅センタリング + Safe Area 下パディング */}
      <div className="mx-auto w-[390px] max-w-full grid grid-cols-5
                      pb-[max(6px,env(safe-area-inset-bottom))]">
        {TABS.map((t) => {
          const Icon = t.icon
          const active = isActive(t.href)
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-label={t.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                // ← 当たり判定：最低56px（44px以上必須）
                "min-h-[56px] py-2",
                "flex flex-col items-center justify-center select-none",
                "text-[11px] leading-none",
                active ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground focus:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              <Icon aria-hidden="true" className={cn("h-5 w-5 mb-1", active && "stroke-[2.2]")} />
              <span>{t.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
