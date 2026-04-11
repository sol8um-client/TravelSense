import { itineraryFormSchema } from "@/lib/validators"
import { validateBody, successResponse, errorResponse } from "@/lib/api-helpers"
import { sanityClient, allPackagesQuery } from "@/lib/sanity"

interface SanityPackage {
  _id: string
  title: string
  slug: string
  description: string
  category: string
  duration: { days: number; nights: number }
  price: number
  discountedPrice?: number
  heroImage: unknown
  difficulty?: string
  featured: boolean
  destination?: { name: string; slug: string; region: string }
}

export async function POST(request: Request) {
  const result = await validateBody(request, itineraryFormSchema)
  if (!result.success) return result.response

  const { destination, duration, budget, interests, travelStyle } = result.data

  try {
    // Fetch all packages from Sanity
    let packages: SanityPackage[] = []
    try {
      packages = await sanityClient.fetch(allPackagesQuery)
    } catch {
      // Sanity not configured yet — return empty results
      return successResponse({
        message: "Itinerary builder is being set up. Check back soon!",
        recommendations: [],
      })
    }

    // Score and filter packages
    const scored = packages
      .map((pkg) => {
        let score = 0

        // Destination match
        if (
          pkg.destination?.name?.toLowerCase().includes(destination.toLowerCase()) ||
          pkg.destination?.region?.toLowerCase().includes(destination.toLowerCase())
        ) {
          score += 40
        }

        // Duration match (within 2 days)
        if (pkg.duration?.days && Math.abs(pkg.duration.days - duration) <= 2) {
          score += 20
        }

        // Budget match
        const price = pkg.discountedPrice || pkg.price
        if (price <= budget) score += 25
        else if (price <= budget * 1.2) score += 10

        // Category/interest match
        if (interests.includes(pkg.category)) score += 15

        // Travel style match
        if (travelStyle === "budget" && price < 20000) score += 10
        if (travelStyle === "luxury" && price > 80000) score += 10
        if (travelStyle === "premium" && price >= 40000 && price <= 100000) score += 10

        return { ...pkg, score }
      })
      .filter((pkg) => pkg.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    return successResponse({
      message: scored.length > 0
        ? `Found ${scored.length} matching trips for you!`
        : "No exact matches found. Try adjusting your preferences.",
      recommendations: scored,
    })
  } catch (err) {
    console.error("Itinerary generation error:", err)
    return errorResponse("Failed to generate itinerary. Please try again.", 500)
  }
}
