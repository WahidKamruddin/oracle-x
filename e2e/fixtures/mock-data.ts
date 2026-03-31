import type { CoinMarket, GlobalMarketData } from "../../lib/coingecko";

export const MOCK_COINS: CoinMarket[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 65000,
    price_change_percentage_24h: 2.5,
    market_cap: 1_200_000_000_000,
    total_volume: 30_000_000_000,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3500,
    price_change_percentage_24h: -1.2,
    market_cap: 420_000_000_000,
    total_volume: 15_000_000_000,
  },
  {
    id: "tether",
    symbol: "usdt",
    name: "Tether",
    image:
      "https://coin-images.coingecko.com/coins/images/325/large/tether.png",
    current_price: 1.0,
    price_change_percentage_24h: 0.01,
    market_cap: 95_000_000_000,
    total_volume: 50_000_000_000,
  },
];

export const MOCK_GLOBAL_DATA: GlobalMarketData = {
  total_market_cap: { usd: 2_500_000_000_000 },
  total_volume: { usd: 100_000_000_000 },
  market_cap_change_percentage_24h_usd: 1.8,
  volume_change_percentage_24h_usd: 3.2,
};

// 90 daily price points used for market_chart endpoint responses
export const MOCK_PRICE_HISTORY: [number, number][] = Array.from(
  { length: 90 },
  (_, i) => [Date.now() - (89 - i) * 86_400_000, 60_000 + i * 50]
);
