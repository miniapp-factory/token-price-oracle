'use client';

export default function MetricsGrid({ data }) {
  const metrics = [
    { label: 'Price', value: `$${data.currentPrice}` },
    { label: '24h %', value: `${data.change24h}%` },
    { label: 'Volume', value: `$${data.volume}` },
    { label: 'Market Cap', value: `$${data.marketCap}` },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="p-4 rounded bg-card text-card-foreground">
          <div className="text-sm text-muted-foreground">{m.label}</div>
          <div className="text-lg font-semibold">{m.value}</div>
        </div>
      ))}
    </div>
  );
}
