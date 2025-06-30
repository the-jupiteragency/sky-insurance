export interface CarBrand {
  name: string
  logo?: string
  country: string
  category: "luxury" | "mainstream" | "economy" | "chinese" | "electric"
}

export interface CarModel {
  name: string
  category: "sedan" | "suv" | "hatchback" | "coupe" | "pickup" | "crossover" | "wagon" | "convertible"
  priceRange: { min: number; max: number }
}

export const CAR_BRANDS: Record<string, CarBrand> = {
  // Luxury German Brands
  BMW: { name: "BMW", country: "Germany", category: "luxury" },
  Mercedes: { name: "Mercedes-Benz", country: "Germany", category: "luxury" },
  Audi: { name: "Audi", country: "Germany", category: "luxury" },
  Porsche: { name: "Porsche", country: "Germany", category: "luxury" },

  // Luxury Japanese Brands
  Lexus: { name: "Lexus", country: "Japan", category: "luxury" },
  Infiniti: { name: "Infiniti", country: "Japan", category: "luxury" },
  Acura: { name: "Acura", country: "Japan", category: "luxury" },

  // Luxury American Brands
  Cadillac: { name: "Cadillac", country: "USA", category: "luxury" },
  Lincoln: { name: "Lincoln", country: "USA", category: "luxury" },

  // Luxury European Brands
  Volvo: { name: "Volvo", country: "Sweden", category: "luxury" },
  Jaguar: { name: "Jaguar", country: "UK", category: "luxury" },
  "Land Rover": { name: "Land Rover", country: "UK", category: "luxury" },
  Maserati: { name: "Maserati", country: "Italy", category: "luxury" },
  Alfa: { name: "Alfa Romeo", country: "Italy", category: "luxury" },

  // Mainstream Japanese Brands
  Toyota: { name: "Toyota", country: "Japan", category: "mainstream" },
  Honda: { name: "Honda", country: "Japan", category: "mainstream" },
  Nissan: { name: "Nissan", country: "Japan", category: "mainstream" },
  Mazda: { name: "Mazda", country: "Japan", category: "mainstream" },
  Mitsubishi: { name: "Mitsubishi", country: "Japan", category: "mainstream" },
  Subaru: { name: "Subaru", country: "Japan", category: "mainstream" },
  Suzuki: { name: "Suzuki", country: "Japan", category: "mainstream" },
  Isuzu: { name: "Isuzu", country: "Japan", category: "mainstream" },

  // Mainstream Korean Brands
  Hyundai: { name: "Hyundai", country: "South Korea", category: "mainstream" },
  Kia: { name: "Kia", country: "South Korea", category: "mainstream" },
  Genesis: { name: "Genesis", country: "South Korea", category: "luxury" },

  // Mainstream American Brands
  Ford: { name: "Ford", country: "USA", category: "mainstream" },
  Chevrolet: { name: "Chevrolet", country: "USA", category: "mainstream" },
  Jeep: { name: "Jeep", country: "USA", category: "mainstream" },
  Dodge: { name: "Dodge", country: "USA", category: "mainstream" },
  Chrysler: { name: "Chrysler", country: "USA", category: "mainstream" },
  GMC: { name: "GMC", country: "USA", category: "mainstream" },

  // European Mainstream Brands
  Volkswagen: { name: "Volkswagen", country: "Germany", category: "mainstream" },
  Skoda: { name: "Skoda", country: "Czech Republic", category: "mainstream" },
  Seat: { name: "Seat", country: "Spain", category: "mainstream" },

  // European Economy Brands
  Peugeot: { name: "Peugeot", country: "France", category: "economy" },
  Renault: { name: "Renault", country: "France", category: "economy" },
  Citroen: { name: "Citroën", country: "France", category: "economy" },
  Fiat: { name: "Fiat", country: "Italy", category: "economy" },
  Opel: { name: "Opel", country: "Germany", category: "economy" },
  Dacia: { name: "Dacia", country: "Romania", category: "economy" },

  // Chinese Brands
  Cherry: { name: "Chery", country: "China", category: "chinese" },
  Geely: { name: "Geely", country: "China", category: "chinese" },
  BAIC: { name: "BAIC", country: "China", category: "chinese" },
  Jetour: { name: "Jetour", country: "China", category: "chinese" },
  Haval: { name: "Haval", country: "China", category: "chinese" },
  JAC: { name: "JAC", country: "China", category: "chinese" },
  GAC: { name: "GAC", country: "China", category: "chinese" },
  MG: { name: "MG", country: "China", category: "chinese" },
  Dongfeng: { name: "Dongfeng", country: "China", category: "chinese" },
  Changan: { name: "Changan", country: "China", category: "chinese" },
  Brilliance: { name: "Brilliance", country: "China", category: "chinese" },
  Foton: { name: "Foton", country: "China", category: "chinese" },
  Lifan: { name: "Lifan", country: "China", category: "chinese" },
  Zotye: { name: "Zotye", country: "China", category: "chinese" },

  // Electric Brands
  Tesla: { name: "Tesla", country: "USA", category: "electric" },
  BYD: { name: "BYD", country: "China", category: "electric" },
  Lucid: { name: "Lucid", country: "USA", category: "electric" },
  Rivian: { name: "Rivian", country: "USA", category: "electric" },
  NIO: { name: "NIO", country: "China", category: "electric" },
  XPENG: { name: "XPENG", country: "China", category: "electric" },
  ZEEKER: { name: "ZEEKER", country: "China", category: "electric" },
  Polestar: { name: "Polestar", country: "Sweden", category: "electric" },

}

export const CAR_MODELS_BY_MAKE: Record<string, CarModel[]> = {
  // Toyota Models
  Toyota: [
    { name: "Corolla", category: "sedan", priceRange: { min: 350000, max: 550000 } },
    { name: "Camry", category: "sedan", priceRange: { min: 650000, max: 950000 } },
    { name: "RAV4", category: "suv", priceRange: { min: 750000, max: 1200000 } },
    { name: "Prius", category: "sedan", priceRange: { min: 450000, max: 650000 } },
    { name: "Yaris", category: "hatchback", priceRange: { min: 280000, max: 420000 } },
    { name: "Hilux", category: "pickup", priceRange: { min: 600000, max: 900000 } },
    { name: "Land Cruiser", category: "suv", priceRange: { min: 1500000, max: 2500000 } },
    { name: "C-HR", category: "crossover", priceRange: { min: 550000, max: 750000 } },
    { name: "Highlander", category: "suv", priceRange: { min: 900000, max: 1400000 } },
    { name: "Avalon", category: "sedan", priceRange: { min: 800000, max: 1200000 } },
    { name: "Sienna", category: "suv", priceRange: { min: 1000000, max: 1500000 } },
    { name: "Venza", category: "crossover", priceRange: { min: 700000, max: 1000000 } },
  ],

  // Honda Models
  Honda: [
    { name: "Civic", category: "sedan", priceRange: { min: 400000, max: 650000 } },
    { name: "Accord", category: "sedan", priceRange: { min: 700000, max: 1000000 } },
    { name: "CR-V", category: "suv", priceRange: { min: 800000, max: 1200000 } },
    { name: "Pilot", category: "suv", priceRange: { min: 1200000, max: 1800000 } },
    { name: "Fit", category: "hatchback", priceRange: { min: 250000, max: 380000 } },
    { name: "HR-V", category: "crossover", priceRange: { min: 450000, max: 650000 } },
    { name: "Passport", category: "suv", priceRange: { min: 1000000, max: 1500000 } },
    { name: "Ridgeline", category: "pickup", priceRange: { min: 900000, max: 1300000 } },
    { name: "Insight", category: "sedan", priceRange: { min: 500000, max: 700000 } },
  ],

  // BMW Models
  BMW: [
    { name: "118i", category: "hatchback", priceRange: { min: 650000, max: 850000 } },
    { name: "320i", category: "sedan", priceRange: { min: 900000, max: 1300000 } },
    { name: "520i", category: "sedan", priceRange: { min: 1400000, max: 1900000 } },
    { name: "730i", category: "sedan", priceRange: { min: 2200000, max: 3000000 } },
    { name: "X1", category: "suv", priceRange: { min: 800000, max: 1200000 } },
    { name: "X3", category: "suv", priceRange: { min: 1300000, max: 1800000 } },
    { name: "X5", category: "suv", priceRange: { min: 2000000, max: 3000000 } },
    { name: "X7", category: "suv", priceRange: { min: 3500000, max: 5000000 } },
    { name: "Z4", category: "convertible", priceRange: { min: 1800000, max: 2500000 } },
    { name: "i3", category: "hatchback", priceRange: { min: 1200000, max: 1600000 } },
    { name: "i4", category: "sedan", priceRange: { min: 1500000, max: 2000000 } },
    { name: "iX", category: "suv", priceRange: { min: 2500000, max: 3500000 } },
  ],

  // Mercedes Models
  Mercedes: [
    { name: "A-Class", category: "hatchback", priceRange: { min: 700000, max: 1000000 } },
    { name: "C-Class", category: "sedan", priceRange: { min: 1000000, max: 1500000 } },
    { name: "E-Class", category: "sedan", priceRange: { min: 1600000, max: 2200000 } },
    { name: "S-Class", category: "sedan", priceRange: { min: 2500000, max: 4000000 } },
    { name: "GLA", category: "suv", priceRange: { min: 900000, max: 1300000 } },
    { name: "GLC", category: "suv", priceRange: { min: 1400000, max: 1900000 } },
    { name: "GLE", category: "suv", priceRange: { min: 2000000, max: 2800000 } },
    { name: "GLS", category: "suv", priceRange: { min: 3000000, max: 4500000 } },
    { name: "G-Class", category: "suv", priceRange: { min: 4000000, max: 6000000 } },
    { name: "CLA", category: "coupe", priceRange: { min: 800000, max: 1200000 } },
    { name: "CLS", category: "coupe", priceRange: { min: 1800000, max: 2500000 } },
    { name: "EQC", category: "suv", priceRange: { min: 2200000, max: 2800000 } },
  ],

  // Hyundai Models
  Hyundai: [
    { name: "Accent", category: "sedan", priceRange: { min: 280000, max: 420000 } },
    { name: "Elantra", category: "sedan", priceRange: { min: 380000, max: 580000 } },
    { name: "Sonata", category: "sedan", priceRange: { min: 550000, max: 800000 } },
    { name: "Tucson", category: "suv", priceRange: { min: 650000, max: 950000 } },
    { name: "Santa Fe", category: "suv", priceRange: { min: 900000, max: 1300000 } },
    { name: "Creta", category: "crossover", priceRange: { min: 450000, max: 650000 } },
    { name: "Venue", category: "crossover", priceRange: { min: 350000, max: 500000 } },
    { name: "Palisade", category: "suv", priceRange: { min: 1200000, max: 1700000 } },
    { name: "Kona", category: "crossover", priceRange: { min: 500000, max: 700000 } },
    { name: "i30", category: "hatchback", priceRange: { min: 400000, max: 600000 } },
  ],

  // Kia Models
  Kia: [
    { name: "Rio", category: "sedan", priceRange: { min: 280000, max: 420000 } },
    { name: "Cerato", category: "sedan", priceRange: { min: 380000, max: 580000 } },
    { name: "Optima", category: "sedan", priceRange: { min: 550000, max: 800000 } },
    { name: "Sportage", category: "suv", priceRange: { min: 650000, max: 950000 } },
    { name: "Sorento", category: "suv", priceRange: { min: 900000, max: 1300000 } },
    { name: "Seltos", category: "crossover", priceRange: { min: 450000, max: 650000 } },
    { name: "Picanto", category: "hatchback", priceRange: { min: 250000, max: 380000 } },
    { name: "Telluride", category: "suv", priceRange: { min: 1200000, max: 1700000 } },
    { name: "Stinger", category: "sedan", priceRange: { min: 800000, max: 1200000 } },
  ],

  // Ford Models
  Ford: [
    { name: "Fiesta", category: "hatchback", priceRange: { min: 300000, max: 450000 } },
    { name: "Focus", category: "hatchback", priceRange: { min: 400000, max: 600000 } },
    { name: "Fusion", category: "sedan", priceRange: { min: 500000, max: 750000 } },
    { name: "Escape", category: "suv", priceRange: { min: 600000, max: 900000 } },
    { name: "Explorer", category: "suv", priceRange: { min: 1000000, max: 1500000 } },
    { name: "F-150", category: "pickup", priceRange: { min: 800000, max: 1200000 } },
    { name: "Mustang", category: "coupe", priceRange: { min: 1200000, max: 2000000 } },
    { name: "Edge", category: "suv", priceRange: { min: 800000, max: 1200000 } },
    { name: "Expedition", category: "suv", priceRange: { min: 1500000, max: 2200000 } },
  ],

  // Chevrolet Models
  Chevrolet: [
    { name: "Spark", category: "hatchback", priceRange: { min: 250000, max: 380000 } },
    { name: "Aveo", category: "sedan", priceRange: { min: 300000, max: 450000 } },
    { name: "Cruze", category: "sedan", priceRange: { min: 400000, max: 600000 } },
    { name: "Malibu", category: "sedan", priceRange: { min: 600000, max: 900000 } },
    { name: "Equinox", category: "suv", priceRange: { min: 700000, max: 1000000 } },
    { name: "Tahoe", category: "suv", priceRange: { min: 1500000, max: 2200000 } },
    { name: "Suburban", category: "suv", priceRange: { min: 1800000, max: 2500000 } },
    { name: "Silverado", category: "pickup", priceRange: { min: 900000, max: 1400000 } },
    { name: "Camaro", category: "coupe", priceRange: { min: 1000000, max: 1800000 } },
    { name: "Corvette", category: "coupe", priceRange: { min: 2500000, max: 4000000 } },
  ],

  // Nissan Models
  Nissan: [
    { name: "Sunny", category: "sedan", priceRange: { min: 280000, max: 420000 } },
    { name: "Sentra", category: "sedan", priceRange: { min: 380000, max: 580000 } },
    { name: "Altima", category: "sedan", priceRange: { min: 550000, max: 800000 } },
    { name: "Maxima", category: "sedan", priceRange: { min: 800000, max: 1200000 } },
    { name: "Kicks", category: "crossover", priceRange: { min: 400000, max: 600000 } },
    { name: "X-Trail", category: "suv", priceRange: { min: 650000, max: 950000 } },
    { name: "Pathfinder", category: "suv", priceRange: { min: 900000, max: 1300000 } },
    { name: "Patrol", category: "suv", priceRange: { min: 1200000, max: 1800000 } },
    { name: "370Z", category: "coupe", priceRange: { min: 1000000, max: 1500000 } },
    { name: "GT-R", category: "coupe", priceRange: { min: 3000000, max: 4500000 } },
  ],

  // Volkswagen Models
  Volkswagen: [
    { name: "Polo", category: "hatchback", priceRange: { min: 350000, max: 520000 } },
    { name: "Golf", category: "hatchback", priceRange: { min: 450000, max: 680000 } },
    { name: "Jetta", category: "sedan", priceRange: { min: 500000, max: 750000 } },
    { name: "Passat", category: "sedan", priceRange: { min: 700000, max: 1000000 } },
    { name: "Tiguan", category: "suv", priceRange: { min: 800000, max: 1200000 } },
    { name: "Touareg", category: "suv", priceRange: { min: 1500000, max: 2200000 } },
    { name: "Atlas", category: "suv", priceRange: { min: 1200000, max: 1800000 } },
    { name: "Arteon", category: "sedan", priceRange: { min: 900000, max: 1300000 } },
  ],

  // Chinese Brands - Cherry
  Cherry: [
    { name: "Tiggo 8", category: "suv", priceRange: { min: 450000, max: 650000 } },
    { name: "Tiggo 7", category: "suv", priceRange: { min: 380000, max: 550000 } },
    { name: "Tiggo 5", category: "suv", priceRange: { min: 320000, max: 480000 } },
    { name: "Tiggo 4", category: "crossover", priceRange: { min: 280000, max: 420000 } },
    { name: "Tiggo 2", category: "crossover", priceRange: { min: 220000, max: 350000 } },
    { name: "Arrizo 6", category: "sedan", priceRange: { min: 280000, max: 420000 } },
    { name: "Arrizo 5", category: "sedan", priceRange: { min: 240000, max: 380000 } },
    { name: "QQ", category: "hatchback", priceRange: { min: 180000, max: 280000 } },
  ],

  // BYD Models
  BYD: [
    { name: "F3", category: "sedan", priceRange: { min: 250000, max: 380000 } },
    { name: "S6", category: "suv", priceRange: { min: 400000, max: 600000 } },
    { name: "Tang", category: "suv", priceRange: { min: 800000, max: 1200000 } },
    { name: "Song", category: "suv", priceRange: { min: 600000, max: 900000 } },
    { name: "Han", category: "sedan", priceRange: { min: 700000, max: 1000000 } },
    { name: "Seal", category: "sedan", priceRange: { min: 650000, max: 950000 } },
    { name: "Atto 3", category: "suv", priceRange: { min: 550000, max: 800000 } },
    { name: "Dolphin", category: "hatchback", priceRange: { min: 400000, max: 600000 } },
  ],

  // Geely Models
  Geely: [
    { name: "Emgrand", category: "sedan", priceRange: { min: 280000, max: 420000 } },
    { name: "Coolray", category: "crossover", priceRange: { min: 350000, max: 520000 } },
    { name: "Tugella", category: "suv", priceRange: { min: 450000, max: 650000 } },
    { name: "Atlas", category: "suv", priceRange: { min: 400000, max: 600000 } },
    { name: "Okavango", category: "suv", priceRange: { min: 500000, max: 750000 } },
  ],

  // Tesla Models
  Tesla: [
    { name: "Model 3", category: "sedan", priceRange: { min: 1200000, max: 1800000 } },
    { name: "Model S", category: "sedan", priceRange: { min: 2500000, max: 3500000 } },
    { name: "Model Y", category: "suv", priceRange: { min: 1500000, max: 2200000 } },
    { name: "Model X", category: "suv", priceRange: { min: 2800000, max: 4000000 } },
    { name: "Cybertruck", category: "pickup", priceRange: { min: 2000000, max: 3000000 } },
  ],

  // Add more brands as needed...
  Mazda: [
    { name: "Mazda2", category: "hatchback", priceRange: { min: 300000, max: 450000 } },
    { name: "Mazda3", category: "sedan", priceRange: { min: 400000, max: 600000 } },
    { name: "Mazda6", category: "sedan", priceRange: { min: 600000, max: 900000 } },
    { name: "CX-3", category: "crossover", priceRange: { min: 450000, max: 650000 } },
    { name: "CX-5", category: "suv", priceRange: { min: 650000, max: 950000 } },
    { name: "CX-9", category: "suv", priceRange: { min: 1000000, max: 1500000 } },
    { name: "MX-5", category: "convertible", priceRange: { min: 800000, max: 1200000 } },
  ],

  // Audi Models (Enhanced with Electric)
  Audi: [
    { name: "A3", category: "sedan", priceRange: { min: 800000, max: 1200000 } },
    { name: "A4", category: "sedan", priceRange: { min: 1200000, max: 1700000 } },
    { name: "A6", category: "sedan", priceRange: { min: 1800000, max: 2500000 } },
    { name: "A8", category: "sedan", priceRange: { min: 2800000, max: 4000000 } },
    { name: "Q3", category: "suv", priceRange: { min: 1000000, max: 1400000 } },
    { name: "Q5", category: "suv", priceRange: { min: 1500000, max: 2100000 } },
    { name: "Q7", category: "suv", priceRange: { min: 2200000, max: 3200000 } },
    { name: "Q8", category: "suv", priceRange: { min: 2800000, max: 4000000 } },
    { name: "TT", category: "coupe", priceRange: { min: 1500000, max: 2200000 } },
    { name: "R8", category: "coupe", priceRange: { min: 4000000, max: 6000000 } },
    // Electric Models
    { name: "e-tron", category: "suv", priceRange: { min: 2500000, max: 3500000 } },
    { name: "e-tron 50", category: "suv", priceRange: { min: 2200000, max: 2800000 } },
    { name: "e-tron 55", category: "suv", priceRange: { min: 2500000, max: 3200000 } },
    { name: "e-tron GT", category: "sedan", priceRange: { min: 3000000, max: 4000000 } },
    { name: "e-tron Sportback", category: "suv", priceRange: { min: 2600000, max: 3400000 } },
    { name: "SQ6 e-tron", category: "suv", priceRange: { min: 2800000, max: 3600000 } },
    { name: "Q4 e-tron", category: "suv", priceRange: { min: 1800000, max: 2500000 } },
    { name: "RS e-tron GT", category: "sedan", priceRange: { min: 4000000, max: 5500000 } },
  ],

  // Lexus Models
  Lexus: [
    { name: "ES", category: "sedan", priceRange: { min: 1200000, max: 1800000 } },
    { name: "IS", category: "sedan", priceRange: { min: 1000000, max: 1500000 } },
    { name: "LS", category: "sedan", priceRange: { min: 2500000, max: 4000000 } },
    { name: "NX", category: "suv", priceRange: { min: 1100000, max: 1600000 } },
    { name: "RX", category: "suv", priceRange: { min: 1500000, max: 2200000 } },
    { name: "GX", category: "suv", priceRange: { min: 2000000, max: 2800000 } },
    { name: "LX", category: "suv", priceRange: { min: 2800000, max: 4000000 } },
  ],

  // Infiniti Models
  Infiniti: [
    { name: "Q50", category: "sedan", priceRange: { min: 900000, max: 1400000 } },
    { name: "Q60", category: "coupe", priceRange: { min: 1200000, max: 1800000 } },
    { name: "Q70", category: "sedan", priceRange: { min: 1100000, max: 1600000 } },
    { name: "QX50", category: "suv", priceRange: { min: 1000000, max: 1500000 } },
    { name: "QX60", category: "suv", priceRange: { min: 1200000, max: 1700000 } },
    { name: "QX80", category: "suv", priceRange: { min: 1800000, max: 2500000 } },
  ],

  // Porsche Models
  Porsche: [
    { name: "718 Cayman", category: "coupe", priceRange: { min: 2000000, max: 2800000 } },
    { name: "718 Boxster", category: "convertible", priceRange: { min: 2200000, max: 3000000 } },
    { name: "911", category: "coupe", priceRange: { min: 3500000, max: 6000000 } },
    { name: "Panamera", category: "sedan", priceRange: { min: 3000000, max: 5000000 } },
    { name: "Macan", category: "suv", priceRange: { min: 1800000, max: 2500000 } },
    { name: "Cayenne", category: "suv", priceRange: { min: 2500000, max: 4000000 } },
    { name: "Taycan", category: "sedan", priceRange: { min: 3500000, max: 5500000 } },
  ],

  // Volvo Models
  Volvo: [
    { name: "S60", category: "sedan", priceRange: { min: 800000, max: 1200000 } },
    { name: "S90", category: "sedan", priceRange: { min: 1200000, max: 1800000 } },
    { name: "V60", category: "wagon", priceRange: { min: 900000, max: 1300000 } },
    { name: "V90", category: "wagon", priceRange: { min: 1300000, max: 1900000 } },
    { name: "XC40", category: "suv", priceRange: { min: 700000, max: 1000000 } },
    { name: "XC60", category: "suv", priceRange: { min: 1000000, max: 1500000 } },
    { name: "XC90", category: "suv", priceRange: { min: 1500000, max: 2200000 } },
  ],

  // Jaguar Models (Enhanced with Electric)
  Jaguar: [
    { name: "XE", category: "sedan", priceRange: { min: 1000000, max: 1500000 } },
    { name: "XF", category: "sedan", priceRange: { min: 1300000, max: 1900000 } },
    { name: "XJ", category: "sedan", priceRange: { min: 2000000, max: 3000000 } },
    { name: "XJ Electric", category: "sedan", priceRange: { min: 2500000, max: 3500000 } },
    { name: "F-PACE", category: "suv", priceRange: { min: 1200000, max: 1800000 } },
    { name: "E-PACE", category: "suv", priceRange: { min: 900000, max: 1400000 } },
    { name: "I-PACE", category: "suv", priceRange: { min: 2200000, max: 3000000 } },
    { name: "F-TYPE", category: "coupe", priceRange: { min: 2000000, max: 3500000 } },
    { name: "Upcoming GT Electric", category: "coupe", priceRange: { min: 3000000, max: 4500000 } },
  ],

  // Land Rover Models
  "Land Rover": [
    { name: "Discovery Sport", category: "suv", priceRange: { min: 1200000, max: 1700000 } },
    { name: "Discovery", category: "suv", priceRange: { min: 1800000, max: 2500000 } },
    { name: "Range Rover Evoque", category: "suv", priceRange: { min: 1300000, max: 1900000 } },
    { name: "Range Rover Velar", category: "suv", priceRange: { min: 1800000, max: 2600000 } },
    { name: "Range Rover Sport", category: "suv", priceRange: { min: 2200000, max: 3200000 } },
    { name: "Range Rover", category: "suv", priceRange: { min: 3000000, max: 5000000 } },
    { name: "Defender", category: "suv", priceRange: { min: 1800000, max: 2800000 } },
  ],

  // Mitsubishi Models
  Mitsubishi: [
    { name: "Mirage", category: "hatchback", priceRange: { min: 250000, max: 380000 } },
    { name: "Lancer", category: "sedan", priceRange: { min: 350000, max: 520000 } },
    { name: "Outlander", category: "suv", priceRange: { min: 600000, max: 900000 } },
    { name: "Pajero", category: "suv", priceRange: { min: 800000, max: 1200000 } },
    { name: "Eclipse Cross", category: "crossover", priceRange: { min: 550000, max: 800000 } },
    { name: "ASX", category: "crossover", priceRange: { min: 450000, max: 650000 } },
  ],

  // Subaru Models
  Subaru: [
    { name: "Impreza", category: "sedan", priceRange: { min: 450000, max: 650000 } },
    { name: "Legacy", category: "sedan", priceRange: { min: 600000, max: 900000 } },
    { name: "Outback", category: "wagon", priceRange: { min: 700000, max: 1000000 } },
    { name: "Forester", category: "suv", priceRange: { min: 650000, max: 950000 } },
    { name: "Ascent", category: "suv", priceRange: { min: 900000, max: 1300000 } },
    { name: "WRX", category: "sedan", priceRange: { min: 800000, max: 1200000 } },
  ],

  // Suzuki Models
  Suzuki: [
    { name: "Alto", category: "hatchback", priceRange: { min: 180000, max: 280000 } },
    { name: "Swift", category: "hatchback", priceRange: { min: 280000, max: 420000 } },
    { name: "Baleno", category: "hatchback", priceRange: { min: 320000, max: 480000 } },
    { name: "Ciaz", category: "sedan", priceRange: { min: 380000, max: 580000 } },
    { name: "Vitara", category: "suv", priceRange: { min: 450000, max: 650000 } },
    { name: "S-Cross", category: "crossover", priceRange: { min: 500000, max: 750000 } },
    { name: "Jimny", category: "suv", priceRange: { min: 400000, max: 600000 } },
  ],

  // Peugeot Models
  Peugeot: [
    { name: "208", category: "hatchback", priceRange: { min: 350000, max: 520000 } },
    { name: "301", category: "sedan", priceRange: { min: 320000, max: 480000 } },
    { name: "308", category: "hatchback", priceRange: { min: 450000, max: 650000 } },
    { name: "508", category: "sedan", priceRange: { min: 650000, max: 950000 } },
    { name: "2008", category: "crossover", priceRange: { min: 450000, max: 650000 } },
    { name: "3008", category: "suv", priceRange: { min: 600000, max: 900000 } },
    { name: "5008", category: "suv", priceRange: { min: 750000, max: 1100000 } },
  ],

  // Renault Models
  Renault: [
    { name: "Clio", category: "hatchback", priceRange: { min: 300000, max: 450000 } },
    { name: "Logan", category: "sedan", priceRange: { min: 280000, max: 420000 } },
    { name: "Megane", category: "hatchback", priceRange: { min: 400000, max: 600000 } },
    { name: "Fluence", category: "sedan", priceRange: { min: 380000, max: 580000 } },
    { name: "Duster", category: "suv", priceRange: { min: 400000, max: 600000 } },
    { name: "Captur", category: "crossover", priceRange: { min: 450000, max: 650000 } },
    { name: "Koleos", category: "suv", priceRange: { min: 650000, max: 950000 } },
  ],

  // Fiat Models
  Fiat: [
    { name: "Panda", category: "hatchback", priceRange: { min: 250000, max: 380000 } },
    { name: "Punto", category: "hatchback", priceRange: { min: 300000, max: 450000 } },
    { name: "Tipo", category: "sedan", priceRange: { min: 350000, max: 520000 } },
    { name: "500", category: "hatchback", priceRange: { min: 400000, max: 600000 } },
    { name: "500X", category: "crossover", priceRange: { min: 500000, max: 750000 } },
  ],

  // Skoda Models
  Skoda: [
    { name: "Fabia", category: "hatchback", priceRange: { min: 350000, max: 520000 } },
    { name: "Rapid", category: "sedan", priceRange: { min: 400000, max: 600000 } },
    { name: "Octavia", category: "sedan", priceRange: { min: 500000, max: 750000 } },
    { name: "Superb", category: "sedan", priceRange: { min: 700000, max: 1000000 } },
    { name: "Kamiq", category: "crossover", priceRange: { min: 450000, max: 650000 } },
    { name: "Karoq", category: "suv", priceRange: { min: 600000, max: 900000 } },
    { name: "Kodiaq", category: "suv", priceRange: { min: 800000, max: 1200000 } },
  ],

  // Jeep Models
  Jeep: [
    { name: "Renegade", category: "suv", priceRange: { min: 600000, max: 900000 } },
    { name: "Compass", category: "suv", priceRange: { min: 700000, max: 1000000 } },
    { name: "Cherokee", category: "suv", priceRange: { min: 900000, max: 1300000 } },
    { name: "Grand Cherokee", category: "suv", priceRange: { min: 1200000, max: 1800000 } },
    { name: "Wrangler", category: "suv", priceRange: { min: 1000000, max: 1500000 } },
    { name: "Gladiator", category: "pickup", priceRange: { min: 1100000, max: 1600000 } },
  ],

  // Add more Chinese brands
  BAIC: [
    { name: "X25", category: "crossover", priceRange: { min: 280000, max: 420000 } },
    { name: "X35", category: "crossover", priceRange: { min: 320000, max: 480000 } },
    { name: "X55", category: "suv", priceRange: { min: 380000, max: 580000 } },
    { name: "X65", category: "suv", priceRange: { min: 450000, max: 650000 } },
    { name: "BJ40", category: "suv", priceRange: { min: 400000, max: 600000 } },
  ],

  Jetour: [
    { name: "X70", category: "suv", priceRange: { min: 380000, max: 580000 } },
    { name: "X90", category: "suv", priceRange: { min: 450000, max: 650000 } },
    { name: "X95", category: "suv", priceRange: { min: 520000, max: 750000 } },
    { name: "Dashing", category: "suv", priceRange: { min: 350000, max: 520000 } },
  ],

  Haval: [
    { name: "H6", category: "suv", priceRange: { min: 400000, max: 600000 } },
    { name: "H9", category: "suv", priceRange: { min: 550000, max: 800000 } },
    { name: "Jolion", category: "crossover", priceRange: { min: 350000, max: 520000 } },
    { name: "F7", category: "suv", priceRange: { min: 450000, max: 650000 } },
  ],

  JAC: [
    { name: "S3", category: "crossover", priceRange: { min: 280000, max: 420000 } },
    { name: "S4", category: "suv", priceRange: { min: 350000, max: 520000 } },
    { name: "T6", category: "pickup", priceRange: { min: 400000, max: 600000 } },
    { name: "T8", category: "pickup", priceRange: { min: 450000, max: 650000 } },
  ],

  GAC: [
    { name: "GS3", category: "crossover", priceRange: { min: 320000, max: 480000 } },
    { name: "GS4", category: "suv", priceRange: { min: 380000, max: 580000 } },
    { name: "GS8", category: "suv", priceRange: { min: 500000, max: 750000 } },
    { name: "GA4", category: "sedan", priceRange: { min: 280000, max: 420000 } },
  ],

  MG: [
    { name: "3", category: "sedan", priceRange: { min: 280000, max: 420000 } },
    { name: "5", category: "sedan", priceRange: { min: 350000, max: 520000 } },
    { name: "6", category: "sedan", priceRange: { min: 400000, max: 600000 } },
    { name: "HS", category: "suv", priceRange: { min: 450000, max: 650000 } },
    { name: "ZS", category: "crossover", priceRange: { min: 380000, max: 580000 } },
    { name: "RX5", category: "suv", priceRange: { min: 500000, max: 750000 } },
  ],

  // More Chinese Brands
  Dongfeng: [
    { name: "AX7", category: "suv", priceRange: { min: 400000, max: 600000 } },
    { name: "AX5", category: "crossover", priceRange: { min: 350000, max: 520000 } },
    { name: "AX3", category: "crossover", priceRange: { min: 280000, max: 420000 } },
    { name: "S30", category: "sedan", priceRange: { min: 300000, max: 450000 } },
  ],

  Changan: [
    { name: "CS35", category: "crossover", priceRange: { min: 300000, max: 450000 } },
    { name: "CS55", category: "suv", priceRange: { min: 380000, max: 580000 } },
    { name: "CS75", category: "suv", priceRange: { min: 450000, max: 650000 } },
    { name: "Eado", category: "sedan", priceRange: { min: 320000, max: 480000 } },
  ],

  Brilliance: [
    { name: "V3", category: "sedan", priceRange: { min: 280000, max: 420000 } },
    { name: "V5", category: "sedan", priceRange: { min: 320000, max: 480000 } },
    { name: "V6", category: "suv", priceRange: { min: 400000, max: 600000 } },
  ],

  // Electric Brands Models
  NIO: [
    { name: "ES6", category: "suv", priceRange: { min: 1500000, max: 2200000 } },
    { name: "ES8", category: "suv", priceRange: { min: 1800000, max: 2500000 } },
    { name: "ET7", category: "sedan", priceRange: { min: 1600000, max: 2300000 } },
    { name: "ET5", category: "sedan", priceRange: { min: 1200000, max: 1800000 } },
  ],

  XPENG: [
    { name: "P7", category: "sedan", priceRange: { min: 1000000, max: 1500000 } },
    { name: "P5", category: "sedan", priceRange: { min: 800000, max: 1200000 } },
    { name: "G3", category: "suv", priceRange: { min: 700000, max: 1000000 } },
    { name: "G9", category: "suv", priceRange: { min: 1200000, max: 1800000 } },
  ],

  ZEEKER: [
    { name: "001", category: "sedan", priceRange: { min: 1200000, max: 1800000 } },
    { name: "009", category: "suv", priceRange: { min: 1500000, max: 2200000 } },
    { name: "X", category: "suv", priceRange: { min: 1000000, max: 1500000 } },
  ],

  Lucid: [
    { name: "Air Dream", category: "sedan", priceRange: { min: 4000000, max: 6000000 } },
    { name: "Air Touring", category: "sedan", priceRange: { min: 3000000, max: 4500000 } },
    { name: "Air Pure", category: "sedan", priceRange: { min: 2500000, max: 3500000 } },
  ],

  Rivian: [
    { name: "R1T", category: "pickup", priceRange: { min: 2500000, max: 3500000 } },
    { name: "R1S", category: "suv", priceRange: { min: 2800000, max: 4000000 } },
  ],

  Polestar: [
    { name: "2", category: "sedan", priceRange: { min: 1500000, max: 2200000 } },
    { name: "3", category: "suv", priceRange: { min: 1800000, max: 2500000 } },
    { name: "4", category: "suv", priceRange: { min: 2000000, max: 2800000 } },
  ],

  // Missing Gasoline Brands Models
  Acura: [
    { name: "ILX", category: "sedan", priceRange: { min: 800000, max: 1200000 } },
    { name: "TLX", category: "sedan", priceRange: { min: 1000000, max: 1500000 } },
    { name: "RDX", category: "suv", priceRange: { min: 1200000, max: 1700000 } },
    { name: "MDX", category: "suv", priceRange: { min: 1500000, max: 2200000 } },
    { name: "NSX", category: "coupe", priceRange: { min: 4000000, max: 6000000 } },
  ],

  Alfa: [
    { name: "Giulia", category: "sedan", priceRange: { min: 1200000, max: 1800000 } },
    { name: "Stelvio", category: "suv", priceRange: { min: 1400000, max: 2000000 } },
    { name: "Giulietta", category: "hatchback", priceRange: { min: 800000, max: 1200000 } },
    { name: "4C", category: "coupe", priceRange: { min: 2000000, max: 2800000 } },
  ],

  Cadillac: [
    { name: "ATS", category: "sedan", priceRange: { min: 1000000, max: 1500000 } },
    { name: "CTS", category: "sedan", priceRange: { min: 1300000, max: 1900000 } },
    { name: "XTS", category: "sedan", priceRange: { min: 1500000, max: 2200000 } },
    { name: "XT4", category: "suv", priceRange: { min: 1200000, max: 1700000 } },
    { name: "XT5", category: "suv", priceRange: { min: 1500000, max: 2200000 } },
    { name: "Escalade", category: "suv", priceRange: { min: 2500000, max: 3500000 } },
  ],

  Chrysler: [
    { name: "300", category: "sedan", priceRange: { min: 800000, max: 1200000 } },
    { name: "Pacifica", category: "suv", priceRange: { min: 1000000, max: 1500000 } },
  ],

  Citroen: [
    { name: "C3", category: "hatchback", priceRange: { min: 300000, max: 450000 } },
    { name: "C4", category: "hatchback", priceRange: { min: 400000, max: 600000 } },
    { name: "C5", category: "sedan", priceRange: { min: 500000, max: 750000 } },
    { name: "C3 Aircross", category: "crossover", priceRange: { min: 450000, max: 650000 } },
    { name: "C5 Aircross", category: "suv", priceRange: { min: 600000, max: 900000 } },
  ],

  Dacia: [
    { name: "Logan", category: "sedan", priceRange: { min: 250000, max: 380000 } },
    { name: "Sandero", category: "hatchback", priceRange: { min: 230000, max: 350000 } },
    { name: "Duster", category: "suv", priceRange: { min: 350000, max: 520000 } },
    { name: "Lodgy", category: "suv", priceRange: { min: 400000, max: 600000 } },
  ],

  Dodge: [
    { name: "Charger", category: "sedan", priceRange: { min: 1000000, max: 1500000 } },
    { name: "Challenger", category: "coupe", priceRange: { min: 1200000, max: 1800000 } },
    { name: "Durango", category: "suv", priceRange: { min: 1300000, max: 1900000 } },
    { name: "Journey", category: "suv", priceRange: { min: 800000, max: 1200000 } },
  ],

  Foton: [
    { name: "Tunland", category: "pickup", priceRange: { min: 400000, max: 600000 } },
    { name: "Sauvana", category: "suv", priceRange: { min: 350000, max: 520000 } },
    { name: "View", category: "suv", priceRange: { min: 300000, max: 450000 } },
  ],

  GMC: [
    { name: "Sierra", category: "pickup", priceRange: { min: 1000000, max: 1500000 } },
    { name: "Acadia", category: "suv", priceRange: { min: 1200000, max: 1800000 } },
    { name: "Terrain", category: "suv", priceRange: { min: 900000, max: 1300000 } },
    { name: "Yukon", category: "suv", priceRange: { min: 1800000, max: 2500000 } },
  ],

  Genesis: [
    { name: "G70", category: "sedan", priceRange: { min: 1200000, max: 1700000 } },
    { name: "G80", category: "sedan", priceRange: { min: 1500000, max: 2200000 } },
    { name: "G90", category: "sedan", priceRange: { min: 2000000, max: 2800000 } },
    { name: "GV70", category: "suv", priceRange: { min: 1400000, max: 2000000 } },
    { name: "GV80", category: "suv", priceRange: { min: 1800000, max: 2500000 } },
  ],

  Isuzu: [
    { name: "D-Max", category: "pickup", priceRange: { min: 500000, max: 750000 } },
    { name: "MU-X", category: "suv", priceRange: { min: 650000, max: 950000 } },
  ],

  Lifan: [
    { name: "520", category: "sedan", priceRange: { min: 200000, max: 320000 } },
    { name: "620", category: "sedan", priceRange: { min: 250000, max: 380000 } },
    { name: "X60", category: "suv", priceRange: { min: 300000, max: 450000 } },
  ],

  Lincoln: [
    { name: "MKZ", category: "sedan", priceRange: { min: 1200000, max: 1800000 } },
    { name: "Continental", category: "sedan", priceRange: { min: 1800000, max: 2500000 } },
    { name: "MKC", category: "suv", priceRange: { min: 1100000, max: 1600000 } },
    { name: "Navigator", category: "suv", priceRange: { min: 2200000, max: 3200000 } },
  ],

  Maserati: [
    { name: "Ghibli", category: "sedan", priceRange: { min: 2000000, max: 2800000 } },
    { name: "Quattroporte", category: "sedan", priceRange: { min: 2800000, max: 4000000 } },
    { name: "Levante", category: "suv", priceRange: { min: 2500000, max: 3500000 } },
    { name: "GranTurismo", category: "coupe", priceRange: { min: 3500000, max: 5000000 } },
  ],

  Opel: [
    { name: "Corsa", category: "hatchback", priceRange: { min: 350000, max: 520000 } },
    { name: "Astra", category: "hatchback", priceRange: { min: 450000, max: 650000 } },
    { name: "Insignia", category: "sedan", priceRange: { min: 600000, max: 900000 } },
    { name: "Crossland", category: "crossover", priceRange: { min: 500000, max: 750000 } },
    { name: "Grandland", category: "suv", priceRange: { min: 650000, max: 950000 } },
  ],

  Seat: [
    { name: "Ibiza", category: "hatchback", priceRange: { min: 350000, max: 520000 } },
    { name: "Leon", category: "hatchback", priceRange: { min: 450000, max: 650000 } },
    { name: "Toledo", category: "sedan", priceRange: { min: 400000, max: 600000 } },
    { name: "Arona", category: "crossover", priceRange: { min: 500000, max: 750000 } },
    { name: "Ateca", category: "suv", priceRange: { min: 600000, max: 900000 } },
  ],

  Zotye: [
    { name: "Z300", category: "sedan", priceRange: { min: 220000, max: 350000 } },
    { name: "T600", category: "suv", priceRange: { min: 300000, max: 450000 } },
    { name: "SR9", category: "suv", priceRange: { min: 350000, max: 520000 } },
  ],


}

export function getAllMakes(fuelType?: string): string[] {
  if (!fuelType) {
    return Object.keys(CAR_BRANDS).sort()
  }
  
  // Filter brands based on fuel type
  if (fuelType === "electric") {
    // Electric brands and brands that have electric models
    const electricBrands = Object.entries(CAR_BRANDS)
      .filter(([name, brand]) => 
        brand.category === "electric" || 
        ["Tesla", "BYD", "BMW", "Mercedes", "Audi", "Volkswagen", "Hyundai", "Kia", "Nissan", "Toyota", "Honda", "Ford", "Chevrolet", "Volvo", "Jaguar", "Polestar", "Lucid", "Rivian", "NIO", "XPENG", "ZEEKER"].includes(name)
      )
      .map(([name]) => name)
    return electricBrands.sort()
  } else {
    // Fuel brands (all except pure electric brands)
    const fuelBrands = Object.entries(CAR_BRANDS)
      .filter(([name, brand]) => 
        brand.category !== "electric" || 
        ["BYD", "BMW", "Mercedes", "Audi", "Volkswagen", "Hyundai", "Kia", "Nissan", "Toyota", "Honda", "Ford", "Chevrolet", "Volvo", "Jaguar"].includes(name)
      )
      .map(([name]) => name)
    return fuelBrands.sort()
  }
}

export function getModelsByMake(make: string, fuelType?: string): CarModel[] {
  const allModels = CAR_MODELS_BY_MAKE[make] || []
  
  if (!fuelType) {
    return allModels
  }
  
  // Filter models based on fuel type
  if (fuelType === "electric") {
    // For electric, show electric models or brands known to have electric variants
    if (["Tesla", "BYD", "NIO", "XPENG", "ZEEKER", "Lucid", "Rivian", "Polestar"].includes(make)) {
      return allModels // All models from pure electric brands
    }
    
    // For traditional brands, filter to electric models or show all (assuming they have electric variants)
    const electricModels = allModels.filter(model => 
      model.name.toLowerCase().includes("electric") ||
      model.name.toLowerCase().includes("e-") ||
      model.name.toLowerCase().includes("ev") ||
      model.name.toLowerCase().includes("hybrid") ||
      model.name.toLowerCase().includes("i-pace") ||
      model.name.toLowerCase().includes("upcoming") ||
      ["i3", "i4", "iX", "EQC", "e-tron", "e-tron 50", "e-tron 55", "e-tron GT", "e-tron Sportback", "SQ6 e-tron", "Q4 e-tron", "RS e-tron GT", "ID.3", "ID.4", "Leaf", "Ariya", "Mustang Mach-E", "F-150 Lightning", "Bolt", "Volt", "I-PACE", "XJ Electric"].includes(model.name)
    )
    
    // If no specific electric models found, return all models (assuming brand has electric variants)
    return electricModels.length > 0 ? electricModels : allModels
  } else {
    // For fuel, exclude pure electric models
    return allModels.filter(model => 
      !model.name.toLowerCase().includes("electric") &&
      !model.name.toLowerCase().includes("upcoming") &&
      !["Model 3", "Model S", "Model Y", "Model X", "Cybertruck", "I-PACE", "XJ Electric"].includes(model.name)
    )
  }
}

export function getBrandInfo(make: string): CarBrand | undefined {
  return CAR_BRANDS[make]
}

export function getManufacturingYears(): number[] {
  const currentYear = new Date().getFullYear()
  const years: number[] = []

  // Last 15 years (most common for insurance)
  for (let i = 0; i <= 15; i++) {
    years.push(currentYear - i)
  }

  return years
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US").format(price)
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    sedan: "🚗",
    suv: "🚙",
    hatchback: "🚕",
    coupe: "🏎️",
    pickup: "🛻",
    crossover: "🚐",
    wagon: "🚐",
    convertible: "🏎️",
  }
  return icons[category] || "🚗"
}

export function getBrandsByCategory(category: string): string[] {
  return Object.entries(CAR_BRANDS)
    .filter(([_, brand]) => brand.category === category)
    .map(([name, _]) => name)
    .sort()
}

export function getPopularBrands(): string[] {
  return [
    "Toyota",
    "Honda",
    "Nissan",
    "Hyundai",
    "Kia",
    "BMW",
    "Mercedes",
    "Audi",
    "Volkswagen",
    "Ford",
    "Chevrolet",
    "Cherry",
    "Geely",
    "BYD",
    "Tesla",
  ]
}
