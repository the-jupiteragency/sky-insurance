import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database types
export interface User {
  id: number
  full_name: string
  mobile_number: string
  email: string
  created_at: Date
  updated_at: Date
}

export interface Car {
  id: number
  user_id: number
  make: string
  model: string
  year: number
  market_price: number
  condition: "new" | "used"
  fuel_type: "fuel" | "electric"
  created_at: Date
}

export interface Document {
  id: number
  user_id: number
  document_type: string
  file_name: string
  file_url: string
  created_at: Date
}

export interface InsuranceQuote {
  id: number
  user_id: number
  car_id: number
  company_name: string
  policy_type: string
  premium_rate: number
  annual_premium: number
  features: string
  conditions: string
  selected: boolean
  created_at: Date
}
