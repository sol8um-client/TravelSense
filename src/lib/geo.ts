/**
 * geo.ts - shared geography helpers for the Domestic/International →
 * region/continent cascade used by both /packages and /destinations.
 *
 * There is no continent field in the data (region is just "International"), so
 * international destinations are bucketed into browsable continents by slug.
 */

export const CONTINENT_BY_SLUG: Record<string, string> = {
  bali: "Asia", thailand: "Asia", vietnam: "Asia", singapore: "Asia", "sri-lanka": "Asia",
  "hong-kong": "Asia", malaysia: "Asia", philippines: "Asia", bhutan: "Asia", japan: "Asia",
  kazakhstan: "Asia", uzbekistan: "Asia", azerbaijan: "Asia", "cambodia-laos": "Asia",
  "dubai-uae": "Middle East", jordan: "Middle East", oman: "Middle East", "saudi-arabia": "Middle East",
  iceland: "Europe", finland: "Europe", europe: "Europe", ireland: "Europe", russia: "Europe",
  "south-africa": "Africa", kenya: "Africa", mauritius: "Africa", seychelles: "Africa", "reunion-island": "Africa",
  australia: "Oceania", "new-zealand": "Oceania", fiji: "Oceania",
}

export const INDIA_REGION_ORDER = [
  "North India",
  "Northeast India",
  "South India",
  "West India",
]

export const CONTINENT_ORDER = ["Asia", "Middle East", "Europe", "Africa", "Oceania", "Other"]

export function isInternational(region?: string): boolean {
  return region?.toLowerCase() === "international"
}

export function continentOfSlug(slug?: string): string {
  return CONTINENT_BY_SLUG[slug ?? ""] ?? "Other"
}

/** The cascade "group" for a destination: India region (domestic) or continent. */
export function groupOfDestination(region: string, slug?: string): string {
  return isInternational(region) ? continentOfSlug(slug) : region
}
