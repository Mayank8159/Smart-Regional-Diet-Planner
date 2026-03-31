export type IndianStateName =
  | "Andhra Pradesh"
  | "Arunachal Pradesh"
  | "Assam"
  | "Bihar"
  | "Chhattisgarh"
  | "Goa"
  | "Gujarat"
  | "Haryana"
  | "Himachal Pradesh"
  | "Jharkhand"
  | "Karnataka"
  | "Kerala"
  | "Madhya Pradesh"
  | "Maharashtra"
  | "Manipur"
  | "Meghalaya"
  | "Mizoram"
  | "Nagaland"
  | "Odisha"
  | "Punjab"
  | "Rajasthan"
  | "Sikkim"
  | "Tamil Nadu"
  | "Telangana"
  | "Tripura"
  | "Uttar Pradesh"
  | "Uttarakhand"
  | "West Bengal";

export type StateFoodItem = {
  id: string;
  state: IndianStateName;
  foodName: string;
  servingSize: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
};

type BaseFoodTemplate = {
  foodCode: string;
  foodName: string;
  servingSize: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
};

export const INDIAN_STATES: IndianStateName[] = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

// Generated from public/indb.xlsx using per-100g nutrient normalization.
const BASE_FOODS: BaseFoodTemplate[] = [
  {
    foodCode: "ASC057",
    foodName: "Fried Egg",
    servingSize: "100 g",
    calories: 224,
    macros: {
      protein: 11.6,
      carbs: 0.3,
      fats: 19.6,
    },
  },
  {
    foodCode: "ASC058",
    foodName: "Poached egg",
    servingSize: "100 g",
    calories: 124,
    macros: {
      protein: 12.0,
      carbs: 0.4,
      fats: 8.2,
    },
  },
  {
    foodCode: "ASC059",
    foodName: "Scrambled egg (Ande ki bhurji)",
    servingSize: "100 g",
    calories: 156,
    macros: {
      protein: 10.3,
      carbs: 1.4,
      fats: 12.2,
    },
  },
  {
    foodCode: "ASC060",
    foodName: "Baked egg",
    servingSize: "100 g",
    calories: 219,
    macros: {
      protein: 11.9,
      carbs: 15.4,
      fats: 12.7,
    },
  },
  {
    foodCode: "ASC062",
    foodName: "Stuffed egg omelette/omlet",
    servingSize: "100 g",
    calories: 204,
    macros: {
      protein: 8.6,
      carbs: 2.3,
      fats: 17.8,
    },
  },
  {
    foodCode: "ASC096",
    foodName: "Chapati/Roti",
    servingSize: "100 g",
    calories: 202,
    macros: {
      protein: 5.9,
      carbs: 35.6,
      fats: 3.6,
    },
  },
  {
    foodCode: "ASC097",
    foodName: "Plain parantha/paratha",
    servingSize: "100 g",
    calories: 298,
    macros: {
      protein: 5.1,
      carbs: 30.7,
      fats: 16.9,
    },
  },
  {
    foodCode: "ASC098",
    foodName: "Potato parantha/paratha (Aloo ka parantha/paratha)",
    servingSize: "100 g",
    calories: 205,
    macros: {
      protein: 3.7,
      carbs: 23.9,
      fats: 10.2,
    },
  },
  {
    foodCode: "ASC099",
    foodName: "Radish parantha/paratha (Mooli ka parantha/paratha)",
    servingSize: "100 g",
    calories: 184,
    macros: {
      protein: 3.3,
      carbs: 20.5,
      fats: 9.5,
    },
  },
  {
    foodCode: "ASC100",
    foodName: "Cauliflower parantha/paratha (Phoolgobhi ka parantha/paratha)",
    servingSize: "100 g",
    calories: 178,
    macros: {
      protein: 3.7,
      carbs: 18.8,
      fats: 9.5,
    },
  },
  {
    foodCode: "ASC101",
    foodName: "Dal parantha/paratha",
    servingSize: "100 g",
    calories: 268,
    macros: {
      protein: 6.8,
      carbs: 30.0,
      fats: 13.1,
    },
  },
  {
    foodCode: "ASC102",
    foodName: "Sprouted moong parantha/paratha",
    servingSize: "100 g",
    calories: 229,
    macros: {
      protein: 4.3,
      carbs: 24.3,
      fats: 12.4,
    },
  },
  {
    foodCode: "ASC103",
    foodName: "Pea parantha/paratha (Matar ka parantha/paratha)",
    servingSize: "100 g",
    calories: 191,
    macros: {
      protein: 5.6,
      carbs: 21.5,
      fats: 8.8,
    },
  },
  {
    foodCode: "ASC104",
    foodName: "Keema parantha/paratha",
    servingSize: "100 g",
    calories: 238,
    macros: {
      protein: 9.4,
      carbs: 18.4,
      fats: 13.9,
    },
  },
  {
    foodCode: "ASC105",
    foodName: "Paneer parantha/paratha",
    servingSize: "100 g",
    calories: 263,
    macros: {
      protein: 8.0,
      carbs: 24.3,
      fats: 14.6,
    },
  },
  {
    foodCode: "ASC106",
    foodName: "Besan and spinach parantha/paratha (Besan aur palak ka parantha/paratha)",
    servingSize: "100 g",
    calories: 216,
    macros: {
      protein: 5.5,
      carbs: 21.4,
      fats: 12.1,
    },
  },
  {
    foodCode: "ASC112",
    foodName: "Tandoori parantha/paratha",
    servingSize: "100 g",
    calories: 295,
    macros: {
      protein: 5.1,
      carbs: 30.7,
      fats: 16.5,
    },
  },
  {
    foodCode: "ASC114",
    foodName: "Plain pulao",
    servingSize: "100 g",
    calories: 140,
    macros: {
      protein: 2.3,
      carbs: 21.8,
      fats: 4.6,
    },
  },
  {
    foodCode: "ASC116",
    foodName: "Mushroom pulao",
    servingSize: "100 g",
    calories: 124,
    macros: {
      protein: 2.5,
      carbs: 19.0,
      fats: 4.0,
    },
  },
  {
    foodCode: "ASC119",
    foodName: "Peanut pulao",
    servingSize: "100 g",
    calories: 193,
    macros: {
      protein: 5.3,
      carbs: 21.2,
      fats: 9.5,
    },
  },
  {
    foodCode: "ASC120",
    foodName: "Navratan pulao",
    servingSize: "100 g",
    calories: 262,
    macros: {
      protein: 6.2,
      carbs: 37.0,
      fats: 9.5,
    },
  },
  {
    foodCode: "ASC121",
    foodName: "Green chickpeas pulao (Choliya pulao/Hare chane ka pulao)",
    servingSize: "100 g",
    calories: 173,
    macros: {
      protein: 4.9,
      carbs: 27.6,
      fats: 4.8,
    },
  },
  {
    foodCode: "ASC122",
    foodName: "Mutton biryani/biriyani",
    servingSize: "100 g",
    calories: 191,
    macros: {
      protein: 7.4,
      carbs: 22.5,
      fats: 7.7,
    },
  },
  {
    foodCode: "ASC123",
    foodName: "Vegetable biryani/biriyani",
    servingSize: "100 g",
    calories: 175,
    macros: {
      protein: 3.2,
      carbs: 18.6,
      fats: 9.5,
    },
  },
  {
    foodCode: "ASC124",
    foodName: "Lemon rice (Pulihora, Elumichai sadam, Chitranna)",
    servingSize: "100 g",
    calories: 176,
    macros: {
      protein: 4.3,
      carbs: 21.6,
      fats: 7.9,
    },
  },
  {
    foodCode: "ASC125",
    foodName: "Sweet rice (Meethe chawal)",
    servingSize: "100 g",
    calories: 215,
    macros: {
      protein: 2.1,
      carbs: 42.6,
      fats: 4.6,
    },
  },
  {
    foodCode: "ASC126",
    foodName: "Curd rice (Dahi bhaat/Dahi chawal/ Perugu annam/Daddojanam/Thayir saadam)",
    servingSize: "100 g",
    calories: 196,
    macros: {
      protein: 5.8,
      carbs: 32.9,
      fats: 4.3,
    },
  },
  {
    foodCode: "ASC127",
    foodName: "Tamarind rice (Chintapandu pulihora/Puliyodharai/Puli sadam/Huli anna)",
    servingSize: "100 g",
    calories: 373,
    macros: {
      protein: 7.5,
      carbs: 65.1,
      fats: 8.5,
    },
  },
  {
    foodCode: "ASC128",
    foodName: "Spanish rice",
    servingSize: "100 g",
    calories: 164,
    macros: {
      protein: 4.2,
      carbs: 31.1,
      fats: 2.2,
    },
  },
  {
    foodCode: "ASC129",
    foodName: "Chinese fried rice",
    servingSize: "100 g",
    calories: 121,
    macros: {
      protein: 4.1,
      carbs: 13.4,
      fats: 5.4,
    },
  },
  {
    foodCode: "ASC134",
    foodName: "Vegetable chowmein",
    servingSize: "100 g",
    calories: 130,
    macros: {
      protein: 3.1,
      carbs: 15.4,
      fats: 6.4,
    },
  },
  {
    foodCode: "ASC135",
    foodName: "Chicken chowmein",
    servingSize: "100 g",
    calories: 151,
    macros: {
      protein: 6.3,
      carbs: 13.3,
      fats: 8.2,
    },
  },
  {
    foodCode: "ASC139",
    foodName: "Pasta hot pot",
    servingSize: "100 g",
    calories: 125,
    macros: {
      protein: 5.8,
      carbs: 11.6,
      fats: 6.5,
    },
  },
  {
    foodCode: "ASC140",
    foodName: "Chicken lasagne",
    servingSize: "100 g",
    calories: 187,
    macros: {
      protein: 10.5,
      carbs: 13.9,
      fats: 10.4,
    },
  },
  {
    foodCode: "ASC142",
    foodName: "Naan",
    servingSize: "100 g",
    calories: 286,
    macros: {
      protein: 8.1,
      carbs: 51.8,
      fats: 5.0,
    },
  },
  {
    foodCode: "ASC144",
    foodName: "Idli",
    servingSize: "100 g",
    calories: 138,
    macros: {
      protein: 4.6,
      carbs: 28.2,
      fats: 0.3,
    },
  },
  {
    foodCode: "ASC146",
    foodName: "Masala dosa",
    servingSize: "100 g",
    calories: 165,
    macros: {
      protein: 3.3,
      carbs: 19.6,
      fats: 7.8,
    },
  },
  {
    foodCode: "ASC147",
    foodName: "Semolina dosa (Suji/Rava dosa)",
    servingSize: "100 g",
    calories: 227,
    macros: {
      protein: 7.3,
      carbs: 32.8,
      fats: 7.1,
    },
  },
  {
    foodCode: "ASC149",
    foodName: "Paneer kaathi roll",
    servingSize: "100 g",
    calories: 286,
    macros: {
      protein: 6.9,
      carbs: 20.1,
      fats: 19.6,
    },
  },
  {
    foodCode: "ASC150",
    foodName: "Makki ki roti",
    servingSize: "100 g",
    calories: 264,
    macros: {
      protein: 3.5,
      carbs: 24.2,
      fats: 16.8,
    },
  },
  {
    foodCode: "ASC161",
    foodName: "Black channa curry/Bengal gram curry (Kale chane ki curry)",
    servingSize: "100 g",
    calories: 141,
    macros: {
      protein: 5.7,
      carbs: 14.1,
      fats: 6.6,
    },
  },
  {
    foodCode: "ASC162",
    foodName: "Chickpeas curry (Safed channa curry)",
    servingSize: "100 g",
    calories: 163,
    macros: {
      protein: 6.1,
      carbs: 20.0,
      fats: 6.8,
    },
  },
  {
    foodCode: "ASC163",
    foodName: "Lobia curry",
    servingSize: "100 g",
    calories: 149,
    macros: {
      protein: 6.1,
      carbs: 17.9,
      fats: 5.6,
    },
  },
  {
    foodCode: "ASC164",
    foodName: "Soyabean curry",
    servingSize: "100 g",
    calories: 163,
    macros: {
      protein: 10.4,
      carbs: 6.8,
      fats: 10.2,
    },
  },
  {
    foodCode: "ASC165",
    foodName: "Kidney bean curry (Rajmah curry)",
    servingSize: "100 g",
    calories: 144,
    macros: {
      protein: 6.0,
      carbs: 16.4,
      fats: 5.8,
    },
  },
  {
    foodCode: "ASC191",
    foodName: "Pea paneer curry (Matar paneer)",
    servingSize: "100 g",
    calories: 135,
    macros: {
      protein: 6.6,
      carbs: 9.3,
      fats: 7.8,
    },
  },
  {
    foodCode: "ASC195",
    foodName: "Paneer curry",
    servingSize: "100 g",
    calories: 177,
    macros: {
      protein: 7.8,
      carbs: 8.4,
      fats: 12.4,
    },
  },
  {
    foodCode: "ASC020",
    foodName: "Egg nog",
    servingSize: "100 g",
    calories: 97,
    macros: {
      protein: 4.8,
      carbs: 8.1,
      fats: 5.1,
    },
  },
  {
    foodCode: "ASC047",
    foodName: "Cracked wheat porridge (Meetha daliya)",
    servingSize: "100 g",
    calories: 82,
    macros: {
      protein: 2.6,
      carbs: 8.9,
      fats: 4.1,
    },
  },
  {
    foodCode: "ASC048",
    foodName: "Semolina porridge (Suji/Rava daliya)",
    servingSize: "100 g",
    calories: 101,
    macros: {
      protein: 3.8,
      carbs: 12.4,
      fats: 4.1,
    },
  },
  {
    foodCode: "ASC052",
    foodName: "Rice flakes (Chiwda/Aval)",
    servingSize: "100 g",
    calories: 112,
    macros: {
      protein: 3.6,
      carbs: 15.6,
      fats: 4.0,
    },
  },
  {
    foodCode: "ASC054",
    foodName: "Murmura (Puffed rice)",
    servingSize: "100 g",
    calories: 113,
    macros: {
      protein: 3.6,
      carbs: 15.7,
      fats: 4.0,
    },
  },
  {
    foodCode: "ASC113",
    foodName: "Boiled rice (Uble chawal)",
    servingSize: "100 g",
    calories: 117,
    macros: {
      protein: 2.6,
      carbs: 25.7,
      fats: 0.2,
    },
  },
  {
    foodCode: "ASC115",
    foodName: "Mixed vegetable pulao",
    servingSize: "100 g",
    calories: 113,
    macros: {
      protein: 2.7,
      carbs: 17.5,
      fats: 3.3,
    },
  },
  {
    foodCode: "ASC117",
    foodName: "Sprouted moong pulao",
    servingSize: "100 g",
    calories: 113,
    macros: {
      protein: 2.2,
      carbs: 17.5,
      fats: 3.6,
    },
  },
  {
    foodCode: "ASC118",
    foodName: "Paneer pulao",
    servingSize: "100 g",
    calories: 582,
    macros: {
      protein: 2.0,
      carbs: 8.8,
      fats: 59.8,
    },
  },
  {
    foodCode: "ASC148",
    foodName: "Onion tomato uttapam",
    servingSize: "100 g",
    calories: 462,
    macros: {
      protein: 1.9,
      carbs: 11.3,
      fats: 45.3,
    },
  },
  {
    foodCode: "ASC152",
    foodName: "Washed urad dal (Dhuli urad ki dal)",
    servingSize: "100 g",
    calories: 61,
    macros: {
      protein: 2.5,
      carbs: 5.8,
      fats: 3.0,
    },
  },
  {
    foodCode: "ASC153",
    foodName: "Split bengal gram with bottle gourd (Channa dal with ghiya/lauki)",
    servingSize: "100 g",
    calories: 73,
    macros: {
      protein: 2.8,
      carbs: 7.1,
      fats: 3.6,
    },
  },
  {
    foodCode: "ASC155",
    foodName: "Mixed dal",
    servingSize: "100 g",
    calories: 62,
    macros: {
      protein: 2.5,
      carbs: 5.8,
      fats: 3.1,
    },
  },
  {
    foodCode: "ASC160",
    foodName: "Moti mahal dal (Urad rajmah mix dal)",
    servingSize: "100 g",
    calories: 103,
    macros: {
      protein: 3.9,
      carbs: 8.7,
      fats: 5.7,
    },
  },
  {
    foodCode: "ASC167",
    foodName: "Sambar",
    servingSize: "100 g",
    calories: 97,
    macros: {
      protein: 3.4,
      carbs: 10.6,
      fats: 4.4,
    },
  },
  {
    foodCode: "ASC190",
    foodName: "Pea potato curry (Aloo matar)",
    servingSize: "100 g",
    calories: 101,
    macros: {
      protein: 3.5,
      carbs: 9.7,
      fats: 5.1,
    },
  },
  {
    foodCode: "ASC192",
    foodName: "Pea mushroom curry (Matar mushroom)",
    servingSize: "100 g",
    calories: 93,
    macros: {
      protein: 3.9,
      carbs: 7.4,
      fats: 5.2,
    },
  },
  {
    foodCode: "ASC193",
    foodName: "Pea curry (Matar ki sabzi)",
    servingSize: "100 g",
    calories: 103,
    macros: {
      protein: 4.5,
      carbs: 9.2,
      fats: 5.1,
    },
  },
  {
    foodCode: "ASC194",
    foodName: "Pea vadi curry",
    servingSize: "100 g",
    calories: 102,
    macros: {
      protein: 4.6,
      carbs: 8.9,
      fats: 5.1,
    },
  },
  {
    foodCode: "ASC196",
    foodName: "Lotus stem curry (Kamal kakdi curry)",
    servingSize: "100 g",
    calories: 110,
    macros: {
      protein: 1.5,
      carbs: 9.2,
      fats: 7.3,
    },
  },
  {
    foodCode: "ASC198",
    foodName: "Pea kofta curry (Matar kofta curry)",
    servingSize: "100 g",
    calories: 596,
    macros: {
      protein: 2.0,
      carbs: 4.2,
      fats: 63.4,
    },
  },
  {
    foodCode: "ASC199",
    foodName: "Spinach kofta curry (Palak kofta curry)",
    servingSize: "100 g",
    calories: 572,
    macros: {
      protein: 1.1,
      carbs: 3.6,
      fats: 61.5,
    },
  },
  {
    foodCode: "ASC024",
    foodName: "Egg sandwich (Ande ka sandwich)",
    servingSize: "100 g",
    calories: 286,
    macros: {
      protein: 8.7,
      carbs: 29.2,
      fats: 15.8,
    },
  },
  {
    foodCode: "ASC028",
    foodName: "Chicken sandwich",
    servingSize: "100 g",
    calories: 253,
    macros: {
      protein: 13.1,
      carbs: 25.4,
      fats: 11.7,
    },
  },
  {
    foodCode: "ASC037",
    foodName: "Egg and tomato sandwich (Ande aur tamatar ka sandwich)",
    servingSize: "100 g",
    calories: 222,
    macros: {
      protein: 7.7,
      carbs: 25.9,
      fats: 10.5,
    },
  },
  {
    foodCode: "ASC042",
    foodName: "Paneer pea sandwich (toasted) (Paneer matar ka sandwich)",
    servingSize: "100 g",
    calories: 250,
    macros: {
      protein: 12.4,
      carbs: 24.1,
      fats: 12.0,
    },
  },
  {
    foodCode: "ASC043",
    foodName: "Chicken sandwich (toasted)",
    servingSize: "100 g",
    calories: 167,
    macros: {
      protein: 12.1,
      carbs: 18.8,
      fats: 5.3,
    },
  },
  {
    foodCode: "ASC056",
    foodName: "Boiled egg (Ubla anda)",
    servingSize: "100 g",
    calories: 45,
    macros: {
      protein: 4.4,
      carbs: 0.1,
      fats: 3.0,
    },
  },
  {
    foodCode: "ASC151",
    foodName: "Washed moong dal (Dhuli moong ki dal)",
    servingSize: "100 g",
    calories: 50,
    macros: {
      protein: 2.7,
      carbs: 5.9,
      fats: 1.7,
    },
  },
  {
    foodCode: "ASC156",
    foodName: "Whole moong (Moong ki dal)",
    servingSize: "100 g",
    calories: 54,
    macros: {
      protein: 2.2,
      carbs: 5.2,
      fats: 2.6,
    },
  },
  {
    foodCode: "ASC157",
    foodName: "Whole masoor (Masoor ki dal)",
    servingSize: "100 g",
    calories: 54,
    macros: {
      protein: 2.3,
      carbs: 5.4,
      fats: 2.5,
    },
  },
  {
    foodCode: "ASC158",
    foodName: "Whole moth (Moth ki dal)",
    servingSize: "100 g",
    calories: 55,
    macros: {
      protein: 2.0,
      carbs: 5.7,
      fats: 2.6,
    },
  },
  {
    foodCode: "ASC159",
    foodName: "Whole urad (Urad ki dal)",
    servingSize: "100 g",
    calories: 54,
    macros: {
      protein: 2.2,
      carbs: 5.0,
      fats: 2.6,
    },
  },
  {
    foodCode: "ASC061",
    foodName: "Plain omelette/omlet",
    servingSize: "100 g",
    calories: 272,
    macros: {
      protein: 9.7,
      carbs: 0.6,
      fats: 25.7,
    },
  },
  {
    foodCode: "ASC063",
    foodName: "Pancake",
    servingSize: "100 g",
    calories: 203,
    macros: {
      protein: 5.7,
      carbs: 20.5,
      fats: 10.8,
    },
  },
  {
    foodCode: "ASC064",
    foodName: "Keema pancake",
    servingSize: "100 g",
    calories: 176,
    macros: {
      protein: 9.0,
      carbs: 9.6,
      fats: 11.2,
    },
  },
  {
    foodCode: "ASC065",
    foodName: "Vegetable pancake",
    servingSize: "100 g",
    calories: 125,
    macros: {
      protein: 3.9,
      carbs: 12.2,
      fats: 6.6,
    },
  },
  {
    foodCode: "ASC066",
    foodName: "Jam and fruit pancake",
    servingSize: "100 g",
    calories: 162,
    macros: {
      protein: 3.8,
      carbs: 20.7,
      fats: 7.0,
    },
  },
  {
    foodCode: "ASC067",
    foodName: "Khoa and coconut pancake",
    servingSize: "100 g",
    calories: 272,
    macros: {
      protein: 7.0,
      carbs: 27.3,
      fats: 15.3,
    },
  },
  {
    foodCode: "ASC133",
    foodName: "Macroni cheese pie",
    servingSize: "100 g",
    calories: 171,
    macros: {
      protein: 5.9,
      carbs: 21.1,
      fats: 7.5,
    },
  },
  {
    foodCode: "ASC136",
    foodName: "Cheese noodle ring",
    servingSize: "100 g",
    calories: 134,
    macros: {
      protein: 6.2,
      carbs: 14.0,
      fats: 6.1,
    },
  },
  {
    foodCode: "ASC138",
    foodName: "Penne platter",
    servingSize: "100 g",
    calories: 177,
    macros: {
      protein: 5.0,
      carbs: 20.9,
      fats: 8.7,
    },
  },
  {
    foodCode: "ASC141",
    foodName: "Fettuccine with spinach sauce",
    servingSize: "100 g",
    calories: 129,
    macros: {
      protein: 3.1,
      carbs: 12.2,
      fats: 7.8,
    },
  },
  {
    foodCode: "ASC154",
    foodName: "Dry washed urad",
    servingSize: "100 g",
    calories: 125,
    macros: {
      protein: 6.8,
      carbs: 15.7,
      fats: 3.5,
    },
  },
  {
    foodCode: "ASC168",
    foodName: "Besan kadhi with pakodies",
    servingSize: "100 g",
    calories: 403,
    macros: {
      protein: 1.6,
      carbs: 3.6,
      fats: 42.6,
    },
  },
  {
    foodCode: "ASC169",
    foodName: "Khatta channa",
    servingSize: "100 g",
    calories: 203,
    macros: {
      protein: 6.3,
      carbs: 21.1,
      fats: 10.6,
    },
  },
  {
    foodCode: "ASC172",
    foodName: "Potato capsicum (Shimla mirch aloo)",
    servingSize: "100 g",
    calories: 126,
    macros: {
      protein: 1.4,
      carbs: 8.7,
      fats: 9.3,
    },
  },
  {
    foodCode: "ASC175",
    foodName: "Potato fenugreek (Aloo methi)",
    servingSize: "100 g",
    calories: 135,
    macros: {
      protein: 2.2,
      carbs: 8.5,
      fats: 10.0,
    },
  },
  {
    foodCode: "ASC179",
    foodName: "Beans with coconut (Nariyal aur sem/phali; Beans thoran)",
    servingSize: "100 g",
    calories: 132,
    macros: {
      protein: 2.6,
      carbs: 4.4,
      fats: 11.4,
    },
  },
  {
    foodCode: "ASC180",
    foodName: "Cauliflower with coconut (Nariyal ke saath phoolgobhi)",
    servingSize: "100 g",
    calories: 132,
    macros: {
      protein: 2.6,
      carbs: 4.0,
      fats: 11.6,
    },
  },
  {
    foodCode: "ASC182",
    foodName: "Raw turnip with coconut",
    servingSize: "100 g",
    calories: 132,
    macros: {
      protein: 1.8,
      carbs: 5.8,
      fats: 11.5,
    },
  },
  {
    foodCode: "ASC183",
    foodName: "Raw papaya with coconut (Papaya thoran)",
    servingSize: "100 g",
    calories: 133,
    macros: {
      protein: 1.5,
      carbs: 5.6,
      fats: 11.4,
    },
  },
  {
    foodCode: "ASC197",
    foodName: "Gravy for kofta",
    servingSize: "100 g",
    calories: 126,
    macros: {
      protein: 1.7,
      carbs: 6.3,
      fats: 10.3,
    },
  },
  {
    foodCode: "ASC211",
    foodName: "Baked potato with skin",
    servingSize: "100 g",
    calories: 136,
    macros: {
      protein: 3.4,
      carbs: 11.1,
      fats: 8.5,
    },
  },
  {
    foodCode: "ASC170",
    foodName: "Sprouted moong dal chat",
    servingSize: "100 g",
    calories: 32,
    macros: {
      protein: 1.3,
      carbs: 6.0,
      fats: 0.3,
    },
  },
  {
    foodCode: "ASC050",
    foodName: "Oatmeal Porridge",
    servingSize: "100 g",
    calories: 73,
    macros: {
      protein: 2.6,
      carbs: 8.8,
      fats: 3.2,
    },
  },
  {
    foodCode: "ASC051",
    foodName: "Cornflakes with milk",
    servingSize: "100 g",
    calories: 117,
    macros: {
      protein: 3.6,
      carbs: 14.9,
      fats: 5.1,
    },
  },
  {
    foodCode: "ASC053",
    foodName: "Wheat flakes",
    servingSize: "100 g",
    calories: 112,
    macros: {
      protein: 3.6,
      carbs: 15.6,
      fats: 4.0,
    },
  },
  {
    foodCode: "ASC055",
    foodName: "Puffed wheat (Murmure/Moori)",
    servingSize: "100 g",
    calories: 113,
    macros: {
      protein: 3.6,
      carbs: 15.7,
      fats: 4.0,
    },
  },
  {
    foodCode: "ASC137",
    foodName: "Spaghetti and cheese balls in tomato sauce",
    servingSize: "100 g",
    calories: 508,
    macros: {
      protein: 2.4,
      carbs: 7.8,
      fats: 52.1,
    },
  },
  {
    foodCode: "ASC171",
    foodName: "Potato cauliflower (Aloo gobhi)",
    servingSize: "100 g",
    calories: 106,
    macros: {
      protein: 1.9,
      carbs: 6.0,
      fats: 8.1,
    },
  },
  {
    foodCode: "ASC173",
    foodName: "Cabbage and peas (Pattagobhi aur matar)",
    servingSize: "100 g",
    calories: 64,
    macros: {
      protein: 3.2,
      carbs: 6.2,
      fats: 2.6,
    },
  },
  {
    foodCode: "ASC174",
    foodName: "Carrot and fenugreek leaves (Gajar methi)",
    servingSize: "100 g",
    calories: 62,
    macros: {
      protein: 2.1,
      carbs: 4.2,
      fats: 3.8,
    },
  },
  {
    foodCode: "ASC177",
    foodName: "Brinjal bhartha (Baingan ka bhartha)",
    servingSize: "100 g",
    calories: 65,
    macros: {
      protein: 1.4,
      carbs: 4.4,
      fats: 4.5,
    },
  },
  {
    foodCode: "ASC178",
    foodName: "Dry potato (Sookhe aloo)",
    servingSize: "100 g",
    calories: 103,
    macros: {
      protein: 1.6,
      carbs: 14.4,
      fats: 4.2,
    },
  },
  {
    foodCode: "ASC181",
    foodName: "Carrot and cabbage with coconut (Nariyal ke saath pattagobhi aur gajar)",
    servingSize: "100 g",
    calories: 107,
    macros: {
      protein: 1.8,
      carbs: 5.0,
      fats: 8.6,
    },
  },
  {
    foodCode: "ASC184",
    foodName: "Stuffed okra (Bharwa bhindi)",
    servingSize: "100 g",
    calories: 94,
    macros: {
      protein: 2.1,
      carbs: 3.9,
      fats: 7.7,
    },
  },
  {
    foodCode: "ASC185",
    foodName: "Stuffed round gourd (Bharwa tinde)",
    servingSize: "100 g",
    calories: 73,
    macros: {
      protein: 1.1,
      carbs: 4.0,
      fats: 5.7,
    },
  },
  {
    foodCode: "ASC186",
    foodName: "Stuffed capsicum (Bharwa shimla mirch)",
    servingSize: "100 g",
    calories: 91,
    macros: {
      protein: 1.3,
      carbs: 8.3,
      fats: 5.7,
    },
  },
  {
    foodCode: "ASC187",
    foodName: "Stuffed brinjal (Bharwa baingan)",
    servingSize: "100 g",
    calories: 93,
    macros: {
      protein: 1.5,
      carbs: 4.0,
      fats: 7.7,
    },
  },
  {
    foodCode: "ASC189",
    foodName: "Stuffed tomatoes (Bharwa tamatar)",
    servingSize: "100 g",
    calories: 93,
    macros: {
      protein: 3.3,
      carbs: 6.2,
      fats: 6.1,
    },
  },
  {
    foodCode: "ASC208",
    foodName: "Baked vegetables",
    servingSize: "100 g",
    calories: 89,
    macros: {
      protein: 3.7,
      carbs: 8.4,
      fats: 4.4,
    },
  },
  {
    foodCode: "ASC210",
    foodName: "Baked vegetables with spinach",
    servingSize: "100 g",
    calories: 78,
    macros: {
      protein: 3.2,
      carbs: 6.9,
      fats: 4.0,
    },
  },
  {
    foodCode: "ASC023",
    foodName: "Cheese and chilli sandwich",
    servingSize: "100 g",
    calories: 218,
    macros: {
      protein: 6.8,
      carbs: 27.4,
      fats: 9.8,
    },
  },
  {
    foodCode: "ASC025",
    foodName: "Cucumber sandwich (Kheere ka sandwich)",
    servingSize: "100 g",
    calories: 189,
    macros: {
      protein: 4.8,
      carbs: 25.8,
      fats: 8.0,
    },
  },
  {
    foodCode: "ASC026",
    foodName: "Cheese and pineapple sandwich (Cheese aur ananas ka sandwich)",
    servingSize: "100 g",
    calories: 258,
    macros: {
      protein: 8.2,
      carbs: 29.1,
      fats: 12.8,
    },
  },
  {
    foodCode: "ASC027",
    foodName: "Cheese and tomato sandwich (Cheese aur tamatar ke sandwich)",
    servingSize: "100 g",
    calories: 243,
    macros: {
      protein: 7.9,
      carbs: 26.9,
      fats: 12.3,
    },
  },
  {
    foodCode: "ASC029",
    foodName: "Peanut and tomato sandwich (Moongfali aur tamatar ka sandwich)",
    servingSize: "100 g",
    calories: 291,
    macros: {
      protein: 9.5,
      carbs: 28.5,
      fats: 16.1,
    },
  },
  {
    foodCode: "ASC030",
    foodName: "Rainbow sandwich",
    servingSize: "100 g",
    calories: 273,
    macros: {
      protein: 7.7,
      carbs: 34.3,
      fats: 12.5,
    },
  },
  {
    foodCode: "ASC031",
    foodName: "Club sandwich",
    servingSize: "100 g",
    calories: 235,
    macros: {
      protein: 7.3,
      carbs: 18.5,
      fats: 15.1,
    },
  },
  {
    foodCode: "ASC032",
    foodName: "Vegetarian club sandwich",
    servingSize: "100 g",
    calories: 198,
    macros: {
      protein: 5.5,
      carbs: 19.7,
      fats: 11.3,
    },
  },
  {
    foodCode: "ASC033",
    foodName: "Pin wheel sandwich",
    servingSize: "100 g",
    calories: 312,
    macros: {
      protein: 8.8,
      carbs: 14.0,
      fats: 24.9,
    },
  },
  {
    foodCode: "ASC034",
    foodName: "Carrot apple sandwich (Gajar aur seb ka sandwich)",
    servingSize: "100 g",
    calories: 214,
    macros: {
      protein: 5.3,
      carbs: 29.0,
      fats: 9.1,
    },
  },
  {
    foodCode: "ASC035",
    foodName: "Salami sandwich",
    servingSize: "100 g",
    calories: 256,
    macros: {
      protein: 8.7,
      carbs: 21.5,
      fats: 15.5,
    },
  },
  {
    foodCode: "ASC036",
    foodName: "Vegetable and mayonnaise sandwich",
    servingSize: "100 g",
    calories: 244,
    macros: {
      protein: 4.5,
      carbs: 23.2,
      fats: 15.4,
    },
  },
  {
    foodCode: "ASC038",
    foodName: "Sweet open sandwich",
    servingSize: "100 g",
    calories: 244,
    macros: {
      protein: 5.0,
      carbs: 39.2,
      fats: 8.2,
    },
  },
  {
    foodCode: "ASC039",
    foodName: "Mushroom and cheese sandwich (toasted)",
    servingSize: "100 g",
    calories: 227,
    macros: {
      protein: 7.8,
      carbs: 21.0,
      fats: 13.0,
    },
  },
  {
    foodCode: "ASC040",
    foodName: "Cheese and tomato sandwich (toasted) (Cheese aur tamatar ke sandwich (toasted))",
    servingSize: "100 g",
    calories: 225,
    macros: {
      protein: 6.8,
      carbs: 21.4,
      fats: 13.0,
    },
  },
  {
    foodCode: "ASC041",
    foodName: "Pea potato sandwich (toasted) (Matar aloo ka sandwich)",
    servingSize: "100 g",
    calories: 165,
    macros: {
      protein: 4.6,
      carbs: 25.2,
      fats: 5.4,
    },
  },
  {
    foodCode: "ASC044",
    foodName: "Pea keema sandwich (toasted) (Matar aur keema ka sandwich)",
    servingSize: "100 g",
    calories: 172,
    macros: {
      protein: 11.1,
      carbs: 20.3,
      fats: 5.6,
    },
  },
  {
    foodCode: "ASC009",
    foodName: "Lem-o-gin",
    servingSize: "100 g",
    calories: 22,
    macros: {
      protein: 0.1,
      carbs: 5.6,
      fats: 0.0,
    },
  },
  {
    foodCode: "ASC209",
    foodName: "Cauliflower musallam (Phoolgobhi musallam)",
    servingSize: "100 g",
    calories: 59,
    macros: {
      protein: 1.9,
      carbs: 4.5,
      fats: 3.5,
    },
  },
  {
    foodCode: "ASC046",
    foodName: "Sesame toast",
    servingSize: "100 g",
    calories: 495,
    macros: {
      protein: 1.9,
      carbs: 11.1,
      fats: 49.4,
    },
  },
  {
    foodCode: "ASC070",
    foodName: "Chicken stock",
    servingSize: "100 g",
    calories: 30,
    macros: {
      protein: 3.7,
      carbs: 0.4,
      fats: 1.5,
    },
  },
  {
    foodCode: "ASC081",
    foodName: "Chicken consomme (Clear chicken soup)",
    servingSize: "100 g",
    calories: 48,
    macros: {
      protein: 11.5,
      carbs: 1.2,
      fats: 12.0,
    },
  },
  {
    foodCode: "ASC087",
    foodName: "Chicken sweet corn soup",
    servingSize: "100 g",
    calories: 28,
    macros: {
      protein: 14.5,
      carbs: 1.6,
      fats: 12.6,
    },
  },
  {
    foodCode: "ASC089",
    foodName: "Egg drop soup",
    servingSize: "100 g",
    calories: 27,
    macros: {
      protein: 12.9,
      carbs: 1.1,
      fats: 13.5,
    },
  },
  {
    foodCode: "ASC083",
    foodName: "Cream of green peas soup",
    servingSize: "100 g",
    calories: 128,
    macros: {
      protein: 7.1,
      carbs: 6.8,
      fats: 14.8,
    },
  },
  {
    foodCode: "ASC014",
    foodName: "Hot cocoa",
    servingSize: "100 g",
    calories: 90,
    macros: {
      protein: 3.4,
      carbs: 9.2,
      fats: 4.6,
    },
  },
  {
    foodCode: "ASC015",
    foodName: "Cold coffee with ice cream",
    servingSize: "100 g",
    calories: 68,
    macros: {
      protein: 1.6,
      carbs: 11.2,
      fats: 2.1,
    },
  },
  {
    foodCode: "ASC016",
    foodName: "Banana milkshake (Kele milkshake)",
    servingSize: "100 g",
    calories: 65,
    macros: {
      protein: 1.8,
      carbs: 9.1,
      fats: 2.4,
    },
  },
  {
    foodCode: "ASC079",
    foodName: "Clear tomato soup (Tamatar ka soup)",
    servingSize: "100 g",
    calories: 80,
    macros: {
      protein: 4.8,
      carbs: 3.5,
      fats: 12.2,
    },
  },
  {
    foodCode: "ASC082",
    foodName: "Cream of tomato soup",
    servingSize: "100 g",
    calories: 98,
    macros: {
      protein: 4.6,
      carbs: 3.9,
      fats: 13.1,
    },
  },
  {
    foodCode: "ASC084",
    foodName: "Cream of spinach soup",
    servingSize: "100 g",
    calories: 101,
    macros: {
      protein: 5.2,
      carbs: 3.4,
      fats: 13.3,
    },
  },
  {
    foodCode: "ASC085",
    foodName: "Cream of mixed vegetable soup",
    servingSize: "100 g",
    calories: 60,
    macros: {
      protein: 6.8,
      carbs: 4.9,
      fats: 9.0,
    },
  },
  {
    foodCode: "ASC086",
    foodName: "Cream of mushroom soup",
    servingSize: "100 g",
    calories: 117,
    macros: {
      protein: 6.6,
      carbs: 3.7,
      fats: 15.5,
    },
  },
  {
    foodCode: "ASC090",
    foodName: "Chinese cabbage and meat ball soup",
    servingSize: "100 g",
    calories: 484,
    macros: {
      protein: 5.2,
      carbs: 1.4,
      fats: 56.6,
    },
  },
  {
    foodCode: "ASC045",
    foodName: "Classic club sandwich",
    servingSize: "100 g",
    calories: 201,
    macros: {
      protein: 6.7,
      carbs: 18.5,
      fats: 11.6,
    },
  },
  {
    foodCode: "ASC001",
    foodName: "Hot tea (Garam Chai)",
    servingSize: "100 g",
    calories: 16,
    macros: {
      protein: 0.4,
      carbs: 2.6,
      fats: 0.5,
    },
  },
  {
    foodCode: "ASC002",
    foodName: "Instant coffee",
    servingSize: "100 g",
    calories: 23,
    macros: {
      protein: 0.6,
      carbs: 3.7,
      fats: 0.7,
    },
  },
  {
    foodCode: "ASC003",
    foodName: "Espresso coffee",
    servingSize: "100 g",
    calories: 52,
    macros: {
      protein: 1.7,
      carbs: 6.6,
      fats: 2.1,
    },
  },
  {
    foodCode: "ASC004",
    foodName: "Iced tea",
    servingSize: "100 g",
    calories: 10,
    macros: {
      protein: 0.0,
      carbs: 2.7,
      fats: 0.0,
    },
  },
  {
    foodCode: "ASC005",
    foodName: "Raw mango drink (Aam panna)",
    servingSize: "100 g",
    calories: 36,
    macros: {
      protein: 0.2,
      carbs: 9.0,
      fats: 0.0,
    },
  },
  {
    foodCode: "ASC006",
    foodName: "Fruit Punch (with fresh juices)",
    servingSize: "100 g",
    calories: 36,
    macros: {
      protein: 0.1,
      carbs: 9.4,
      fats: 0.0,
    },
  },
  {
    foodCode: "ASC007",
    foodName: "Fruit Punch (with squashes)",
    servingSize: "100 g",
    calories: 23,
    macros: {
      protein: 0.1,
      carbs: 6.0,
      fats: 0.0,
    },
  },
  {
    foodCode: "ASC008",
    foodName: "Lemonade",
    servingSize: "100 g",
    calories: 21,
    macros: {
      protein: 0.0,
      carbs: 5.5,
      fats: 0.0,
    },
  },
  {
    foodCode: "ASC010",
    foodName: "Cumin infused water (Jeere/Zeere ka pani)",
    servingSize: "100 g",
    calories: 9,
    macros: {
      protein: 0.2,
      carbs: 1.9,
      fats: 0.1,
    },
  },
  {
    foodCode: "ASC011",
    foodName: "Coco pine cooler",
    servingSize: "100 g",
    calories: 33,
    macros: {
      protein: 0.6,
      carbs: 5.7,
      fats: 1.0,
    },
  },
  {
    foodCode: "ASC012",
    foodName: "Summer cooler",
    servingSize: "100 g",
    calories: 22,
    macros: {
      protein: 0.4,
      carbs: 5.4,
      fats: 0.0,
    },
  },
  {
    foodCode: "ASC017",
    foodName: "Mango milkshake (Aam milkshake)",
    servingSize: "100 g",
    calories: 57,
    macros: {
      protein: 1.7,
      carbs: 7.2,
      fats: 2.3,
    },
  },
  {
    foodCode: "ASC018",
    foodName: "Pineapple milkshake (Ananas milkshake)",
    servingSize: "100 g",
    calories: 56,
    macros: {
      protein: 1.7,
      carbs: 7.6,
      fats: 2.2,
    },
  },
  {
    foodCode: "ASC019",
    foodName: "Orange milkshake (Narangi milkshake)",
    servingSize: "100 g",
    calories: 57,
    macros: {
      protein: 1.9,
      carbs: 7.1,
      fats: 2.5,
    },
  },
  {
    foodCode: "ASC021",
    foodName: "Sweet Lassi (Meethi lassi)",
    servingSize: "100 g",
    calories: 36,
    macros: {
      protein: 1.3,
      carbs: 6.5,
      fats: 0.7,
    },
  },
  {
    foodCode: "ASC022",
    foodName: "Lassi (salted)",
    servingSize: "100 g",
    calories: 19,
    macros: {
      protein: 1.4,
      carbs: 1.9,
      fats: 0.7,
    },
  },
  {
    foodCode: "ASC068",
    foodName: "Brown stock",
    servingSize: "100 g",
    calories: 21,
    macros: {
      protein: 1.9,
      carbs: 0.3,
      fats: 1.4,
    },
  },
  {
    foodCode: "ASC069",
    foodName: "Vegetable stock",
    servingSize: "100 g",
    calories: 18,
    macros: {
      protein: 0.3,
      carbs: 1.0,
      fats: 1.4,
    },
  },
  {
    foodCode: "ASC080",
    foodName: "Lentil soup",
    servingSize: "100 g",
    calories: 31,
    macros: {
      protein: 9.7,
      carbs: 3.9,
      fats: 11.7,
    },
  },
  {
    foodCode: "ASC088",
    foodName: "Minestrone soup",
    servingSize: "100 g",
    calories: 43,
    macros: {
      protein: 9.3,
      carbs: 3.7,
      fats: 11.1,
    },
  },
  {
    foodCode: "ASC091",
    foodName: "French onion soup",
    servingSize: "100 g",
    calories: 56,
    macros: {
      protein: 11.4,
      carbs: 4.3,
      fats: 14.4,
    },
  },
  {
    foodCode: "ASC092",
    foodName: "Hot and sour soup",
    servingSize: "100 g",
    calories: 32,
    macros: {
      protein: 3.1,
      carbs: 1.8,
      fats: 1.3,
    },
  },
  {
    foodCode: "ASC093",
    foodName: "Talaumein soup",
    servingSize: "100 g",
    calories: 36,
    macros: {
      protein: 10.1,
      carbs: 4.2,
      fats: 12.8,
    },
  },
  {
    foodCode: "ASC094",
    foodName: "Cold cucumber soup (Thanda kheere ka soup)",
    servingSize: "100 g",
    calories: 48,
    macros: {
      protein: 3.0,
      carbs: 4.6,
      fats: 2.0,
    },
  },
  {
    foodCode: "ASC095",
    foodName: "Cold summer garden soup",
    servingSize: "100 g",
    calories: 49,
    macros: {
      protein: 8.6,
      carbs: 2.6,
      fats: 14.1,
    },
  },
];

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildStateFoodItem(state: IndianStateName, base: BaseFoodTemplate): StateFoodItem {
  return {
    id: `${slugify(state)}-${slugify(base.foodCode)}`,
    state,
    foodName: base.foodName,
    servingSize: base.servingSize,
    calories: base.calories,
    macros: base.macros,
  };
}

export const stateFoodDatabase: StateFoodItem[] = INDIAN_STATES.flatMap((state) =>
  BASE_FOODS.map((base) => buildStateFoodItem(state, base)),
);

export const stateFoodDatabaseMeta = {
  stateCount: INDIAN_STATES.length,
  foodsPerState: BASE_FOODS.length,
  totalFoods: stateFoodDatabase.length,
};

if (stateFoodDatabase.length < 500) {
  throw new Error("stateFoodDatabase must contain at least 500 foods.");
}
