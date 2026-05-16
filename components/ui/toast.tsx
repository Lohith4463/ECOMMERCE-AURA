"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/context/toast-context";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex w-[min(360px,calc(100vw-32px))] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="glass rounded-[8px] p-4"
          >
            <p className="font-semibold text-white">{toast.title}</p>
            {toast.description ? <p className="mt-1 text-sm text-white/60">{toast.description}</p> : null}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
