"use client";

import { motion } from "framer-motion";
import { Button, Pill } from "./ui";

export function HeroBanner({
  refundTotalRub = 3000,
  refundAvailableRub = 0,
  onStart,
  onOpenRules,
}: {
  refundTotalRub?: number;
  refundAvailableRub?: number;
  onStart: () => void;
  onOpenRules: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/35 p-5 md:p-7"
    >
      {/* фоновые "пятна" */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Pill>PayBack Academys</Pill>
            <Pill>Учись → возвращай деньги</Pill>
            <Pill>Mini App</Pill>
          </div>

          <h2 className="mt-4 text-2xl md:text-3xl font-semibold leading-tight">
            Пройди обучение полностью и получи{" "}
            <span className="text-emerald-300">возврат</span> своих денег
          </h2>

          <p className="mt-2 text-sm md:text-base text-neutral-300">
            Двигаешься по урокам, сдаёшь экзамены, растёт прогресс. Когда программа
            закрыта на 100% — возвращаем оплату.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-3">
              <div className="text-xs text-neutral-400">Доступный возврат</div>
              <div className="text-lg font-semibold">{refundAvailableRub} ₽</div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-3">
              <div className="text-xs text-neutral-400">Максимум</div>
              <div className="text-lg font-semibold">{refundTotalRub} ₽</div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-3">
              <div className="text-xs text-neutral-400">Условие</div>
              <div className="text-lg font-semibold">100% прогресса</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 min-w-[220px]">
          <Button onClick={onStart} className="w-full">
            Начать путь
          </Button>
          <Button variant="default" onClick={onOpenRules} className="w-full">
            Как работает возврат
          </Button>

          <div className="mt-2 text-xs text-neutral-400">
            Совет: работаем микрошагами, как квест 🗺️
          </div>
        </div>
      </div>
    </motion.section>
  );
}
