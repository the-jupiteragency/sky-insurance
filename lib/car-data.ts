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

  // Audi Models
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
    { name: "e-tron", category: "suv", priceRange: { min: 2500000, max: 3500000 } },
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
}

export function getAllMakes(): string[] {
  return Object.keys(CAR_BRANDS).sort()
}

export function getModelsByMake(make: string): CarModel[] {
  return CAR_MODELS_BY_MAKE[make] || []
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
