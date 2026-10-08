import { defaultLocale, locales, type Locale } from "./config";

/**
 * Bộ nhớ đệm in-memory (In-Memory Cache)
 * Đảm bảo sau lần tải đầu tiên, thời gian truy xuất tin nhắn là 0ms (tức thì).
 * Tránh I/O đĩa, Promise.all và object spreading lặp lại trên mỗi request.
 */
const messagesCache = new Map<string, Record<string, any>>();

/**
 * Tải toàn bộ nội dung dịch của một locale (vi | en) từ file json tương ứng.
 * Tận dụng bộ nhớ đệm để đạt tốc độ render tối đa.
 */
export async function getMessages(locale: string): Promise<Record<string, any>> {
  const targetLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  if (messagesCache.has(targetLocale)) {
    return messagesCache.get(targetLocale)!;
  }

  try {
    const mod = await import(`@/messages/${targetLocale}.json`);
    const messages = mod.default || mod;
    messagesCache.set(targetLocale, messages);
    return messages;
  } catch (error) {
    console.error(`[i18n] Lỗi khi tải messages cho locale: ${targetLocale}`, error);
    if (targetLocale !== defaultLocale) {
      return getMessages(defaultLocale);
    }
    return {};
  }
}

/**
 * Lấy nội dung dịch theo namespace cụ thể (hỗ trợ tương thích ngược)
 */
export async function getNamespaceMessages(
  locale: string,
  namespace: string
): Promise<Record<string, any>> {
  const allMessages = await getMessages(locale);
  return allMessages[namespace] || {};
}

/**
 * Xóa bộ nhớ đệm (hữu ích trong chế độ phát triển hoặc khi reload nóng)
 */
export function clearMessagesCache(): void {
  messagesCache.clear();
}

export default getMessages;
