import { defaultLocale, locales, type Locale } from "./config";

export type MessageNamespace = "common" | "home" | "pricing" | "enterprise";

/**
 * Tải nội dung dịch của một file namespace cụ thể theo locale
 */
export async function getNamespaceMessages(
  locale: string,
  namespace: MessageNamespace
): Promise<Record<string, any>> {
  const targetLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  try {
    const mod = await import(`@/messages/${targetLocale}/${namespace}.json`);
    return mod.default || mod;
  } catch (err) {
    console.error(
      `[i18n] Không thể tải ${namespace}.json cho locale: ${targetLocale}`,
      err
    );
    if (targetLocale !== defaultLocale) {
      try {
        const fallback = await import(`@/messages/${defaultLocale}/${namespace}.json`);
        return fallback.default || fallback;
      } catch {
        return {};
      }
    }
    return {};
  }
}

/**
 * Hàm tải toàn bộ nội dung dịch của một locale (gộp common, home, pricing, enterprise)
 */
export async function getMessages(locale: string): Promise<Record<string, any>> {
  const targetLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  try {
    const [common, home, pricing, enterprise] = await Promise.all([
      getNamespaceMessages(targetLocale, "common"),
      getNamespaceMessages(targetLocale, "home"),
      getNamespaceMessages(targetLocale, "pricing"),
      getNamespaceMessages(targetLocale, "enterprise"),
    ]);

    return {
      ...common,
      ...home,
      ...pricing,
      ...enterprise,
    };
  } catch (error) {
    console.error(`[i18n] Lỗi khi tải messages cho locale: ${targetLocale}`, error);
    if (targetLocale !== defaultLocale) {
      return getMessages(defaultLocale);
    }
    return {};
  }
}

export default getMessages;
