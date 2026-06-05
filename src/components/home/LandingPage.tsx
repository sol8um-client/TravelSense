"use client"

import { useState, useEffect, useRef, useCallback, useId } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useVelocity,
} from "framer-motion"
import { useParallax, useSectionZoom, useStaggerReveal } from "@/hooks/useScrollAnimations"
import {
  Palmtree,
  Mountain,
  MapPin,
  ArrowRight,
  Phone,
  PhoneOff,
  Bot,
  Users,
  MessageCircle,
  HeartHandshake,
  Sparkles,
  Glasses,
  ShoppingBag,
  Star,
  BadgeCheck,
  Send,
  Check,
  CheckCircle,
  ChevronRight,
  Layers,
  SearchX,
  EyeOff,
  BookOpenCheck,
  MessageSquare,
  Ticket,
  Compass,
  Shield,
  Heart,
  Cpu,
  Plane,
  Train,
  Sailboat,
  Landmark,
  Backpack,
  MapPinned,
  Waves,
  Umbrella,
  Hotel,
  DollarSign,
  Globe,
  Handshake,
  Zap,
  Clock,
  TrendingUp,
  Eye,
  KeyRound,
  CreditCard,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { use3DTilt } from "@/hooks/use3DTilt"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"
import DestinationSpotlight from "./DestinationSpotlight"
import StaticGlobe from "./StaticGlobe"
import ARVRBanner from "./ARVRBanner"
import { searchIndex } from "@/data/searchIndex"

/* ─── Hooks ─── */

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal],[data-reveal-left],[data-reveal-right],[data-reveal-scale]")
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("revealed") }
      }),
      { threshold: 0.08, rootMargin: "-40px" }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function useCounter(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 4)
      setCount(Math.floor(ease * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])
  return { ref, count }
}

/* ─── Scroll Progress — brand gradient ─── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, #C4324A, #B0B8C4, #C4324A)",
        }}
      />
      {/* Glowing dot at the leading edge */}
      <motion.div
        className="fixed top-[-2px] h-[6px] w-[6px] rounded-full z-[61]"
        style={{
          left: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
          background: "#C4324A",
          boxShadow: "0 0 8px rgba(196, 50, 74, 0.7), 0 0 16px rgba(196, 50, 74, 0.4)",
        }}
      />
    </>
  )
}

/* ─── Tilt Card wrapper ─── */

function TiltCard({ children, className, strength = 6 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const { ref, style, handleMouseMove, handleMouseLeave } = use3DTilt(strength)
  return (
    <div ref={ref} style={style} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className}>
      {children}
    </div>
  )
}

/* ─── Word-by-word reveal text ─── */

function RevealText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const words = text.split(" ")
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   1. HERO — Cinematic, full-screen with 3D globe
   ═══════════════════════════════════════════════════════════════ */

const heroWords = ["Your Way", "Your Story", "Your Pace"]

// Cities that flip in the hero headline ("Discover <city>, your way.")
// Popular, focused destinations only (no broad states) — keeps the headline
// punchy and short enough never to crowd the visor on the right.
const heroCities = ["Bali", "Goa", "Dubai", "Jaipur", "Kashmir", "Kerala", "Ladakh", "Udaipur"]

// Quick-pick favourites under the planner — all resolve to real destination pages
const heroFavourites: { name: string; slug: string }[] = [
  { name: "Goa", slug: "goa" },
  { name: "Bali", slug: "bali" },
  { name: "Kashmir", slug: "kashmir" },
  { name: "Kerala", slug: "kerala" },
  { name: "Ladakh", slug: "leh-ladakh" },
  { name: "Dubai", slug: "dubai-uae" },
]

// Rotating "live presence" social-proof pill above the headline
const heroPresence: { name: string; verb: string; place: string }[] = [
  { name: "Aanya", verb: "is planning", place: "Bali" },
  { name: "Rohan", verb: "just booked", place: "Kashmir" },
  { name: "Meera", verb: "reached out about", place: "Kerala" },
  { name: "Arjun", verb: "is dreaming of", place: "Ladakh" },
  { name: "Priya", verb: "just returned from", place: "Dubai" },
  { name: "Kabir", verb: "enquired about", place: "Jaipur" },
  { name: "Sara", verb: "is exploring", place: "Vietnam" },
  { name: "Dev", verb: "just confirmed", place: "Andaman" },
  { name: "Ishaan", verb: "is comparing", place: "Singapore" },
]

/* Rotating word with a CSS-only crossfade.
   Deliberately NOT framer-motion + AnimatePresence here: framer adds
   will-change/transform and remounts the node every cycle, which intermittently
   produces an EMPTY composite layer in Chrome — the large Fraunces headline word
   silently went invisible (verified live on the deployed hero). A single
   PERSISTENT node with a plain opacity transition paints reliably. */
function RotatingWord({
  words,
  interval = 2600,
  suffix = "",
  className = "",
  style,
}: {
  words: string[]
  interval?: number
  suffix?: string
  className?: string
  style?: React.CSSProperties
}) {
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState(true)
  useEffect(() => {
    const t = setInterval(() => {
      setShown(false)
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % words.length)
        setShown(true)
      }, 200)
    }, interval)
    return () => clearInterval(t)
  }, [interval, words.length])
  return (
    <em
      className={className}
      style={{ display: "inline-block", opacity: shown ? 1 : 0, transition: "opacity 0.22s ease", ...style }}
    >
      {words[idx]}
      {suffix}
    </em>
  )
}

function LivePresence() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % heroPresence.length), 3000)
    return () => clearInterval(t)
  }, [])
  const cur = heroPresence[i]
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="mx-auto mb-6 inline-flex items-center gap-2.5 rounded-full border border-silver/15 bg-white/80 px-3 py-1.5 text-[12px] sm:text-[13px] shadow-[0_4px_20px_rgba(11,20,38,0.06)] backdrop-blur-xl"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      <span className="text-foreground/55 font-body">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="inline-block"
          >
            <span className="font-semibold text-primary">{cur.name}</span> {cur.verb}{" "}
            <span className="font-script text-[1.35em] leading-none text-secondary">{cur.place}</span>
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
        Live
      </span>
    </motion.div>
  )
}

function HeroPlanner() {
  const [dest, setDest] = useState("")
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const router = useRouter()
  const leadModal = useLeadModal()

  const q = dest.trim().toLowerCase()
  const matches = q
    ? searchIndex
        .filter((e) => e.label.toLowerCase().includes(q) || e.sub.toLowerCase().includes(q))
        .sort((a, b) => {
          // destinations first, then prioritise label-starts-with matches
          if (a.type !== b.type) return a.type === "Destination" ? -1 : 1
          const as = a.label.toLowerCase().startsWith(q) ? 0 : 1
          const bs = b.label.toLowerCase().startsWith(q) ? 0 : 1
          return as - bs
        })
        .slice(0, 7)
    : []

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (matches.length) go(matches[Math.min(active, matches.length - 1)].href)
    else if (q) router.push("/destinations")
    else leadModal.open("hero-planner")
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!matches.length) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => (a + 1) % matches.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => (a - 1 + matches.length) % matches.length)
    }
  }

  return (
    <motion.div
      className="relative mx-auto mt-9 max-w-2xl"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <form
        onSubmit={onSubmit}
        className="relative flex items-center gap-2 rounded-full border border-silver/15 bg-white p-1.5 pl-4 shadow-[0_8px_30px_rgba(11,20,38,0.10)] transition-shadow duration-300 focus-within:shadow-[0_10px_40px_rgba(11,20,38,0.16)]"
      >
        <MapPin className="h-4 w-4 shrink-0 text-secondary" />
        <input
          value={dest}
          onChange={(e) => {
            setDest(e.target.value)
            setOpen(true)
            setActive(0)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKeyDown}
          placeholder="Where to? Bali, Kashmir, Dubai…"
          aria-label="Where do you want to travel?"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-2 text-[14px] text-foreground placeholder:text-foreground/40 focus:outline-none"
        />
        <button
          type="submit"
          className="metallic-cta group inline-flex shrink-0 items-center gap-2 px-5 h-[42px] text-[13px] font-body font-semibold text-white tracking-[0.01em] cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            Plan my trip
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5 duration-300" />
          </span>
        </button>
      </form>

      {/* Live suggestions — real destinations & packages from the catalogue */}
      {open && matches.length > 0 && (
        <div className="absolute inset-x-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-silver/15 bg-white py-1.5 text-left shadow-[0_18px_50px_rgba(11,20,38,0.18)]">
          {matches.map((m, i) => (
            <button
              key={m.href}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                go(m.href)
              }}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "flex w-full items-center justify-between gap-3 px-4 py-2.5 transition-colors",
                i === active ? "bg-secondary/[0.06]" : "hover:bg-muted/60",
              )}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary/70" />
                <span className="truncate text-[14px] text-foreground">{m.label}</span>
              </span>
              <span className="shrink-0 text-[10.5px] uppercase tracking-[0.12em] text-foreground/40">
                {m.type === "Destination" ? "Destination" : m.sub}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* No-result CTA — visitor typed a real query but nothing in the catalogue
          matches. Capture the demand with a WhatsApp "Talk to an expert" pill
          instead of dead-ending. Mirrors the dropdown's glass/rounded styling. */}
      {open && q.length >= 2 && matches.length === 0 && (
        <div className="absolute inset-x-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-silver/15 bg-white px-4 py-3.5 text-left shadow-[0_18px_50px_rgba(11,20,38,0.18)]">
          <p className="flex items-start gap-2.5 text-[13.5px] leading-snug text-foreground/65">
            <SearchX className="mt-0.5 h-4 w-4 shrink-0 text-secondary/70" strokeWidth={1.6} />
            <span>
              No trips matching{" "}
              <span className="font-semibold text-foreground">&ldquo;{dest.trim()}&rdquo;</span> yet.
            </span>
          </p>
          <WhatsAppLink
            source="hero-search-no-result"
            message={`Hi TravelSense! I was looking for "${dest.trim()}" but didn't find it — can you help me plan it?`}
            onMouseDown={(e) => e.preventDefault()}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-secondary-light via-secondary to-secondary-dark px-4 py-2 text-[12.5px] font-body font-semibold text-white shadow-[0_6px_16px_rgba(196,50,74,0.28)] transition-transform hover:-translate-y-0.5"
          >
            Talk to an expert
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
          </WhatsAppLink>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="script text-[15px] text-foreground/40">or pick a favourite —</span>
        {heroFavourites.map((f) => (
          <Link
            key={f.slug}
            href={`/destinations/${f.slug}`}
            className="rounded-full border border-silver/15 bg-white/70 px-3.5 py-1.5 text-[12.5px] font-body text-foreground/70 backdrop-blur-sm transition-all hover:border-secondary/30 hover:text-secondary hover:shadow-sm"
          >
            {f.name}
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

/* Floating travel icon particles — brand-colored */
const floatingIconData: { Icon: LucideIcon; x: number; y: number; dur: number; delay: number; color: string }[] = [
  { Icon: Plane, x: 10, y: 82, dur: 16, delay: 0, color: "text-secondary/20" },
  { Icon: Mountain, x: 85, y: 78, dur: 18, delay: 2, color: "text-silver/25" },
  { Icon: Palmtree, x: 25, y: 88, dur: 20, delay: 4, color: "text-secondary/15" },
  { Icon: Landmark, x: 50, y: 80, dur: 19, delay: 3, color: "text-silver/20" },
]

function FloatingTravelIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {floatingIconData.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -350, -700],
            x: [0, i % 2 === 0 ? 40 : -40, i % 3 === 0 ? -25 : 25],
            opacity: [0, 0.25, 0],
            rotate: [0, i % 2 === 0 ? 20 : -20, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/50 border border-silver/10 backdrop-blur-sm shadow-sm">
            <p.Icon className={cn("h-4 w-4", p.color)} strokeWidth={1.5} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* Constellation star field — brand colored */
function ConstellationField() {
  const stars = Array.from({ length: 16 }, (_, i) => {
    const seed = (i * 2654435761) >>> 0
    const s1 = ((seed * 16807) % 2147483647) / 2147483647
    const s2 = ((seed * 48271) % 2147483647) / 2147483647
    const s3 = ((seed * 69621) % 2147483647) / 2147483647
    const s4 = ((seed * 39916801) % 2147483647) / 2147483647
    const s5 = ((seed * 5764801) % 2147483647) / 2147483647
    return { x: s1 * 100, y: s2 * 100, size: 0.5 + s3 * 2, delay: s4 * 5, dur: 3 + s5 * 4 }
  })
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className={cn("absolute rounded-full", i % 3 === 0 ? "bg-secondary/[0.05]" : i % 3 === 1 ? "bg-silver/[0.06]" : "bg-primary/[0.04]")}
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.02, 0.1, 0.02], scale: [1, 1.8, 1] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center justify-center bg-brand-mesh pt-24 pb-12 overflow-visible">
      {/* 1. Soft brand-color washes — STATIC on purpose. Animating 180–200px blurs
             re-rasterizes the whole layer every frame and was the main hero lag. */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] right-[5%] h-[500px] w-[500px] rounded-full bg-secondary/[0.04] blur-[110px]" />
        <div className="absolute bottom-[5%] left-[0%] h-[400px] w-[400px] rounded-full bg-silver/[0.06] blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] h-[600px] w-[600px] rounded-full bg-primary/[0.02] blur-[120px]" />
      </div>

      {/* 2. Dot grid pattern — only on right half, faded in with mask so no hard edge */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #B0B8C4 1px, transparent 1px)", backgroundSize: "32px 32px", maskImage: "linear-gradient(to right, transparent 35%, black 55%)", WebkitMaskImage: "linear-gradient(to right, transparent 35%, black 55%)" }} />

      {/* 3. Constellation star field — only on right/content side, faded */}
      <div style={{ maskImage: "linear-gradient(to right, transparent 30%, black 50%)", WebkitMaskImage: "linear-gradient(to right, transparent 30%, black 50%)" }}>
        <ConstellationField />
      </div>

      {/* 4. Floating travel icon particles */}
      <FloatingTravelIcons />

      {/* 5. Static globe (Nano-Banana art + CSS motion, no WebGL) — all sizes.
             Mobile/tablet: a calm, glowing backdrop centred behind the text.
             Desktop (lg+): present on the LEFT with live location image-pins. */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <StaticGlobe
          className="absolute left-1/2 top-1/2 w-[155%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.4]
                     sm:w-[120%] sm:opacity-[0.46]
                     md:w-[92%] md:opacity-[0.55]
                     lg:left-0 lg:top-1/2 lg:h-[126%] lg:w-auto lg:-translate-x-[30%] lg:-translate-y-1/2 lg:opacity-100"
        />
      </div>

      {/* 7. Destination spotlight — auto-advancing showcase card in the right
             margin (xl+), vertically centred to complement the globe on the left.
             Below xl it's rendered full-width inside the content flow instead. */}
      <div className="pointer-events-auto absolute right-[3%] top-1/2 z-20 hidden w-[400px] -translate-y-1/2 xl:block 2xl:right-[5.5%] 2xl:w-[440px]">
        <DestinationSpotlight />
      </div>

      {/* Content — text shadow on mobile ensures readability over globe */}
      <motion.div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center [text-shadow:0_1px_8px_rgba(255,255,255,0.8)] lg:[text-shadow:none]" style={{ y: contentY, opacity: contentOpacity }}>
        {/* Live presence pill — rotating social proof */}
        <LivePresence />

        {/* Eyebrow — provenance line (design handoff) */}
        <p className="mb-3.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.28em] text-secondary">
          India · Asia · Europe <span className="mx-0.5 text-secondary/55">&bull;</span> Curated since 2018
        </p>

        {/* Main headline — "Wake up in <rotating destination>." solid navy Fraunces,
            city in red italic. Destination cycles through heroCities. */}
        <h1 className="font-heading text-[2.1rem] sm:text-[2.85rem] md:text-[3.4rem] lg:text-[3.85rem] font-medium leading-[1.04] tracking-[-0.025em] text-[#0A1425]">
          <span>Wake up in</span>
          <br />
          <span className="relative inline-block align-baseline">
            <RotatingWord
              words={heroCities}
              interval={2600}
              suffix="."
              className="flip-word whitespace-nowrap italic font-normal text-secondary pl-[0.04em] pr-[0.1em]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            />
          </span>
        </h1>

        {/* Subtitle — Outfit body with Caveat script lift */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-7 text-[15px] sm:text-[17px] leading-[1.7] text-foreground/70 max-w-xl mx-auto font-normal"
        >
          <span className="script text-[22px] sm:text-[26px] text-secondary/90 align-middle mr-1">One conversation</span>
          &mdash; zero bots, zero IVR. A real expert plans, books and stays with you the whole trip.
        </motion.p>

        {/* Planner — search + quick-pick favourites (replaces the old tagline + CTA buttons) */}
        <HeroPlanner />

        {/* Mobile/tablet only: the spotlight as a clean full-width card below the
            headline (desktop gets the right-margin version, hidden below xl). */}
        <div className="mx-auto mt-10 w-full max-w-[470px] xl:hidden">
          <DestinationSpotlight />
        </div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   2. TRUST BAR — slim stat strip + "Recently planned" marquee
      (faithful port of the prototype `TrustBar` in home-sections-c.jsx)
   ═══════════════════════════════════════════════════════════════ */

const TRUST_STATS: [string, string][] = [
  ["500+", "Happy travellers"],
  ["50+", "Destinations"],
  ["4.9★", "Avg rating"],
  ["24/7", "Human support"],
]

/* Recently-planned ticker — drawn from our real traveller stories. */
const RECENT_TRIPS: { who: string; trip: string; rating: string }[] = [
  { who: "Priya S.", trip: "Kerala · 6 days", rating: "5.0" },
  { who: "Rahul D.", trip: "Ladakh · 9 days", rating: "4.9" },
  { who: "Ananya K.", trip: "Bali · 8 days", rating: "5.0" },
  { who: "Vikram M.", trip: "Rajasthan · 5 days", rating: "4.8" },
  { who: "Meera T.", trip: "Goa · 4 days", rating: "5.0" },
  { who: "Dev R.", trip: "Kashmir · 7 days", rating: "4.9" },
]

function TrustBarSection() {
  return (
    <section className="bg-white py-[30px] border-t border-b border-silver/[0.18]">
      <div className="mx-auto max-w-[1180px] px-8 flex flex-wrap items-center justify-between gap-9">
        {/* stat cluster */}
        <div className="flex flex-wrap gap-x-[34px] gap-y-4">
          {TRUST_STATS.map(([n, l], i) => (
            <motion.div
              key={l}
              className="flex flex-col"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-heading text-[25px] font-medium leading-none tracking-[-0.02em] text-primary" style={{ fontVariationSettings: "'opsz' 144" }}>{n}</span>
              <span className="mt-[5px] text-[10.5px] tracking-[0.02em] text-muted-foreground">{l}</span>
            </motion.div>
          ))}
        </div>

        {/* "Recently planned" marquee */}
        <motion.div
          className="flex min-w-[280px] flex-1 items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          <span className="inline-flex shrink-0 items-center gap-[7px] whitespace-nowrap font-tech text-[8.5px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1F8A5B]" style={{ boxShadow: "0 0 0 3px rgba(31,138,91,0.18)" }} />
            Recently planned
          </span>
          <div
            className="flex-1 overflow-hidden"
            style={{
              maskImage: "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
            }}
          >
            <div className="flex w-max gap-3" style={{ animation: "marqueeX 32s linear infinite" }}>
              {[...RECENT_TRIPS, ...RECENT_TRIPS].map((r, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-silver/25 bg-silver-mist px-[13px] py-[7px]"
                >
                  <span className="text-[12.5px] font-semibold text-primary">{r.who}</span>
                  <span className="text-[12px] text-muted-foreground">{r.trip}</span>
                  <span className="inline-flex items-center gap-[3px] text-[11px] font-semibold text-secondary">
                    <Star className="h-[11px] w-[11px] fill-secondary text-secondary" />
                    {r.rating}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3a. PROBLEM — The fragmented travel story
   ═══════════════════════════════════════════════════════════════ */

/* ─── Chaos Collage Problem Section data ─── */
const problems = [
  {
    Icon: SearchX,
    tag: "AA 1247",
    stamp: "OVERBOOKED",
    title: "Five apps. One trip.",
    body: "Flights here, hotels there, activities on a third screen. You're not travelling — you're project-managing.",
    fix: "One thread. One human. Done.",
  },
  {
    Icon: EyeOff,
    tag: "6E 204",
    stamp: "UPSOLD",
    title: "Algorithms don't listen.",
    body: "\u201CBest for you\u201D means best for their margin. Nobody asks what kind of traveller you actually are.",
    fix: "Your own expert. Who actually asks.",
  },
  {
    Icon: DollarSign,
    tag: "UK 945",
    stamp: "SURPRISE",
    title: "Hidden fees. Every time.",
    body: "The price you see is never the price you pay. By checkout, you've already compromised twice.",
    fix: "One clean quote. No asterisks.",
  },
  {
    Icon: Clock,
    tag: "QR 538",
    stamp: "LOST",
    title: "Support vanishes post-booking.",
    body: "The moment you need a human most — delayed flight, cancelled hotel — you get a chatbot and a sorry.",
    fix: "24/7 humans. Every timezone.",
  },
]

/* ─── Draggable chaos canvas pieces ─── */

function DraggablePiece({
  initial,
  rotation = 0,
  zBase = 5,
  children,
}: {
  initial: { x: number; y: number }
  rotation?: number
  zBase?: number
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(initial)
  const [dragging, setDragging] = useState(false)
  const offset = useRef({ x: 0, y: 0 })

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    const ev = "touches" in e ? e.touches[0] : (e as React.MouseEvent)
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    offset.current = { x: ev.clientX - rect.left, y: ev.clientY - rect.top }
    setDragging(true)
    e.preventDefault()
  }

  useEffect(() => {
    if (!dragging) return
    const parent = ref.current?.parentElement?.getBoundingClientRect()
    if (!parent) return
    const onMove = (e: MouseEvent | TouchEvent) => {
      const ev = "touches" in e ? (e as TouchEvent).touches[0] : (e as MouseEvent)
      setPos({
        x: ev.clientX - parent.left - offset.current.x,
        y: ev.clientY - parent.top - offset.current.y,
      })
    }
    const onUp = () => setDragging(false)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchmove", onMove, { passive: false })
    window.addEventListener("touchend", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
    }
  }, [dragging])

  return (
    <div
      ref={ref}
      onMouseDown={onDown}
      onTouchStart={onDown}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        transform: `rotate(${rotation}deg)${dragging ? " scale(1.04)" : ""}`,
        transition: dragging ? "none" : "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        cursor: dragging ? "grabbing" : "grab",
        zIndex: dragging ? 40 : zBase,
        touchAction: "none",
        userSelect: "none",
        filter: dragging
          ? "drop-shadow(0 24px 40px rgba(0,0,0,0.5))"
          : "drop-shadow(0 8px 20px rgba(0,0,0,0.35))",
      }}
    >
      {children}
    </div>
  )
}

function BoardingPass({
  tag,
  route,
  date,
  seat,
  status,
}: {
  tag: string
  route: [string, string]
  date: string
  seat: string
  status?: { label: string; color: string }
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[10px] font-body"
      style={{
        width: 236,
        background: "linear-gradient(135deg, #FAF8F4, #E8ECF0)",
        color: "#0A1425",
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: "linear-gradient(180deg, #C4324A, #A12A3D)" }}
      />
      {status && (
        <div
          className="absolute right-0 top-0 bottom-0 flex items-center justify-center"
          style={{ width: 58, background: status.color }}
        >
          <span className="px-1 text-center text-[8.5px] font-bold uppercase leading-tight tracking-[0.12em] text-white">
            {status.label}
          </span>
        </div>
      )}
      <div className="py-3 pl-[14px]" style={{ paddingRight: status ? 70 : 14 }}>
        <div className="mb-2 flex items-start justify-between pl-2">
          <div className="font-heading text-[11px] uppercase italic tracking-[0.15em] text-silver-dark">
            Boarding Pass
          </div>
          <div className="text-[9.5px] font-bold tracking-[0.12em] text-silver-dark">{tag}</div>
        </div>
        <div className="mb-1.5 flex items-center gap-2 pl-2">
          <div className="font-heading text-[20px] font-normal leading-none tracking-[-0.02em]">{route[0]}</div>
          <div className="relative h-[10px] flex-1">
            <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-primary/25" />
            <Plane
              className="absolute left-1/2 -translate-x-1/2 rotate-45 text-secondary"
              style={{ top: -1 }}
              size={12}
              strokeWidth={1.8}
            />
          </div>
          <div className="font-heading text-[20px] font-normal leading-none tracking-[-0.02em]">{route[1]}</div>
        </div>
        <div className="flex justify-between pl-2 text-[9.5px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>{date}</span>
          <span>Seat {seat}</span>
        </div>
      </div>
    </div>
  )
}

function LuggageTag({ destination, image }: { destination: string; image: string }) {
  return (
    <div
      className="relative rounded-lg p-1.5"
      style={{ width: 140, background: "#FAF8F4", color: "#0A1425" }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full border-2"
        style={{
          top: 8,
          background: "#0A1425",
          borderColor: "#FAF8F4",
          boxShadow: "0 0 0 1px #0A1425",
        }}
      />
      <div
        className="h-[70px] rounded overflow-hidden mt-[18px]"
        style={{ background: `url(${image}) center/cover` }}
      />
      <div className="pt-2 pb-1 px-1 text-center">
        <div className="font-heading italic text-[14px] leading-none">{destination}</div>
        <div className="text-[8.5px] font-semibold tracking-[0.2em] text-silver-dark mt-[3px]">
          V9 TRAVELS
        </div>
      </div>
    </div>
  )
}

function ChaosCanvas() {
  return (
    <div className="relative w-full h-[520px] overflow-visible">
      {/* Boarding passes — overbooked / delayed */}
      <DraggablePiece initial={{ x: 30, y: 50 }} rotation={-7}>
        <BoardingPass tag="AA 1247" route={["DEL", "GOA"]} date="12 Dec" seat="14A" status={{ label: "Overbooked", color: "#C4324A" }} />
      </DraggablePiece>
      <DraggablePiece initial={{ x: 50, y: 210 }} rotation={5}>
        <BoardingPass tag="6E 204" route={["BOM", "DXB"]} date="02 Jan" seat="7C" status={{ label: "Delayed", color: "#C9842B" }} />
      </DraggablePiece>

      {/* Handwritten sticky notes */}
      <DraggablePiece initial={{ x: 300, y: 30 }} rotation={7} zBase={6}>
        <div className="rounded font-script" style={{ width: 150, background: "#EAF0F6", color: "#0A1425", padding: 16, fontSize: 19, lineHeight: 1.2, boxShadow: "0 8px 22px rgba(11,20,38,0.12)" }}>
          where&apos;s my refund?!
        </div>
      </DraggablePiece>
      <DraggablePiece initial={{ x: 20, y: 350 }} rotation={-4} zBase={6}>
        <div className="rounded font-script" style={{ width: 168, background: "#FCEFC7", color: "#5A4A1A", padding: 16, fontSize: 17, lineHeight: 1.25, boxShadow: "0 8px 22px rgba(11,20,38,0.12)" }}>
          5 tabs open just to compare prices 🤯
        </div>
      </DraggablePiece>

      {/* Error toasts */}
      <DraggablePiece initial={{ x: 290, y: 220 }} rotation={3} zBase={5}>
        <div className="flex items-center gap-3 rounded-xl font-body" style={{ width: 204, background: "rgba(20,30,52,0.88)", border: "1px solid rgba(255,255,255,0.10)", color: "#fff", padding: "11px 14px", boxShadow: "0 12px 30px rgba(3,8,16,0.4)" }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(196,50,74,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Zap className="text-secondary-light" size={15} />
          </span>
          <div>
            <div className="text-[12.5px] font-semibold leading-tight">Surprise fee</div>
            <div className="text-[11px] text-secondary-light">+₹4,800 at checkout</div>
          </div>
        </div>
      </DraggablePiece>
      <DraggablePiece initial={{ x: 235, y: 375 }} rotation={-2} zBase={5}>
        <div className="flex items-center gap-3 rounded-xl font-body" style={{ width: 224, background: "rgba(20,30,52,0.88)", border: "1px solid rgba(255,255,255,0.10)", color: "#fff", padding: "11px 14px", boxShadow: "0 12px 30px rgba(3,8,16,0.4)" }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(176,184,196,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <MessageCircle className="text-silver" size={15} />
          </span>
          <div>
            <div className="text-[12.5px] font-semibold leading-tight">Support offline</div>
            <div className="text-[11px] text-silver">A bot will reply in… 47 hrs</div>
          </div>
        </div>
      </DraggablePiece>

      {/* Drag hint — meaningful caption (per design) */}
      <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-tech text-[8.5px] uppercase tracking-[0.18em] text-silver/45">
        ↕ this is planning a trip yourself — drag to feel the mess
      </div>
    </div>
  )
}

function TicketCard({ p, i, inView }: { p: typeof problems[number]; i: number; inView: boolean }) {
  const [flipped, setFlipped] = useState(false)
  const Icon = p.Icon
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      className="group relative min-h-[180px] overflow-hidden rounded-[14px] cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(250,248,244,0.04), rgba(250,248,244,0.015))",
        border: "1px solid rgba(176,184,196,0.15)",
        transition: "all .5s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Perforation line */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 border-l border-dashed border-silver/20"
        style={{ left: 70 }}
      />
      {/* Left stub — icon + vertical "01 / PROBLEM" label */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[70px] flex flex-col items-center justify-center gap-2"
        style={{ background: "rgba(196,50,74,0.06)" }}
      >
        <div
          className="h-10 w-10 rounded-[10px] flex items-center justify-center text-secondary-light"
          style={{
            background: "linear-gradient(135deg, rgba(196,50,74,0.2), rgba(196,50,74,0.05))",
            border: "1px solid rgba(196,50,74,0.3)",
          }}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </div>
        <div
          className="text-[8.5px] font-body font-bold uppercase tracking-[0.2em] text-secondary/55"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          0{i + 1} / problem
        </div>
      </div>

      {/* Main content */}
      <div className="relative min-h-[180px] p-[22px] pl-[90px]">
        {/* Stamp label — rotated */}
        <div
          className="absolute text-[9.5px] font-body font-bold uppercase tracking-[0.2em]"
          style={{
            top: 16,
            right: 18,
            color: "rgba(232,72,94,0.75)",
            border: "1.5px solid rgba(232,72,94,0.35)",
            borderRadius: 4,
            padding: "3px 7px",
            transform: "rotate(6deg)",
            opacity: 0.85,
          }}
        >
          {p.stamp}
        </div>

        {/* FRONT */}
        <div
          className="transition-[opacity,transform] duration-[400ms] ease-out"
          style={{
            opacity: flipped ? 0 : 1,
            transform: flipped ? "translateY(-6px)" : "translateY(0)",
          }}
        >
          <h3 className="font-heading text-[22px] font-medium tracking-[-0.02em] leading-[1.1] text-white pr-[90px] m-0 mb-2">
            {p.title}
          </h3>
          <p className="m-0 font-body text-[13.5px] leading-[1.6] text-white/65">{p.body}</p>
        </div>

        {/* BACK — the TravelSense fix */}
        <div
          className="absolute flex flex-col justify-center transition-[opacity,transform] duration-[400ms] ease-out"
          style={{
            inset: "22px 22px 22px 90px",
            opacity: flipped ? 1 : 0,
            transform: flipped ? "translateY(0)" : "translateY(6px)",
            transitionDelay: flipped ? "100ms" : "0ms",
            pointerEvents: flipped ? "auto" : "none",
          }}
        >
          <div className="mb-2.5 flex items-center gap-2 text-[10px] font-body font-bold uppercase tracking-[0.25em] text-secondary-light">
            <Sparkles className="h-3 w-3" strokeWidth={1.8} />
            The TravelSense fix
          </div>
          <div className="font-script text-[30px] leading-[1.15] text-white">{p.fix}</div>
        </div>

        {/* Hover hint */}
        <div
          className="absolute bottom-3.5 right-[18px] text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/35 transition-opacity duration-300"
          style={{ opacity: flipped ? 0 : 1 }}
        >
          hover →
        </div>
      </div>
    </motion.div>
  )
}

function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-brand-topo">
      <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-[72px] items-center">

          {/* LEFT — draggable chaos canvas */}
          <div data-reveal className="order-2 lg:order-1">
            <ChaosCanvas />
          </div>

          {/* RIGHT — editorial copy + ticket stack */}
          <div className="order-1 lg:order-2">
            <div data-reveal>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-body font-semibold uppercase tracking-[0.22em] text-secondary-light"
                style={{
                  background: "rgba(196,50,74,0.12)",
                  border: "1px solid rgba(196,50,74,0.28)",
                }}
              >
                <span
                  className="h-[5px] w-[5px] rounded-full bg-secondary-light"
                  style={{ boxShadow: "0 0 8px var(--secondary-light)" }}
                />
                The Problem
              </span>
            </div>
            <div data-reveal style={{ transitionDelay: "0.08s" }}>
              <h2
                className="hx font-heading font-medium tracking-[-0.02em] leading-[1.02] mt-5 mb-3.5"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.75rem)" }}
              >
                <span className="text-white">Travel planning is</span>{" "}
                <em className="italic font-normal text-secondary-light">broken.</em>
              </h2>
            </div>
            <div data-reveal style={{ transitionDelay: "0.16s" }}>
              <p className="font-script text-[22px] sm:text-[24px] text-white/60 mt-2 mb-9 max-w-[460px]">
                you know the drill. so do we — that&apos;s why we built this.
              </p>
            </div>

            <div className="grid gap-3.5">
              {problems.map((p, i) => (
                <TicketCard key={p.tag} p={p} i={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3b. HOW IT WORKS — sticky boarding-pass builder
       Faithful port of the prototype `HowItWorks` (home-sections-c.jsx).
       Scroll-pins for 460vh; one conversation assembles into a booked trip
       across four steps — Consult → Plan → Book → Travel.
   ═══════════════════════════════════════════════════════════════ */

const HIW_STEPS: { n: string; title: string; status: string; color: string }[] = [
  { n: "01", title: "Consult", status: "DRAFT", color: "#C4324A" },
  { n: "02", title: "Plan", status: "PLANNED", color: "#A8574E" },
  { n: "03", title: "Book", status: "CONFIRMED", color: "#1F8A7A" },
  { n: "04", title: "Travel", status: "BOARDING", color: "#1F8A5B" },
]
const HIW_PREFS = ["Beaches", "Hill air", "Mid-budget", "2 travellers", "Late March"]
const HIW_PLAN_ROWS: [string, string][] = [
  ["D1", "Arrive · beach sunset"],
  ["D2", "Spice plantation walk"],
  ["D3", "Backwater cruise"],
]
const HIW_BOOKED = ["Flights", "Stays", "Visa", "Transfers"]

/* The boarding-pass body morphs per scroll step. */
function PassBody({ step }: { step: number }) {
  if (step === 0)
    return (
      <div>
        <p className="m-0 mb-3 font-script text-[20px] text-secondary">tell us your vibe — no forms, just talk</p>
        <div className="flex flex-wrap gap-2">
          {HIW_PREFS.map((c, i) => (
            <span
              key={c}
              className="rounded-full border border-silver/40 bg-silver-mist px-3.5 py-[7px] text-[12.5px] text-foreground"
              style={{ animation: `fadeUp .5s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both` }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    )
  if (step === 1)
    return (
      <div className="relative pl-5">
        <div
          className="absolute left-[5px] top-2 bottom-2 w-0.5"
          style={{ background: "repeating-linear-gradient(180deg, rgba(176,184,196,0.5) 0 4px, transparent 4px 8px)" }}
        />
        {HIW_PLAN_ROWS.map((r, i) => (
          <div
            key={r[0]}
            className="relative flex items-center gap-3 py-2"
            style={{ animation: `fadeUp .5s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s both` }}
          >
            <span className="absolute -left-5 h-2.5 w-2.5 rounded-full border-2 border-secondary bg-white" />
            <span className="w-[22px] font-tech text-[10px] text-secondary">{r[0]}</span>
            <span className="text-[13.5px] text-foreground">{r[1]}</span>
          </div>
        ))}
      </div>
    )
  if (step === 2)
    return (
      <div className="relative">
        <div className="grid grid-cols-2 gap-2.5">
          {HIW_BOOKED.map((b, i) => (
            <div
              key={b}
              className="flex items-center gap-2.5 rounded-[11px] px-3 py-2.5"
              style={{
                border: "1px solid rgba(31,138,122,0.25)",
                background: "rgba(31,138,122,0.06)",
                animation: `fadeUp .45s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s both`,
              }}
            >
              <CheckCircle className="h-4 w-4" style={{ color: "#1F8A5B" }} />
              <span className="text-[13px] text-foreground">{b}</span>
            </div>
          ))}
        </div>
        <div className="absolute -right-1 -top-4 rotate-[-14deg]" style={{ animation: "fadeUp .4s cubic-bezier(0.34,1.56,0.64,1) .2s both" }}>
          <span
            className="inline-block rounded-md font-tech text-[13px] tracking-[0.12em]"
            style={{ color: "#1F8A5B", border: "2.5px solid #1F8A5B", padding: "5px 10px", opacity: 0.85 }}
          >
            CONFIRMED
          </span>
        </div>
      </div>
    )
  return (
    <div className="flex flex-col gap-3">
      <div
        className="inline-flex items-center gap-2.5 self-start rounded-full px-4 py-2.5"
        style={{ background: "rgba(31,138,91,0.08)", border: "1px solid rgba(31,138,91,0.2)" }}
      >
        <span className="h-2 w-2 rounded-full" style={{ background: "#1F8A5B", boxShadow: "0 0 0 3px rgba(31,138,91,0.18)", animation: "pulseRing 2s cubic-bezier(0.22,1,0.36,1) infinite" }} />
        <span className="text-[12.5px] font-semibold" style={{ color: "#1F8A5B" }}>24/7 human on call — a travel expert is online</span>
      </div>
      <p className="m-0 font-script text-[24px] text-primary">bon voyage — we&apos;ve got you, the whole way.</p>
    </div>
  )
}

function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null)
  const leadModal = useLeadModal()
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
  const step = Math.min(3, Math.floor((t / 0.86) * 4))
  const railT = Math.min(1, t / 0.86)
  const cur = HIW_STEPS[step]
  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const total = Math.max(1, el.offsetHeight - window.innerHeight)
    window.scrollTo({ top: el.offsetTop + ((i + 0.5) / 4) * 0.86 * total, behavior: "smooth" })
  }

  return (
    <section ref={ref} id="how-it-works" className="relative bg-brand-mesh" style={{ height: "460vh" }}>
      <div className="sticky top-[var(--nav-h)] flex h-[calc(100svh-var(--nav-h))] flex-col items-center justify-center overflow-hidden px-6 py-10 sm:px-8">
        {/* compact header */}
        <div className="max-w-[620px] text-center">
          <p className="m-0 font-body text-[10.5px] font-semibold uppercase tracking-[0.28em] text-secondary">How it works</p>
          <h2 className="mt-3 font-heading text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1.04] tracking-[-0.025em] text-primary" style={{ fontVariationSettings: "'opsz' 144" }}>
            Watch your trip <em className="font-normal italic text-secondary">assemble itself.</em>
          </h2>
          <p className="mx-auto mt-3 max-w-[460px] text-[14.5px] leading-[1.65] text-muted-foreground">
            Keep scrolling — one conversation becomes a fully-booked trip, step by step.
          </p>
        </div>

        {/* thin progress rail */}
        <div className="my-[34px] w-full max-w-[540px]">
          <div className="mb-3.5 flex justify-between">
            {HIW_STEPS.map((s, i) => (
              <button key={s.n} onClick={() => jump(i)} className="flex flex-1 cursor-pointer flex-col items-center gap-[3px]">
                <span className="font-tech text-[8.5px] tracking-[0.16em]" style={{ color: i <= step ? s.color : "var(--silver-dark)", transition: "color .3s" }}>{s.n}</span>
                <span className="font-heading text-[15px] font-medium" style={{ color: i === step ? "var(--primary)" : i < step ? "var(--muted-foreground)" : "var(--silver-dark)", transition: "color .3s" }}>{s.title}</span>
              </button>
            ))}
          </div>
          <div className="relative h-[3px] rounded-sm" style={{ background: "rgba(176,184,196,0.3)" }}>
            <div className="absolute left-0 top-0 h-full rounded-sm" style={{ width: `${railT * 100}%`, background: "linear-gradient(90deg, #C4324A, #A8574E 45%, #1F8A7A 75%, #1F8A5B)" }} />
            <div
              className="absolute top-1/2 flex h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white"
              style={{ left: `${railT * 100}%`, border: `2px solid ${cur.color}`, boxShadow: `0 2px 10px ${cur.color}66`, transition: "border-color .3s" }}
            >
              <span className="h-[5px] w-[5px] rounded-full" style={{ background: cur.color }} />
            </div>
          </div>
        </div>

        {/* boarding pass */}
        <div className="relative flex w-full max-w-[700px] overflow-hidden rounded-[20px] bg-white" style={{ boxShadow: "0 24px 64px rgba(11,20,38,0.14)", border: "1px solid rgba(176,184,196,0.2)" }}>
          <div className="min-w-0 flex-1 px-5 py-6 sm:px-[26px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Image src="/images/brand/logo-emblem.png" alt="" width={22} height={22} className="h-[22px] w-auto" />
                <span className="font-tech text-[8.5px] uppercase tracking-[0.2em] text-silver-dark">Boarding Pass</span>
              </div>
              <span className="rounded-full px-2.5 py-[5px] font-tech text-[9px] tracking-[0.14em] text-white" style={{ background: cur.color, transition: "background .4s" }}>{cur.status}</span>
            </div>
            <div className="my-[18px] flex items-center gap-4 border-b border-dashed pb-4" style={{ borderColor: "rgba(176,184,196,0.4)" }}>
              <div>
                <div className="font-tech text-[8px] tracking-[0.14em] text-silver-dark">FROM</div>
                <div className="font-heading text-[26px] font-semibold leading-none text-primary">PNQ</div>
              </div>
              <svg width="60" height="20" viewBox="0 0 60 20" className="shrink-0"><path d="M2 10h44M40 4l8 6-8 6" stroke="var(--secondary)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="2" cy="10" r="2.5" fill="var(--secondary)" /></svg>
              <div>
                <div className="font-tech text-[8px] tracking-[0.14em] text-silver-dark">TO</div>
                <div className="font-heading text-[26px] font-semibold leading-none" style={{ color: step === 0 ? "var(--silver)" : "var(--primary)", transition: "color .4s" }}>{step === 0 ? "• • •" : "GOA"}</div>
              </div>
            </div>
            <div key={step} className="fade-up min-h-[120px]">
              <PassBody step={step} />
            </div>
          </div>
          <div className="relative flex w-[94px] shrink-0 flex-col items-center justify-between border-l-2 border-dashed py-5" style={{ borderColor: "rgba(176,184,196,0.5)", background: "linear-gradient(180deg, #FAFBFC, #EEF1F5)" }}>
            <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full" style={{ background: "#F4EFE6" }} />
            <span className="absolute -left-2 -bottom-2 h-4 w-4 rounded-full" style={{ background: "#F4EFE6" }} />
            <div className="text-center">
              <div className="font-tech text-[7.5px] tracking-[0.12em] text-silver-dark">STEP</div>
              <div className="font-heading text-[30px] font-semibold leading-none" style={{ color: cur.color, transition: "color .4s" }}>{cur.n}</div>
            </div>
            <div className="flex h-10 gap-0.5">{Array.from({ length: 8 }).map((_, b) => <span key={b} className="bg-primary" style={{ width: b % 3 === 0 ? 2.5 : 1.5, opacity: b % 2 ? 0.5 : 0.85 }} />)}</div>
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full" style={{ background: step >= 2 ? "#1F8A5B" : "rgba(176,184,196,0.3)", transition: "background .4s" }}><Check className="h-[15px] w-[15px] text-white" strokeWidth={2.4} /></span>
          </div>
        </div>

        {/* scroll hint / CTA */}
        <div className="mt-7 flex h-11 items-center justify-center">
          {railT < 1 ? (
            <div className="flex flex-col items-center gap-[5px] text-silver-dark" style={{ animation: "scrollNudge 2.4s cubic-bezier(0.22,1,0.36,1) infinite" }}>
              <span className="font-tech text-[9px] uppercase tracking-[0.28em]">scroll</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A929E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </div>
          ) : (
            <button onClick={() => leadModal.open("how-it-works")} className="btn btn-primary fade-up px-[26px] py-[13px] text-[13.5px]">
              Start your journey <ArrowRight className="h-[15px] w-[15px]" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3c. CATEGORIES — sticky visor-goggle glide
       Faithful port of the prototype `Categories` (home-sections-a.jsx).
       Scroll-pins for 320vh; one goggle glides left → centre → right,
       cross-fading the framed destination photo + copy per category.
   ═══════════════════════════════════════════════════════════════ */

const CAT_VISOR_NORM = "M 0.03750 0.53030 C 0.01875 0.33333 0.10625 0.15152 0.23125 0.12121 C 0.40625 0.06818 0.61250 0.06061 0.75625 0.12879 C 0.88125 0.18182 0.97500 0.27273 0.95313 0.43939 C 0.93750 0.63636 0.86563 0.76515 0.77500 0.79545 C 0.71250 0.81818 0.66563 0.81818 0.62188 0.77273 C 0.57500 0.71970 0.54375 0.67424 0.50000 0.67424 C 0.45625 0.67424 0.42500 0.71970 0.37813 0.77273 C 0.33438 0.82576 0.26875 0.87879 0.19688 0.85606 C 0.11875 0.83333 0.05625 0.71970 0.03750 0.53030 Z"
const CAT_VISOR_VB = "M 12 70 C 6 44 34 20 74 16 C 130 9 196 8 242 17 C 282 24 312 36 305 58 C 300 84 277 101 248 105 C 228 108 213 108 199 102 C 184 95 174 89 160 89 C 146 89 136 95 121 102 C 107 109 86 116 63 113 C 38 110 18 95 12 70 Z"

const CATS: { title: string; place: string; tagline: string; coord: string; desc: string; image: string; num: string; stat: string; accent: string; slug: string }[] = [
  { title: "Leisure", place: "Goa", tagline: "Unwind & recharge", coord: "15.29°N · 73.97°E", desc: "Pristine beaches, luxury resorts and serene hill stations — for those who travel to breathe.", image: "/images/generated/goa-hero.webp", num: "01", stat: "70+ packages", accent: "#C4324A", slug: "leisure" },
  { title: "Adventure", place: "Leh-Ladakh", tagline: "Thrill & conquer", coord: "34.15°N · 77.57°E", desc: "Scale peaks, raft rapids, trek ancient trails. For those who travel to feel truly alive.", image: "/images/generated/leh-ladakh-hero.webp", num: "02", stat: "25+ experiences", accent: "#A8574E", slug: "adventure" },
]

/* Visor-goggle framed image (brand's signature lens shape). The drop-shadow lives
   on the navy backing layer (sibling), never on the clipped photo — Chrome drops a
   clip-path when a filter sits on the clipped element or any ancestor. */
function VisorImage({ img, width = 392, flip = false, bgSize = "cover" }: { img: string; width?: number; flip?: boolean; bgSize?: string }) {
  const uid = useId().replace(/:/g, "")
  const h = width * (132 / 320)
  const flipT = flip ? "scaleX(-1)" : "none"
  return (
    <div className="relative" style={{ width, height: h }}>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id={`vg-${uid}`} clipPathUnits="objectBoundingBox"><path d={CAT_VISOR_NORM} /></clipPath>
        </defs>
      </svg>
      <svg width={width} height={h} viewBox="0 0 320 132" preserveAspectRatio="none" className="absolute inset-0 overflow-visible" style={{ transform: flipT, filter: "drop-shadow(0 18px 30px rgba(11,20,38,0.22)) drop-shadow(0 4px 8px rgba(11,20,38,0.14))", zIndex: 1 }}>
        <path d={CAT_VISOR_VB} fill="#0A1425" />
      </svg>
      <div className="absolute inset-0" style={{ zIndex: 2, transform: flipT, clipPath: `url(#vg-${uid})`, WebkitClipPath: `url(#vg-${uid})`, backgroundImage: `url(${img})`, backgroundSize: bgSize, backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ transform: flipT }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(168deg, rgba(255,255,255,0.18) 0%, transparent 42%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(11,20,38,0.28) 100%)" }} />
        </div>
      </div>
      <svg width={width} height={h} viewBox="0 0 320 132" preserveAspectRatio="none" className="absolute inset-0 overflow-visible" style={{ transform: flipT, zIndex: 3 }}>
        <defs>
          <linearGradient id={`vgm-${uid}`} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#F4F6F9" /><stop offset="48%" stopColor="#C8CDD5" /><stop offset="58%" stopColor="#C0C5CD" /><stop offset="100%" stopColor="#AAB0BA" />
          </linearGradient>
        </defs>
        <path d={CAT_VISOR_VB} fill="none" stroke={`url(#vgm-${uid})`} strokeWidth="8" strokeLinejoin="round" />
        <path d={CAT_VISOR_VB} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinejoin="round" style={{ transformBox: "fill-box", transformOrigin: "center", transform: "scale(0.972)" }} />
      </svg>
    </div>
  )
}

function CategoriesSection() {
  const ref = useRef<HTMLElement>(null)
  const [t, setT] = useState(0)
  const [vw, setVw] = useState(1280)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const total = Math.max(1, el.offsetHeight - window.innerHeight)
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
      setT(scrolled / total)
    }
    const onResize = () => {
      setVw(window.innerWidth)
      onScroll()
    }
    onResize()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])
  const idx = Math.min(CATS.length - 1, Math.floor((t / 0.92) * CATS.length))
  const c = CATS[idx]
  const flip = idx % 2 === 1
  const xpos = idx === 0 ? -22 : idx === CATS.length - 1 ? 22 : 0
  const goggleW = Math.min(392, Math.round(vw * 0.84))
  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const total = Math.max(1, el.offsetHeight - window.innerHeight)
    window.scrollTo({ top: el.offsetTop + ((i + 0.5) / CATS.length) * 0.92 * total, behavior: "smooth" })
  }

  return (
    <section ref={ref} className="relative bg-white" style={{ height: `${CATS.length * 110}vh` }}>
      <div className="sticky top-[var(--nav-h)] flex h-[calc(100svh-var(--nav-h))] flex-col overflow-hidden">
        {/* header */}
        <div className="shrink-0 pt-[6vh] text-center">
          <p className="eyebrow justify-center text-secondary"><span className="dot" /> How do you travel?</p>
          <h2 className="h-display mt-3 text-3xl sm:text-4xl md:text-5xl">Two ways to <em>explore.</em></h2>
        </div>

        {/* visor band — goggle glides left → centre → right */}
        <div className="relative min-h-0 flex-1">
          <span
            key={`ghost-${idx}`}
            aria-hidden
            className="fade-in-soft pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-heading font-medium leading-none"
            style={{ fontSize: "min(40vh, 380px)", color: "transparent", WebkitTextStroke: `1.5px ${c.accent}14`, zIndex: 1 }}
          >
            {c.num}
          </span>

          <div className="absolute left-1/2 top-1/2" style={{ zIndex: 3, transform: `translate(calc(-50% + ${xpos}vw), -50%)`, transition: "transform .75s cubic-bezier(0.22,1,0.36,1)" }}>
            <div key={`vis-${idx}`} className="fade-in-soft flex flex-col items-center gap-4">
              <VisorImage img={c.image} width={goggleW} flip={flip} />
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="h-px w-4" style={{ background: `linear-gradient(90deg, transparent, ${c.accent})` }} />
                  <span className="font-heading text-[18px] font-medium italic leading-none text-primary" style={{ fontVariationSettings: "'opsz' 144" }}>{c.place}</span>
                  <span className="h-px w-4" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />
                </div>
                <span className="font-tech text-[8.5px] uppercase tracking-[0.22em] text-silver-dark">{c.coord}</span>
              </div>
            </div>
          </div>
        </div>

        {/* text band */}
        <div key={`txt-${idx}`} className="fade-in-soft mx-auto max-w-[480px] shrink-0 px-8 text-center">
          <p className="m-0 text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: `${c.accent}cc` }}>{c.tagline}</p>
          <h3 className="mt-1.5 font-heading text-[34px] font-medium tracking-[-0.02em] text-primary" style={{ fontVariationSettings: "'opsz' 144" }}>{c.title}</h3>
          <p className="mx-auto mt-2.5 max-w-[420px] text-[14px] leading-[1.65] text-muted-foreground">{c.desc}</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link href={`/categories/${c.slug}`} className="link-underline inline-flex items-center gap-2 text-[14px] font-semibold text-primary">Explore {c.title} <ArrowRight className="h-4 w-4" /></Link>
            <span className="rounded-full px-3 py-1.5 text-[10.5px] font-medium tracking-[0.06em]" style={{ background: `${c.accent}0D`, border: `1px solid ${c.accent}20`, color: c.accent }}>{c.stat}</span>
          </div>
        </div>

        {/* stepper + progress */}
        <div className="flex shrink-0 flex-col items-center gap-3.5 pt-[22px] pb-[5vh]">
          <div className="flex justify-center gap-2.5">
            {CATS.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => jump(i)}
                className="flex cursor-pointer items-center gap-2.5 rounded-full px-4 py-2"
                style={{ border: `1px solid ${i === idx ? cat.accent : "rgba(176,184,196,0.3)"}`, background: i === idx ? `${cat.accent}0e` : "#fff", transition: "all .3s cubic-bezier(0.22,1,0.36,1)" }}
              >
                <span className="h-[7px] w-[7px] rounded-full" style={{ background: i === idx ? cat.accent : "rgba(176,184,196,0.5)", transition: "background .3s" }} />
                <span className="font-body text-[12.5px] font-semibold" style={{ color: i === idx ? "var(--primary)" : "var(--silver-dark)", transition: "color .3s" }}>{cat.title}</span>
              </button>
            ))}
          </div>
          <div className="h-[3px] w-[220px] overflow-hidden rounded-sm" style={{ background: "rgba(176,184,196,0.3)" }}>
            <div className="h-full" style={{ width: `${Math.min(100, (t / 0.92) * 100)}%`, background: `linear-gradient(90deg, ${CATS[0].accent}, ${c.accent})`, transition: "width .15s linear" }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   4. DESTINATIONS — photo cards with enhanced interaction
   ═══════════════════════════════════════════════════════════════ */

const destinations: { name: string; country: string; slug: string; code: string; coord: string; gate: string; priceLabel: string; rating: string; image: string }[] = [
  { name: "Kashmir", country: "India", slug: "kashmir", code: "SXR", coord: "34.08°N", gate: "A1", priceLabel: "24,000", rating: "4.9", image: "/images/generated/kashmir-hero.webp" },
  { name: "Kerala", country: "India", slug: "kerala", code: "COK", coord: "9.93°N", gate: "B4", priceLabel: "25,000", rating: "4.8", image: "/images/generated/kerala-hero.webp" },
  { name: "Rajasthan", country: "India", slug: "rajasthan", code: "JAI", coord: "27.02°N", gate: "C2", priceLabel: "25,000", rating: "4.8", image: "/images/generated/rajasthan-hero.webp" },
  { name: "Bali", country: "Indonesia", slug: "bali", code: "DPS", coord: "8.51°S", gate: "D7", priceLabel: "58,000", rating: "4.8", image: "/images/generated/bali-hero.webp" },
]

function BoardingPassCard({ dest, i }: { dest: typeof destinations[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/destinations/${dest.slug}`}
        className="group flex overflow-hidden rounded-[18px] bg-white border border-silver/20 shadow-[0_4px_20px_rgba(11,20,38,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(11,20,38,0.15)]"
      >
        {/* main panel */}
        <div className="relative flex-1 min-w-0">
          <div className="relative h-[150px] overflow-hidden">
            <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-[1.1s] group-hover:scale-[1.08]" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.05] to-primary/55" />
            {/* coordinate micro-label */}
            <span className="absolute top-3 left-3.5 font-tech text-[8px] tracking-[0.16em] text-white/80">{dest.coord}</span>
            {/* rating chip */}
            <div className="absolute top-2.5 right-3 flex items-center gap-1 rounded-full bg-primary/40 backdrop-blur-md px-2.5 py-1">
              <Star className="h-[11px] w-[11px] fill-secondary text-secondary" />
              <span className="text-[10.5px] font-semibold text-white">{dest.rating}</span>
            </div>
            {/* hover BOARDING stamp */}
            <span className="absolute bottom-3 right-3 rounded-md border-2 border-white/80 px-2 py-1 font-tech text-[10px] tracking-[0.1em] text-white opacity-0 rotate-[-12deg] scale-[1.3] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:scale-100">
              BOARDING
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="font-heading text-[19px] font-medium tracking-[-0.01em] text-primary">{dest.name}</h3>
                <span className="font-tech text-[11px] tracking-[0.08em] text-secondary">{dest.code}</span>
              </div>
              <p className="mt-0.5 flex items-center gap-1 text-[11.5px] text-muted-foreground">
                <MapPin className="h-3 w-3" /> {dest.country}
              </p>
            </div>
            <div className="text-right">
              <p className="font-tech text-[7.5px] tracking-[0.14em] uppercase text-muted-foreground">From</p>
              <p className="mt-0.5 font-heading text-[18px] font-medium tracking-[-0.015em] text-primary">₹{dest.priceLabel}</p>
            </div>
          </div>
        </div>

        {/* perforated stub */}
        <div className="relative flex w-[66px] shrink-0 flex-col items-center justify-between border-l-2 border-dashed border-silver/50 bg-gradient-to-b from-[#FAFBFC] to-[#F0F2F5] py-3.5">
          {/* punch holes */}
          <span className="absolute -left-[7px] -top-[7px] h-3 w-3 rounded-full bg-[#F3EEE6]" />
          <span className="absolute -left-[7px] -bottom-[7px] h-3 w-3 rounded-full bg-[#F3EEE6]" />
          <div className="font-tech text-[8px] tracking-[0.14em] text-muted-foreground [writing-mode:vertical-rl] rotate-180">GATE {dest.gate}</div>
          {/* barcode */}
          <div className="flex h-10 items-stretch gap-[1.5px]">
            {Array.from({ length: 9 }).map((_, b) => (
              <span key={b} className="bg-primary" style={{ width: b % 3 === 0 ? 2.5 : 1.5, opacity: b % 2 ? 0.5 : 0.85 }} />
            ))}
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-secondary transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  )
}

function DestinationsSection() {
  return (
    <section className="py-24 sm:py-28 bg-brand-gradient-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div data-reveal>
            <p className="eyebrow text-secondary"><span className="dot" /> Trending now</p>
            <h2 className="h-display mt-3 text-3xl sm:text-4xl md:text-5xl">
              Popular <em>destinations.</em>
            </h2>
          </div>
          <div data-reveal style={{ transitionDelay: "0.1s" }}>
            <Link href="/destinations" className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-secondary transition-colors group">
              View all destinations <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {destinations.map((dest, i) => (
            <BoardingPassCard key={dest.name} dest={dest} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   5. USP — Real Humans, Real Help (enhanced storytelling)
   ═══════════════════════════════════════════════════════════════ */

function USPSection() {
  const msgs = [
    { from: "user", text: "Hi! Planning a Bali trip for 2" },
    { from: "agent", text: "Hey! I'm Priya, your travel buddy. When are you thinking?" },
    { from: "user", text: "March end, 5 nights" },
    { from: "agent", text: "On it! Let me build a custom plan. Can I call you in 10 mins?" },
  ]
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })
  const [msgCount, setMsgCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timers: NodeJS.Timeout[] = []
    msgs.forEach((_, i) => { timers.push(setTimeout(() => setMsgCount(i + 1), 600 + i * 900)) })
    return () => timers.forEach(clearTimeout)
  }, [inView])

  return (
    <section ref={ref} className="relative overflow-hidden noise-overlay" style={{ background: "linear-gradient(160deg, #030810 0%, #0A1425 38%, #152240 68%, #0A1425 100%)" }}>
      {/* ambient orbs + faint grid */}
      <div className="absolute top-0 right-[8%] h-[520px] w-[520px] rounded-full bg-secondary/[0.05] blur-[180px]" />
      <div className="absolute bottom-0 left-[4%] h-[380px] w-[380px] rounded-full bg-silver/[0.03] blur-[140px]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(176,184,196,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(176,184,196,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 sm:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — content */}
          <div>
            <div data-reveal>
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <HeartHandshake className="h-3.5 w-3.5 text-secondary/80" />
                <span className="text-[10.5px] font-body font-semibold tracking-[0.2em] uppercase text-silver/40">Our Promise</span>
              </div>
            </div>

            <div data-reveal style={{ transitionDelay: "0.1s" }}>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.04] tracking-[-0.025em]" style={{ fontVariationSettings: "'opsz' 144" }}>
                <span className="text-[#F4F6F9]">We pick up.</span>
                <br />
                <em className="italic font-normal text-secondary">Every call.</em>
                <br />
                <span className="text-silver">Every time.</span>
              </h2>
            </div>

            <div data-reveal style={{ transitionDelay: "0.2s" }}>
              <p className="mt-6 text-[15px] leading-[1.85] text-silver/50 max-w-md">
                Not a chatbot. Not a menu. Not a queue.
                <br />
                Just a real person who genuinely cares about making your trip perfect.
              </p>
            </div>

            {/* Anti-features — line-through pills */}
            <div data-reveal className="mt-7 flex flex-wrap gap-2.5" style={{ transitionDelay: "0.3s" }}>
              {[
                { icon: PhoneOff, label: "No IVR" },
                { icon: Bot, label: "No Chatbots" },
                { icon: Users, label: "No Queues" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 rounded-full bg-secondary/[0.06] border border-secondary/[0.10] px-4 py-2">
                  <item.icon className="h-3 w-3 text-secondary/50" />
                  <span className="text-[11.5px] text-silver/40 line-through decoration-secondary/50">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div data-reveal className="mt-8 flex items-center gap-5" style={{ transitionDelay: "0.4s" }}>
              <WhatsAppLink source="usp-talk-human" className="metallic-cta group inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-body font-semibold text-white tracking-[0.01em]">
                <span className="relative z-10 flex items-center gap-2">
                  <motion.span animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}>
                    <Phone className="h-4 w-4" />
                  </motion.span>
                  Talk to a human
                </span>
              </WhatsAppLink>
              <div className="flex items-center gap-2">
                <motion.div className="h-1.5 w-1.5 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="text-[11px] text-silver/40 tracking-wide">Avg. response: 30s</span>
              </div>
            </div>
          </div>

          {/* Right — animated chat */}
          <div data-reveal-right className="flex justify-center lg:justify-end">
            <TiltCard strength={4} className="w-full max-w-[360px]">
              <div className="rounded-[28px] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.4)]" style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                {/* Header */}
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] border border-silver/[0.06] px-4 py-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary/30 to-silver/15 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white/70" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-white/85">TravelSense</p>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-[10px] text-green-400/60">Online now</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-2.5 px-1 min-h-[180px]">
                  {msgs.slice(0, msgCount).map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={cn("flex flex-col", msg.from === "user" ? "items-end" : "items-start")}
                    >
                      <div className={cn(
                        "rounded-2xl px-4 py-2.5 max-w-[82%]",
                        msg.from === "user"
                          ? "rounded-br-sm bg-secondary/[0.32] border border-secondary/25"
                          : "rounded-bl-sm bg-white/[0.06] border border-silver/[0.07]"
                      )}>
                        <p className="text-[12px] leading-relaxed text-white/[0.78]">{msg.text}</p>
                      </div>
                      {msg.from === "user" && idx < msgCount - 1 && (
                        <motion.div className="flex items-center gap-0.5 mt-0.5 mr-1"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                            <path d="M1 4L3.5 6.5L8 1" stroke="#B0B8C4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 4L7.5 6.5L12 1" stroke="#B0B8C4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                  {msgCount > 0 && msgCount < msgs.length && (
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[9px] text-silver/20 px-2">Priya is typing...</span>
                      <div className="flex gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-silver/[0.04]">
                        {[0, 1, 2].map((d) => (
                          <div key={d} className="h-1.5 w-1.5 rounded-full bg-silver/30" style={{ animation: `typingDot 1.2s ${d * 0.15}s infinite` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: msgCount >= 4 ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-green-500/[0.05] border border-green-500/[0.10] py-2.5"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-[10.5px] font-medium text-green-400/60">Response: under 30 seconds</p>
                </motion.div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Differentiator strip — 4-up, above a hairline top border (trimmed from flip-cards) */}
        <div className="mt-20 sm:mt-24 pb-24 sm:pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-t border-white/[0.07] pt-10">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[13px]" style={{ background: "rgba(196,50,74,0.10)", border: "1px solid rgba(196,50,74,0.16)" }}>
                  <d.Icon className="h-5 w-5 text-secondary-light/90" strokeWidth={1.4} />
                </div>
                <div>
                  <h4 className="font-heading text-[15.5px] font-medium tracking-[-0.01em] text-[#F4F6F9]">{d.title}</h4>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-silver/45">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Differentiators — the 4 USP pillars. Rendered as the strip inside USPSection
   (the prototype trimmed the old standalone flip-cards into this dark strip). */
const differentiators: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: MessageSquare, title: "Consultation First", desc: "We listen before we sell" },
  { Icon: Shield, title: "Women-Led, Trust-Built", desc: "Safety & transparency first" },
  { Icon: Compass, title: "All Travel, One Place", desc: "Leisure & Adventure" },
  { Icon: Handshake, title: "Tech + Personal Touch", desc: "Smart tools, real humans" },
]

/* ═══════════════════════════════════════════════════════════════
   7. TESTIMONIALS — enhanced with better visual hierarchy
   ═══════════════════════════════════════════════════════════════ */

/* Real, unedited traveller reviews shared by the founder (lightly trimmed for length;
   words kept authentic). Four carry the travellers' own trip photos (shared with the
   founder); unnamed reviewers show as "Verified traveller" pending the WhatsApp
   verification round — swap in names as they come in. */
type Testimonial = {
  name: string
  location: string
  trip: string
  coord: string
  image?: string
  review: string
  initial: string
  color: string
}
const testimonials: Testimonial[] = [
  { name: "Nisha Laddha", location: "Amravati", trip: "Kashmir & Vaishno Devi", coord: "34.08°N · 74.80°E", image: "/images/testimonials/kashmir-laddha.webp", initial: "N", color: "#C4324A", review: "Truly memorable and very well organised. Hotels, arrangements and services were excellent throughout — everything managed smoothly, completely comfortable and stress-free. Heartfelt thanks for the wonderful planning and coordination." },
  { name: "Verified traveller", location: "", trip: "Andaman Islands", coord: "11.62°N · 92.73°E", image: "/images/testimonials/andaman.webp", initial: "A", color: "#1F8A7A", review: "I was confused which company to choose for Andaman — and my decision to go with V9 was so right. Competitive rates, excellent hotels, polite drivers, and the owner herself available 24×7. Highly recommend." },
  { name: "Sonal Bihani", location: "", trip: "Rajasthan", coord: "26.91°N · 75.79°E", initial: "S", color: "#A8574E", review: "Amazing service in stay, food and travel. Jayshree maam customised our itinerary to our interests and priorities. To make your trip comfortable and easy, I highly recommend planning with V9." },
  { name: "Verified traveller", location: "", trip: "Vietnam · 10 days", coord: "21.03°N · 105.85°E", image: "/images/testimonials/vietnam.webp", initial: "V", color: "#C9842B", review: "Our 10-day Vietnam trip was just amazing — stays, sightseeing, food and above all hospitality of a 7-star category, with real value for money. Even last-minute changes were gracefully handled. We felt at home." },
  { name: "Yogesh & Family Jaju", location: "Sangamner", trip: "Bhutan", coord: "27.47°N · 89.64°E", initial: "Y", color: "#2D8B6A", review: "A huge thank you for arranging such a fantastic trip to Bhutan — an unforgettable experience. The landscapes were stunning, the itinerary spot on, and the local guides amazing. Can't wait to plan the next adventure!" },
  { name: "Verified traveller", location: "", trip: "Kashmir", coord: "34.05°N · 74.38°E", image: "/images/testimonials/kashmir-snow.webp", initial: "K", color: "#1B6CA8", review: "Hamara trip kaafi memorable aur smooth raha. Superb hotels, perfect arrangements aur har jagah excellent service mili. Poori trip tension-free aur beautifully planned thi — thank you for making our journey so comfortable and special!" },
  { name: "Chinmay Korad", location: "", trip: "Uttarakhand · 2 tours", coord: "30.07°N · 79.01°E", initial: "C", color: "#1B2D4E", review: "Professionally arranged. The best part — our requirement was understood and options prepared specifically to meet it. Enjoyed the travel, stay and guide arrangements. Thank you for making our two back-to-back tours memorable." },
]

function TestimonialsSection() {
  return (
    <section className="overflow-hidden bg-brand-mesh py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* header */}
        <div className="mb-12 text-center" data-reveal>
          <p className="eyebrow justify-center text-secondary"><span className="dot" /> Loved by travellers</p>
          <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-5xl">
            Real trips, real <em>stories.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">
            Unedited words — and real photos — from travellers who planned their journey with V9.
          </p>
        </div>
      </div>

      {/* Travel-postcard carousel — auto-scrolls, pauses on hover */}
      <div
        className="group/tm relative"
        data-reveal
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
        }}
      >
        <div
          className="flex w-max items-stretch gap-6 px-6 py-3 group-hover/tm:[animation-play-state:paused]"
          style={{ animation: "marqueeX 72s linear infinite" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <article
              key={i}
              className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_10px_34px_rgba(11,20,38,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_54px_rgba(11,20,38,0.16)]"
              style={{ border: "1px solid rgba(176,184,196,0.2)" }}
            >
              {/* media — real traveller photo, else a destination colour band */}
              <div className="relative h-[186px] w-full overflow-hidden">
                {t.image ? (
                  <Image src={t.image} alt={`${t.name} on their ${t.trip} trip`} fill sizes="320px" className="object-cover object-[center_38%]" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(150deg, ${t.color}, ${t.color}cc 55%, #0A1425)` }}>
                    <span className="px-5 text-center font-heading text-[34px] font-medium italic leading-[1.05] text-white/95" style={{ fontVariationSettings: "'opsz' 144" }}>
                      {t.trip.split(" · ")[0]}
                    </span>
                  </div>
                )}
                {/* bottom scrim + coordinate micro-label */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary/80 via-primary/25 to-transparent" />
                <span className="absolute bottom-2.5 left-3.5 font-tech text-[8px] uppercase tracking-[0.18em] text-white/90">{t.coord}</span>
                {/* trip tag */}
                <span className="absolute left-3.5 top-3.5 rounded-full bg-white/[0.92] px-2.5 py-1 font-tech text-[8px] uppercase tracking-[0.12em] text-primary backdrop-blur-sm">{t.trip}</span>
                {/* verified franking stamp */}
                <div className="absolute right-3.5 top-3.5 flex h-9 w-9 rotate-[9deg] items-center justify-center rounded-full border border-dashed border-white/70 bg-white/15 backdrop-blur-sm" title="Verified traveller">
                  <Check className="h-4 w-4 text-white" strokeWidth={2.6} />
                </div>
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col px-6 py-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="mt-3 flex-1 font-heading text-[13.5px] font-normal leading-[1.7] text-foreground" style={{ fontVariationSettings: "'opsz' 40" }}>
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2.5 border-t border-silver/[0.18] pt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-heading text-[14px] font-medium text-white" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)` }}>
                    {t.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-primary">{t.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{t.trip}{t.location ? ` · ${t.location}` : ""}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   8. CTA — Final conversion push with brand impact
   ═══════════════════════════════════════════════════════════════ */

function CTASection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0A1425, #152240)" }}>
      {/* cinematic backdrop image (ken-burns) + navy gradient veil */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/images/destinations/santorini.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ animation: "kenburns 22s ease-in-out infinite alternate" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,20,37,0.92), rgba(21,34,64,0.82))" }} />
      </div>

      <div className="relative z-[2] mx-auto max-w-[760px] px-8 py-28 sm:py-[120px] text-center">
        <motion.p
          className="font-body text-[10.5px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: "var(--secondary-glow)" }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Your next trip starts here
        </motion.p>
        <motion.h2
          className="mt-4 font-heading font-medium leading-[1.05] tracking-[-0.025em] text-white"
          style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontVariationSettings: "'opsz' 144" }}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Let&apos;s plan something
          <br />
          <em className="font-normal italic" style={{ color: "var(--secondary-glow)" }}>unforgettable.</em>
        </motion.h2>
        <motion.p
          className="mx-auto mt-[22px] max-w-[460px] text-[15.5px] leading-[1.7] text-silver/70"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.16, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          One conversation is all it takes. Tell us your dream and we&apos;ll handle the rest — start to finish.
        </motion.p>
        <motion.div
          className="mt-9 flex flex-wrap justify-center gap-3.5"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.24, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <WhatsAppLink source="cta-talk-expert" className="metallic-cta group inline-flex items-center gap-2 px-[30px] py-[15px] text-[14px] font-body font-semibold text-white tracking-[0.01em] cursor-pointer">
            <span className="relative z-10 flex items-center gap-2">
              <motion.span animate={{ rotate: [0, -10, 10, -5, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}>
                <Phone className="h-4 w-4" />
              </motion.span>
              Talk to an expert
            </span>
          </WhatsAppLink>
          <Link href="/destinations" className="btn btn-ghost text-[14px]">
            Browse destinations
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   9. NEWSLETTER — clean brand-styled
   ═══════════════════════════════════════════════════════════════ */

function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("subscribe failed")
      setStatus("success")
      // Confetti burst
      const colors = ["#C4324A", "#B0B8C4", "#0A1425", "#C4324A", "#B0B8C4", "#FFFFFF", "#C4324A", "#B0B8C4"]
      const burst = colors.map((color, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 120,
        y: -(Math.random() * 80 + 20),
        color,
      }))
      setConfetti(burst)
      setTimeout(() => setConfetti([]), 1200)
      setTimeout(() => { setStatus("idle"); setEmail("") }, 3000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <section className="py-14 bg-white border-t border-silver/10">
      <div className="max-w-[440px] mx-auto px-6 text-center" data-reveal>
        <motion.h3
          className="font-heading text-[22px] font-medium tracking-[-0.01em] text-primary"
          style={{ fontVariationSettings: "'opsz' 72" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Travel inspiration, delivered
        </motion.h3>
        <motion.p
          className="mt-2 text-[13.5px] text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Curated ideas, deals and tips — straight to your inbox.
        </motion.p>
        <motion.form
          onSubmit={handleSubmit}
          className="mt-5 flex gap-2 relative"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            disabled={status !== "idle"}
            className="flex-1 h-11 rounded-full border border-silver/20 bg-silver-mist/30 px-5 text-sm placeholder:text-silver/30 focus:border-secondary/30 focus:outline-none focus:ring-2 focus:ring-secondary/5 disabled:opacity-50 transition-all"
          />
          <div className="relative">
            <button
              ref={buttonRef}
              type="submit"
              disabled={status !== "idle"}
              className={cn("metallic-cta flex h-11 w-11 shrink-0 items-center justify-center text-white", status === "success" && "!bg-green-500")}
            >
              <span className="relative z-10">
                {status === "idle" ? (
                  <Send className="h-3.5 w-3.5" />
                ) : status === "loading" ? (
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <CheckCircle className="h-3.5 w-3.5" />
                )}
              </span>
            </button>
            {/* Paper airplane animation on success */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  className="absolute bottom-full left-1/2 pointer-events-none"
                  initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                  animate={{ opacity: 0, x: 40, y: -60, rotate: -25 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Send className="h-4 w-4 text-secondary" />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Confetti burst */}
            <AnimatePresence>
              {confetti.map((c) => (
                <motion.div
                  key={c.id}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full pointer-events-none"
                  style={{ background: c.color }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 0, x: c.x, y: c.y, scale: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   WAVE DIVIDER — faithful port of the prototype `Wave` (home-sections-c.jsx)
   Two stacked flowing paths pour the `from` colour down into the `to` section.
   ═══════════════════════════════════════════════════════════════ */

function Wave({ from, to }: { from: string; to: string }) {
  return (
    <div className="wave-divider -mb-px" style={{ background: to, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path
          d="M0,0 L1440,0 L1440,44 C1170,82 980,8 720,40 C500,67 250,18 0,46 Z"
          fill={from}
          opacity="0.45"
        />
        <path
          d="M0,0 L1440,0 L1440,34 C1140,70 860,12 600,38 C380,60 180,30 0,40 Z"
          fill={from}
        />
      </svg>
    </div>
  )
}

/* ═══ EXPORT ═══ */

export default function LandingPage() {
  useScrollReveal()
  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <TrustBarSection />
      {/* white → navy transition: the wave leads the eye out of the white TrustBar
          into the navy AR/VR ribbon, which then flows seamlessly (no divider) into
          the navy Problem section — one continuous premium navy band. */}
      <Wave from="#FFFFFF" to="#0A1425" />
      <ARVRBanner />
      <ProblemSection />
      <Wave from="#0A1425" to="#FFFFFF" />
      <HowItWorksSection />
      <Wave from="#F4F6F9" to="#FFFFFF" />
      <CategoriesSection />
      <DestinationsSection />
      <Wave from="#F4F6F9" to="#030810" />
      <USPSection />
      <Wave from="#0A1425" to="#FFFFFF" />
      <TestimonialsSection />
      <Wave from="#F4F6F9" to="#0A1425" />
      <CTASection />
      <Wave from="#0A1425" to="#FFFFFF" />
      <NewsletterSection />
      <Wave from="#FFFFFF" to="#0A1425" />
    </>
  )
}
