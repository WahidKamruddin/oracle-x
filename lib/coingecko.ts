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
