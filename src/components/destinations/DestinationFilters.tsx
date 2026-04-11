"use client"

import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

const REGION_TABS = [
  "All",
  "North India",
  "South India",
  "East India",
  "West India",
  "Central India",
  "Northeast India",
  "Islands",
  "International",
] as const

interface DestinationFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  activeRegion: string
  onRegionChange: (region: string) => void
  resultCount: number
}

export function DestinationFilters({
  searchQuery,
  onSearchChange,
  activeRegion,
  onRegionChange,
  resultCount,
}: DestinationFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search input */}
      <div className="relative mx-auto max-w-lg">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/30 backdrop-blur transition-colors focus:border-[#C4324A]/50 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Region tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {REGION_TABS.map((region) => (
          <button
            key={region}
            onClick={() => onRegionChange(region === "All" ? "" : region)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              (region === "All" && activeRegion === "") ||
                region === activeRegion
                ? "bg-[#C4324A] text-white"
                : "border border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
            )}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-center text-sm text-white/40">
        {resultCount} destination{resultCount !== 1 ? "s" : ""} found
      </p>
    </div>
  )
}
