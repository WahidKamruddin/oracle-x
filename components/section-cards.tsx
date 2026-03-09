import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatPercent, isPositive } from "@/lib/utils";

export async function SectionCards() {
  const res = await fetch("https://api.coingecko.com/api/v3/global", {
    headers: {
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
      Accept: "application/json",
    },
  });

  const unformattedData = await res.json();
  const data = unformattedData.data;

  if (!data) throw Error('API Not Fetching');

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-5 @5xl/main:grid-cols-5 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card col-span-2">
        <CardHeader>
          <div className="flex w-full justify-between">
            <CardDescription>Market Cap</CardDescription>
            <Badge
              variant="outline"
              className={
                isPositive(data.volume_change_percentage_24h_usd)
                  ? "bg-green-300"
                  : "bg-red-300"
              }
            >
              {isPositive(data.market_cap_change_percentage_24h_usd)?<IconTrendingUp /> :<IconTrendingDown/>}
              {formatPercent(data.market_cap_change_percentage_24h_usd)}
            </Badge>
          </div>

          <CardTitle className="text-2xl font-semibold tabular-nums @[300px]/card:text-3xl">
            {formatCurrency(data.total_market_cap.usd)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Revenue for your coins</div>
        </CardFooter>
      </Card>
      <Card className="@container/card col-span-2">
        <CardHeader>
          <div className="flex w-full justify-between">
            <CardDescription>24hr Trading Volume</CardDescription>
            <Badge
              variant="outline"
              className={
                isPositive(data.volume_change_percentage_24h_usd)
                  ? "bg-green-300"
                  : "bg-red-300"
              }
            >
              {isPositive(data.volume_change_percentage_24h_usd) ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {formatPercent(data.volume_change_percentage_24h_usd)}
            </Badge>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(data.total_volume.usd)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex w-full justify-between">
            <CardDescription>Your Coins</CardDescription>
            
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
