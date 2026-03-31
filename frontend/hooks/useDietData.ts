"use client";

import { useCallback, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { MealTimeFilter, RegionalMeal, MacroTargets } from "@/components/diet/types";

function getLocalizedMealName(meal: RegionalMeal, locale: Locale): string {
  const key = `name_${locale}` as keyof RegionalMeal;
  if (key in meal && typeof meal[key] === 'string') {
    return meal[key] as string;
  }
  return meal.name;
}

function localizeMeals(meals: RegionalMeal[], locale: Locale): (RegionalMeal & { displayName: string })[] {
  return meals.map(meal => ({
    ...meal,
    displayName: getLocalizedMealName(meal, locale),
  }));
}

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
    name_hi: "पान्ता भात कटोरी",
    name_bn: "পান্তা ভাত বাটি",
    region: "Bengali",
    mealTime: "breakfast",
    calories: 370,
    macros: { protein: 18, carbs: 46, fats: 9 },
    alternatives: [
      { id: "breakfast-alt-1", name: "Chirer Polao", name_hi: "चिरे पोलाओ", name_bn: "চিড়ে পোলাও", region: "Bengali", calories: 340, macros: { protein: 14, carbs: 42, fats: 10 } },
      { id: "breakfast-alt-2", name: "Ragi Idli Plate", name_hi: "रागी इडली प्लेट", name_bn: "রাগি ইডলি প্লেট", region: "South Indian", calories: 320, macros: { protein: 16, carbs: 38, fats: 8 } },
    ],
  },
  {
    id: "lunch",
    name: "Aloo Paratha + Curd",
    name_hi: "आलू पराठा + दही",
    name_bn: "আলু পরাঠা + দই",
    region: "Punjabi",
    mealTime: "lunch",
    calories: 620,
    macros: { protein: 20, carbs: 52, fats: 14 },
    alternatives: [
      { id: "lunch-alt-1", name: "Bajra Khichdi", name_hi: "बाजरा खिचड़ी", name_bn: "বাজরা খিচুড়ি", region: "Rajasthani", calories: 550, macros: { protein: 22, carbs: 44, fats: 12 } },
      { id: "lunch-alt-2", name: "Jowar Bhakri Thali", name_hi: "ज्वार भाकरी थाली", name_bn: "জোয়ার ভাকরি থালি", region: "Maharashtrian", calories: 530, macros: { protein: 24, carbs: 40, fats: 11 } },
    ],
  },
  {
    id: "dinner",
    name: "Millet Veg Pulao",
    name_hi: "बाजरा सब्जी पुलाव",
    name_bn: "বাজরা সবজি পুলাও",
    region: "Deccan",
    mealTime: "dinner",
    calories: 510,
    macros: { protein: 17, carbs: 34, fats: 10 },
    alternatives: [
      { id: "dinner-alt-1", name: "Appam + Stew", name_hi: "अप्पम + स्टू", name_bn: "অ্যাপাম + স্টু", region: "Kerala", calories: 480, macros: { protein: 19, carbs: 36, fats: 9 } },
      { id: "dinner-alt-2", name: "Dal Dhokli", name_hi: "दाल ढोकली", name_bn: "ডাল ঢোকলি", region: "Gujarati", calories: 500, macros: { protein: 21, carbs: 39, fats: 10 } },
    ],
  },
  {
    id: "snack",
    name: "Sprouts Chaat",
    name_hi: "अंकुरित अनाज चाट",
    name_bn: "স্প্রাউটস ছাত",
    region: "Pan-India",
    mealTime: "snack",
    calories: 220,
    macros: { protein: 12, carbs: 20, fats: 6 },
    alternatives: [
      { id: "snack-alt-1", name: "Makhana Mix", name_hi: "मखाना मिक्स", name_bn: "মাখানা মিক্स", region: "North Indian", calories: 180, macros: { protein: 8, carbs: 18, fats: 5 } },
      { id: "snack-alt-2", name: "Chana Sundal", name_hi: "चना सुंडल", name_bn: "ছানা সুন্ডাল", region: "South Indian", calories: 210, macros: { protein: 10, carbs: 22, fats: 4 } },
    ],
  },
];

function filterMealsByTime(meals: RegionalMeal[], mealTimeFilter: MealTimeFilter): RegionalMeal[] {
  if (mealTimeFilter === "all") {
    return meals;
  }
  return meals.filter((meal) => meal.mealTime === mealTimeFilter);
}

export function useDietMeals(locale: Locale, mealTimeFilter: MealTimeFilter) {
  const [swappedMeals, setSwappedMeals] = useState<Record<string, RegionalMeal>>({});
  
  const filteredMeals = useMemo(() => {
    const baseMeals = filterMealsByTime(fallbackMeals, mealTimeFilter);
    return baseMeals.map(meal => swappedMeals[meal.id] || meal);
  }, [mealTimeFilter, swappedMeals]);
  
  const localizedMeals = useMemo(
    () => localizeMeals(filteredMeals, locale),
    [filteredMeals, locale]
  );
  
  const swapMeal = useCallback((mealId: string, alternative: any) => {
    setSwappedMeals(prev => ({
      ...prev,
      [mealId]: {
        ...fallbackMeals.find(m => m.id === mealId)!,
        name: alternative.name,
        name_hi: alternative.name_hi,
        name_bn: alternative.name_bn,
        region: alternative.region,
        calories: alternative.calories,
        macros: alternative.macros,
      },
    }));
  }, []);
  
  return useMemo(
    () => ({
      data: localizedMeals,
      isLoading: false,
      error: null,
      mutate: async () => {},
      swapMeal,
    }),
    [localizedMeals, swapMeal]
  );
}

export function useMacroTargets(locale: Locale) {
  return useMemo(
    () => ({
      data: fallbackTargets,
      isLoading: false,
      error: null,
      mutate: async () => {},
    }),
    []
  );
}
