"use client";

interface TxDay {
  day: string;
  tx_count: number;
}

export function TxChart({ data }: { data: TxDay[] }) {
  if (!data.length) return null;

  const max = Math.max(...data.map((d) => d.tx_count));
  const barWidth = 100 / data.length;

  function fmt(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return n.toString();
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "3px",
          height: "80px",
          padding: "0 2px",
        }}
      >
        {data.map((d, i) => {
          const pct = (d.tx_count / max) * 100;
          const isToday = i === data.length - 1;
          return (
            <div
              key={d.day}
              title={`${d.day}: ${d.tx_count.toLocaleString()} txs`}
              style={{
                flex: 1,
                height: `${Math.max(pct, 4)}%`,
                background: isToday ? "var(--accent)" : "var(--border)",
                borderRadius: "2px 2px 0 0",
                transition: "background 0.1s",
                cursor: "default",
                minWidth: 0,
              }}
              onMouseEnter={(e) => {
                if (!isToday)
                  (e.currentTarget as HTMLDivElement).style.background =
                    "var(--accent-dim)";
              }}
              onMouseLeave={(e) => {
                if (!isToday)
                  (e.currentTarget as HTMLDivElement).style.background =
                    "var(--border)";
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "6px",
        }}
      >
        <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>
          {data[0]?.day?.slice(5)}
        </span>
        <span style={{ color: "var(--text-secondary)", fontSize: "10px" }}>
          {fmt(max)} peak
        </span>
        <span style={{ color: "var(--accent)", fontSize: "10px" }}>
          today
        </span>
      </div>
    </div>
  );
}
