"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { DestinationCard, type DestinationCardData } from "./DestinationCard"
import { DestinationFilters } from "./DestinationFilters"
import { EmptyState } from "@/components/shared/EmptyState"
import { MapPin } from "lucide-react"

interface DestinationGridProps {
  destinations: DestinationCardData[]
}

export function DestinationGrid({ destinations }: DestinationGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeRegion, setActiveRegion] = useState("")

  const filtered = useMemo(() => {
    let result = destinations

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q) ||
          (d.country && d.country.toLowerCase().includes(q))
      )
    }

    if (activeRegion) {
      result = result.filter((d) => d.region === activeRegion)
    }

    return result
  }, [destinations, searchQuery, activeRegion])

  return (
    <div>
      <DestinationFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeRegion={activeRegion}
        onRegionChange={setActiveRegion}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No destinations found"
          description="Try adjusting your search or selecting a different region."
          icon={<MapPin className="h-8 w-8 text-white/30" />}
        />
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((destination, index) => (
            <motion.div
              key={destination._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <DestinationCard destination={destination} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
