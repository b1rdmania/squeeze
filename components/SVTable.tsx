"use client";

import { useState, useMemo } from "react";
import type { SuperValidator } from "@/lib/types";

type SortKey = keyof Pick<
  SuperValidator,
  "displayName" | "validatorCount" | "uptime" | "missedRounds" | "commissionRate"
>;

type SortDir = "asc" | "desc";

function UptimeBadge({ uptime }: { uptime: number }) {
  const color =
    uptime >= 99 ? "var(--green)" : uptime >= 95 ? "var(--amber)" : "var(--red)";
  return (
    <span
      style={{ color, fontVariantNumeric: "tabular-nums" }}
      className="font-mono text-sm font-medium"
    >
      {uptime.toFixed(2)}%
    </span>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <span
      style={{
        color: active ? "var(--accent)" : "var(--text-muted)",
        fontSize: "10px",
        marginLeft: "4px",
      }}
    >
      {active ? (dir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );
}

function Th({
  label,
  sortKey,
  current,
  dir,
  onClick,
}: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  dir: SortDir;
  onClick: (k: SortKey) => void;
}) {
  return (
    <th
      style={{
        color: "var(--text-secondary)",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        padding: "12px 16px",
        textAlign: "left",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-surface)",
        whiteSpace: "nowrap",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={() => onClick(sortKey)}
    >
      {label}
      <SortIcon active={current === sortKey} dir={dir} />
    </th>
  );
}

export function SVTable({ svs }: { svs: SuperValidator[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("validatorCount");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = useMemo(() => {
    return [...svs].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === null && bv === null) return 0;
      if (av === null) return 1;
      if (bv === null) return -1;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [svs, sortKey, sortDir]);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <Th label="Super Validator" sortKey="displayName" current={sortKey} dir={sortDir} onClick={handleSort} />
              <Th label="Validators" sortKey="validatorCount" current={sortKey} dir={sortDir} onClick={handleSort} />
              <Th label="Uptime" sortKey="uptime" current={sortKey} dir={sortDir} onClick={handleSort} />
              <Th label="Missed Rounds" sortKey="missedRounds" current={sortKey} dir={sortDir} onClick={handleSort} />
              <Th label="Commission" sortKey="commissionRate" current={sortKey} dir={sortDir} onClick={handleSort} />
              <th
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "12px 16px",
                  textAlign: "left",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--bg-surface)",
                  whiteSpace: "nowrap",
                }}
              >
                Version
              </th>
              <th
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "12px 16px",
                  textAlign: "left",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--bg-surface)",
                  whiteSpace: "nowrap",
                }}
              >
                Links
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((sv, i) => (
              <tr
                key={sv.id}
                style={{
                  background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-surface)",
                  borderBottom: "1px solid var(--border-subtle)",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background =
                    "var(--bg-surface)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background =
                    i % 2 === 0 ? "var(--bg-card)" : "var(--bg-surface)";
                }}
              >
                <td style={{ padding: "14px 16px" }}>
                  <div
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {sv.displayName}
                  </div>
                  {sv.contact && (
                    <div
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "11px",
                        marginTop: "2px",
                      }}
                    >
                      {sv.contact}
                    </div>
                  )}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "14px",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {sv.validatorCount}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <UptimeBadge uptime={sv.uptime} />
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color:
                        sv.missedRounds > 1000
                          ? "var(--amber)"
                          : "var(--text-secondary)",
                      fontSize: "13px",
                      fontVariantNumeric: "tabular-nums",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    {sv.missedRounds.toLocaleString()}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  {sv.commissionRate !== null ? (
                    <span
                      style={{ color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      {sv.commissionRate}%
                    </span>
                  ) : (
                    <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                      —
                    </span>
                  )}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "12px",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    {sv.latestVersion}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div className="flex gap-3">
                    {sv.website && (
                      <a
                        href={sv.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--accent)",
                          fontSize: "12px",
                          textDecoration: "none",
                        }}
                      >
                        Site ↗
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
