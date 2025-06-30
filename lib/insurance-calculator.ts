// import type { CarInfo } from "./validations";

// export interface InsuranceOffer {
//   company: string;
//   policyType: string;
//   premiumRate: number;
//   annualPremium: number;
//   features: {
//     en: string[];
//     ar: string[];
//   };
//   conditions: {
//     en: string[];
//     ar: string[];
//   };
//   logo: string;
//   deductible: string;
//   companyColor: string;
// }

// export function calculateInsuranceOffers(carInfo: CarInfo): InsuranceOffer[] {
//   const offers: InsuranceOffer[] = [];
//   const { make, market_price, condition, fuel_type } = carInfo;

//   // Mada Insurance Calculation
//   const madaOffer = calculateMadaInsurance(carInfo);
//   if (madaOffer) offers.push(madaOffer);

//   // Wethaq Insurance Calculation
//   const wethaqOffer = calculateWethaqInsurance(carInfo);
//   if (wethaqOffer) offers.push(wethaqOffer);

//   // GIG Insurance Calculation
//   const gigOffer = calculateGIGInsurance(carInfo);
//   if (gigOffer) offers.push(gigOffer);

//   return offers.sort((a, b) => a.annualPremium - b.annualPremium);
// }

// function calculateMadaInsurance(carInfo: CarInfo): InsuranceOffer | null {
//   const { make, market_price, condition, fuel_type } = carInfo;
//   let premiumRate = 0;
//   let policyType = "";
//   let deductible = "300 EGP per accident";

//   const chineseBrands = [
//     "Cherry",
//     "Geely",
//     "BAIC",
//     "Jetour",
//     "Haval",
//     "JAC",
//     "GAC",
//     "BYD",
//   ];
//   const isChineseBrand = chineseBrands.includes(make);

//   if (isChineseBrand) {
//     // Chinese brands special rates
//     if (["Cherry", "Geely"].includes(make)) {
//       if (market_price < 500000) {
//         premiumRate = 0.02;
//         policyType = "Comprehensive - Chinese Brand";
//       } else {
//         premiumRate = 0.018;
//         policyType = "Comprehensive - Chinese Brand";
//       }
//       deductible = "500 EGP per accident";
//     } else if (["BAIC", "Jetour"].includes(make)) {
//       premiumRate = 0.02;
//       policyType = "Comprehensive - Chinese Brand";
//       deductible = "500 EGP per accident";
//     } else if (["Haval", "JAC", "GAC"].includes(make)) {
//       premiumRate = 0.0225;
//       policyType = "Comprehensive - Chinese Brand";
//       deductible = "500 EGP per accident";
//     } else if (make === "BYD") {
//       premiumRate = 0.025;
//       policyType = "Comprehensive - Electric Chinese";
//       deductible = "500 EGP per accident";
//     }
//   } else {
//     // Regular brands
//     if (market_price < 500000) {
//       premiumRate = 0.025;
//       policyType = "Comprehensive";
//     } else if (market_price < 600000) {
//       premiumRate = 0.02;
//       policyType = "Comprehensive";
//     } else if (market_price < 700000) {
//       premiumRate = 0.018;
//       policyType = "Comprehensive";
//     } else if (market_price < 750000) {
//       premiumRate = 0.018;
//       policyType = "Comprehensive";
//     } else if (market_price < 800000) {
//       premiumRate = 0.016;
//       policyType = "Comprehensive";
//       deductible = "4‰ of insured amount per accident";
//     } else {
//       premiumRate = 0.014;
//       policyType = "Comprehensive Premium";
//       deductible = "4‰ of insured amount + 10% of claim";
//     }
//   }

//   const annualPremium = market_price * premiumRate;

//   return {
//     company: "Mada Insurance",
//     policyType,
//     premiumRate,
//     annualPremium,
//     features: {
//       en: [
//         "Roadside assistance up to 100km",
//         "No police report required (conditions apply)",
//         "Civil liability coverage 100,000 EGP",
//         "Authorized dealer repair exemption (first 3-5 years)",
//         "Personal accident coverage included",
//         "24/7 customer support hotline",
//       ],
//       ar: [
//         "تغطية المساعدة على الطريق حتى 100 كم",
//         "إعفاء من تقديم محضر شرطة (بشروط)",
//         "تغطية المسؤولية المدنية 100 ألف جنيه",
//         "إعفاء شرط الإصلاح في التوكيل (أول 3-5 سنوات)",
//         "تغطية الحوادث الشخصية مشمولة",
//         "خط دعم العملاء على مدار الساعة",
//       ],
//     },
//     conditions: {
//       en: [
//         `Deductible: ${deductible}`,
//         "Authorized dealer repair condition applies",
//         "No police report if damage < 10% of insured amount",
//         "Valid Egyptian driving license required",
//       ],
//       ar: [
//         `التحمل: ${deductible}`,
//         "يطبق شرط الإصلاح في التوكيل",
//         "لا يتطلب محضر شرطة إذا كانت الأضرار أقل من 10% من مبلغ التأمين",
//         "رخصة قيادة مصرية سارية مطلوبة",
//       ],
//     },
//     logo: "/mada-logo.svg",
//     companyColor: "#1e40af",
//     deductible,
//   };
// }

// function calculateWethaqInsurance(carInfo: CarInfo): InsuranceOffer | null {
//   const { make, market_price, condition, fuel_type } = carInfo;
//   let premiumRate = 0;
//   let policyType = "";
//   let deductible = "300 EGP per accident";

//   if (fuel_type === "electric") {
//     const hasOfficialDealer = [
//       "Mercedes",
//       "BMW",
//       "Tesla",
//       "XPENG",
//       "ZEEKER",
//     ].includes(make);
//     premiumRate = hasOfficialDealer ? 0.02 : 0.0225;
//     policyType = "Electric Vehicle Coverage";
//     deductible = "25% battery + 10% total loss";
//   } else if (["JAC", "GAC"].includes(make)) {
//     if (market_price < 500000) {
//       premiumRate = 0.025;
//     } else {
//       premiumRate = 0.0225;
//     }
//     policyType = "Chinese Brand Coverage";
//   } else if (make === "Jetour") {
//     premiumRate = market_price < 500000 ? 0.027 : 0.025;
//     policyType = "Chinese Brand Coverage";
//   } else {
//     // Regular calculation based on condition and price
//     if (condition === "new") {
//       if (market_price < 200000) {
//         premiumRate = 0.0235;
//       } else if (market_price < 300000) {
//         premiumRate = 0.022;
//       } else if (market_price < 400000) {
//         premiumRate = 0.02;
//       } else {
//         premiumRate = 0.018;
//       }
//       policyType = "New Car Comprehensive";
//     } else {
//       premiumRate = 0.02;
//       policyType = "Used Car Comprehensive";
//     }
//   }

//   const annualPremium = market_price * premiumRate;

//   return {
//     company: "Wethaq Insurance",
//     policyType,
//     premiumRate,
//     annualPremium,
//     features: {
//       en: [
//         "No dealer repair condition (cars < 5 years)",
//         "Police report from 100k (cars < 1M)",
//         "Civil liability 100k + Personal accidents 100k for 4 persons",
//         "Roadside assistance included",
//         "Free vehicle inspection service",
//         "Online claims processing",
//       ],
//       ar: [
//         "بدون شرط التوكيل للسيارات أقل من 5 سنوات",
//         "محضر الشرطة من 100 ألف للسيارات أقل من مليون",
//         "مسؤولية مدنية 100 ألف + حوادث شخصية 100 ألف لـ4 أفراد",
//         "خدمة الطريق مشمولة",
//         "خدمة فحص السيارة مجاناً",
//         "معالجة المطالبات عبر الإنترنت",
//       ],
//     },
//     conditions: {
//       en: [
//         `Deductible: ${deductible}`,
//         "Police report exemption conditions apply",
//         "Dealer repair exemption for eligible vehicles",
//         "Annual vehicle inspection required",
//       ],
//       ar: [
//         `التحمل: ${deductible}`,
//         "شروط إعفاء محضر الشرطة تطبق",
//         "إعفاء شرط التوكيل للسيارات المؤهلة",
//         "فحص سنوي للسيارة مطلوب",
//       ],
//     },
//     logo: "/wethaq-logo.svg",
//     companyColor: "#059669",
//     deductible,
//   };
// }

// function calculateGIGInsurance(carInfo: CarInfo): InsuranceOffer | null {
//   const { make, market_price, condition } = carInfo;
//   let premiumRate = 0;
//   let policyType = "";
//   let isGold = false;

//   // Check if eligible for GIG Gold
//   const goldEligibleBrands = !["Opel", "Chevrolet", "MG"].includes(make);

//   if (goldEligibleBrands) {
//     // GIG Gold rates
//     if (market_price < 200000) {
//       premiumRate = 0.026;
//     } else {
//       premiumRate = 0.026;
//     }
//     policyType = "GIG Gold Comprehensive";
//     isGold = true;
//   } else {
//     // Special brands (Opel, Chevrolet, MG)
//     premiumRate = 0.0225;
//     policyType = "GIG Gold Special Brands";
//     isGold = true;
//   }

//   // Regular GIG option
//   const regularRate =
//     market_price < 200000 ? 0.03 : market_price < 300000 ? 0.0235 : 0.02;

//   // Choose the better option (Gold if available and competitive)
//   if (!isGold || regularRate < premiumRate) {
//     premiumRate = regularRate;
//     policyType = "GIG Standard Comprehensive";
//     isGold = false;
//   }

//   const annualPremium = market_price * premiumRate;

//   return {
//     company: "GIG Insurance",
//     policyType,
//     premiumRate,
//     annualPremium,
//     features: {
//       en: isGold
//         ? [
//             "Personal accidents 75k per person (4 persons)",
//             "No dealer repair condition",
//             "Towing service included",
//             "Key replacement coverage",
//             "Enhanced glass coverage",
//             "Civil liability 150k EGP",
//           ]
//         : [
//             "Personal accidents 10k with conditions",
//             "Dealer repair condition applies",
//             "Civil liability 50k EGP",
//             "Police report for accidents > 10% of insured amount",
//             "Basic towing service",
//             "Standard glass coverage",
//           ],
//       ar: isGold
//         ? [
//             "حوادث شخصية 75 ألف للفرد لعدد 4 أفراد",
//             "بدون شرط التوكيل",
//             "خدمة ونش مشمولة",
//             "تغطية استبدال المفتاح",
//             "تغطية محسنة للزجاج",
//             "مسؤولية مدنية 150 ألف جنيه",
//           ]
//         : [
//             "حوادث شخصية 10 آلاف بشروط",
//             "يطبق شرط التوكيل",
//             "مسؤولية مدنية 50 ألف جنيه",
//             "محضر شرطة للحوادث أكبر من 10% من مبلغ التأمين",
//             "خدمة ونش أساسية",
//             "تغطية زجاج عادية",
//           ],
//     },
//     conditions: {
//       en: [
//         isGold
//           ? "Premium coverage with enhanced benefits"
//           : "Standard coverage with basic benefits",
//         "Deductible varies by coverage type",
//         "Age restrictions may apply for certain benefits",
//         "Valid registration and license required",
//       ],
//       ar: [
//         isGold ? "تغطية مميزة بمزايا محسنة" : "تغطية أساسية بمزايا عادية",
//         "التحمل يختلف حسب نوع التغطية",
//         "قيود العمر قد تطبق على بعض المزايا",
//         "تسجيل ورخصة سارية مطلوبة",
//       ],
//     },
//     logo: "/gig-logo.svg",
//     companyColor: "#dc2626",
//     deductible: isGold ? "Variable by coverage" : "25% if under legal age",
//   };
// }

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
  planType?: string; // Add plan type for multiple offers per company
  eligibilityReason?: string; // Why this offer is available
}

export function calculateInsuranceOffers(carInfo: CarInfo): InsuranceOffer[] {
  const offers: InsuranceOffer[] = [];
  const { make, market_price, condition, fuel_type, year } = carInfo;

  // Calculate all possible offers for each company
  const madaOffers = calculateAllMadaOffers(carInfo);
  const wethaqOffers = calculateAllWethaqOffers(carInfo);
  const gigOffers = calculateAllGIGOffers(carInfo);

  offers.push(...madaOffers, ...wethaqOffers, ...gigOffers);

  // Sort by annual premium (best value first)
  return offers.sort((a, b) => a.annualPremium - b.annualPremium);
}

function calculateAllMadaOffers(carInfo: CarInfo): InsuranceOffer[] {
  const { make, market_price, condition, fuel_type, year } = carInfo;
  const offers: InsuranceOffer[] = [];

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
  const currentYear = new Date().getFullYear();
  const carAge = currentYear - year;

  if (isChineseBrand) {
    // Chinese brands offers
    if (["Cherry", "Geely"].includes(make)) {
      // Option 1: With authorized repair exemption (first 3 years)
      if (carAge <= 3) {
        const rate1 = market_price <= 1000000 ? 0.02 : 0.018;
        offers.push(
          createMadaOffer(
            rate1,
            "Comprehensive - Chinese Brand (Authorized Repair Exemption)",
            "500 EGP per accident",
            "Cherry/Geely - First 3 years exemption",
            carInfo
          )
        );
      }

      // Option 2: With authorized repair requirement (always available)
      const rate2 = market_price <= 1000000 ? 0.018 : 0.016;
      offers.push(
        createMadaOffer(
          rate2,
          "Comprehensive - Chinese Brand (Authorized Repair Required)",
          "500 EGP per accident",
          "Cherry/Geely - Authorized repair required",
          carInfo
        )
      );
    } else if (["BAIC", "Jetour"].includes(make)) {
      // Option 1: With authorized repair exemption (first 3 years)
      if (carAge <= 3) {
        const rate1 = market_price <= 1000000 ? 0.02 : 0.018;
        offers.push(
          createMadaOffer(
            rate1,
            "Comprehensive - Chinese Brand (Authorized Repair Exemption)",
            "500 EGP per accident",
            "BAIC/Jetour - First 3 years exemption",
            carInfo
          )
        );
      }

      // Option 2: With authorized repair requirement (always available)
      const rate2 = 0.018;
      offers.push(
        createMadaOffer(
          rate2,
          "Comprehensive - Chinese Brand (Authorized Repair Required)",
          "500 EGP per accident",
          "BAIC/Jetour - Authorized repair required",
          carInfo
        )
      );
    } else if (["Haval", "JAC", "GAC"].includes(make)) {
      // Option 1: With authorized repair exemption (first 3 years)
      if (carAge <= 3) {
        offers.push(
          createMadaOffer(
            0.0225,
            "Comprehensive - Chinese Brand (Authorized Repair Exemption)",
            "500 EGP per accident",
            "Haval/JAC/GAC - First 3 years exemption",
            carInfo
          )
        );
      }

      // Option 2: With authorized repair requirement (always available)
      offers.push(
        createMadaOffer(
          0.02,
          "Comprehensive - Chinese Brand (Authorized Repair Required)",
          "500 EGP per accident",
          "Haval/JAC/GAC - Authorized repair required",
          carInfo
        )
      );
    } else if (make === "BYD") {
      // Option 1: Zero-kilometer with exemption (first year only)
      if (condition === "new" && carAge === 0) {
        offers.push(
          createMadaOffer(
            0.025,
            "Comprehensive - Electric Chinese (Zero-KM Exemption)",
            "500 EGP per accident",
            "BYD - Zero-kilometer first year exemption",
            carInfo
          )
        );
      }

      // Option 2: Standard BYD rate (always available)
      offers.push(
        createMadaOffer(
          0.025,
          "Comprehensive - Electric Chinese",
          "500 EGP per accident",
          "BYD - Standard rate",
          carInfo
        )
      );
    }
  } else {
    // Regular brands - multiple options based on value and conditions

    // Option 1: With authorized repair exemption (for eligible years)
    if (
      (carAge <= 3 && market_price < 1000000) ||
      (carAge <= 5 && market_price >= 1000000)
    ) {
      let rate1: number;
      let deductible1: string;

      if (market_price < 500000) {
        rate1 = 0.025;
        deductible1 = "300 EGP per accident";
      } else if (market_price <= 600000) {
        rate1 = 0.02;
        deductible1 = "300 EGP per accident";
      } else if (market_price <= 700000) {
        rate1 = 0.018;
        deductible1 = "300 EGP per accident";
      } else if (market_price <= 750000) {
        rate1 = 0.018;
        deductible1 = "300 EGP per accident";
      } else if (market_price <= 800000) {
        rate1 = 0.016;
        deductible1 = "4‰ of insured amount per accident";
      } else if (market_price <= 1000000) {
        rate1 = 0.018;
        deductible1 = "300 EGP per accident";
      } else {
        rate1 = 0.014;
        deductible1 = "4‰ of insured amount + 10% of claim";
      }

      const exemptionYears = market_price >= 1000000 ? 5 : 3;
      offers.push(
        createMadaOffer(
          rate1,
          `Comprehensive (Authorized Repair Exemption - ${exemptionYears} years)`,
          deductible1,
          `Regular brand - Authorized repair exemption for first ${exemptionYears} years`,
          carInfo
        )
      );
    }

    // Option 2: With authorized repair requirement (always available, lower rates)
    let rate2: number;
    let deductible2: string;

    if (market_price < 500000) {
      rate2 = 0.022; // Slightly lower than exemption rate
      deductible2 = "300 EGP per accident";
    } else if (market_price <= 600000) {
      rate2 = 0.018;
      deductible2 = "300 EGP per accident";
    } else if (market_price <= 700000) {
      rate2 = 0.016;
      deductible2 = "300 EGP per accident";
    } else if (market_price <= 750000) {
      rate2 = 0.016;
      deductible2 = "300 EGP per accident";
    } else if (market_price <= 800000) {
      rate2 = 0.014;
      deductible2 = "4‰ of insured amount per accident";
    } else if (market_price <= 1000000) {
      rate2 = 0.016;
      deductible2 = "4‰ of insured amount per accident";
    } else {
      rate2 = 0.014;
      deductible2 = "4‰ of insured amount + 10% of claim";
    }

    offers.push(
      createMadaOffer(
        rate2,
        "Comprehensive (Authorized Repair Required)",
        deductible2,
        "Regular brand - Authorized repair required",
        carInfo
      )
    );

    // Option 3: Lower comprehensive for high-value cars (if applicable)
    if (market_price > 500000) {
      offers.push(
        createMadaOffer(
          0.015,
          "Comprehensive Premium (Lower Claims Coverage)",
          "4‰ of insured amount + 10% of claim",
          "For damages less than 50% of insurance amount",
          carInfo
        )
      );
    }
  }

  return offers;
}

function calculateAllWethaqOffers(carInfo: CarInfo): InsuranceOffer[] {
  const { make, market_price, condition, fuel_type, year } = carInfo;
  const offers: InsuranceOffer[] = [];
  const currentYear = new Date().getFullYear();
  const carAge = currentYear - year;

  if (fuel_type === "electric") {
    const hasOfficialDealer = [
      "Mercedes",
      "BMW",
      "Tesla",
      "XPENG",
      "ZEEKER",
      "ROX",
      "SMART",
    ].includes(make);

    if (hasOfficialDealer) {
      offers.push(
        createWethaqOffer(
          0.02,
          "Electric Vehicle Coverage - Official Dealer",
          "25% battery + 10% total loss",
          "Electric car with official dealership in Egypt",
          carInfo
        )
      );
    } else {
      offers.push(
        createWethaqOffer(
          0.0225,
          "Electric Vehicle Coverage - No Official Dealer",
          "25% battery + 10% total loss",
          "Electric car without official dealership in Egypt",
          carInfo
        )
      );
    }
  } else if (["JAC", "GAC"].includes(make)) {
    // Option 1: With authorized repair exemption (first 5 years)
    if (carAge <= 5) {
      offers.push(
        createWethaqOffer(
          0.025,
          "Chinese Brand Coverage (Authorized Repair Exemption)",
          "300 EGP per accident",
          "JAC/GAC - First 5 years exemption",
          carInfo
        )
      );
    }

    // Option 2: With authorized repair requirement
    offers.push(
      createWethaqOffer(
        0.0225,
        "Chinese Brand Coverage (Authorized Repair Required)",
        "300 EGP per accident",
        "JAC/GAC - Authorized repair required",
        carInfo
      )
    );
  } else if (make === "Jetour") {
    // Option 1: With authorized repair exemption (first 5 years)
    if (carAge <= 5) {
      const rate1 = market_price <= 1000000 ? 0.027 : 0.025;
      offers.push(
        createWethaqOffer(
          rate1,
          "Chinese Brand Coverage - Jetour (Authorized Repair Exemption)",
          "300 EGP per accident",
          "Jetour - First 5 years exemption",
          carInfo
        )
      );
    }

    // Option 2: Standard Jetour rate
    const rate2 = market_price <= 1000000 ? 0.025 : 0.023;
    offers.push(
      createWethaqOffer(
        rate2,
        "Chinese Brand Coverage - Jetour",
        "300 EGP per accident",
        "Jetour - Standard rate",
        carInfo
      )
    );
  } else {
    // Regular calculation based on condition and price
    let baseRate: number;

    if (market_price <= 200000) {
      baseRate = 0.0235;
    } else if (market_price <= 300000) {
      baseRate = 0.022;
    } else if (market_price <= 400000) {
      baseRate = 0.02;
    } else if (market_price <= 1000000) {
      baseRate = 0.02;
    } else {
      baseRate = 0.018;
    }

    // Option 1: New car rate (if applicable)
    if (condition === "new") {
      offers.push(
        createWethaqOffer(
          baseRate,
          "New Car Comprehensive",
          "300 EGP per accident",
          "New vehicle comprehensive coverage",
          carInfo
        )
      );
    }

    // Option 2: Used car rate (always available)
    const usedRate = condition === "used" ? baseRate : baseRate * 1.1; // Slightly higher for used
    offers.push(
      createWethaqOffer(
        Math.min(usedRate, 0.025), // Cap at 2.5%
        "Used Car Comprehensive",
        "300 EGP per accident",
        "Used vehicle comprehensive coverage",
        carInfo
      )
    );

    // Option 3: No authorized repair exemption (if car is under 5 years)
    if (carAge <= 5) {
      offers.push(
        createWethaqOffer(
          baseRate * 0.9, // 10% discount for no repair exemption
          "Comprehensive (No Authorized Repair Exemption)",
          "300 EGP per accident",
          "No authorized repair requirement for cars under 5 years",
          carInfo
        )
      );
    }
  }

  return offers;
}

function calculateAllGIGOffers(carInfo: CarInfo): InsuranceOffer[] {
  const { make, market_price, condition, fuel_type } = carInfo;
  const offers: InsuranceOffer[] = [];

  // GIG Private Policy (always available)
  let privateRate: number;
  if (market_price <= 200000) {
    privateRate = 0.03;
  } else if (market_price <= 300000) {
    privateRate = 0.0235;
  } else {
    privateRate = 0.02;
  }

  offers.push(
    createGIGOffer(
      privateRate,
      "GIG Private Comprehensive",
      "25% if under legal age",
      false,
      "Standard private policy for all vehicles",
      carInfo
    )
  );

  // GIG Gold Policy (for eligible vehicles and price ranges)
  if (market_price >= 501000) {
    const goldEligibleBrands = !["Opel", "Chevrolet", "MG"].includes(make);

    if (goldEligibleBrands) {
      // Regular Gold rate
      offers.push(
        createGIGOffer(
          0.026,
          "GIG Gold Comprehensive",
          "Variable by coverage",
          true,
          "Premium gold coverage for eligible brands",
          carInfo
        )
      );
    } else {
      // Special brands Gold rate
      offers.push(
        createGIGOffer(
          0.0225,
          "GIG Gold Special Brands",
          "Variable by coverage",
          true,
          "Premium gold coverage for Opel/Chevrolet/MG",
          carInfo
        )
      );
    }
  }

  // Additional GIG options based on value ranges
  if (market_price >= 400000 && market_price < 500000) {
    // Mid-range enhanced option
    offers.push(
      createGIGOffer(
        0.022,
        "GIG Enhanced Coverage",
        "300 EGP per accident",
        false,
        "Enhanced coverage for mid-range vehicles",
        carInfo
      )
    );
  }

  return offers;
}

function createMadaOffer(
  premiumRate: number,
  policyType: string,
  deductible: string,
  eligibilityReason: string,
  carInfo: CarInfo
): InsuranceOffer {
  const annualPremium = carInfo.market_price * premiumRate;

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
        "Personal accident coverage included",
        "24/7 customer support hotline",
        "Comprehensive coverage options",
      ],
      ar: [
        "تغطية المساعدة على الطريق حتى 100 كم",
        "إعفاء من تقديم محضر شرطة (بشروط)",
        "تغطية المسؤولية المدنية 100 ألف جنيه",
        "تغطية الحوادث الشخصية مشمولة",
        "خط دعم العملاء على مدار الساعة",
        "خيارات تغطية شاملة",
      ],
    },
    conditions: {
      en: [
        `Deductible: ${deductible}`,
        eligibilityReason,
        "Valid Egyptian driving license required",
        "Annual vehicle inspection may be required",
      ],
      ar: [
        `التحمل: ${deductible}`,
        eligibilityReason,
        "رخصة قيادة مصرية سارية مطلوبة",
        "قد يتطلب فحص سنوي للسيارة",
      ],
    },
    logo: "/mada-logo.svg",
    companyColor: "#1e40af",
    deductible,
    eligibilityReason,
  };
}

function createWethaqOffer(
  premiumRate: number,
  policyType: string,
  deductible: string,
  eligibilityReason: string,
  carInfo: CarInfo
): InsuranceOffer {
  const annualPremium = carInfo.market_price * premiumRate;

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
        eligibilityReason,
        "Annual vehicle inspection required",
        "Valid registration and license required",
      ],
      ar: [
        `التحمل: ${deductible}`,
        eligibilityReason,
        "فحص سنوي للسيارة مطلوب",
        "تسجيل ورخصة سارية مطلوبة",
      ],
    },
    logo: "/wethaq-logo.svg",
    companyColor: "#059669",
    deductible,
    eligibilityReason,
  };
}

function createGIGOffer(
  premiumRate: number,
  policyType: string,
  deductible: string,
  isGold: boolean,
  eligibilityReason: string,
  carInfo: CarInfo
): InsuranceOffer {
  const annualPremium = carInfo.market_price * premiumRate;

  return {
    company: "GIG Insurance",
    policyType,
    premiumRate,
    annualPremium,
    planType: isGold ? "Gold" : "Private",
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
        `Deductible: ${deductible}`,
        eligibilityReason,
        isGold
          ? "Premium coverage with enhanced benefits"
          : "Standard coverage with basic benefits",
        "Valid registration and license required",
      ],
      ar: [
        `التحمل: ${deductible}`,
        eligibilityReason,
        isGold ? "تغطية مميزة بمزايا محسنة" : "تغطية أساسية بمزايا عادية",
        "تسجيل ورخصة سارية مطلوبة",
      ],
    },
    logo: "/gig-logo.svg",
    companyColor: "#dc2626",
    deductible,
    eligibilityReason,
  };
}
