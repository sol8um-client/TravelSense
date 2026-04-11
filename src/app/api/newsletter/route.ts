import { newsletterSchema } from "@/lib/validators"
import { validateBody, successResponse, errorResponse } from "@/lib/api-helpers"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  const result = await validateBody(request, newsletterSchema)
  if (!result.success) return result.response

  const { email } = result.data

  try {
    if (supabase) {
      const { error } = await supabase.from("newsletter_subscribers").upsert(
        [{ email, subscribed: true }],
        { onConflict: "email" }
      )
      if (error) throw error
    } else {
      console.log("Newsletter signup (DB not configured):", email)
    }

    return successResponse({ message: "You're subscribed! Welcome to TravelSense." }, 201)
  } catch (err) {
    console.error("Newsletter error:", err)
    return errorResponse("Failed to subscribe. Please try again.", 500)
  }
}
