import { itineraryFormSchema } from "@/lib/validators"
import { validateBody, successResponse, errorResponse } from "@/lib/api-helpers"
import { packages } from "@/data/packages"

/**
 * Rule-based itinerary recommendation engine.
 * Scores every static package in src/data/packages.ts against the
 * traveller's destination, duration, budget, interests and travel style,
 * then returns the best matches. No external CMS or AI dependency.
 */

// Maps each interest selected in the builder to keywords we look for in a
// package's category, highlights and description.
const INTEREST_KEYWORDS: Record<string, string[]> = {
  nature: [
    "nature", "valley", "lake", "forest", "mountain", "scenic", "wildlife",
    "garden", "park", "river", "falls", "waterfall", "meadow", "hills",
    "glacier", "desert", "beach", "island",
  ],
  culture: [
    "culture", "monastery", "monasteries", "temple", "heritage", "tribal",
    "village", "traditional", "folk", "festival", "local",
  ],
  adventure: [
    "adventure", "trek", "trekking", "safari", "rafting", "camping", "camp",
    "expedition", "ride", "pass", "diving", "scuba", "paragliding", "hike",
  ],
  food: [
    "food", "cuisine", "culinary", "spice", "tasting", "thali", "biryani",
    "seafood", "wine",
  ],
  shopping: ["shopping", "bazaar", "market", "handicraft", "emporium"],
  nightlife: ["nightlife", "beach", "party", "cafe", "café", "cruise"],
  history: [
    "history", "historical", "fort", "palace", "monument", "ancient",
    "ruins", "museum", "heritage", "colonial", "dynasty",
  ],
  wellness: [
    "wellness", "spa", "ayurveda", "yoga", "hot spring", "retreat",
    "meditation", "rejuvenat",
  ],
  photography: [
    "photography", "viewpoint", "sunset", "sunrise", "scenic", "panorama",
    "panoramic", "vista",
  ],
}

interface ScoredPackage {
  title: string
  destination: string
  duration: number
  price: number
  matchScore: number
  slug: string
}

export async function POST(request: Request) {
  const result = await validateBody(request, itineraryFormSchema)
  if (!result.success) return result.response

  const { destination, duration, budget, interests, travelStyle } = result.data

  try {
    const query = destination.trim().toLowerCase()

    const allScored = packages
      .map((pkg) => {
        let score = 0
        let destinationMatched = false

        // ── Destination match (max 35) ──────────────────────────────────
        const destName = pkg.destinationName.toLowerCase()
        const destSlug = pkg.destinationSlug.toLowerCase()
        if (
          destName.includes(query) ||
          query.includes(destName) ||
          destSlug.includes(query.replace(/\s+/g, "-"))
        ) {
          score += 35
          destinationMatched = true
        } else if (
          // partial word overlap (e.g. "leh" → "Leh-Ladakh")
          query.length >= 3 &&
          (destName.split(/[\s-]+/).some((w) => w.startsWith(query)) ||
            query.split(/[\s-]+/).some((w) => w.length >= 3 && destName.includes(w)))
        ) {
          score += 25
          destinationMatched = true
        }

        // ── Duration match (max 25) ─────────────────────────────────────
        const days = pkg.duration?.days ?? 0
        const dayGap = Math.abs(days - duration)
        if (dayGap <= 2) score += 25
        else if (dayGap <= 5) score += 12

        // ── Budget match (max 25) ───────────────────────────────────────
        const price = pkg.discountedPrice || pkg.price
        if (price <= budget) score += 25
        else if (price <= budget * 1.3) score += 14

        // ── Interest match (max 15) ─────────────────────────────────────
        const haystack = [
          pkg.category,
          pkg.highlights.join(" "),
          pkg.description,
        ]
          .join(" ")
          .toLowerCase()

        let interestHits = 0
        for (const interest of interests) {
          const keywords = INTEREST_KEYWORDS[interest] || [interest]
          if (keywords.some((kw) => haystack.includes(kw))) interestHits++
        }
        if (interests.length > 0) {
          score += Math.round((interestHits / interests.length) * 15)
        }

        // ── Travel style match (max 10) ─────────────────────────────────
        if (travelStyle === "budget" && price < 25000) score += 10
        else if (travelStyle === "standard" && price >= 15000 && price <= 50000)
          score += 10
        else if (travelStyle === "premium" && price >= 40000 && price <= 95000)
          score += 10
        else if (travelStyle === "luxury" && price > 80000) score += 10

        return {
          title: pkg.title,
          destination: pkg.destinationName,
          duration: days,
          price,
          matchScore: Math.min(100, score),
          slug: pkg.slug,
          destinationMatched,
        }
      })

    // Destination is the PRIMARY filter. If the traveller named a place we have
    // packages for, show ONLY those - ranked by the rest of the fit (duration,
    // budget, interests, style). We fall back to budget/interest suggestions
    // ONLY when nothing matches the destination, so the user is never left empty.
    const destMatches = allScored.filter((p) => p.destinationMatched)
    const scored = (
      destMatches.length > 0 ? destMatches : allScored.filter((p) => p.matchScore >= 25)
    )
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6)

    const anyDestinationMatch = destMatches.length > 0

    const recommendations: ScoredPackage[] = scored.map(
      ({ destinationMatched: _omit, ...rest }) => rest
    )

    let message: string
    if (recommendations.length === 0) {
      message =
        "We could not find a ready package matching your criteria. Book a free consultation and we will craft a custom itinerary for you."
    } else if (anyDestinationMatch) {
      message = `Found ${recommendations.length} trip${
        recommendations.length > 1 ? "s" : ""
      } matching your preferences.`
    } else {
      message = `No exact package for "${destination}" yet - here ${
        recommendations.length > 1 ? "are" : "is"
      } ${recommendations.length} trip${
        recommendations.length > 1 ? "s" : ""
      } that fit your budget and interests. Contact us for a custom "${destination}" plan.`
    }

    return successResponse({ message, recommendations })
  } catch (err) {
    console.error("Itinerary generation error:", err)
    return errorResponse("Failed to generate itinerary. Please try again.", 500)
  }
}
