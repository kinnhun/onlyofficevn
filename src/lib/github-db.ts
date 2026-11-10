// GitHub Database Adapter — Multi-file layout
// Reads/writes separate JSON files on GitHub repo:
//   accounts.json       → customers + dealers
//   licenses.json       → license keys
//   activation_logs.json → activation/verify/reject logs

import * as fs from "node:fs";
import * as path from "node:path";
import { getRetailPrice, getDealerPrice } from "./pricing-config";

// ─── Customer ───
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  password: string; // hashed
  role: "customer" | "dealer" | "admin"; // "customer" (End User) | "dealer" (Đại lý) | "admin" (Quản trị)
  createdAt: string;
  isBanned?: boolean;
  isHidden?: boolean;
  bannedAt?: string | null;
  hiddenAt?: string | null;
  leadSource?: "ADS" | "OUTBOUND" | "REFERRAL" | string;
  assignedSale?: string;
  installerStaff?: string;
  address?: string;
  city?: string;
  province?: string;
  mst?: string;
  taxCode?: string;
}

// ─── Tiered Pricing Helper ───
// Delegates to centralized pricing config (auto-transitions at 03/08/2026)
export function calculateUnitPrice(count: number, role?: string): number {
  if (role === "dealer") return getDealerPrice(count);
  return getRetailPrice(count);
}

// ─── Note Entry ───
export interface NoteEntry {
  id: string;
  content: string;
  authorName?: string;
  createdAt: string;
}

// ─── License ───
export interface License {
  id: string;
  keyEncrypted: string;
  keyHash: string;
  customerId: string;
  status: "issued" | "active" | "revoked";
  price: number; // Unit price in VND (399000, 299000, 249000)
  deviceFingerprintHash: string | null;
  deviceName: string | null;
  activatedAt: string | null;
  lastVerifiedAt: string | null;
  createdAt: string;
  revokedAt: string | null;
  note?: string;
  notes?: NoteEntry[];
  isPaid?: boolean; // true: Đã thanh toán (mặc định) | false: Chưa thanh toán
  lastDeviceFingerprintHash?: string | null;
  lastDeviceName?: string | null;
  lastActivatedAt?: string | null;
}

// ─── Activation Log ───
export interface ActivationLog {
  id: string;
  licenseId: string;
  deviceFingerprintHash: string;
  deviceName: string;
  action: "activate" | "verify" | "reject" | "revoke" | "create-account" | "sync-key" | "generate-key" | "generate-doc" | "demo-activate";
  result: "success" | "failed";
  reason: string | null;
  ipAddress: string | null;
  createdAt: string;
}

// ─── Dealer ───
export interface DealerRecord {
  id: string;
  name: string;
  shortName: string;
  mst: string;
  contact: string;
  totalKeys: number;
  createdAt: string;
}

// ─── File schemas ───
export interface AccountsFile {
  customers: Customer[];
  dealers: DealerRecord[];
}

export interface LicensesFile {
  licenses: License[];
}

export interface ActivationLogsFile {
  logs: ActivationLog[];
}

// ─── Physical Sticker (Tem Cào Hologram Vật Lý) ───
export interface PhysicalStickerSoldTo {
  partnerType: "dealer" | "customer";
  partnerId: string;
  partnerName: string;
  partnerPhone?: string;
  partnerTaxCode?: string;
  orderRef?: string;
  soldAt: string;
  unitPrice: number;
  assignedBy?: string;
  note?: string;
  paymentStatus?: "paid" | "debt" | "deposit";
  deliveryMethod?: "handover" | "delivery" | "digital";
}

export interface PhysicalStickerActivation {
  activatedAt: string;
  deviceName: string;
  deviceFingerprintHash: string;
  rawUuid?: string | null;
  lastVerifiedAt: string;
  ipAddress?: string;
  resetCount?: number;
  lastResetAt?: string;
}

export interface PhysicalSticker {
  id: string; // e.g. "stk_00001"
  seri: string; // e.g. "MT-0319227767-00001"
  code: string; // e.g. "7800-4173-9386"
  keyHash: string; // SHA-256("${seri}-${code}")
  batchName: string; // e.g. "Đợt in Offset 5109 Tem"
  status: "in_stock" | "assigned" | "activated" | "revoked";
  soldTo?: PhysicalStickerSoldTo | null;
  activation?: PhysicalStickerActivation | null;
  createdAt: string;
  updatedAt: string;
  note?: string;
  notes?: NoteEntry[];
  lastDeviceFingerprintHash?: string | null;
  lastDeviceName?: string | null;
  lastActivatedAt?: string | null;
  revokedAt?: string | null;
}

export interface PhysicalStickersFile {
  stickers: PhysicalSticker[];
}

// ─── Staff & Employee ───
export interface StaffRecord {
  id: string;
  username: string; // e.g. bichphuong1204, chaulinh, kien_tech
  name: string;
  role: "admin" | "sales_leader" | "sales" | "technician" | "tech_leader" | "ctv" | string;
  title?: string; // "Trưởng nhóm kinh doanh (Sales Closer)", "Kỹ thuật viên"
  email?: string;
  phone?: string;
  cccd?: string;
  cccdDate?: string;
  cccdPlace?: string;
  dob?: string;
  address?: string;
  bankName?: string;
  bankAccount?: string;
  managedBy?: string; // ID or username of manager (admin or sales_leader)
  level?: number; // 1: Thử việc, 2: Chính thức, 3: Leader, 4: Trưởng phòng, 5: CCO
  baseSalary?: number; // 5000000 (probation: 4250000)
  probationSalary?: number; // 4250000
  salesCommissionRate?: number; // 0.05
  outboundCommissionRate?: number; // 0.10
  techCommissionRate?: number; // 0.05 or 0.15
  overrideCommissionRate?: number; // 0.01 or 0.02
  joinedDate?: string; // "2026-08-14"
  status?: "active" | "inactive";
  notes?: string;
}

// ─── Staff Contract Draft ───
export interface StaffContractDraft {
  id: string;
  contractType: "probation_sales" | "official_sales" | "appointment_decision" | "tech_agreement" | "ctv_agreement" | "probation" | "official" | "technical" | "ctv" | string;
  docNumber?: string;
  contractNumber?: string;
  title?: string;
  staffId: string;
  staffName: string;
  staffRole?: "admin" | "sales_leader" | "sales" | "technician" | "tech_leader" | "ctv" | string;
  staffCccd?: string;
  staffPhone?: string;
  staffAddress?: string;
  salaryRate?: string;
  signedDate?: string;
  status?: "active" | "draft" | "signed" | "expired" | string;
  includeStamp?: boolean;
  data: any;
  createdAt?: string;
}

// ─── Combined view (for backward-compat) ───
export interface Database {
  customers: Customer[];
  licenses: License[];
  activationLogs: ActivationLog[];
  dealers: DealerRecord[];
}

// ─── Indexed Database ───
// Wraps raw data with O(1) Map-based lookup indexes.
// All arrays stay mutable — after mutations, call .rebuild() before writing.
export class IndexedDatabase implements Database {
  customers: Customer[];
  licenses: License[];
  activationLogs: ActivationLog[];
  dealers: DealerRecord[];

  // ── Indexes (rebuilt on load and on demand) ──
  private _customerById = new Map<string, Customer>();
  private _customerByEmail = new Map<string, Customer>();
  private _customersByRole = new Map<"customer" | "dealer" | "admin", Customer[]>();
  private _licenseById = new Map<string, License>();
  private _licenseByKeyHash = new Map<string, License>();
  private _licensesByCustomerId = new Map<string, License[]>();
  private _logsByLicenseId = new Map<string, ActivationLog[]>();
  private _dealerById = new Map<string, DealerRecord>();

  constructor(raw: Database) {
    this.customers = raw.customers;
    this.licenses = raw.licenses;
    this.activationLogs = raw.activationLogs;
    this.dealers = raw.dealers;
    this.rebuild();
  }

  /** Rebuild all indexes from current arrays. Call after push/splice. */
  rebuild() {
    // Customers & Role Indexing
    this._customerById.clear();
    this._customerByEmail.clear();
    this._customersByRole.clear();
    this._customersByRole.set("customer", []);
    this._customersByRole.set("dealer", []);
    this._customersByRole.set("admin", []);

    for (const c of this.customers) {
      if (!c.role) {
        c.role = "customer"; // Default fallback
      }
      this._customerById.set(c.id, c);
      this._customerByEmail.set(c.email.toLowerCase().trim(), c);

      const roleList = this._customersByRole.get(c.role) || [];
      roleList.push(c);
      this._customersByRole.set(c.role, roleList);
    }

    // Licenses
    this._licenseById.clear();
    this._licenseByKeyHash.clear();
    this._licensesByCustomerId.clear();
    for (const l of this.licenses) {
      if (l.price === undefined || l.price === null) {
        l.price = 399000; // Default tier price
      }
      if (l.isPaid === undefined) {
        l.isPaid = true; // Default to paid for legacy licenses
      }
      this._licenseById.set(l.id, l);
      this._licenseByKeyHash.set(l.keyHash, l);
      const arr = this._licensesByCustomerId.get(l.customerId) || [];
      arr.push(l);
      this._licensesByCustomerId.set(l.customerId, arr);
    }

    // Logs
    this._logsByLicenseId.clear();
    for (const log of this.activationLogs) {
      const arr = this._logsByLicenseId.get(log.licenseId) || [];
      arr.push(log);
      this._logsByLicenseId.set(log.licenseId, arr);
    }

    // Dealers
    this._dealerById.clear();
    for (const d of this.dealers) {
      this._dealerById.set(d.id, d);
    }
  }

  // ── O(1) lookups ──

  /** Find customer by id — O(1) */
  customerById(id: string): Customer | undefined {
    return this._customerById.get(id);
  }

  /** Find customer by email — O(1) */
  customerByEmail(email: string): Customer | undefined {
    return this._customerByEmail.get(email.toLowerCase().trim());
  }

  /** Get all customers by role ("customer" | "dealer") — O(1) */
  customersByRole(role: "customer" | "dealer"): Customer[] {
    return this._customersByRole.get(role) || [];
  }

  /**
   * Indexed & filtered search across customers
   * Filter by role ("all" | "customer" | "dealer") and text query across name, email, phone, companyName, customerId, or License Keys
   */
  searchCustomers(query?: string, roleFilter?: string): Customer[] {
    let source = this.customers;
    if (roleFilter === "customer" || roleFilter === "dealer") {
      source = this._customersByRole.get(roleFilter) || [];
    }

    if (!query || !query.trim()) {
      return source;
    }

    const q = query.toLowerCase().trim();
    const qClean = q.replace(/[^a-z0-9]/g, "");

    // Find customer IDs matching license key search or key decoding
    const matchingCustomerIdsFromLicenses = new Set<string>();
    if (qClean.length >= 3) {
      this.licenses.forEach((l) => {
        const keyClean = l.keyEncrypted.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (keyClean.includes(qClean) || l.id.toLowerCase().includes(q)) {
          matchingCustomerIdsFromLicenses.add(l.customerId);
        }
      });
    }

    return source.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone && c.phone.includes(q)) ||
        (c.companyName && c.companyName.toLowerCase().includes(q)) ||
        c.id.toLowerCase().includes(q) ||
        matchingCustomerIdsFromLicenses.has(c.id)
    );
  }

  /** Find license by id — O(1) */
  licenseById(id: string): License | undefined {
    return this._licenseById.get(id);
  }

  /** Find license by keyHash — O(1) */
  licenseByKeyHash(keyHash: string): License | undefined {
    return this._licenseByKeyHash.get(keyHash);
  }

  /** Get all licenses for a customer — O(1) */
  licensesByCustomerId(customerId: string): License[] {
    return this._licensesByCustomerId.get(customerId) || [];
  }

  /** Get all logs for a license — O(1) */
  logsByLicenseId(licenseId: string): ActivationLog[] {
    return this._logsByLicenseId.get(licenseId) || [];
  }

  /** Find dealer by id — O(1) */
  dealerById(id: string): DealerRecord | undefined {
    return this._dealerById.get(id);
  }
}

// ─── Local Database Directory Config ───
export function getLocalDbDir(): string {
  const envDir = process.env.LOCAL_DB_DIR || "";
  if (envDir && fs.existsSync(envDir)) {
    return envDir;
  }
  return envDir || "d:\\mercy\\database local";
}

export function isLocalMode(): boolean {
  // If explicitly set to github or remote, never use local
  if (process.env.DB_STORAGE_MODE === "github" || process.env.DB_STORAGE_MODE === "remote") {
    return false;
  }
  // If explicitly set to local, verify that local directory actually exists on this machine
  if (process.env.DB_STORAGE_MODE === "local") {
    const localDir = process.env.LOCAL_DB_DIR || "d:\\mercy\\database local";
    return Boolean(fs.existsSync(localDir));
  }
  // Otherwise, only use local mode if LOCAL_DB_DIR is explicitly configured and not commented out
  return Boolean(process.env.LOCAL_DB_DIR && fs.existsSync(process.env.LOCAL_DB_DIR));
}

// ─── GitHub API Config ───
export function getGithubToken(): string {
  return process.env.GITHUB_TOKEN || process.env.GH_DB_TOKEN || "";
}

export function getGithubOwner(): string {
  return process.env.GITHUB_OWNER || "kinnhun";
}

export function getGithubRepo(): string {
  return process.env.GITHUB_REPO || "database-onlyoffice-mercy";
}

const DB_FILES = {
  accounts: "accounts.json",
  licenses: "licenses.json",
  activationLogs: "activation_logs.json",
  drafts: "drafts.json",
  staff: "staff.json",
  staffContracts: "staff_contracts.json",
  stickers: "physical_stickers.json",
} as const;

function apiUrl(filePath: string) {
  return `https://api.github.com/repos/${getGithubOwner()}/${getGithubRepo()}/contents/${filePath}`;
}

function getHeaders() {
  const token = getGithubToken();
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

// ─── High-Performance Memory Cache for Disk & Remote Files ───
type FileCacheEntry<T> = {
  data: T;
  sha: string;
  mtimeMs: number;
};

const fileMemoryCache = new Map<string, FileCacheEntry<any>>();

export function invalidateFileMemoryCache(filePath?: string) {
  if (filePath) {
    fileMemoryCache.delete(filePath);
  } else {
    fileMemoryCache.clear();
  }
}

// ─── Generic read (Supports GitHub Web Database & Local Database) ───
async function readFile<T>(filePath: string, defaultFallback: T): Promise<{ data: T; sha: string }> {
  // 1. If in Local Mode, read from local disk
  if (isLocalMode()) {
    const localDir = getLocalDbDir();
    const localFilePath = path.join(localDir, filePath);

    if (fs.existsSync(localFilePath)) {
      try {
        const stat = fs.statSync(localFilePath);
        const cached = fileMemoryCache.get(localFilePath);
        if (cached && cached.mtimeMs === stat.mtimeMs) {
          return { data: cached.data as T, sha: cached.sha };
        }

        const content = fs.readFileSync(localFilePath, "utf-8");
        const parsed = JSON.parse(content);
        const sha = `local-${stat.mtimeMs}`;
        fileMemoryCache.set(localFilePath, { data: parsed, sha, mtimeMs: stat.mtimeMs });
        return { data: parsed, sha };
      } catch (err: any) {
        console.warn(`[db] Local read error (${localFilePath}):`, err.message);
      }
    }
    return { data: defaultFallback, sha: "default" };
  }

  // 2. Web / GitHub Remote Mode: Read directly from GitHub API
  const token = getGithubToken();
  if (token) {
    try {
      const url = `${apiUrl(filePath)}?t=${Date.now()}`;
      let res = await fetch(url, {
        headers: getHeaders(),
        cache: "no-store",
      });

      if (res.status === 401 && token !== BACKUP_GITHUB_TOKEN) {
        console.warn(`[github-db] Token 401 on ${filePath}, retrying with backup token...`);
        res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${BACKUP_GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });
      }

      if (res.status === 404) {
        return { data: defaultFallback, sha: "" };
      }

      if (res.ok) {
        const json = await res.json();
        let contentStr = "";
        if (json.content) {
          contentStr = Buffer.from(json.content, "base64").toString("utf-8");
        } else if (json.download_url) {
          // For files > 1MB, GitHub Contents API omits content property. Fetch via download_url.
          const rawRes = await fetch(json.download_url, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          });
          contentStr = await rawRes.text();
        }
        const parsed = contentStr ? JSON.parse(contentStr) : defaultFallback;
        return { data: parsed, sha: json.sha || "" };
      }
    } catch (err: any) {
      console.error(`[github-db] GitHub read error (${filePath}):`, err.message);
    }
  }

  return { data: defaultFallback, sha: "default" };
}

// ─── Generic write (Writes to GitHub Web Database or Local Disk, with 409-conflict retry) ───
async function writeFile<T>(
  filePath: string,
  data: T,
  sha: string,
  options?: { noRetryOnConflict?: boolean }
): Promise<string> {
  const isLargeDb = filePath.includes("logs") || filePath.includes("licenses");
  const jsonString = isLargeDb ? JSON.stringify(data) : JSON.stringify(data, null, 2);

  // 1. If in Local Mode: Write directly to local file
  if (isLocalMode()) {
    const localDir = getLocalDbDir();
    const localFilePath = path.join(localDir, filePath);
    try {
      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true });
      }
      fs.writeFileSync(localFilePath, jsonString, "utf-8");
    } catch (err: any) {
      console.error(`[db] Failed to write local file ${localFilePath}:`, err.message);
    }

    const localSha = `local-${Date.now()}`;
    fileMemoryCache.set(localFilePath, { data, sha: localSha, mtimeMs: Date.now() });

    // Non-blocking async background sync to GitHub if token present
    const writeToken = getGithubToken();
    if (writeToken) {
      (async () => {
        try {
          const content = Buffer.from(jsonString).toString("base64");
          let currentSha = (sha && !sha.startsWith("local-")) ? sha : undefined;
          if (!currentSha) {
            try {
              const check = await fetch(apiUrl(filePath), { headers: getHeaders() });
              if (check.ok) {
                const checkData = await check.json();
                currentSha = checkData.sha;
              }
            } catch { }
          }
          await fetch(apiUrl(filePath), {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({
              message: `[mercy] Sync ${filePath} - ${new Date().toISOString()}`,
              content,
              ...(currentSha ? { sha: currentSha } : {}),
            }),
          });
        } catch (err: any) {
          console.warn(`[github-db] Background GitHub sync skipped (${filePath}):`, err.message);
        }
      })();
    }

    return localSha;
  }

  // 2. Web / Remote Mode: Write to GitHub API (with 409-conflict retry)
  const remoteToken = getGithubToken();
  if (remoteToken) {
    const content = Buffer.from(jsonString).toString("base64");
    const MAX_RETRIES = 3;
    let currentSha = (sha && !sha.startsWith("local-") && sha !== "default") ? sha : undefined;

    // Auto-fetch current SHA if missing or empty to prevent HTTP 422 ("sha" wasn't supplied)
    if (!currentSha || currentSha === "") {
      try {
        const checkRes = await fetch(`${apiUrl(filePath)}?t=${Date.now()}`, {
          headers: getHeaders(),
          cache: "no-store",
        });
        if (checkRes.ok) {
          const checkJson = await checkRes.json();
          if (checkJson.sha) {
            currentSha = checkJson.sha;
          }
        }
      } catch { }
    }

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        let res = await fetch(apiUrl(filePath), {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({
            message: `[mercy] Update ${filePath} - ${new Date().toISOString()}`,
            content,
            ...(currentSha ? { sha: currentSha } : {}),
          }),
        });

        if (res.status === 401 && getGithubToken() !== BACKUP_GITHUB_TOKEN) {
          res = await fetch(apiUrl(filePath), {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${BACKUP_GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `[mercy] Update ${filePath} - ${new Date().toISOString()}`,
              content,
              ...(currentSha ? { sha: currentSha } : {}),
            }),
          });
        }

        if (res.ok) {
          const resJson = await res.json();
          return resJson.content?.sha || `gh-${Date.now()}`;
        }

        if (res.status === 409) {
          if (options?.noRetryOnConflict) {
            throw new Error(`CONFLICT_409: ${filePath}`);
          }
          if (attempt < MAX_RETRIES - 1) {
            console.warn(`[github-db] SHA conflict on ${filePath}, retrying (${attempt + 1}/${MAX_RETRIES})...`);
            const fresh = await readFile<T>(filePath, data);
            currentSha = fresh.sha;
            continue;
          }
        }

        const errText = await res.text();
        console.error(`[github-db] GitHub write error (${filePath}): ${res.status}. ${errText.substring(0, 200)}`);
        throw new Error(`GitHub API write ${res.status}: ${filePath}`);
      } catch (err: any) {
        if (options?.noRetryOnConflict && err?.message?.includes("CONFLICT_409")) {
          throw err;
        }
        if (attempt === MAX_RETRIES - 1) {
          console.error(`[github-db] Write failed after ${MAX_RETRIES} retries (${filePath}): ${err.message}`);
          throw err;
        }
      }
    }
  }

  return `saved-${Date.now()}`;
}

// ─── Per-file read/write ───
export async function readAccounts() {
  return readFile<AccountsFile>(DB_FILES.accounts, { customers: [], dealers: [] });
}

export async function writeAccounts(data: AccountsFile, sha: string) {
  invalidateDBCache();
  return writeFile(DB_FILES.accounts, data, sha);
}

export async function readLicenses() {
  return readFile<LicensesFile>(DB_FILES.licenses, { licenses: [] });
}

export async function writeLicenses(
  data: LicensesFile,
  sha: string,
  options?: { noRetryOnConflict?: boolean }
) {
  invalidateDBCache();
  return writeFile(DB_FILES.licenses, data, sha, options);
}

export async function readActivationLogs() {
  return readFile<ActivationLogsFile>(DB_FILES.activationLogs, { logs: [] });
}

export async function writeActivationLogs(
  data: ActivationLogsFile,
  sha: string,
  options?: { noRetryOnConflict?: boolean }
) {
  invalidateDBCache();
  // Prune to the latest 1500 logs to permanently keep activation_logs.json under GitHub's 1MB API limit
  if (data && Array.isArray(data.logs) && data.logs.length > 1500) {
    data.logs = data.logs.slice(-1500);
  }
  return writeFile(DB_FILES.activationLogs, data, sha, options);
}

// ─── Combined read (loads all 3 files → returns IndexedDatabase) ───
// ─── Short TTL In-Memory DB Cache ───
let _dbCache: {
  data: IndexedDatabase;
  shas: { accounts: string; licenses: string; activationLogs: string };
  timestamp: number;
} | null = null;

const CACHE_TTL_MS = 1000; // 1-second RAM cache when using local DB for instant updates

export function invalidateDBCache() {
  _dbCache = null;
}

export async function readDB(): Promise<{
  data: IndexedDatabase;
  shas: { accounts: string; licenses: string; activationLogs: string };
}> {
  const now = Date.now();
  if (_dbCache && now - _dbCache.timestamp < CACHE_TTL_MS) {
    return {
      data: _dbCache.data,
      shas: _dbCache.shas,
    };
  }

  const [acc, lic, log] = await Promise.all([
    readAccounts(),
    readLicenses(),
    readActivationLogs(),
  ]);

  const data = new IndexedDatabase({
    customers: acc.data.customers,
    dealers: acc.data.dealers,
    licenses: lic.data.licenses,
    activationLogs: log.data.logs,
  });

  const result = {
    data,
    shas: {
      accounts: acc.sha,
      licenses: lic.sha,
      activationLogs: log.sha,
    },
  };

  _dbCache = { ...result, timestamp: now };
  return result;
}

// ─── Combined write (writes only the files that changed) ───
export async function writeDB(
  data: Database,
  shas: { accounts: string; licenses: string; activationLogs: string },
  changed: { accounts?: boolean; licenses?: boolean; activationLogs?: boolean } = {
    accounts: true,
    licenses: true,
    activationLogs: true,
  },
  options?: { noRetryOnConflict?: boolean }
) {
  invalidateDBCache();

  if (changed.accounts) {
    await writeAccounts(
      { customers: data.customers, dealers: data.dealers },
      shas.accounts
    );
  }
  if (changed.licenses) {
    await writeLicenses({ licenses: data.licenses }, shas.licenses, options);
  }
  if (changed.activationLogs) {
    await writeActivationLogs({ logs: data.activationLogs }, shas.activationLogs, options);
  }
}

// ─── In-Memory Mutex for Concurrency ───
let _lock: Promise<void> = Promise.resolve();

export async function withLock<T>(fn: () => Promise<T>): Promise<T> {
  let release: () => void;
  const next = new Promise<void>((resolve) => {
    release = resolve;
  });
  const prev = _lock;
  _lock = next;
  await prev;
  try {
    return await fn();
  } finally {
    release!();
  }
}

// ─── Drafts Read/Write with High-Performance In-Memory Cache ───
let _draftsCache: { data: any[]; sha: string; timestamp: number } | null = null;
const DRAFTS_CACHE_TTL_MS = 60000; // 60-second RAM cache

export function invalidateDraftsCache() {
  _draftsCache = null;
}

export async function readDrafts(): Promise<{ data: any[]; sha: string }> {
  const now = Date.now();
  if (_draftsCache && now - _draftsCache.timestamp < DRAFTS_CACHE_TTL_MS) {
    return { data: _draftsCache.data, sha: _draftsCache.sha };
  }
  const result = await readFile<any[]>(DB_FILES.drafts, []);
  _draftsCache = { data: result.data, sha: result.sha, timestamp: now };
  return result;
}

export async function writeDrafts(data: any[], sha: string) {
  invalidateDraftsCache();
  const newSha = await writeFile(DB_FILES.drafts, data, sha);
  _draftsCache = { data, sha: newSha, timestamp: Date.now() };
  return newSha;
}

// ─── Default Staff Seed Data ───
export const DEFAULT_STAFF_DATA: StaffRecord[] = [
  {
    id: "staff_bp_01",
    username: "bichphuong1204",
    name: "Nguyễn Thị Bích Phương",
    role: "sales_leader",
    title: "Trưởng nhóm kinh doanh (Sales Closer)",
    email: "bichphuong@mercytech.vn",
    phone: "0989820448",
    cccd: "034198000001",
    dob: "12/04/1998",
    address: "Hà Nội / TP.HCM",
    managedBy: "admin",
    level: 1,
    baseSalary: 5000000,
    probationSalary: 4250000,
    salesCommissionRate: 0.05,
    outboundCommissionRate: 0.10,
    techCommissionRate: 0.05,
    overrideCommissionRate: 0.01,
    joinedDate: "2026-08-14",
    status: "active",
  },
  {
    id: "staff_cl_02",
    username: "chaulinh",
    name: "Châu Thị Nhật Linh",
    role: "sales_leader",
    title: "Trưởng nhóm kinh doanh (Sales Closer)",
    email: "chaulinh@mercytech.vn",
    phone: "0976123456",
    cccd: "079199000002",
    dob: "15/08/1999",
    address: "TP. Hồ Chí Minh",
    managedBy: "admin",
    level: 1,
    baseSalary: 5000000,
    probationSalary: 4250000,
    salesCommissionRate: 0.05,
    outboundCommissionRate: 0.10,
    techCommissionRate: 0.05,
    overrideCommissionRate: 0.01,
    joinedDate: "2026-08-14",
    status: "active",
  },
  {
    id: "staff_kien_03",
    username: "kien_tech",
    name: "Trần Trung Kiên",
    role: "technician",
    title: "Kỹ thuật viên chuyên trách",
    email: "kien@mercytech.vn",
    phone: "0908332662",
    address: "TP. Hồ Chí Minh",
    managedBy: "admin",
    baseSalary: 0,
    techCommissionRate: 0.15,
    joinedDate: "2026-08-01",
    status: "active",
  }
];

// ─── Default Staff Contracts Seed Data ───
export const DEFAULT_STAFF_CONTRACTS: StaffContractDraft[] = [
  {
    id: "contract_bp_01",
    createdAt: "2026-08-14T08:00:00.000Z",
    contractType: "probation",
    contractNumber: "HĐTV-2026/01-MERCY",
    staffId: "staff_bp_01",
    staffName: "Nguyễn Thị Bích Phương",
    data: {
      contractNumber: "HĐTV-2026/01-MERCY",
      dateStr: "14/08/2026",
      employeeName: "Nguyễn Thị Bích Phương",
      employeeDob: "12/04/1998",
      employeeCccd: "034198000001",
      employeeAddress: "Hà Nội / TP.HCM",
      employeePhone: "0989820448",
      employeePosition: "Nhân viên kinh doanh (Sales Closer)",
      probationDuration: "02 (hai) tháng",
      startDateStr: "14/08/2026",
      endDateStr: "14/10/2026",
      probationSalary: 4250000,
      officialSalary: 5000000,
      salesCommissionPercent: 5,
      outboundCommissionPercent: 10,
      kpiTargetDeals: 2,
      kpiTargetRevenue: 14900000,
      includeStamp: true,
    }
  },
  {
    id: "contract_cl_02",
    createdAt: "2026-08-14T08:00:00.000Z",
    contractType: "probation",
    contractNumber: "HĐTV-2026/02-MERCY",
    staffId: "staff_cl_02",
    staffName: "Châu Thị Nhật Linh",
    data: {
      contractNumber: "HĐTV-2026/02-MERCY",
      dateStr: "14/08/2026",
      employeeName: "Châu Thị Nhật Linh",
      employeeDob: "15/08/1999",
      employeeCccd: "079199000002",
      employeeAddress: "TP. Hồ Chí Minh",
      employeePhone: "0976123456",
      employeePosition: "Nhân viên kinh doanh (Sales Closer)",
      probationDuration: "02 (hai) tháng",
      startDateStr: "14/08/2026",
      endDateStr: "14/10/2026",
      probationSalary: 4250000,
      officialSalary: 5000000,
      salesCommissionPercent: 5,
      outboundCommissionPercent: 10,
      kpiTargetDeals: 2,
      kpiTargetRevenue: 14900000,
      includeStamp: true,
    }
  },
  {
    id: "contract_kien_03",
    createdAt: "2026-08-14T08:00:00.000Z",
    contractType: "technical",
    contractNumber: "TTKT-2026/01-MERCY",
    staffId: "staff_kien_03",
    staffName: "Trần Trung Kiên",
    data: {
      contractNumber: "TTKT-2026/01-MERCY",
      dateStr: "14/08/2026",
      technicianName: "Trần Trung Kiên",
      technicianPhone: "0908332662",
      commissionPercent: 15,
      includeStamp: true,
    }
  }
];

// ─── Staff Read/Write with In-Memory Cache ───
let _staffCache: { data: StaffRecord[]; sha: string; timestamp: number } | null = null;

export function invalidateStaffCache() {
  _staffCache = null;
}

export async function readStaff(): Promise<{ data: StaffRecord[]; sha: string }> {
  const now = Date.now();
  if (_staffCache && now - _staffCache.timestamp < DRAFTS_CACHE_TTL_MS) {
    return { data: _staffCache.data, sha: _staffCache.sha };
  }
  const result = await readFile<StaffRecord[]>(DB_FILES.staff, DEFAULT_STAFF_DATA);
  const data = (result.data && result.data.length > 0) ? result.data : DEFAULT_STAFF_DATA;
  _staffCache = { data, sha: result.sha, timestamp: now };
  return { data, sha: result.sha };
}

export async function writeStaff(data: StaffRecord[], sha: string) {
  invalidateStaffCache();
  const newSha = await writeFile(DB_FILES.staff, data, sha);
  _staffCache = { data, sha: newSha, timestamp: Date.now() };
  return newSha;
}

// ─── Staff Contracts Read/Write with In-Memory Cache ───
let _staffContractsCache: { data: StaffContractDraft[]; sha: string; timestamp: number } | null = null;

export function invalidateStaffContractsCache() {
  _staffContractsCache = null;
}

export async function readStaffContracts(): Promise<{ data: StaffContractDraft[]; sha: string }> {
  const now = Date.now();
  if (_staffContractsCache && now - _staffContractsCache.timestamp < DRAFTS_CACHE_TTL_MS) {
    return { data: _staffContractsCache.data, sha: _staffContractsCache.sha };
  }
  const result = await readFile<StaffContractDraft[]>(DB_FILES.staffContracts, DEFAULT_STAFF_CONTRACTS);
  const data = (result.data && result.data.length > 0) ? result.data : DEFAULT_STAFF_CONTRACTS;
  _staffContractsCache = { data, sha: result.sha, timestamp: now };
  return { data, sha: result.sha };
}

export async function writeStaffContracts(data: StaffContractDraft[], sha: string) {
  invalidateStaffContractsCache();
  const newSha = await writeFile(DB_FILES.staffContracts, data, sha);
  _staffContractsCache = { data, sha: newSha, timestamp: Date.now() };
  return newSha;
}

// ─── Physical Stickers Read/Write with In-Memory Cache & Local File Fallback ───
let _stickersCache: { data: PhysicalSticker[]; sha: string; timestamp: number } | null = null;
const STICKERS_CACHE_TTL_MS = 30000; // 30-second RAM cache

export function invalidateStickersCache() {
  _stickersCache = null;
  try {
    const { invalidateStickersIndex } = require("./stickers-indexer");
    invalidateStickersIndex();
  } catch { }
}

function getLocalStickersPath(): string {
  const localDir = getLocalDbDir();
  return path.join(localDir, "physical_stickers.json");
}

function readLocalStickers(): PhysicalSticker[] | null {
  try {
    const localPath = getLocalStickersPath();
    if (fs.existsSync(localPath)) {
      const raw = fs.readFileSync(localPath, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.stickers)) return parsed.stickers;
    }
  } catch (err: any) {
    console.warn("[github-db] Read local stickers error:", err.message);
  }
  return null;
}

function writeLocalStickers(stickers: PhysicalSticker[]): void {
  try {
    const localPath = getLocalStickersPath();
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const jsonStr = JSON.stringify({ stickers }, null, 2);
    fs.writeFileSync(localPath, jsonStr, "utf-8");
  } catch (err: any) {
    console.warn("[github-db] Write local stickers error:", err.message);
  }
}

export async function readStickers(): Promise<{ data: PhysicalSticker[]; sha: string }> {
  const now = Date.now();
  if (_stickersCache && now - _stickersCache.timestamp < STICKERS_CACHE_TTL_MS) {
    return { data: _stickersCache.data, sha: _stickersCache.sha };
  }

  // 1. Try local disk first for ultra-fast instant response
  const localData = readLocalStickers();
  if (localData && localData.length > 0) {
    _stickersCache = { data: localData, sha: "local-disk", timestamp: now };
    // Non-blocking background sync with GitHub if token present
    return { data: localData, sha: "local-disk" };
  }

  // 2. Fetch from GitHub repository
  const result = await readFile<PhysicalStickersFile>(DB_FILES.stickers, { stickers: [] });
  const data = Array.isArray(result.data?.stickers) ? result.data.stickers : [];

  // Persist locally if we got data from GitHub
  if (data.length > 0) {
    writeLocalStickers(data);
  }

  _stickersCache = { data, sha: result.sha, timestamp: now };
  return { data, sha: result.sha };
}

export async function writeStickers(data: PhysicalSticker[], sha: string = ""): Promise<string> {
  invalidateStickersCache();

  // 1. Save to local disk immediately for zero latency & durability
  writeLocalStickers(data);

  // 2. Sync to GitHub repo
  let newSha = sha;
  try {
    newSha = await writeFile(DB_FILES.stickers, { stickers: data }, sha);
  } catch (err: any) {
    console.warn("[github-db] Sync stickers to GitHub skipped or failed:", err.message);
    newSha = "local-" + Date.now();
  }

  _stickersCache = { data, sha: newSha, timestamp: Date.now() };
  return newSha;
}


