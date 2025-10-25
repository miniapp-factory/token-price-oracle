import axios from 'axios';

export async function getPriceData(symbol: string) {
  const coinId = symbol.toLowerCase();
  const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  const { market_data } = res.data;
  return {
    symbol,
    currentPrice: market_data.current_price.usd,
    change24h: market_data.price_change_percentage_24h,
    volume: market_data.total_volume.usd,
    marketCap: market_data.market_cap.usd,
    history: market_data.sparkline_7d.price.map((p: number, i: number) => ({
      time: Date.now() - (7 * 24 * 60 * 60 * 1000) + i * 60 * 60 * 1000,
      price: p,
    })),
  };
}
