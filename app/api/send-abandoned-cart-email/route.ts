import { NextRequest, NextResponse } from "next/server";
import { sendAbandonedCartEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const result = await sendAbandonedCartEmail({
      userInfo: data.userInfo,
      carInfo: data.carInfo,
      timestamp: data.timestamp,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Abandoned cart email API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send abandoned cart email" },
      { status: 500 }
    );
  }
}