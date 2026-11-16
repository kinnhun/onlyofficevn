import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PLDQC7LM";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Loads the Google Tag / Google Analytics (`gtm.js`) container and initializes
 * `window.dataLayer` and `gtag('js', new Date())` across all localized routes.
 */
export default function GoogleAnalytics() {
  if (!GTM_ID) return null;

  return (
    <>
      <Script id="google-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
        `}
      </Script>
      <Script
        id="google-tag-manager"
        src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`}
        strategy="afterInteractive"
      />
    </>
  );
}

