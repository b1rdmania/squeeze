import type { NetworkStats } from "@/lib/types";

function fmt(n: number, decimals = 2): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(decimals)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(decimals)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(decimals)}K`;
  return n.toFixed(decimals);
}

interface StatItemProps {
  label: string;
  value: string;
  sub?: string;
}

function StatItem({ label, value, sub }: StatItemProps) {
  return (
    <div className="flex flex-col gap-0.5 min-w-[120px]">
      <span
        style={{ color: "var(--text-secondary)", fontSize: "11px" }}
        className="uppercase tracking-wider font-medium"
      >
        {label}
      </span>
      <span
        style={{ color: "var(--text-primary)", fontSize: "20px" }}
        className="font-semibold tabular-nums leading-none"
      >
        {value}
      </span>
      {sub && (
        <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>
          {sub}
        </span>
      )}
    </div>
  );
}

export function StatsBar({ stats }: { stats: NetworkStats }) {
  // Today's tx volume
  const todayTx =
    stats.historyTx14d[stats.historyTx14d.length - 1]?.tx_count ?? 0;

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
      }}
      className="w-full"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap gap-8">
        <StatItem
          label="CC Price"
          value={`$${stats.ccPrice.toFixed(4)}`}
        />
        <StatItem
          label="Total CC"
          value={fmt(stats.totalCC, 0)}
          sub="in circulation"
        />
        <StatItem
          label="Validators"
          value={stats.totalValidators.toLocaleString()}
          sub={`${stats.totalSVs} Super Validators`}
        />
        <StatItem
          label="Wallets"
          value={fmt(stats.totalParties, 0)}
          sub="active parties"
        />
        <StatItem
          label="Transactions"
          value={fmt(stats.totalTransactions, 0)}
          sub="all time"
        />
        <StatItem
          label="Today's Volume"
          value={fmt(todayTx, 0)}
          sub="transactions"
        />
      </div>
    </div>
  );
}
