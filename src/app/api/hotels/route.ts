import { successResponse } from "@/lib/api-helpers"

export async function GET() {
  return successResponse({
    message: "Hotel search is coming soon! We're partnering with top providers to bring you the best rates.",
    available: false,
    hotels: [],
  })
}
