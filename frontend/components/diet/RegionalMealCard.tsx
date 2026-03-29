"use client";

import { Flame, Wheat, Drumstick } from "lucide-react";
import { formatCalories, formatGrams } from "@/lib/formatters";
import type { Locale } from "@/lib/i18n";
import type { MacroNutrients } from "./types";

type RegionalMealCardProps = {
  locale: Locale;
  mealName: string;
  regionalTag: string;
  macros: MacroNutrients;
  calories: number;
  mealTimeLabel?: string;
  caloriesLabel?: string;
  descriptionLabel?: string;
  macroBadgeLabel?: string;
  nutrientLabels?: {
    protein: string;
    carbs: string;
    fats: string;
  };
  className?: string;
};

const spiceMacroColors = {
  protein: "var(--accent)",
  carbs: "var(--accent-gold)",
  fats: "var(--accent-warm)",
} as const;

function MacroProgressRing({ macros, label }: { macros: MacroNutrients; label: string }) {
  const total = macros.protein + macros.carbs + macros.fats || 1;
  const proteinAngle = (macros.protein / total) * 360;
  const carbAngle = (macros.carbs / total) * 360;
  const fatAngle = (macros.fats / total) * 360;

  const gradient = `conic-gradient(
    ${spiceMacroColors.protein} 0deg ${proteinAngle.toFixed(2)}deg,
    ${spiceMacroColors.carbs} ${proteinAngle.toFixed(2)}deg ${(proteinAngle + carbAngle).toFixed(2)}deg,
    ${spiceMacroColors.fats} ${(proteinAngle + carbAngle).toFixed(2)}deg ${(proteinAngle + carbAngle + fatAngle).toFixed(2)}deg
  )`;

  return (
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]" style={{ background: gradient }} />
      <div className="absolute inset-[8px] grid place-items-center rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] backdrop-blur-md">
        <span className="text-xs font-semibold tracking-wide text-[color:var(--text-secondary)]">{label}</span>
      </div>
    </div>
  );
}

export function RegionalMealCard({
  locale,
  mealName,
  regionalTag,
  macros,
  calories,
  mealTimeLabel,
  caloriesLabel = "Calories",
  descriptionLabel = "Curated for balanced regional nutrition.",
  macroBadgeLabel = "Macros",
  nutrientLabels = { protein: "Protein", carbs: "Carbs", fats: "Fats" },
  className,
}: RegionalMealCardProps) {
  return (
    <article
      className={`rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] p-5 shadow-[0_10px_35px_rgba(50,80,60,0.12)] backdrop-blur-xl ${className ?? ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-1 text-xs font-medium tracking-wide text-[color:var(--text-secondary)]">
            {regionalTag}
          </span>
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text-primary)]">{mealName}</h3>
          <p className="text-sm text-[color:var(--text-secondary)]">{descriptionLabel}</p>
          <div className="flex items-center gap-2 text-xs text-[color:var(--text-secondary)]">
            {mealTimeLabel ? <span className="rounded-full bg-[color:var(--glass-bg-strong)] px-2 py-0.5">{mealTimeLabel}</span> : null}
            <span className="rounded-full bg-[color:var(--glass-bg-strong)] px-2 py-0.5">{caloriesLabel}: {formatCalories(locale, calories)}</span>
          </div>
        </div>
        <MacroProgressRing macros={macros} label={macroBadgeLabel} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-2 text-[color:var(--text-secondary)]">
          <div className="mb-1 flex items-center gap-1.5 text-[color:var(--text-secondary)]">
            <Drumstick className="h-3.5 w-3.5" />
            {nutrientLabels.protein}
          </div>
          <span className="font-semibold text-[color:var(--text-primary)]">{formatGrams(locale, macros.protein)}g</span>
        </div>
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-2 text-[color:var(--text-secondary)]">
          <div className="mb-1 flex items-center gap-1.5 text-[color:var(--text-secondary)]">
            <Wheat className="h-3.5 w-3.5" />
            {nutrientLabels.carbs}
          </div>
          <span className="font-semibold text-[color:var(--text-primary)]">{formatGrams(locale, macros.carbs)}g</span>
        </div>
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-2 text-[color:var(--text-secondary)]">
          <div className="mb-1 flex items-center gap-1.5 text-[color:var(--text-secondary)]">
            <Flame className="h-3.5 w-3.5" />
            {nutrientLabels.fats}
          </div>
          <span className="font-semibold text-[color:var(--text-primary)]">{formatGrams(locale, macros.fats)}g</span>
        </div>
      </div>
    </article>
  );
}
