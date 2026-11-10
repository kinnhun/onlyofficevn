import { readDB } from "@/lib/github-db";
import { maskKey } from "@/lib/crypto";
import { getDealerStickers } from "@/lib/stickers-service";
import { getBotSettings } from "@/features/ai-assistant-admin/services/ai-admin-storage.service";
import { searchApprovedKnowledge } from "./knowledge.service";
import { createSupportTicketIdempotent } from "./support-storage.service";
import { sendTelegramHandoffAlert } from "./telegram-handoff.service";
import type {
  SupportEdition,
  SupportIntent,
  SupportOS,
  SupportOwnerContext,
  SupportProduct,
} from "../types/support.types";

function safeMaskDigitalKey(raw: string): string {
  if (!raw) return "••••-••••-••••";
  const masked = maskKey(raw);
  if (masked !== raw) return masked;
  if (raw.length <= 6) return "••••••";
  return `${raw.slice(0, 4)}••••${raw.slice(-3)}`;
}

/**
 * Tool 1: search_knowledge
 * Server enforces owner audience & OS constraints.
 */
export async function toolSearchKnowledge(params: {
  owner: SupportOwnerContext;
  query: string;
  product?: SupportProduct;
  os?: SupportOS;
  intent?: SupportIntent;
  topK?: number;
}) {
  return searchApprovedKnowledge(params);
}

export type LicenseLookupResult = {
  authenticated: boolean;
  ownerType: SupportOwnerContext["ownerType"];
  accountLabel?: string;
  digitalLicensesSummary?: {
    total: number;
    active: number;
    issued: number;
    revoked: number;
    sampleItems: Array<{
      keyMasked: string;
      status: string;
      deviceName: string | null;
      activatedAt: string | null;
    }>;
  };
  physicalStickersSummary?: {
    total: number;
    inStock: number;
    activated: number;
    sampleItems: Array<{
      seri: string;
      codeMasked: string;
      status: string;
      deviceName?: string;
      activatedAt?: string;
    }>;
  };
  message: string;
};

/**
 * Tool 2: lookup_my_license
 * Read-only, strictly scoped to the server-authenticated owner.
 * Never accepts external userId or dealerId arguments — prevents cross-dealer / cross-customer data leaks (T17, T18).
 */
export async function toolLookupMyLicense(params: {
  owner: SupportOwnerContext;
  searchSerialOrDevice?: string;
}): Promise<LicenseLookupResult> {
  const { owner } = params;
  if (owner.ownerType === "guest") {
    return {
      authenticated: false,
      ownerType: "guest",
      message:
        "Anh/chị hiện chưa đăng nhập. Để tra cứu trạng thái mã kích hoạt hoặc lô tem thuộc sở hữu của mình, vui lòng đăng nhập tại trang Tài khoản (/login).",
    };
  }

  const { data: db } = await readDB();
  const targetAccountId =
    owner.ownerType === "dealer"
      ? owner.dealerId || owner.ownerId
      : owner.ownerId;

  const customerAcc = db.customers.find((c: any) => c.id === targetAccountId);
  const dealerRec =
    owner.ownerType === "dealer" ? db.dealerById(targetAccountId) : undefined;

  // 1. Digital licenses strictly belonging to targetAccountId
  const myDigitalLicenses =
    owner.ownerType === "admin"
      ? []
      : db.licensesByCustomerId(targetAccountId);

  const searchClean = (params.searchSerialOrDevice || "").trim().toLowerCase();
  const filteredDigital = searchClean
    ? myDigitalLicenses.filter(
        (l: any) =>
          (l.deviceName || "").toLowerCase().includes(searchClean) ||
          safeMaskDigitalKey(l.keyEncrypted).toLowerCase().includes(searchClean)
      )
    : myDigitalLicenses;

  const digitalSummary = {
    total: myDigitalLicenses.length,
    active: myDigitalLicenses.filter((l: any) => l.status === "active").length,
    issued: myDigitalLicenses.filter((l: any) => l.status === "issued").length,
    revoked: myDigitalLicenses.filter((l: any) => l.status === "revoked").length,
    sampleItems: filteredDigital.slice(0, 5).map((l: any) => ({
      keyMasked: safeMaskDigitalKey(l.keyEncrypted),
      status: l.status,
      deviceName: l.deviceName,
      activatedAt: l.activatedAt,
    })),
  };

  // 2. Physical scratch stickers strictly belonging to this owner (isAdmin ALWAYS false here unless admin explicitly inspects own none)
  let stickersSummary: LicenseLookupResult["physicalStickersSummary"] = {
    total: 0,
    inStock: 0,
    activated: 0,
    sampleItems: [],
  };

  if (owner.ownerType === "dealer" || owner.ownerType === "customer") {
    const stickerRes = await getDealerStickers(
      {
        id: targetAccountId,
        name: customerAcc?.name || dealerRec?.name || owner.customerName,
        companyName: customerAcc?.companyName || dealerRec?.shortName,
        email: customerAcc?.email || owner.customerEmail,
        phone: customerAcc?.phone || dealerRec?.contact || owner.customerPhone,
        mst: customerAcc?.mst || customerAcc?.taxCode || dealerRec?.mst,
        isAdmin: false, // Hard lock: never match all partners!
      },
      undefined,
      {
        search: searchClean || undefined,
        page: 1,
        pageSize: 5,
      }
    );

    stickersSummary = {
      total: stickerRes.stats.total,
      inStock: stickerRes.stats.inStock,
      activated: stickerRes.stats.activated,
      sampleItems: stickerRes.items.map((item: any) => ({
        seri: item.seri,
        codeMasked: item.codeMasked,
        status: item.status,
        deviceName: item.deviceName,
        activatedAt: item.activatedAt,
      })),
    };
  }

  const accountLabel =
    customerAcc?.companyName ||
    dealerRec?.name ||
    customerAcc?.name ||
    owner.customerName ||
    targetAccountId;

  return {
    authenticated: true,
    ownerType: owner.ownerType,
    accountLabel,
    digitalLicensesSummary: digitalSummary,
    physicalStickersSummary: stickersSummary,
    message: `Đã tra cứu dữ liệu thuộc tài khoản ${accountLabel}: ${digitalSummary.total} mã điện tử (${digitalSummary.active} đang kích hoạt) và ${stickersSummary.total} tem vật lý (${stickersSummary.activated} đã kích hoạt, ${stickersSummary.inStock} còn trong kho). Toàn bộ mã chi tiết đều được ẩn bảo mật.`,
  };
}

/**
 * Tool 3: get_support_contact
 * Approved Mercy Tech support hours & phone numbers (Zero external messaging shortlinks per Workspace Rule 2.5).
 */
export async function toolGetSupportContact() {
  const settings = await getBotSettings();
  const normalizedZalo = (settings.hotlineZalo || "0763 068 614")
    .replace(/\./g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const normalizedTech = (settings.hotlineTech || "0862 497 002")
    .replace(/\./g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    zaloPhone: normalizedZalo || "0763 068 614",
    zaloAccountName: "Mercy Tech Global",
    techPhone: normalizedTech || "0862 497 002",
    supportHours: settings.supportHours || "08:00 – 17:30 (Thứ 2 – Thứ 7)",
  };
}

/**
 * Tool 4: create_support_ticket
 * Server-validated, idempotent ticket creation.
 */
export async function toolCreateSupportTicket(params: {
  owner: SupportOwnerContext;
  idempotencyKey: string;
  conversationId?: string;
  customerName?: string;
  contactChannel: "phone_zalo" | "email";
  contactValue: string;
  issueDescription: string;
  product?: SupportProduct;
  edition?: SupportEdition;
  os?: SupportOS;
  version?: string;
  ultraViewerId?: string;
  ultraViewerPass?: string;
  externalNotifyConsent?: boolean;
  correlationId: string;
}) {
  const { ticket, createdNew } = await createSupportTicketIdempotent(
    params.owner,
    params
  );

  if (createdNew && params.externalNotifyConsent !== false) {
    await sendTelegramHandoffAlert({
      ticketId: ticket.id,
      customerName: ticket.customerName,
      phoneOrZalo: `${ticket.contactChannel === "email" ? "Email: " : ""}${ticket.contactValue}`,
      softwareEdition: `${ticket.product} (${ticket.os})`,
      issueDescription: ticket.issueDescription,
      ultraViewerId: ticket.ultraViewerId,
      ultraViewerPass: ticket.ultraViewerPass,
      priority: ticket.priority,
      attachmentCount: ticket.attachmentIds.length,
    }).catch(() => {});
  }

  const settings = await getBotSettings();
  return {
    ticket,
    createdNew,
    supportHours: settings.supportHours || "08:00 – 17:30 (Thứ 2 – Thứ 7)",
  };
}
