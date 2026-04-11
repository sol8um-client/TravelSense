import { vehicleRequestSchema } from "@/lib/validators"
import { validateBody, successResponse, errorResponse } from "@/lib/api-helpers"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  const result = await validateBody(request, vehicleRequestSchema)
  if (!result.success) return result.response

  const data = result.data

  try {
    if (supabase) {
      const { error } = await supabase.from("vehicle_requests").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          destination: data.destination,
          travel_dates: data.travelDates,
          vehicle_type: data.vehicleType,
          group_size: data.groupSize,
          message: data.message || null,
          status: "new",
        },
      ])
      if (error) throw error
    } else {
      console.log("Vehicle request (DB not configured):", data)
    }

    return successResponse({ message: "Vehicle request received! We'll get back to you within 24 hours." }, 201)
  } catch (err) {
    console.error("Vehicle request error:", err)
    return errorResponse("Failed to submit. Please try again.", 500)
  }
}
