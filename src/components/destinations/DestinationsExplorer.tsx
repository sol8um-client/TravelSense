"use client"

import { useMemo, useState } from "react"
import { Compass, Search } from "lucide-react"
import { DestinationsHero } from "./DestinationsHero"
import { DestinationGrid, type RegionTab } from "./DestinationGrid"
import type { DestinationCardData } from "./DestinationCard"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"

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

  // Mirror DestinationGrid's filter predicate so we can detect when an active
  // search yields nothing - then swap the grid for a "talk to an expert" capture
  // block instead of leaving the visitor at a dead end.
  const q = query.trim()
  const filteredCount = useMemo(() => {
    const ql = q.toLowerCase()
    return destinations.filter(
      (d) =>
        (region === "All" || d.region === region) &&
        (!ql ||
          d.name.toLowerCase().includes(ql) ||
          (d.country ?? "").toLowerCase().includes(ql) ||
          d.region.toLowerCase().includes(ql) ||
          d.description.toLowerCase().includes(ql))
    ).length
  }, [destinations, region, q])

  const noMatches = q.length > 0 && filteredCount === 0

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

        {noMatches ? (
          /* Empty state - a search is active but no destination matches. Keep a
             search field (bound to the same query state) so the visitor can edit
             or clear their term, then a centered capture block + WhatsApp CTA. */
          <div>
            <div style={{ position: "sticky", top: 66, zIndex: 30 }}>
              <div
                className="glass-panel"
                style={{ borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" }}
              >
                <div
                  style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    padding: "14px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 14,
                  }}
                >
                  <div
                    className="glass-field"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      borderRadius: 9999,
                      padding: "8px 14px",
                      minWidth: 210,
                    }}
                  >
                    <Search size={15} stroke="var(--silver-dark)" strokeWidth={1.5} />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search places…"
                      aria-label="Search destinations"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        fontFamily: "var(--font-body)",
                        fontSize: 13.5,
                        color: "var(--foreground)",
                        minWidth: 0,
                      }}
                    />
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
                    0 places
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                maxWidth: 620,
                margin: "0 auto",
                padding: "90px 32px 0",
                textAlign: "center",
              }}
            >
              <span className="eyebrow" style={{ justifyContent: "center" }}>
                <span className="dot" /> Off the map
              </span>
              <div
                style={{
                  margin: "22px auto 0",
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(196,50,74,0.08)",
                  border: "1px solid rgba(196,50,74,0.22)",
                }}
              >
                <Compass size={28} stroke="var(--secondary)" strokeWidth={1.5} />
              </div>
              <h2
                className="font-heading"
                style={{
                  margin: "20px 0 0",
                  fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: "var(--primary)",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                We don&rsquo;t cover{" "}
                <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>
                  &ldquo;{q}&rdquo;
                </em>{" "}
                just yet.
              </h2>
              <p
                className="font-script"
                style={{
                  margin: "12px auto 0",
                  maxWidth: 440,
                  fontSize: 20,
                  lineHeight: 1.4,
                  color: "var(--muted-foreground)",
                }}
              >
                Tell us where you want to go and a real expert will craft it.
              </p>
              <div style={{ marginTop: 26, display: "flex", justifyContent: "center" }}>
                <WhatsAppLink
                  source="destinations-search-no-result"
                  message={`Hi TravelSense! I was looking for "${q}" but didn't find it - can you help me plan it?`}
                  className="btn btn-primary"
                >
                  Talk to an expert
                </WhatsAppLink>
              </div>
            </div>
          </div>
        ) : (
          <DestinationGrid
            destinations={destinations}
            region={region}
            onRegionChange={setRegion}
            query={query}
            onQueryChange={setQuery}
          />
        )}
      </section>
    </>
  )
}
