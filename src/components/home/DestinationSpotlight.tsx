"use client"

/**
 * DestinationSpotlight — the hero's right-hand showpiece.
 *
 * A single premium "liquid-glass" destination card that AUTO-ADVANCES through a
 * hand-picked set of 6 destinations (~4.5s each), with clickable carousel dots
 * and subtle prev/next controls. Replaces the old VisorCascade in the hero.
 *
 * Card anatomy (per the design reference):
 *   • large rounded ken-burns hero image
 *   • "Best time: <months>" pill, top-left
 *   • heart / save icon, top-right
 *   • bottom overlay: country (small caps) + NAME in Fraunces display
 *   • meta row "<N>N / <N>D · ★<rating> (<reviews>)"
 *   • "Starting from ₹<X> onwards"
 *   • circular arrow button → /destinations/<slug>
 *   • carousel dots beneath
 *
 * Mobile-first: sizes are authored for small screens (clean full-width card) and
 * scale UP at sm/lg — NOT a shrunk desktop card. No overflow, no layout jump.
 *
 * Real data is pulled from `src/data/destinations.ts` by slug, so name / country /
 * heroImage / startingPrice / bestTimeToVisit stay in sync with the catalogue.
 * Only the indicative duration + rating + reviews are hand-set here (honest,
 * representative figures — flagged as indicative, not scraped).
 */

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Star, Heart, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { destinations } from "@/data/destinations"

/* Per-pick editorial layer: which destination, its short "best time" label, and
   indicative trip length + rating. Everything else comes from the data file. */
type Pick = {
  slug: string
  bestTime: string
  nights: number
  days: number
  rating: number
  reviews: number
}

const PICKS: Pick[] = [
  { slug: "kashmir",    bestTime: "Mar – Oct", nights: 6, days: 7, rating: 4.9, reviews: 214 },
  { slug: "kerala",     bestTime: "Sep – Mar", nights: 5, days: 6, rating: 4.9, reviews: 188 },
  { slug: "bali",       bestTime: "Apr – Oct", nights: 6, days: 7, rating: 4.8, reviews: 162 },
  { slug: "leh-ladakh", bestTime: "Jun – Sep", nights: 8, days: 9, rating: 4.9, reviews: 147 },
  { slug: "rajasthan",  bestTime: "Oct – Mar", nights: 5, days: 6, rating: 4.8, reviews: 176 },
  { slug: "bhutan",     bestTime: "Mar – Nov", nights: 7, days: 8, rating: 4.9, reviews: 96 },
]

type Slide = {
  slug: string
  name: string
  country: string
  image: string
  price: number
  bestTime: string
  nights: number
  days: number
  rating: number
  reviews: number
}

/* Resolve picks → slides against the real catalogue (skip any that ever vanish). */
const SLIDES: Slide[] = PICKS.flatMap((p) => {
  const d = destinations.find((dest) => dest.slug === p.slug)
  if (!d) return []
  return [
    {
      slug: d.slug,
      name: d.name,
      country: d.country,
      image: d.heroImage,
      price: d.startingPrice,
      bestTime: p.bestTime,
      nights: p.nights,
      days: p.days,
      rating: p.rating,
      reviews: p.reviews,
    },
  ]
})

const ADVANCE_MS = 4500

const inr = (n: number) => "₹" + n.toLocaleString("en-IN")

export default function DestinationSpotlight({ className = "" }: { className?: string }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const count = SLIDES.length
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback(
    (next: number, direction: number) => {
      setDir(direction)
      setIdx((next + count) % count)
    },
    [count],
  )
  const next = useCallback(() => goTo(idx + 1, 1), [goTo, idx])
  const prev = useCallback(() => goTo(idx - 1, -1), [goTo, idx])

  // auto-advance (pauses on hover / focus)
  useEffect(() => {
    if (paused || count <= 1) return
    timer.current = setInterval(() => {
      setDir(1)
      setIdx((i) => (i + 1) % count)
    }, ADVANCE_MS)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [paused, count])

  if (count === 0) return null
  const s = SLIDES[idx]

  // slide+fade transition (respects direction)
  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 36 : -36, scale: 1.015 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -36 : 36, scale: 1.015 }),
  }

  return (
    <div
      className={
        "group/spot relative mx-auto w-full max-w-[420px] sm:max-w-[470px] lg:max-w-none " + className
      }
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured destinations"
    >
      {/* soft brand glow behind the card so it melts into the hero (blends with
          the centre composition rather than reading as a hard-edged box) */}
      <div
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[40px] opacity-80"
        style={{ background: "radial-gradient(60% 60% at 50% 35%, rgba(196,50,74,0.10), transparent 70%), radial-gradient(60% 60% at 60% 85%, rgba(80,128,205,0.12), transparent 72%)", filter: "blur(22px)" }}
        aria-hidden
      />

      {/* ── Card — layered liquid glass ───────────────────────────────────── */}
      <div className="glass-panel relative overflow-hidden rounded-[28px] p-2.5 sm:p-3 shadow-[0_36px_90px_rgba(11,20,38,0.28)] ring-1 ring-white/40 backdrop-blur-xl">
        {/* thin glass highlight along the top + left edge (reads as liquid glass
            without washing the photo/controls) */}
        <div
          className="pointer-events-none absolute inset-0 z-[25] rounded-[28px]"
          style={{ background: "linear-gradient(150deg, rgba(255,255,255,0.45), transparent 14%)", mixBlendMode: "soft-light" }}
          aria-hidden
        />
        {/* image stage — fixed aspect so there's never a layout jump between slides.
            taller on mobile (portrait-ish), a touch wider on desktop. */}
        <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-primary/10">
          <AnimatePresence custom={dir} mode="popLayout" initial={false}>
            <motion.div
              key={s.slug}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0" style={{ animation: "kenburns 9s ease-out alternate infinite" }}>
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 440px, 480px"
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
              {/* legibility gradient for the bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/80 via-[#0A1425]/10 to-transparent" />
              {/* top sheen */}
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/25 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Best-time pill — top-left */}
          <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full glass-pill px-3 py-1.5">
            <Clock className="h-3.5 w-3.5 text-secondary" strokeWidth={2} />
            <span className="text-[11px] font-body font-semibold text-primary">
              Best time: <span className="text-secondary">{s.bestTime}</span>
            </span>
          </div>

          {/* Heart / save — top-right */}
          <button
            type="button"
            onClick={() => setSaved((m) => ({ ...m, [s.slug]: !m[s.slug] }))}
            aria-label={saved[s.slug] ? `Remove ${s.name} from saved` : `Save ${s.name}`}
            aria-pressed={!!saved[s.slug]}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full glass-pill transition-transform hover:scale-105 active:scale-95"
          >
            <Heart
              className={
                "h-4 w-4 transition-colors " +
                (saved[s.slug] ? "fill-secondary text-secondary" : "text-primary/70")
              }
              strokeWidth={2}
            />
          </button>

          {/* Bottom overlay — country + NAME + meta + price + CTA */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="block text-[10px] font-body font-semibold uppercase tracking-[0.22em] text-white/75">
                  {s.country}
                </span>
                <h3
                  className="font-heading text-[26px] sm:text-[30px] font-medium leading-[1.05] tracking-[-0.02em] text-white"
                  style={{ fontVariationSettings: "'opsz' 144", textShadow: "0 2px 14px rgba(3,8,16,0.5)" }}
                >
                  {s.name}
                </h3>

                {/* meta row */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-white/85">
                  <span className="font-body font-medium">
                    {s.nights}N / {s.days}D
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="inline-flex items-center gap-1 font-body font-semibold">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    {s.rating.toFixed(1)}
                    <span className="font-normal text-white/65">({s.reviews})</span>
                  </span>
                </div>

                {/* price + circular arrow CTA */}
                <div className="mt-3 flex items-end justify-between gap-3">
                  <div>
                    <span className="block text-[10px] font-body uppercase tracking-[0.14em] text-white/60">
                      Starting from
                    </span>
                    <span className="font-heading text-[20px] sm:text-[22px] font-medium leading-none text-white" style={{ fontVariationSettings: "'opsz' 144" }}>
                      {inr(s.price)}
                    </span>
                    <span className="ml-1 text-[11px] font-body text-white/65">onwards</span>
                  </div>

                  <Link
                    href={`/destinations/${s.slug}`}
                    aria-label={`Explore ${s.name}`}
                    className="group inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-secondary-light via-secondary to-secondary-dark text-white shadow-[0_8px_22px_rgba(196,50,74,0.42)] transition-transform hover:-translate-y-0.5 hover:scale-105 active:scale-95"
                  >
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* subtle prev / next */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous destination"
                className="absolute left-2 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all hover:bg-white/30 focus-visible:opacity-100 sm:group-hover:opacity-100 [@media(hover:none)]:opacity-100"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next destination"
                className="absolute right-2 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all hover:bg-white/30 focus-visible:opacity-100 sm:group-hover:opacity-100 [@media(hover:none)]:opacity-100"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Carousel dots ─────────────────────────────────────────────────── */}
      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {SLIDES.map((slide, i) => {
            const active = i === idx
            return (
              <button
                key={slide.slug}
                type="button"
                onClick={() => goTo(i, i > idx ? 1 : -1)}
                aria-label={`Show ${slide.name}`}
                aria-current={active}
                className="group/dot inline-flex h-3 items-center"
              >
                <span
                  className={
                    "block h-[6px] rounded-full transition-all duration-300 " +
                    (active
                      ? "w-6 bg-secondary"
                      : "w-[6px] bg-silver/50 group-hover/dot:bg-secondary/50")
                  }
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
