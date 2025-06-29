import type { CarInfo } from "./validations";

export interface InsuranceOffer {
  company: string;
  policyType: string;
  premiumRate: number;
  annualPremium: number;
  features: {
    en: string[];
    ar: string[];
  };
  conditions: {
    en: string[];
    ar: string[];
  };
  logo: string;
  deductible: string;
  companyColor: string;
}

export function calculateInsuranceOffers(carInfo: CarInfo): InsuranceOffer[] {
  const offers: InsuranceOffer[] = [];
  const { make, market_price, condition, fuel_type } = carInfo;

  // Mada Insurance Calculation
  const madaOffer = calculateMadaInsurance(carInfo);
  if (madaOffer) offers.push(madaOffer);

  // Wethaq Insurance Calculation
  const wethaqOffer = calculateWethaqInsurance(carInfo);
  if (wethaqOffer) offers.push(wethaqOffer);

  // GIG Insurance Calculation
  const gigOffer = calculateGIGInsurance(carInfo);
  if (gigOffer) offers.push(gigOffer);

  return offers.sort((a, b) => a.annualPremium - b.annualPremium);
}

function calculateMadaInsurance(carInfo: CarInfo): InsuranceOffer | null {
  const { make, market_price, condition, fuel_type } = carInfo;
  let premiumRate = 0;
  let policyType = "";
  let deductible = "300 EGP per accident";

  const chineseBrands = [
    "Cherry",
    "Geely",
    "BAIC",
    "Jetour",
    "Haval",
    "JAC",
    "GAC",
    "BYD",
  ];
  const isChineseBrand = chineseBrands.includes(make);

  if (isChineseBrand) {
    // Chinese brands special rates
    if (["Cherry", "Geely"].includes(make)) {
      if (market_price < 500000) {
        premiumRate = 0.02;
        policyType = "Comprehensive - Chinese Brand";
      } else {
        premiumRate = 0.018;
        policyType = "Comprehensive - Chinese Brand";
      }
      deductible = "500 EGP per accident";
    } else if (["BAIC", "Jetour"].includes(make)) {
      premiumRate = 0.02;
      policyType = "Comprehensive - Chinese Brand";
      deductible = "500 EGP per accident";
    } else if (["Haval", "JAC", "GAC"].includes(make)) {
      premiumRate = 0.0225;
      policyType = "Comprehensive - Chinese Brand";
      deductible = "500 EGP per accident";
    } else if (make === "BYD") {
      premiumRate = 0.025;
      policyType = "Comprehensive - Electric Chinese";
      deductible = "500 EGP per accident";
    }
  } else {
    // Regular brands
    if (market_price < 500000) {
      premiumRate = 0.025;
      policyType = "Comprehensive";
    } else if (market_price < 600000) {
      premiumRate = 0.02;
      policyType = "Comprehensive";
    } else if (market_price < 700000) {
      premiumRate = 0.018;
      policyType = "Comprehensive";
    } else if (market_price < 750000) {
      premiumRate = 0.018;
      policyType = "Comprehensive";
    } else if (market_price < 800000) {
      premiumRate = 0.016;
      policyType = "Comprehensive";
      deductible = "4‰ of insured amount per accident";
    } else {
      premiumRate = 0.014;
      policyType = "Comprehensive Premium";
      deductible = "4‰ of insured amount + 10% of claim";
    }
  }

  const annualPremium = market_price * premiumRate;

  return {
    company: "Mada Insurance",
    policyType,
    premiumRate,
    annualPremium,
    features: {
      en: [
        "Roadside assistance up to 100km",
        "No police report required (conditions apply)",
        "Civil liability coverage 100,000 EGP",
        "Authorized dealer repair exemption (first 3-5 years)",
        "Personal accident coverage included",
        "24/7 customer support hotline",
      ],
      ar: [
        "تغطية المساعدة على الطريق حتى 100 كم",
        "إعفاء من تقديم محضر شرطة (بشروط)",
        "تغطية المسؤولية المدنية 100 ألف جنيه",
        "إعفاء شرط الإصلاح في التوكيل (أول 3-5 سنوات)",
        "تغطية الحوادث الشخصية مشمولة",
        "خط دعم العملاء على مدار الساعة",
      ],
    },
    conditions: {
      en: [
        `Deductible: ${deductible}`,
        "Authorized dealer repair condition applies",
        "No police report if damage < 10% of insured amount",
        "Valid Egyptian driving license required",
      ],
      ar: [
        `التحمل: ${deductible}`,
        "يطبق شرط الإصلاح في التوكيل",
        "لا يتطلب محضر شرطة إذا كانت الأضرار أقل من 10% من مبلغ التأمين",
        "رخصة قيادة مصرية سارية مطلوبة",
      ],
    },
    logo: "/mada-logo.svg",
    companyColor: "#1e40af",
    deductible,
  };
}

function calculateWethaqInsurance(carInfo: CarInfo): InsuranceOffer | null {
  const { make, market_price, condition, fuel_type } = carInfo;
  let premiumRate = 0;
  let policyType = "";
  let deductible = "300 EGP per accident";

  if (fuel_type === "electric") {
    const hasOfficialDealer = [
      "Mercedes",
      "BMW",
      "Tesla",
      "XPENG",
      "ZEEKER",
    ].includes(make);
    premiumRate = hasOfficialDealer ? 0.02 : 0.0225;
    policyType = "Electric Vehicle Coverage";
    deductible = "25% battery + 10% total loss";
  } else if (["JAC", "GAC"].includes(make)) {
    if (market_price < 500000) {
      premiumRate = 0.025;
    } else {
      premiumRate = 0.0225;
    }
    policyType = "Chinese Brand Coverage";
  } else if (make === "Jetour") {
    premiumRate = market_price < 500000 ? 0.027 : 0.025;
    policyType = "Chinese Brand Coverage";
  } else {
    // Regular calculation based on condition and price
    if (condition === "new") {
      if (market_price < 200000) {
        premiumRate = 0.0235;
      } else if (market_price < 300000) {
        premiumRate = 0.022;
      } else if (market_price < 400000) {
        premiumRate = 0.02;
      } else {
        premiumRate = 0.018;
      }
      policyType = "New Car Comprehensive";
    } else {
      premiumRate = 0.02;
      policyType = "Used Car Comprehensive";
    }
  }

  const annualPremium = market_price * premiumRate;

  return {
    company: "Wethaq Insurance",
    policyType,
    premiumRate,
    annualPremium,
    features: {
      en: [
        "No dealer repair condition (cars < 5 years)",
        "Police report from 100k (cars < 1M)",
        "Civil liability 100k + Personal accidents 100k for 4 persons",
        "Roadside assistance included",
        "Free vehicle inspection service",
        "Online claims processing",
      ],
      ar: [
        "بدون شرط التوكيل للسيارات أقل من 5 سنوات",
        "محضر الشرطة من 100 ألف للسيارات أقل من مليون",
        "مسؤولية مدنية 100 ألف + حوادث شخصية 100 ألف لـ4 أفراد",
        "خدمة الطريق مشمولة",
        "خدمة فحص السيارة مجاناً",
        "معالجة المطالبات عبر الإنترنت",
      ],
    },
    conditions: {
      en: [
        `Deductible: ${deductible}`,
        "Police report exemption conditions apply",
        "Dealer repair exemption for eligible vehicles",
        "Annual vehicle inspection required",
      ],
      ar: [
        `التحمل: ${deductible}`,
        "شروط إعفاء محضر الشرطة تطبق",
        "إعفاء شرط التوكيل للسيارات المؤهلة",
        "فحص سنوي للسيارة مطلوب",
      ],
    },
    logo: "/wethaq-logo.svg",
    companyColor: "#059669",
    deductible,
  };
}

function calculateGIGInsurance(carInfo: CarInfo): InsuranceOffer | null {
  const { make, market_price, condition } = carInfo;
  let premiumRate = 0;
  let policyType = "";
  let isGold = false;

  // Check if eligible for GIG Gold
  const goldEligibleBrands = !["Opel", "Chevrolet", "MG"].includes(make);

  if (goldEligibleBrands) {
    // GIG Gold rates
    if (market_price < 200000) {
      premiumRate = 0.026;
    } else {
      premiumRate = 0.026;
    }
    policyType = "GIG Gold Comprehensive";
    isGold = true;
  } else {
    // Special brands (Opel, Chevrolet, MG)
    premiumRate = 0.0225;
    policyType = "GIG Gold Special Brands";
    isGold = true;
  }

  // Regular GIG option
  const regularRate =
    market_price < 200000 ? 0.03 : market_price < 300000 ? 0.0235 : 0.02;

  // Choose the better option (Gold if available and competitive)
  if (!isGold || regularRate < premiumRate) {
    premiumRate = regularRate;
    policyType = "GIG Standard Comprehensive";
    isGold = false;
  }

  const annualPremium = market_price * premiumRate;

  return {
    company: "GIG Insurance",
    policyType,
    premiumRate,
    annualPremium,
    features: {
      en: isGold
        ? [
            "Personal accidents 75k per person (4 persons)",
            "No dealer repair condition",
            "Towing service included",
            "Key replacement coverage",
            "Enhanced glass coverage",
            "Civil liability 150k EGP",
          ]
        : [
            "Personal accidents 10k with conditions",
            "Dealer repair condition applies",
            "Civil liability 50k EGP",
            "Police report for accidents > 10% of insured amount",
            "Basic towing service",
            "Standard glass coverage",
          ],
      ar: isGold
        ? [
            "حوادث شخصية 75 ألف للفرد لعدد 4 أفراد",
            "بدون شرط التوكيل",
            "خدمة ونش مشمولة",
            "تغطية استبدال المفتاح",
            "تغطية محسنة للزجاج",
            "مسؤولية مدنية 150 ألف جنيه",
          ]
        : [
            "حوادث شخصية 10 آلاف بشروط",
            "يطبق شرط التوكيل",
            "مسؤولية مدنية 50 ألف جنيه",
            "محضر شرطة للحوادث أكبر من 10% من مبلغ التأمين",
            "خدمة ونش أساسية",
            "تغطية زجاج عادية",
          ],
    },
    conditions: {
      en: [
        isGold
          ? "Premium coverage with enhanced benefits"
          : "Standard coverage with basic benefits",
        "Deductible varies by coverage type",
        "Age restrictions may apply for certain benefits",
        "Valid registration and license required",
      ],
      ar: [
        isGold ? "تغطية مميزة بمزايا محسنة" : "تغطية أساسية بمزايا عادية",
        "التحمل يختلف حسب نوع التغطية",
        "قيود العمر قد تطبق على بعض المزايا",
        "تسجيل ورخصة سارية مطلوبة",
      ],
    },
    logo: "/gig-logo.svg",
    companyColor: "#dc2626",
    deductible: isGold ? "Variable by coverage" : "25% if under legal age",
  };
}
