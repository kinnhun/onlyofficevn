/**
 * Client-side helpers to push GA4 events via GTM-PLDQC7LM (`window.gtag`).
 *
 * Google's `gtm.js` command parser (`Mb(a)`) requires an authentic JS `arguments`
 * object (`window.dataLayer.push(arguments)`), never a plain rest array.
 */

export type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>;

function ensureGtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined") return null;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }
  return window.gtag;
}

export function trackAnalyticsEvent(
  eventName: string,
  params?: AnalyticsEventParams
): void {
  const gtag = ensureGtag();
  if (!gtag) return;

  const payload: Record<string, string | number | boolean> = {
    page_path: window.location.pathname,
    transport_type: "beacon",
  };

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
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

