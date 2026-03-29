"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sunrise, Utensils, Moon, Leaf, Cookie, RotateCcw, AlertTriangle } from "lucide-react";
import { CalorieGoalCards } from "./CalorieGoalCards";
import { MacroNutrientTracker } from "./MacroNutrientTracker";
import { RegionalMealCard } from "./RegionalMealCard";
import { SmartSwapToggle } from "./SmartSwapToggle";
import { UserProfilePlanner } from "./UserProfilePlanner";
import { useDietUiStore } from "@/store/useDietUiStore";
import { useDietMeals, useMacroTargets } from "@/hooks/useDietData";
import { copyByLocale, locales, type Locale } from "@/lib/i18n";
import { swapMealByAlternative } from "@/lib/diet-api";
import type { MealTimeFilter, RegionalMealOption } from "./types";

const mealIcons = {
  breakfast: Sunrise,
  lunch: Utensils,
  dinner: Moon,
  snack: Cookie,
} as const;

const mealTimeOptions: MealTimeFilter[] = ["all", "breakfast", "lunch", "dinner", "snack"];

type DietDashboardProps = {
  locale: Locale;
};

export function DietDashboard({ locale }: DietDashboardProps) {
  const copy = copyByLocale[locale];
  const [swappingMealId, setSwappingMealId] = useState<string | null>(null);
  const mealTimeFilter = useDietUiStore((state) => state.mealTimeFilter);
  const setMealTimeFilter = useDietUiStore((state) => state.setMealTimeFilter);
  const smartSwapOpenByMealId = useDietUiStore((state) => state.smartSwapOpenByMealId);
  const toggleSmartSwap = useDietUiStore((state) => state.toggleSmartSwap);
  const closeSmartSwap = useDietUiStore((state) => state.closeSmartSwap);
  const {
    data: meals = [],
    isLoading: mealsLoading,
    error: mealsError,
    mutate: mutateMeals,
  } = useDietMeals(locale, mealTimeFilter);
  const { data: macroTargets } = useMacroTargets(locale);

  const targets = macroTargets ?? { protein: 95, carbs: 180, fats: 55, calories: 1900 };

  const consumed = useMemo(
    () =>
      meals.reduce(
        (totals, meal) => ({
          protein: totals.protein + meal.macros.protein,
          carbs: totals.carbs + meal.macros.carbs,
          fats: totals.fats + meal.macros.fats,
        }),
        { protein: 0, carbs: 0, fats: 0 },
      ),
    [meals],
  );

  const consumedCalories = useMemo(
    () => meals.reduce((total, meal) => total + meal.calories, 0),
    [meals],
  );

  async function handleSmartSwap(mealId: string, option: RegionalMealOption) {
    setSwappingMealId(mealId);
    closeSmartSwap(mealId);

    await mutateMeals(
      async (currentMeals) => {
        const optimisticMeals = (currentMeals ?? []).map((meal) =>
          meal.id === mealId
            ? {
                ...meal,
                name: option.name,
                region: option.region,
                calories: option.calories,
                macros: option.macros,
              }
            : meal,
        );

        try {
          const swappedMeal = await swapMealByAlternative(locale, mealId, option.id);
          return optimisticMeals.map((meal) => (meal.id === mealId ? swappedMeal : meal));
        } catch {
          return optimisticMeals;
        } finally {
          setSwappingMealId(null);
        }
      },
      {
        optimisticData: (currentMeals) =>
          (currentMeals ?? []).map((meal) =>
            meal.id === mealId
              ? {
                  ...meal,
                  name: option.name,
                  region: option.region,
                  calories: option.calories,
                  macros: option.macros,
                }
              : meal,
          ),
        rollbackOnError: true,
        revalidate: true,
      },
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-6 rounded-3xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] p-6 shadow-[0_20px_60px_rgba(53,71,58,0.14)] backdrop-blur-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-1 text-xs font-medium tracking-wide text-[color:var(--text-secondary)]">
              <Leaf className="h-3.5 w-3.5 text-[color:var(--accent)]" />
              {copy.appBadge}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">{copy.dashboardTitle}</h1>
            <p className="mt-2 max-w-2xl text-sm text-[color:var(--text-secondary)] sm:text-base">
              {copy.dashboardSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-2 py-1 text-xs font-medium text-[color:var(--text-secondary)]">
            <span>{copy.localeLabel}:</span>
            {locales.map((routeLocale) => (
              <Link
                key={routeLocale}
                href={`/${routeLocale}`}
                className={`rounded-full px-2 py-1 transition ${
                  routeLocale === locale
                    ? "bg-[color:var(--accent)] text-white"
                    : "bg-[color:var(--glass-bg-strong)] text-[color:var(--text-secondary)] hover:brightness-105"
                }`}
              >
                {routeLocale.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.03 }}
      >
        <UserProfilePlanner locale={locale} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        <CalorieGoalCards
          locale={locale}
          consumed={consumedCalories}
          target={targets.calories}
          labels={{
            title: copy.todayCalorieGoals,
            consumed: copy.consumed,
            target: copy.target,
            remaining: copy.remaining,
            updatedOn: copy.updatedOn,
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6"
      >
        <MacroNutrientTracker
          locale={locale}
          target={targets}
          consumed={consumed}
          copy={{
            title: copy.macroTrackerTitle,
            subtitle: copy.macroTrackerSubtitle,
            totalRemaining: copy.totalRemaining,
            remaining: copy.remaining,
          }}
        />
      </motion.div>

      <div className="mt-6 flex flex-wrap gap-2">
        {mealTimeOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMealTimeFilter(option)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              mealTimeFilter === option
                ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                : "border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] text-[color:var(--text-secondary)] hover:brightness-105"
            }`}
          >
            {copy.mealTimes[option]}
          </button>
        ))}
      </div>

      {mealsError ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--surface-warning-border)] bg-[color:var(--surface-warning)] px-4 py-3 text-sm text-[color:var(--text-primary)]">
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {copy.errorLoadingMeals}
          </span>
          <button
            type="button"
            onClick={() => void mutateMeals()}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-1.5 text-xs font-medium text-[color:var(--text-primary)] hover:brightness-105"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {copy.retry}
          </button>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {mealsLoading ? (
          <div className="col-span-full rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] p-5 text-sm text-[color:var(--text-secondary)]">
            {copy.loading}
          </div>
        ) : null}

        {meals.map((meal, index) => {
          const MealIcon = mealIcons[meal.mealTime] ?? Utensils;

          return (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--text-secondary)]">
                <MealIcon className="h-4 w-4 text-[color:var(--accent-soft)]" />
                {copy.mealTimes[meal.mealTime]}
              </div>
              <RegionalMealCard
                locale={locale}
                mealName={meal.name}
                regionalTag={meal.region}
                macros={meal.macros}
                calories={meal.calories}
                caloriesLabel={copy.calories}
                mealTimeLabel={copy.mealTimes[meal.mealTime]}
              />
              <SmartSwapToggle
                open={Boolean(smartSwapOpenByMealId[meal.id])}
                onToggle={() => toggleSmartSwap(meal.id)}
                title={copy.smartSwap}
                showLabel={copy.showAlternatives}
                hideLabel={copy.hideAlternatives}
                isSwapping={swappingMealId === meal.id}
                alternatives={meal.alternatives}
                onSelectAlternative={(option) => void handleSmartSwap(meal.id, option)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
