import { type NextRequest, NextResponse } from "next/server"
import { sendInsuranceQuoteEmail } from "@/lib/email"
import { carInfoSchema, userInfoSchema, documentsSchema } from "@/lib/validations"
import { submitQuoteTransaction } from "@/lib/database-service"
import { Logger } from "@/lib/logger"

export async function POST(request: NextRequest) {
  Logger.info("Quote submission started")

  try {
    const body = await request.json()
    const { carInfo, userInfo, documents, selectedOffer } = body

    // Validate input data
    const validatedCarInfo = carInfoSchema.parse(carInfo)
    const validatedUserInfo = userInfoSchema.parse(userInfo)
    const validatedDocuments = documentsSchema.parse(documents || {})

    Logger.info("Input validation successful", {
      action: "validation",
      details: { hasEmail: !!validatedUserInfo.email }
    })

    // Submit quote with transaction
    const dbResult = await submitQuoteTransaction({
      userInfo: validatedUserInfo,
      carInfo: validatedCarInfo,
      documents: validatedDocuments,
      selectedOffer
    })

    Logger.info("Database transaction completed", {
      userId: dbResult.userId,
      action: "database_insert"
    })

    // Send email notification
    const emailResult = await sendInsuranceQuoteEmail({
      userInfo: validatedUserInfo,
      carInfo: validatedCarInfo,
      selectedOffer,
      documents: validatedDocuments,
    })

    if (!emailResult.success) {
      Logger.warn("Email sending failed", {
        userId: dbResult.userId,
        action: "email_send",
        error: new Error(emailResult.error || "Unknown email error")
      })
    }

    Logger.info("Quote submission completed successfully", {
      userId: dbResult.userId,
      action: "quote_complete"
    })

    return NextResponse.json({
      success: true,
      message: "Quote submitted successfully",
      userId: dbResult.userId,
      emailSent: emailResult.success,
    })
  } catch (error) {
    Logger.error("Quote submission failed", {
      action: "quote_submission",
      error: error instanceof Error ? error : new Error(String(error))
    })

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit quote",
        message: "Please try again or contact support"
      },
      { status: 500 }
    )
  }
}
