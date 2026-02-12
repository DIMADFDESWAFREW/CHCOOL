"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui";
import { Exam } from "@/lib/types";
import { useMemo, useState } from "react";

export function ExamModal({
  open,
  onClose,
  exam,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  exam: Exam | null;
  onSubmit: (scorePct: number, passed: boolean) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const total = exam?.questions.length ?? 0;

  const score = useMemo(() => {
    if (!exam) return 0;
    let correct = 0;
    exam.questions.forEach((q, idx) => {
      if (answers[idx] === q.a) correct += 1;
    });
    return total ? Math.round((correct / total) * 100) : 0;
  }, [answers, exam, total]);

  function submit() {
    const passed = score >= 67;
    onSubmit(score, passed);
    if (passed) setAnswers({});
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] grid place-items-center p-4 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="w-full max-w-[720px] rounded-[18px] border border-line bg-white/[0.04] shadow-soft overflow-hidden"
            initial={{ y: 12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-line">
              <div className="font-black text-sm">{exam?.title ?? "Экзамен"}</div>
              <Button onClick={onClose} aria-label="close">
                ✕
              </Button>
            </div>

            <div className="p-4 space-y-4">
              {!exam ? (
                <div className="text-slate-300">Экзамен не выбран.</div>
              ) : (
                exam.questions.map((q, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="font-black">
                      {idx + 1}. {q.q}
                    </div>
                    <div className="space-y-2">
                      {q.opts.map((t, i) => (
                        <label
                          key={i}
                          className="flex gap-3 items-start p-3 rounded-xl border border-line bg-black/20 cursor-pointer hover:bg-black/25"
                        >
                          <input
                            type="radio"
                            name={`q${idx}`}
                            className="mt-1"
                            checked={answers[idx] === i}
                            onChange={() => setAnswers((a) => ({ ...a, [idx]: i }))}
                          />
                          <div className="text-slate-100">{t}</div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-4 py-3 border-t border-line flex items-center justify-between gap-3">
              <div className="text-sm text-slate-300 font-bold">Счёт: {score}% (нужно 67%)</div>
              <div className="flex gap-2">
                <Button onClick={onClose}>Отмена</Button>
                <Button variant="primary" onClick={submit} disabled={!exam}>
                  Сдать
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
