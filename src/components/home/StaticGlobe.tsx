"use client"

/**
 * StaticGlobe — the hero's left-hand showpiece. Replaces the heavy WebGL Globe3D
 * with a single pre-rendered, premium globe image (Nano-Banana art, India / South
 * Asia centred, night-side city lights) and layers the *motion* on top in CSS so
 * it stays butter-smooth on every device:
 *
 *   • atmospheric GLOW + HUE     — gold (sunrise) ↘ blue (atmosphere) radial washes
 *   • SHADOW                     — soft contact shadow under the sphere
 *   • animated boundary-dot RING — a dashed orbital ring that slowly rotates
 *   • 3–4 location IMAGE-PINS     — real destination photos pinned to the globe,
 *                                   each with a pulsing ground dot + connector stalk
 *   • a gentle float on the whole stack (globeFloat keyframe)
 *
 * Pins are desktop-only (lg+) — on phones/tablets the globe reads as a calm,
 * glowing backdrop behind the headline (no clutter, full legibility).
 *
 * Pin imagery/names come from src/data/destinations.ts by slug, so they stay in
 * sync with the catalogue. Positions are authored as %-of-square against the
 * globe art (India centre, SE-Asia lower-right).
 */

import Image from "next/image"
import Link from "next/link"
import { destinations } from "@/data/destinations"

type PinDef = {
  slug: string
  /** x / y as a percentage of the globe square (matches the art's geography). */
  x: number
  y: number
  /** entrance + float stagger so they don't all bob in unison. */
  delay: number
}

/* Four well-spread anchors across the visible (right) hemisphere of the art. */
const PIN_DEFS: PinDef[] = [
  { slug: "kashmir", x: 49, y: 32, delay: 0.2 }, // north — Himalaya
  { slug: "kerala", x: 47, y: 63, delay: 0.5 }, // south tip
  { slug: "thailand", x: 66, y: 58, delay: 0.8 }, // SE-Asia mainland
  { slug: "bali", x: 75, y: 75, delay: 1.1 }, // Indonesia
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
      {/* ── Atmospheric glow + hue (siblings behind the sphere — never clipped) ── */}
      <div
        className="absolute -inset-[14%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,168,83,0.22), rgba(212,168,83,0) 72%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute -inset-[10%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side at 62% 70%, rgba(64,108,180,0.28), rgba(64,108,180,0) 70%)",
          filter: "blur(24px)",
        }}
      />
      {/* soft contact shadow under the sphere */}
      <div
        className="absolute bottom-[3%] left-1/2 h-[7%] w-[64%] -translate-x-1/2 rounded-[50%]"
        style={{
          background: "radial-gradient(closest-side, rgba(10,20,37,0.30), transparent 75%)",
          filter: "blur(10px)",
        }}
      />

      {/* ── The floating stack (globe + rings + pins all bob together) ─────────── */}
      <div className="absolute inset-0" style={{ animation: "globeFloat 11s ease-in-out infinite" }}>
        {/* animated boundary-dot orbital rings */}
        <div
          className="absolute inset-[-3%] rounded-full"
          style={{
            border: "1.5px dotted rgba(212,168,83,0.30)",
            animation: "spinSlow 90s linear infinite",
          }}
        />
        <div
          className="absolute inset-[1.5%] rounded-full"
          style={{
            border: "1px dashed rgba(126,160,214,0.22)",
            animation: "spinReverse 120s linear infinite",
          }}
        />

        {/* the globe itself — on desktop its right limb softly dissolves so it
            never fights the centred headline (pins live in a sibling layer and
            stay crisp). */}
        <div
          className="absolute inset-0 lg:[mask-image:linear-gradient(to_right,black_70%,transparent_99%)] lg:[-webkit-mask-image:linear-gradient(to_right,black_70%,transparent_99%)]"
          style={{ filter: "drop-shadow(0 26px 60px rgba(10,20,37,0.34))" }}
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

        {/* rim light sweep — faint sheen that rotates for life */}
        <div
          className="absolute inset-0 rounded-full mix-blend-screen"
          style={{
            background:
              "conic-gradient(from 210deg, transparent 0deg, rgba(255,238,200,0.10) 26deg, transparent 70deg)",
            animation: "spinSlow 24s linear infinite",
          }}
        />

        {/* ── Location image-pins (desktop only) ─────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {PINS.map((pin) => (
            <Link
              key={pin.slug}
              href={`/destinations/${pin.slug}`}
              aria-label={`Explore ${pin.name}`}
              className="pointer-events-auto group absolute"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              {/* pulsing ground dot — anchored exactly at the location */}
              <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                <span
                  className="block h-[9px] w-[9px] rounded-full bg-accent"
                  style={{ animation: "pulseRing 2.6s ease-out infinite", boxShadow: "0 0 8px rgba(212,168,83,0.9)" }}
                />
              </span>

              {/* marker — grows UP from the dot (bottom of marker = the dot) */}
              <span
                className="absolute left-0 top-0 flex flex-col items-center"
                style={{
                  transform: "translate(-50%, -100%)",
                  animation: `pinDrop 0.7s cubic-bezier(0.22,1,0.36,1) ${pin.delay}s both`,
                }}
              >
                {/* circular destination thumbnail */}
                <span
                  className="relative block h-[52px] w-[52px] overflow-hidden rounded-full ring-2 ring-white/90 transition-transform duration-300 group-hover:scale-110"
                  style={{ boxShadow: "0 10px 26px rgba(10,20,37,0.45)" }}
                >
                  <Image
                    src={pin.image}
                    alt={pin.name}
                    fill
                    sizes="52px"
                    className="object-cover"
                    draggable={false}
                  />
                </span>
                {/* name chip */}
                <span className="mt-1.5 whitespace-nowrap rounded-full glass-pill px-2.5 py-1 text-[10.5px] font-body font-semibold text-primary">
                  {pin.name}
                </span>
                {/* connector stalk: thumbnail → ground dot */}
                <span
                  className="mt-1 block w-px bg-gradient-to-b from-white/70 to-accent/80"
                  style={{ height: "26px" }}
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
