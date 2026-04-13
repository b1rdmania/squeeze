import { cacheLife } from "next/cache";
import type {
  ValidatorsResponse,
  StatsResponse,
  SuperValidator,
  NetworkStats,
} from "./types";
import { SV_CONFIG } from "./sv-config";

const BASE_URL = "https://lighthouse.cantonloop.com/api";

export async function getNetworkStats(): Promise<NetworkStats> {
  "use cache";
  cacheLife("minutes");

  const res = await fetch(`${BASE_URL}/stats`);
  if (!res.ok) throw new Error(`Lighthouse stats fetch failed: ${res.status}`);
  const data: StatsResponse = await res.json();

  return {
    ccPrice: parseFloat(data.cc_price),
    totalCC: parseFloat(data.total_cc),
    totalValidators: data.total_validator,
    totalSVs: data.total_sv,
    totalTransactions: data.total_transaction,
    totalParties: data.total_parties,
    totalReward: parseFloat(data.total_reward),
    historyTx14d: data.history_tx_14d,
  };
}

export async function getSuperValidators(): Promise<SuperValidator[]> {
  "use cache";
  cacheLife("minutes");

  const res = await fetch(`${BASE_URL}/validators`);
  if (!res.ok)
    throw new Error(`Lighthouse validators fetch failed: ${res.status}`);
  const data: ValidatorsResponse = await res.json();

  // Group validators by sponsor
  const svMap = new Map<
    string,
    {
      validators: typeof data.validators;
      sponsorId: string;
    }
  >();

  for (const v of data.validators) {
    const sponsorName = v.sponsor.split("::")[0];
    if (!svMap.has(sponsorName)) {
      svMap.set(sponsorName, { validators: [], sponsorId: v.sponsor });
    }
    svMap.get(sponsorName)!.validators.push(v);
  }

  const svs: SuperValidator[] = [];

  for (const [name, { validators, sponsorId }] of svMap.entries()) {
    // Aggregate uptime across all validators for this SV
    let totalFirst = 0;
    let totalLast = 0;
    let totalMiss = 0;
    let latestActive = "";
    const versions = new Set<string>();

    for (const v of validators) {
      totalFirst += v.first_round;
      totalLast += v.last_round;
      totalMiss += v.miss_round;
      if (!latestActive || v.last_active_at > latestActive) {
        latestActive = v.last_active_at;
      }
      if (v.version) versions.add(v.version);
    }

    // Uptime as average across validators
    const avgFirst = totalFirst / validators.length;
    const avgLast = totalLast / validators.length;
    const avgMiss = totalMiss / validators.length;
    const totalRounds = avgLast - avgFirst;
    const uptime =
      totalRounds > 0
        ? ((totalRounds - avgMiss) / totalRounds) * 100
        : 0;

    // Use the SV that has the most representative contact
    const contactValidator = validators.find((v) => v.contact) || validators[0];
    const config = SV_CONFIG[name] || {
      displayName: name.replace(/-/g, " "),
      website: null,
      commissionRate: null,
    };

    // Earliest first_round as activeSince proxy
    const earliestFirst = Math.min(...validators.map((v) => v.first_round));

    svs.push({
      id: sponsorId,
      name,
      displayName: config.displayName,
      validatorCount: validators.length,
      uptime: parseFloat(uptime.toFixed(2)),
      missedRounds: Math.round(totalMiss),
      totalRounds: Math.round(totalRounds * validators.length),
      latestVersion: [...versions].sort().reverse()[0] || "unknown",
      contact: contactValidator?.contact || "",
      activeSince: earliestFirst.toString(),
      commissionRate: config.commissionRate,
      website: config.website,
    });
  }

  // Sort by validator count descending by default
  return svs.sort((a, b) => b.validatorCount - a.validatorCount);
}
