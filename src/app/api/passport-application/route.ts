import { passportApplicationSchema } from "@/lib/validators"
import { validateBody, successResponse, errorResponse } from "@/lib/api-helpers"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  const result = await validateBody(request, passportApplicationSchema)
  if (!result.success) return result.response

  const data = result.data

  try {
    if (supabase) {
      const { error } = await supabase.from("passport_applications").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          application_type: data.applicationType,
          passport_type: data.passportType,
          city: data.city,
          date_of_birth: data.dateOfBirth || null,
          message: data.message || null,
          status: "new",
        },
      ])
      if (error) throw error
    } else {
      console.log("Passport application (DB not configured):", data)
    }

    return successResponse(
      { message: "Passport application submitted! Our team will assist you shortly." },
      201,
    )
  } catch (err) {
    console.error("Passport application error:", err)
    return errorResponse("Failed to submit. Please try again.", 500)
  }
}
