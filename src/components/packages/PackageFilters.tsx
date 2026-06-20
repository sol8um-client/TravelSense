"use client"

import { useState, useMemo, useCallback, type ReactNode, type CSSProperties } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, ChevronDown, Plane, MapPin } from "lucide-react"
import { DURATION_OPTIONS, DIFFICULTY_LEVELS } from "@/lib/constants"
import { packageTags } from "@/data/packageTags"
import { useHideOnScrollDown } from "@/hooks/useHideOnScrollDown"
import { PackageCard, type PackageCardData } from "./PackageCard"

interface PackageFiltersProps {
  packages: PackageCardData[]
}

const EASE = "cubic-bezier(0.22,1,0.36,1)"

const isIntl = (region?: string) => region?.toLowerCase() === "international"

/* International destinations grouped into browsable "continents" (there is no
   continent field in the data - region is just "International" - so we map by
   slug). Anything unmapped falls into "Other". */
const CONTINENT_BY_SLUG: Record<string, string> = {
  bali: "Asia", thailand: "Asia", vietnam: "Asia", singapore: "Asia", "sri-lanka": "Asia",
  "hong-kong": "Asia", malaysia: "Asia", philippines: "Asia", bhutan: "Asia", japan: "Asia",
  kazakhstan: "Asia", uzbekistan: "Asia", azerbaijan: "Asia", "cambodia-laos": "Asia",
  "dubai-uae": "Middle East", jordan: "Middle East", oman: "Middle East", "saudi-arabia": "Middle East",
  iceland: "Europe", finland: "Europe", europe: "Europe", ireland: "Europe", russia: "Europe",
  "south-africa": "Africa", kenya: "Africa", mauritius: "Africa", seychelles: "Africa", "reunion-island": "Africa",
  australia: "Oceania", "new-zealand": "Oceania", fiji: "Oceania",
}
const REGION_ORDER = ["North India", "Northeast India", "South India", "West India"]
const CONTINENT_ORDER = ["Asia", "Middle East", "Europe", "Africa", "Oceania", "Other"]

/* The geographic "group" a package belongs to: its India region (domestic) or
   its continent (international) - the second level of the cascade. */
function groupOf(p: PackageCardData): string {
  const region = p.destination?.region
  if (isIntl(region)) return CONTINENT_BY_SLUG[p.destination?.slug ?? ""] ?? "Other"
  return region ?? ""
}

/* Activity / vibe tags for a package - the leaf level of the cascade. Generic
   buckets are dropped so chips only ever add a NEW way to slice (Trek, Beach,
   River Rafting, Snow & Winter, Backwaters, Islands, …). */
const EXCLUDE_TAGS = new Set(["leisure", "adventure"])
function tagsOf(slug: string): string[] {
  const t = packageTags[slug]
  if (!t) return []
  const merged = [...(t.activities ?? []), ...(t.vibes ?? [])]
  return Array.from(new Set(merged)).filter(
    (x) => /^[A-Z]/.test(x) && !EXCLUDE_TAGS.has(x.toLowerCase()),
  )
}

const SORTS: { value: string; label: string }[] = [
  { value: "recommended", label: "Most loved" },
  { value: "price_asc", label: "Price ↑" },
  { value: "duration_asc", label: "Duration ↑" },
]

function chipStyle(active: boolean): CSSProperties {
  return {
    cursor: "pointer",
    borderRadius: 9999,
    padding: "7px 14px",
    fontFamily: "var(--font-body)",
    fontSize: 12.5,
    fontWeight: 600,
    transition: `all .2s ${EASE}`,
    border: `1px solid ${active ? "transparent" : "rgba(176,184,196,0.4)"}`,
    background: active
      ? "linear-gradient(180deg, var(--secondary-light), var(--secondary-dark))"
      : "rgba(255,255,255,0.7)",
    color: active ? "#fff" : "var(--muted-foreground)",
    boxShadow: active ? "0 6px 16px rgba(196,50,74,0.25)" : "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
  }
}

/* Reveal - fade/slide(+optional scale) in on scroll. */
function Reveal({
  children,
  delay = 0,
  scale = false,
  className,
  style,
}: {
  children: ReactNode
  delay?: number
  scale?: boolean
  className?: string
  style?: CSSProperties
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 22, ...(scale ? { scale: 0.96 } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.12 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function PackageFilters({ packages }: PackageFiltersProps) {
  const [scope, setScope] = useState<"all" | "domestic" | "international">("all")
  const [group, setGroup] = useState("") // India region OR continent
  const [place, setPlace] = useState("") // destination slug
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recommended")
  const [pageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [showMore, setShowMore] = useState(false)
  const [activeDuration, setActiveDuration] = useState("")
  const [activeDifficulty, setActiveDifficulty] = useState("")
  const barHidden = useHideOnScrollDown()

  const counts = useMemo(() => {
    let domestic = 0
    let international = 0
    for (const p of packages) {
      if (isIntl(p.destination?.region)) international++
      else domestic++
    }
    return { all: packages.length, domestic, international }
  }, [packages])

  // ── Cascade selections (each level resets the ones below it) ──
  const pickScope = useCallback((s: "all" | "domestic" | "international") => {
    setScope(s)
    setGroup("")
    setPlace("")
    setActiveTags([])
    setCurrentPage(1)
  }, [])
  const pickGroup = useCallback((g: string) => {
    setGroup((prev) => (prev === g ? "" : g))
    setPlace("")
    setActiveTags([])
    setCurrentPage(1)
  }, [])
  const pickPlace = useCallback((slug: string) => {
    setPlace((prev) => (prev === slug ? "" : slug))
    setCurrentPage(1)
  }, [])
  // ── Cascade filtering ──
  const byScope = useMemo(() => {
    if (scope === "domestic") return packages.filter((p) => !isIntl(p.destination?.region))
    if (scope === "international") return packages.filter((p) => isIntl(p.destination?.region))
    return packages
  }, [packages, scope])

  const byGroup = useMemo(
    () => (group ? byScope.filter((p) => groupOf(p) === group) : byScope),
    [byScope, group],
  )

  const filtered = useMemo(() => {
    let r = byGroup
    if (place) r = r.filter((p) => p.destination?.slug === place)
    if (activeTags.length) {
      r = r.filter((p) => {
        const pt = tagsOf(p.slug)
        return activeTags.every((t) => pt.includes(t))
      })
    }
    if (activeDuration) {
      const opt = DURATION_OPTIONS.find((d) => d.label === activeDuration)
      if (opt) r = r.filter((p) => p.duration && p.duration.days >= opt.min && p.duration.days <= opt.max)
    }
    if (activeDifficulty) r = r.filter((p) => p.difficulty === activeDifficulty)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      r = r.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.destination?.name?.toLowerCase().includes(q) ?? false),
      )
    }
    return [...r].sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return (a.discountedPrice || a.price || 0) - (b.discountedPrice || b.price || 0)
        case "price_desc":
          return (b.discountedPrice || b.price || 0) - (a.discountedPrice || a.price || 0)
        case "duration_asc":
          return (a.duration?.days || 0) - (b.duration?.days || 0)
        case "duration_desc":
          return (b.duration?.days || 0) - (a.duration?.days || 0)
        case "rating_desc":
          return (b.rating || 0) - (a.rating || 0)
        default:
          if ((b.featured ? 1 : 0) !== (a.featured ? 1 : 0)) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
          return (b.rating || 0) - (a.rating || 0)
      }
    })
  }, [byGroup, place, activeTags, activeDuration, activeDifficulty, searchQuery, sortBy])

  // ── Cascade options (counts reflect the level above) ──
  const groupOptions = useMemo(() => {
    const c = new Map<string, number>()
    for (const p of byScope) {
      const g = groupOf(p)
      if (g) c.set(g, (c.get(g) ?? 0) + 1)
    }
    const order = scope === "international" ? CONTINENT_ORDER : REGION_ORDER
    const inOrder = order.filter((g) => c.has(g)).map((g) => ({ g, n: c.get(g)! }))
    const extra = [...c.keys()].filter((g) => !order.includes(g)).map((g) => ({ g, n: c.get(g)! }))
    return [...inOrder, ...extra]
  }, [byScope, scope])

  const placeOptions = useMemo(() => {
    if (!group) return []
    const m = new Map<string, { name: string; n: number }>()
    for (const p of byGroup) {
      const slug = p.destination?.slug
      const name = p.destination?.name
      if (!slug || !name) continue
      const e = m.get(slug) ?? { name, n: 0 }
      e.n++
      m.set(slug, e)
    }
    return [...m.entries()]
      .map(([slug, v]) => ({ slug, name: v.name, n: v.n }))
      .sort((a, b) => b.n - a.n || a.name.localeCompare(b.name))
  }, [byGroup, group])

  // ── Pagination ──
  const effectiveSize = pageSize === 0 ? Math.max(filtered.length, 1) : pageSize
  const totalPages = Math.ceil(filtered.length / effectiveSize)
  const safePage = Math.min(currentPage, Math.max(1, totalPages))
  const paginated = filtered.slice((safePage - 1) * effectiveSize, safePage * effectiveSize)

  const bigIds = useMemo(() => {
    const ids = new Set<string>()
    for (const p of paginated) {
      if (p.featured) {
        ids.add(p._id)
        if (ids.size >= 2) break
      }
    }
    return ids
  }, [paginated])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const hasActiveFilters =
    scope !== "all" ||
    Boolean(group) ||
    Boolean(place) ||
    activeTags.length > 0 ||
    Boolean(activeDuration) ||
    Boolean(activeDifficulty) ||
    Boolean(searchQuery) ||
    sortBy !== "recommended"

  const clearFilters = () => {
    setScope("all")
    setGroup("")
    setPlace("")
    setActiveTags([])
    setActiveDuration("")
    setActiveDifficulty("")
    setSearchQuery("")
    setSortBy("recommended")
    setCurrentPage(1)
  }

  return (
    <div>
      {/* ── Cascade filter board: Domestic/International → region/continent →
          destinations + activities. Sticky, auto-hides on scroll-down. ── */}
      <div
        className="sticky top-[66px] z-30"
        style={{
          background: "rgba(250,248,244,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(176,184,196,0.2)",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          transform: barHidden ? "translateY(-130%)" : "translateY(0)",
          transition: "transform .35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1180, padding: "10px 32px" }}>
          {/* Level 1: scope + sort + count + more */}
          <div className="flex flex-wrap items-center" style={{ gap: 10 }}>
            <div className="flex flex-wrap" style={{ gap: 8 }}>
              <button onClick={() => pickScope("all")} className="font-body" style={chipStyle(scope === "all")}>
                All trips
              </button>
              <button onClick={() => pickScope("domestic")} className="font-body" style={chipStyle(scope === "domestic")}>
                <MapPin className="h-3.5 w-3.5" /> Domestic <span style={{ opacity: 0.6, fontWeight: 500 }}>{counts.domestic}</span>
              </button>
              <button onClick={() => pickScope("international")} className="font-body" style={chipStyle(scope === "international")}>
                <Plane className="h-3.5 w-3.5" /> International <span style={{ opacity: 0.6, fontWeight: 500 }}>{counts.international}</span>
              </button>
            </div>
            <div className="flex items-center" style={{ gap: 12, marginLeft: "auto" }}>
              <div className="flex" style={{ gap: 4, background: "#fff", borderRadius: 9999, padding: 4, border: "1px solid rgba(176,184,196,0.3)" }}>
                {SORTS.map((s) => {
                  const active = sortBy === s.value
                  return (
                    <button
                      key={s.value}
                      onClick={() => {
                        setSortBy(s.value)
                        setCurrentPage(1)
                      }}
                      className="font-body"
                      style={{ cursor: "pointer", borderRadius: 9999, padding: "5px 11px", fontSize: 11.5, fontWeight: 600, border: "none", background: active ? "var(--primary)" : "transparent", color: active ? "#fff" : "var(--silver-dark)", transition: "all .2s" }}
                    >
                      {s.label}
                    </button>
                  )
                })}
              </div>
              <span className="font-tech hidden sm:inline" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--silver-dark)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                {filtered.length} trips
              </span>
              <button
                onClick={() => setShowMore((s) => !s)}
                className="flex items-center font-body"
                style={{ gap: 7, cursor: "pointer", borderRadius: 9999, padding: "7px 13px", fontSize: 11.5, fontWeight: 600, border: `1px solid ${showMore || activeDuration || activeDifficulty || searchQuery ? "rgba(196,50,74,0.35)" : "rgba(176,184,196,0.35)"}`, background: showMore || activeDuration || activeDifficulty || searchQuery ? "rgba(196,50,74,0.06)" : "#fff", color: showMore || activeDuration || activeDifficulty || searchQuery ? "var(--secondary)" : "var(--muted-foreground)" }}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" /> More
              </button>
            </div>
          </div>

          {/* Level 2: region (domestic) / continent (international) */}
          {scope !== "all" && groupOptions.length > 0 && (
            <div className="flex flex-wrap items-center" style={{ gap: 8, marginTop: 10 }}>
              <span className="font-tech" style={{ fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--silver-dark)", whiteSpace: "nowrap" }}>
                {scope === "international" ? "Continent" : "Region"}
              </span>
              {groupOptions.map(({ g, n }) => (
                <button key={g} onClick={() => pickGroup(g)} className="font-body" style={chipStyle(group === g)}>
                  {g} <span style={{ opacity: 0.6, fontWeight: 500 }}>{n}</span>
                </button>
              ))}
            </div>
          )}

          {/* Level 3: destinations + activity tags (once a region/continent is set) */}
          {group && (
            <div style={{ marginTop: 10, borderTop: "1px solid rgba(176,184,196,0.16)", paddingTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              {placeOptions.length > 0 && (
                <div className="flex flex-wrap items-center" style={{ gap: 8 }}>
                  <span className="font-tech inline-flex items-center" style={{ gap: 6, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--silver-dark)", whiteSpace: "nowrap" }}>
                    <MapPin className="h-3 w-3" /> Where
                  </span>
                  {placeOptions.map((d) => (
                    <button key={d.slug} onClick={() => pickPlace(d.slug)} className="font-body" style={chipStyle(place === d.slug)}>
                      {d.name} <span style={{ opacity: 0.6, fontWeight: 500 }}>{d.n}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* More: search + duration + difficulty + clear */}
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="overflow-hidden"
              style={{ marginTop: 10, borderTop: "1px solid rgba(176,184,196,0.2)", paddingTop: 14 }}
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
                <div className="relative" style={{ flex: 1 }}>
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--silver-dark)" }} />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="glass-field w-full font-body"
                    style={{ borderRadius: 10, padding: "10px 14px 10px 40px", fontSize: 13.5, color: "var(--primary)", outline: "none" }}
                  />
                </div>
                <SelectField
                  label="Duration"
                  value={activeDuration}
                  onChange={(v) => {
                    setActiveDuration(v)
                    setCurrentPage(1)
                  }}
                  options={[{ value: "", label: "Any duration" }, ...DURATION_OPTIONS.map((o) => ({ value: o.label, label: o.label }))]}
                />
                <SelectField
                  label="Difficulty"
                  value={activeDifficulty}
                  onChange={(v) => {
                    setActiveDifficulty(v)
                    setCurrentPage(1)
                  }}
                  options={[{ value: "", label: "Any difficulty" }, ...DIFFICULTY_LEVELS.map((l) => ({ value: l, label: l }))]}
                />
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="font-body" style={{ fontSize: 13, fontWeight: 600, color: "var(--secondary)", cursor: "pointer", background: "none", border: "none", padding: "8px 4px", whiteSpace: "nowrap" }}>
                    Clear all
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <section style={{ padding: "48px 32px 0" }}>
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center" style={{ padding: "80px 0" }}>
            <div className="mb-4 flex items-center justify-center rounded-full" style={{ width: 64, height: 64, background: "rgba(176,184,196,0.14)" }}>
              <Search className="h-7 w-7" style={{ color: "var(--silver-dark)" }} />
            </div>
            <h3 className="font-heading" style={{ fontSize: 20, fontWeight: 500, color: "var(--primary)", fontVariationSettings: "'opsz' 144" }}>
              No trips match those filters
            </h3>
            <p className="font-body" style={{ marginTop: 8, maxWidth: 360, fontSize: 14, color: "var(--muted-foreground)" }}>
              Try a different region, destination or activity - or clear the filters to see everything.
            </p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="btn btn-primary" style={{ marginTop: 22 }}>
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ maxWidth: 1180, gridAutoRows: "minmax(0, auto)", gap: 22 }}>
            {paginated.map((pkg, i) => {
              const big = bigIds.has(pkg._id)
              return (
                <Reveal key={pkg._id} delay={(i % 3) * 0.06} scale style={{ height: "100%" }} className={big ? "sm:col-span-2 lg:col-span-2" : undefined}>
                  <PackageCard pkg={pkg} big={big} index={i} />
                </Reveal>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="mx-auto mt-12 flex items-center justify-center" style={{ maxWidth: 1180, gap: 6, padding: "0 32px" }}>
          <button onClick={() => handlePageChange(safePage - 1)} disabled={safePage <= 1} className="font-body" style={pageBtnStyle(false, safePage <= 1)} aria-label="Previous page">
            ‹
          </button>
          {getPages(safePage, totalPages).map((page, i) =>
            page === "..." ? (
              <span key={`e-${i}`} style={{ padding: "0 6px", color: "var(--silver-dark)" }}>
                …
              </span>
            ) : (
              <button key={page} onClick={() => handlePageChange(page)} className="font-body" style={pageBtnStyle(page === safePage, false)}>
                {page}
              </button>
            ),
          )}
          <button onClick={() => handlePageChange(safePage + 1)} disabled={safePage >= totalPages} className="font-body" style={pageBtnStyle(false, safePage >= totalPages)} aria-label="Next page">
            ›
          </button>
        </div>
      )}
    </div>
  )
}

/* ── Light glass select field ── */
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="font-tech mb-2 block" style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--silver-dark)" }}>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="glass-field w-full appearance-none font-body"
          style={{ borderRadius: 10, padding: "10px 32px 10px 12px", fontSize: 13, color: "var(--primary)", outline: "none" }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: "var(--silver-dark)" }} />
      </div>
    </div>
  )
}

function pageBtnStyle(active: boolean, disabled: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: disabled ? "default" : "pointer",
    border: active ? "1px solid transparent" : "1px solid rgba(176,184,196,0.35)",
    background: active ? "var(--secondary)" : "#fff",
    color: active ? "#fff" : "var(--muted-foreground)",
    boxShadow: active ? "0 6px 16px rgba(196,50,74,0.25)" : "none",
    opacity: disabled ? 0.4 : 1,
    transition: `all .25s ${EASE}`,
  }
}

function getPages(current: number, total: number): (number | "...")[] {
  const pages: (number | "...")[] = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push("...")
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }
    if (current < total - 2) pages.push("...")
    pages.push(total)
  }
  return pages
}
