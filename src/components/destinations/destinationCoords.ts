/**
 * Coordinate micro-labels for every live destination, keyed by slug.
 *
 * The prototype renders a `coord` label on every card (e.g. "34.08°N · 74.80°E").
 * `src/data/destinations.ts` has no coordinate field, so these are real
 * lat/long for each destination's principal city/region, formatted to match the
 * design handoff exactly. Used purely as a display micro-label.
 */
export const DESTINATION_COORDS: Record<string, string> = {
  // ── North India ──
  kashmir: "34.08°N · 74.80°E",
  "leh-ladakh": "34.15°N · 77.57°E",
  "himachal-pradesh": "31.10°N · 77.17°E",
  rajasthan: "27.02°N · 74.22°E",
  "varanasi-uttar-pradesh": "25.32°N · 83.01°E",
  "golden-triangle": "26.92°N · 75.79°E",
  uttarakhand: "30.07°N · 79.02°E",
  bihar: "25.10°N · 85.31°E",
  // ── Northeast India ──
  meghalaya: "25.57°N · 91.89°E",
  "sikkim-darjeeling": "27.33°N · 88.61°E",
  "arunachal-pradesh": "28.22°N · 94.73°E",
  assam: "26.20°N · 92.94°E",
  "west-bengal": "22.57°N · 88.36°E",
  odisha: "20.30°N · 85.82°E",
  // ── South India ──
  kerala: "9.93°N · 76.26°E",
  karnataka: "12.97°N · 77.59°E",
  "andaman-islands": "11.62°N · 92.73°E",
  telangana: "17.39°N · 78.49°E",
  "tamil-nadu": "11.13°N · 78.66°E",
  lakshadweep: "10.57°N · 72.64°E",
  // ── West India ──
  goa: "15.30°N · 74.08°E",
  gujarat: "22.26°N · 71.19°E",
  maharashtra: "19.08°N · 72.88°E",
  "madhya-pradesh": "23.47°N · 77.95°E",
  chhattisgarh: "21.28°N · 81.87°E",
  // ── International ──
  bali: "8.34°S · 115.09°E",
  thailand: "13.76°N · 100.50°E",
  "dubai-uae": "25.20°N · 55.27°E",
  vietnam: "21.03°N · 105.85°E",
  singapore: "1.35°N · 103.82°E",
  "sri-lanka": "6.93°N · 79.85°E",
  "hong-kong": "22.32°N · 114.17°E",
  azerbaijan: "40.41°N · 49.87°E",
  malaysia: "3.14°N · 101.69°E",
  philippines: "14.60°N · 120.98°E",
  bhutan: "27.47°N · 89.64°E",
  "south-africa": "33.92°S · 18.42°E",
  kenya: "1.29°S · 36.82°E",
  japan: "35.68°N · 139.69°E",
  jordan: "31.96°N · 35.95°E",
  iceland: "64.15°N · 21.94°W",
  kazakhstan: "43.24°N · 76.89°E",
  uzbekistan: "41.31°N · 69.24°E",
  finland: "60.17°N · 24.94°E",
  europe: "48.86°N · 2.35°E",
  australia: "33.87°S · 151.21°E",
  "new-zealand": "41.29°S · 174.78°E",
}

/** Safe accessor - falls back to a neutral label if a slug is missing. */
export function coordFor(slug: string): string {
  return DESTINATION_COORDS[slug] ?? "-°N · -°E"
}
