"use client"

import { useState, useMemo, useRef, type CSSProperties } from "react"
import Link from "next/link"
import Image from "next/image"
import { useInView } from "framer-motion"
import { ArrowRight, MapPin, Plane, Search } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useHideOnScrollDown } from "@/hooks/useHideOnScrollDown"
import {
  CONTINENT_ORDER,
  INDIA_REGION_ORDER,
  groupOfDestination,
  isInternational,
} from "@/lib/geo"
import type { DestinationCardData } from "./DestinationCard"

/* ─── Shared tokens (mirror prototype) ────────────────────────────────────── */
const EASE = "cubic-bezier(0.22,1,0.36,1)"

/** Top-level cascade scope. */
export type Scope = "all" | "domestic" | "international"

const fmt = (n: number): string => formatCurrency(n)

/* ─── Reveal - fade/slide/scale-in on scroll (mirrors home-kit Reveal) ─────── */
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

/* ─── Bento destination card - featured (big) span 2 cols + script tagline ── */
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

          {/* hover reveal - Explore <name> → */}
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

/* ─── Public grid: sticky cascade board + search + bento ──────────────────── */
interface DestinationGridProps {
  destinations: DestinationCardData[]
  /** Hide the sticky filter board/search (used for the small Coming-Soon grid). */
  showFilters?: boolean
  /** Controlled cascade scope - when provided, the grid reflects this value. */
  scope?: Scope
  onScopeChange?: (s: Scope) => void
  /** Controlled group (India region OR continent). */
  group?: string
  onGroupChange?: (g: string) => void
  /** Controlled search query - when provided, the grid reflects this value. */
  query?: string
  onQueryChange?: (query: string) => void
}

export function DestinationGrid({
  destinations,
  showFilters = true,
  scope: scopeProp,
  onScopeChange,
  group: groupProp,
  onGroupChange,
  query: queryProp,
  onQueryChange,
}: DestinationGridProps) {
  const [scopeState, setScopeState] = useState<Scope>("all")
  const [groupState, setGroupState] = useState("")
  const [qState, setQState] = useState("")

  const scope = scopeProp ?? scopeState
  const group = groupProp ?? groupState
  const q = queryProp ?? qState
  const setQ = (v: string) => (onQueryChange ? onQueryChange(v) : setQState(v))

  const [sortBy, setSortBy] = useState<"featured" | "az" | "price">("featured")
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [pageSize, setPageSize] = useState(25) // 0 = show all
  const [page, setPage] = useState(1)
  // Auto-hide the sticky board on scroll-down, reveal it on scroll-up.
  const barHidden = useHideOnScrollDown()

  // ── Cascade selections (picking a scope resets the group below it) ──
  const pickScope = (s: Scope) => {
    if (onScopeChange) onScopeChange(s)
    else setScopeState(s)
    if (onGroupChange) onGroupChange("")
    else setGroupState("")
    setActiveTags([])
    setPage(1)
  }
  const pickGroup = (g: string) => {
    const next = group === g ? "" : g
    if (onGroupChange) onGroupChange(next)
    else setGroupState(next)
    setActiveTags([])
    setPage(1)
  }

  // Domestic / International counts for the level-1 chips.
  const counts = useMemo(() => {
    let domestic = 0
    let international = 0
    for (const d of destinations) {
      if (isInternational(d.region)) international++
      else domestic++
    }
    return { all: destinations.length, domestic, international }
  }, [destinations])

  const byScope = useMemo(() => {
    if (scope === "domestic") return destinations.filter((d) => !isInternational(d.region))
    if (scope === "international") return destinations.filter((d) => isInternational(d.region))
    return destinations
  }, [destinations, scope])

  // Level 2: India regions (domestic) or continents (international).
  const groupOptions = useMemo(() => {
    if (scope === "all") return []
    const c = new Map<string, number>()
    for (const d of byScope) {
      const g = groupOfDestination(d.region, d.slug)
      if (g) c.set(g, (c.get(g) ?? 0) + 1)
    }
    const order = scope === "international" ? CONTINENT_ORDER : INDIA_REGION_ORDER
    const inOrder = order.filter((g) => c.has(g)).map((g) => ({ g, n: c.get(g)! }))
    const extra = [...c.keys()].filter((g) => !order.includes(g)).map((g) => ({ g, n: c.get(g)! }))
    return [...inOrder, ...extra]
  }, [byScope, scope])

  const byGroup = useMemo(
    () => (group ? byScope.filter((d) => groupOfDestination(d.region, d.slug) === group) : byScope),
    [byScope, group],
  )

  const baseFiltered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return byGroup
    return byGroup.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        (d.country ?? "").toLowerCase().includes(query) ||
        d.region.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query),
    )
  }, [byGroup, q])

  // Picked tags - a destination must carry ALL of them.
  const tagMatched = useMemo(() => {
    if (activeTags.length === 0) return baseFiltered
    return baseFiltered.filter((d) => {
      const dt = d.tags ?? []
      return activeTags.every((t) => dt.includes(t))
    })
  }, [baseFiltered, activeTags])

  const filtered = useMemo(() => {
    const arr = [...tagMatched]
    if (sortBy === "az") arr.sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === "price")
      arr.sort((a, b) => (a.startingPrice ?? Infinity) - (b.startingPrice ?? Infinity))
    else
      arr.sort(
        (a, b) =>
          (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
          (b.experienceCount ?? 0) - (a.experienceCount ?? 0)
      )
    return arr
  }, [tagMatched, sortBy])

  const effSize = pageSize === 0 ? Math.max(filtered.length, 1) : pageSize
  const totalPages = Math.ceil(filtered.length / effSize)
  const safePage = Math.min(page, Math.max(1, totalPages))
  const paginated = filtered.slice((safePage - 1) * effSize, safePage * effSize)

  return (
    <div>
      {/* local styles - hover lift, image-zoom, hover-reveal (no globals.css edit) */}
      <style>{`
        .dcard:hover { box-shadow: 0 24px 60px rgba(11,20,38,0.18); transform: translateY(-4px); }
        .dcard:hover .dcard-img { transform: scale(1.08); }
        .dcard .dc-rev { max-height: 0; opacity: 0; overflow: hidden; transition: max-height .4s ${EASE}, opacity .4s ${EASE}; }
        .dcard:hover .dc-rev { max-height: 44px; opacity: 1; }
        @media (max-width: 720px) {
          .dest-bento { grid-template-columns: 1fr !important; }
          .dest-bento > * { grid-column: span 1 !important; }
          .dest-filter-inner { padding: 9px 14px !important; gap: 10px !important; flex-wrap: nowrap !important; }
          .dest-filter-pills { flex: 1 1 auto; min-width: 0; flex-wrap: nowrap !important; overflow-x: auto; scrollbar-width: none; }
          .dest-filter-pills::-webkit-scrollbar { display: none; }
          .dest-filter-pills > button { flex: 0 0 auto; padding: 7px 14px !important; }
          .dest-filter-searchbox { display: none !important; }
        }
      `}</style>

      {showFilters && (
        // Sticky, but auto-hides on scroll-down and slides back in on scroll-up so
        // it's there when you reach for it but never eats space while browsing.
        <div
          id="dest-grid"
          style={{
            position: "sticky",
            top: 66,
            zIndex: 30,
            transform: barHidden ? "translateY(-130%)" : "translateY(0)",
            transition: "transform .35s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div
            className="glass-panel"
            style={{ borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" }}
          >
            <div
              className="dest-filter-inner"
              style={{
                maxWidth: 1180,
                margin: "0 auto",
                padding: "9px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                flexWrap: "nowrap",
              }}
            >
              <div className="dest-filter-pills" style={{ display: "flex", gap: 7, flexWrap: "nowrap", minWidth: 0, overflowX: "auto", scrollbarWidth: "none" }}>
                {([
                  { v: "all", l: "All", n: counts.all, icon: null },
                  { v: "domestic", l: "Domestic", n: counts.domestic, icon: "pin" },
                  { v: "international", l: "International", n: counts.international, icon: "plane" },
                ] as const).map((s) => {
                  const active = scope === s.v
                  return (
                    <button
                      key={s.v}
                      onClick={() => pickScope(s.v)}
                      style={{
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        borderRadius: 9999,
                        padding: "6px 12px",
                        fontFamily: "var(--font-body)",
                        fontSize: 11.5,
                        fontWeight: 600,
                        letterSpacing: "0.01em",
                        whiteSpace: "nowrap",
                        transition: `all .25s ${EASE}`,
                        border: `1px solid ${active ? "transparent" : "rgba(176,184,196,0.45)"}`,
                        background: active
                          ? "linear-gradient(180deg, var(--secondary-light), var(--secondary-dark))"
                          : "rgba(255,255,255,0.5)",
                        color: active ? "#fff" : "var(--muted-foreground)",
                        boxShadow: active ? "0 6px 16px rgba(196,50,74,0.25)" : "none",
                      }}
                    >
                      {s.icon === "pin" && <MapPin size={13} strokeWidth={1.8} />}
                      {s.icon === "plane" && <Plane size={13} strokeWidth={1.8} />}
                      {s.l} <span style={{ opacity: 0.6, fontWeight: 500 }}>{s.n}</span>
                    </button>
                  )
                })}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  className="glass-field dest-filter-searchbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    borderRadius: 9999,
                    padding: "6px 11px",
                    minWidth: 110,
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

                {/* sort */}
                <div style={{ display: "flex", gap: 4, background: "#fff", borderRadius: 9999, padding: 4, border: "1px solid rgba(176,184,196,0.3)" }}>
                  {([{ v: "featured", l: "Featured" }, { v: "az", l: "A–Z" }, { v: "price", l: "Price" }] as const).map((s) => {
                    const active = sortBy === s.v
                    return (
                      <button
                        key={s.v}
                        onClick={() => { setSortBy(s.v); setPage(1) }}
                        className="font-body"
                        style={{ cursor: "pointer", borderRadius: 9999, padding: "5px 10px", fontSize: 11, fontWeight: 600, border: "none", background: active ? "var(--primary)" : "transparent", color: active ? "#fff" : "var(--silver-dark)", transition: "all .2s" }}
                      >
                        {s.l}
                      </button>
                    )
                  })}
                </div>

                {/* per page - 25 / 50 / all */}
                <div className="hidden sm:flex" style={{ gap: 4, background: "#fff", borderRadius: 9999, padding: 4, border: "1px solid rgba(176,184,196,0.3)" }}>
                  {[{ v: 25, l: "25" }, { v: 50, l: "50" }, { v: 0, l: "All" }].map((p) => {
                    const active = pageSize === p.v
                    return (
                      <button
                        key={p.l}
                        onClick={() => { setPageSize(p.v); setPage(1) }}
                        title={p.v === 0 ? "Show all on one page" : `Show ${p.l} per page`}
                        className="font-body"
                        style={{ cursor: "pointer", borderRadius: 9999, padding: "5px 9px", fontSize: 11, fontWeight: 600, border: "none", background: active ? "var(--primary)" : "transparent", color: active ? "#fff" : "var(--silver-dark)", transition: "all .2s" }}
                      >
                        {p.l}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Level 2: India region (domestic) or continent (international). */}
            {scope !== "all" && groupOptions.length > 0 && (
              <div style={{ borderTop: "1px solid rgba(176,184,196,0.16)" }}>
                <div style={{ maxWidth: 1180, margin: "0 auto", padding: "7px 32px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <span className="font-tech" style={{ fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--silver-dark)", whiteSpace: "nowrap" }}>
                    {scope === "international" ? "Continent" : "Region"}
                  </span>
                  {groupOptions.map(({ g, n }) => {
                    const active = group === g
                    return (
                      <button
                        key={g}
                        onClick={() => pickGroup(g)}
                        className="font-body"
                        style={{
                          cursor: "pointer",
                          borderRadius: 9999,
                          padding: "6px 13px",
                          fontSize: 11.5,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          transition: `all .2s ${EASE}`,
                          border: `1px solid ${active ? "transparent" : "rgba(176,184,196,0.4)"}`,
                          background: active ? "var(--primary)" : "rgba(255,255,255,0.7)",
                          color: active ? "#fff" : "var(--muted-foreground)",
                          boxShadow: active ? "0 4px 12px rgba(10,20,37,0.18)" : "none",
                        }}
                      >
                        {g} <span style={{ opacity: 0.6, fontWeight: 500 }}>{n}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* bento grid - its own max-width container so the sticky bar can be full-bleed */}
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
            {paginated.map((d, i) => (
              <DestCard key={d._id} d={d} i={i} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginTop: 44 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="font-body"
              style={{ cursor: safePage <= 1 ? "default" : "pointer", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, border: "1px solid rgba(176,184,196,0.4)", background: "#fff", color: "var(--muted-foreground)", opacity: safePage <= 1 ? 0.4 : 1 }}
            >
              ‹ Prev
            </button>
            <span className="font-body" style={{ fontSize: 12.5, color: "var(--silver-dark)" }}>
              Page {safePage} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="font-body"
              style={{ cursor: safePage >= totalPages ? "default" : "pointer", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, border: "1px solid rgba(176,184,196,0.4)", background: "#fff", color: "var(--muted-foreground)", opacity: safePage >= totalPages ? 0.4 : 1 }}
            >
              Next ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
