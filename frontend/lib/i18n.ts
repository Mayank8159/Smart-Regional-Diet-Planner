export const locales = ["en", "hi", "bn"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

type LocaleCopy = {
  appBadge: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  macroTrackerTitle: string;
  macroTrackerSubtitle: string;
  totalRemaining: string;
  mealTimes: Record<"all" | "breakfast" | "lunch" | "dinner" | "snack", string>;
  calories: string;
  consumed: string;
  target: string;
  remaining: string;
  todayCalorieGoals: string;
  updatedOn: string;
  localeLabel: string;
  loading: string;
  errorLoadingMeals: string;
  retry: string;
  smartSwap: string;
  showAlternatives: string;
  hideAlternatives: string;
};

export const copyByLocale: Record<Locale, LocaleCopy> = {
  en: {
    appBadge: "Smart Indian Diet Planner",
    dashboardTitle: "Regional Wellness Dashboard",
    dashboardSubtitle: "Dynamic regional meals with macro intelligence and one-tap Smart Swaps.",
    macroTrackerTitle: "Macro-Nutrient Tracker",
    macroTrackerSubtitle: "Daily total based on Remaining = Target - Sum(Consumed)",
    totalRemaining: "Total Remaining",
    mealTimes: {
      all: "All Meals",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      snack: "Snack",
    },
    calories: "Calories",
    consumed: "Consumed",
    target: "Target",
    remaining: "Remaining",
    todayCalorieGoals: "Today Calorie Goals",
    updatedOn: "Updated",
    localeLabel: "Language",
    loading: "Loading meals...",
    errorLoadingMeals: "Could not load meals from API. Showing fallback plan.",
    retry: "Retry",
    smartSwap: "Smart Swap",
    showAlternatives: "Show alternatives",
    hideAlternatives: "Hide alternatives",
  },
  hi: {
    appBadge: "Smart Bharatiya Diet Planner",
    dashboardTitle: "Regional Wellness Dashboard",
    dashboardSubtitle: "Regional meals with macro intelligence and one-tap Smart Swaps.",
    macroTrackerTitle: "Macro-Nutrient Tracker",
    macroTrackerSubtitle: "Daily total based on Remaining = Target - Sum(Consumed)",
    totalRemaining: "Total Remaining",
    mealTimes: {
      all: "Sabhi Meals",
      breakfast: "Nashta",
      lunch: "Dopehar",
      dinner: "Raat ka khana",
      snack: "Snack",
    },
    calories: "Calories",
    consumed: "Consumed",
    target: "Target",
    remaining: "Remaining",
    todayCalorieGoals: "Aaj ka Calorie Goal",
    updatedOn: "Updated",
    localeLabel: "Bhasha",
    loading: "Meals load ho rahe hain...",
    errorLoadingMeals: "API meals load nahi hue. Fallback plan dikhaya ja raha hai.",
    retry: "Phir se koshish karein",
    smartSwap: "Smart Swap",
    showAlternatives: "Alternatives dikhayein",
    hideAlternatives: "Alternatives chhupayein",
  },
  bn: {
    appBadge: "Smart Bharatiyo Diet Planner",
    dashboardTitle: "Regional Wellness Dashboard",
    dashboardSubtitle: "Regional meals with macro intelligence and one-tap Smart Swaps.",
    macroTrackerTitle: "Macro-Nutrient Tracker",
    macroTrackerSubtitle: "Daily total based on Remaining = Target - Sum(Consumed)",
    totalRemaining: "Total Remaining",
    mealTimes: {
      all: "Shob Meals",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      snack: "Snack",
    },
    calories: "Calories",
    consumed: "Consumed",
    target: "Target",
    remaining: "Remaining",
    todayCalorieGoals: "Aajker Calorie Goal",
    updatedOn: "Updated",
    localeLabel: "Bhasha",
    loading: "Meals load hocche...",
    errorLoadingMeals: "API theke meals aseni. Fallback plan dekhano hocche.",
    retry: "Abar chesta korun",
    smartSwap: "Smart Swap",
    showAlternatives: "Alternatives dekhun",
    hideAlternatives: "Alternatives lukan",
  },
};
