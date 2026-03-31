import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive, type ChartCoin } from "@/components/chart-area-interactive"
import { CoinsTable } from "@/components/coins-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { getUser } from "@/lib/auth"
import { getCoinPriceHistories, getGlobalMarketData, getTopCoins } from "@/lib/coingecko"
import { redirect } from "next/navigation"
import { getFavoriteIds } from "./actions"

const CHART_COLORS = ["#6366f1", "#22c55e", "#f97316"]

export default async function Page() {
  const user = await getUser()
  if (!user) redirect("/")

  const [coins, favoriteIds, globalData] = await Promise.all([
    getTopCoins(50),
    getFavoriteIds(),
    getGlobalMarketData(),
  ])

  // Chart coins: up to 3 favorites, or top 3 by price if no favorites
  const chartCoinIds = favoriteIds.length > 0
    ? favoriteIds.slice(0, 3)
    : [...coins].sort((a, b) => b.current_price - a.current_price).slice(0, 3).map(c => c.id)

  const priceHistory = await getCoinPriceHistories(chartCoinIds)

  const chartCoins: ChartCoin[] = chartCoinIds.map((id, i) => {
    const coin = coins.find(c => c.id === id)
    return {
      id,
      name: coin?.name ?? id,
      symbol: coin?.symbol ?? id,
      color: CHART_COLORS[i],
    }
  })

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
              {globalData && <SectionCards data={globalData} />}
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive data={priceHistory} coins={chartCoins} />
              </div>
              <CoinsTable coins={coins} initialFavoriteIds={favoriteIds} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
