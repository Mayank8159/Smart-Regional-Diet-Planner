import type { Locale } from "@/lib/i18n";
import type { MacroTargets, MealTimeFilter, RegionalMeal, RegionalMealOption } from "@/components/diet/types";

// Legacy compatibility shim: app now uses local state-food data directly.
const fallbackTargets: MacroTargets = {
  protein: 95,
  carbs: 180,
  fats: 55,
  calories: 1900,
};

const fallbackMeals: RegionalMeal[] = [];

function filterMealsByTime(meals: RegionalMeal[], mealTimeFilter: MealTimeFilter): RegionalMeal[] {
  if (mealTimeFilter === "all") {
    return meals;
  }
  return meals.filter((meal) => meal.mealTime === mealTimeFilter);
}

export async function fetchMeals(_locale: Locale, mealTimeFilter: MealTimeFilter): Promise<RegionalMeal[]> {
  return filterMealsByTime(fallbackMeals, mealTimeFilter);
}

export async function fetchTargets(_locale: Locale): Promise<MacroTargets> {
  return fallbackTargets;
}

export async function swapMealByAlternative(
  _locale: Locale,
  mealId: string,
  alternativeId: string,
): Promise<RegionalMeal> {
  const meal = fallbackMeals.find((item) => item.id === mealId);
  if (!meal) {
    throw new Error("Meal not found in local fallback data.");
  }

  const option = meal.alternatives.find((alt: RegionalMealOption) => alt.id === alternativeId);
  if (!option) {
    return meal;
  }

  return {
    ...meal,
    name: option.name,
    name_hi: option.name_hi,
    name_bn: option.name_bn,
    region: option.region,
    calories: option.calories,
    macros: option.macros,
  };
}

export const dietFallbackData = {
  meals: fallbackMeals,
  targets: fallbackTargets,
  filterMealsByTime,
};
