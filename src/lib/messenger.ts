/**
 * Utility to handle opening Facebook Messenger chat directly.
 * 
 * Facebook Page ID for OnlyOffice Việt Nam: 286163107904324
 * Official Web URL: https://m.me/onlyoffice.official.vn
 */

export const ONLYOFFICE_PAGE_ID = "286163107904324";
export const ONLYOFFICE_MESSENGER_URL = "https://m.me/onlyoffice.official.vn";
export const ONLYOFFICE_DEEP_LINK = `fb-messenger://user-thread/${ONLYOFFICE_PAGE_ID}`;

/**
 * Opens Messenger chat directly.
 * On mobile devices (iOS & Android), it invokes the native Messenger app scheme
 * (fb-messenger://user-thread/286163107904324) so that the user jumps straight
 * into the chat conversation instead of getting stuck on Facebook's mobile landing
 * page ("Tải ứng dụng Messenger / Mở bằng Messenger").
 * 
 * On desktop browsers, it opens the web version in a new tab.
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

  if (isMobile) {
    const start = Date.now();
    // Trigger deep link directly
    window.location.href = ONLYOFFICE_DEEP_LINK;

    // Fallback to web link if Messenger app is not installed
    setTimeout(() => {
      if (!document.hidden && Date.now() - start < 2500) {
        window.location.href = ONLYOFFICE_MESSENGER_URL;
      }
    }, 1500);
  } else {
    // Desktop: Open web messenger in a new tab
    window.open(ONLYOFFICE_MESSENGER_URL, "_blank", "noopener,noreferrer");
  }
}
