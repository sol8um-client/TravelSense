"use client"

/**
 * StaticGlobe - the hero's left-hand showpiece. A single pre-rendered, premium
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
 * Pins are desktop-only (lg+) - on phones/tablets the globe reads as a calm,
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
  /** x / y as a percentage of the globe square - sits on the real country. */
  x: number
  y: number
  delay: number
}

/* Anchors verified against the globe art: north-India, south-India, SE-Asia
   mainland, Indonesia - a clean spread across the visible face. */
const PIN_DEFS: PinDef[] = [
  { slug: "kashmir", x: 43, y: 29, delay: 0.15 }, // Kashmir valley / NW Himalaya (E of Pakistan)
  { slug: "kerala", x: 43, y: 54, delay: 0.4 }, // SW coast - on the west-coast line of the peninsula
  { slug: "thailand", x: 67, y: 51, delay: 0.65 }, // Bangkok / Indochina mainland (on the city lights)
  { slug: "bali", x: 73, y: 69, delay: 0.9 }, // Indonesia (Java/Bali island chain)
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
  // showpieces feel connected - the new card reads as "emerging" from the globe.
  const stackRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onPulse = () => {
      const el = stackRef.current
      if (!el || typeof el.animate !== "function") return
      // A smooth, gentle "swell" - the globe breathes outward a touch then
      // settles, so a freshly-surfaced card reads as emerging FROM the globe.
      // No rotation + no overshoot easing on purpose (those felt like a shake);
      // a soft scale + tiny lift on an ease-in-out curve is calm and premium.
      el.animate(
        [
          { transform: "translateY(0px) scale(1)", easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
          { transform: "translateY(-3px) scale(1.02)", offset: 0.5, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
          { transform: "translateY(0px) scale(1)" },
        ],
        { duration: 1500, composite: "add" },
      )
    }
    window.addEventListener("ts:spotlight", onPulse)
    return () => window.removeEventListener("ts:spotlight", onPulse)
  }, [])

  return (
    <div className={"relative aspect-square " + className} aria-hidden>
      {/* ── Cinematic atmosphere - layered soft glows that fade smoothly into the
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
        {/* the globe - desktop right limb softly dissolves so it never fights the
            centred headline (pins are a sibling layer and stay crisp). */}
        <div
          className="absolute inset-0 lg:[mask-image:linear-gradient(to_right,black_68%,transparent_100%)] lg:[-webkit-mask-image:linear-gradient(to_right,black_68%,transparent_100%)]"
          // NO downward drop-shadow - it pooled into a dark band/"line" under the
          // globe. A faint centred glow only, so the sphere melts into white.
          style={{ filter: "drop-shadow(0 0 28px rgba(10,20,37,0.10))" }}
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
              // Modest brightness for an overall lift; a WIDE feather (85% -> 100%)
              // so the sphere melts softly into the page on every side (kills the
              // sharp rim / hard edge) while still hiding the image's square box.
              filter: "brightness(1.08)",
              maskImage: "radial-gradient(circle closest-side at center, #000 85%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(circle closest-side at center, #000 85%, transparent 100%)",
            }}
          />
        </div>

        {/* lighten the globe overall + EXTRA on the dark lower (ocean) half;
            circular-masked + screen-blended so it only lifts the dark pixels and
            never shows a square edge (client: brighter + lighten the bottom). */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            // Lower peak + a long, multi-stop fade that dies WELL inside the rim
            // (mask 60% -> 95%), so the lower hue has no defined lower boundary -
            // i.e. no "line" under the globe where the lightening used to stop.
            maskImage: "radial-gradient(circle closest-side at center, #000 60%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(circle closest-side at center, #000 60%, transparent 95%)",
            background: "linear-gradient(to bottom, transparent 44%, rgba(150,182,228,0.10) 64%, rgba(150,182,228,0.15) 80%, rgba(150,182,228,0.06) 91%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />

        {/* rotating radar sweep anchored at the CENTRE OF INDIA (the globe's centre
            of rotation) - a soft luminous beam that sweeps the whole sphere */}
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              "conic-gradient(from 0deg at 47% 49%, transparent 0deg, rgba(255,240,205,0.26) 14deg, rgba(212,168,83,0.13) 42deg, transparent 74deg)",
            // Radially fade the sweep so its beam dies out well BEFORE the globe's
            // rim - otherwise the old `rounded-full` hard-clipped it into a sharp
            // rotating arc at the boundary (a "sharp line" on the edge).
            maskImage: "radial-gradient(circle closest-side at center, #000 52%, transparent 88%)",
            WebkitMaskImage: "radial-gradient(circle closest-side at center, #000 52%, transparent 88%)",
            animation: "spinSlow 20s linear infinite",
            transformOrigin: "47% 49%",
          }}
        />
        {/* warm core glow pinned at India - the heart the beam radiates from */}
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

        {/* Slow terminator-style LIGHT SWEEP - a real spin isn't possible with a
            baked sphere image, so a soft light band drifts across the globe to fake
            the planet slowly turning. Masked + clipped to the circle (no square),
            screen-blended so it only lifts, looping seamlessly (off-globe at both
            ends). This is the main "make it feel alive / revolving" motion. */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            maskImage: "radial-gradient(circle closest-side at center, #000 86%, transparent 99%)",
            WebkitMaskImage: "radial-gradient(circle closest-side at center, #000 86%, transparent 99%)",
          }}
        >
          <div
            className="absolute inset-y-0 left-0 w-[55%]"
            style={{
              background:
                "linear-gradient(100deg, transparent 0%, rgba(205,224,255,0.05) 36%, rgba(255,244,220,0.09) 50%, rgba(205,224,255,0.05) 64%, transparent 100%)",
              mixBlendMode: "screen",
              animation: "globeSweep 17s linear infinite",
            }}
          />
        </div>

        {/* twinkling night-side city lights - small pulsing glints over the baked
            city clusters (India + SE Asia) so the globe reads as a LIVE element. */}
        <div className="pointer-events-none absolute inset-0">
          {([
            // Aligned to the globe art's REAL baked city-lights (not random):
            // north-India / Gangetic plain
            [45, 36, 0.2], [48, 34, 1.4], [51, 39, 2.2],
            // eastern China + the bright SE-Asia border cluster
            [66, 40, 0.5], [70, 37, 1.7], [73, 43, 1.0], [68, 46, 2.4],
            // Japan / Korea
            [79, 35, 0.8], [82, 41, 1.9],
            // SE-Asia mainland (Thailand / Indochina)
            [63, 51, 0.4], [67, 54, 1.3], [61, 49, 2.1],
            // Indonesia / Java
            [74, 63, 0.9], [77, 60, 1.6],
          ] as [number, number, number][]).map(([x, y, d], i) => (
            <span
              key={i}
              className="absolute block rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: i % 3 === 0 ? 4 : 3,
                height: i % 3 === 0 ? 4 : 3,
                background: "rgba(255,244,214,1)",
                boxShadow: "0 0 8px 1.5px rgba(255,220,150,0.95)",
                animation: `globeTwinkle 3s ease-in-out ${d}s infinite`,
              }}
            />
          ))}
        </div>
        <style>{`@keyframes globeTwinkle{0%,100%{opacity:.12;transform:scale(.6)}50%{opacity:1;transform:scale(1.15)}}@keyframes globeSweep{0%{transform:translateX(-100%)}100%{transform:translateX(185%)}}`}</style>

        {/* ── Location image-pins (desktop only) - frosted glass chips ────────── */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {PINS.map((pin) => (
            <Link
              key={pin.slug}
              href={`/destinations/${pin.slug}`}
              aria-label={`Explore ${pin.name}`}
              className="pointer-events-auto group absolute"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              {/* ground dot - sits exactly on the location */}
              <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                <span
                  className="block h-[7px] w-[7px] rounded-full bg-white"
                  style={{ animation: "pulseRing 2.8s ease-out infinite", boxShadow: "0 0 0 3px rgba(212,168,83,0.30), 0 0 9px rgba(255,255,255,0.85)" }}
                />
              </span>

              {/* marker chip - rises from the dot, frosted so the globe shows through */}
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
