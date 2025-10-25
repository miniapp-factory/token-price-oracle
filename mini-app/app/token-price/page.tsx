import { useState } from "react";
import { Share } from "@/components/share";
import { Button } from "@/components/ui/button";

export default function TokenPricePage() {
  const [symbol, setSymbol] = useState("");
  const [priceData, setPriceData] = useState<{
    price: number;
    marketCap: number;
    history: Array<{ time: number; price: number }>;
  } | null>(null);
  const [threshold, setThreshold] = useState("");
  const [alert, setAlert] = useState<string | null>(null);

  const fetchPrice = async () => {
    if (!symbol) return;
    try {
      const res = await fetch(`/api/token-price?symbol=${symbol.toUpperCase()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPriceData(data);
      setAlert(null);
    } catch (e) {
      console.error(e);
      setPriceData(null);
    }
  };

  const checkThreshold = () => {
    if (!priceData || !threshold) return;
    const thresh = parseFloat(threshold);
    if (isNaN(thresh)) return;
    if (priceData.price > thresh) {
      setAlert(`Price ${priceData.price.toFixed(2)} is above threshold ${thresh}`);
    } else {
      setAlert(`Price ${priceData.price.toFixed(2)} is below threshold ${thresh}`);
    }
  };

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Token Price Oracle</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Token symbol (e.g., ETH, SOL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
        />
        <Button onClick={fetchPrice}>Fetch</Button>
      </div>
      {priceData && (
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold mb-2">{symbol.toUpperCase()}</h2>
          <p>
            <strong>Price:</strong> ${priceData.price.toFixed(2)}
          </p>
          <p>
            <strong>Market Cap:</strong> ${priceData.marketCap.toLocaleString()}
          </p>
          <div className="mt-4">
            <h3 className="font-medium">Price History (Last 24h)</h3>
            <ul className="max-h-48 overflow-y-auto mt-2">
              {priceData.history.map((point, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span>{new Date(point.time).toLocaleTimeString()}</span>
                  <span>${point.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex gap-2 items-center">
            <input
              type="number"
              placeholder="Threshold"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="border rounded px-2 py-1 flex-1"
            />
            <Button onClick={checkThreshold}>Check</Button>
          </div>
          {alert && <p className="mt-2 text-green-600">{alert}</p>}
          <div className="mt-4">
            <Share
              text={`Token ${symbol.toUpperCase()} price is $${priceData.price.toFixed(
                2
              )} USD`}
            />
          </div>
        </div>
      )}
    </main>
  );
}
