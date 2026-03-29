"use client";

import { create } from "zustand";
import type { MealTimeFilter } from "@/components/diet/types";

type DietUiState = {
  mealTimeFilter: MealTimeFilter;
  smartSwapOpenByMealId: Record<string, boolean>;
  setMealTimeFilter: (filter: MealTimeFilter) => void;
  toggleSmartSwap: (mealId: string) => void;
  closeSmartSwap: (mealId: string) => void;
};

export const useDietUiStore = create<DietUiState>((set) => ({
  mealTimeFilter: "all",
  smartSwapOpenByMealId: {},
  setMealTimeFilter: (filter) => set({ mealTimeFilter: filter }),
  toggleSmartSwap: (mealId) =>
    set((state) => ({
      smartSwapOpenByMealId: {
        ...state.smartSwapOpenByMealId,
        [mealId]: !state.smartSwapOpenByMealId[mealId],
      },
    })),
  closeSmartSwap: (mealId) =>
    set((state) => ({
      smartSwapOpenByMealId: {
        ...state.smartSwapOpenByMealId,
        [mealId]: false,
      },
    })),
}));
