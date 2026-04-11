import { NextResponse } from "next/server"
import { contactFormSchema } from "@/lib/validators"
import { validateBody, successResponse, errorResponse } from "@/lib/api-helpers"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  const result = await validateBody(request, contactFormSchema)
  if (!result.success) return result.response

  const { name, email, phone, subject, message } = result.data

  try {
    if (supabase) {
      const { error } = await supabase.from("contact_inquiries").insert([
        { name, email, phone, subject, message, status: "new" },
      ])
      if (error) throw error
    } else {
      console.log("Contact inquiry (DB not configured):", result.data)
    }

    return successResponse({ message: "Thank you! We'll get back to you shortly." }, 201)
  } catch (err) {
    console.error("Contact form error:", err)
    return errorResponse("Failed to submit. Please try again.", 500)
  }
}
