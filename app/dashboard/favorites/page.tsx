import Link from "next/link"
import { redirect } from "next/navigation"

import { AppSidebar } from "@/components/app-sidebar"
import { CoinsTable } from "@/components/coins-table"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getUser } from "@/lib/auth"
import { getCoinsByIds } from "@/lib/coingecko"
import prisma from "@/lib/prisma"

export default async function FavoritesPage() {
  const user = await getUser()

  if (!user) redirect("/login")

  const savedFavorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    select: { coinId: true },
  })

  const coinIds = savedFavorites.map((f) => f.coinId)
  const coins = await getCoinsByIds(coinIds)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={user} />
      <SidebarInset>
        <SiteHeader title="Favorites" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {coinIds.length === 0 ? (
                <div className="px-4 lg:px-6 flex flex-col items-center justify-center py-24 text-center gap-3">
                  <p className="text-muted-foreground text-lg">No favorites yet.</p>
                  <p className="text-muted-foreground text-sm">
                    Go to the{" "}
                    <Link href="/dashboard" className="underline underline-offset-4 hover:text-foreground">
                      Dashboard
                    </Link>{" "}
                    and click the star icon next to any coin to add it here.
                  </p>
                </div>
              ) : (
                <CoinsTable coins={coins} initialFavoriteIds={coinIds} />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
