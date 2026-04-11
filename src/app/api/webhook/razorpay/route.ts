import { NextResponse } from "next/server"

export async function POST(request: Request) {
  // Placeholder for Razorpay webhook
  // Will be implemented when Razorpay credentials are provided
  try {
    const body = await request.json()
    console.log("Razorpay webhook received:", JSON.stringify(body).slice(0, 200))
    return NextResponse.json({ status: "received" }, { status: 200 })
  } catch {
    return NextResponse.json({ status: "error" }, { status: 400 })
  }
}
