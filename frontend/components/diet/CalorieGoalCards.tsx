import { formatCalories, formatDate } from "@/lib/formatters";
import type { Locale } from "@/lib/i18n";

type CalorieGoalCardsProps = {
  locale: Locale;
  consumed: number;
  target: number;
  labels: {
    title: string;
    consumed: string;
    target: string;
    remaining: string;
    updatedOn: string;
  };
};

function ProgressBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-[color:var(--glass-bg-strong)]">
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent)_0%,var(--accent-warm)_60%,var(--accent-gold)_100%)]"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export function CalorieGoalCards({ locale, consumed, target, labels }: CalorieGoalCardsProps) {
  const remaining = Math.max(target - consumed, 0);
  const consumedPercent = target > 0 ? (consumed / target) * 100 : 0;
  const todayLabel = formatDate(locale, new Date());

  return (
    <section className="rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] p-5 shadow-[0_10px_35px_rgba(50,80,60,0.12)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">{labels.title}</h2>
        <p className="text-xs text-[color:var(--text-secondary)]">{labels.updatedOn}: {todayLabel}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">{labels.consumed}</p>
          <p className="mt-1 text-xl font-semibold text-[color:var(--text-primary)]">{formatCalories(locale, consumed)}</p>
        </div>
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">{labels.target}</p>
          <p className="mt-1 text-xl font-semibold text-[color:var(--text-primary)]">{formatCalories(locale, target)}</p>
        </div>
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">{labels.remaining}</p>
          <p className="mt-1 text-xl font-semibold text-[color:var(--text-primary)]">{formatCalories(locale, remaining)}</p>
        </div>
      </div>
      <div className="mt-4">
        <ProgressBar value={consumedPercent} />
      </div>
    </section>
  );
}