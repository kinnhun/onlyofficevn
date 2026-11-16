/**
 * Client-side helpers to push GA4 events via GTM-PLDQC7LM (`window.gtag`)
 * and immediate GA4 `sendBeacon` / `fetch keepalive` delivery.
 *
 * Non-conversion `gtag("event", ...)` calls are buffered for 5,000 ms by
 * `gtm.js`, which causes events to be dropped when users click Messenger links
 * or navigate away immediately (especially on Mobile deep links / intents).
 * When GA4 session cookies (`_ga`, `_ga_*`) are present, we send the GA4 hit
 * immediately via `navigator.sendBeacon` (or `fetch(..., { keepalive: true })`)
 * and fall back to `gtag("event", ...)` only if `client_id` is not yet ready.
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-TKVMC1FRSQ";

const GA_COLLECT_ENDPOINT = "https://www.google-analytics.com/g/collect";
const GA_SESSION_COOKIE_NAME = `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, "")}`;

export type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>;

export interface TrackAnalyticsOptions {
  /** Send at 0ms via sendBeacon/keepalive when `client_id` is available (default: true). */
  immediate?: boolean;
}

let pageLoadId: number | null = null;
let hitSequence = 0;
let cachedClientId = "";
let cachedSessionId = "";
let cachedSessionNumber = "";
let sessionPrimed = false;

function getPageLoadId(): number {
  if (pageLoadId === null) {
    pageLoadId = Date.now();
  }
  return pageLoadId;
}

function readCookie(name: string): string {
  if (typeof document === "undefined" || !document.cookie) return "";
  const prefix = `${name}=`;
  const parts = document.cookie.split("; ");
  for (const part of parts) {
    if (part.startsWith(prefix)) {
      const raw = part.slice(prefix.length);
      try {
        return decodeURIComponent(raw);
      } catch {
        return raw;
      }
    }
  }
  return "";
}

function parseGaClientId(): string {
  const ga = readCookie("_ga");
  if (ga) {
    const parts = ga.split(".");
    if (parts.length >= 4) {
      return parts.slice(2).join(".");
    }
  }
  return cachedClientId;
}

function parseGaSession(): { sid: string; sct: string } {
  const raw = readCookie(GA_SESSION_COOKIE_NAME);
  if (raw.startsWith("GS2.")) {
    const body = raw.split(".").slice(2).join(".");
    let sid = "";
    let sct = "1";
    for (const token of body.split("$")) {
      if (token.startsWith("s")) sid = token.slice(1);
      else if (token.startsWith("o")) sct = token.slice(1);
    }
    if (sid) return { sid, sct };
  } else if (raw.startsWith("GS1.")) {
    const parts = raw.split(".");
    if (parts[2]) {
      return { sid: parts[2], sct: parts[3] || "1" };
    }
  }
  return {
    sid: cachedSessionId,
    sct: cachedSessionNumber || "1",
  };
}

function primeAnalyticsSession(gtag: (...args: unknown[]) => void): void {
  if (sessionPrimed) return;
  sessionPrimed = true;
  try {
    gtag("get", GA_MEASUREMENT_ID, "client_id", (val: unknown) => {
      if (typeof val === "string" && val) cachedClientId = val;
    });
    gtag("get", GA_MEASUREMENT_ID, "session_id", (val: unknown) => {
      if (typeof val === "string" && val) cachedSessionId = val;
    });
    gtag("get", GA_MEASUREMENT_ID, "session_number", (val: unknown) => {
      if (typeof val === "number" || typeof val === "string") {
        cachedSessionNumber = String(val);
      }
    });
  } catch {
    // Ignore if gtag stub doesn't resolve `get` yet
  }
}

function ensureGtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined") return null;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }
  primeAnalyticsSession(window.gtag);
  return window.gtag;
}

function sendImmediateGa4Hit(
  eventName: string,
  params?: AnalyticsEventParams
): boolean {
  if (typeof window === "undefined") return false;

  const cid = parseGaClientId();
  if (!cid) return false;

  const { sid, sct } = parseGaSession();
  const pagePath =
    typeof params?.page_path === "string" && params.page_path
      ? params.page_path
      : window.location.pathname;

  const query = new URLSearchParams({
    v: "2",
    tid: GA_MEASUREMENT_ID,
    _p: String(getPageLoadId()),
    gcd: "13l3l3l3l1l1",
    npa: "0",
    dma: "0",
    cid,
    ul: (navigator.language || "vi").toLowerCase(),
    sr: `${window.screen.width}x${window.screen.height}`,
    _s: String(++hitSequence),
    sct,
    seg: "1",
    dl: window.location.href,
    dp: pagePath,
    dt: document.title,
    en: eventName,
    _ee: "1",
  });

  if (sid) {
    query.set("sid", sid);
  }
  if (typeof document !== "undefined" && document.referrer) {
    query.set("dr", document.referrer);
  }
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    query.set("tfd", String(Math.round(performance.now())));
  }

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || key === "page_path" || key === "transport_type") {
        continue;
      }
      if (typeof value === "number" && Number.isFinite(value)) {
        query.set(`epn.${key}`, String(value));
      } else if (typeof value === "boolean") {
        query.set(`ep.${key}`, value ? "1" : "0");
      } else {
        query.set(`ep.${key}`, String(value));
      }
    }
  }

  const endpoint = `${GA_COLLECT_ENDPOINT}?${query.toString()}`;

  try {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon(endpoint, "")
    ) {
      return true;
    }
  } catch {
    // Fall through to fetch keepalive
  }

  try {
    if (typeof fetch === "function") {
      void fetch(endpoint, {
        method: "POST",
        keepalive: true,
        mode: "no-cors",
        credentials: "omit",
        body: "",
      }).catch(() => {});
      return true;
    }
  } catch {
    // Fall back to gtag queue
  }

  return false;
}

export function trackAnalyticsEvent(
  eventName: string,
  params?: AnalyticsEventParams,
  options?: TrackAnalyticsOptions
): void {
  const gtag = ensureGtag();
  if (!gtag) return;

  const immediate = options?.immediate ?? true;
  if (immediate && sendImmediateGa4Hit(eventName, params)) {
    return;
  }

  const payload: Record<string, string | number | boolean> = {
    page_path: window.location.pathname,
  };

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && key !== "transport_type") {
        payload[key] = value;
      }
    }
  }

  gtag("event", eventName, payload);
}

export function trackDownloadTrial(
  buttonLocation: string,
  buttonLabel?: string
): void {
  trackAnalyticsEvent("download_trial_click", {
    button_location: buttonLocation,
    button_label: buttonLabel,
    file_name: "Setup-OnlyOffice-Mercy.exe",
  });
}

export function trackContactClick(
  buttonLocation: string,
  buttonLabel?: string
): void {
  trackAnalyticsEvent("contact_messenger_click", {
    button_location: buttonLocation,
    button_label: buttonLabel,
  });
}

