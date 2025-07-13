import { sql } from "@/lib/database"
import { CarInfo, UserInfo, Documents } from "@/lib/validations"

export interface QuoteSubmissionData {
  userInfo: UserInfo
  carInfo: CarInfo
  documents: Documents
  selectedOffer: {
    company: string
    policyType: string
    premiumRate: number
    annualPremium: number
  }
}

export async function submitQuoteTransaction(data: QuoteSubmissionData) {
  try {
    // Start transaction
    await sql`BEGIN`

    // Insert user
    const userResult = await sql`
      INSERT INTO users (full_name, mobile_number, email)
      VALUES (${data.userInfo.full_name}, ${data.userInfo.mobile_number}, ${data.userInfo.email || null})
      RETURNING id
    `
    const userId = userResult[0].id

    // Insert car
    const carResult = await sql`
      INSERT INTO cars (user_id, make, model, year, market_price, condition, fuel_type)
      VALUES (${userId}, ${data.carInfo.make}, ${data.carInfo.model}, ${data.carInfo.year}, 
              ${data.carInfo.market_price}, ${data.carInfo.condition}, ${data.carInfo.fuel_type})
      RETURNING id
    `
    const carId = carResult[0].id

    // Insert documents
    const documentTypes = ["personal_id_front", "personal_id_back", "license_front", "license_back"] as const
    for (const docType of documentTypes) {
      const docUrl = data.documents[docType]
      if (docUrl) {
        await sql`
          INSERT INTO documents (user_id, document_type, file_name, file_url)
          VALUES (${userId}, ${docType}, ${docType}, ${docUrl})
        `
      }
    }

    // Insert quote
    await sql`
      INSERT INTO insurance_quotes (user_id, car_id, company_name, policy_type, premium_rate, annual_premium, selected)
      VALUES (${userId}, ${carId}, ${data.selectedOffer.company}, ${data.selectedOffer.policyType}, 
              ${data.selectedOffer.premiumRate}, ${data.selectedOffer.annualPremium}, true)
    `

    // Commit transaction
    await sql`COMMIT`

    return { success: true, userId, carId }
  } catch (error) {
    // Rollback on error
    await sql`ROLLBACK`
    throw error
  }
}