"use client"

import { useState, useMemo, useRef, type CSSProperties } from "react"
import Link from "next/link"
import Image from "next/image"
import { useInView } from "framer-motion"
import { ArrowRight, MapPin, Search } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { DestinationCardData } from "./DestinationCard"

/* ─── Shared tokens (mirror prototype) ────────────────────────────────────── */
const EASE = "cubic-bezier(0.22,1,0.36,1)"
const REGIONS = [
  "All",
  "North India",
  "Northeast India",
  "South India",
  "West India",
  "International",
] as const

const fmt = (n: number): string => formatCurrency(n)

/* ─── Reveal — fade/slide/scale-in on scroll (mirrors home-kit Reveal) ─────── */
interface RevealProps {
  children: React.ReactNode
  y?: number
  delay?: number
  scale?: boolean
  style?: CSSProperties
  className?: string
}

function Reveal({ children, y = 22, delay = 0, scale, style, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.12 })
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : `translateY(${y}px)${scale ? " scale(0.96)" : ""}`,
        transition: `opacity .8s ${EASE} ${delay}s, transform .8s ${EASE} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

/* ─── Bento destination card — featured (big) span 2 cols + script tagline ── */
interface DestCardProps {
  d: DestinationCardData
  i: number
}

function DestCard({ d, i }: DestCardProps) {
  const big = !!d.featured
  const href = d.comingSoon
    ? `/contact?enquiry=${encodeURIComponent(d.name)}`
    : d.directPackageSlug
      ? `/packages/${d.directPackageSlug}`
      : `/destinations/${d.slug}`

  return (
    <Reveal
      delay={(i % 3) * 0.06}
      scale
      style={{ gridColumn: big ? "span 2" : "span 1", height: "100%" }}
    >
      <Link
        href={href}
        className="dcard group"
        style={{
          position: "relative",
          display: "block",
          height: "100%",
          minHeight: big ? 360 : 300,
          borderRadius: 20,
          overflow: "hidden",
          textDecoration: "none",
          boxShadow: "0 3px 18px rgba(11,20,38,0.07)",
          border: "1px solid rgba(176,184,196,0.18)",
          transition: `box-shadow .5s ${EASE}, transform .5s ${EASE}`,
        }}
      >
        {/* image (zoom on hover) */}
        {d.heroImage ? (
          <Image
            src={d.heroImage}
            alt={d.name}
            fill
            sizes={big ? "(max-width: 900px) 100vw, 760px" : "(max-width: 900px) 100vw, 380px"}
            className="dcard-img"
            style={{
              objectFit: "cover",
              transition: `transform 1.1s ${EASE}`,
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #122040, #0A1425)",
            }}
          />
        )}

        {/* darkening gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,20,38,0.15) 0%, transparent 30%, transparent 50%, rgba(11,20,38,0.85) 100%)",
          }}
        />

        {/* top labels: coordinate micro-label + region pill */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 16,
            right: 16,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <span
            className="font-tech"
            style={{
              fontSize: 8.5,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            {d.coord}
          </span>
          <span
            className="font-tech"
            style={{
              fontSize: 8,
              letterSpacing: "0.12em",
              color: "#fff",
              background: "rgba(255,255,255,0.16)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "4px 9px",
              borderRadius: 9999,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {d.region}
          </span>
        </div>

        {/* bottom block */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: big ? 24 : 18,
          }}
        >
          {big && d.tag && (
            <p
              className="font-script"
              style={{
                margin: "0 0 6px",
                fontSize: 17,
                color: "var(--secondary-glow)",
              }}
            >
              {d.tag}
            </p>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <h3
                className="font-heading"
                style={{
                  margin: 0,
                  fontSize: big ? 30 : 21,
                  fontWeight: 500,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                {d.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 7,
                  color: "rgba(208,213,220,0.7)",
                }}
              >
                <MapPin size={12} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 12 }}>{d.country ?? d.region}</span>
                {!d.comingSoon && typeof d.experienceCount === "number" && d.experienceCount > 0 && (
                  <>
                    <span
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "rgba(208,213,220,0.5)",
                      }}
                    />
                    <span style={{ fontSize: 12 }}>
                      {d.experienceCount} {d.experienceCount === 1 ? "experience" : "experiences"}
                    </span>
                  </>
                )}
              </div>
            </div>
            {!d.comingSoon && d.startingPrice ? (
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p
                  className="font-tech"
                  style={{
                    margin: 0,
                    fontSize: 7.5,
                    letterSpacing: "0.12em",
                    color: "rgba(176,184,196,0.8)",
                    textTransform: "uppercase",
                  }}
                >
                  From
                </p>
                <p
                  className="font-heading"
                  style={{
                    margin: "2px 0 0",
                    fontSize: big ? 22 : 18,
                    fontWeight: 500,
                    color: "#fff",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {fmt(d.startingPrice)}
                </p>
              </div>
            ) : null}
          </div>

          {/* hover reveal — Explore <name> → */}
          <div className="dc-rev">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                marginTop: 12,
                fontSize: 12.5,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {d.comingSoon ? `Enquire about ${d.name}` : `Explore ${d.name}`}
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "var(--secondary)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowRight size={13} stroke="#fff" strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

/* ─── Public grid: sticky region board + search + bento ───────────────────── */
export type RegionTab = (typeof REGIONS)[number]

interface DestinationGridProps {
  destinations: DestinationCardData[]
  /** Hide the sticky region board/search (used for the small Coming-Soon grid). */
  showFilters?: boolean
  /** Controlled region — when provided, the grid reflects this value. */
  region?: RegionTab
  onRegionChange?: (region: RegionTab) => void
  /** Controlled search query — when provided, the grid reflects this value. */
  query?: string
  onQueryChange?: (query: string) => void
}

export function DestinationGrid({
  destinations,
  showFilters = true,
  region: regionProp,
  onRegionChange,
  query: queryProp,
  onQueryChange,
}: DestinationGridProps) {
  const [regionState, setRegionState] = useState<RegionTab>("All")
  const [qState, setQState] = useState("")

  const region = regionProp ?? regionState
  const q = queryProp ?? qState
  const setRegion = (r: RegionTab) => (onRegionChange ? onRegionChange(r) : setRegionState(r))
  const setQ = (v: string) => (onQueryChange ? onQueryChange(v) : setQState(v))

  // Only surface region tabs that actually have destinations in this set.
  const availableRegions = useMemo(
    () => REGIONS.filter((r) => r === "All" || destinations.some((d) => d.region === r)),
    [destinations]
  )

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return destinations.filter(
      (d) =>
        (region === "All" || d.region === region) &&
        (!query ||
          d.name.toLowerCase().includes(query) ||
          (d.country ?? "").toLowerCase().includes(query) ||
          d.region.toLowerCase().includes(query) ||
          d.description.toLowerCase().includes(query))
    )
  }, [destinations, region, q])

  return (
    <div>
      {/* local styles — hover lift, image-zoom, hover-reveal (no globals.css edit) */}
      <style>{`
        .dcard:hover { box-shadow: 0 24px 60px rgba(11,20,38,0.18); transform: translateY(-4px); }
        .dcard:hover .dcard-img { transform: scale(1.08); }
        .dcard .dc-rev { max-height: 0; opacity: 0; overflow: hidden; transition: max-height .4s ${EASE}, opacity .4s ${EASE}; }
        .dcard:hover .dc-rev { max-height: 44px; opacity: 1; }
        @media (max-width: 720px) {
          .dest-bento { grid-template-columns: 1fr !important; }
          .dest-bento > * { grid-column: span 1 !important; }
        }
      `}</style>

      {showFilters && (
        <div id="dest-grid" style={{ position: "sticky", top: "var(--nav-h)", zIndex: 30 }}>
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
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {availableRegions.map((r) => {
                  const active = region === r
                  return (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      style={{
                        cursor: "pointer",
                        borderRadius: 9999,
                        padding: "9px 17px",
                        fontFamily: "var(--font-body)",
                        fontSize: 12.5,
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        transition: `all .25s ${EASE}`,
                        border: `1px solid ${active ? "transparent" : "rgba(176,184,196,0.45)"}`,
                        background: active
                          ? "linear-gradient(180deg, var(--secondary-light), var(--secondary-dark))"
                          : "rgba(255,255,255,0.5)",
                        color: active ? "#fff" : "var(--muted-foreground)",
                        boxShadow: active ? "0 6px 16px rgba(196,50,74,0.25)" : "none",
                      }}
                    >
                      {r}
                    </button>
                  )
                })}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
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
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
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
                  {filtered.length} {filtered.length === 1 ? "place" : "places"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* bento grid — its own max-width container so the sticky bar can be full-bleed */}
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: showFilters ? "48px 32px 0" : "0",
        }}
      >
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--silver-dark)" }}>
            <MapPin size={32} stroke="var(--silver)" strokeWidth={1.5} style={{ margin: "0 auto" }} />
            <p
              className="font-heading"
              style={{ marginTop: 16, fontSize: 22, color: "var(--primary)" }}
            >
              No destinations found
            </p>
            <p style={{ marginTop: 6, fontSize: 14 }}>Try a different region or search term.</p>
          </div>
        ) : (
          <div
            className="dest-bento"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "minmax(300px, auto)",
              gap: 20,
            }}
          >
            {filtered.map((d, i) => (
              <DestCard key={d._id} d={d} i={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
