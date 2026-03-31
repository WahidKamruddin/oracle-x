"use client"

import * as React from "react"
import Image from "next/image"
import { IconStar, IconStarFilled } from "@tabler/icons-react"
import { toast } from "sonner"

import { toggleFavorite } from "@/app/dashboard/actions"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { type CoinMarket } from "@/lib/coingecko"
import { cn, formatCurrency, formatPercent, isPositive } from "@/lib/utils"

type Props = {
  coins: CoinMarket[]
  initialFavoriteIds: string[]
}

export function CoinsTable({ coins, initialFavoriteIds }: Props) {
  const [favoriteIds, setFavoriteIds] = React.useState<Set<string>>(
    () => new Set(initialFavoriteIds)
  )
  const [pending, setPending] = React.useState<Set<string>>(new Set())

  async function handleToggle(coinId: string) {
    if (pending.has(coinId)) return

    // Optimistic update
    setPending((prev) => new Set(prev).add(coinId))
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(coinId)) {
        next.delete(coinId)
      } else {
        next.add(coinId)
      }
      return next
    })

    try {
      await toggleFavorite(coinId)
    } catch {
      // Revert optimistic update on failure
      setFavoriteIds((prev) => {
        const next = new Set(prev)
        if (next.has(coinId)) {
          next.delete(coinId)
        } else {
          next.add(coinId)
        }
        return next
      })
      toast.error("Failed to update favorites. Please try again.")
    } finally {
      setPending((prev) => {
        const next = new Set(prev)
        next.delete(coinId)
        return next
      })
    }
  }

  return (
    <div className="px-4 lg:px-6">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead className="w-8 text-center text-muted-foreground">#</TableHead>
              <TableHead>Coin</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h %</TableHead>
              <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
              <TableHead className="text-right hidden lg:table-cell">Volume (24h)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coins.map((coin, index) => {
              const isFavorited = favoriteIds.has(coin.id)
              const isPending = pending.has(coin.id)
              const positive = isPositive(coin.price_change_percentage_24h)

              return (
                <TableRow key={coin.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      disabled={isPending}
                      onClick={() => handleToggle(coin.id)}
                      aria-label={isFavorited ? `Remove ${coin.name} from favorites` : `Add ${coin.name} to favorites`}
                    >
                      {isFavorited ? (
                        <IconStarFilled className="size-4 text-yellow-400" />
                      ) : (
                        <IconStar className="size-4 text-muted-foreground" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground text-sm">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium leading-tight">{coin.name}</span>
                        <span className="text-xs text-muted-foreground uppercase">
                          {coin.symbol}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatCurrency(coin.current_price)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        positive ? "text-green-600" : "text-red-500"
                      )}
                    >
                      {positive ? "+" : ""}
                      {formatPercent(coin.price_change_percentage_24h)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground hidden md:table-cell">
                    {formatCurrency(coin.market_cap)}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground hidden lg:table-cell">
                    {formatCurrency(coin.total_volume)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
