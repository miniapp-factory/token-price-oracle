import { NextResponse } from "next/server";

const symbolToId: Record<string, string> = {
  ETH: "ethereum",
  SOL: "solana",
  BASE: "base",
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const symbol = url.searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol" }, { status: 400 });
  }
  const id = symbolToId[symbol.toUpperCase()];
  if (!id) {
    return NextResponse.json({ error: "Unsupported symbol" }, { status: 400 });
  }

  try {
    // Fetch current price and market cap
    const priceRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_market_cap=true`
    );
    const priceData = await priceRes.json();
    const price = priceData[id]?.usd ?? null;
    const marketCap = priceData[id]?.usd_market_cap ?? null;

    // Fetch price history for last 24h
    const historyRes = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
    );
    const historyJson = await historyRes.json();
    const history = historyJson.prices.map((p: [number, number]) => ({
      time: p[0],
      price: p[1],
    }));

    return NextResponse.json({
      price,
      marketCap,
      history,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
