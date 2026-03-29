import { regionalFoodDatabase, type RegionKey, type RegionalFood } from "@/lib/regional-food-db";

export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "athlete";
export type Gender = "male" | "female" | "other";
export type GoalMode = "fat-loss" | "maintain" | "gain";

export type UserProfile = {
  age: number;
  gender: Gender;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
  region: RegionKey;
  goalMode: GoalMode;
};

export type PlannerRecommendation = {
  food: RegionalFood;
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

const regionPriorityKeywords: Record<RegionKey, string[]> = {
  "west-bengal": ["fish", "rice"],
  kashmir: ["walnut", "yogurt", "mutton", "dairy"],
  "south-india": ["idli", "appam", "sambar", "curd"],
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

function regionPriorityBoost(foodName: string, region: RegionKey): number {
  const lower = foodName.toLowerCase();
  const keywords = regionPriorityKeywords[region];

  if (keywords.some((keyword) => lower.includes(keyword))) {
    return 1;
  }

  return 0;
}

export function optimizeFoods(profile: UserProfile, limit = 5): PlannerRecommendation[] {
  const recommendations = regionalFoodDatabase.map((food) => {
    const nutritionDensity = (food.macros.protein * 4 + food.macros.carbs * 1.25 + food.macros.fats * 1.5) / food.calories;
    const budgetScore = (6 - food.affordabilityScore) / 5;
    const availability = food.regionalAvailability[profile.region];
    const priority = regionPriorityBoost(food.name, profile.region);

    const score = nutritionDensity * 0.45 + budgetScore * 0.25 + availability * 0.2 + priority * 0.1;

    const reasonParts = [
      `availability ${Math.round(availability * 100)}%`,
      `affordability ${food.affordabilityScore}/5`,
      priority > 0 ? "regional priority match" : "balanced macro value",
    ];

    return {
      food,
      score,
      reason: reasonParts.join(" • "),
    };
  });

  return recommendations.sort((a, b) => b.score - a.score).slice(0, limit);
}
