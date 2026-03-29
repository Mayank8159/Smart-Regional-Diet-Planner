"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import type { RegionalMealOption } from "./types";

type SmartSwapToggleProps = {
  open: boolean;
  title?: string;
  showLabel?: string;
  hideLabel?: string;
  isSwapping?: boolean;
  onToggle: () => void;
  alternatives: RegionalMealOption[];
  onSelectAlternative: (option: RegionalMealOption) => void;
};

export function SmartSwapToggle({
  open,
  title = "Smart Swap",
  showLabel = "Show alternatives",
  hideLabel = "Hide alternatives",
  isSwapping = false,
  onToggle,
  alternatives,
  onSelectAlternative,
}: SmartSwapToggleProps) {
  return (
    <div className="rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[color:var(--text-primary)]">
          <Sparkles className="h-4 w-4 text-[color:var(--accent)]" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <button
          type="button"
          onClick={onToggle}
          disabled={isSwapping}
          className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-1.5 text-xs font-medium text-[color:var(--text-secondary)] transition hover:brightness-105"
        >
          <span>{open ? hideLabel : showLabel}</span>
          <span
            className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${open ? "bg-[color:var(--accent-soft)]" : "bg-[color:var(--glass-border)]"}`}
          >
            <motion.span
              animate={{ x: open ? 16 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="block h-4 w-4 rounded-full bg-white"
            />
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="alternatives"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-3 overflow-hidden"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {alternatives.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  disabled={isSwapping}
                  onClick={() => onSelectAlternative(option)}
                  className="flex items-center justify-between rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2 text-left transition hover:brightness-105"
                >
                  <span>
                    <span className="block text-sm font-medium text-[color:var(--text-primary)]">{option.name}</span>
                    <span className="block text-xs text-[color:var(--text-secondary)]">{option.region}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-[color:var(--text-secondary)]" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
