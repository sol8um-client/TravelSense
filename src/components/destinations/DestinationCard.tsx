/**
 * Data contract for a destination card in the bento grid.
 *
 * The visual card itself is rendered inside `DestinationGrid` (it needs the
 * prototype's exact inline-styled markup + hover devices), so this module only
 * exports the shared type consumed by the server page and the client grid.
 */
export interface DestinationCardData {
  _id: string
  name: string
  slug: string
  description: string
  heroImage?: string
  region: string
  country?: string
  startingPrice?: number
  highlights?: string[]
  featured?: boolean
  comingSoon?: boolean
  /** Coordinate micro-label, e.g. "34.08°N · 74.80°E". */
  coord?: string
  /** Script-font tagline shown on featured (big) cards. */
  tag?: string
  /** Number of live packages ("N experiences") for this destination. */
  experienceCount?: number
  /** If the destination has exactly one package, deep-link straight to it. */
  directPackageSlug?: string
}
