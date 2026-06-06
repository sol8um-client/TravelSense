"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import Image from "next/image"
import { ArrowRight, Compass } from "lucide-react"

/* ═══════════════════════════════════════════════════════════════════════════
   TravelSense - Vehicles fleet section (ported from design_handoff/veh-page.jsx)
   Signature devices: cream hero + dashed road motif, brushed-aluminium fleet
   "spec plates" with parametric side-profile Silhouettes, person-icon capacity
   gauges, feature chips and indicative ₹/day, the gold "Most popular" plate, a
   dashed "Something custom?" card, and the dark road-trip banner.
   Wired to the REAL vehicle list (names/capacities/descriptions kept).
   ═══════════════════════════════════════════════════════════════════════════ */

const EASE = "cubic-bezier(0.22,1,0.36,1)"
const CHERRY = "#C4324A"
const GOLD = "#B8862F"

const fmt = (n: number): string => "₹" + Number(n).toLocaleString("en-IN")

/* ── Reveal - fade/slide in on scroll via IntersectionObserver (home-kit) ──── */
interface RevealProps {
  children: ReactNode
  y?: number
  delay?: number
  scale?: boolean
  once?: boolean
  style?: CSSProperties
  className?: string
}

function Reveal({
  children,
  y = 22,
  delay = 0,
  scale = false,
  once = true,
  style,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          if (once) io.disconnect()
        } else if (!once) {
          setSeen(false)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])
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

/* ── Inline path-icon (lucide-style raw svg, matches home-kit Icon) ────────── */
interface PathIconProps {
  d: string
  size?: number
  stroke?: string
  sw?: number
}

function PathIcon({ d, size = 20, stroke = "currentColor", sw = 1.5 }: PathIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  )
}

/* person silhouette path - capacity gauge */
const PERSON = "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0"

/* per-type top-view vehicle glyph for the Class tag */
type VehType = "sedan" | "suv" | "van" | "bus" | "coach"

const VEH_ICON: Record<VehType, string> = {
  sedan:
    "M5 17h14M3 17l1.5-5A3 3 0 0 1 7.3 10h9.4a3 3 0 0 1 2.8 2L21 17M6.5 17a1.5 1.5 0 1 0 0 .01M17.5 17a1.5 1.5 0 1 0 0 .01",
  suv: "M3 16h18M4 16l1-6h14l1 6M7 16a1.5 1.5 0 1 0 0 .01M17 16a1.5 1.5 0 1 0 0 .01",
  van: "M3 16V8h13l4 4v4M3 16h18M7 16a1.5 1.5 0 1 0 0 .01M17 16a1.5 1.5 0 1 0 0 .01",
  bus: "M4 16V6h16v10M4 16h16M8 16a1.5 1.5 0 1 0 0 .01M16 16a1.5 1.5 0 1 0 0 .01M4 10h16",
  coach:
    "M3 16V7h18v9M3 16h18M7 16a1.5 1.5 0 1 0 0 .01M17 16a1.5 1.5 0 1 0 0 .01M3 11h18",
}

/* ── Parametric side-profile silhouette - per-type config ──────────────────── */
interface ShapeConfig {
  L: number
  body: number
  roof: number
  c1: number
  c2: number
  win: number
  r: number
  wx: [number, number]
}

const SHAPE: Record<VehType, ShapeConfig> = {
  sedan: { L: 200, body: 60, roof: 36, c1: 66, c2: 150, win: 2, r: 14, wx: [54, 168] },
  suv: { L: 198, body: 50, roof: 26, c1: 58, c2: 160, win: 3, r: 16, wx: [52, 164] },
  van: { L: 208, body: 32, roof: 20, c1: 30, c2: 196, win: 5, r: 15, wx: [54, 176] },
  bus: { L: 214, body: 28, roof: 18, c1: 28, c2: 200, win: 6, r: 13, wx: [54, 182] },
  coach: { L: 218, body: 24, roof: 14, c1: 26, c2: 204, win: 7, r: 12, wx: [56, 186] },
}

interface SilhouetteProps {
  type: VehType
  color?: string
}

function Silhouette({ type, color = "#0A1425" }: SilhouetteProps) {
  const s = SHAPE[type]
  const x0 = 14
  const ground = 80
  const winW = (s.c2 - s.c1 - 8) / s.win
  return (
    <svg viewBox="0 0 240 100" style={{ width: "100%", height: "100%", display: "block" }}>
      {/* body */}
      <path
        d={`M${x0} ${ground} L${x0} ${s.body} Q${x0} ${s.body - 4} ${x0 + 6} ${s.body - 6} L${s.c1} ${s.body - 6} L${s.c1 + 8} ${s.roof + 4} Q${s.c1 + 10} ${s.roof} ${s.c1 + 16} ${s.roof} L${s.c2 - 10} ${s.roof} Q${s.c2} ${s.roof} ${s.c2} ${s.roof + 8} L${s.c2} ${s.body - 6} L${x0 + s.L - 6} ${s.body - 6} Q${x0 + s.L} ${s.body - 4} ${x0 + s.L} ${s.body + 4} L${x0 + s.L} ${ground} Z`}
        fill={color}
        opacity="0.92"
      />
      {/* windows */}
      {Array.from({ length: s.win }).map((_, i) => (
        <rect
          key={i}
          x={s.c1 + 10 + i * winW}
          y={s.roof + 6}
          width={winW - 6}
          height={s.body - s.roof - 16}
          rx="3"
          fill="#A9C3DE"
          opacity="0.55"
        />
      ))}
      {/* wheels */}
      {s.wx.map((wx, i) => (
        <g key={i}>
          <circle cx={wx} cy={ground} r={s.r} fill="#10182A" />
          <circle cx={wx} cy={ground} r={s.r * 0.5} fill="#5A6478" />
          <circle cx={wx} cy={ground} r={s.r * 0.2} fill="#C8CDD5" />
        </g>
      ))}
    </svg>
  )
}

/* ── Fleet data - REAL vehicle list (names/capacities/descriptions) + the
   design's indicative ₹/day, feature chips, capacity gauge counts & silhouette
   types. Order maps to Class A–E. ────────────────────────────────────────── */
interface FleetVehicle {
  type: VehType
  name: string
  cap: number
  capLabel: string
  best: string
  feats: string[]
  rate: number
  featured?: boolean
}

const FLEET: FleetVehicle[] = [
  {
    type: "sedan",
    name: "Sedan",
    cap: 4,
    capLabel: "Up to 4",
    best: "Couples & airport transfers",
    feats: ["AC", "2 bags", "City comfort"],
    rate: 2500,
  },
  {
    type: "suv",
    name: "SUV",
    cap: 6,
    capLabel: "Up to 6",
    best: "Hill stations & off-road",
    feats: ["AC", "4 bags", "4×4 ready"],
    rate: 3800,
  },
  {
    type: "van",
    name: "Tempo Traveller",
    cap: 9,
    capLabel: "12–18",
    best: "Group road trips",
    feats: ["AC", "Pushback seats", "Luggage hold"],
    rate: 6500,
    featured: true,
  },
  {
    type: "bus",
    name: "Mini Bus",
    cap: 10,
    capLabel: "20–30",
    best: "Corporate & school tours",
    feats: ["AC", "Entertainment", "Large hold"],
    rate: 9000,
  },
  {
    type: "coach",
    name: "Luxury Coach",
    cap: 10,
    capLabel: "30–45",
    best: "Long-distance comfort",
    feats: ["Recliners", "Wi-Fi", "Washroom"],
    rate: 14000,
  },
]

/* ── A single brushed-metal spec plate ─────────────────────────────────────── */
interface FleetCardProps {
  v: FleetVehicle
  i: number
}

function FleetCard({ v, i }: FleetCardProps) {
  const accent = v.featured ? GOLD : CHERRY
  const classLetter = String.fromCharCode(65 + FLEET.findIndex((f) => f.type === v.type))
  return (
    <Reveal delay={(i % 3) * 0.06} scale style={{ gridColumn: "span 1", height: "100%" }}>
      <div
        className="fleet-card"
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 20,
          overflow: "hidden",
          background: "#fff",
          border: `1px solid ${v.featured ? "rgba(184,134,47,0.35)" : "rgba(176,184,196,0.22)"}`,
          boxShadow: v.featured
            ? "0 14px 44px rgba(184,134,47,0.14)"
            : "0 3px 18px rgba(11,20,38,0.06)",
          transition: `box-shadow .45s ${EASE}, transform .45s ${EASE}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)"
          e.currentTarget.style.boxShadow = "0 22px 56px rgba(11,20,38,0.16)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = v.featured
            ? "0 14px 44px rgba(184,134,47,0.14)"
            : "0 3px 18px rgba(11,20,38,0.06)"
        }}
      >
        {v.featured && (
          <span
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              zIndex: 3,
              fontFamily: "var(--font-mono-tech)",
              fontSize: 8,
              letterSpacing: "0.16em",
              color: "#fff",
              background: GOLD,
              padding: "5px 11px",
              borderRadius: 9999,
              textTransform: "uppercase",
            }}
          >
            Most popular
          </span>
        )}
        {/* brushed-metal plate */}
        <div
          style={{
            position: "relative",
            height: 150,
            background:
              "linear-gradient(135deg, #F4F6F9 0%, #DFE3E9 35%, #C8CDD5 60%, #AAB0BA 100%)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.5,
              backgroundImage:
                "repeating-linear-gradient(95deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 3px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.5), transparent 40%, rgba(11,20,38,0.06))",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: "26px 28px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Silhouette type={v.type} color="#0A1425" />
          </div>
          {/* class tag */}
          <span
            style={{
              position: "absolute",
              bottom: 12,
              left: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-mono-tech)",
              fontSize: 8,
              letterSpacing: "0.14em",
              color: "#0A1425",
              background: "rgba(255,255,255,0.7)",
              padding: "4px 9px",
              borderRadius: 9999,
              textTransform: "uppercase",
            }}
          >
            <PathIcon d={VEH_ICON[v.type]} size={13} stroke="#0A1425" />
            Class {classLetter}
          </span>
        </div>
        {/* body */}
        <div style={{ padding: 22, display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontFamily: "var(--font-heading, Fraunces, Georgia, serif)",
                fontSize: 21,
                fontWeight: 500,
                color: "var(--primary)",
                letterSpacing: "-0.015em",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              {v.name}
            </h3>
            <span
              style={{
                fontFamily: "var(--font-mono-tech)",
                fontSize: 9,
                letterSpacing: "0.1em",
                color: accent,
              }}
            >
              {v.capLabel} PAX
            </span>
          </div>
          {/* capacity gauge */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 12 }}>
            {Array.from({ length: 10 }).map((_, n) => (
              <PathIcon
                key={n}
                d={PERSON}
                size={13}
                stroke={n < v.cap ? accent : "rgba(176,184,196,0.4)"}
                sw={1.6}
              />
            ))}
            {v.cap >= 10 && (
              <span style={{ fontSize: 12, color: accent, fontWeight: 600, marginLeft: 2 }}>+</span>
            )}
          </div>
          <p style={{ margin: "14px 0 0", fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.6 }}>
            <span style={{ color: "var(--silver-dark)" }}>Best for </span>
            {v.best}
          </p>
          {/* feature chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            {v.feats.map((f) => (
              <span
                key={f}
                style={{
                  borderRadius: 9999,
                  border: "1px solid rgba(176,184,196,0.3)",
                  background: "var(--silver-mist)",
                  padding: "5px 11px",
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginTop: "auto",
              paddingTop: 18,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span
                  style={{
                    fontFamily: "var(--font-heading, Fraunces, Georgia, serif)",
                    fontSize: 21,
                    fontWeight: 500,
                    color: "var(--primary)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {fmt(v.rate)}
                </span>
                <span style={{ fontSize: 12, color: "var(--silver-dark)" }}>/day</span>
              </div>
              <div style={{ fontSize: 10, color: "var(--silver-dark)" }}>indicative · incl. driver</div>
            </div>
            <a
              href="#request"
              className="fc-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12.5,
                fontWeight: 600,
                color: accent,
                textDecoration: "none",
              }}
            >
              Reserve <ArrowRight size={14} color={accent} />
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Exported section - hero + fleet grid + custom card + dark road-trip banner
   ═══════════════════════════════════════════════════════════════════════════ */
export default function VehicleFleet() {
  return (
    <div style={{ background: "#FAF8F4" }}>
      {/* ═══════════ HERO ═══════════ */}
      <section
        className="bg-brand-mesh grain"
        style={{ position: "relative", overflow: "hidden", padding: "150px 32px 70px" }}
      >
        {/* dashed road motif */}
        <svg
          style={{ position: "absolute", left: 0, right: 0, bottom: 40, width: "100%", height: 60, opacity: 0.5 }}
          viewBox="0 0 1400 60"
          preserveAspectRatio="none"
        >
          <path
            d="M-20 40 C 300 10 500 55 760 30 C 1000 8 1200 45 1420 25"
            fill="none"
            stroke="rgba(176,184,196,0.5)"
            strokeWidth="2"
            strokeDasharray="10 9"
          />
        </svg>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className="eyebrow">
                <span>Vehicle rentals</span>
                <span className="dot" />
                <span>Driver included · across India</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              style={{
                margin: "18px auto 0",
                maxWidth: 780,
                fontFamily: "var(--font-heading, Fraunces, Georgia, serif)",
                fontSize: "clamp(2.6rem, 5.4vw, 4.4rem)",
                fontWeight: 500,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "var(--primary)",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              The right ride for{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>
                every road.
              </em>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              style={{
                margin: "20px auto 0",
                maxWidth: 500,
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--muted-foreground)",
              }}
            >
              A handpicked fleet and experienced drivers - from intimate city sedans to long-haul
              luxury coaches.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FLEET ═══════════ */}
      <section style={{ padding: "70px 32px 90px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <Reveal>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading, Fraunces, Georgia, serif)",
                  fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "var(--primary)",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Choose your{" "}
                <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>
                  fleet.
                </em>
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p
                style={{
                  margin: "12px auto 0",
                  maxWidth: 500,
                  fontSize: 14.5,
                  color: "var(--muted-foreground)",
                }}
              >
                From intimate city rides to large group journeys - the right vehicle for every trip.
              </p>
            </Reveal>
          </div>
          <div className="fleet-grid">
            {FLEET.map((v, i) => (
              <FleetCard key={v.name} v={v} i={i} />
            ))}
            {/* custom card */}
            <Reveal delay={0.12} scale style={{ height: "100%" }}>
              <a
                href="#request"
                className="custom-card"
                style={{
                  height: "100%",
                  minHeight: 360,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  textAlign: "center",
                  borderRadius: 20,
                  border: "1.5px dashed rgba(176,184,196,0.5)",
                  background: "rgba(255,255,255,0.4)",
                  padding: 28,
                  textDecoration: "none",
                  transition: "border-color .3s, background .3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(196,50,74,0.4)"
                  e.currentTarget.style.background = "#fff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(176,184,196,0.5)"
                  e.currentTarget.style.background = "rgba(255,255,255,0.4)"
                }}
              >
                <span
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(196,50,74,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Compass size={26} color="var(--secondary)" />
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-heading, Fraunces, Georgia, serif)",
                    fontSize: 20,
                    fontWeight: 500,
                    color: "var(--primary)",
                  }}
                >
                  Something custom?
                </h3>
                <p
                  style={{
                    margin: 0,
                    maxWidth: 220,
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "var(--muted-foreground)",
                  }}
                >
                  Multi-vehicle convoys, self-drive, vintage cars for weddings - just ask.
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--secondary)",
                  }}
                >
                  Request a quote <ArrowRight size={14} color="var(--secondary)" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ ROAD-TRIP BANNER (dark key moment) ═══════════ */}
      <section style={{ position: "relative", overflow: "hidden", height: 380 }}>
        <Image
          src="/images/generated/leh-ladakh-hero.webp"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(10,20,37,0.92), rgba(10,20,37,0.55) 55%, rgba(10,20,37,0.9))",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 32px",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <Reveal>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading, Fraunces, Georgia, serif)",
                  fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  lineHeight: 1.1,
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Every journey deserves the{" "}
                <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary-glow)" }}>
                  right ride.
                </em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                style={{
                  margin: "16px auto 0",
                  maxWidth: 460,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "rgba(208,213,220,0.75)",
                }}
              >
                From the Western Ghats to the highways of Rajasthan - travel comfortably with our
                handpicked fleet and seasoned drivers.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* responsive grid: 3-up desktop → 2-up tablet → 1-up mobile */}
      <style>{`
        .fleet-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 900px) {
          .fleet-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .fleet-grid { grid-template-columns: 1fr; }
        }
        .fc-btn:hover svg { transform: translateX(4px); transition: transform .35s ${EASE}; }
      `}</style>
    </div>
  )
}
