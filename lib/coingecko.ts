export type CoinMarket = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
}

const BASE_URL = process.env.COINGECKO_BASE_URL ?? "https://api.coingecko.com/api/v3"
const API_KEY = process.env.COINGECKO_API_KEY ?? ""

const headers = {
  "x-cg-demo-api-key": API_KEY,
  Accept: "application/json",
}

export async function getTopCoins(limit = 50): Promise<CoinMarket[]> {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1`,
    { headers, next: { revalidate: 60 } }
  )
  if (!res.ok) return []
  return res.json()
}

export async function getCoinsByIds(ids: string[]): Promise<CoinMarket[]> {
  if (ids.length === 0) return []
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&ids=${ids.join(",")}&order=market_cap_desc`,
    { headers, next: { revalidate: 60 } }
  )
  if (!res.ok) return []
  return res.json()
}

export type PricePoint = { date: string; [coinId: string]: number | string }

async function fetchCoinHistory(id: string): Promise<[number, number][]> {
  const res = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=90&interval=daily`,
    { headers, next: { revalidate: 3600 } }
  )
  if (!res.ok) return []
  const json = await res.json()
  return json.prices ?? []
}

export async function getCoinPriceHistories(ids: string[]): Promise<PricePoint[]> {
  if (ids.length === 0) return []

  const histories = await Promise.all(ids.map(fetchCoinHistory))

  const byDate = new Map<string, Record<string, number>>()
  for (let i = 0; i < ids.length; i++) {
    for (const [ms, price] of histories[i]) {
      const date = new Date(ms).toISOString().split("T")[0]
      if (!byDate.has(date)) byDate.set(date, {})
      byDate.get(date)![ids[i]] = price
    }
  }

  return Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, prices]) => ({ date, ...prices }))
}
