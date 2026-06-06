"use client"

/**
 * StaticGlobe — the hero's left-hand showpiece. A single pre-rendered, premium
 * globe image (Nano-Banana art, India / South Asia centred, night-side city
 * lights) with all the motion layered on top in CSS so it stays butter-smooth on
 * every device:
 *
 *   • soft, CINEMATIC atmospheric glow that the feathered rim melts into
 *   • gold (sunrise) ↘ blue (atmosphere) hue + a soft contact shadow
 *   • two slow dotted orbital "boundary" rings
 *   • 3–4 location IMAGE-PINS placed on their REAL country, rendered as compact
 *     frosted-glass chips (tiny photo + name) that merge with the globe, each
 *     with a pulsing ground dot + a short connector stalk
 *   • a gentle float on the whole stack (globeFloat keyframe)
 *
 * Pins are desktop-only (lg+) — on phones/tablets the globe reads as a calm,
 * glowing backdrop behind the headline (no clutter, full legibility).
 *
 * Pin %positions are authored against the globe art's geography (verified on a
 * coordinate-grid overlay); imagery/names come from src/data/destinations.ts.
 */

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { destinations } from "@/data/destinations"

type PinDef = {
  slug: string
  /** x / y as a percentage of the globe square — sits on the real country. */
  x: number
  y: number
  delay: number
}

/* Anchors verified against the globe art: north-India, south-India, SE-Asia
   mainland, Indonesia — a clean spread across the visible face. */
const PIN_DEFS: PinDef[] = [
  { slug: "kashmir", x: 40, y: 34, delay: 0.15 }, // far-north India / Himalaya
  { slug: "kerala", x: 41, y: 57, delay: 0.4 }, // south-west coast (peninsula tip)
  { slug: "thailand", x: 64, y: 52, delay: 0.65 }, // Indochina mainland (E of Bay of Bengal)
  { slug: "bali", x: 70, y: 71, delay: 0.9 }, // Indonesia
]

type Pin = PinDef & { name: string; image: string }

const PINS: Pin[] = PIN_DEFS.flatMap((p) => {
  const d = destinations.find((dest) => dest.slug === p.slug)
  if (!d) return []
  return [{ ...p, name: d.name, image: d.heroImage }]
})

export default function StaticGlobe({ className = "" }: { className?: string }) {
  // When the spotlight carousel surfaces a new destination it dispatches
  // `ts:spotlight`; the globe gives a subtle reactive nudge so the two hero
  // showpieces feel connected — the new card reads as "emerging" from the globe.
  const stackRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onPulse = () => {
      const el = stackRef.current
      if (!el || typeof el.animate !== "function") return
      el.animate(
        [
          { transform: "translateY(0) rotate(0deg) scale(1)" },
          { transform: "translateY(-5px) rotate(-1deg) scale(1.015)", offset: 0.32 },
          { transform: "translateY(1px) rotate(0.55deg) scale(1.006)", offset: 0.62 },
          { transform: "translateY(0) rotate(0deg) scale(1)" },
        ],
        { duration: 950, easing: "cubic-bezier(0.34,1.56,0.64,1)", composite: "add" },
      )
    }
    window.addEventListener("ts:spotlight", onPulse)
    return () => window.removeEventListener("ts:spotlight", onPulse)
  }, [])

  return (
    <div className={"relative aspect-square " + className} aria-hidden>
      {/* ── Cinematic atmosphere — layered soft glows that fade smoothly into the
          page; deliberately NO bright/hard rim (kills the old "white tube" edge). */}
      {/* outer deep-space halo */}
      <div
        className="absolute -inset-[15%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,120,205,0.24), rgba(74,120,205,0.06) 60%, transparent 80%)",
          filter: "blur(36px)",
        }}
      />
      {/* warm sunrise kiss, upper-left */}
      <div
        className="absolute -inset-[5%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side at 35% 27%, rgba(226,182,112,0.22), transparent 60%)",
          filter: "blur(26px)",
        }}
      />

      {/* ── Floating stack (globe + rings + pins bob together) ─────────────────── */}
      <div ref={stackRef} className="absolute inset-0" style={{ animation: "globeFloat 12s ease-in-out infinite" }}>
        {/* the globe — desktop right limb softly dissolves so it never fights the
            centred headline (pins are a sibling layer and stay crisp). */}
        <div
          className="absolute inset-0 lg:[mask-image:linear-gradient(to_right,black_78%,transparent_99%)] lg:[-webkit-mask-image:linear-gradient(to_right,black_78%,transparent_99%)]"
          style={{ filter: "drop-shadow(0 26px 64px rgba(10,20,37,0.36))" }}
        >
          <Image
            src="/images/hero/globe.webp"
            alt="Interactive globe of TravelSense destinations across Asia"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 46vw"
            className="select-none object-contain"
            draggable={false}
            style={{
              // feather off the asset's baked bright atmosphere limb so the CSS
              // glow above provides a smooth, cinematic edge instead of a "tube"
              maskImage: "radial-gradient(circle closest-side at center, #000 93%, transparent 98.5%)",
              WebkitMaskImage: "radial-gradient(circle closest-side at center, #000 93%, transparent 98.5%)",
            }}
          />
        </div>

        {/* rotating radar sweep anchored at the CENTRE OF INDIA (the globe's centre
            of rotation) — a soft luminous beam that sweeps the whole sphere */}
        <div
          className="absolute inset-0 rounded-full mix-blend-screen"
          style={{
            background:
              "conic-gradient(from 0deg at 47% 49%, transparent 0deg, rgba(255,238,200,0.14) 16deg, rgba(212,168,83,0.07) 42deg, transparent 72deg)",
            animation: "spinSlow 20s linear infinite",
            transformOrigin: "47% 49%",
          }}
        />
        {/* warm core glow pinned at India — the heart the beam radiates from */}
        <div
          className="absolute rounded-full"
          style={{
            left: "47%",
            top: "49%",
            width: "34%",
            height: "34%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(closest-side, rgba(255,226,172,0.18), rgba(212,168,83,0.06) 55%, transparent 75%)",
            filter: "blur(16px)",
            mixBlendMode: "screen",
          }}
        />

        {/* ── Location image-pins (desktop only) — frosted glass chips ────────── */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {PINS.map((pin) => (
            <Link
              key={pin.slug}
              href={`/destinations/${pin.slug}`}
              aria-label={`Explore ${pin.name}`}
              className="pointer-events-auto group absolute"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              {/* ground dot — sits exactly on the location */}
              <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                <span
                  className="block h-[7px] w-[7px] rounded-full bg-white"
                  style={{ animation: "pulseRing 2.8s ease-out infinite", boxShadow: "0 0 0 3px rgba(212,168,83,0.30), 0 0 9px rgba(255,255,255,0.85)" }}
                />
              </span>

              {/* marker chip — rises from the dot, frosted so the globe shows through */}
              <span
                className="absolute left-0 top-0 flex flex-col items-center"
                style={{ transform: "translate(-50%, -100%)", animation: `pinDrop 0.7s cubic-bezier(0.22,1,0.36,1) ${pin.delay}s both` }}
              >
                <span
                  className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2.5 backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.74)",
                    border: "1px solid rgba(255,255,255,0.92)",
                    boxShadow: "0 10px 24px rgba(5,10,20,0.38), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <span className="relative block h-7 w-7 overflow-hidden rounded-full ring-2 ring-white">
                    <Image src={pin.image} alt={pin.name} fill sizes="28px" className="object-cover" draggable={false} />
                  </span>
                  <span className="text-[10.5px] font-body font-semibold leading-none text-primary">{pin.name}</span>
                </span>
                {/* short connector stalk to the ground dot */}
                <span className="mt-1 block w-px" style={{ height: "16px", background: "linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(212,168,83,0.6))" }} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
