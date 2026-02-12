"use client";

import { Pill } from "./ui";
import clsx from "clsx";

const nav = [
  { key: "home", label: "Главная", icon: "🏠" },
  { key: "courses", label: "Курсы", icon: "🎓" },
  { key: "exams", label: "Экзамены", icon: "🧠" },
  { key: "leaderboard", label: "Рейтинг", icon: "🏆" },
  { key: "wallet", label: "Баланс", icon: "💰" },
] as const;

const cats = [
  { key: "design", label: "Дизайн", icon: "🎨" },
  { key: "it", label: "IT", icon: "💻" },
  { key: "marketing", label: "Маркетинг", icon: "📣" },
] as const;

export function Sidebar({
  activeView,
  onView,
  onFilter,
  tg,
}: {
  activeView: string;
  onView: (k: string) => void;
  onFilter: (tag: string) => void;
  tg: boolean;
}) {
  return (
    <aside className="hidden md:block w-[280px]">
      <div className="rounded-xl2 border border-line bg-white/[0.03] shadow-soft overflow-hidden">
        <div className="flex items-center justify-between px-3.5 py-3 border-b border-line">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/95 to-emerald-400/75 grid place-items-center font-black shadow-soft">
              S
            </div>
            <div>
              <div className="font-black text-sm">School Arena</div>
              <div className="text-xs text-slate-300 font-bold">Mini App • MVP</div>
            </div>
          </div>
          <Pill>{tg ? "tg" : "web"}</Pill>
        </div>

        <div className="p-3.5">
          <input
            placeholder="Поиск курсов…"
            className="w-full px-3 py-2.5 rounded-xl border border-line bg-black/20 text-slate-100 outline-none"
            onChange={(e) => onFilter("q:" + e.target.value)}
          />
        </div>

        <div className="px-2 pb-3">
          <div className="px-2.5 text-[11px] font-black tracking-[.14em] text-slate-300/90 uppercase mb-2">
            Меню
          </div>
          <div className="space-y-1">
            {nav.map((n) => (
              <button
                key={n.key}
                onClick={() => onView(n.key)}
                className={clsx(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left border border-transparent hover:bg-white/[0.04]",
                  activeView === n.key && "bg-blue-500/15 border-blue-400/25"
                )}
              >
                <span className="opacity-80">{n.icon}</span>
                <span className="font-bold">{n.label}</span>
              </button>
            ))}
          </div>

          <div className="px-2.5 text-[11px] font-black tracking-[.14em] text-slate-300/90 uppercase mt-4 mb-2">
            Категории
          </div>
          <div className="space-y-1">
            {cats.map((c) => (
              <button
                key={c.key}
                onClick={() => onFilter(c.key)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left hover:bg-white/[0.04]"
              >
                <span className="opacity-80">{c.icon}</span>
                <span className="font-bold">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-3.5 py-3 border-t border-line text-xs text-slate-300">
          <span>Поддержка</span>
          <Pill>v0.1</Pill>
        </div>
      </div>
    </aside>
  );
}
