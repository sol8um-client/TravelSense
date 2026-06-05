"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Check,
  X as XIcon,
  MapPin,
  Mountain,
  ArrowRight,
  Star,
  Sparkles,
  Info,
  CalendarClock,
  FileText,
  Download,
  Phone,
  Compass,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"

/* ─── Types ───────────────────────────────────────────────────────────────── */

interface ItineraryDay {
  day: number
  title: string
  description: string
  activities?: string[]
  meals?: string
  accommodation?: string
  elevation?: string
  distance?: string
  highlight?: string
  image?: string
}

export interface PackageDetailData {
  _id: string
  title: string
  slug: string
  description: string
  category?: string
  duration?: { days: number; nights: number }
  price?: number
  discountedPrice?: number
  heroImage?: string
  images?: string[]
  inclusions?: string[]
  exclusions?: string[]
  itinerary?: ItineraryDay[]
  difficulty?: string
  groupSize?: { min?: number; max?: number }
  highlights?: string[]
  featured?: boolean
  rating?: number
  reviewCount?: number
  vehiclePricing?: {
    categories: string[]
    rows: { vehicle: string; prices: number[] }[]
    note?: string
  }
  transparencyNote?: string
  experienceStory?: string
  seasonalAdvisories?: string[]
  destination?: {
    _id: string
    name: string
    slug: string
    region?: string
    country?: string
    heroImage?: string
  }
}

interface PackageDetailProps {
  pkg: PackageDetailData
}

/* ─── Palette constants (from the prototype) ─────────────────────────────── */

const CHERRY = "#C4324A"
const GOLD = "#B8862F"
const TEAL = "#1F8A7A"
const SALMON = "#FFB3A3"
const EASE = "cubic-bezier(0.22,1,0.36,1)"

const fmt = (n: number) => "₹" + Number(n).toLocaleString("en-IN")

/* ─── Data-derivation helpers ─────────────────────────────────────────────── */

/** Parse a metre value out of strings like "3,500m", "5,359m at Khardung La",
 *  "2,676m in Kargil". Returns null when no plausible altitude is present. */
function parseElevation(raw?: string): number | null {
  if (!raw) return null
  const m = raw.replace(/,/g, "").match(/(\d{3,5})\s*m/i)
  if (!m) return null
  const v = Number(m[1])
  return Number.isFinite(v) ? v : null
}

/** Parse a kilometre value out of distance strings like "205 km drive". */
function parseDistanceKm(raw?: string): number | null {
  if (!raw) return null
  const m = raw.replace(/,/g, "").match(/(\d{1,5})\s*km/i)
  if (!m) return null
  const v = Number(m[1])
  return Number.isFinite(v) ? v : null
}

export interface AltDay {
  day: number
  title: string
  elev: number
  peak?: boolean
  peakLabel?: string
}

/** Short label for a route stop, derived from a day title. */
function shortLabel(title: string): string {
  const cut = title.split(/\s+[—·–-]\s+| with | via | to | & /i)[0].trim()
  const cleaned = cut
    .replace(
      /^(Arrive in|Arrival in|Arrive|Depart from|Departure from|Depart|Drive to|Fly to|Transfer to|Explore|Discover)\s+/i,
      ""
    )
    .trim()
  const out = cleaned || cut
  return out.length > 16 ? `${out.slice(0, 15)}…` : out
}

/** Build the altitude series. Marks the two highest distinct peaks. */
function buildAltDays(itinerary: ItineraryDay[]): AltDay[] {
  const series = itinerary
    .map((d) => {
      const elev = parseElevation(d.elevation)
      return elev == null ? null : { day: d.day, title: shortLabel(d.title), elev }
    })
    .filter((x): x is { day: number; title: string; elev: number } => x !== null)

  if (series.length < 2) return []

  // Identify up to two local "peak" days (highest altitudes) for callouts.
  const sorted = [...series].sort((a, b) => b.elev - a.elev)
  const peakDays = new Set<number>()
  for (const s of sorted) {
    if (peakDays.size >= 2) break
    // only flag genuinely high points (avoid flagging a flat profile)
    if (s.elev >= 3500) peakDays.add(s.day)
  }

  return series.map((s) => {
    if (peakDays.has(s.day)) {
      // peak label = upper-cased landmark words from the title
      return {
        ...s,
        peak: true,
        peakLabel: s.title.replace(/…$/, "").toUpperCase().slice(0, 14),
      }
    }
    return s
  })
}

export interface RouteStop {
  name: string
  x: number
  y: number
  alt?: string
  days: number[]
}

/**
 * Build a stylised set of route pins from the itinerary. We don't have real
 * lat/long, so we lay distinct places along a serpentine path inside the
 * 1000×580 viewBox (matching the prototype's hand-placed circuit feel).
 * Consecutive days that share the same place are merged into one pin.
 */
function buildStops(itinerary: ItineraryDay[]): RouteStop[] {
  // Collapse the itinerary into unique consecutive "places".
  const groups: { name: string; alt?: string; days: number[] }[] = []
  for (const d of itinerary) {
    const name = shortLabel(d.title)
    const altNum = parseElevation(d.elevation)
    const alt = altNum ? `${altNum.toLocaleString()}m` : undefined
    const last = groups[groups.length - 1]
    if (last && last.name.toLowerCase() === name.toLowerCase()) {
      last.days.push(d.day)
      if (!last.alt && alt) last.alt = alt
    } else {
      groups.push({ name, alt, days: [d.day] })
    }
  }

  // Cap at a sensible number of pins so the map stays legible.
  const MAX = 6
  let pins = groups
  if (groups.length > MAX) {
    // keep first, last, and evenly-spaced middles
    const idxs = new Set<number>([0, groups.length - 1])
    const step = (groups.length - 1) / (MAX - 1)
    for (let i = 1; i < MAX - 1; i++) idxs.add(Math.round(i * step))
    pins = [...idxs].sort((a, b) => a - b).map((i) => groups[i])
  }

  // Serpentine layout inside the viewBox.
  const W = 1000
  const padX = 130
  const usableW = W - padX * 2
  const ys = [370, 250, 150, 250, 370, 250]
  const n = pins.length
  return pins.map((p, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1)
    const x = Math.round(padX + t * usableW)
    const y = ys[i % ys.length]
    return { name: p.name, x, y, alt: p.alt, days: p.days }
  })
}

/* ═══════════ ALTITUDE PROFILE — animated SVG climb chart ═══════════ */

function AltitudeProfile({ days }: { days: AltDay[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  const [hover, setHover] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const W = 1000,
    H = 340,
    padL = 36,
    padR = 36,
    top = 38,
    bot = 290
  // dynamic altitude band with padding around the real min/max
  const elevs = days.map((d) => d.elev)
  const rawMin = Math.min(...elevs)
  const rawMax = Math.max(...elevs)
  const span = Math.max(400, rawMax - rawMin)
  const minE = Math.max(0, Math.floor((rawMin - span * 0.25) / 100) * 100)
  const maxE = Math.ceil((rawMax + span * 0.18) / 100) * 100
  const xs = (i: number) => padL + i * ((W - padL - padR) / (days.length - 1))
  const ys = (e: number) => bot - ((e - minE) / (maxE - minE)) * (bot - top)
  const pts = days.map((d, i) => ({ ...d, x: xs(i), y: ys(d.elev), i }))
  const line = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ")
  const area = `${line} L${pts[pts.length - 1].x} ${bot} L${pts[0].x} ${bot} Z`

  // 3 evenly-spaced gridlines inside the band, rounded to 1000m
  const grid: number[] = []
  for (let g = Math.ceil(minE / 1000) * 1000; g < maxE; g += 1000) grid.push(g)
  const gridShown = grid.length > 4 ? grid.filter((_, i) => i % 2 === 0) : grid

  const peaks = pts.filter((p) => p.peak)

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="altFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHERRY} stopOpacity="0.28" />
            <stop offset="55%" stopColor={GOLD} stopOpacity="0.10" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="altStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={CHERRY} />
            <stop offset="55%" stopColor="#A8574E" />
            <stop offset="100%" stopColor={GOLD} />
          </linearGradient>
        </defs>

        {/* grid lines + altitude labels */}
        {gridShown.map((g) => (
          <g key={g}>
            <line
              x1={padL}
              y1={ys(g)}
              x2={W - padR}
              y2={ys(g)}
              stroke="rgba(11,20,38,0.08)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <text
              x={W - padR + 4}
              y={ys(g) + 3}
              fontSize="10"
              fontFamily="var(--font-mono-tech), Michroma, sans-serif"
              fill="#8A929E"
              letterSpacing="0.05em"
            >
              {(g / 1000).toFixed(1)}km
            </text>
          </g>
        ))}

        {/* area + line (clipped reveal) */}
        <clipPath id="altReveal">
          <rect
            x="0"
            y="0"
            width={seen ? W : 0}
            height={H}
            style={{ transition: "width 1.6s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </clipPath>
        <g clipPath="url(#altReveal)">
          <path d={area} fill="url(#altFill)" />
          <path
            d={line}
            fill="none"
            stroke="url(#altStroke)"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>

        {/* peak callouts */}
        {peaks.map((p) => (
          <g key={p.i} opacity={seen ? 1 : 0} style={{ transition: "opacity .5s ease 1.2s" }}>
            <line
              x1={p.x}
              y1={p.y}
              x2={p.x}
              y2={top - 10}
              stroke="rgba(196,50,74,0.3)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <text
              x={p.x}
              y={top - 16}
              textAnchor="middle"
              fontSize="11"
              fontFamily="var(--font-heading), Fraunces, serif"
              fontWeight="600"
              fill={CHERRY}
            >
              {p.elev.toLocaleString()}m
            </text>
            <text
              x={p.x}
              y={top - 4}
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="var(--font-mono-tech), Michroma, sans-serif"
              fill="#8A929E"
              letterSpacing="0.1em"
            >
              {p.peakLabel}
            </text>
          </g>
        ))}

        {/* day dots */}
        {pts.map((p) => (
          <g
            key={p.i}
            onMouseEnter={() => setHover(p.i)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: "pointer" }}
          >
            <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
            <circle
              cx={p.x}
              cy={p.y}
              r={hover === p.i ? 7 : 5}
              fill="#fff"
              stroke={p.peak ? CHERRY : GOLD}
              strokeWidth="2.5"
              opacity={seen ? 1 : 0}
              style={{ transition: `opacity .4s ease ${0.6 + p.i * 0.08}s, r .2s ease` }}
            />
            <text
              x={p.x}
              y={bot + 20}
              textAnchor="middle"
              fontSize="10"
              fontFamily="var(--font-mono-tech), Michroma, sans-serif"
              fill="#8A929E"
              opacity={seen ? 1 : 0}
              style={{ transition: `opacity .4s ease ${0.6 + p.i * 0.08}s` }}
            >
              D{p.day}
            </text>
          </g>
        ))}
      </svg>

      {/* hover tooltip */}
      {hover != null && (
        <div
          style={{
            position: "absolute",
            left: `${(pts[hover].x / W) * 100}%`,
            top: `${(pts[hover].y / H) * 100}%`,
            transform: "translate(-50%, -130%)",
            background: "#0A1425",
            color: "#fff",
            borderRadius: 10,
            padding: "8px 12px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(11,20,38,0.3)",
            zIndex: 5,
          }}
        >
          <div style={{ fontFamily: "var(--font-heading), Fraunces, serif", fontSize: 13, fontWeight: 500 }}>
            Day {pts[hover].day} · {pts[hover].elev.toLocaleString()}m
          </div>
          <div style={{ fontSize: 11, color: "rgba(208,213,220,0.7)", marginTop: 2 }}>
            {pts[hover].title}
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════ ROUTE MAP — stylized circuit with animated arcs ═══════════ */

function RouteMap({
  stops,
  activeDay,
  onPick,
}: {
  stops: RouteStop[]
  activeDay: number
  onPick?: (day: number) => void
}) {
  const arc = (a: RouteStop, b: RouteStop, lift: number) => {
    const mx = (a.x + b.x) / 2,
      my = (a.y + b.y) / 2 - lift
    return `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`
  }
  return (
    <svg viewBox="0 0 1000 580" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <radialGradient id="rmGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#14223E" />
          <stop offset="100%" stopColor="#070D18" />
        </radialGradient>
        <linearGradient id="rmArc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={CHERRY} stopOpacity="0" />
          <stop offset="50%" stopColor={SALMON} stopOpacity="0.9" />
          <stop offset="100%" stopColor={CHERRY} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1000" height="580" fill="url(#rmGlow)" />
      {/* contour terrain lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M-20 ${120 + i * 90} C 250 ${60 + i * 90} 520 ${200 + i * 90} 1020 ${100 + i * 90}`}
          fill="none"
          stroke="rgba(176,184,196,0.05)"
          strokeWidth="1"
        />
      ))}
      <g opacity="0.5">
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="520"
            cy="300"
            r={120 + i * 90}
            fill="none"
            stroke="rgba(176,184,196,0.04)"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* arcs */}
      {stops.slice(0, -1).map((s, i) => {
        const a = s,
          b = stops[i + 1]
        const lift = 60 + (i % 2) * 30
        const d = arc(a, b, lift)
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="rgba(255,179,163,0.18)" strokeWidth="1.5" strokeDasharray="2 5" />
            <path
              d={d}
              fill="none"
              stroke="url(#rmArc)"
              strokeWidth="2"
              strokeDasharray="3 6"
              style={{ animation: `flightDash ${5 + i * 0.6}s linear infinite` }}
            />
            <circle r="3" fill={SALMON}>
              <animateMotion dur={`${5.5 + i * 0.7}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        )
      })}

      {/* pins */}
      {stops.map((s, i) => {
        const active = s.days.includes(activeDay)
        return (
          <g
            key={i}
            onClick={() => onPick && onPick(s.days[0])}
            style={{ cursor: onPick ? "pointer" : "default" }}
          >
            {active && (
              <circle cx={s.x} cy={s.y} r="20" fill="none" stroke={CHERRY} strokeWidth="1.5" opacity="0.5">
                <animate attributeName="r" values="14;26;14" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={s.x}
              cy={s.y}
              r="11"
              fill={active ? CHERRY : "#152240"}
              stroke={active ? "#fff" : "rgba(255,179,163,0.5)"}
              strokeWidth="2"
            />
            <text
              x={s.x}
              y={s.y + 4}
              textAnchor="middle"
              fontSize="11"
              fontFamily="var(--font-mono-tech), Michroma, sans-serif"
              fontWeight="600"
              fill="#fff"
            >
              {i + 1}
            </text>
            <text
              x={s.x}
              y={s.y - 20}
              textAnchor="middle"
              fontSize="14"
              fontFamily="var(--font-heading), Fraunces, serif"
              fontWeight="500"
              fill="#fff"
            >
              {s.name}
            </text>
            <text
              x={s.x}
              y={s.y - 6}
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="var(--font-mono-tech), Michroma, sans-serif"
              fill="rgba(208,213,220,0.55)"
              letterSpacing="0.08em"
              style={{ display: s.alt ? "" : "none" }}
            >
              {s.alt}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ═══════════ Reveal — fade/slide in on scroll (kit primitive) ═══════════ */

function Reveal({
  children,
  y = 22,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode
  y?: number
  delay?: number
  style?: React.CSSProperties
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : `translateY(${y}px)`,
        transition: `opacity .8s ${EASE} ${delay}s, transform .8s ${EASE} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

/* ── eyebrow (prototype inline) ── */
function Eyebrow({ text, color = "var(--secondary)" }: { text: string; color?: string }) {
  return (
    <p
      style={{
        margin: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "var(--font-body)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color,
      }}
    >
      <span style={{ width: 22, height: 1, background: color, opacity: 0.55 }} />
      {text}
    </p>
  )
}

/* ═══════════ DAY BY DAY — pinned scroll, scroll-animated image ═══════════ */

function DayByDay({ days, fallbackImage }: { days: ItineraryDay[]; fallbackImage: string }) {
  const ref = useRef<HTMLElement>(null)
  const [t, setT] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const total = Math.max(1, el.offsetHeight - window.innerHeight)
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
      setT(scrolled / total)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  const prog = (t / 0.96) * days.length
  const idx = Math.min(days.length - 1, Math.max(0, Math.floor(prog)))
  const frac = Math.min(1, Math.max(0, prog - idx))
  const d = days[idx]
  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const total = Math.max(1, el.offsetHeight - window.innerHeight)
    window.scrollTo({
      top: el.offsetTop + ((i + 0.5) / days.length) * 0.96 * total,
      behavior: "smooth",
    })
  }
  const dImg = d.image || fallbackImage

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: `${days.length * 62}vh`,
        background: "linear-gradient(180deg, #fff, #FAF8F4)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "var(--nav-h)",
          height: "calc(100svh - var(--nav-h))",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "absolute", top: "7vh", left: 0, right: 0, textAlign: "center" }}>
          <Eyebrow text={`${days.length} days · scroll to travel`} />
          <h2
            style={{
              margin: "14px 0 0",
              fontFamily: "var(--font-heading), Fraunces, serif",
              fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: "var(--primary)",
              fontVariationSettings: "'opsz' 144",
            }}
          >
            Your journey,{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>
              day by day.
            </em>
          </h2>
        </div>

        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 56px 0 40px",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "52px 1fr 1fr",
            gap: "clamp(28px, 5vw, 64px)",
            alignItems: "center",
          }}
        >
          {/* day rail */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            {days.map((dd, i) => (
              <button
                key={dd.day}
                onClick={() => jump(i)}
                title={`Day ${dd.day}`}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono-tech), Michroma, sans-serif",
                    fontSize: 9,
                    color: i === idx ? "var(--secondary)" : "var(--silver-dark)",
                    opacity: i === idx ? 1 : 0.5,
                    transition: "all .3s",
                  }}
                >
                  {String(dd.day).padStart(2, "0")}
                </span>
                {i < days.length - 1 && (
                  <span
                    style={{
                      width: 1.5,
                      height: 14,
                      background: i < idx ? "var(--secondary)" : "rgba(176,184,196,0.4)",
                      transition: "background .3s",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* IMAGE — parallaxes with scroll, cross-fades per day */}
          <div
            style={{
              position: "relative",
              borderRadius: 22,
              overflow: "hidden",
              aspectRatio: "4/3",
              boxShadow: "0 30px 70px rgba(11,20,38,0.2)",
            }}
          >
            <div key={`img-${idx}`} className="fade-in-soft" style={{ position: "absolute", inset: 0 }}>
              <Image
                src={dImg}
                alt={d.title}
                fill
                sizes="(max-width: 1024px) 50vw, 460px"
                style={{
                  objectFit: "cover",
                  transform: `scale(1.08) rotate(${(frac - 0.5) * 2.4}deg) translateY(${
                    (frac - 0.5) * -26
                  }px)`,
                  transition: "transform .15s linear",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 52%, rgba(11,20,38,0.5))",
                }}
              />
            </div>
            {d.elevation && (
              <span
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  zIndex: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-mono-tech), Michroma, sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  color: "#fff",
                  background: "rgba(10,20,37,0.5)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  padding: "6px 11px",
                  borderRadius: 9999,
                }}
              >
                <Mountain size={11} color={SALMON} strokeWidth={1.8} />
                {d.elevation}
              </span>
            )}
            {d.distance && (
              <span
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 2,
                  fontFamily: "var(--font-mono-tech), Michroma, sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  color: "#fff",
                  background: "rgba(10,20,37,0.5)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  padding: "6px 11px",
                  borderRadius: 9999,
                }}
              >
                🚗 {d.distance}
              </span>
            )}
          </div>

          {/* TEXT — cross-fades per day */}
          <div key={`txt-${idx}`} className="fade-in-soft" style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <span
                style={{
                  fontFamily: "var(--font-heading), Fraunces, serif",
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  fontWeight: 500,
                  lineHeight: 0.8,
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(196,50,74,0.3)",
                  letterSpacing: "-0.04em",
                }}
              >
                {String(d.day).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono-tech), Michroma, sans-serif",
                  fontSize: 9.5,
                  letterSpacing: "0.2em",
                  color: "var(--silver-dark)",
                  textTransform: "uppercase",
                }}
              >
                Day {d.day}
              </span>
            </div>
            <h3
              style={{
                margin: "12px 0 0",
                fontFamily: "var(--font-heading), Fraunces, serif",
                fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--primary)",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              {d.title}
            </h3>
            {d.highlight && (
              <p
                style={{
                  margin: "8px 0 0",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12.5,
                  color: "var(--secondary)",
                  fontWeight: 500,
                }}
              >
                <Sparkles size={12} color="var(--secondary)" strokeWidth={1.8} />
                {d.highlight}
              </p>
            )}
            <p
              style={{
                margin: "14px 0 0",
                fontSize: 14.5,
                lineHeight: 1.75,
                color: "var(--muted-foreground)",
                maxWidth: 460,
              }}
            >
              {d.description}
            </p>
            {d.activities && d.activities.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 18 }}>
                {d.activities.map((a, j) => (
                  <span
                    key={j}
                    style={{
                      borderRadius: 9999,
                      border: "1px solid rgba(176,184,196,0.3)",
                      background: "#fff",
                      padding: "6px 12px",
                      fontSize: 11.5,
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px 14px",
                marginTop: 14,
                fontSize: 12,
                color: "var(--silver-dark)",
              }}
            >
              {d.meals && <span>🍽️ {d.meals}</span>}
              {d.accommodation && <span>🏨 {d.accommodation}</span>}
            </div>
          </div>
        </div>

        {/* progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: "6vh",
            left: "50%",
            transform: "translateX(-50%)",
            width: 240,
            height: 3,
            borderRadius: 2,
            background: "rgba(176,184,196,0.3)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.min(100, (t / 0.96) * 100)}%`,
              background: "linear-gradient(90deg, var(--secondary), #1F8A5B)",
              transition: "width .15s linear",
            }}
          />
        </div>
      </div>
    </section>
  )
}

/* ═══════════ MAIN COMPONENT ═══════════ */

export function PackageDetail({ pkg }: PackageDetailProps) {
  const leadModal = useLeadModal()

  const itinerary = pkg.itinerary ?? []
  const fallbackImage = pkg.heroImage || pkg.images?.[0] || ""

  const hasDiscount =
    !!pkg.discountedPrice && !!pkg.price && pkg.discountedPrice < pkg.price
  const effectivePrice = pkg.discountedPrice ?? pkg.price
  const pct = hasDiscount
    ? Math.round(((pkg.price! - pkg.discountedPrice!) / pkg.price!) * 100)
    : 0

  // Derived altitude + route data from the REAL itinerary.
  const altDays = buildAltDays(itinerary)
  const showAltitude = altDays.length >= 2
  const maxAltitude = altDays.length ? Math.max(...altDays.map((a) => a.elev)) : null
  const stops = buildStops(itinerary)
  const showRoute = stops.length >= 2

  // Total drive distance across days that carry a distance value.
  const totalKm = itinerary.reduce((sum, d) => sum + (parseDistanceKm(d.distance) ?? 0), 0)

  // International packages get a Visa & Passport section + forms.
  const isInternational =
    pkg.destination?.region === "International" ||
    (!!pkg.destination?.country && pkg.destination.country !== "India")
  const visaCountry = pkg.destination?.country || pkg.destination?.name

  // Stat rail — built from whatever real data exists for this package.
  const stats: [string, string][] = []
  if (pkg.duration) stats.push([`${pkg.duration.days}D / ${pkg.duration.nights}N`, "Duration"])
  if (maxAltitude) stats.push([`${maxAltitude.toLocaleString()}m`, "Highest point"])
  if (totalKm > 0) stats.push([`~${totalKm.toLocaleString()} km`, "Total drive"])
  if (pkg.difficulty) stats.push([pkg.difficulty, "Difficulty"])
  if (pkg.groupSize) stats.push([`${pkg.groupSize.min ?? 2}–${pkg.groupSize.max ?? 20}`, "Group size"])
  if (itinerary.length) stats.push([`${itinerary.length}`, "Days planned"])
  const railStats = stats.slice(0, 4)

  // Coordinate label for the hero (stylised; no real geo data in the dataset).
  const coordLabel = pkg.destination?.name
    ? `${pkg.destination.name.toUpperCase()} · ${
        (pkg.category || "Journey").toUpperCase()
      }`
    : (pkg.category || "Journey").toUpperCase()

  // Sticky-bar visibility: IntersectionObserver on the hero + scroll fallback.
  const [showBar, setShowBar] = useState(false)
  const [focus, setFocus] = useState<number>(() => stops[0]?.days[0] ?? 1)
  const heroRef = useRef<HTMLElement>(null)
  const routeRef = useRef<HTMLElement>(null)

  // Scroll-link the route map's active pin to the section's scroll position.
  useEffect(() => {
    if (!showRoute) return
    const onScroll = () => {
      const el = routeRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const p = (window.innerHeight * 0.62 - r.top) / r.height
      if (p < 0 || p > 1) return
      const i = Math.min(stops.length - 1, Math.max(0, Math.floor(p * stops.length)))
      setFocus(stops[i].days[0])
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [showRoute, stops])

  useEffect(() => {
    const el = heroRef.current
    const evalScroll = () => {
      const h = el ? el.offsetHeight : window.innerHeight
      setShowBar(window.scrollY > h * 0.6)
    }
    let io: IntersectionObserver | undefined
    if (el) {
      io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting), { threshold: 0 })
      io.observe(el)
    }
    evalScroll()
    window.addEventListener("scroll", evalScroll, { passive: true })
    return () => {
      if (io) io.disconnect()
      window.removeEventListener("scroll", evalScroll)
    }
  }, [])

  // Pull a key word out of the title for the italic-cherry emphasis in the hero.
  const titleWords = pkg.title.split(" ")
  const emIndex = titleWords.length > 2 ? Math.floor(titleWords.length / 2) : -1

  return (
    <div style={{ background: "#FAF8F4" }}>
      {/* ═══════════ CINEMATIC HERO ═══════════ */}
      <section ref={heroRef} style={{ position: "relative", height: "92vh", minHeight: 640, overflow: "hidden" }}>
        {fallbackImage && (
          <Image
            src={fallbackImage}
            alt={pkg.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", animation: "kenburns 24s ease-in-out infinite alternate" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,20,37,0.55) 0%, rgba(10,20,37,0.1) 32%, rgba(10,20,37,0.25) 58%, rgba(10,20,37,0.92) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* frosted readability scrim — liquid glass that FEATHERS into the sharp
            image above (no hard edge). The mask ramps the backdrop-blur in over a
            long span so the frost fades in gradually; the translucent-navy gradient
            echoes the .glass-* aesthetic. (No `filter` on this masked element's
            ancestors — would break the mask.) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "70%",
            zIndex: 1,
            pointerEvents: "none",
            WebkitBackdropFilter: "blur(12px) saturate(135%)",
            backdropFilter: "blur(12px) saturate(135%)",
            background:
              "linear-gradient(180deg, rgba(10,20,37,0) 0%, rgba(10,20,37,0.06) 30%, rgba(10,20,37,0.20) 55%, rgba(12,24,52,0.42) 78%, rgba(10,20,37,0.62) 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.12) 24%, rgba(0,0,0,0.4) 42%, rgba(0,0,0,0.78) 62%, #000 82%)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.12) 24%, rgba(0,0,0,0.4) 42%, rgba(0,0,0,0.78) 62%, #000 82%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1280,
            margin: "0 auto",
            height: "100%",
            padding: "0 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: 64,
          }}
        >
          <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <Eyebrow
              text={`${(pkg.category || "Journey").toString()}${
                pkg.duration ? ` · ${pkg.duration.days}D / ${pkg.duration.nights}N` : ""
              }`}
              color="var(--secondary-glow)"
            />
          </div>
          <h1
            className="fade-up"
            style={{
              margin: 0,
              fontFamily: "var(--font-heading), Fraunces, serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 500,
              lineHeight: 0.96,
              letterSpacing: "-0.035em",
              color: "#fff",
              maxWidth: 1000,
              fontVariationSettings: "'opsz' 144",
            }}
          >
            {emIndex === -1
              ? pkg.title
              : titleWords.map((w, i) =>
                  i === emIndex ? (
                    <em key={i} style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary-glow)" }}>
                      {w}{" "}
                    </em>
                  ) : (
                    <span key={i}>{w} </span>
                  )
                )}
          </h1>
          <div
            className="fade-up"
            style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 24, flexWrap: "wrap" }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.9)", fontSize: 15 }}>
              <MapPin size={16} color="var(--secondary-glow)" strokeWidth={1.8} />
              {pkg.destination?.name || pkg.title}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono-tech), Michroma, sans-serif",
                fontSize: 11,
                letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {coordLabel}
            </span>
            {pkg.rating && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.9)", fontSize: 15 }}>
                <Star size={15} fill="var(--secondary-glow)" color="var(--secondary-glow)" strokeWidth={1.8} />
                {pkg.rating}{" "}
                {pkg.reviewCount ? (
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>· {pkg.reviewCount} reviews</span>
                ) : null}
              </span>
            )}
          </div>
          <p
            className="fade-up"
            style={{
              margin: "20px 0 0",
              maxWidth: 560,
              fontFamily: "var(--font-script), Caveat, cursive",
              fontSize: 26,
              lineHeight: 1.3,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            {pkg.experienceStory
              ? pkg.experienceStory.split(". ")[0].replace(/\.$/, "") + "."
              : pkg.description}
          </p>
        </div>

        {/* floating price chip */}
        {effectivePrice && (
          <div
            className="fade-up"
            style={{
              position: "absolute",
              right: 40,
              bottom: 64,
              zIndex: 3,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 20,
              padding: "18px 22px",
              textAlign: "right",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, justifyContent: "flex-end" }}>
              <span
                style={{
                  fontFamily: "var(--font-heading), Fraunces, serif",
                  fontSize: 32,
                  fontWeight: 500,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                {fmt(effectivePrice)}
              </span>
              {hasDiscount && (
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", textDecoration: "line-through" }}>
                  {fmt(pkg.price!)}
                </span>
              )}
            </div>
            <p style={{ margin: "2px 0 12px", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
              per person{hasDiscount ? ` · ${pct}% off this season` : ""}
            </p>
            <button
              onClick={() => leadModal.open(`package-${pkg.slug}`)}
              className="btn btn-primary"
              style={{ padding: "11px 22px", fontSize: 13 }}
            >
              <Phone size={14} /> Plan this trip
            </button>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 22,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            animation: `scrollNudge 2.4s ${EASE} infinite`,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono-tech), Michroma, sans-serif",
              fontSize: 9,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            SCROLL
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE + STAT RAIL ═══════════ */}
      <section style={{ padding: "clamp(70px, 9vw, 120px) 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: railStats.length ? "1.5fr 1fr" : "1fr",
            gap: "clamp(40px, 6vw, 90px)",
            alignItems: "center",
          }}
        >
          <div>
            <Reveal>
              <Eyebrow text="The experience" />
            </Reveal>
            <Reveal delay={0.06}>
              <p
                style={{
                  margin: "24px 0 0",
                  fontFamily: "var(--font-heading), Fraunces, serif",
                  fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.015em",
                  color: "var(--primary)",
                  fontWeight: 400,
                  fontVariationSettings: "'opsz' 100",
                }}
              >
                {pkg.experienceStory || pkg.description}
              </p>
            </Reveal>
          </div>
          {railStats.length > 0 && (
            <Reveal delay={0.12}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                  background: "rgba(176,184,196,0.3)",
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid rgba(176,184,196,0.3)",
                }}
              >
                {railStats.map(([n, l]) => (
                  <div key={l} style={{ background: "#fff", padding: "28px 22px" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-heading), Fraunces, serif",
                        fontSize: 34,
                        fontWeight: 500,
                        color: "var(--secondary)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        fontVariationSettings: "'opsz' 144",
                      }}
                    >
                      {n}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 11.5, letterSpacing: "0.04em", color: "var(--silver-dark)" }}>
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ═══════════ THE CLIMB — altitude profile (only when elevation data exists) ═══════════ */}
      {showAltitude && (
        <section
          style={{
            padding: "clamp(40px, 6vw, 70px) 40px clamp(70px, 9vw, 110px)",
            background: "linear-gradient(180deg, #FAF8F4, #fff)",
          }}
        >
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 24,
                flexWrap: "wrap",
                marginBottom: 38,
              }}
            >
              <div>
                <Reveal>
                  <Eyebrow text="The climb" />
                </Reveal>
                <Reveal delay={0.06}>
                  <h2
                    style={{
                      margin: "16px 0 0",
                      fontFamily: "var(--font-heading), Fraunces, serif",
                      fontSize: "clamp(2rem, 3.6vw, 3rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.025em",
                      lineHeight: 1.05,
                      color: "var(--primary)",
                      fontVariationSettings: "'opsz' 144",
                    }}
                  >
                    You&apos;ll climb to{" "}
                    <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>
                      {maxAltitude?.toLocaleString()} metres.
                    </em>
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.1}>
                <p style={{ margin: 0, maxWidth: 340, fontSize: 14, lineHeight: 1.7, color: "var(--muted-foreground)" }}>
                  This journey rises to {maxAltitude?.toLocaleString()}m. Hover any point to see that
                  day&apos;s altitude.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 24,
                  border: "1px solid rgba(176,184,196,0.25)",
                  padding: "clamp(24px, 3vw, 40px)",
                  boxShadow: "0 10px 40px rgba(11,20,38,0.06)",
                }}
              >
                <AltitudeProfile days={altDays} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ═══════════ THE ROUTE — animated map (dark key moment) ═══════════ */}
      {showRoute && (
        <section
          ref={routeRef}
          style={{ background: "#070D18", padding: "clamp(70px, 9vw, 120px) 40px", position: "relative", overflow: "hidden" }}
        >
          <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <Reveal>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Eyebrow text={`The route · ${stops.length} stops`} color="var(--secondary-glow)" />
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2
                  style={{
                    margin: "16px 0 0",
                    fontFamily: "var(--font-heading), Fraunces, serif",
                    fontSize: "clamp(2rem, 3.6vw, 3rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    color: "#fff",
                    fontVariationSettings: "'opsz' 144",
                  }}
                >
                  One grand{" "}
                  <em style={{ fontStyle: "italic", fontWeight: 400, color: SALMON }}>journey loop.</em>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 40, alignItems: "center" }} className="route-grid">
              <Reveal delay={0.1}>
                <div
                  style={{
                    borderRadius: 24,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 30px 70px rgba(0,0,0,0.4)",
                  }}
                >
                  <RouteMap stops={stops} activeDay={focus} onPick={setFocus} />
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {stops.map((s, i) => {
                    const active = s.days.includes(focus)
                    return (
                      <button
                        key={s.name + i}
                        onClick={() => setFocus(s.days[0])}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          textAlign: "left",
                          cursor: "pointer",
                          borderRadius: 14,
                          padding: "14px 16px",
                          border: `1px solid ${active ? "rgba(255,179,163,0.35)" : "rgba(255,255,255,0.08)"}`,
                          background: active ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.025)",
                          transition: "all .3s",
                        }}
                      >
                        <span
                          style={{
                            width: 30,
                            height: 30,
                            flexShrink: 0,
                            borderRadius: "50%",
                            background: active ? `linear-gradient(135deg, ${CHERRY}, ${GOLD})` : "rgba(255,255,255,0.08)",
                            color: "#fff",
                            fontFamily: "var(--font-mono-tech), Michroma, sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {i + 1}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "var(--font-heading), Fraunces, serif", fontSize: 16, fontWeight: 500, color: "#fff" }}>
                            {s.name}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-mono-tech), Michroma, sans-serif",
                              fontSize: 9,
                              letterSpacing: "0.12em",
                              color: "rgba(208,213,220,0.5)",
                              marginTop: 2,
                            }}
                          >
                            DAY {s.days.join(" · ")}
                            {s.alt ? ` · ${s.alt}` : ""}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ DAY BY DAY ═══════════ */}
      {itinerary.length > 0 && <DayByDay days={itinerary} fallbackImage={fallbackImage} />}

      {/* ═══════════ HIGHLIGHTS ═══════════ */}
      {pkg.highlights && pkg.highlights.length > 0 && (
        <section style={{ background: "#fff", padding: "clamp(60px, 8vw, 100px) 40px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <Reveal>
              <Eyebrow text="Signature moments" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                style={{
                  margin: "16px 0 28px",
                  fontFamily: "var(--font-heading), Fraunces, serif",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "var(--primary)",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                The moments you&apos;ll <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>remember.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {pkg.highlights.map((h, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      borderRadius: 9999,
                      border: "1px solid rgba(196,50,74,0.2)",
                      background: "rgba(196,50,74,0.06)",
                      padding: "10px 18px",
                      fontSize: 14,
                      color: "var(--primary)",
                    }}
                  >
                    <Compass size={14} color="var(--secondary)" strokeWidth={1.8} />
                    {h}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ═══════════ KNOW BEFORE YOU GO + INCLUSIONS ═══════════ */}
      {(pkg.transparencyNote ||
        (pkg.seasonalAdvisories && pkg.seasonalAdvisories.length > 0) ||
        (pkg.inclusions && pkg.inclusions.length > 0) ||
        (pkg.exclusions && pkg.exclusions.length > 0)) && (
        <section style={{ background: "#fff", padding: "clamp(50px, 7vw, 90px) 40px", borderTop: "1px solid rgba(176,184,196,0.2)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            {pkg.transparencyNote && (
              <Reveal>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    borderRadius: 20,
                    border: "1px solid rgba(31,138,122,0.22)",
                    background: "linear-gradient(135deg, rgba(31,138,122,0.05), transparent)",
                    padding: 26,
                    marginBottom: 44,
                  }}
                >
                  <Info size={22} color={TEAL} strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: TEAL }}>
                      Good to know — full transparency
                    </p>
                    <p style={{ margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.75, color: "var(--muted-foreground)", maxWidth: 900 }}>
                      {pkg.transparencyNote}
                    </p>
                  </div>
                </div>
              </Reveal>
            )}

            {pkg.seasonalAdvisories && pkg.seasonalAdvisories.length > 0 && (
              <Reveal>
                <div
                  style={{
                    borderRadius: 20,
                    border: "1px solid rgba(176,184,196,0.25)",
                    background: "#fff",
                    padding: 26,
                    marginBottom: 44,
                  }}
                >
                  <p style={{ margin: 0, display: "inline-flex", alignItems: "center", gap: 9, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C2722A" }}>
                    <CalendarClock size={16} color="#C2722A" strokeWidth={1.8} /> Seasonal advisory
                  </p>
                  <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {pkg.seasonalAdvisories.map((a, i) => (
                      <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.7, color: "var(--muted-foreground)" }}>
                        <span style={{ marginTop: 8, width: 6, height: 6, flexShrink: 0, borderRadius: "50%", background: "rgba(194,114,42,0.7)" }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {(pkg.inclusions?.length || pkg.exclusions?.length) && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="incl-grid">
                {pkg.inclusions && pkg.inclusions.length > 0 && (
                  <Reveal>
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 20,
                        border: "1px solid rgba(31,138,122,0.2)",
                        background: "#fff",
                        padding: 28,
                        boxShadow: "0 2px 16px rgba(11,20,38,0.04)",
                      }}
                    >
                      <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: 9, fontFamily: "var(--font-heading), Fraunces, serif", fontSize: 20, fontWeight: 500, color: "var(--primary)" }}>
                        <span style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(31,138,122,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Check size={15} color={TEAL} strokeWidth={2} />
                        </span>
                        What&apos;s included
                      </h3>
                      <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
                        {pkg.inclusions.map((it, i) => (
                          <li key={i} style={{ display: "flex", gap: 9, fontSize: 14, color: "var(--muted-foreground)" }}>
                            <Check size={15} color={TEAL} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}
                {pkg.exclusions && pkg.exclusions.length > 0 && (
                  <Reveal delay={0.08}>
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 20,
                        border: "1px solid rgba(176,184,196,0.25)",
                        background: "#fff",
                        padding: 28,
                        boxShadow: "0 2px 16px rgba(11,20,38,0.04)",
                      }}
                    >
                      <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: 9, fontFamily: "var(--font-heading), Fraunces, serif", fontSize: 20, fontWeight: 500, color: "var(--primary)" }}>
                        <span style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(196,50,74,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <XIcon size={15} color={CHERRY} strokeWidth={2} />
                        </span>
                        Not included
                      </h3>
                      <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
                        {pkg.exclusions.map((it, i) => (
                          <li key={i} style={{ display: "flex", gap: 9, fontSize: 14, color: "var(--muted-foreground)" }}>
                            <XIcon size={15} color="var(--silver)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════ PER-VEHICLE PRICING (South India rate cards) ═══════════ */}
      {pkg.vehiclePricing && pkg.vehiclePricing.rows.length > 0 && (
        <section style={{ background: "#FAF8F4", padding: "clamp(50px, 7vw, 90px) 40px", borderTop: "1px solid rgba(176,184,196,0.2)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <Reveal>
              <Eyebrow text="Package pricing" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                style={{
                  margin: "16px 0 8px",
                  fontFamily: "var(--font-heading), Fraunces, serif",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "var(--primary)",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Choose your <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>vehicle &amp; comfort.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ margin: "0 0 24px", fontSize: 14, lineHeight: 1.7, color: "var(--muted-foreground)", maxWidth: 640 }}>
                Whole-group package price by vehicle and hotel category — pick the group size and comfort
                level that suits you.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div
                className="hide-scrollbar"
                style={{
                  overflowX: "auto",
                  borderRadius: 20,
                  border: "1px solid rgba(176,184,196,0.3)",
                  background: "#fff",
                  boxShadow: "0 10px 40px rgba(11,20,38,0.05)",
                }}
              >
                <table style={{ width: "100%", minWidth: 640, borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(176,184,196,0.3)" }}>
                      <th
                        style={{
                          padding: "16px 18px",
                          textAlign: "left",
                          fontFamily: "var(--font-mono-tech), Michroma, sans-serif",
                          fontSize: 10,
                          fontWeight: 400,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: "var(--silver-dark)",
                        }}
                      >
                        Vehicle / Group
                      </th>
                      {pkg.vehiclePricing.categories.map((c) => (
                        <th
                          key={c}
                          style={{
                            padding: "16px 18px",
                            textAlign: "right",
                            fontFamily: "var(--font-mono-tech), Michroma, sans-serif",
                            fontSize: 10,
                            fontWeight: 400,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            color: "var(--silver-dark)",
                          }}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pkg.vehiclePricing.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        style={{
                          borderBottom:
                            ri < pkg.vehiclePricing!.rows.length - 1 ? "1px solid rgba(176,184,196,0.18)" : "none",
                        }}
                      >
                        <td style={{ padding: "15px 18px", fontWeight: 500, color: "var(--primary)" }}>{row.vehicle}</td>
                        {row.prices.map((p, pi) => (
                          <td key={pi} style={{ padding: "15px 18px", textAlign: "right", color: "var(--muted-foreground)" }}>
                            {formatCurrency(p)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            {pkg.vehiclePricing.note && (
              <p style={{ margin: "14px 0 0", fontSize: 12, color: "var(--silver-dark)" }}>{pkg.vehiclePricing.note}</p>
            )}
          </div>
        </section>
      )}

      {/* ═══════════ VISA & PASSPORT (international) — keep the forms attachment ═══════════ */}
      {isInternational && (
        <section style={{ background: "#fff", padding: "clamp(50px, 7vw, 90px) 40px", borderTop: "1px solid rgba(176,184,196,0.2)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <Reveal>
              <Eyebrow text="Visa & passport" color={TEAL} />
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                style={{
                  margin: "16px 0 20px",
                  fontFamily: "var(--font-heading), Fraunces, serif",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "var(--primary)",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                We handle the <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>paperwork.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ borderRadius: 20, border: "1px solid rgba(176,184,196,0.25)", background: "#FAFBFC", padding: 28 }}>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.75, color: "var(--muted-foreground)" }}>
                  This is an international trip{visaCountry ? ` to ${visaCountry}` : ""}. Our team handles your
                  visa documentation and passport guidance end-to-end — we share the country-specific document
                  checklist, fill in the application forms for you, and track the file until your visa is stamped.
                </p>
                <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
                  {[
                    "Passport must be valid for at least 6 months beyond your return date, with 2+ blank pages.",
                    "Country-specific visa fee, processing time and the full document list are on our Visa & Passport page.",
                    "We complete the visa application form on your behalf — you only provide the documents.",
                  ].map((t, i) => (
                    <li key={i} style={{ display: "flex", gap: 9, fontSize: 14, color: "var(--muted-foreground)" }}>
                      <Check size={15} color={TEAL} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                      {t}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <Link
                    href="/visa-passport"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      borderRadius: 12,
                      background: TEAL,
                      color: "#fff",
                      padding: "12px 20px",
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <FileText size={16} /> View visa checklist &amp; fees
                  </Link>
                  <a
                    href="/forms/TravelSense-Visa-Passport-Forms.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      borderRadius: 12,
                      border: "1px solid rgba(176,184,196,0.4)",
                      color: "var(--primary)",
                      padding: "12px 20px",
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <Download size={16} /> Download visa &amp; passport forms
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ═══════════ GALLERY ═══════════ */}
      {pkg.images && pkg.images.length > 0 && (
        <section style={{ background: "#FAF8F4", padding: "clamp(50px, 7vw, 90px) 40px", borderTop: "1px solid rgba(176,184,196,0.2)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <Reveal>
              <Eyebrow text="The gallery" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                style={{
                  margin: "16px 0 28px",
                  fontFamily: "var(--font-heading), Fraunces, serif",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "var(--primary)",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                A glimpse of <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>what awaits.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {pkg.images.map((img, i) => (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      aspectRatio: "3/2",
                      borderRadius: 16,
                      overflow: "hidden",
                      border: "1px solid rgba(176,184,196,0.25)",
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${pkg.title} photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ═══════════ CTA BAND ═══════════ */}
      <section style={{ position: "relative", overflow: "hidden", background: "#0A1425" }}>
        {fallbackImage && (
          <Image src={fallbackImage} alt="" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.35 }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,20,37,0.9), rgba(21,34,64,0.8))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto", padding: "clamp(70px, 9vw, 110px) 40px", textAlign: "center" }}>
          <Reveal>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-heading), Fraunces, serif",
                fontSize: "clamp(2.2rem, 4.4vw, 3.4rem)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "#fff",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              Ready for{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary-glow)" }}>
                {pkg.destination?.name || "this journey"}?
              </em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ margin: "20px auto 0", maxWidth: 440, fontSize: 15.5, lineHeight: 1.7, color: "rgba(208,213,220,0.7)" }}>
              One conversation and a real expert builds this trip around you — every detail handled.
            </p>
          </Reveal>
          <Reveal delay={0.18} style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 34, flexWrap: "wrap" }}>
            <button onClick={() => leadModal.open(`package-cta-${pkg.slug}`)} className="btn btn-primary">
              <Phone size={16} /> Talk to a human
            </button>
            <Link href="/packages" className="btn btn-ghost">
              See more packages
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ STICKY BOOKING BAR ═══════════ */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          transform: showBar ? "translateY(0)" : "translateY(120%)",
          transition: `transform .4s ${EASE}`,
          display: "flex",
          justifyContent: "center",
          padding: "0 16px 16px",
          pointerEvents: "none",
        }}
      >
        <div
          className="glass-dark"
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: 20,
            // real liquid glass (matches .glass-dark / .nav-top in globals.css):
            // translucent navy + frosted backdrop so it reads over light AND dark
            // page areas, with a hairline top border and soft shadow.
            background: "rgba(16,28,58,0.7)",
            backdropFilter: "blur(28px) saturate(150%)",
            WebkitBackdropFilter: "blur(28px) saturate(150%)",
            border: "1px solid rgba(120,150,210,0.25)",
            borderTop: "1px solid rgba(120,150,210,0.35)",
            borderRadius: 9999,
            padding: "10px 10px 10px 20px",
            boxShadow:
              "0 20px 50px rgba(3,8,16,0.42), 0 4px 14px rgba(3,8,16,0.18), inset 0 1px 0 rgba(255,255,255,0.18)",
            maxWidth: 760,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
            {fallbackImage && (
              <span style={{ position: "relative", width: 38, height: 38, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                <Image src={fallbackImage} alt="" fill sizes="38px" style={{ objectFit: "cover" }} />
              </span>
            )}
            <div style={{ minWidth: 0 }}>
              <div
                className="glass-text"
                style={{
                  fontFamily: "var(--font-heading), Fraunces, serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#fff",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {pkg.title}
              </div>
              <div style={{ fontSize: 10.5, color: "rgba(208,213,220,0.82)" }}>
                {pkg.duration ? `${pkg.duration.days}D / ${pkg.duration.nights}N` : ""}
                {pkg.difficulty ? ` · ${pkg.difficulty}` : ""}
              </div>
            </div>
          </div>
          {effectivePrice && (
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-heading), Fraunces, serif", fontSize: 20, fontWeight: 500, color: "#fff" }}>
                  {fmt(effectivePrice)}
                </span>
                {hasDiscount && (
                  <span style={{ fontSize: 11, color: "rgba(176,184,196,0.5)", textDecoration: "line-through" }}>
                    {fmt(pkg.price!)}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 9.5, color: "rgba(208,213,220,0.8)" }}>per person</div>
            </div>
          )}
          <button
            onClick={() => leadModal.open(`package-stickybar-${pkg.slug}`)}
            className="btn btn-primary"
            style={{ padding: "12px 22px", fontSize: 13, flexShrink: 0 }}
          >
            Plan this trip
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Local responsive rules (NOT in globals.css) */}
      <style>{`
        @media (max-width: 900px) {
          .route-grid { grid-template-columns: 1fr !important; }
          .incl-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 760px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}

