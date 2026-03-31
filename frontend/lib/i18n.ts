export const locales = ["en", "hi", "bn"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type LocaleCopy = {
  appBadge: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  nutrientLabels: {
    protein: string;
    carbs: string;
    fats: string;
  };
  mealCard: {
    macroBadge: string;
    subtitle: string;
  };
  hero: {
    kicker: string;
    slides: Array<{
      title: string;
      subtitle: string;
    }>;
    goToSlideLabel: string;
  };
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
  planner: {
    title: string;
    subtitle: string;
    age: string;
    gender: string;
    weight: string;
    height: string;
    activityLevel: string;
    region: string;
    goalMode: string;
    genders: { male: string; female: string; other: string };
    activityOptions: {
      sedentary: string;
      light: string;
      moderate: string;
      active: string;
      athlete: string;
    };
    goalModes: {
      "fat-loss": string;
      maintain: string;
      gain: string;
    };
    cards: {
      bmr: string;
      maintenance: string;
      target: string;
      optimizerFocus: string;
      adjustment: string;
      budgetVsNutrition: string;
    };
    topMatchesTitle: string;
    searchPlaceholder: string;
    noResults: string;
    showing: string;
    previous: string;
    next: string;
    page: string;
    score: string;
    affordability: string;
  };
  profilePlanner: {
    title: string;
    subtitle: string;
    yourProfile: string;
    age: string;
    weight: string;
    height: string;
    gender: string;
    activity: string;
    goal: string;
    location: string;
    genderOptions: { male: string; female: string; other: string };
    activityOptions: {
      sedentary: string;
      light: string;
      moderate: string;
      active: string;
    };
    goalOptions: {
      "weight-loss": string;
      maintain: string;
      "muscle-gain": string;
    };
    locationStatus: {
      detecting: string;
      detected: string;
      failed: string;
      idle: string;
    };
    dailyTargets: string;
    goalMode: string;
    bmr: string;
    maintenanceCalories: string;
    goalCalories: string;
    maintenanceMinus200: string;
    maintenancePlus200: string;
    maintenanceOnly: string;
    mealSuggestionsTitle: string;
    mealSuggestionsSubtitle: string;
    selectFoodItem: string;
    add: string;
    remove: string;
    noItemsYet: string;
    goalCompletion: string;
  };
};

export const copyByLocale: Record<Locale, LocaleCopy> = {
  en: {
    appBadge: "Smart Regional Diet Planner",
    dashboardTitle: "Regional Wellness Dashboard",
    dashboardSubtitle: "Dynamic regional meals with macro intelligence and one-tap Smart Swaps.",
    nutrientLabels: { protein: "Protein", carbs: "Carbs", fats: "Fats" },
    mealCard: {
      macroBadge: "Macros",
      subtitle: "Curated for balanced regional nutrition.",
    },
    hero: {
      kicker: "Smart Regional Diet Planner",
      slides: [
        {
          title: "Precision Nutrition, Beautifully Designed",
          subtitle: "A modern diet planning workspace with regional intelligence and clinical-grade clarity.",
        },
        {
          title: "From Data to Daily Decisions",
          subtitle: "Track macros, calories, and affordability with a polished health-tech dashboard flow.",
        },
        {
          title: "Built Around Indian Food Context",
          subtitle: "Local ingredients, local availability, and optimization logic that reflects real lifestyle choices.",
        },
        {
          title: "Profile-Driven Planning Experience",
          subtitle: "Generate personalized targets instantly using Mifflin-St Jeor and goal-based calorie modes.",
        },
      ],
      goToSlideLabel: "Go to slide",
    },
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
    smartSwap: "स्मार्ट स्वैप",
    showAlternatives: "Show alternatives",
    hideAlternatives: "Hide alternatives",
    planner: {
      title: "यूज़र प्रोफ़ाइल फ़ॉर्म",
      subtitle: "Calculates calories using Mifflin-St Jeor and runs a Budget vs Nutrition optimizer by region.",
      age: "Age",
      gender: "Gender",
      weight: "Weight (kg)",
      height: "Height (cm)",
      activityLevel: "Activity Level",
      region: "Region",
      goalMode: "Goal Mode",
      genders: { male: "Male", female: "Female", other: "Other" },
      activityOptions: {
        sedentary: "Sedentary",
        light: "Lightly Active",
        moderate: "Moderately Active",
        active: "Very Active",
        athlete: "Athlete",
      },
      goalModes: { "fat-loss": "Fat Loss", maintain: "Maintain", gain: "Gain" },
      cards: {
        bmr: "BMR",
        maintenance: "Maintenance Calories",
        target: "Target Calories",
        optimizerFocus: "Optimizer Focus",
        adjustment: "Adjustment",
        budgetVsNutrition: "Budget vs Nutrition",
      },
      topMatchesTitle: "Regional Intelligence Engine (Top Matches)",
      searchPlaceholder: "Search food by name...",
      noResults: "No foods found for this search.",
      showing: "Showing",
      previous: "Previous",
      next: "Next",
      page: "Page",
      score: "Score",
      affordability: "Affordability",
    },
    profilePlanner: {
      title: "Profile Planner",
      subtitle: "Auto-detect location, calculate your calorie and macro targets, and build a meal plan by slot.",
      yourProfile: "Your Profile",
      age: "Age",
      weight: "Weight (kg)",
      height: "Height (cm)",
      gender: "Gender",
      activity: "Activity",
      goal: "Goal",
      location: "Location",
      genderOptions: { male: "Male", female: "Female", other: "Other" },
      activityOptions: {
        sedentary: "Sedentary",
        light: "Light",
        moderate: "Moderate",
        active: "Active",
      },
      goalOptions: {
        "weight-loss": "Weight Loss",
        maintain: "Maintain",
        "muscle-gain": "Muscle Gain",
      },
      locationStatus: {
        detecting: "Detecting your location...",
        detected: "Detected location: {location}",
        failed: "Could not auto-detect location. You can select it manually.",
        idle: "Location not detected yet.",
      },
      dailyTargets: "Daily Targets",
      goalMode: "Goal Mode",
      bmr: "BMR",
      maintenanceCalories: "Maintenance Calories",
      goalCalories: "Goal Calories",
      maintenanceMinus200: "Maintenance - 200 kcal",
      maintenancePlus200: "Maintenance + 200 kcal",
      maintenanceOnly: "Maintenance calories",
      mealSuggestionsTitle: "Meal Suggestions For {location}",
      mealSuggestionsSubtitle: "Select a food item and assign it to a meal slot.",
      selectFoodItem: "Select food item",
      add: "Add",
      remove: "Remove",
      noItemsYet: "No items yet",
      goalCompletion: "Goal Completion",
    },
  },
  hi: {
    appBadge: "स्मार्ट रीजनल डाइट प्लानर",
    dashboardTitle: "क्षेत्रीय वेलनेस डैशबोर्ड",
    dashboardSubtitle: "मैक्रो इंटेलिजेंस और वन-टैप स्मार्ट स्वैप्स के साथ क्षेत्रीय भोजन योजना।",
    nutrientLabels: { protein: "प्रोटीन", carbs: "कार्ब्स", fats: "वसा" },
    mealCard: {
      macroBadge: "Macros",
      subtitle: "संतुलित क्षेत्रीय पोषण के लिए चुना गया भोजन।",
    },
    hero: {
      kicker: "स्मार्ट रीजनल डाइट प्लानर",
      slides: [
        {
          title: "सटीक पोषण, सुंदर डिज़ाइन",
          subtitle: "क्षेत्रीय इंटेलिजेंस और स्पष्ट हेल्थ इनसाइट्स के साथ आधुनिक प्लानिंग वर्कस्पेस।",
        },
        {
          title: "डेटा से दैनिक निर्णय तक",
          subtitle: "एक एलीगेंट डैशबोर्ड में मैक्रोज़, कैलोरी और किफ़ायती विकल्प ट्रैक करें।",
        },
        {
          title: "भारतीय भोजन संदर्भ के अनुसार निर्मित",
          subtitle: "स्थानीय सामग्री और उपलब्धता के साथ व्यावहारिक ऑप्टिमाइज़ेशन।",
        },
        {
          title: "प्रोफ़ाइल-आधारित प्लानिंग अनुभव",
          subtitle: "Mifflin-St Jeor के आधार पर तुरंत व्यक्तिगत लक्ष्य प्राप्त करें।",
        },
      ],
      goToSlideLabel: "स्लाइड पर जाएँ",
    },
    macroTrackerTitle: "मैक्रो-न्यूट्रिएंट ट्रैकर",
    macroTrackerSubtitle: "दैनिक कुल: शेष = लक्ष्य - कुल(उपभोग)",
    totalRemaining: "कुल शेष",
    mealTimes: {
      all: "सभी भोजन",
      breakfast: "नाश्ता",
      lunch: "दोपहर का भोजन",
      dinner: "रात का भोजन",
      snack: "स्नैक",
    },
    calories: "कैलोरी",
    consumed: "उपभोग",
    target: "लक्ष्य",
    remaining: "शेष",
    todayCalorieGoals: "आज का कैलोरी लक्ष्य",
    updatedOn: "अपडेट",
    localeLabel: "भाषा",
    loading: "भोजन लोड हो रहे हैं...",
    errorLoadingMeals: "API से भोजन लोड नहीं हुआ। फॉलबैक योजना दिखाई जा रही है।",
    retry: "फिर से प्रयास करें",
    smartSwap: "Smart Swap",
    showAlternatives: "विकल्प दिखाएँ",
    hideAlternatives: "विकल्प छुपाएँ",
    planner: {
      title: "User Profile Form",
      subtitle: "Mifflin-St Jeor से कैलोरी की गणना होती है और क्षेत्र के अनुसार ऑप्टिमाइज़र चलता है।",
      age: "उम्र",
      gender: "लिंग",
      weight: "वज़न (किग्रा)",
      height: "लंबाई (सेमी)",
      activityLevel: "गतिविधि स्तर",
      region: "क्षेत्र",
      goalMode: "लक्ष्य मोड",
      genders: { male: "पुरुष", female: "महिला", other: "अन्य" },
      activityOptions: {
        sedentary: "निष्क्रिय",
        light: "हल्की सक्रियता",
        moderate: "मध्यम सक्रियता",
        active: "बहुत सक्रिय",
        athlete: "एथलीट",
      },
      goalModes: { "fat-loss": "वसा घटाना", maintain: "स्थिर रखना", gain: "वजन बढ़ाना" },
      cards: {
        bmr: "BMR",
        maintenance: "मेंटेनेंस कैलोरी",
        target: "लक्ष्य कैलोरी",
        optimizerFocus: "ऑप्टिमाइज़र फोकस",
        adjustment: "समायोजन",
        budgetVsNutrition: "बजट बनाम पोषण",
      },
      topMatchesTitle: "क्षेत्रीय इंटेलिजेंस इंजन (शीर्ष मिलान)",
      searchPlaceholder: "भोजन नाम से खोजें...",
      noResults: "इस खोज के लिए कोई भोजन नहीं मिला।",
      showing: "दिखाया जा रहा है",
      previous: "पिछला",
      next: "अगला",
      page: "पृष्ठ",
      score: "स्कोर",
      affordability: "किफ़ायती स्तर",
    },
    profilePlanner: {
      title: "प्रोफाइल प्लानर",
      subtitle: "लोकेशन स्वतः पहचानें, अपनी कैलोरी और मैक्रो लक्ष्य निकालें, और मील स्लॉट के अनुसार योजना बनाएं।",
      yourProfile: "आपकी प्रोफाइल",
      age: "उम्र",
      weight: "वज़न (किग्रा)",
      height: "लंबाई (सेमी)",
      gender: "लिंग",
      activity: "गतिविधि",
      goal: "लक्ष्य",
      location: "लोकेशन",
      genderOptions: { male: "पुरुष", female: "महिला", other: "अन्य" },
      activityOptions: {
        sedentary: "निष्क्रिय",
        light: "हल्की सक्रियता",
        moderate: "मध्यम सक्रियता",
        active: "बहुत सक्रिय",
      },
      goalOptions: {
        "weight-loss": "वज़न घटाना",
        maintain: "वर्तमान बनाए रखें",
        "muscle-gain": "मांसपेशी बढ़ाना",
      },
      locationStatus: {
        detecting: "आपकी लोकेशन पहचानी जा रही है...",
        detected: "पहचानी गई लोकेशन: {location}",
        failed: "लोकेशन स्वतः नहीं पहचान पाए। आप इसे मैन्युअली चुन सकते हैं।",
        idle: "लोकेशन अभी पहचानी नहीं गई है।",
      },
      dailyTargets: "दैनिक लक्ष्य",
      goalMode: "लक्ष्य मोड",
      bmr: "BMR",
      maintenanceCalories: "मेंटेनेंस कैलोरी",
      goalCalories: "लक्ष्य कैलोरी",
      maintenanceMinus200: "मेंटेनेंस - 200 kcal",
      maintenancePlus200: "मेंटेनेंस + 200 kcal",
      maintenanceOnly: "मेंटेनेंस कैलोरी",
      mealSuggestionsTitle: "{location} के लिए भोजन सुझाव",
      mealSuggestionsSubtitle: "खाद्य आइटम चुनें और उसे मील स्लॉट में जोड़ें।",
      selectFoodItem: "खाद्य आइटम चुनें",
      add: "जोड़ें",
      remove: "हटाएँ",
      noItemsYet: "अभी कोई आइटम नहीं",
      goalCompletion: "लक्ष्य पूर्णता",
    },
  },
  bn: {
    appBadge: "স্মার্ট রিজিওনাল ডায়েট প্ল্যানার",
    dashboardTitle: "আঞ্চলিক ওয়েলনেস ড্যাশবোর্ড",
    dashboardSubtitle: "ম্যাক্রো ইন্টেলিজেন্স এবং এক-ট্যাপ স্মার্ট সোয়াপসহ আঞ্চলিক খাবারের পরিকল্পনা।",
    nutrientLabels: { protein: "প্রোটিন", carbs: "কার্বস", fats: "ফ্যাট" },
    mealCard: {
      macroBadge: "Macros",
      subtitle: "সুষম আঞ্চলিক পুষ্টির জন্য বাছাইকৃত খাবার।",
    },
    hero: {
      kicker: "স্মার্ট রিজিওনাল ডায়েট প্ল্যানার",
      slides: [
        {
          title: "নিখুঁত পুষ্টি, চমৎকার নকশা",
          subtitle: "আঞ্চলিক ইন্টেলিজেন্স ও স্পষ্ট স্বাস্থ্য-ইনসাইটসহ আধুনিক পরিকল্পনা ওয়ার্কস্পেস।",
        },
        {
          title: "ডেটা থেকে দৈনন্দিন সিদ্ধান্ত",
          subtitle: "একটি সুন্দর ড্যাশবোর্ডে ম্যাক্রো, ক্যালোরি ও সামর্থ্য সহজে ট্র্যাক করুন।",
        },
        {
          title: "ভারতীয় খাবারের প্রেক্ষাপটে নির্মিত",
          subtitle: "স্থানীয় উপকরণ ও প্রাপ্যতার ভিত্তিতে বাস্তবধর্মী অপ্টিমাইজেশন।",
        },
        {
          title: "প্রোফাইল-নির্ভর পরিকল্পনার অভিজ্ঞতা",
          subtitle: "Mifflin-St Jeor অনুযায়ী তাৎক্ষণিক ব্যক্তিগত ক্যালোরি লক্ষ্য পান।",
        },
      ],
      goToSlideLabel: "স্লাইডে যান",
    },
    macroTrackerTitle: "ম্যাক্রো-নিউট্রিয়েন্ট ট্র্যাকার",
    macroTrackerSubtitle: "দৈনিক মোট: অবশিষ্ট = লক্ষ্য - মোট(গ্রহণ)",
    totalRemaining: "মোট অবশিষ্ট",
    mealTimes: {
      all: "সব খাবার",
      breakfast: "সকালের নাস্তা",
      lunch: "দুপুরের খাবার",
      dinner: "রাতের খাবার",
      snack: "স্ন্যাক",
    },
    calories: "ক্যালোরি",
    consumed: "গ্রহণ",
    target: "লক্ষ্য",
    remaining: "অবশিষ্ট",
    todayCalorieGoals: "আজকের ক্যালোরি লক্ষ্য",
    updatedOn: "আপডেট",
    localeLabel: "ভাষা",
    loading: "খাবার লোড হচ্ছে...",
    errorLoadingMeals: "API থেকে খাবার লোড হয়নি। ফলব্যাক পরিকল্পনা দেখানো হচ্ছে।",
    retry: "আবার চেষ্টা করুন",
    smartSwap: "স্মার্ট সোয়াপ",
    showAlternatives: "বিকল্প দেখুন",
    hideAlternatives: "বিকল্প লুকান",
    planner: {
      title: "ইউজার প্রোফাইল ফর্ম",
      subtitle: "Mifflin-St Jeor দিয়ে ক্যালোরি হিসাব হয় এবং অঞ্চলভিত্তিক অপ্টিমাইজার চলে।",
      age: "বয়স",
      gender: "লিঙ্গ",
      weight: "ওজন (কেজি)",
      height: "উচ্চতা (সেমি)",
      activityLevel: "কার্যকলাপের স্তর",
      region: "অঞ্চল",
      goalMode: "লক্ষ্য মোড",
      genders: { male: "পুরুষ", female: "মহিলা", other: "অন্যান্য" },
      activityOptions: {
        sedentary: "নিষ্ক্রিয়",
        light: "হালকা সক্রিয়",
        moderate: "মধ্যম সক্রিয়",
        active: "খুব সক্রিয়",
        athlete: "অ্যাথলিট",
      },
      goalModes: { "fat-loss": "চর্বি কমানো", maintain: "বর্তমান বজায়", gain: "ওজন বাড়ানো" },
      cards: {
        bmr: "BMR",
        maintenance: "মেইনটেন্যান্স ক্যালোরি",
        target: "লক্ষ্য ক্যালোরি",
        optimizerFocus: "অপ্টিমাইজার ফোকাস",
        adjustment: "সমন্বয়",
        budgetVsNutrition: "বাজেট বনাম পুষ্টি",
      },
      topMatchesTitle: "রিজিওনাল ইন্টেলিজেন্স ইঞ্জিন (সেরা মিল)",
      searchPlaceholder: "নামের মাধ্যমে খাবার খুঁজুন...",
      noResults: "এই খোঁজে কোনো খাবার পাওয়া যায়নি।",
      showing: "দেখানো হচ্ছে",
      previous: "পূর্ববর্তী",
      next: "পরবর্তী",
      page: "পৃষ্ঠা",
      score: "স্কোর",
      affordability: "সাশ্রয়ীতা",
    },
    profilePlanner: {
      title: "প্রোফাইল প্ল্যানার",
      subtitle: "লোকেশন স্বয়ংক্রিয়ভাবে শনাক্ত করুন, ক্যালোরি ও ম্যাক্রো লক্ষ্য হিসাব করুন, এবং মিল স্লট অনুযায়ী পরিকল্পনা তৈরি করুন।",
      yourProfile: "আপনার প্রোফাইল",
      age: "বয়স",
      weight: "ওজন (কেজি)",
      height: "উচ্চতা (সেমি)",
      gender: "লিঙ্গ",
      activity: "কার্যকলাপ",
      goal: "লক্ষ্য",
      location: "লোকেশন",
      genderOptions: { male: "পুরুষ", female: "মহিলা", other: "অন্যান্য" },
      activityOptions: {
        sedentary: "নিষ্ক্রিয়",
        light: "হালকা সক্রিয়",
        moderate: "মধ্যম সক্রিয়",
        active: "খুব সক্রিয়",
      },
      goalOptions: {
        "weight-loss": "ওজন কমানো",
        maintain: "বর্তমান বজায় রাখা",
        "muscle-gain": "পেশি বাড়ানো",
      },
      locationStatus: {
        detecting: "আপনার লোকেশন শনাক্ত করা হচ্ছে...",
        detected: "শনাক্ত লোকেশন: {location}",
        failed: "লোকেশন স্বয়ংক্রিয়ভাবে শনাক্ত করা যায়নি। আপনি নিজে নির্বাচন করতে পারেন।",
        idle: "এখনও লোকেশন শনাক্ত করা হয়নি।",
      },
      dailyTargets: "দৈনিক লক্ষ্য",
      goalMode: "লক্ষ্য মোড",
      bmr: "BMR",
      maintenanceCalories: "মেইনটেন্যান্স ক্যালোরি",
      goalCalories: "লক্ষ্য ক্যালোরি",
      maintenanceMinus200: "মেইনটেন্যান্স - 200 kcal",
      maintenancePlus200: "মেইনটেন্যান্স + 200 kcal",
      maintenanceOnly: "মেইনটেন্যান্স ক্যালোরি",
      mealSuggestionsTitle: "{location} এর জন্য খাবারের পরামর্শ",
      mealSuggestionsSubtitle: "খাবারের আইটেম বাছুন এবং মিল স্লটে যোগ করুন।",
      selectFoodItem: "খাবারের আইটেম বাছুন",
      add: "যোগ করুন",
      remove: "সরান",
      noItemsYet: "এখনও কোনো আইটেম নেই",
      goalCompletion: "লক্ষ্য পূরণ",
    },
  },
};
