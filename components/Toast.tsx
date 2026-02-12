"use client";

import { AnimatePresence, motion } from "framer-motion";

export function Toast({ text }: { text: string | null }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          className="fixed left-1/2 -translate-x-1/2 bottom-4 z-[99999] max-w-[520px] w-[92vw] rounded-xl border border-line bg-black/60 text-slate-100 px-3 py-2.5 shadow-soft text-sm"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
