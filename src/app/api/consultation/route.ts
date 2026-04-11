import { consultationFormSchema } from "@/lib/validators"
import { validateBody, successResponse, errorResponse } from "@/lib/api-helpers"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  const result = await validateBody(request, consultationFormSchema)
  if (!result.success) return result.response

  const data = result.data

  try {
    if (supabase) {
      const { error } = await supabase.from("consultation_bookings").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          preferred_date: data.preferredDate,
          preferred_time: data.preferredTime,
          interests: [data.travelInterest],
          message: data.message || null,
        },
      ])
      if (error) throw error
    } else {
      console.log("Consultation booking (DB not configured):", data)
    }

    return successResponse({ message: "Consultation booked! We'll confirm within 24 hours." }, 201)
  } catch (err) {
    console.error("Consultation booking error:", err)
    return errorResponse("Failed to book. Please try again.", 500)
  }
}
