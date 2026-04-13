// Manually maintained SV config — update quarterly or on change
// Commission rates require manual research per SV website

export interface SVConfig {
  displayName: string;
  website: string | null;
  commissionRate: number | null; // percentage, e.g. 10 = 10%
}

// Keys match the sponsor name prefix from the lighthouse API (before ::)
export const SV_CONFIG: Record<string, SVConfig> = {
  "Digital-Asset-1": {
    displayName: "Digital Asset",
    website: "https://www.digitalasset.com",
    commissionRate: null,
  },
  "Digital-Asset-2": {
    displayName: "Digital Asset (2)",
    website: "https://www.digitalasset.com",
    commissionRate: null,
  },
  "Global-Synchronizer-Foundation": {
    displayName: "Global Synchronizer Foundation",
    website: "https://www.global-synchronizer.org",
    commissionRate: null,
  },
  "Proof-Group-1": {
    displayName: "Proof Group",
    website: "https://www.proofgroup.com",
    commissionRate: null,
  },
  "Five-North-1": {
    displayName: "Five North",
    website: null,
    commissionRate: null,
  },
  "MPC-Holding-Inc": {
    displayName: "MPC Holding (MPCH)",
    website: "https://www.mpch.io",
    commissionRate: null,
  },
  "Cumberland-1": {
    displayName: "Cumberland",
    website: "https://www.cumberlanddrw.com",
    commissionRate: null,
  },
  "Cumberland-2": {
    displayName: "Cumberland (2)",
    website: "https://www.cumberlanddrw.com",
    commissionRate: null,
  },
  "SV-Nodeops-Limited": {
    displayName: "SV Nodeops",
    website: null,
    commissionRate: null,
  },
  "Tradeweb-Markets-1": {
    displayName: "Tradeweb Markets",
    website: "https://www.tradeweb.com",
    commissionRate: null,
  },
  "C7-Technology-Services-Limited": {
    displayName: "C7 Technology Services",
    website: null,
    commissionRate: null,
  },
  "Orb-1-LP-1": {
    displayName: "Orb",
    website: null,
    commissionRate: null,
  },
  "DSO": {
    displayName: "DSO",
    website: null,
    commissionRate: null,
  },
};
