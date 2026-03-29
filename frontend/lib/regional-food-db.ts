export type RegionKey = "west-bengal" | "kashmir" | "south-india";

export type RegionalFood = {
  id: string;
  name: string;
  regionTag: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  affordabilityScore: 1 | 2 | 3 | 4 | 5;
  regionalAvailability: Record<RegionKey, number>;
};

export const regionalFoodDatabase: RegionalFood[] = [
  {
    id: "wb-fish-curry",
    name: "Bengali Fish Curry",
    regionTag: "West Bengal",
    calories: 280,
    macros: { protein: 26, carbs: 8, fats: 15 },
    affordabilityScore: 3,
    regionalAvailability: { "west-bengal": 1, kashmir: 0.2, "south-india": 0.5 },
  },
  {
    id: "wb-rice",
    name: "Steamed Rice",
    regionTag: "West Bengal",
    calories: 210,
    macros: { protein: 4, carbs: 46, fats: 1 },
    affordabilityScore: 1,
    regionalAvailability: { "west-bengal": 1, kashmir: 0.85, "south-india": 0.95 },
  },
  {
    id: "kashmiri-walnut",
    name: "Kashmiri Walnuts",
    regionTag: "Kashmir",
    calories: 185,
    macros: { protein: 4, carbs: 4, fats: 18 },
    affordabilityScore: 4,
    regionalAvailability: { "west-bengal": 0.35, kashmir: 1, "south-india": 0.45 },
  },
  {
    id: "kashmiri-yogurt",
    name: "Kashmiri Yogurt Bowl",
    regionTag: "Kashmir",
    calories: 140,
    macros: { protein: 9, carbs: 8, fats: 8 },
    affordabilityScore: 2,
    regionalAvailability: { "west-bengal": 0.6, kashmir: 1, "south-india": 0.65 },
  },
  {
    id: "kashmiri-mutton-yakhni",
    name: "Mutton Yakhni",
    regionTag: "Kashmir",
    calories: 320,
    macros: { protein: 27, carbs: 5, fats: 21 },
    affordabilityScore: 5,
    regionalAvailability: { "west-bengal": 0.45, kashmir: 1, "south-india": 0.35 },
  },
  {
    id: "south-idli-sambar",
    name: "Idli Sambar",
    regionTag: "South India",
    calories: 220,
    macros: { protein: 9, carbs: 38, fats: 4 },
    affordabilityScore: 1,
    regionalAvailability: { "west-bengal": 0.75, kashmir: 0.5, "south-india": 1 },
  },
  {
    id: "south-curd-rice",
    name: "Curd Rice",
    regionTag: "South India",
    calories: 260,
    macros: { protein: 8, carbs: 42, fats: 7 },
    affordabilityScore: 2,
    regionalAvailability: { "west-bengal": 0.68, kashmir: 0.4, "south-india": 1 },
  },
  {
    id: "south-egg-appam",
    name: "Egg Appam",
    regionTag: "South India",
    calories: 290,
    macros: { protein: 14, carbs: 26, fats: 13 },
    affordabilityScore: 3,
    regionalAvailability: { "west-bengal": 0.5, kashmir: 0.25, "south-india": 0.9 },
  },
  {
    id: "chana-salad",
    name: "Chana Salad",
    regionTag: "Pan India",
    calories: 195,
    macros: { protein: 10, carbs: 28, fats: 5 },
    affordabilityScore: 1,
    regionalAvailability: { "west-bengal": 0.9, kashmir: 0.85, "south-india": 0.9 },
  },
];
