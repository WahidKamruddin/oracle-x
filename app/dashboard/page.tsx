import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { CoinsTable } from "@/components/coins-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { getUser } from "@/lib/auth"
import { getTopCoins } from "@/lib/coingecko"
import { redirect } from "next/navigation"
import { getFavoriteIds } from "./actions"

export default async function Page() {

  const user = await getUser()

  if (!user) redirect("/")

  const [coins, favoriteIds] = await Promise.all([
    getTopCoins(50),
    getFavoriteIds(),
  ])

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
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <CoinsTable coins={coins} initialFavoriteIds={favoriteIds} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
