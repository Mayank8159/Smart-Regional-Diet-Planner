export type MacroKey = "protein" | "carbs" | "fats";

export type MealTime = "breakfast" | "lunch" | "dinner" | "snack";
export type MealTimeFilter = MealTime | "all";

export type MacroNutrients = {
  protein: number;
  carbs: number;
  fats: number;
};

export type RegionalMealOption = {
  id: string;
  name: string;
  region: string;
  calories: number;
  macros: MacroNutrients;
};

export type RegionalMeal = {
  id: string;
  name: string;
  region: string;
  mealTime: MealTime;
  calories: number;
  macros: MacroNutrients;
  alternatives: RegionalMealOption[];
};

export type MacroTargets = MacroNutrients & {
  calories: number;
};
