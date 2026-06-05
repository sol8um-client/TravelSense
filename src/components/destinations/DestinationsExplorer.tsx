"use client"

import { useMemo, useState } from "react"
import { DestinationsHero } from "./DestinationsHero"
import { DestinationGrid, type RegionTab } from "./DestinationGrid"
import type { DestinationCardData } from "./DestinationCard"

interface DestinationsExplorerProps {
  destinations: DestinationCardData[]
}

/**
 * Owns the shared region + search state so the globe-backed hero's search input
 * and region-jump pills drive the same sticky region board + bento grid below.
 */
export function DestinationsExplorer({ destinations }: DestinationsExplorerProps) {
  const [region, setRegion] = useState<RegionTab>("All")
  const [query, setQuery] = useState("")

  // Featured destinations power the hero Spotlight carousel. Cap the filmstrip
  // to keep the thumbnail strip readable (all featured still span 2 cols below).
  const featured = useMemo(
    () => destinations.filter((d) => d.featured).slice(0, 5),
    [destinations]
  )

  return (
    <>
      <DestinationsHero
        featured={featured}
        totalCount={destinations.length}
        query={query}
        onQueryChange={setQuery}
        onRegionJump={setRegion}
      />

      <section className="bg-brand-mesh" style={{ paddingBottom: 90 }}>
        {/*
          Pack the bento grid so featured (2-col) cards never leave a blank
          cell beside them: `grid-auto-flow: dense` lets the smaller 1-col cards
          backfill the holes a wide card would otherwise leave, while keeping the
          "featured cards are bigger" look and every card at its natural height.
        */}
        <style>{`
          .dest-bento { grid-auto-flow: dense; }
        `}</style>
        <DestinationGrid
          destinations={destinations}
          region={region}
          onRegionChange={setRegion}
          query={query}
          onQueryChange={setQuery}
        />
      </section>
    </>
  )
}
