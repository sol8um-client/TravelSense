"use client"

/**
 * VisorCascade — decorative cluster of "logo-shape" visors for the homepage hero.
 *
 * Each visor clips a destination photo into TravelSense's exact ski-goggle logo
 * silhouette, wrapped in a soft matte-aluminium frame, with a STATIC label below
 * (place name + coordinates). The visors gently float; the labels stay put.
 *
 * This layer is GLOBE-FREE on purpose — drop it INTO the existing hero (which
 * already renders the 3D globe + headline + CTAs). It positions itself in the
 * right margin and hides on small screens so it never crowds the centred copy.
 *
 * Usage (inside Hero.tsx, as a sibling of the Container, after the globe):
 *   <VisorCascade />
 *
 * Tune placement with `className` (e.g. translate / scale / right offset) or pass
 * your own `visors` array. Positions in `visors` are relative to the cascade
 * container (see DEFAULT_VISORS).
 */

import { useId } from "react"
import "./visor-cascade.css"

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

// Goggle silhouette traced from the logo. Two forms: userspace (frame SVG) and
// normalised 0–1 (objectBoundingBox clip-path on the photo layer).
const VB_W = 320
const VB_H = 132
const RATIO = VB_H / VB_W // ~0.4125

const VISOR_PATH =
  "M 12 70 C 6 44 34 20 74 16 C 130 9 196 8 242 17 C 282 24 312 36 305 58 C 300 84 277 101 248 105 C 228 108 213 108 199 102 C 184 95 174 89 160 89 C 146 89 136 95 121 102 C 107 109 86 116 63 113 C 38 110 18 95 12 70 Z"

const VISOR_PATH_NORM =
  "M 0.03750 0.53030 C 0.01875 0.33333 0.10625 0.15152 0.23125 0.12121 C 0.40625 0.06818 0.61250 0.06061 0.75625 0.12879 C 0.88125 0.18182 0.97500 0.27273 0.95313 0.43939 C 0.93750 0.63636 0.86563 0.76515 0.77500 0.79545 C 0.71250 0.81818 0.66563 0.81818 0.62188 0.77273 C 0.57500 0.71970 0.54375 0.67424 0.50000 0.67424 C 0.45625 0.67424 0.42500 0.71970 0.37813 0.77273 C 0.33438 0.82576 0.26875 0.87879 0.19688 0.85606 C 0.11875 0.83333 0.05625 0.71970 0.03750 0.53030 Z"

export type Visor = {
  /** Public-path image (e.g. "/images/generated/bali-hero.webp") */
  img: string
  /** Place name shown in the static label (italic serif) */
  name: string
  /** Coordinate shown beneath the name (uppercase, tracked) */
  coord: string
  /** Visor width in px (height derives from the goggle ratio) */
  width: number
  /** Position relative to the cascade container, in px */
  top: number
  right: number
  /** Base rotation in degrees */
  rot: number
  /** Mirror the asymmetric goggle for variety */
  flip?: boolean
  /** Stacking order within the cascade */
  z?: number
  /** Float animation tuning */
  floatDur?: number
  floatDelay?: number
}

/**
 * The approved "Hero statement" cascade: Bali (large) › Kerala (medium) › Zermatt
 * (small), stepping down the right. Coordinates relative to a 340×560 container.
 * Swap `img` paths for your CMS/CDN URLs as needed.
 */
export const DEFAULT_VISORS: Visor[] = [
  { img: "/images/generated/bali-hero.webp",   name: "Bali",    coord: "8.51°S · 115.26°E", width: 493, top: 16,  right: 8,   rot: -2, z: 6, floatDur: 9,    floatDelay: 0 },
  { img: "/images/generated/kerala-hero.webp", name: "Kerala",  coord: "9.93°N · 76.26°E",  width: 333, top: 372, right: 0,   rot: -4, flip: true, z: 5, floatDur: 10.4, floatDelay: 0.4 },
  { img: "/images/destinations/swiss-alps.jpg", name: "Iceland", coord: "64.13°N · 21.94°W", width: 199, top: 624, right: 168, rot: 5,  z: 4, floatDur: 11.8, floatDelay: 0.8 },
]

function LogoVisor({
  img,
  width,
  flip = false,
  compass = false,
  name,
  coord,
  floatDur = 9,
  floatDelay = 0,
  bgSize = "cover",
}: Visor & { compass?: boolean; bgSize?: string }) {
  const rawId = useId()
  const uid = rawId.replace(/:/g, "")
  const h = width * RATIO
  const frameW = 8
  const flipT = flip ? "scaleX(-1)" : "none"
  const labelScale = Math.max(0.86, Math.min(1.15, width / 180))

  return (
    <div style={{ position: "relative", width, height: h }}>
      {/* clip definition (normalised → scales to the element box) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <clipPath id={`lens-${uid}`} clipPathUnits="objectBoundingBox">
            <path d={VISOR_PATH_NORM} />
          </clipPath>
        </defs>
      </svg>

      {/* ── animated visor — ONLY this floats; the label below stays static ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          animation: `visorFloat ${floatDur}s ${EASE} ${floatDelay}s infinite`,
        }}
      >
        {/* soft glow halo (sibling — safe to filter) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "54%",
            width: width * 1.34,
            height: h * 1.7,
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 42%, transparent 70%)",
            filter: "blur(10px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* drop-shadow caster: a SOLID goggle (fill, not url-clip → filter safe) */}
        <svg
          width={width}
          height={h}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "visible",
            transform: flipT,
            zIndex: 1,
            filter:
              "drop-shadow(0 14px 20px rgba(11,20,38,0.30)) drop-shadow(0 3px 5px rgba(11,20,38,0.16))",
          }}
        >
          <path d={VISOR_PATH} fill="#0A1425" />
        </svg>

        {/* photo layer — clip-path ONLY. No filter here or on any ancestor:
            Chrome silently drops clip-path:url() when a filter sits on the same
            element or an ancestor. Keep filters on SIBLING layers only. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            transform: flipT,
            clipPath: `url(#lens-${uid})`,
            WebkitClipPath: `url(#lens-${uid})`,
            backgroundImage: `url(${img})`,
            backgroundSize: bgSize,
            backgroundPosition: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, transform: flipT }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(168deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.03) 24%, transparent 44%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 56%, rgba(11,20,38,0.24) 100%)",
              }}
            />
            {/* slow specular sweep */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "40%",
                left: "-50%",
                background:
                  "linear-gradient(100deg, transparent, rgba(255,255,255,0.28), transparent)",
                animation: `visorSweep ${9 + (width % 5)}s ${EASE} ${(width % 7) * 0.4}s infinite`,
              }}
            />
          </div>
        </div>

        {/* matte aluminium frame (sibling svg) */}
        <svg
          width={width}
          height={h}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, overflow: "visible", transform: flipT, zIndex: 3 }}
        >
          <defs>
            <linearGradient id={`metal-${uid}`} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#F4F6F9" />
              <stop offset="22%" stopColor="#DFE3E9" />
              <stop offset="48%" stopColor="#C8CDD5" />
              <stop offset="58%" stopColor="#C0C5CD" />
              <stop offset="78%" stopColor="#CDD2D9" />
              <stop offset="100%" stopColor="#AAB0BA" />
            </linearGradient>
          </defs>

          {compass && (
            <g transform="translate(254 60)">
              <circle r="17" fill="#E7EAEF" stroke="#AAB0BA" strokeWidth="1.6" />
              <circle r="17" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="0.7" />
              <circle r="12.5" fill="#F4F6F9" stroke="rgba(11,20,38,0.16)" strokeWidth="0.6" />
              <g style={{ transformOrigin: "center", animation: "visorCompassSpin 60s linear infinite" }}>
                <path d="M0 -10 L2.7 0 L0 1.8 L-2.7 0 Z" fill="#C4324A" />
                <path d="M0 10 L2.7 0 L0 -1.8 L-2.7 0 Z" fill="#9AA1AC" />
              </g>
              <circle r="1.4" fill="#fff" stroke="rgba(11,20,38,0.2)" strokeWidth="0.4" />
            </g>
          )}

          <path d={VISOR_PATH} fill="none" stroke={`url(#metal-${uid})`} strokeWidth={frameW} strokeLinejoin="round" />
          <path
            d={VISOR_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.2"
            strokeLinejoin="round"
            style={{ transformBox: "fill-box", transformOrigin: "center", transform: "scale(0.972) translateY(-0.4px)" }}
          />
          <path
            d={VISOR_PATH}
            fill="none"
            stroke="rgba(11,20,38,0.16)"
            strokeWidth="1"
            strokeLinejoin="round"
            style={{ transformBox: "fill-box", transformOrigin: "center", transform: "scale(0.948)" }}
          />
        </svg>
      </div>

      {/* ── static location label (does NOT move with the visor) ── */}
      {name && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "100%",
            zIndex: 4,
            transform: `translate(-50%, ${1 * labelScale}px) scale(${labelScale})`,
            transformOrigin: "top center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 14, height: 1, background: "linear-gradient(90deg, transparent, var(--secondary))" }} />
            <span
              style={{
                fontFamily: "var(--font-fraunces, Georgia, serif)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 16,
                color: "var(--primary)",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                fontVariationSettings: "'opsz' 144",
              }}
            >
              {name}
            </span>
            <span style={{ width: 14, height: 1, background: "linear-gradient(90deg, var(--secondary), transparent)" }} />
          </div>
          {coord && (
            <span
              style={{
                fontFamily: "var(--font-michroma, sans-serif)",
                fontSize: 7,
                letterSpacing: "0.26em",
                color: "var(--muted-foreground)",
                textTransform: "uppercase",
              }}
            >
              {coord}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default function VisorCascade({
  visors = DEFAULT_VISORS,
  className = "",
}: {
  visors?: Visor[]
  className?: string
}) {
  const [bali, kerala, iceland] = visors
  return (
    <>
      {/* RIGHT margin — big Bali over medium Kerala. Dropped below the nav and the
          compass, and kept clear of the centred title (no overlap). */}
      <div
        aria-hidden
        className={"pointer-events-none absolute right-[1%] top-[128px] z-10 hidden xl:block " + className}
        style={{ width: 540, height: 640 }}
      >
        {bali && (
          <div style={{ position: "absolute", top: 0, right: 8, zIndex: 6, transform: "rotate(-2deg)" }}>
            {/* bgSize "auto 122%" zooms the 16:9 photo out a touch so more of the
                landscape reads inside the wide goggle. */}
            <LogoVisor {...bali} width={480} bgSize="auto 122%" />
          </div>
        )}
        {kerala && (
          <div style={{ position: "absolute", top: 304, right: 0, zIndex: 5, transform: "rotate(-4deg)" }}>
            <LogoVisor {...kerala} width={328} />
          </div>
        )}
      </div>

      {/* LEFT margin — the small visor tucked into the lower-left, below the globe. */}
      {iceland && (
        <div aria-hidden className="pointer-events-none absolute left-[5%] top-[80%] z-10 hidden xl:block">
          <div style={{ transform: "rotate(5deg)" }}>
            <LogoVisor {...iceland} width={196} />
          </div>
        </div>
      )}
    </>
  )
}

/**
 * Mobile / tablet variant — a staggered, varied-size CLUSTER (not a uniform row),
 * spread across the hero width so the goggles feel composed with the rest of the
 * mobile hero and their labels never collide. Shown only below `xl`.
 */
type MobileSlot = { width: number; top: number; left?: string; right?: string; rot: number }
export function MobileVisorStrip({ visors = DEFAULT_VISORS }: { visors?: Visor[] }) {
  // Varied sizes + offset positions → an organic scatter; staggered tops keep the
  // place-name labels (which sit beneath each visor) from overlapping.
  const layout: MobileSlot[] = [
    { width: 156, top: 0,   left: "0%",  rot: -3 },
    { width: 122, top: 122, right: "0%", rot: 4 },
    { width: 100, top: 212, left: "27%", rot: -5 },
  ]
  return (
    <div
      aria-hidden
      className="relative mx-auto mt-6 mb-2 h-[300px] w-full max-w-[420px] xl:hidden"
    >
      {visors.slice(0, 3).map((v, i) => {
        const s = layout[i]
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              right: s.right,
              zIndex: 6 - i,
              transform: `rotate(${s.rot}deg)`,
            }}
          >
            <LogoVisor {...v} width={s.width} />
          </div>
        )
      })}
    </div>
  )
}

export { LogoVisor }
