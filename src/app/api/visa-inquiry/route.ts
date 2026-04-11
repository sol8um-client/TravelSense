import { visaInquirySchema } from "@/lib/validators"
import { validateBody, successResponse, errorResponse } from "@/lib/api-helpers"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  const result = await validateBody(request, visaInquirySchema)
  if (!result.success) return result.response

  const data = result.data

  try {
    if (supabase) {
      const { error } = await supabase.from("visa_inquiries").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          destination: data.destination,
          travel_date: data.travelDate,
          number_of_travelers: data.numberOfTravelers,
          message: data.message || null,
          status: "new",
        },
      ])
      if (error) throw error
    } else {
      console.log("Visa inquiry (DB not configured):", data)
    }

    return successResponse({ message: "Visa inquiry submitted! Our team will assist you shortly." }, 201)
  } catch (err) {
    console.error("Visa inquiry error:", err)
    return errorResponse("Failed to submit. Please try again.", 500)
  }
}
