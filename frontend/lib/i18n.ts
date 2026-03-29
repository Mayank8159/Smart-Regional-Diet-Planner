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
};

export const copyByLocale: Record<Locale, LocaleCopy> = {
  en: {
    appBadge: "Smart Indian Diet Planner",
    dashboardTitle: "Regional Wellness Dashboard",
    dashboardSubtitle: "Dynamic regional meals with macro intelligence and one-tap Smart Swaps.",
    nutrientLabels: { protein: "Protein", carbs: "Carbs", fats: "Fats" },
    mealCard: {
      macroBadge: "Macros",
      subtitle: "Curated for balanced regional nutrition.",
    },
    hero: {
      kicker: "Smart Indian Diet Planner",
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
  },
  hi: {
    appBadge: "स्मार्ट भारतीय डाइट प्लानर",
    dashboardTitle: "क्षेत्रीय वेलनेस डैशबोर्ड",
    dashboardSubtitle: "मैक्रो इंटेलिजेंस और वन-टैप स्मार्ट स्वैप्स के साथ क्षेत्रीय भोजन योजना।",
    nutrientLabels: { protein: "प्रोटीन", carbs: "कार्ब्स", fats: "वसा" },
    mealCard: {
      macroBadge: "Macros",
      subtitle: "संतुलित क्षेत्रीय पोषण के लिए चुना गया भोजन।",
    },
    hero: {
      kicker: "स्मार्ट भारतीय डाइट प्लानर",
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
  },
  bn: {
    appBadge: "স্মার্ট ভারতীয় ডায়েট প্ল্যানার",
    dashboardTitle: "আঞ্চলিক ওয়েলনেস ড্যাশবোর্ড",
    dashboardSubtitle: "ম্যাক্রো ইন্টেলিজেন্স এবং এক-ট্যাপ স্মার্ট সোয়াপসহ আঞ্চলিক খাবারের পরিকল্পনা।",
    nutrientLabels: { protein: "প্রোটিন", carbs: "কার্বস", fats: "ফ্যাট" },
    mealCard: {
      macroBadge: "Macros",
      subtitle: "সুষম আঞ্চলিক পুষ্টির জন্য বাছাইকৃত খাবার।",
    },
    hero: {
      kicker: "স্মার্ট ভারতীয় ডায়েট প্ল্যানার",
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
  },
};
