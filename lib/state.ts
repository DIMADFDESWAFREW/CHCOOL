import { AppState } from "./types";
import { COURSES } from "./data";

export const STORE_KEY = "school_arena_state_v1";

export function defaultState(): AppState {
  return {
    user: { name: "Гость", initials: "U" },
    xp: 0,
    level: 1,
    cashback: 0,
    streak: 0,
    lastActiveDay: null,
    courses: Object.fromEntries(COURSES.map((c) => [c.id, { lessonsDone: 0, examPassed: false }])) as any,
  };
}

export function calcLevel(xp: number) {
  return Math.max(1, Math.floor(xp / 500) + 1);
}

export function updateStreak(prevDay: string | null) {
  const today = new Date().toISOString().slice(0, 10);
  if (!prevDay) return { streakDelta: 1, day: today, reset: false, sameDay: false };

  if (prevDay === today) return { streakDelta: 0, day: today, reset: false, sameDay: true };

  const prev = new Date(prevDay);
  const now = new Date(today);
  const diffDays = Math.round((now.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return { streakDelta: 1, day: today, reset: false, sameDay: false };
  return { streakDelta: 1, day: today, reset: true, sameDay: false };
}
