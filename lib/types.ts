export interface RawValidator {
  id: string;
  sponsor: string;
  dso: string;
  last_active_at: string;
  first_round: number;
  last_round: number;
  miss_round: number;
  version: string;
  contact: string;
}

export interface ValidatorsResponse {
  count: number;
  validators: RawValidator[];
}

export interface StatsResponse {
  total_cc: string;
  cc_price: string;
  total_validator: number;
  total_sv: number;
  total_transaction: number;
  total_parties: number;
  total_reward: string;
  history_tx_14d: { day: string; tx_count: number }[];
}

export interface SuperValidator {
  id: string;
  name: string;
  displayName: string;
  validatorCount: number;
  uptime: number;
  missedRounds: number;
  totalRounds: number;
  latestVersion: string;
  contact: string;
  activeSince: string;
  // manually maintained
  commissionRate: number | null;
  website: string | null;
}

export interface NetworkStats {
  ccPrice: number;
  totalCC: number;
  totalValidators: number;
  totalSVs: number;
  totalTransactions: number;
  totalParties: number;
  totalReward: number;
  historyTx14d: { day: string; tx_count: number }[];
}
