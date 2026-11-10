export type PartnerMatcher = {
  id?: string;
  name?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  mst?: string;
  isAdmin?: boolean;
};

export type DealerStickersStats = {
  total: number;
  inStock: number;
  activated: number;
  sellThroughRate: number;
};

export type DealerStickerRow = {
  id: string;
  seri: string;
  codeMasked: string;
  status: string;
  soldAt?: string;
  unitPrice?: number;
  orderRef?: string;
  clientName?: string;
  clientPhone?: string;
  clientNote?: string;
  activatedAt?: string;
  deviceName?: string;
  batchName?: string;
  partnerName?: string;
  paymentStatus?: string;
  ipAddress?: string;
  resetCount?: number;
  note?: string;
};

export type DealerStickersResult = {
  stats: DealerStickersStats;
  items: DealerStickerRow[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  availablePartners?: any[];
  currentPartnerName?: string;
};

export function maskStickerCode(code: string): string {
  if (!code) return "••••-••••-••••";
  const parts = code.trim().split("-");
  if (parts.length >= 3) {
    return `${parts[0]}-••••-••••`;
  }
  return "••••-••••-••••";
}

export async function getDealerStickers(
  matcherOrId?: PartnerMatcher | string,
  dealerName?: string,
  params?: {
    search?: string;
    status?: string;
    page?: number;
    pageSize?: number;
  }
): Promise<DealerStickersResult> {
  return {
    stats: {
      total: 0,
      inStock: 0,
      activated: 0,
      sellThroughRate: 0,
    },
    items: [],
    totalCount: 0,
    page: params?.page || 1,
    pageSize: params?.pageSize || 20,
    totalPages: 0,
    availablePartners: [],
  };
}
