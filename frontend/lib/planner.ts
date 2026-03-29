import { stateFoodDatabase, type IndianStateName, type StateFoodItem } from "@/lib/state-food-data";

export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "athlete";
export type Gender = "male" | "female" | "other";
export type GoalMode = "fat-loss" | "maintain" | "gain";

export type UserProfile = {
  age: number;
  gender: Gender;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
  region: IndianStateName;
  goalMode: GoalMode;
};

export type OptimizerFood = StateFoodItem & {
  affordabilityScore: 1 | 2 | 3 | 4 | 5;
};

export type PlannerRecommendation = {
  food: OptimizerFood;
  score: number;
  reason: string;
};

const activityMultiplier: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
};

const goalAdjustments: Record<GoalMode, number> = {
  "fat-loss": -0.18,
  maintain: 0,
  gain: 0.12,
};

const statePriorityKeywords: Partial<Record<IndianStateName, string[]>> = {
  "West Bengal": ["fish", "rice"],
  "Tamil Nadu": ["idli", "sambar", "curd", "dosa"],
  "Kerala": ["fish", "curd", "appam"],
  "Karnataka": ["idli", "dosa", "upma"],
  "Andhra Pradesh": ["rice", "fish", "egg"],
  Telangana: ["rice", "egg", "chicken"],
};

function genderOffset(gender: Gender): number {
  if (gender === "male") {
    return 5;
  }

  if (gender === "female") {
    return -161;
  }

  return -78;
}

export function calculateCalorieTarget(profile: UserProfile): {
  bmr: number;
  maintenanceCalories: number;
  targetCalories: number;
  goalAdjustmentPercent: number;
} {
  const bmr =
    10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age + genderOffset(profile.gender);

  const maintenanceCalories = bmr * activityMultiplier[profile.activityLevel];
  const goalAdjustmentPercent = goalAdjustments[profile.goalMode];
  const targetCalories = maintenanceCalories * (1 + goalAdjustmentPercent);

  return {
    bmr: Math.round(bmr),
    maintenanceCalories: Math.round(maintenanceCalories),
    targetCalories: Math.round(targetCalories),
    goalAdjustmentPercent,
  };
}

function deriveAffordabilityScore(food: StateFoodItem): 1 | 2 | 3 | 4 | 5 {
  if (food.calories <= 190) {
    return 1;
  }

  if (food.calories <= 250) {
    return 2;
  }

  if (food.calories <= 320) {
    return 3;
  }

  if (food.calories <= 380) {
    return 4;
  }

  return 5;
}

function regionPriorityBoost(foodName: string, region: IndianStateName): number {
  const lower = foodName.toLowerCase();
  const keywords = statePriorityKeywords[region] ?? [];

  if (keywords.some((keyword) => lower.includes(keyword))) {
    return 1;
  }

  return 0;
}

export function optimizeFoods(profile: UserProfile, limit?: number): PlannerRecommendation[] {
  const foodsInSelectedState = stateFoodDatabase.filter((food) => food.state === profile.region);

  const recommendations = foodsInSelectedState.map((food) => {
    const affordabilityScore = deriveAffordabilityScore(food);
    const nutritionDensity = (food.macros.protein * 4 + food.macros.carbs * 1.25 + food.macros.fats * 1.5) / food.calories;
    const budgetScore = (6 - affordabilityScore) / 5;
    const priority = regionPriorityBoost(food.foodName, profile.region);

    const score = nutritionDensity * 0.6 + budgetScore * 0.3 + priority * 0.1;

    const reasonParts = [
      `state ${food.state}`,
      `affordability ${affordabilityScore}/5`,
      priority > 0 ? "regional priority match" : "balanced macro value",
    ];

    return {
      food: {
        ...food,
        affordabilityScore,
      },
      score,
      reason: reasonParts.join(" • "),
    };
  });

  const sorted = recommendations.sort((a, b) => b.score - a.score);

  if (typeof limit === "number") {
    return sorted.slice(0, limit);
  }

  return sorted;
}
