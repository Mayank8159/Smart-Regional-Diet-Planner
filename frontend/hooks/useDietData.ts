"use client";

import useSWR from "swr";
import type { Locale } from "@/lib/i18n";
import type { MealTimeFilter } from "@/components/diet/types";
import { dietFallbackData, fetchMeals, fetchTargets } from "@/lib/diet-api";

export function useDietMeals(locale: Locale, mealTimeFilter: MealTimeFilter) {
  return useSWR(
    ["diet-meals", locale, mealTimeFilter],
    () => fetchMeals(locale, mealTimeFilter),
    {
      fallbackData: dietFallbackData.filterMealsByTime(dietFallbackData.meals, mealTimeFilter),
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );
}

export function useMacroTargets(locale: Locale) {
  return useSWR(["macro-targets", locale], () => fetchTargets(locale), {
    fallbackData: dietFallbackData.targets,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
}
