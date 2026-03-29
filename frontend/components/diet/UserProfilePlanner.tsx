"use client";

import { useMemo, useState } from "react";
import { formatCalories, formatGrams } from "@/lib/formatters";
import type { Locale } from "@/lib/i18n";
import {
  calculateCalorieTarget,
  optimizeFoods,
  type ActivityLevel,
  type GoalMode,
  type Gender,
  type UserProfile,
} from "@/lib/planner";
import type { RegionKey } from "@/lib/regional-food-db";

type UserProfilePlannerProps = {
  locale: Locale;
};

const activityOptions: Array<{ value: ActivityLevel; label: string }> = [
  { value: "sedentary", label: "Sedentary" },
  { value: "light", label: "Lightly Active" },
  { value: "moderate", label: "Moderately Active" },
  { value: "active", label: "Very Active" },
  { value: "athlete", label: "Athlete" },
];

const regionOptions: Array<{ value: RegionKey; label: string }> = [
  { value: "west-bengal", label: "West Bengal" },
  { value: "kashmir", label: "Kashmir" },
  { value: "south-india", label: "South India" },
];

const goalModeOptions: Array<{ value: GoalMode; label: string }> = [
  { value: "fat-loss", label: "Fat Loss" },
  { value: "maintain", label: "Maintain" },
  { value: "gain", label: "Gain" },
];

const defaultProfile: UserProfile = {
  age: 27,
  gender: "male",
  weightKg: 70,
  heightCm: 170,
  activityLevel: "moderate",
  region: "west-bengal",
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
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const calorieResult = useMemo(() => calculateCalorieTarget(profile), [profile]);
  const recommendations = useMemo(() => optimizeFoods(profile, 6), [profile]);

  return (
    <section className="mt-6 rounded-3xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] p-5 shadow-[0_10px_35px_rgba(50,80,60,0.12)] backdrop-blur-xl">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">User Profile Form</h2>
        <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
          Calculates calories using Mifflin-St Jeor and runs a Budget vs Nutrition optimizer by region.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <FieldLabel>Age</FieldLabel>
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
          <FieldLabel>Gender</FieldLabel>
          <InputShell>
            <select
              className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none"
              value={profile.gender}
              onChange={(event) =>
                setProfile((state) => ({ ...state, gender: event.target.value as Gender }))
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </InputShell>
        </div>

        <div>
          <FieldLabel>Weight (kg)</FieldLabel>
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
          <FieldLabel>Height (cm)</FieldLabel>
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
          <FieldLabel>Activity Level</FieldLabel>
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
          <FieldLabel>Region</FieldLabel>
          <InputShell>
            <select
              className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none"
              value={profile.region}
              onChange={(event) =>
                setProfile((state) => ({ ...state, region: event.target.value as RegionKey }))
              }
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
          <FieldLabel>Goal Mode</FieldLabel>
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
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">BMR</p>
          <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
            {formatCalories(locale, calorieResult.bmr)} kcal
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">Maintenance Calories</p>
          <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
            {formatCalories(locale, calorieResult.maintenanceCalories)} kcal
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">Target Calories</p>
          <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
            {formatCalories(locale, calorieResult.targetCalories)} kcal
          </p>
          <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
            Adjustment {Math.round(calorieResult.goalAdjustmentPercent * 100)}%
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">Optimizer Focus</p>
          <p className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
            Budget vs Nutrition
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-[color:var(--text-primary)]">Regional Intelligence Engine (Top Matches)</h3>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {recommendations.map((entry) => (
            <article
              key={entry.food.id}
              className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-semibold text-[color:var(--text-primary)]">{entry.food.name}</h4>
                  <p className="text-xs text-[color:var(--text-secondary)]">{entry.food.regionTag}</p>
                </div>
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5 text-xs text-[color:var(--text-secondary)]">
                  Score {entry.score.toFixed(2)}
                </span>
              </div>
              <p className="mt-2 text-xs text-[color:var(--text-secondary)]">{entry.reason}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-[color:var(--text-secondary)]">
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5">Calories: {formatCalories(locale, entry.food.calories)}</span>
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5">P {formatGrams(locale, entry.food.macros.protein)}g</span>
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5">C {formatGrams(locale, entry.food.macros.carbs)}g</span>
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5">F {formatGrams(locale, entry.food.macros.fats)}g</span>
                <span className="rounded-full bg-[color:var(--glass-bg)] px-2 py-0.5">Affordability {entry.food.affordabilityScore}/5</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
