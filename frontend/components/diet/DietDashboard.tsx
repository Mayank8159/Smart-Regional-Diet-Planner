"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, MapPin, Plus, Target, UtensilsCrossed, Sparkles } from "lucide-react";
import { formatCalories, formatGrams, formatNumber } from "@/lib/formatters";
import { copyByLocale, locales, type Locale } from "@/lib/i18n";
import { INDIAN_STATES, stateFoodDatabase, type IndianStateName, type StateFoodItem } from "@/lib/state-food-data";

type GoalMode = "weight-loss" | "maintain" | "muscle-gain";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active";
type Gender = "male" | "female" | "other";
type MealSlot = "breakfast" | "lunch" | "snack" | "dinner";
type DietPreference = "all" | "veg" | "egg" | "non-veg" | "jain";
type PortionMultiplier = 0.5 | 1 | 1.5 | 2;
type MacroPresetKey = "high-protein-fat-loss" | "balanced-maintenance" | "lean-bulk" | "custom";

type ProfileState = {
  age: number;
  weightKg: number;
  heightCm: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  goalMode: GoalMode;
  location: IndianStateName;
};

type PlannedMeal = {
  id: string;
  slot: MealSlot;
  item: StateFoodItem;
  multiplier: PortionMultiplier;
};

type MacroSplit = {
  protein: number;
  carbs: number;
  fats: number;
};

type AllergiesState = {
  nuts: boolean;
  dairy: boolean;
  gluten: boolean;
};

type FoodMeta = {
  diet: "veg" | "egg" | "non-veg";
  jainFriendly: boolean;
  allergens: { nuts: boolean; dairy: boolean; gluten: boolean };
  affordability: 1 | 2 | 3 | 4 | 5;
};

type PersistedPlannerState = {
  profile: ProfileState;
  selectedSlot: MealSlot;
  selectedMultiplier: PortionMultiplier;
  macroPreset: MacroPresetKey;
  macroSplit: MacroSplit;
  dietPreference: DietPreference;
  allergies: AllergiesState;
  dislikedInput: string;
  affordabilityMode: boolean;
  mealPlan: PlannedMeal[];
};

const PLANNER_STORAGE_KEY = "diet-planner-v1";

const macroPresets: Record<Exclude<MacroPresetKey, "custom">, { label: string; split: MacroSplit; goal: GoalMode }> = {
  "high-protein-fat-loss": {
    label: "High-Protein Fat Loss",
    split: { protein: 40, carbs: 30, fats: 30 },
    goal: "weight-loss",
  },
  "balanced-maintenance": {
    label: "Balanced Maintenance",
    split: { protein: 30, carbs: 40, fats: 30 },
    goal: "maintain",
  },
  "lean-bulk": {
    label: "Lean Bulk",
    split: { protein: 30, carbs: 45, fats: 25 },
    goal: "muscle-gain",
  },
};

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

const slotOrder: MealSlot[] = ["breakfast", "lunch", "snack", "dinner"];

const defaultProfile: ProfileState = {
  age: 27,
  weightKg: 70,
  heightCm: 170,
  gender: "male",
  activityLevel: "moderate",
  goalMode: "maintain",
  location: "West Bengal",
};

const defaultMacroSplit: MacroSplit = { protein: 30, carbs: 40, fats: 30 };

function genderOffset(gender: Gender): number {
  if (gender === "male") {
    return 5;
  }

  if (gender === "female") {
    return -161;
  }

  return -78;
}

function goalAdjustmentCalories(goal: GoalMode): number {
  if (goal === "weight-loss") {
    return -200;
  }

  if (goal === "muscle-gain") {
    return 200;
  }

  return 0;
}

function macroRatio(goal: GoalMode): { protein: number; carbs: number; fats: number } {
  if (goal === "weight-loss") {
    return { protein: 0.35, carbs: 0.35, fats: 0.3 };
  }

  if (goal === "muscle-gain") {
    return { protein: 0.3, carbs: 0.45, fats: 0.25 };
  }

  return { protein: 0.3, carbs: 0.4, fats: 0.3 };
}

function normalizeSplit(split: MacroSplit): MacroSplit {
  const total = Math.max(1, split.protein + split.carbs + split.fats);
  return {
    protein: (split.protein / total) * 100,
    carbs: (split.carbs / total) * 100,
    fats: (split.fats / total) * 100,
  };
}

function calculatePlan(profile: ProfileState, macroSplit?: MacroSplit) {
  const bmr =
    10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age + genderOffset(profile.gender);

  const maintenanceCalories = Math.round(bmr * activityMultipliers[profile.activityLevel]);
  const adjustedCalories = maintenanceCalories + goalAdjustmentCalories(profile.goalMode);
  const targetCalories = Math.max(1200, adjustedCalories);

  const ratio = macroSplit
    ? {
        protein: macroSplit.protein / 100,
        carbs: macroSplit.carbs / 100,
        fats: macroSplit.fats / 100,
      }
    : macroRatio(profile.goalMode);

  const protein = Math.round((targetCalories * ratio.protein) / 4);
  const carbs = Math.round((targetCalories * ratio.carbs) / 4);
  const fats = Math.round((targetCalories * ratio.fats) / 9);

  return {
    bmr: Math.round(bmr),
    maintenanceCalories,
    targetCalories,
    targetMacros: { protein, carbs, fats },
  };
}

function getFoodMeta(food: StateFoodItem): FoodMeta {
  const text = food.foodName.toLowerCase();

  const hasChicken = text.includes("chicken");
  const hasFish = text.includes("fish");
  const hasMutton = text.includes("mutton");
  const hasEgg = text.includes("egg");
  const hasPaneer = text.includes("paneer");
  const hasCurd = text.includes("curd") || text.includes("yogurt");
  const hasMilk = text.includes("milk") || text.includes("ghee") || text.includes("butter");
  const hasNut = text.includes("walnut") || text.includes("nut") || text.includes("almond") || text.includes("makhana");
  const hasGluten = text.includes("chapati") || text.includes("paratha") || text.includes("bread") || text.includes("wheat");
  const hasRootVeg = text.includes("aloo") || text.includes("potato") || text.includes("onion") || text.includes("garlic");

  let diet: FoodMeta["diet"] = "veg";
  if (hasChicken || hasFish || hasMutton) {
    diet = "non-veg";
  } else if (hasEgg) {
    diet = "egg";
  }

  let affordability: FoodMeta["affordability"] = 3;
  if (food.calories <= 220) {
    affordability = 1;
  } else if (food.calories <= 280) {
    affordability = 2;
  } else if (food.calories <= 340) {
    affordability = 3;
  } else if (food.calories <= 390) {
    affordability = 4;
  } else {
    affordability = 5;
  }

  return {
    diet,
    jainFriendly: diet === "veg" && !hasRootVeg,
    allergens: {
      nuts: hasNut,
      dairy: hasPaneer || hasCurd || hasMilk,
      gluten: hasGluten,
    },
    affordability,
  };
}

function scaledNutrition(item: StateFoodItem, multiplier: PortionMultiplier) {
  return {
    calories: item.calories * multiplier,
    protein: item.macros.protein * multiplier,
    carbs: item.macros.carbs * multiplier,
    fats: item.macros.fats * multiplier,
  };
}

async function detectIndianState(): Promise<IndianStateName | null> {
  if (typeof window === "undefined" || !navigator.geolocation) {
    return null;
  }

  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000,
    });
  }).catch(() => null);

  if (!position) {
    return null;
  }

  const { latitude, longitude } = position.coords;
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
    {
      headers: {
        "Accept-Language": "en",
      },
      cache: "no-store",
    },
  ).catch(() => null);

  if (!response?.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    address?: { state?: string; union_territory?: string };
  };

  const rawState = payload.address?.state ?? payload.address?.union_territory;
  if (!rawState) {
    return null;
  }

  const normalized = rawState.replace("NCT of ", "").replace("State of ", "").trim();

  const matched = INDIAN_STATES.find((state) => state.toLowerCase() === normalized.toLowerCase());
  return matched ?? null;
}

function progressPercent(value: number, target: number): number {
  if (target <= 0) {
    return 0;
  }
  return Math.max(0, (value / target) * 100);
}

function RingProgress({
  value,
  label,
  subLabel,
  color,
}: {
  value: number;
  label: string;
  subLabel: string;
  color: string;
}) {
  const clamped = Math.max(0, Math.min(value, 100));
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clamped / 100) * circumference;

  return (
    <div className="rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
      <div className="relative mx-auto h-28 w-28">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(90,110,100,0.15)" strokeWidth="10" />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <span className="text-lg font-semibold text-[color:var(--text-primary)]">{clamped.toFixed(0)}%</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-[color:var(--text-primary)]">{label}</p>
      <p className="text-xs text-[color:var(--text-secondary)]">{subLabel}</p>
    </div>
  );
}

function MiniBarChart({ values, labels }: { values: number[]; labels: string[] }) {
  const maxValue = Math.max(1, ...values);

  return (
    <div className="rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
      <div className="flex h-28 items-end gap-2">
        {values.map((value, index) => (
          <div key={`${labels[index]}-${index}`} className="flex flex-1 flex-col items-center gap-1">
            <div className="h-24 w-full rounded-lg bg-[color:var(--glass-bg)] p-1">
              <motion.div
                className="w-full rounded-md bg-[linear-gradient(180deg,var(--accent-gold),var(--accent))]"
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(6, (value / maxValue) * 100)}%` }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                style={{ marginTop: "auto" }}
              />
            </div>
            <span className="text-[10px] text-[color:var(--text-secondary)]">{labels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MacroSplitDonut({ protein, carbs, fats }: { protein: number; carbs: number; fats: number }) {
  const total = Math.max(1, protein + carbs + fats);
  const circumference = 2 * Math.PI * 44;
  const pRatio = protein / total;
  const cRatio = carbs / total;
  const fRatio = fats / total;
  const pLen = circumference * pRatio;
  const cLen = circumference * cRatio;
  const fLen = circumference * fRatio;

  return (
    <div className="bento-subcard rounded-2xl p-3">
      <div className="relative mx-auto h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(90,110,100,0.15)" strokeWidth="16" />

          <motion.circle
            cx="60"
            cy="60"
            r="44"
            fill="none"
            stroke="#d98f2b"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${pLen} ${circumference - pLen}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="cursor-pointer"
          />

          <motion.circle
            cx="60"
            cy="60"
            r="44"
            fill="none"
            stroke="#2f9088"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${cLen} ${circumference - cLen}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: -pLen }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            className="cursor-pointer"
          />

          <motion.circle
            cx="60"
            cy="60"
            r="44"
            fill="none"
            stroke="#be5c46"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${fLen} ${circumference - fLen}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: -(pLen + cLen) }}
            transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
            className="cursor-pointer"
          />
        </svg>

        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-[color:var(--glass-bg)] text-center">
            <span className="text-xs font-medium text-[color:var(--text-secondary)]">Macro Split</span>
          </div>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-[color:var(--text-secondary)]">
        <span className="group relative rounded-full bg-[color:var(--glass-bg)] px-2 py-1 text-center">P {Math.round((protein / total) * 100)}%
          <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#1f2c27] px-2 py-1 text-[10px] text-white group-hover:block">Protein segment</span>
        </span>
        <span className="group relative rounded-full bg-[color:var(--glass-bg)] px-2 py-1 text-center">C {Math.round((carbs / total) * 100)}%
          <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#1f2c27] px-2 py-1 text-[10px] text-white group-hover:block">Carbs segment</span>
        </span>
        <span className="group relative rounded-full bg-[color:var(--glass-bg)] px-2 py-1 text-center">F {Math.round((fats / total) * 100)}%
          <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#1f2c27] px-2 py-1 text-[10px] text-white group-hover:block">Fats segment</span>
        </span>
      </div>
    </div>
  );
}

function StackedMacroBars({
  consumed,
  target,
}: {
  consumed: { protein: number; carbs: number; fats: number };
  target: { protein: number; carbs: number; fats: number };
}) {
  const maxTotal = Math.max(
    1,
    target.protein + target.carbs + target.fats,
    consumed.protein + consumed.carbs + consumed.fats,
  );

  function stackWidth(value: number) {
    return `${Math.max(0, (value / maxTotal) * 100)}%`;
  }

  return (
    <div className="bento-subcard rounded-2xl p-3">
      <p className="text-sm font-medium text-[color:var(--text-primary)]">Stacked Macro Bars</p>
      <div className="mt-3 space-y-3">
        <div>
          <p className="mb-1 text-xs text-[color:var(--text-secondary)]">Target</p>
          <div className="flex h-4 overflow-hidden rounded-full bg-[color:var(--glass-bg)]">
            <motion.div
              style={{ width: stackWidth(target.protein) }}
              className="group relative bg-[#d98f2b]"
              initial={{ width: 0 }}
              animate={{ width: stackWidth(target.protein) }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#1f2c27] px-2 py-1 text-[10px] text-white group-hover:block">Protein target</span>
            </motion.div>
            <motion.div
              style={{ width: stackWidth(target.carbs) }}
              className="group relative bg-[#2f9088]"
              initial={{ width: 0 }}
              animate={{ width: stackWidth(target.carbs) }}
              transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
            >
              <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#1f2c27] px-2 py-1 text-[10px] text-white group-hover:block">Carbs target</span>
            </motion.div>
            <motion.div
              style={{ width: stackWidth(target.fats) }}
              className="group relative bg-[#be5c46]"
              initial={{ width: 0 }}
              animate={{ width: stackWidth(target.fats) }}
              transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            >
              <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#1f2c27] px-2 py-1 text-[10px] text-white group-hover:block">Fats target</span>
            </motion.div>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-[color:var(--text-secondary)]">Consumed</p>
          <div className="flex h-4 overflow-hidden rounded-full bg-[color:var(--glass-bg)]">
            <motion.div
              style={{ width: stackWidth(consumed.protein) }}
              className="group relative bg-[#d98f2b]"
              initial={{ width: 0 }}
              animate={{ width: stackWidth(consumed.protein) }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#1f2c27] px-2 py-1 text-[10px] text-white group-hover:block">Protein consumed</span>
            </motion.div>
            <motion.div
              style={{ width: stackWidth(consumed.carbs) }}
              className="group relative bg-[#2f9088]"
              initial={{ width: 0 }}
              animate={{ width: stackWidth(consumed.carbs) }}
              transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
            >
              <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#1f2c27] px-2 py-1 text-[10px] text-white group-hover:block">Carbs consumed</span>
            </motion.div>
            <motion.div
              style={{ width: stackWidth(consumed.fats) }}
              className="group relative bg-[#be5c46]"
              initial={{ width: 0 }}
              animate={{ width: stackWidth(consumed.fats) }}
              transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            >
              <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#1f2c27] px-2 py-1 text-[10px] text-white group-hover:block">Fats consumed</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

type DietDashboardProps = {
  locale: Locale;
};

export function DietDashboard({ locale }: DietDashboardProps) {
  const copy = copyByLocale[locale];
  const plannerCopy = copy.profilePlanner;
  const [profile, setProfile] = useState<ProfileState>(defaultProfile);
  const [selectedFoodId, setSelectedFoodId] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<MealSlot>("breakfast");
  const [selectedMultiplier, setSelectedMultiplier] = useState<PortionMultiplier>(1);
  const [macroPreset, setMacroPreset] = useState<MacroPresetKey>("balanced-maintenance");
  const [macroSplit, setMacroSplit] = useState<MacroSplit>(defaultMacroSplit);
  const [dietPreference, setDietPreference] = useState<DietPreference>("all");
  const [allergies, setAllergies] = useState<AllergiesState>({ nuts: false, dairy: false, gluten: false });
  const [dislikedInput, setDislikedInput] = useState("");
  const [affordabilityMode, setAffordabilityMode] = useState(false);
  const [mealPlan, setMealPlan] = useState<PlannedMeal[]>([]);
  const [locationStatus, setLocationStatus] = useState<"idle" | "detecting" | "detected" | "failed">("idle");
  const [hasHydratedPersistence, setHasHydratedPersistence] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(PLANNER_STORAGE_KEY);
      if (!raw) {
        setHasHydratedPersistence(true);
        return;
      }

      const saved = JSON.parse(raw) as Partial<PersistedPlannerState>;

      if (saved.profile) {
        setProfile(saved.profile);
      }
      if (saved.selectedSlot) {
        setSelectedSlot(saved.selectedSlot);
      }
      if (saved.selectedMultiplier) {
        setSelectedMultiplier(saved.selectedMultiplier);
      }
      if (saved.macroPreset) {
        setMacroPreset(saved.macroPreset);
      }
      if (saved.macroSplit) {
        setMacroSplit(saved.macroSplit);
      }
      if (saved.dietPreference) {
        setDietPreference(saved.dietPreference);
      }
      if (saved.allergies) {
        setAllergies(saved.allergies);
      }
      if (typeof saved.dislikedInput === "string") {
        setDislikedInput(saved.dislikedInput);
      }
      if (typeof saved.affordabilityMode === "boolean") {
        setAffordabilityMode(saved.affordabilityMode);
      }
      if (Array.isArray(saved.mealPlan)) {
        setMealPlan(saved.mealPlan);
      }
    } catch {
      // Ignore malformed localStorage and continue with defaults.
    } finally {
      setHasHydratedPersistence(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydratedPersistence || typeof window === "undefined") {
      return;
    }

    const stateToPersist: PersistedPlannerState = {
      profile,
      selectedSlot,
      selectedMultiplier,
      macroPreset,
      macroSplit,
      dietPreference,
      allergies,
      dislikedInput,
      affordabilityMode,
      mealPlan,
    };

    window.localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(stateToPersist));
  }, [
    affordabilityMode,
    allergies,
    dietPreference,
    dislikedInput,
    hasHydratedPersistence,
    macroPreset,
    macroSplit,
    mealPlan,
    profile,
    selectedMultiplier,
    selectedSlot,
  ]);

  useEffect(() => {
    let mounted = true;

    async function detect() {
      setLocationStatus("detecting");
      const detectedState = await detectIndianState();

      if (!mounted) {
        return;
      }

      if (detectedState) {
        setProfile((current) => ({ ...current, location: detectedState }));
        setLocationStatus("detected");
      } else {
        setLocationStatus("failed");
      }
    }

    void detect();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (macroPreset === "custom") {
      return;
    }

    const preset = macroPresets[macroPreset];
    setMacroSplit(preset.split);
    setProfile((current) => ({ ...current, goalMode: preset.goal }));
  }, [macroPreset]);

  const dislikedKeywords = useMemo(
    () =>
      dislikedInput
        .split(",")
        .map((word) => word.trim().toLowerCase())
        .filter((word) => word.length > 0),
    [dislikedInput],
  );

  const filteredFoods = useMemo(() => {
    const locationFoods = stateFoodDatabase.filter((item) => item.state === profile.location);

    return locationFoods.filter((item) => {
      const meta = getFoodMeta(item);
      const text = item.foodName.toLowerCase();

      if (dietPreference === "veg" && meta.diet !== "veg") {
        return false;
      }

      if (dietPreference === "egg" && meta.diet === "non-veg") {
        return false;
      }

      if (dietPreference === "non-veg" && meta.diet !== "non-veg") {
        return false;
      }

      if (dietPreference === "jain" && !meta.jainFriendly) {
        return false;
      }

      if (allergies.nuts && meta.allergens.nuts) {
        return false;
      }

      if (allergies.dairy && meta.allergens.dairy) {
        return false;
      }

      if (allergies.gluten && meta.allergens.gluten) {
        return false;
      }

      if (dislikedKeywords.some((word) => text.includes(word))) {
        return false;
      }

      return true;
    });
  }, [allergies, dietPreference, dislikedKeywords, profile.location]);

  const selectedFood = useMemo(
    () => filteredFoods.find((item) => item.id === selectedFoodId) ?? null,
    [filteredFoods, selectedFoodId],
  );

  const normalizedSplit = useMemo(() => normalizeSplit(macroSplit), [macroSplit]);
  const planResult = useMemo(() => calculatePlan(profile, normalizedSplit), [normalizedSplit, profile]);

  const mealPlanBySlot = useMemo(
    () =>
      slotOrder.reduce<Record<MealSlot, PlannedMeal[]>>(
        (acc, slot) => {
          acc[slot] = mealPlan.filter((entry) => entry.slot === slot);
          return acc;
        },
        { breakfast: [], lunch: [], snack: [], dinner: [] },
      ),
    [mealPlan],
  );

  const consumed = useMemo(
    () =>
      mealPlan.reduce(
        (totals, entry) => ({
          calories: totals.calories + entry.item.calories * entry.multiplier,
          protein: totals.protein + entry.item.macros.protein * entry.multiplier,
          carbs: totals.carbs + entry.item.macros.carbs * entry.multiplier,
          fats: totals.fats + entry.item.macros.fats * entry.multiplier,
        }),
        { calories: 0, protein: 0, carbs: 0, fats: 0 },
      ),
    [mealPlan],
  );

  const remaining = useMemo(
    () => ({
      calories: Math.max(0, planResult.targetCalories - consumed.calories),
      protein: Math.max(0, planResult.targetMacros.protein - consumed.protein),
      carbs: Math.max(0, planResult.targetMacros.carbs - consumed.carbs),
      fats: Math.max(0, planResult.targetMacros.fats - consumed.fats),
    }),
    [consumed, planResult],
  );

  const smartSuggestions = useMemo(() => {
    const candidates = filteredFoods
      .map((item) => {
        const nutrition = scaledNutrition(item, 1);
        const meta = getFoodMeta(item);

        const deficitMatch =
          Math.abs(remaining.protein - nutrition.protein) * 3 +
          Math.abs(remaining.carbs - nutrition.carbs) * 1.5 +
          Math.abs(remaining.fats - nutrition.fats) * 2 +
          Math.abs(remaining.calories - nutrition.calories) * 0.2;

        const affordabilityPenalty = affordabilityMode ? meta.affordability * 8 : 0;
        return {
          item,
          score: deficitMatch + affordabilityPenalty,
          affordability: meta.affordability,
        };
      })
      .sort((a, b) => a.score - b.score);

    return candidates.slice(0, 5);
  }, [affordabilityMode, filteredFoods, remaining]);

  const budgetAlternativesBySlot = useMemo(() => {
    const sorted = [...filteredFoods].sort((a, b) => getFoodMeta(a).affordability - getFoodMeta(b).affordability);
    const top = sorted.slice(0, 2);
    return slotOrder.reduce<Record<MealSlot, StateFoodItem[]>>(
      (acc, slot) => {
        acc[slot] = top;
        return acc;
      },
      { breakfast: [], lunch: [], snack: [], dinner: [] },
    );
  }, [filteredFoods]);

  const progress = useMemo(
    () => ({
      calories: progressPercent(consumed.calories, planResult.targetCalories),
      protein: progressPercent(consumed.protein, planResult.targetMacros.protein),
      carbs: progressPercent(consumed.carbs, planResult.targetMacros.carbs),
      fats: progressPercent(consumed.fats, planResult.targetMacros.fats),
    }),
    [consumed, planResult],
  );

  const slotCalories = useMemo(
    () =>
      slotOrder.map((slot) =>
        mealPlanBySlot[slot].reduce((sum, entry) => sum + entry.item.calories * entry.multiplier, 0),
      ),
    [mealPlanBySlot],
  );

  function addToMealPlan() {
    if (!selectedFood) {
      return;
    }

    const newEntry: PlannedMeal = {
      id: `${selectedSlot}-${selectedFood.id}-${Date.now()}`,
      slot: selectedSlot,
      item: selectedFood,
      multiplier: selectedMultiplier,
    };

    setMealPlan((current) => [...current, newEntry]);
  }

  function removeFromMealPlan(entryId: string) {
    setMealPlan((current) => current.filter((entry) => entry.id !== entryId));
  }

  function goalLabel(goal: GoalMode): string {
    if (goal === "weight-loss") {
      return plannerCopy.goalOptions["weight-loss"];
    }
    if (goal === "muscle-gain") {
      return plannerCopy.goalOptions["muscle-gain"];
    }
    return plannerCopy.goalOptions.maintain;
  }

  function slotLabel(slot: MealSlot): string {
    return copy.mealTimes[slot];
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bento-card mb-6 rounded-3xl p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-1 text-xs font-medium tracking-wide text-[color:var(--text-secondary)]">
              <Leaf className="h-3.5 w-3.5 text-[color:var(--accent)]" />
              {copy.appBadge}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">{plannerCopy.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-[color:var(--text-secondary)] sm:text-base">
              {plannerCopy.subtitle}
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

      <div className="grid gap-4 lg:grid-cols-12 lg:auto-rows-[minmax(180px,auto)]">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bento-card rounded-2xl p-5 lg:col-span-7"
        >
            <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">{plannerCopy.yourProfile}</h2>

            <div className="bento-subcard mt-4 rounded-xl p-3">
              <p className="text-sm font-semibold text-[color:var(--text-primary)]">Macro Presets</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <label className="text-xs text-[color:var(--text-secondary)]">
                  Preset
                  <select
                    value={macroPreset}
                    onChange={(event) => setMacroPreset(event.target.value as MacroPresetKey)}
                    className="mt-1 w-full rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none"
                  >
                    <option value="high-protein-fat-loss">{macroPresets["high-protein-fat-loss"].label}</option>
                    <option value="balanced-maintenance">{macroPresets["balanced-maintenance"].label}</option>
                    <option value="lean-bulk">{macroPresets["lean-bulk"].label}</option>
                    <option value="custom">Custom</option>
                  </select>
                </label>
                <label className="inline-flex items-center gap-2 text-xs text-[color:var(--text-secondary)]">
                  <input
                    type="checkbox"
                    checked={affordabilityMode}
                    onChange={(event) => setAffordabilityMode(event.target.checked)}
                  />
                  Budget & affordability mode
                </label>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <label className="text-xs text-[color:var(--text-secondary)]">
                  Protein %
                  <input
                    type="number"
                    min={5}
                    max={80}
                    value={Math.round(macroSplit.protein)}
                    onChange={(event) => {
                      setMacroPreset("custom");
                      setMacroSplit((current) => ({ ...current, protein: Number(event.target.value) || 0 }));
                    }}
                    className="mt-1 w-full rounded-lg border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] px-2 py-1.5 text-sm text-[color:var(--text-primary)] outline-none"
                  />
                </label>
                <label className="text-xs text-[color:var(--text-secondary)]">
                  Carbs %
                  <input
                    type="number"
                    min={5}
                    max={85}
                    value={Math.round(macroSplit.carbs)}
                    onChange={(event) => {
                      setMacroPreset("custom");
                      setMacroSplit((current) => ({ ...current, carbs: Number(event.target.value) || 0 }));
                    }}
                    className="mt-1 w-full rounded-lg border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] px-2 py-1.5 text-sm text-[color:var(--text-primary)] outline-none"
                  />
                </label>
                <label className="text-xs text-[color:var(--text-secondary)]">
                  Fats %
                  <input
                    type="number"
                    min={5}
                    max={70}
                    value={Math.round(macroSplit.fats)}
                    onChange={(event) => {
                      setMacroPreset("custom");
                      setMacroSplit((current) => ({ ...current, fats: Number(event.target.value) || 0 }));
                    }}
                    className="mt-1 w-full rounded-lg border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] px-2 py-1.5 text-sm text-[color:var(--text-primary)] outline-none"
                  />
                </label>
              </div>
              <p className="mt-2 text-xs text-[color:var(--text-secondary)]">
                Active split: P {formatNumber(locale, Math.round(normalizedSplit.protein))}% · C {formatNumber(locale, Math.round(normalizedSplit.carbs))}% · F {formatNumber(locale, Math.round(normalizedSplit.fats))}%
              </p>
            </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm text-[color:var(--text-secondary)]">
              {plannerCopy.age}
              <input
                type="number"
                min={10}
                max={100}
                value={profile.age}
                onChange={(event) =>
                  setProfile((current) => ({ ...current, age: Number(event.target.value) || 0 }))
                }
                className="mt-1 w-full rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2 text-[color:var(--text-primary)] outline-none"
              />
            </label>

            <label className="text-sm text-[color:var(--text-secondary)]">
              {plannerCopy.weight}
              <input
                type="number"
                min={25}
                max={250}
                value={profile.weightKg}
                onChange={(event) =>
                  setProfile((current) => ({ ...current, weightKg: Number(event.target.value) || 0 }))
                }
                className="mt-1 w-full rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2 text-[color:var(--text-primary)] outline-none"
              />
            </label>

            <label className="text-sm text-[color:var(--text-secondary)]">
              {plannerCopy.height}
              <input
                type="number"
                min={120}
                max={230}
                value={profile.heightCm}
                onChange={(event) =>
                  setProfile((current) => ({ ...current, heightCm: Number(event.target.value) || 0 }))
                }
                className="mt-1 w-full rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2 text-[color:var(--text-primary)] outline-none"
              />
            </label>

            <label className="text-sm text-[color:var(--text-secondary)]">
              {plannerCopy.gender}
              <select
                value={profile.gender}
                onChange={(event) => setProfile((current) => ({ ...current, gender: event.target.value as Gender }))}
                className="mt-1 w-full rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2 text-[color:var(--text-primary)] outline-none"
              >
                <option value="male">{plannerCopy.genderOptions.male}</option>
                <option value="female">{plannerCopy.genderOptions.female}</option>
                <option value="other">{plannerCopy.genderOptions.other}</option>
              </select>
            </label>

            <label className="text-sm text-[color:var(--text-secondary)]">
              {plannerCopy.activity}
              <select
                value={profile.activityLevel}
                onChange={(event) =>
                  setProfile((current) => ({ ...current, activityLevel: event.target.value as ActivityLevel }))
                }
                className="mt-1 w-full rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2 text-[color:var(--text-primary)] outline-none"
              >
                <option value="sedentary">{plannerCopy.activityOptions.sedentary}</option>
                <option value="light">{plannerCopy.activityOptions.light}</option>
                <option value="moderate">{plannerCopy.activityOptions.moderate}</option>
                <option value="active">{plannerCopy.activityOptions.active}</option>
              </select>
            </label>

            <label className="text-sm text-[color:var(--text-secondary)]">
              {plannerCopy.goal}
              <select
                value={profile.goalMode}
                onChange={(event) => setProfile((current) => ({ ...current, goalMode: event.target.value as GoalMode }))}
                className="mt-1 w-full rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2 text-[color:var(--text-primary)] outline-none"
              >
                <option value="weight-loss">{plannerCopy.goalOptions["weight-loss"]}</option>
                <option value="maintain">{plannerCopy.goalOptions.maintain}</option>
                <option value="muscle-gain">{plannerCopy.goalOptions["muscle-gain"]}</option>
              </select>
            </label>
          </div>

          <div className="bento-subcard mt-4 rounded-xl p-3">
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--text-secondary)]">
              <MapPin className="h-4 w-4 text-[color:var(--accent)]" />
              {plannerCopy.location}
            </div>
            <select
              value={profile.location}
              onChange={(event) =>
                setProfile((current) => ({ ...current, location: event.target.value as IndianStateName }))
              }
              className="w-full rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none"
            >
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-[color:var(--text-secondary)]">
              {locationStatus === "detecting" && plannerCopy.locationStatus.detecting}
              {locationStatus === "detected" && plannerCopy.locationStatus.detected.replace("{location}", profile.location)}
              {locationStatus === "failed" && plannerCopy.locationStatus.failed}
              {locationStatus === "idle" && plannerCopy.locationStatus.idle}
            </p>
          </div>

          <div className="bento-subcard mt-4 rounded-xl p-3">
            <p className="text-sm font-semibold text-[color:var(--text-primary)]">Dietary Filters</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <label className="text-xs text-[color:var(--text-secondary)]">
                Preference
                <select
                  value={dietPreference}
                  onChange={(event) => setDietPreference(event.target.value as DietPreference)}
                  className="mt-1 w-full rounded-lg border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] px-2 py-1.5 text-sm text-[color:var(--text-primary)] outline-none"
                >
                  <option value="all">All</option>
                  <option value="veg">Veg</option>
                  <option value="egg">Egg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="jain">Jain</option>
                </select>
              </label>
              <label className="text-xs text-[color:var(--text-secondary)]">
                Disliked Foods (comma separated)
                <input
                  value={dislikedInput}
                  onChange={(event) => setDislikedInput(event.target.value)}
                  placeholder="e.g. fish, paneer"
                  className="mt-1 w-full rounded-lg border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] px-2 py-1.5 text-sm text-[color:var(--text-primary)] outline-none"
                />
              </label>
            </div>

            <div className="mt-2 flex flex-wrap gap-3 text-xs text-[color:var(--text-secondary)]">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={allergies.nuts}
                  onChange={(event) => setAllergies((current) => ({ ...current, nuts: event.target.checked }))}
                />
                Nuts Allergy
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={allergies.dairy}
                  onChange={(event) => setAllergies((current) => ({ ...current, dairy: event.target.checked }))}
                />
                Dairy Allergy
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={allergies.gluten}
                  onChange={(event) => setAllergies((current) => ({ ...current, gluten: event.target.checked }))}
                />
                Gluten Allergy
              </label>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.04 }}
          className="bento-card rounded-2xl p-5 lg:col-span-5"
        >
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">{plannerCopy.dailyTargets}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="bento-subcard rounded-xl p-3">
              <p className="text-xs text-[color:var(--text-secondary)]">{plannerCopy.goalMode}</p>
              <p className="mt-1 text-sm font-semibold text-[color:var(--text-primary)]">{goalLabel(profile.goalMode)}</p>
            </div>
            <div className="bento-subcard rounded-xl p-3">
              <p className="text-xs text-[color:var(--text-secondary)]">{plannerCopy.bmr}</p>
              <p className="mt-1 text-sm font-semibold text-[color:var(--text-primary)]">{formatCalories(locale, planResult.bmr)} kcal</p>
            </div>
            <div className="bento-subcard rounded-xl p-3">
              <p className="text-xs text-[color:var(--text-secondary)]">{plannerCopy.maintenanceCalories}</p>
              <p className="mt-1 text-sm font-semibold text-[color:var(--text-primary)]">
                {formatCalories(locale, planResult.maintenanceCalories)} kcal
              </p>
            </div>
            <div className="bento-subcard rounded-xl p-3">
              <p className="text-xs text-[color:var(--text-secondary)]">{plannerCopy.goalCalories}</p>
              <p className="mt-1 text-sm font-semibold text-[color:var(--text-primary)]">
                {formatCalories(locale, planResult.targetCalories)} kcal
              </p>
              <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
                {profile.goalMode === "weight-loss" && plannerCopy.maintenanceMinus200}
                {profile.goalMode === "muscle-gain" && plannerCopy.maintenancePlus200}
                {profile.goalMode === "maintain" && plannerCopy.maintenanceOnly}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="bento-subcard rounded-xl p-3 text-sm">
              <p className="text-xs text-[color:var(--text-secondary)]">Protein</p>
              <p className="mt-1 font-semibold text-[color:var(--text-primary)]">{formatGrams(locale, planResult.targetMacros.protein)} g</p>
            </div>
            <div className="bento-subcard rounded-xl p-3 text-sm">
              <p className="text-xs text-[color:var(--text-secondary)]">Carbs</p>
              <p className="mt-1 font-semibold text-[color:var(--text-primary)]">{formatGrams(locale, planResult.targetMacros.carbs)} g</p>
            </div>
            <div className="bento-subcard rounded-xl p-3 text-sm">
              <p className="text-xs text-[color:var(--text-secondary)]">Fats</p>
              <p className="mt-1 font-semibold text-[color:var(--text-primary)]">{formatGrams(locale, planResult.targetMacros.fats)} g</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <RingProgress
              value={progress.calories}
              label="Daily Goal"
              subLabel={`${formatCalories(locale, consumed.calories)} / ${formatCalories(locale, planResult.targetCalories)} kcal`}
              color="var(--accent)"
            />
            <MacroSplitDonut
              protein={planResult.targetMacros.protein}
              carbs={planResult.targetMacros.carbs}
              fats={planResult.targetMacros.fats}
            />
          </div>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="bento-card mt-4 rounded-2xl p-5"
      >
        <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">{plannerCopy.mealSuggestionsTitle.replace("{location}", profile.location)}</h2>
        <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
          {plannerCopy.mealSuggestionsSubtitle}
        </p>

        <div className="mt-3">
          <MiniBarChart values={slotCalories} labels={slotOrder.map((slot) => slotLabel(slot).slice(0, 3))} />
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_180px_auto]">
          <select
            value={selectedFoodId}
            onChange={(event) => setSelectedFoodId(event.target.value)}
            className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none"
          >
            <option value="">{plannerCopy.selectFoodItem}</option>
            {filteredFoods.map((item) => (
              <option key={item.id} value={item.id}>
                {item.foodName} • {item.servingSize} • {item.calories} kcal
              </option>
            ))}
          </select>

          <select
            value={selectedSlot}
            onChange={(event) => setSelectedSlot(event.target.value as MealSlot)}
            className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none"
          >
            {slotOrder.map((slot) => (
              <option key={slot} value={slot}>
                {slotLabel(slot)}
              </option>
            ))}
          </select>

          <select
            value={selectedMultiplier}
            onChange={(event) => setSelectedMultiplier(Number(event.target.value) as PortionMultiplier)}
            className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none"
          >
            <option value={0.5}>0.5x portion</option>
            <option value={1}>1x portion</option>
            <option value={1.5}>1.5x portion</option>
            <option value={2}>2x portion</option>
          </select>

          <button
            type="button"
            onClick={addToMealPlan}
            disabled={!selectedFood}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            {plannerCopy.add}
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          {slotOrder.map((slot) => (
            <div key={slot} className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
              <h3 className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--text-primary)]">
                <UtensilsCrossed className="h-4 w-4 text-[color:var(--accent)]" />
                {slotLabel(slot)}
              </h3>
              <div className="space-y-2">
                {mealPlanBySlot[slot].map((entry) => (
                  <div key={entry.id} className="rounded-lg border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] p-2">
                    <p className="text-xs font-medium text-[color:var(--text-primary)]">{entry.item.foodName}</p>
                    <p className="mt-1 text-[11px] text-[color:var(--text-secondary)]">
                      {formatNumber(locale, entry.multiplier)}x • {formatCalories(locale, entry.item.calories * entry.multiplier)} kcal • P {formatGrams(locale, entry.item.macros.protein * entry.multiplier)}g • C {formatGrams(locale, entry.item.macros.carbs * entry.multiplier)}g • F {formatGrams(locale, entry.item.macros.fats * entry.multiplier)}g
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromMealPlan(entry.id)}
                      className="mt-1 text-[11px] font-medium text-[color:var(--accent)]"
                    >
                      {plannerCopy.remove}
                    </button>
                  </div>
                ))}

                {mealPlanBySlot[slot].length === 0 ? (
                  <p className="text-xs text-[color:var(--text-secondary)]">{plannerCopy.noItemsYet}</p>
                ) : null}

                {affordabilityMode && budgetAlternativesBySlot[slot].length > 0 ? (
                  <div className="pt-2">
                    <p className="text-[11px] font-medium text-[color:var(--text-secondary)]">Low-cost alternatives</p>
                    <div className="mt-1 space-y-1">
                      {budgetAlternativesBySlot[slot].map((item) => (
                        <p key={`${slot}-${item.id}`} className="text-[11px] text-[color:var(--text-secondary)]">
                          {item.foodName} ({formatCalories(locale, item.calories)} kcal)
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="bento-card mt-4 rounded-2xl p-5"
      >
        <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-[color:var(--text-primary)]">
          <Sparkles className="h-5 w-5 text-[color:var(--accent)]" />
          Smart Meal Balancing
        </h2>
        <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
          Remaining to hit goal: {formatCalories(locale, remaining.calories)} kcal • P {formatGrams(locale, remaining.protein)}g • C {formatGrams(locale, remaining.carbs)}g • F {formatGrams(locale, remaining.fats)}g
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <RingProgress
            value={Math.min(100, progress.calories)}
            label="Calorie Completion"
            subLabel={`${formatNumber(locale, Number(progress.calories.toFixed(1)))}% done`}
            color="var(--accent-gold)"
          />
          <MiniBarChart
            values={[remaining.protein, remaining.carbs, remaining.fats]}
            labels={["P left", "C left", "F left"]}
          />
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {smartSuggestions.slice(0, 4).map((suggestion) => (
            <div key={suggestion.item.id} className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg-strong)] p-3">
              <p className="text-sm font-semibold text-[color:var(--text-primary)]">{suggestion.item.foodName}</p>
              <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
                {suggestion.item.servingSize} • {formatCalories(locale, suggestion.item.calories)} kcal • P {formatGrams(locale, suggestion.item.macros.protein)}g • C {formatGrams(locale, suggestion.item.macros.carbs)}g • F {formatGrams(locale, suggestion.item.macros.fats)}g
              </p>
              {affordabilityMode ? (
                <p className="mt-1 text-xs text-[color:var(--text-secondary)]">Affordability score: {suggestion.affordability}/5</p>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setSelectedFoodId(suggestion.item.id);
                  setSelectedMultiplier(1);
                }}
                className="mt-2 rounded-lg border border-[color:var(--glass-border)] px-2 py-1 text-xs font-medium text-[color:var(--text-primary)]"
              >
                Use this suggestion
              </button>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        className="bento-card mt-4 rounded-2xl p-5"
      >
        <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-[color:var(--text-primary)]">
          <Target className="h-5 w-5 text-[color:var(--accent)]" />
          {plannerCopy.goalCompletion}
        </h2>

        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <StackedMacroBars
              consumed={{ protein: consumed.protein, carbs: consumed.carbs, fats: consumed.fats }}
              target={{
                protein: planResult.targetMacros.protein,
                carbs: planResult.targetMacros.carbs,
                fats: planResult.targetMacros.fats,
              }}
            />
          </div>
          <div className="lg:col-span-5">
            <RingProgress
              value={progress.calories}
              label="Calorie Completion"
              subLabel={`${formatCalories(locale, consumed.calories)} / ${formatCalories(locale, planResult.targetCalories)} kcal`}
              color="var(--accent-warm)"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
          {[{
            key: "Calories",
            value: consumed.calories,
            target: planResult.targetCalories,
            percent: progress.calories,
            suffix: "kcal",
          }, {
            key: "Protein",
            value: consumed.protein,
            target: planResult.targetMacros.protein,
            percent: progress.protein,
            suffix: "g",
          }, {
            key: "Carbs",
            value: consumed.carbs,
            target: planResult.targetMacros.carbs,
            percent: progress.carbs,
            suffix: "g",
          }, {
            key: "Fats",
            value: consumed.fats,
            target: planResult.targetMacros.fats,
            percent: progress.fats,
            suffix: "g",
          }].map((metric) => (
            <div key={metric.key} className="bento-subcard rounded-xl p-3">
              <p className="text-sm font-medium text-[color:var(--text-primary)]">{metric.key}</p>
              <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
                {formatNumber(locale, metric.value)} / {formatNumber(locale, metric.target)} {metric.suffix}
              </p>
              <p className="mt-1 text-xs font-semibold text-[color:var(--accent)]">
                {formatNumber(locale, Number(metric.percent.toFixed(1)))}%
              </p>
              <div className="mt-2 h-2 w-full rounded-full bg-[color:var(--glass-bg)]">
                <div
                  className="h-2 rounded-full bg-[color:var(--accent)] transition-all"
                  style={{ width: `${Math.min(metric.percent, 100)}%` }}
                />
              </div>
            </div>
          ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
