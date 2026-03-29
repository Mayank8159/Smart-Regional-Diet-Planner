"use client";

import { useMemo, useState } from "react";
import { formatCalories, formatGrams } from "@/lib/formatters";
import { copyByLocale, type Locale } from "@/lib/i18n";
import {
  calculateCalorieTarget,
  optimizeFoods,
  type ActivityLevel,
  type GoalMode,
  type Gender,
  type UserProfile,
} from "@/lib/planner";
import { INDIAN_STATES, type IndianStateName } from "@/lib/state-food-data";

type UserProfilePlannerProps = {
  locale: Locale;
};

const regionOptions: Array<{ value: IndianStateName; label: string }> = INDIAN_STATES.map((state) => ({
  value: state,
  label: state,
}));

const defaultProfile: UserProfile = {
  age: 27,
  gender: "male",
  weightKg: 70,
  heightCm: 170,
  activityLevel: "moderate",
  region: "West Bengal",
  goalMode: "maintain",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-xs font-medium text-[color:var(--text-secondary)]">{children}</label>;
}

function InputShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2">
      {children}
    </div>
  );
}

export function UserProfilePlanner({ locale }: UserProfilePlannerProps) {
  const copy = copyByLocale[locale];
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const activityOptions: Array<{ value: ActivityLevel; label: string }> = [
    { value: "sedentary", label: copy.planner.activityOptions.sedentary },
    { value: "light", label: copy.planner.activityOptions.light },
    { value: "moderate", label: copy.planner.activityOptions.moderate },
    { value: "active", label: copy.planner.activityOptions.active },
    { value: "athlete", label: copy.planner.activityOptions.athlete },
  ];

  const goalModeOptions: Array<{ value: GoalMode; label: string }> = [
    { value: "fat-loss", label: copy.planner.goalModes["fat-loss"] },
    { value: "maintain", label: copy.planner.goalModes.maintain },
    { value: "gain", label: copy.planner.goalModes.gain },
  ];

  const calorieResult = useMemo(() => calculateCalorieTarget(profile), [profile]);
  const recommendations = useMemo(() => optimizeFoods(profile), [profile]);

  const filteredRecommendations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return recommendations;
    }

    return recommendations.filter((entry) => entry.food.foodName.toLowerCase().includes(query));
  }, [recommendations, searchQuery]);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredRecommendations.length / pageSize));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const paginatedRecommendations = useMemo(() => {
    const start = (currentPageSafe - 1) * pageSize;
    return filteredRecommendations.slice(start, start + pageSize);
  }, [filteredRecommendations, currentPageSafe]);

  return (
    <section className="mt-6 rounded-3xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] p-5 shadow-[0_10px_35px_rgba(50,80,60,0.12)] backdrop-blur-xl">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">{copy.planner.title}</h2>
        <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
          {copy.planner.subtitle}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <FieldLabel>{copy.planner.age}</FieldLabel>
          <InputShell>
            <input
              className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none"
              type="number"
              min={12}
              max={90}
              value={profile.age}
              onChange={(event) =>
                setProfile((state) => ({ ...state, age: Number(event.target.value || 0) }))
              }
            />
          </InputShell>
        </div>

        <div>
          <FieldLabel>{copy.planner.gender}</FieldLabel>
          <InputShell>
            <select
              className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none"
              value={profile.gender}
              onChange={(event) =>
                setProfile((state) => ({ ...state, gender: event.target.value as Gender }))
              }
            >
              <option value="male">{copy.planner.genders.male}</option>
              <option value="female">{copy.planner.genders.female}</option>
              <option value="other">{copy.planner.genders.other}</option>
            </select>
          </InputShell>
        </div>

        <div>
          <FieldLabel>{copy.planner.weight}</FieldLabel>
          <InputShell>
            <input
              className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none"
              type="number"
              min={30}
              max={220}
              value={profile.weightKg}
              onChange={(event) =>
                setProfile((state) => ({ ...state, weightKg: Number(event.target.value || 0) }))
              }
            />
          </InputShell>
        </div>

        <div>
          <FieldLabel>{copy.planner.height}</FieldLabel>
          <InputShell>
            <input
              className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none"
              type="number"
              min={120}
              max={230}
              value={profile.heightCm}
              onChange={(event) =>
                setProfile((state) => ({ ...state, heightCm: Number(event.target.value || 0) }))
              }
            />
          </InputShell>
        </div>

        <div>
          <FieldLabel>{copy.planner.activityLevel}</FieldLabel>
          <InputShell>
            <select
              className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none"
              value={profile.activityLevel}
              onChange={(event) =>
                setProfile((state) => ({ ...state, activityLevel: event.target.value as ActivityLevel }))
              }
            >
              {activityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </InputShell>
        </div>

        <div>
          <FieldLabel>{copy.planner.region}</FieldLabel>
          <InputShell>
            <select
              className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none"
              value={profile.region}
              onChange={(event) => {
                setCurrentPage(1);
                setProfile((state) => ({ ...state, region: event.target.value as IndianStateName }));
              }}
            >
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </InputShell>
        </div>

        <div>
          <FieldLabel>{copy.planner.goalMode}</FieldLabel>
          <InputShell>
            <select
              className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none"
              value={profile.goalMode}
              onChange={(event) =>
                setProfile((state) => ({ ...state, goalMode: event.target.value as GoalMode }))
              }
            >
              {goalModeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </InputShell>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">{copy.planner.cards.bmr}</p>
          <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
            {formatCalories(locale, calorieResult.bmr)} kcal
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">{copy.planner.cards.maintenance}</p>
          <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
            {formatCalories(locale, calorieResult.maintenanceCalories)} kcal
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">{copy.planner.cards.target}</p>
          <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
            {formatCalories(locale, calorieResult.targetCalories)} kcal
          </p>
          <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
            {copy.planner.cards.adjustment} {Math.round(calorieResult.goalAdjustmentPercent * 100)}%
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">{copy.planner.cards.optimizerFocus}</p>
          <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
            {copy.planner.cards.budgetVsNutrition}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-[color:var(--text-primary)]">{copy.planner.topMatchesTitle}</h3>
        <div className="mt-3 rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => {
              setCurrentPage(1);
              setSearchQuery(event.target.value);
            }}
            placeholder={copy.planner.searchPlaceholder}
            className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-secondary)]"
          />
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {paginatedRecommendations.map((entry) => (
            <article
              key={entry.food.id}
              className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-semibold text-[color:var(--text-primary)]">{entry.food.foodName}</h4>
                  <p className="text-xs text-[color:var(--text-secondary)]">{entry.food.state}</p>
                </div>
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5 text-xs text-[color:var(--text-secondary)]">
                  {copy.planner.score} {entry.score.toFixed(2)}
                </span>
              </div>
              <p className="mt-2 text-xs text-[color:var(--text-secondary)]">{entry.reason}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-[color:var(--text-secondary)]">
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5">{copy.calories}: {formatCalories(locale, entry.food.calories)}</span>
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5">{copy.nutrientLabels.protein} {formatGrams(locale, entry.food.macros.protein)}g</span>
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5">{copy.nutrientLabels.carbs} {formatGrams(locale, entry.food.macros.carbs)}g</span>
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5">{copy.nutrientLabels.fats} {formatGrams(locale, entry.food.macros.fats)}g</span>
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5">{copy.planner.affordability} {entry.food.affordabilityScore}/5</span>
              </div>
            </article>
          ))}

          {paginatedRecommendations.length === 0 ? (
            <div className="col-span-full rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-4 text-sm text-[color:var(--text-secondary)]">
              {copy.planner.noResults}
            </div>
          ) : null}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[color:var(--text-secondary)]">
          <span>
            {copy.planner.showing} {(currentPageSafe - 1) * pageSize + (paginatedRecommendations.length > 0 ? 1 : 0)}-
            {(currentPageSafe - 1) * pageSize + paginatedRecommendations.length} / {filteredRecommendations.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPageSafe <= 1}
              className="rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-1 disabled:opacity-40"
            >
              {copy.planner.previous}
            </button>
            <span>{copy.planner.page} {currentPageSafe} / {totalPages}</span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPageSafe >= totalPages}
              className="rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-1 disabled:opacity-40"
            >
              {copy.planner.next}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
