export type TgUser = { first_name?: string; last_name?: string };

declare global {
  interface Window {
    Telegram?: any;
  }
}

export function getTelegram() {
  return typeof window !== "undefined" ? window.Telegram?.WebApp : undefined;
}

export function initTelegramUser() {
  const tg = getTelegram();
  if (!tg) return null;
  try {
    tg.expand();
    const u: TgUser | undefined = tg.initDataUnsafe?.user;
    if (!u) return null;
    const name = [u.first_name, u.last_name].filter(Boolean).join(" ").trim();
    const initials = ((u.first_name?.[0] || "U") + (u.last_name?.[0] || "")).toUpperCase();
    return { name: name || "Гость", initials };
  } catch {
    return null;
  }
}
