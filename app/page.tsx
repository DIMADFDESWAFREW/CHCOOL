"use client";

import Script from "next/script";
import { HeroBanner } from "../components/HeroBanner";
import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Button, Pill } from "../components/ui";
import { CourseCard } from "../components/CourseCard";
import { ExamModal } from "../components/ExamModal";
import { Toast } from "../components/Toast";

import { COURSES, EXAMS } from "../lib/data";
import { AppState, Course } from "../lib/types";
import { STORE_KEY, calcLevel, defaultState, updateStreak } from "../lib/state";
import { initTelegramUser, getTelegram } from "../lib/telegram";

type Chip = "all" | "design" | "it" | "marketing" | "popular";

export default function HomePage() {
  const [tgReady, setTgReady] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [chip, setChip] = useState<Chip>("all");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const [state, setState] = useState<AppState>(() => {
    if (typeof window === "undefined") return defaultState();
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? (JSON.parse(raw) as AppState) : defaultState();
    } catch {
      return defaultState();
    }
  });

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  // Telegram init (after SDK script loads)
  useEffect(() => {
    const user = initTelegramUser();
    if (user) {
      setState((s) => ({ ...s, user }));
      setTgReady(true);
    } else {
      setTgReady(!!getTelegram());
    }
  }, []);

  function ping(msg: string) {
    setToast(msg);
    window.clearTimeout((ping as any)._t);
    (ping as any)._t = window.setTimeout(() => setToast(null), 2400);
  }

  function markActive() {
    setState((s) => {
      const st = updateStreak(s.lastActiveDay);
      const nextStreak = st.sameDay ? s.streak : (st.reset ? 1 : s.streak + st.streakDelta);
      return { ...s, streak: nextStreak, lastActiveDay: st.day };
    });
  }

  function addXp(xp: number) {
    setState((s) => {
      const nextXp = s.xp + xp;
      const lvl = calcLevel(nextXp);
      return { ...s, xp: nextXp, level: lvl };
    });
  }

  function doLesson(courseId: string) {
    const c = COURSES.find((x) => x.id === courseId);
    if (!c) return;

    setState((s) => {
      const cs = s.courses[courseId];
      if (cs.lessonsDone >= c.lessons) return s;
      const next = {
        ...s,
        courses: {
          ...s.courses,
          [courseId]: { ...cs, lessonsDone: cs.lessonsDone + 1 },
        },
      };
      return next;
    });
    markActive();
    addXp(30);
    ping(`+ урок в "${c.title}" • +30 XP`);
  }

  const [examOpen, setExamOpen] = useState(false);
  const [examCourseId, setExamCourseId] = useState<string>("figma");

  function openExam(courseId: string) {
    setExamCourseId(courseId);
    setExamOpen(true);

    // Optional: Telegram MainButton
    const tg = getTelegram();
    if (tg?.MainButton) {
      tg.MainButton.setText("Сдать экзамен");
      tg.MainButton.show();
    }
  }

  function closeExam() {
    setExamOpen(false);
    const tg = getTelegram();
    if (tg?.MainButton) tg.MainButton.hide();
  }

  function submitExam(scorePct: number, passed: boolean) {
    const c = COURSES.find((x) => x.id === examCourseId);
    if (!c) return;

    if (!passed) {
      ping(`Не сдано: ${scorePct}% (нужно 67%). Попробуй ещё раз.`);
      return;
    }

    setState((s) => {
      const cs = s.courses[examCourseId];
      if (cs.examPassed) return s;

      const nextCashback = Math.min(3000, s.cashback + c.cashbackPerExam);
      const nextXp = s.xp + c.xpPerExam;

      return {
        ...s,
        cashback: nextCashback,
        xp: nextXp,
        level: calcLevel(nextXp),
        courses: { ...s.courses, [examCourseId]: { ...cs, examPassed: true } },
      };
    });

    markActive();
    ping(`Экзамен сдан на ${scorePct}%! +${c.xpPerExam} XP и +${c.cashbackPerExam} ₽`);
    closeExam();
  }

  function resetDemo() {
    setState(defaultState());
    ping("Демо сброшено.");
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COURSES.filter((c) => {
      const matchQ = !q || c.title.toLowerCase().includes(q);
      let matchChip = true;
      if (chip === "popular") matchChip = c.coverBadge === "ТОП" || c.coverBadge === "HOT";
      else if (chip !== "all") matchChip = c.tag === chip;
      return matchQ && matchChip;
    });
  }, [chip, query]);

  const totalProgress = useMemo(() => {
    let done = 0;
    let total = 0;
    for (const c of COURSES) {
      const cs = state.courses[c.id];
      done += Math.min(cs.lessonsDone, c.lessons);
      total += c.lessons;
    }
    return total ? Math.round((done / total) * 100) : 0;
  }, [state.courses]);

  const doneCourses = useMemo(() => {
    return COURSES.filter((c) => state.courses[c.id].examPassed).length;
  }, [state.courses]);

  function handleFilter(payload: string) {
    // from sidebar search: "q:..."
    if (payload.startsWith("q:")) {
      setQuery(payload.slice(2));
      return;
    }
    if (payload === "design" || payload === "it" || payload === "marketing") setChip(payload);
  }

  return (
    <>
      {/* Telegram SDK (required for initDataUnsafe + expand) */}
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

      <div className="min-h-screen p-4 md:p-5 flex gap-4">
        <Sidebar activeView={activeView} onView={(k) => { setActiveView(k); ping(`Раздел "${k}" пока демо`); }} onFilter={handleFilter} tg={tgReady} />

        <main className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Topbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-line bg-white/5 grid place-items-center font-black">
                {state.user.initials || "U"}
              </div>
              <div>
                <div className="font-black">{state.user.name}</div>
                <div className="text-xs text-slate-300 font-bold">Уровень {state.level} • {state.xp} XP</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={() => { ping("Фокус-таймер добавим в следующей итерации"); markActive(); addXp(40); }}>Фокус</Button>
              <Button variant="primary" onClick={() => {
                const first = COURSES.find(c => state.courses[c.id].lessonsDone >= 3 && !state.courses[c.id].examPassed) || COURSES[0];
                openExam(first.id);
              }}>
                Сдать экзамен
              </Button>
            </div>
          </div>

          {/* Banner */}
          <section className="rounded-xl2 border border-line bg-gradient-to-br from-blue-500/20 to-amber-200/10 shadow-soft p-4 md:p-5 relative overflow-hidden">
            <div className="absolute -top-24 -right-28 w-[360px] h-[360px] rounded-full bg-emerald-400/20 blur-sm" />
            <div className="relative grid md:grid-cols-[1.3fr_.7fr] gap-4">
              <div>
                <div className="text-xl font-black">Учись и возвращай деньги</div>
                <div className="text-slate-300 font-bold text-sm mt-1 max-w-[70ch]">
                  Это реальный проект (Next.js). Следующий шаг: подключаем базу и админку курсов.
                </div>

                <div className="flex flex-wrap gap-2.5 mt-4">
                  <div className="rounded-xl border border-line bg-black/20 px-3 py-2.5 min-w-[160px]">
                    <div className="text-xs text-slate-300 font-bold">Доступный возврат</div>
                    <div className="font-black mt-1">{state.cashback} ₽ из 3000 ₽</div>
                  </div>

                  <div className="rounded-xl border border-line bg-black/20 px-3 py-2.5 min-w-[160px]">
                    <div className="text-xs text-slate-300 font-bold">Streak</div>
                    <div className="font-black mt-1">{state.streak} дней</div>
                  </div>

                  <div className="rounded-xl border border-line bg-black/20 px-3 py-2.5 min-w-[160px]">
                    <div className="text-xs text-slate-300 font-bold">Экзамены</div>
                    <div className="font-black mt-1">{doneCourses}/{COURSES.length}</div>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col gap-3 justify-between">
                <div>
                  <div className="text-xs text-slate-300 font-bold">Общий прогресс</div>
                  <div className="mt-2 h-2.5 rounded-full bg-white/10 border border-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400/95 to-blue-500/95" style={{ width: totalProgress + "%" }} />
                  </div>
                  <div className="text-xs text-slate-300 font-bold mt-2">Совет: работаем микрошагами, как квест 🎮</div>
                </div>
                <Button variant="good" onClick={resetDemo} className="self-start md:self-end">Сбросить демо</Button>
              </div>
            </div>
          </section>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {(["all", "design", "it", "marketing", "popular"] as Chip[]).map((k) => (
              <button
                key={k}
                onClick={() => setChip(k)}
                className={[
                  "text-xs font-black px-3 py-2 rounded-full border transition",
                  chip === k ? "bg-blue-500/15 border-blue-400/25 text-slate-100" : "bg-white/5 border-line text-slate-300 hover:bg-white/10",
                ].join(" ")}
              >
                {k === "all" ? "Все" : k === "design" ? "Дизайн" : k === "it" ? "IT" : k === "marketing" ? "Маркетинг" : "Популярное"}
              </button>
            ))}

            <div className="ml-auto w-full sm:w-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по названию…"
                className="w-full sm:w-[320px] px-3 py-2 rounded-xl border border-line bg-black/20 text-slate-100 outline-none"
              />
            </div>
          </div>

          {/* Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((c) => {
              const cs = state.courses[c.id];
              return (
                <CourseCard
                  key={c.id}
                  course={c}
                  lessonsDone={cs.lessonsDone}
                  examPassed={cs.examPassed}
                  onLesson={() => doLesson(c.id)}
                  onExam={() => openExam(c.id)}
                />
              );
            })}
          </section>
        </main>
      </div>

      <ExamModal open={examOpen} onClose={closeExam} exam={EXAMS[examCourseId] ?? null} onSubmit={submitExam} />

      <Toast text={toast} />
    </>
  );
}
