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
  { slug: "kashmir", x: 40, y: 33, delay: 0.15 }, // far-north India / Himalaya
  { slug: "kerala", x: 40, y: 53, delay: 0.4 }, // south-west coast
  { slug: "thailand", x: 61, y: 51, delay: 0.65 }, // Indochina mainland
  { slug: "bali", x: 73, y: 73, delay: 0.9 }, // Indonesia
]

type Pin = PinDef & { name: string; image: string }

const PINS: Pin[] = PIN_DEFS.flatMap((p) => {
  const d = destinations.find((dest) => dest.slug === p.slug)
  if (!d) return []
  return [{ ...p, name: d.name, image: d.heroImage }]
})

export default function StaticGlobe({ className = "" }: { className?: string }) {
  return (
    <div className={"relative aspect-square " + className} aria-hidden>
      {/* ── Cinematic atmosphere: large soft glow the rim melts into ─────────── */}
      <div
        className="absolute -inset-[18%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(80,128,205,0.26), rgba(80,128,205,0.07) 58%, transparent 78%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute -inset-[8%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side at 38% 30%, rgba(224,180,110,0.26), transparent 62%)",
          filter: "blur(22px)",
        }}
      />
      {/* tight rim halo that hugs the sphere edge for a glowing limb */}
      <div
        className="absolute -inset-[1.5%] rounded-full"
        style={{
          background: "radial-gradient(closest-side, transparent 92%, rgba(150,190,255,0.35) 99%, transparent 100%)",
          filter: "blur(4px)",
        }}
      />
      {/* soft contact shadow under the sphere */}
      <div
        className="absolute bottom-[2%] left-1/2 h-[7%] w-[62%] -translate-x-1/2 rounded-[50%]"
        style={{
          background: "radial-gradient(closest-side, rgba(10,20,37,0.32), transparent 75%)",
          filter: "blur(12px)",
        }}
      />

      {/* ── Floating stack (globe + rings + pins bob together) ─────────────────── */}
      <div className="absolute inset-0" style={{ animation: "globeFloat 12s ease-in-out infinite" }}>
        {/* slow dotted orbital "boundary" rings */}
        <div
          className="absolute inset-[-2.5%] rounded-full"
          style={{ border: "1.5px dotted rgba(212,168,83,0.26)", animation: "spinSlow 100s linear infinite" }}
        />
        <div
          className="absolute inset-[2%] rounded-full"
          style={{ border: "1px dashed rgba(150,190,255,0.18)", animation: "spinReverse 130s linear infinite" }}
        />

        {/* the globe — desktop right limb softly dissolves so it never fights the
            centred headline (pins are a sibling layer and stay crisp). */}
        <div
          className="absolute inset-0 lg:[mask-image:linear-gradient(to_right,black_78%,transparent_99%)] lg:[-webkit-mask-image:linear-gradient(to_right,black_78%,transparent_99%)]"
          style={{ filter: "drop-shadow(0 26px 64px rgba(10,20,37,0.36))" }}
        >
          <Image
            src="/images/hero/globe.png"
            alt="Interactive globe of TravelSense destinations across Asia"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 46vw"
            className="select-none object-contain"
            draggable={false}
          />
        </div>

        {/* faint conic rim sweep for life */}
        <div
          className="absolute inset-0 rounded-full mix-blend-screen"
          style={{
            background: "conic-gradient(from 210deg, transparent 0deg, rgba(255,238,200,0.09) 24deg, transparent 64deg)",
            animation: "spinSlow 26s linear infinite",
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
                    background: "rgba(10,18,33,0.42)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    boxShadow: "0 8px 22px rgba(5,10,20,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  <span className="relative block h-7 w-7 overflow-hidden rounded-full ring-1 ring-white/45">
                    <Image src={pin.image} alt={pin.name} fill sizes="28px" className="object-cover" draggable={false} />
                  </span>
                  <span className="text-[10.5px] font-body font-semibold leading-none text-white/95">{pin.name}</span>
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
