import type { Locale } from "@/lib/i18n";
import type {
  MacroTargets,
  MealTime,
  MealTimeFilter,
  RegionalMeal,
  RegionalMealOption,
} from "@/components/diet/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

const fallbackTargets: MacroTargets = {
  protein: 95,
  carbs: 180,
  fats: 55,
  calories: 1900,
};

const fallbackMeals: RegionalMeal[] = [
  {
    id: "breakfast",
    name: "Panta Bhat Bowl",
    region: "Bengali",
    mealTime: "breakfast",
    calories: 370,
    macros: { protein: 18, carbs: 46, fats: 9 },
    alternatives: [
      { id: "breakfast-alt-1", name: "Chirer Polao", region: "Bengali", calories: 340, macros: { protein: 14, carbs: 42, fats: 10 } },
      { id: "breakfast-alt-2", name: "Ragi Idli Plate", region: "South Indian", calories: 320, macros: { protein: 16, carbs: 38, fats: 8 } },
    ],
  },
  {
    id: "lunch",
    name: "Aloo Paratha + Curd",
    region: "Punjabi",
    mealTime: "lunch",
    calories: 620,
    macros: { protein: 20, carbs: 52, fats: 14 },
    alternatives: [
      { id: "lunch-alt-1", name: "Bajra Khichdi", region: "Rajasthani", calories: 550, macros: { protein: 22, carbs: 44, fats: 12 } },
      { id: "lunch-alt-2", name: "Jowar Bhakri Thali", region: "Maharashtrian", calories: 530, macros: { protein: 24, carbs: 40, fats: 11 } },
    ],
  },
  {
    id: "dinner",
    name: "Millet Veg Pulao",
    region: "Deccan",
    mealTime: "dinner",
    calories: 510,
    macros: { protein: 17, carbs: 34, fats: 10 },
    alternatives: [
      { id: "dinner-alt-1", name: "Appam + Stew", region: "Kerala", calories: 480, macros: { protein: 19, carbs: 36, fats: 9 } },
      { id: "dinner-alt-2", name: "Dal Dhokli", region: "Gujarati", calories: 500, macros: { protein: 21, carbs: 39, fats: 10 } },
    ],
  },
  {
    id: "snack",
    name: "Sprouts Chaat",
    region: "Pan-India",
    mealTime: "snack",
    calories: 220,
    macros: { protein: 12, carbs: 20, fats: 6 },
    alternatives: [
      { id: "snack-alt-1", name: "Makhana Mix", region: "North Indian", calories: 180, macros: { protein: 8, carbs: 18, fats: 5 } },
      { id: "snack-alt-2", name: "Chana Sundal", region: "South Indian", calories: 210, macros: { protein: 10, carbs: 22, fats: 4 } },
    ],
  },
];

type UnknownRecord = Record<string, unknown>;

function toRecord(value: unknown): UnknownRecord {
  return typeof value === "object" && value !== null ? (value as UnknownRecord) : {};
}

function pickValue(record: UnknownRecord, keys: string[]): unknown {
  for (const key of keys) {
    if (record[key] !== undefined) {
      return record[key];
    }
  }
  return undefined;
}

function pickString(record: UnknownRecord, keys: string[], fallback: string): string {
  const value = pickValue(record, keys);
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function pickNumber(record: UnknownRecord, keys: string[], fallback: number): number {
  const value = pickValue(record, keys);
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function pickArray(record: UnknownRecord, keys: string[]): unknown[] {
  const value = pickValue(record, keys);
  return Array.isArray(value) ? value : [];
}

function normalizeMealTime(value: unknown): MealTime {
  const text = String(value ?? "").toLowerCase();

  if (text.includes("breakfast")) {
    return "breakfast";
  }

  if (text.includes("dinner") || text.includes("supper")) {
    return "dinner";
  }

  if (text.includes("snack")) {
    return "snack";
  }

  return "lunch";
}

function resolveLocalizedName(record: UnknownRecord, locale: Locale, fallback: string): string {
  const directKeyValue = pickValue(record, [
    `name_${locale}`,
    `meal_name_${locale}`,
    `title_${locale}`,
  ]);

  if (typeof directKeyValue === "string" && directKeyValue.trim().length > 0) {
    return directKeyValue;
  }

  const localizedContainer = pickValue(record, ["localized_names", "localizedNames", "translations", "names"]);
  const localizedRecord = toRecord(localizedContainer);
  const localizedName = localizedRecord[locale];

  if (typeof localizedName === "string" && localizedName.trim().length > 0) {
    return localizedName;
  }

  return pickString(record, ["name", "meal_name", "title", "mealName"], fallback);
}

function normalizeMacros(record: UnknownRecord, fallback: { protein: number; carbs: number; fats: number }) {
  const nestedMacros = toRecord(pickValue(record, ["macros", "macro_targets", "macroTargets", "nutrients"]));
  const macroSource = Object.keys(nestedMacros).length > 0 ? nestedMacros : record;

  return {
    protein: pickNumber(macroSource, ["protein", "protein_g", "proteinGrams"], fallback.protein),
    carbs: pickNumber(macroSource, ["carbs", "carbohydrates", "carbs_g", "carbohydrates_g", "carbGrams"], fallback.carbs),
    fats: pickNumber(macroSource, ["fats", "fat", "fats_g", "fat_g", "fatGrams"], fallback.fats),
  };
}

function normalizeOption(input: unknown, locale: Locale): RegionalMealOption {
  const option = toRecord(input);
  return {
    id: pickString(option, ["id", "meal_id", "mealId"], crypto.randomUUID()),
    name: resolveLocalizedName(option, locale, "Regional Alternative"),
    region: pickString(option, ["region", "regional_tag", "regionalTag", "cuisine"], "India"),
    calories: pickNumber(option, ["calories", "calorie", "kcal", "calorie_count", "calorieCount"], 250),
    macros: normalizeMacros(option, { protein: 0, carbs: 0, fats: 0 }),
  };
}

function normalizeMeal(input: unknown, locale: Locale): RegionalMeal {
  const meal = toRecord(input);

  return {
    id: pickString(meal, ["id", "meal_id", "mealId"], crypto.randomUUID()),
    name: resolveLocalizedName(meal, locale, "Regional Meal"),
    region: pickString(meal, ["region", "regional_tag", "regionalTag", "cuisine"], "India"),
    mealTime: normalizeMealTime(pickValue(meal, ["meal_time", "mealTime", "meal_type", "mealType"])),
    calories: pickNumber(meal, ["calories", "calorie", "kcal", "calorie_count", "calorieCount"], 350),
    macros: normalizeMacros(meal, { protein: 0, carbs: 0, fats: 0 }),
    alternatives: pickArray(meal, ["alternatives", "alternative_meals", "alternativeMeals"]).map((item) =>
      normalizeOption(item, locale),
    ),
  };
}

function buildUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

function filterMealsByTime(meals: RegionalMeal[], mealTimeFilter: MealTimeFilter): RegionalMeal[] {
  if (mealTimeFilter === "all") {
    return meals;
  }
  return meals.filter((meal) => meal.mealTime === mealTimeFilter);
}

export async function fetchMeals(locale: Locale, mealTimeFilter: MealTimeFilter): Promise<RegionalMeal[]> {
  const mealTimeQuery = mealTimeFilter === "all" ? "" : `&meal_time=${mealTimeFilter}`;
  const url = buildUrl(`/diet/meals?locale=${locale}${mealTimeQuery}`);
  const response = await fetch(url, { cache: "no-store" });
  const payload = await parseJson<unknown>(response);
  const payloadRecord = toRecord(payload);

  const meals = Array.isArray(payload)
    ? payload
    : pickArray(payloadRecord, ["meals", "items", "data", "diet_meals", "dietMeals"]);

  return meals.map((meal) => normalizeMeal(meal, locale));
}

export async function fetchTargets(locale: Locale): Promise<MacroTargets> {
  const response = await fetch(buildUrl(`/diet/macros/target?locale=${locale}`), { cache: "no-store" });

  const payload = await parseJson<unknown>(response);
  const payloadRecord = toRecord(payload);
  const nestedTargetRecord = toRecord(
    pickValue(payloadRecord, ["targets", "macro_targets", "macroTargets", "data"]),
  );
  const source = Object.keys(nestedTargetRecord).length > 0 ? nestedTargetRecord : payloadRecord;

  const normalizedMacros = normalizeMacros(source, fallbackTargets);

  return {
    ...normalizedMacros,
    calories: pickNumber(
      source,
      ["calories", "calorie", "kcal", "calories_target", "target_calories", "targetCalories"],
      fallbackTargets.calories,
    ),
  };
}

export async function swapMealByAlternative(
  locale: Locale,
  mealId: string,
  alternativeId: string,
): Promise<RegionalMeal> {
  const response = await fetch(buildUrl(`/diet/meals/${mealId}/swap?locale=${locale}`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ alternative_id: alternativeId }),
  });
  const payload = await parseJson<unknown>(response);
  const payloadRecord = toRecord(payload);
  const swappedMeal = pickValue(payloadRecord, ["meal", "swapped_meal", "swappedMeal", "data"]);

  return normalizeMeal(swappedMeal ?? payload, locale);
}

export const dietFallbackData = {
  meals: fallbackMeals,
  targets: fallbackTargets,
  filterMealsByTime,
};
