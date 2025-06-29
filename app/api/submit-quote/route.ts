import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"
import { sendInsuranceQuoteEmail } from "@/lib/email"
import { carInfoSchema, userInfoSchema, documentsSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  console.log("=== Quote Submission Started ===")

  try {
    const body = await request.json()
    console.log("Request body received:", {
      hasCarInfo: !!body.carInfo,
      hasUserInfo: !!body.userInfo,
      hasDocuments: !!body.documents,
      hasSelectedOffer: !!body.selectedOffer,
    })

    const { carInfo, userInfo, documents, selectedOffer } = body

    // Validate input data
    console.log("Validating input data...")
    const validatedCarInfo = carInfoSchema.parse(carInfo)
    const validatedUserInfo = userInfoSchema.parse(userInfo)
    const validatedDocuments = documentsSchema.parse(documents)

    console.log("Validation successful")

    // Insert user data
    console.log("Inserting user data...")
    const userResult = await sql`
      INSERT INTO users (full_name, mobile_number, email)
      VALUES (${validatedUserInfo.full_name}, ${validatedUserInfo.mobile_number}, ${validatedUserInfo.email})
      RETURNING id
    `
    const userId = userResult[0].id
    console.log("User created with ID:", userId)

    // Insert car data
    console.log("Inserting car data...")
    const carResult = await sql`
      INSERT INTO cars (user_id, make, model, year, market_price, condition, fuel_type)
      VALUES (${userId}, ${validatedCarInfo.make}, ${validatedCarInfo.model}, ${validatedCarInfo.year}, 
              ${validatedCarInfo.market_price}, ${validatedCarInfo.condition}, ${validatedCarInfo.fuel_type})
      RETURNING id
    `
    const carId = carResult[0].id
    console.log("Car created with ID:", carId)

    // Insert documents
    console.log("Inserting documents...")
    const documentTypes = ["personal_id_front", "personal_id_back", "license_front", "license_back"]
    for (const docType of documentTypes) {
      await sql`
        INSERT INTO documents (user_id, document_type, file_name, file_url)
        VALUES (${userId}, ${docType}, ${docType}, ${validatedDocuments[docType as keyof typeof validatedDocuments]})
      `
    }
    console.log("Documents inserted successfully")

    // Insert selected quote
    console.log("Inserting selected quote...")
    await sql`
      INSERT INTO insurance_quotes (user_id, car_id, company_name, policy_type, premium_rate, annual_premium, selected)
      VALUES (${userId}, ${carId}, ${selectedOffer.company}, ${selectedOffer.policyType}, 
              ${selectedOffer.premiumRate}, ${selectedOffer.annualPremium}, true)
    `
    console.log("Quote inserted successfully")

    // Send email
    console.log("Sending email notification...")
    const emailResult = await sendInsuranceQuoteEmail({
      userInfo: validatedUserInfo,
      carInfo: validatedCarInfo,
      selectedOffer,
      documents: validatedDocuments,
    })

    console.log("Email result:", emailResult)

    if (!emailResult.success) {
      console.error("Email sending failed:", emailResult.error)
      // Don't fail the entire request if email fails, but log it
    }

    console.log("=== Quote Submission Completed Successfully ===")

    return NextResponse.json({
      success: true,
      message: "Quote submitted successfully",
      userId,
      emailSent: emailResult.success,
      emailError: emailResult.success ? null : emailResult.error,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("=== Quote Submission Failed ===")
    console.error("Error details:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit quote",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
