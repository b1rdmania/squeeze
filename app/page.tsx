import { Suspense } from "react";
import { getNetworkStats, getSuperValidators } from "@/lib/lighthouse";
import { StatsBar } from "@/components/StatsBar";
import { SVTable } from "@/components/SVTable";
import { TxChart } from "@/components/TxChart";

function Nav() {
  return (
    <nav
      style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            style={{
              color: "var(--accent)",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Squeeze
          </span>
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "11px",
              padding: "2px 8px",
              border: "1px solid var(--border)",
              borderRadius: "20px",
            }}
          >
            Canton DeFi
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
            Validators
          </span>
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "13px",
              cursor: "not-allowed",
            }}
            title="Coming soon"
          >
            DeFi
          </span>
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "13px",
              cursor: "not-allowed",
            }}
            title="Coming soon"
          >
            Portfolio
          </span>
        </div>
      </div>
    </nav>
  );
}

async function NetworkSection() {
  const stats = await getNetworkStats();

  return (
    <>
      <StatsBar stats={stats} />
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-2">
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "20px 24px",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              style={{
                color: "var(--text-secondary)",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 500,
              }}
            >
              14-Day Transaction Volume
            </h2>
            <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>
              Daily tx count
            </span>
          </div>
          <TxChart data={stats.historyTx14d} />
        </div>
      </div>
    </>
  );
}

async function SVSection() {
  const svs = await getSuperValidators();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1
            style={{
              color: "var(--text-primary)",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: "4px",
            }}
          >
            Super Validator Comparison
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            {svs.length} Super Validators on Canton Network. Click any column to sort.
          </p>
        </div>
        <div
          style={{
            background: "var(--border)",
            borderRadius: "6px",
            padding: "4px 10px",
            fontSize: "11px",
            color: "var(--text-muted)",
          }}
        >
          Live · updates every 10 min
        </div>
      </div>
      <SVTable svs={svs} />
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "11px",
          marginTop: "12px",
        }}
      >
        Uptime = (total rounds - missed rounds) / total rounds across all
        sponsored validators. Commission rates require manual research — coming
        soon. Data: lighthouse.cantonloop.com
      </p>
    </div>
  );
}

function LoadingTable() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Loading validator data...
        </span>
      </div>
    </div>
  );
}

function LoadingStats() {
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
        height: "88px",
      }}
    />
  );
}

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">
        <Suspense fallback={<LoadingStats />}>
          <NetworkSection />
        </Suspense>
        <Suspense fallback={<LoadingTable />}>
          <SVSection />
        </Suspense>
      </main>
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "20px 24px",
          textAlign: "center",
        }}
      >
        <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
          Squeeze by Firestar Digital — Canton DeFi aggregation layer
        </span>
      </footer>
    </div>
  );
}
