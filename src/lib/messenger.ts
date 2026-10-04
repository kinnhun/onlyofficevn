/**
 * Utility to handle opening Facebook Messenger chat directly.
 * 
 * Facebook Page ID for OnlyOffice Việt Nam: 286163107904324
 * Direct Thread URL: https://www.messenger.com/t/286163107904324
 */

export const ONLYOFFICE_PAGE_ID = "286163107904324";
export const ONLYOFFICE_MESSENGER_URL = "https://www.messenger.com/t/286163107904324";
export const ONLYOFFICE_DEEP_LINK_IOS = `fb-messenger://user-thread/${ONLYOFFICE_PAGE_ID}`;
export const ONLYOFFICE_INTENT_ANDROID = `intent://user-thread/${ONLYOFFICE_PAGE_ID}#Intent;scheme=fb-messenger;package=com.facebook.orca;S.browser_fallback_url=https%3A%2F%2Fwww.messenger.com%2Ft%2F${ONLYOFFICE_PAGE_ID};end`;

/**
 * Opens Messenger chat directly.
 * - On Android: Uses Chrome/Android intent to launch Messenger app immediately,
 *   falling back to https://www.messenger.com/t/286163107904324 if not installed.
 * - On iOS: Uses fb-messenger://user-thread/286163107904324 directly.
 *   If user doesn't switch to app within 2.5s, falls back to direct thread web URL.
 * - On Desktop: Opens https://www.messenger.com/t/286163107904324 in a new tab.
 */
export function openMessengerChat(e?: React.MouseEvent | React.FormEvent | MouseEvent) {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }

  if (typeof window === "undefined") return;

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || "";
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const isMobile = isIOS || isAndroid || /Mobi|Mobile/i.test(ua);

  if (isAndroid) {
    // Android Chrome Intent: Opens Messenger app instantly, zero interstitial page!
    window.location.href = ONLYOFFICE_INTENT_ANDROID;
  } else if (isIOS) {
    // iOS Safari: Open native Messenger app
    const start = Date.now();
    let appOpened = false;

    const onVisibilityChange = () => {
      if (document.hidden) {
        appOpened = true;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange, { once: true });

    window.location.href = ONLYOFFICE_DEEP_LINK_IOS;

    // Fallback only if app wasn't opened and page remains visible after 2.5s
    setTimeout(() => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (!appOpened && !document.hidden && Date.now() - start < 3500) {
        window.location.href = ONLYOFFICE_MESSENGER_URL;
      }
    }, 2500);
  } else if (isMobile) {
    // Other mobile: direct thread URL
    window.location.href = ONLYOFFICE_MESSENGER_URL;
  } else {
    // Desktop: Open direct thread in a new tab
    window.open(ONLYOFFICE_MESSENGER_URL, "_blank", "noopener,noreferrer");
  }
}

