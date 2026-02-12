"use client";

import { motion } from "framer-motion";
import { Course } from "@/lib/types";
import { Button, Card, Pill } from "./ui";

export function CourseCard({
  course,
  lessonsDone,
  examPassed,
  onLesson,
  onExam,
}: {
  course: Course;
  lessonsDone: number;
  examPassed: boolean;
  onLesson: () => void;
  onExam: () => void;
}) {
  const pct = Math.round((lessonsDone / course.lessons) * 100);
  const canExam = lessonsDone >= Math.min(3, course.lessons);

  return (
    <motion.div layout whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Card className="min-w-0">
        <div className="relative p-3.5 border-b border-line bg-black/20">
          <div className="absolute top-3 right-3">
            <Pill>{course.coverBadge}</Pill>
          </div>
          <div className="font-black">{course.title}</div>
          <div className="text-xs text-slate-300 font-bold mt-1">
            {course.level} • {course.lessons} уроков • Возврат: {course.cashbackPerExam} ₽
          </div>
        </div>

        <div className="p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
            <span>Прогресс</span>
            <span className="text-slate-100">{pct}%</span>
          </div>

          <div className="mt-2 h-2 rounded-full bg-white/10 border border-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400/95 to-blue-500/95" style={{ width: pct + "%" }} />
          </div>

          <div className="flex items-center justify-between mt-3 text-xs text-slate-300 font-bold">
            <span>Уроков пройдено</span>
            <span className="text-slate-100">
              {lessonsDone}/{course.lessons}
            </span>
          </div>

          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="good" onClick={onLesson}>
              + урок
            </Button>
            <Button
              size="sm"
              variant="warn"
              onClick={onExam}
              disabled={!canExam || examPassed}
              className="flex-1"
              title={!canExam ? "Экзамен откроется после 3 уроков" : ""}
            >
              {examPassed ? "Экзамен сдан" : canExam ? "Сдать экзамен" : "Экзамен (после 3 уроков)"}
            </Button>
          </div>

          <div className="mt-3 text-xs text-slate-300">
            Награда: <b className="text-slate-100">+{course.xpPerExam} XP</b> за экзамен
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
