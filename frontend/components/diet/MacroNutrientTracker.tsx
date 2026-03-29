import { formatGrams } from "@/lib/formatters";
import type { Locale } from "@/lib/i18n";
import type { MacroNutrients } from "./types";

type MacroNutrientTrackerProps = {
  locale: Locale;
  target: MacroNutrients;
  consumed: MacroNutrients;
  copy: {
    title: string;
    subtitle: string;
    totalRemaining: string;
    remaining: string;
    nutrientLabels: {
      protein: string;
      carbs: string;
      fats: string;
    };
  };
};

type MacroRowProps = {
  locale: Locale;
  label: string;
  consumed: number;
  target: number;
  tintClass: string;
  remainingLabel: string;
};

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

function MacroRow({ locale, label, consumed, target, tintClass, remainingLabel }: MacroRowProps) {
  const progress = target > 0 ? clampPercent((consumed / target) * 100) : 0;
  const remaining = Math.max(target - consumed, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-[color:var(--text-secondary)]">
        <span className="font-medium">{label}</span>
        <span>
          {formatGrams(locale, consumed)}g / {formatGrams(locale, target)}g • {remainingLabel}: {formatGrams(locale, remaining)}g
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[color:var(--glass-bg-strong)]">
        <div className={`h-full rounded-full ${tintClass}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export function MacroNutrientTracker({ locale, target, consumed, copy }: MacroNutrientTrackerProps) {
  const remaining = {
    protein: Math.max(target.protein - consumed.protein, 0),
    carbs: Math.max(target.carbs - consumed.carbs, 0),
    fats: Math.max(target.fats - consumed.fats, 0),
  };

  const totalRemaining = remaining.protein + remaining.carbs + remaining.fats;

  return (
    <section className="rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] p-5 shadow-[0_10px_35px_rgba(50,80,60,0.12)] backdrop-blur-xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">{copy.title}</h2>
          <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{copy.subtitle}</p>
        </div>
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2 text-right">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">{copy.totalRemaining}</p>
          <p className="text-base font-semibold text-[color:var(--text-primary)]">{formatGrams(locale, totalRemaining)}g</p>
        </div>
      </div>

      <div className="space-y-4">
        <MacroRow
          locale={locale}
          label={copy.nutrientLabels.protein}
          consumed={consumed.protein}
          target={target.protein}
          tintClass="bg-[color:var(--accent)]"
          remainingLabel={copy.remaining}
        />
        <MacroRow
          locale={locale}
          label={copy.nutrientLabels.carbs}
          consumed={consumed.carbs}
          target={target.carbs}
          tintClass="bg-[color:var(--accent-gold)]"
          remainingLabel={copy.remaining}
        />
        <MacroRow
          locale={locale}
          label={copy.nutrientLabels.fats}
          consumed={consumed.fats}
          target={target.fats}
          tintClass="bg-[color:var(--accent-warm)]"
          remainingLabel={copy.remaining}
        />
      </div>
    </section>
  );
}
