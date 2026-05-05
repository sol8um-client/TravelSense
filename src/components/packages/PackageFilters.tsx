"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, X, ChevronDown, Plane, MapPin } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import {
  SORT_OPTIONS,
  DURATION_OPTIONS,
  DIFFICULTY_LEVELS,
  ITEMS_PER_PAGE,
} from "@/lib/constants"
import { travelCategories } from "@/config/categories"
import { PackageCard, type PackageCardData } from "./PackageCard"
import { Pagination } from "@/components/shared/Pagination"
import { EmptyState } from "@/components/shared/EmptyState"

interface PackageFiltersProps {
  packages: PackageCardData[]
}

type RegionScope = "all" | "domestic" | "international"

const isInternational = (region?: string) =>
  region?.toLowerCase() === "international"

export function PackageFilters({ packages }: PackageFiltersProps) {
  const [regionScope, setRegionScope] = useState<RegionScope>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("")
  const [activeDuration, setActiveDuration] = useState("")
  const [activeDifficulty, setActiveDifficulty] = useState("")
  const [sortBy, setSortBy] = useState("recommended")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  // Pre-compute counts for the toggle pills
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
          return (a.discountedPrice || a.price || 0) - (b.discountedPrice || b.price || 0)
        case "price_desc":
          return (b.discountedPrice || b.price || 0) - (a.discountedPrice || a.price || 0)
        case "duration_asc":
          return (a.duration?.days || 0) - (b.duration?.days || 0)
        case "duration_desc":
          return (b.duration?.days || 0) - (a.duration?.days || 0)
        case "newest":
          return 0 // Already ordered by _createdAt desc from query
        default:
          // Recommended: featured first
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      }
    })

    return result
  }, [packages, regionScope, searchQuery, activeCategory, activeDuration, activeDifficulty, sortBy])

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

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
    searchQuery ||
    activeCategory ||
    activeDuration ||
    activeDifficulty ||
    sortBy !== "recommended"

  return (
    <div>
      {/* Domestic / International toggle */}
      <div className="mb-6 flex justify-center">
        <div
          role="tablist"
          aria-label="Filter packages by region"
          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur"
        >
          <button
            role="tab"
            aria-selected={regionScope === "all"}
            onClick={() => {
              setRegionScope("all")
              setCurrentPage(1)
            }}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-all",
              regionScope === "all"
                ? "bg-[#C4324A] text-white shadow-[0_4px_14px_rgba(196,50,74,0.4)]"
                : "text-white/60 hover:text-white/80"
            )}
          >
            All
            <span className="ml-1.5 text-xs opacity-70">({counts.all})</span>
          </button>
          <button
            role="tab"
            aria-selected={regionScope === "domestic"}
            onClick={() => {
              setRegionScope("domestic")
              setCurrentPage(1)
            }}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
              regionScope === "domestic"
                ? "bg-[#C4324A] text-white shadow-[0_4px_14px_rgba(196,50,74,0.4)]"
                : "text-white/60 hover:text-white/80"
            )}
          >
            <MapPin className="h-3.5 w-3.5" />
            Domestic
            <span className="text-xs opacity-70">({counts.domestic})</span>
          </button>
          <button
            role="tab"
            aria-selected={regionScope === "international"}
            onClick={() => {
              setRegionScope("international")
              setCurrentPage(1)
            }}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
              regionScope === "international"
                ? "bg-[#C4324A] text-white shadow-[0_4px_14px_rgba(196,50,74,0.4)]"
                : "text-white/60 hover:text-white/80"
            )}
          >
            <Plane className="h-3.5 w-3.5" />
            International
            <span className="text-xs opacity-70">({counts.international})</span>
          </button>
        </div>
      </div>

      {/* Search + toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/30 backdrop-blur transition-colors focus:border-[#C4324A]/50 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white/60"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors",
            showFilters
              ? "border-[#C4324A]/30 bg-[#C4324A]/10 text-[#C4324A]"
              : "border-white/10 text-white/60 hover:border-white/20"
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-[#C4324A] px-1.5 py-0.5 text-xs text-white">
              !
            </span>
          )}
        </button>
      </div>

      {/* Category tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setActiveCategory("")
            setCurrentPage(1)
          }}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all",
            activeCategory === ""
              ? "bg-[#C4324A] text-white"
              : "border border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
          )}
        >
          All
        </button>
        {travelCategories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => {
              setActiveCategory(cat.slug === activeCategory ? "" : cat.slug)
              setCurrentPage(1)
            }}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              activeCategory === cat.slug
                ? "bg-[#C4324A] text-white"
                : "border border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
            )}
          >
            {cat.title.replace(" Travel", "")}
          </button>
        ))}
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3"
        >
          {/* Duration */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/40">
              Duration
            </label>
            <div className="relative">
              <select
                value={activeDuration}
                onChange={(e) => {
                  setActiveDuration(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 pr-8 text-sm text-white/80 focus:border-[#C4324A]/50 focus:outline-none"
              >
                <option value="" className="bg-[#0A1425]">Any duration</option>
                {DURATION_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.label} className="bg-[#0A1425]">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/40">
              Difficulty
            </label>
            <div className="relative">
              <select
                value={activeDifficulty}
                onChange={(e) => {
                  setActiveDifficulty(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 pr-8 text-sm text-white/80 focus:border-[#C4324A]/50 focus:outline-none"
              >
                <option value="" className="bg-[#0A1425]">Any difficulty</option>
                {DIFFICULTY_LEVELS.map((level) => (
                  <option key={level} value={level} className="bg-[#0A1425]">
                    {level}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/40">
              Sort By
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 pr-8 text-sm text-white/80 focus:border-[#C4324A]/50 focus:outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#0A1425]">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <div className="sm:col-span-3">
              <button
                onClick={clearFilters}
                className="text-sm text-[#C4324A] transition-colors hover:text-[#C4324A]/80"
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Results count */}
      <p className="mt-6 text-sm text-white/40">
        {filtered.length} package{filtered.length !== 1 ? "s" : ""} found
        {totalPages > 1 &&
          ` · Page ${currentPage} of ${totalPages}`}
      </p>

      {/* Grid */}
      {paginated.length === 0 ? (
        <EmptyState
          title="No packages found"
          description="Try adjusting your filters or search terms."
        />
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((pkg, index) => (
            <motion.div
              key={pkg._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}
