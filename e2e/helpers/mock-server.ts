import http from "http";
import { MOCK_COINS, MOCK_GLOBAL_DATA, MOCK_PRICE_HISTORY } from "../fixtures/mock-data";

let server: http.Server | null = null;

export function startMockServer(port = 3001): Promise<void> {
  return new Promise((resolve, reject) => {
    server = http.createServer((req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");

      const url = req.url ?? "";

      try {
        if (url.startsWith("/global")) {
          res.end(JSON.stringify({ data: MOCK_GLOBAL_DATA }));
        } else if (url.includes("/coins/markets")) {
          const params = new URL(url, "http://localhost").searchParams;
          const ids = params.get("ids");
          const coins = ids
            ? MOCK_COINS.filter((c) => ids.split(",").includes(c.id))
            : MOCK_COINS;
          res.end(JSON.stringify(coins));
        } else if (/\/coins\/[^/]+\/market_chart/.test(url)) {
          res.end(JSON.stringify({ prices: MOCK_PRICE_HISTORY }));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify([]));
        }
      } catch {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "mock server error" }));
      }
    });

    server.on("error", reject);
    server.listen(port, () => resolve());
  });
}

export function stopMockServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!server) return resolve();
    server.close((err) => {
      server = null;
      if (err) reject(err);
      else resolve();
    });
  });
}
