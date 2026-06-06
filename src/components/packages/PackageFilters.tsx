"use client"

import { useState, useMemo, useCallback, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, X, ChevronDown, Plane, MapPin } from "lucide-react"
import {
  DURATION_OPTIONS,
  DIFFICULTY_LEVELS,
  ITEMS_PER_PAGE,
} from "@/lib/constants"
import { travelCategories } from "@/config/categories"
import { PackageCard, type PackageCardData } from "./PackageCard"

interface PackageFiltersProps {
  packages: PackageCardData[]
}

type RegionScope = "all" | "domestic" | "international"

const EASE = "cubic-bezier(0.22,1,0.36,1)"

const isInternational = (region?: string) =>
  region?.toLowerCase() === "international"

/* Category board - All + the live travelCategories (Leisure / Adventure only). */
const CATS: { slug: string; label: string }[] = [
  { slug: "", label: "All trips" },
  ...travelCategories.map((c) => ({
    slug: c.slug,
    label: c.title.replace(" Travel", ""),
  })),
]

/* Sort segmented control - maps the design's 3 segments onto the real
   SORT_OPTIONS values so the existing sort logic stays untouched. */
const SORTS: { value: string; label: string }[] = [
  { value: "recommended", label: "Most loved" },
  { value: "price_asc", label: "Price ↑" },
  { value: "duration_asc", label: "Duration ↑" },
]

/* Reveal - fade/slide(+optional scale) in on scroll. Mirrors the prototype's
   IntersectionObserver Reveal via framer-motion whileInView. */
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
  style?: React.CSSProperties
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
  const [regionScope, setRegionScope] = useState<RegionScope>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("")
  const [activeDuration, setActiveDuration] = useState("")
  const [activeDifficulty, setActiveDifficulty] = useState("")
  const [sortBy, setSortBy] = useState("recommended")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  // Pre-compute region counts for the toggle pills
  const counts = useMemo(() => {
    let domestic = 0
    let international = 0
    for (const p of packages) {
      if (isInternational(p.destination?.region)) international++
      else domestic++
    }
    return { all: packages.length, domestic, international }
  }, [packages])

  const filtered = useMemo(() => {
    let result = packages

    // Region scope (Domestic / International)
    if (regionScope === "domestic") {
      result = result.filter((p) => !isInternational(p.destination?.region))
    } else if (regionScope === "international") {
      result = result.filter((p) => isInternational(p.destination?.region))
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.destination?.name && p.destination.name.toLowerCase().includes(q))
      )
    }

    // Category
    if (activeCategory) {
      result = result.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === activeCategory.toLowerCase()
      )
    }

    // Duration
    if (activeDuration) {
      const opt = DURATION_OPTIONS.find((d) => d.label === activeDuration)
      if (opt) {
        result = result.filter(
          (p) =>
            p.duration &&
            p.duration.days >= opt.min &&
            p.duration.days <= opt.max
        )
      }
    }

    // Difficulty
    if (activeDifficulty) {
      result = result.filter((p) => p.difficulty === activeDifficulty)
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return (
            (a.discountedPrice || a.price || 0) -
            (b.discountedPrice || b.price || 0)
          )
        case "price_desc":
          return (
            (b.discountedPrice || b.price || 0) -
            (a.discountedPrice || a.price || 0)
          )
        case "duration_asc":
          return (a.duration?.days || 0) - (b.duration?.days || 0)
        case "duration_desc":
          return (b.duration?.days || 0) - (a.duration?.days || 0)
        case "rating_desc":
          return (b.rating || 0) - (a.rating || 0)
        case "newest":
          return 0
        default:
          // Recommended / Most loved: featured first, then rating
          if ((b.featured ? 1 : 0) !== (a.featured ? 1 : 0)) {
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
          }
          return (b.rating || 0) - (a.rating || 0)
      }
    })

    return result
  }, [
    packages,
    regionScope,
    searchQuery,
    activeCategory,
    activeDuration,
    activeDifficulty,
    sortBy,
  ])

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const safePage = Math.min(currentPage, Math.max(1, totalPages))
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  /* "Featured packages span 2 columns" - keep it a deliberate accent (like the
     prototype's 2-of-8 rhythm) rather than flooding the grid: only the first
     couple of featured cards on the current page get the wide treatment. */
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

  const clearFilters = () => {
    setRegionScope("all")
    setSearchQuery("")
    setActiveCategory("")
    setActiveDuration("")
    setActiveDifficulty("")
    setSortBy("recommended")
    setCurrentPage(1)
  }

  const hasActiveFilters =
    regionScope !== "all" ||
    Boolean(searchQuery) ||
    Boolean(activeCategory) ||
    Boolean(activeDuration) ||
    Boolean(activeDifficulty) ||
    sortBy !== "recommended"

  /* The advanced controls (region toggle + search + duration/difficulty/sort)
     live in a collapsible panel so the primary board stays clean per design,
     but every real filter is preserved. */
  return (
    <div>
      {/* ── Sticky filter + sort board ── */}
      <div
        className="sticky top-[var(--nav-h)] z-30"
        style={{
          background: "rgba(250,248,244,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(176,184,196,0.2)",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        <div
          className="mx-auto flex flex-wrap items-center justify-between gap-4"
          style={{ maxWidth: 1180, padding: "16px 32px" }}
        >
          {/* category board */}
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            {CATS.map((c) => {
              const active = activeCategory === c.slug
              return (
                <button
                  key={c.slug || "all"}
                  onClick={() => {
                    setActiveCategory(c.slug)
                    setCurrentPage(1)
                  }}
                  className="font-body"
                  style={{
                    cursor: "pointer",
                    borderRadius: 9999,
                    padding: "9px 17px",
                    fontSize: 12.5,
                    fontWeight: 600,
                    transition: `all .25s ${EASE}`,
                    border: `1px solid ${active ? "transparent" : "rgba(176,184,196,0.35)"}`,
                    background: active
                      ? "linear-gradient(180deg, var(--secondary-light), var(--secondary-dark))"
                      : "#fff",
                    color: active ? "#fff" : "var(--muted-foreground)",
                    boxShadow: active
                      ? "0 6px 16px rgba(196,50,74,0.25)"
                      : "none",
                  }}
                >
                  {c.label}
                </button>
              )
            })}
          </div>

          {/* sort + count + advanced toggle */}
          <div className="flex items-center" style={{ gap: 14 }}>
            <div
              className="flex"
              style={{
                gap: 4,
                background: "#fff",
                borderRadius: 9999,
                padding: 4,
                border: "1px solid rgba(176,184,196,0.3)",
              }}
            >
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
                    style={{
                      cursor: "pointer",
                      borderRadius: 9999,
                      padding: "6px 12px",
                      fontSize: 11.5,
                      fontWeight: 600,
                      border: "none",
                      background: active ? "var(--primary)" : "transparent",
                      color: active ? "#fff" : "var(--silver-dark)",
                      transition: "all .2s",
                    }}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>

            <span
              className="font-tech"
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "var(--silver-dark)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {filtered.length} trips
            </span>

            <button
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center"
              style={{
                gap: 8,
                cursor: "pointer",
                borderRadius: 9999,
                padding: "8px 14px",
                fontSize: 11.5,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                border: `1px solid ${
                  showFilters || hasActiveFilters
                    ? "rgba(196,50,74,0.35)"
                    : "rgba(176,184,196,0.35)"
                }`,
                background:
                  showFilters || hasActiveFilters
                    ? "rgba(196,50,74,0.06)"
                    : "#fff",
                color:
                  showFilters || hasActiveFilters
                    ? "var(--secondary)"
                    : "var(--muted-foreground)",
                transition: `all .25s ${EASE}`,
              }}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {hasActiveFilters && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--secondary)",
                  }}
                />
              )}
            </button>
          </div>
        </div>

        {/* ── Collapsible advanced controls (real filters preserved) ── */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
            style={{ borderTop: "1px solid rgba(176,184,196,0.2)" }}
          >
            <div
              className="mx-auto"
              style={{ maxWidth: 1180, padding: "18px 32px 22px" }}
            >
              {/* region toggle + search */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                {/* region scope */}
                <div
                  role="tablist"
                  aria-label="Filter packages by region"
                  className="glass-pill inline-flex items-center self-start"
                  style={{ gap: 4, borderRadius: 9999, padding: 4 }}
                >
                  {(
                    [
                      { key: "all", label: `All (${counts.all})`, icon: null },
                      {
                        key: "domestic",
                        label: `Domestic (${counts.domestic})`,
                        icon: <MapPin className="h-3.5 w-3.5" />,
                      },
                      {
                        key: "international",
                        label: `International (${counts.international})`,
                        icon: <Plane className="h-3.5 w-3.5" />,
                      },
                    ] as const
                  ).map((r) => {
                    const active = regionScope === r.key
                    return (
                      <button
                        key={r.key}
                        role="tab"
                        aria-selected={active}
                        onClick={() => {
                          setRegionScope(r.key)
                          setCurrentPage(1)
                        }}
                        className="flex items-center font-body"
                        style={{
                          gap: 6,
                          cursor: "pointer",
                          borderRadius: 9999,
                          padding: "8px 14px",
                          fontSize: 12,
                          fontWeight: 600,
                          border: "none",
                          background: active ? "var(--secondary)" : "transparent",
                          color: active ? "#fff" : "var(--muted-foreground)",
                          boxShadow: active
                            ? "0 4px 14px rgba(196,50,74,0.3)"
                            : "none",
                          transition: `all .25s ${EASE}`,
                        }}
                      >
                        {r.icon}
                        {r.label}
                      </button>
                    )
                  })}
                </div>

                {/* search */}
                <div className="relative flex-1">
                  <Search
                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: "var(--silver-dark)" }}
                  />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="glass-field w-full font-body"
                    style={{
                      borderRadius: 12,
                      padding: "12px 40px 12px 44px",
                      fontSize: 14,
                      color: "var(--primary)",
                      outline: "none",
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1"
                      style={{ color: "var(--silver-dark)" }}
                      aria-label="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* duration / difficulty / sort selects */}
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <SelectField
                  label="Duration"
                  value={activeDuration}
                  onChange={(v) => {
                    setActiveDuration(v)
                    setCurrentPage(1)
                  }}
                  options={[
                    { value: "", label: "Any duration" },
                    ...DURATION_OPTIONS.map((o) => ({
                      value: o.label,
                      label: o.label,
                    })),
                  ]}
                />
                <SelectField
                  label="Difficulty"
                  value={activeDifficulty}
                  onChange={(v) => {
                    setActiveDifficulty(v)
                    setCurrentPage(1)
                  }}
                  options={[
                    { value: "", label: "Any difficulty" },
                    ...DIFFICULTY_LEVELS.map((l) => ({ value: l, label: l })),
                  ]}
                />
                <SelectField
                  label="Sort By"
                  value={sortBy}
                  onChange={(v) => {
                    setSortBy(v)
                    setCurrentPage(1)
                  }}
                  options={[
                    { value: "recommended", label: "Most loved" },
                    { value: "price_asc", label: "Price: Low to High" },
                    { value: "price_desc", label: "Price: High to Low" },
                    { value: "duration_asc", label: "Duration: Short to Long" },
                    { value: "duration_desc", label: "Duration: Long to Short" },
                    { value: "rating_desc", label: "Rating: High to Low" },
                  ]}
                />
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 font-body"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--secondary)",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Grid ── */}
      <section style={{ padding: "48px 32px 0" }}>
        {paginated.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center text-center"
            style={{ padding: "80px 0" }}
          >
            <div
              className="mb-4 flex items-center justify-center rounded-full"
              style={{
                width: 64,
                height: 64,
                background: "rgba(176,184,196,0.14)",
              }}
            >
              <Search className="h-7 w-7" style={{ color: "var(--silver-dark)" }} />
            </div>
            <h3
              className="font-heading"
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: "var(--primary)",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              No trips match those filters
            </h3>
            <p
              className="font-body"
              style={{
                marginTop: 8,
                maxWidth: 360,
                fontSize: 14,
                color: "var(--muted-foreground)",
              }}
            >
              Try widening your search, region or category - or clear the
              filters to see everything.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="btn btn-primary"
                style={{ marginTop: 22 }}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div
            className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{
              maxWidth: 1180,
              gridAutoRows: "minmax(0, auto)",
              gap: 22,
            }}
          >
            {paginated.map((pkg, i) => {
              const big = bigIds.has(pkg._id)
              return (
                <Reveal
                  key={pkg._id}
                  delay={(i % 3) * 0.06}
                  scale
                  style={{ height: "100%" }}
                  className={big ? "sm:col-span-2 lg:col-span-2" : undefined}
                >
                  <PackageCard pkg={pkg} big={big} index={i} />
                </Reveal>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div
          className="mx-auto mt-12 flex items-center justify-center"
          style={{ maxWidth: 1180, gap: 6, padding: "0 32px" }}
        >
          <button
            onClick={() => handlePageChange(safePage - 1)}
            disabled={safePage <= 1}
            className="font-body"
            style={pageBtnStyle(false, safePage <= 1)}
            aria-label="Previous page"
          >
            ‹
          </button>
          {getPages(safePage, totalPages).map((page, i) =>
            page === "..." ? (
              <span
                key={`e-${i}`}
                style={{ padding: "0 6px", color: "var(--silver-dark)" }}
              >
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className="font-body"
                style={pageBtnStyle(page === safePage, false)}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(safePage + 1)}
            disabled={safePage >= totalPages}
            className="font-body"
            style={pageBtnStyle(false, safePage >= totalPages)}
            aria-label="Next page"
          >
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
      <label
        className="font-tech mb-2 block"
        style={{
          fontSize: 8,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--silver-dark)",
        }}
      >
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="glass-field w-full appearance-none font-body"
          style={{
            borderRadius: 10,
            padding: "10px 32px 10px 12px",
            fontSize: 13,
            color: "var(--primary)",
            outline: "none",
          }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
          style={{ color: "var(--silver-dark)" }}
        />
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
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(total - 1, current + 1);
      i++
    ) {
      pages.push(i)
    }
    if (current < total - 2) pages.push("...")
    pages.push(total)
  }
  return pages
}
