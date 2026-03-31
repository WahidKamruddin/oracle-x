"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import type { PricePoint } from "@/lib/coingecko"

export type ChartCoin = {
  id: string
  name: string
  symbol: string
  color: string
}

const RANGE_DAYS: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90 }

export function ChartAreaInteractive({
  data,
  coins,
}: {
  data: PricePoint[]
  coins: ChartCoin[]
}) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d")
  }, [isMobile])

  const filteredData = React.useMemo(() => {
    const days = RANGE_DAYS[timeRange] ?? 90
    return data.slice(-days)
  }, [data, timeRange])

  // Normalize each coin's price to % change from the first point in the window
  const normalizedData = React.useMemo(() => {
    if (filteredData.length === 0) return []
    const baselines: Record<string, number> = {}
    for (const coin of coins) {
      const first = filteredData[0][coin.id]
      baselines[coin.id] = typeof first === "number" && first !== 0 ? first : 1
    }
    return filteredData.map((point) => {
      const normalized: PricePoint = { date: point.date }
      for (const coin of coins) {
        const price = point[coin.id]
        const baseline = baselines[coin.id]
        normalized[coin.id] =
          typeof price === "number"
            ? ((price - baseline) / baseline) * 100
            : 0
      }
      return normalized
    })
  }, [filteredData, coins])

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    for (const coin of coins) {
      config[coin.id] = { label: coin.name, color: coin.color }
    }
    return config
  }, [coins])

  const rangeLabel =
    timeRange === "7d" ? "7 days" : timeRange === "30d" ? "30 days" : "3 months"

  if (data.length === 0 || coins.length === 0) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Price Performance</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[250px] items-center justify-center text-muted-foreground text-sm">
          Unable to load price history.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Price Performance</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            % change over the last {rangeLabel}
          </span>
          <span className="@[540px]/card:hidden">Last {rangeLabel}</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">Last 3 months</SelectItem>
              <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
              <SelectItem value="7d" className="rounded-lg">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={normalizedData}>
            <defs>
              {coins.map((coin) => (
                <linearGradient
                  key={coin.id}
                  id={`fill-${coin.id}`}
                  x1="0" y1="0" x2="0" y2="1"
                >
                  <stop offset="5%" stopColor={coin.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={coin.color} stopOpacity={0.0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={48}
              tickFormatter={(v) => `${v > 0 ? "+" : ""}${v.toFixed(0)}%`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  formatter={(value, name) => {
                    const num = Number(value)
                    const label = chartConfig[name as string]?.label ?? name
                    return [
                      `${num > 0 ? "+" : ""}${num.toFixed(2)}%`,
                      label,
                    ]
                  }}
                  indicator="dot"
                />
              }
            />
            {coins.map((coin) => (
              <Area
                key={coin.id}
                dataKey={coin.id}
                type="natural"
                fill={`url(#fill-${coin.id})`}
                stroke={coin.color}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
