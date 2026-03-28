"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useVelocity,
} from "framer-motion"
import { useParallax, useSectionZoom, useStaggerReveal } from "@/hooks/useScrollAnimations"
import {
  Palmtree,
  GraduationCap,
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
  CheckCircle,
  ChevronRight,
  Layers,
  SearchX,
  EyeOff,
  BookOpenCheck,
  MessageSquare,
  Map,
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
  FileText,
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

/* Lazy-load 3D globe — no SSR (WebGL) */
const Globe3D = dynamic(() => import("./Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/[0.04] to-secondary/[0.04] animate-pulse border border-silver/10" />
    </div>
  ),
})

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

/* ─── Marquee ─── */

const marqueeIcons = [MapPin, Plane, Star, Compass, Globe, Heart, Landmark, MapPinned, Plane, Star]

function Marquee({ items, speed = 30 }: { items: string[]; speed?: number }) {
  const doubled = [...items, ...items]
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: isHovered ? speed * 3 : speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => {
          const Icon = marqueeIcons[i % marqueeIcons.length]
          return (
            <span key={i} className="text-sm font-medium text-muted-foreground/30 flex items-center gap-3 group/item">
              <motion.span
                className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-secondary/[0.06] to-silver/[0.06]"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, delay: (i % 10) * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="h-2.5 w-2.5 text-secondary/30" strokeWidth={1.5} />
              </motion.span>
              {item}
            </span>
          )
        })}
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   1. HERO — Cinematic, full-screen with 3D globe
   ═══════════════════════════════════════════════════════════════ */

const heroWords = ["Your Way", "Your Story", "Your Pace"]

/* Floating travel icon particles — brand-colored */
const floatingIconData: { Icon: LucideIcon; x: number; y: number; dur: number; delay: number; color: string }[] = [
  { Icon: Plane, x: 10, y: 82, dur: 16, delay: 0, color: "text-secondary/20" },
  { Icon: Mountain, x: 85, y: 78, dur: 18, delay: 2, color: "text-silver/25" },
  { Icon: Palmtree, x: 25, y: 88, dur: 20, delay: 4, color: "text-secondary/15" },
  { Icon: Train, x: 70, y: 85, dur: 17, delay: 6, color: "text-primary/15" },
  { Icon: Landmark, x: 50, y: 80, dur: 19, delay: 3, color: "text-silver/20" },
  { Icon: Compass, x: 92, y: 70, dur: 15, delay: 1, color: "text-secondary/15" },
  { Icon: Globe, x: 5, y: 70, dur: 21, delay: 5, color: "text-primary/10" },
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

/* Real Compass */
function RealCompass() {
  const [heading, setHeading] = useState(0)
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) { setHeading(e.alpha); setHasPermission(true) }
    }
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      const DOE = DeviceOrientationEvent as any
      if (typeof DOE.requestPermission !== "function") {
        window.addEventListener("deviceorientation", handleOrientation)
      }
    }
    return () => window.removeEventListener("deviceorientation", handleOrientation)
  }, [])

  const needleRotation = useSpring(heading, { stiffness: 50, damping: 15 })

  return (
    <motion.div
      className="absolute top-[12%] right-[4%] hidden xl:block"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 rounded-full border-[3px] border-silver/20 shadow-[0_4px_15px_rgba(0,0,0,0.08),inset_0_1px_3px_rgba(255,255,255,0.5)] bg-gradient-to-b from-white/90 to-silver-mist/40 backdrop-blur-sm" />
        <div className="absolute inset-[4px] rounded-full border border-silver/10" />

        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="absolute top-[6px] left-1/2 origin-bottom"
            style={{ height: "calc(50% - 6px)", width: "1px", transform: `rotate(${i * 10}deg) translateX(-50%)` }}>
            <div className={cn("w-px", i % 9 === 0 ? "h-2.5 bg-primary/20" : "h-1 bg-silver/30")} />
          </div>
        ))}

        <span className="absolute top-[10px] left-1/2 -translate-x-1/2 text-[9px] font-heading text-secondary font-bold tracking-[0.2em]">N</span>
        <span className="absolute bottom-[10px] left-1/2 -translate-x-1/2 text-[8px] font-heading text-silver/40 tracking-[0.2em]">S</span>
        <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[8px] font-heading text-silver/40 tracking-[0.2em]">E</span>
        <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[8px] font-heading text-silver/40 tracking-[0.2em]">W</span>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          style={hasPermission ? { rotate: needleRotation } : undefined}
          animate={!hasPermission ? { rotate: [0, 15, -10, 5, 0] } : undefined}
          transition={!hasPermission ? { duration: 10, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: "32px solid #C4324A", filter: "drop-shadow(0 1px 3px rgba(196,50,74,0.4))" }} />
          <div className="absolute bottom-[18px] left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "28px solid #B0B8C4", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }} />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-gradient-to-b from-silver-light to-silver-dark shadow-[0_1px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.7)]" />

        <motion.div className="absolute -inset-5" animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Plane className="h-3.5 w-3.5 text-secondary/40 rotate-90" strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* Constellation star field — brand colored */
function ConstellationField() {
  const stars = Array.from({ length: 50 }, (_, i) => {
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
  const [wordIdx, setWordIdx] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const leadModal = useLeadModal()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % heroWords.length), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center justify-center bg-brand-mesh pt-24 pb-12 overflow-visible">
      {/* 1. Animated gradient mesh — brand colors only */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute top-[10%] right-[5%] h-[500px] w-[500px] rounded-full bg-secondary/[0.04] blur-[180px] morph-blob"
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-[5%] left-[0%] h-[400px] w-[400px] rounded-full bg-silver/[0.06] blur-[150px] morph-blob"
          animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-[40%] left-[30%] h-[600px] w-[600px] rounded-full bg-primary/[0.02] blur-[200px]"
          animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      {/* 2. Dot grid pattern — only on right half, faded in with mask so no hard edge */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #B0B8C4 1px, transparent 1px)", backgroundSize: "32px 32px", maskImage: "linear-gradient(to right, transparent 35%, black 55%)", WebkitMaskImage: "linear-gradient(to right, transparent 35%, black 55%)" }} />

      {/* 3. Constellation star field — only on right/content side, faded */}
      <div style={{ maskImage: "linear-gradient(to right, transparent 30%, black 50%)", WebkitMaskImage: "linear-gradient(to right, transparent 30%, black 50%)" }}>
        <ConstellationField />
      </div>

      {/* 4. Floating travel icon particles */}
      <FloatingTravelIcons />

      {/* 5. Live compass */}
      <RealCompass />

      {/* 6. 3D WebGL Globe — visible on all sizes */}
      {/* Mobile/tablet: centered, subtle bg behind text. Desktop: full left position */}
      <div className="absolute inset-0 opacity-40 sm:opacity-50 md:opacity-60 lg:opacity-100 lg:left-[-32%] lg:top-0 lg:bottom-0 lg:right-[30%] lg:inset-auto pointer-events-none" style={{ zIndex: 1, maskImage: "linear-gradient(to right, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, black 60%, transparent 100%)" }}>
        <Globe3D />
      </div>

      {/* Content — text shadow on mobile ensures readability over globe */}
      <motion.div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center [text-shadow:0_1px_8px_rgba(255,255,255,0.8)] lg:[text-shadow:none]" style={{ y: contentY, opacity: contentOpacity }}>
        {/* Main headline */}
        <h1 className="font-heading text-[1.8rem] sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-[0.12em] uppercase">
          <span className="metallic-text">
            <RevealText text="Discover the World," delay={0.4} />
          </span>
          <br />
          <span className="block mt-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.95 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -40, filter: "blur(8px)", scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block metallic-red pr-[0.15em]"
              >
                {heroWords[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-7 text-[14px] sm:text-[15px] leading-[1.9] text-foreground/60 max-w-lg mx-auto font-light tracking-wide"
        >
          Your next adventure is just <span className="text-foreground font-medium">one conversation away</span>
          {". "}We handle everything from itinerary to boarding pass, while you focus on the excitement.
        </motion.p>

        {/* Tagline with animated dots — brand colors */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-3 flex items-center justify-center gap-3 text-[10px] sm:text-[11px] font-heading uppercase text-secondary/60"
        >
          <span>See it</span>
          <motion.span className="h-1.5 w-1.5 rounded-full bg-secondary/50"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
          <span>Feel it</span>
          <motion.span className="h-1.5 w-1.5 rounded-full bg-silver/50"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
          <span>Live it</span>
        </motion.div>

        {/* CTAs — brand styled */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={() => leadModal.open("hero-start-planning")}
            className="metallic-cta group inline-flex items-center gap-2.5 px-6 py-3 sm:px-9 sm:py-4 text-[10px] sm:text-[11px] text-white tracking-[0.15em] uppercase cursor-pointer w-auto justify-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Planning <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
            </span>
          </button>
          <button
            onClick={() => leadModal.open("hero-explore")}
            className="outline-cta group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-[9px] sm:text-[10px] font-heading text-foreground/50 tracking-[0.12em] uppercase cursor-pointer w-auto justify-center"
          >
            Explore Destinations
            <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </motion.div>

        {/* Trust stats — glass card with brand accents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="mt-10 sm:mt-14 inline-flex items-center rounded-xl sm:rounded-2xl border border-silver/15 bg-white/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(11,20,38,0.06)] overflow-hidden"
        >
          {[
            { target: 500, suffix: "+", label: "Happy Travelers", color: "text-secondary" },
            { target: 50, suffix: "+", label: "Destinations", color: "text-primary" },
            { label: "Human Support", custom: "24/7", color: "text-secondary" },
            { target: 4, suffix: ".9/5", label: "Rating", decimal: true, color: "text-primary" },
          ].map((s, i) => {
            const counter = s.target ? useCounter(s.target) : null
            return (
              <div key={s.label} className={cn(
                "px-3 sm:px-7 py-2.5 sm:py-4 text-center",
                i > 0 && "border-l border-silver/10",
              )}>
                <p className={cn("text-sm sm:text-xl font-heading tabular-nums tracking-wider", s.color || "text-foreground/80")}>
                  {s.custom || (
                    <span ref={counter!.ref}>
                      {s.decimal ? `${counter!.count}` : counter!.count.toLocaleString()}{s.suffix}
                    </span>
                  )}
                </p>
                <p className="text-[5px] sm:text-[7px] text-silver-dark/50 mt-0.5 tracking-[0.2em] sm:tracking-[0.25em] uppercase font-heading">{s.label}</p>
              </div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   2. TRUST MARQUEE
   ═══════════════════════════════════════════════════════════════ */

function TrustMarquee() {
  return (
    <section className="py-6 bg-white border-b border-silver/10 -mt-px">
      <Marquee
        items={[
          "Trusted by 500+ travelers",
          "4.9/5 average rating",
          "24/7 real human assistance",
          "Verified testimonials",
          "Zero IVR, zero bots",
          "Personalised itineraries",
          "AR/VR preview — coming soon",
          "One-stop travel marketplace — coming soon",
          "Based in Pune, India",
          "Leisure · Education · Adventure",
        ]}
        speed={40}
      />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3a. PROBLEM — The fragmented travel story
   ═══════════════════════════════════════════════════════════════ */

const problems = [
  { Icon: Layers, title: "Too Many Platforms", short: "5+ apps just for 1 trip", stat: "5+", visual: "Juggling between booking, reviews, visa, flights..." },
  { Icon: SearchX, title: "No Personal Guidance", short: "Algorithms don't understand you", stat: "0%", visual: "Cookie-cutter plans that miss what matters to you" },
  { Icon: EyeOff, title: "Hidden Pricing", short: "Surprise fees at checkout", stat: "30%", visual: "The price you see is never the price you pay" },
  { Icon: BookOpenCheck, title: "Zero Support On-Trip", short: "You're on your own after booking", stat: "0%", visual: "Once you've paid, good luck reaching anyone if things go wrong" },
]

function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="relative overflow-hidden noise-overlay">
      <div className="absolute inset-0 bg-brand-gradient-dark" />
      {/* Gradient accent blobs — hidden on mobile for perf */}
      <div className="hidden sm:block absolute top-[20%] left-[10%] h-[500px] w-[500px] rounded-full bg-secondary/[0.04] blur-[200px] morph-blob" />
      <div className="hidden sm:block absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-silver/[0.02] blur-[180px]" />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, rgba(176,184,196,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left — Animated chaos visual */}
          <div className="relative flex items-center justify-center" data-reveal>
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
              {/* Central chaos icon — static on mobile, animated on desktop */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={inView ? { rotate: [0, 3, -3, 0] } : {}}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full shadow-[0_0_50px_rgba(196,50,74,0.15)]"
                    style={{ background: "linear-gradient(135deg, rgba(196,50,74,0.06), rgba(196,50,74,0.2))", border: "2px solid rgba(196,50,74,0.15)" }}>
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06]">
                      <Layers className="h-7 w-7 sm:h-8 sm:w-8 text-secondary/70" strokeWidth={1.5} style={{ filter: "drop-shadow(0 2px 8px rgba(196,50,74,0.5))" }} />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Orbiting problem tabs — CSS animation on mobile (GPU-accelerated), Framer on desktop */}
              {([
                { label: "Flights", Icon: Plane, angle: 0, radius: 100, radiusSm: 85, dur: 15 },
                { label: "Hotels", Icon: Hotel, angle: 72, radius: 120, radiusSm: 95, dur: 18 },
                { label: "Visa", Icon: FileText, angle: 144, radius: 105, radiusSm: 88, dur: 14 },
                { label: "Reviews", Icon: Star, angle: 216, radius: 125, radiusSm: 98, dur: 20 },
                { label: "Budget", Icon: DollarSign, angle: 288, radius: 115, radiusSm: 92, dur: 16 },
              ] as { label: string; Icon: LucideIcon; angle: number; radius: number; radiusSm: number; dur: number }[]).map((tab) => (
                <motion.div
                  key={tab.label}
                  className="absolute top-1/2 left-1/2"
                  animate={inView ? { rotate: 360 } : {}}
                  transition={{ duration: tab.dur, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "0 0", willChange: "transform" }}
                >
                  <motion.div
                    className="glass-card-dark flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                    style={{ transform: `rotate(${tab.angle}deg) translateX(var(--orbit-r)) rotate(-${tab.angle}deg)`, ["--orbit-r" as string]: `${tab.radiusSm}px` }}
                    animate={inView ? { rotate: -360 } : {}}
                    transition={{ duration: tab.dur, repeat: Infinity, ease: "linear" }}
                  >
                    <style>{`@media(min-width:640px){[style*="--orbit-r"]{--orbit-r:${tab.radius}px !important}}`}</style>
                    <div className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-secondary/10">
                      <tab.Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-secondary/60" strokeWidth={2} />
                    </div>
                    <span className="text-[8px] sm:text-[10px] text-white/50 font-semibold tracking-wide">{tab.label}</span>
                  </motion.div>
                </motion.div>
              ))}

              {/* Broken connection lines — desktop only */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block" viewBox="0 0 320 320">
                {[
                  { x1: 120, y1: 80, x2: 200, y2: 60, d: 3 },
                  { x1: 220, y1: 130, x2: 250, y2: 200, d: 4.5 },
                  { x1: 180, y1: 240, x2: 100, y2: 250, d: 3.5 },
                  { x1: 70, y1: 190, x2: 60, y2: 120, d: 5 },
                ].map((line, i) => (
                  <motion.line key={`broken-${i}`} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke="rgba(196,50,74,0.15)" strokeWidth="1" strokeDasharray="4 8"
                    animate={inView ? { opacity: [0, 0.4, 0], strokeDashoffset: [0, -20] } : {}}
                    transition={{ duration: line.d, repeat: Infinity, ease: "linear" }} />
                ))}
              </svg>

              {/* Pulsing chaos rings — simplified on mobile */}
              <div className="absolute inset-8 rounded-full border border-dashed border-secondary/10 sm:animate-none"
                style={{ animation: "spin 20s linear infinite" }} />
              <motion.div className="hidden sm:block absolute inset-2 rounded-full border border-dashed border-silver/5"
                animate={inView ? { scale: [1, 0.96, 1], rotate: [0, -180] } : {}}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />

              {/* Floating error toasts */}
              {[
                { text: "Price changed!", x: "-10%", y: "18%", delay: 0, dur: 8 },
                { text: "Hotel sold out", x: "72%", y: "62%", delay: 4, dur: 8 },
              ].map((toast, i) => (
                <motion.div key={`toast-${i}`}
                  className="absolute rounded-lg bg-secondary/[0.08] border border-secondary/[0.12] px-2 sm:px-3 py-1 sm:py-1.5 backdrop-blur-sm pointer-events-none"
                  style={{ left: toast.x, top: toast.y }}
                  animate={inView ? { opacity: [0, 0.8, 0.8, 0], y: [10, 0, 0, -10] } : {}}
                  transition={{ duration: toast.dur, delay: toast.delay, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-[8px] sm:text-[9px] text-secondary/70 font-mono font-bold tracking-wide whitespace-nowrap">{toast.text}</span>
                </motion.div>
              ))}

              {/* Warning pulse — desktop only */}
              <motion.div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                animate={inView ? { width: [40, 200, 40], height: [40, 200, 40], opacity: [0.1, 0, 0.1] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                style={{ background: "radial-gradient(circle, rgba(196,50,74,0.15) 0%, transparent 70%)" }} />
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <div data-reveal>
              <div className="brand-badge brand-badge-red mb-6">
                <SearchX className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>The Problem</span>
              </div>
            </div>
            <div data-reveal style={{ transitionDelay: "0.1s" }}>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.08em] leading-tight">
                <span className="metallic-text-dark">Travel Planning Is</span>{" "}
                <span className="metallic-red">Broken</span>
              </h2>
            </div>

            {/* Problem chips — with explanatory tooltips */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {problems.map((p, i) => (
                <motion.div
                  key={p.title}
                  className="group relative glass-card-dark rounded-xl p-4 cursor-default hover:z-20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <div className="icon-box-red flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                      <p.Icon className="h-5 w-5 text-secondary/80" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-white/65 tracking-wide">{p.title}</p>
                      <p className="text-[10px] text-silver/30 mt-0.5">{p.short}</p>
                    </div>
                  </div>
                  {/* Hover tooltip — explains the problem */}
                  <div className="absolute inset-x-4 -top-1 -translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
                    <div className="bg-primary/95 border border-silver/10 rounded-lg px-3 py-2 shadow-lg mb-2">
                      <p className="text-[10px] text-silver/50 leading-relaxed">{p.visual}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Transition arrow */}
            <motion.div className="mt-10 flex items-center gap-4" data-reveal style={{ transitionDelay: "0.5s" }}>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-silver/15 to-transparent" />
              <p className="text-[12px] tracking-[0.15em] font-heading text-silver/50 flex items-center gap-2 relative">
                <motion.span animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <Sparkles className="h-4 w-4 text-secondary/50" strokeWidth={1.5} />
                </motion.span>
                What if one platform could do it all?
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3b. HOW IT WORKS — Step-by-step with visual storytelling
   ═══════════════════════════════════════════════════════════════ */

const steps: { Icon: LucideIcon; title: string; desc: string; action: string; color: string }[] = [
  { Icon: MessageSquare, title: "Consult", desc: "Share your dream trip with a real human — no forms, no bots", action: "You talk, we listen", color: "#C4324A" },
  { Icon: Map, title: "Plan", desc: "We craft your perfect day-by-day itinerary tailored to you", action: "Custom itinerary in 24hrs", color: "#B0B8C4" },
  { Icon: Ticket, title: "Book", desc: "Flights, stays, visa — all handled end-to-end in one place", action: "Everything sorted", color: "#C4324A" },
  { Icon: Globe, title: "Travel", desc: "On-tour support, 24/7. We pick up. Always. No exceptions.", action: "We're with you", color: "#B0B8C4" },
]

function HowItWorksSection() {
  const howRef = useRef<HTMLElement>(null)
  const howInView = useInView(howRef, { once: true, margin: "-100px" })
  const leadModal = useLeadModal()

  /* Scroll-linked progress for the section */
  const { scrollYProgress } = useScroll({ target: howRef, offset: ["start end", "end center"] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  /* Derived values from scroll progress */
  const pathLength = useTransform(smoothProgress, [0.1, 0.7], [0, 1])
  const step1Opacity = useTransform(smoothProgress, [0.05, 0.2], [0, 1])
  const step2Opacity = useTransform(smoothProgress, [0.15, 0.35], [0, 1])
  const step3Opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1])
  const step4Opacity = useTransform(smoothProgress, [0.45, 0.65], [0, 1])
  const stepOpacities = [step1Opacity, step2Opacity, step3Opacity, step4Opacity]

  /* Floating decorative elements reveal */
  const deco1 = useTransform(smoothProgress, [0.2, 0.4], [0, 1])
  const deco3 = useTransform(smoothProgress, [0.45, 0.6], [0, 1])
  const deco4 = useTransform(smoothProgress, [0.55, 0.7], [0, 1])

  /* Glow dot position along path */
  const dotPosition = useTransform(smoothProgress, [0.1, 0.75], [0, 100])
  const dotLeft = useTransform(dotPosition, (v) => `${v}%`)

  /* Pre-computed scale transforms for each step circle (avoid hooks in loop) */
  const step1Scale = useTransform(step1Opacity, [0, 1], [0.7, 1])
  const step2Scale = useTransform(step2Opacity, [0, 1], [0.7, 1])
  const step3Scale = useTransform(step3Opacity, [0, 1], [0.7, 1])
  const step4Scale = useTransform(step4Opacity, [0, 1], [0.7, 1])
  const stepScales = [step1Scale, step2Scale, step3Scale, step4Scale]

  return (
    <section ref={howRef} className="py-20 sm:py-28 bg-brand-mesh overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14" data-reveal>
          <p className="text-[10px] font-heading font-normal tracking-[0.3em] uppercase text-secondary/70">Simple By Design</p>
          <h2 className="mt-3 font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.08em] leading-tight metallic-text heading-accent">
            Four Steps to Your Perfect Trip
          </h2>
        </div>

        {/* Steps — with scroll-animated path */}
        <div className="relative">
          {/* Scroll-animated SVG connector path (desktop) — matches reference animation */}
          <div className="hidden md:block absolute top-[30px] left-[4%] right-[4%] h-[100px] z-0">
            <svg className="w-full h-full" viewBox="0 0 900 100" fill="none">
              <defs>
                <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C4324A" />
                  <stop offset="50%" stopColor="#D63B55" />
                  <stop offset="100%" stopColor="#C4324A" />
                </linearGradient>
              </defs>
              {/* Faint guide path — dramatic sine wave matching reference */}
              <path d="M20 50 C80 10 140 10 225 50 C310 90 370 90 450 50 C530 10 590 10 675 50 C760 90 820 30 880 50"
                stroke="#C4324A" strokeOpacity="0.08" strokeWidth="2" strokeDasharray="6 4" fill="none" />
              {/* Main animated solid path */}
              <motion.path d="M20 50 C80 10 140 10 225 50 C310 90 370 90 450 50 C530 10 590 10 675 50 C760 90 820 30 880 50"
                stroke="url(#pathGrad)" strokeWidth="2.5" fill="none"
                style={{ pathLength }} />
              {/* Scattered node dots along the new curve — grouped by step */}
              {/* Step 1 region dots */}
              {[[20, 50, true], [60, 25, false], [110, 12, false], [170, 30, false]].map(([cx, cy, big], idx) => (
                <motion.circle key={`d1-${idx}`} cx={cx as number} cy={cy as number} r={big ? 5 : 3}
                  fill="#C4324A" fillOpacity={big ? 1 : 0.6}
                  stroke={big ? "#FFFFFF" : "none"} strokeWidth={big ? 2 : 0}
                  style={{ opacity: step1Opacity }} />
              ))}
              {/* Step 2 region dots */}
              {[[225, 50, true], [280, 78, false], [340, 88, false], [400, 70, false]].map(([cx, cy, big], idx) => (
                <motion.circle key={`d2-${idx}`} cx={cx as number} cy={cy as number} r={big ? 5 : 3}
                  fill="#C4324A" fillOpacity={big ? 1 : 0.6}
                  stroke={big ? "#FFFFFF" : "none"} strokeWidth={big ? 2 : 0}
                  style={{ opacity: step2Opacity }} />
              ))}
              {/* Step 3 region dots */}
              {[[450, 50, true], [500, 22, false], [560, 12, false], [620, 30, false]].map(([cx, cy, big], idx) => (
                <motion.circle key={`d3-${idx}`} cx={cx as number} cy={cy as number} r={big ? 5 : 3}
                  fill="#C4324A" fillOpacity={big ? 1 : 0.6}
                  stroke={big ? "#FFFFFF" : "none"} strokeWidth={big ? 2 : 0}
                  style={{ opacity: step3Opacity }} />
              ))}
              {/* Step 4 region dots */}
              {[[675, 50, true], [730, 75, false], [800, 42, false], [880, 50, true]].map(([cx, cy, big], idx) => (
                <motion.circle key={`d4-${idx}`} cx={cx as number} cy={cy as number} r={big ? 5 : 3}
                  fill="#C4324A" fillOpacity={big ? 1 : 0.6}
                  stroke={big ? "#FFFFFF" : "none"} strokeWidth={big ? 2 : 0}
                  style={{ opacity: step4Opacity }} />
              ))}
              {/* Diamond shapes between steps */}
              <motion.rect x={147} y={17} width={7} height={7} fill="#C4324A" fillOpacity="0.5" transform="rotate(45 150 20)" style={{ opacity: step2Opacity }} />
              <motion.rect x={372} y={83} width={7} height={7} fill="#C4324A" fillOpacity="0.5" transform="rotate(45 375 86)" style={{ opacity: step3Opacity }} />
              <motion.rect x={597} y={17} width={7} height={7} fill="#C4324A" fillOpacity="0.5" transform="rotate(45 600 20)" style={{ opacity: step4Opacity }} />
            </svg>
            {/* Traveling glow dot */}
            <motion.div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full shadow-[0_0_14px_rgba(196,50,74,0.7)]"
              style={{ background: "linear-gradient(135deg, #C4324A, #E8425A)", left: dotLeft }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step.title} style={{ opacity: stepOpacities[i] }}>
                <div className="group text-center relative magnetic-card">
                  {/* Premium icon circle */}
                  <motion.div
                    className="relative mx-auto mb-5 flex h-[120px] w-[120px] items-center justify-center rounded-full transition-all duration-500 group-hover:-translate-y-3"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}08, ${step.color}15)`,
                      border: `2px solid ${step.color}25`,
                      boxShadow: `0 8px 30px ${step.color}12`,
                      scale: stepScales[i],
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute inset-3 rounded-full border border-dashed" style={{ borderColor: `${step.color}12` }} />
                    <motion.div className="magnetic-icon"
                      animate={i === 0 ? { y: [0, -3, 0] } : i === 1 ? { rotateY: [0, 10, 0] } : i === 2 ? { rotate: [0, 5, -5, 0] } : { rotateZ: [0, 360] }}
                      transition={i === 3 ? { duration: 20, repeat: Infinity, ease: "linear" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <step.Icon className="h-11 w-11" style={{ color: step.color, filter: `drop-shadow(0 2px 6px ${step.color}35)` }} strokeWidth={1.5} />
                    </motion.div>
                    {/* Number badge */}
                    <div className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full text-white text-[12px] font-bold shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)` }}>
                      {i + 1}
                    </div>
                    {/* Pulse ring */}
                    <motion.div className="absolute -inset-1 rounded-full border"
                      style={{ borderColor: `${step.color}15` }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }} />

                    {/* Floating decorative elements — matching reference animation */}
                    {/* Step 1: Chat bubble outlines */}
                    {i === 0 && (
                      <>
                        <motion.div className="hidden md:block absolute -left-8 -top-2" style={{ opacity: deco1 }}>
                          <motion.div animate={{ y: [0, -4, 0], rotate: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                            <MessageSquare className="h-5 w-5 text-secondary/35" strokeWidth={1.5} />
                          </motion.div>
                        </motion.div>
                        <motion.div className="hidden md:block absolute -left-6 top-12" style={{ opacity: deco1 }}>
                          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                            <MessageCircle className="h-4 w-4 text-secondary/25" strokeWidth={1.5} />
                          </motion.div>
                        </motion.div>
                      </>
                    )}
                    {/* Step 3: VISA card + Key — matching reference */}
                    {i === 2 && (
                      <>
                        <motion.div className="hidden md:block absolute -right-10 bottom-4" style={{ opacity: deco3 }}>
                          <motion.div animate={{ y: [0, -3, 0], rotate: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="flex items-center gap-0.5 rounded bg-secondary/[0.08] border border-secondary/[0.12] px-1.5 py-0.5">
                            <CreditCard className="h-3 w-3 text-secondary/50" strokeWidth={1.5} />
                            <span className="text-[7px] font-bold text-secondary/40 tracking-wide">VISA</span>
                          </motion.div>
                        </motion.div>
                        <motion.div className="hidden md:block absolute -right-6 -top-4" style={{ opacity: deco3 }}>
                          <motion.div animate={{ y: [0, 4, 0], rotate: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
                            <KeyRound className="h-4 w-4 text-secondary/30" strokeWidth={1.5} />
                          </motion.div>
                        </motion.div>
                      </>
                    )}
                    {/* Step 4: Cross sparkle/asterisk decorations — matching reference */}
                    {i === 3 && (
                      <>
                        <motion.div className="hidden md:block absolute -right-6 -top-4" style={{ opacity: deco4 }}>
                          <motion.div animate={{ scale: [1, 1.4, 1], rotate: [0, 90, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 0v14M0 7h14M2 2l10 10M12 2L2 12" stroke="#C4324A" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" /></svg>
                          </motion.div>
                        </motion.div>
                        <motion.div className="hidden md:block absolute -right-3 top-10" style={{ opacity: deco4 }}>
                          <motion.div animate={{ scale: [0.8, 1.3, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0v10M0 5h10" stroke="#C4324A" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" /></svg>
                          </motion.div>
                        </motion.div>
                        <motion.div className="hidden md:block absolute -left-5 -top-2" style={{ opacity: deco4 }}>
                          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 0v12M0 6h12M1.7 1.7l8.6 8.6M10.3 1.7l-8.6 8.6" stroke="#B0B8C4" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" /></svg>
                          </motion.div>
                        </motion.div>
                      </>
                    )}
                  </motion.div>

                  {/* Arrow connector (desktop) */}
                  {i < 3 && (
                    <motion.div className="hidden md:block absolute top-[60px] -right-3 z-10"
                      style={{ opacity: stepOpacities[i + 1] }}>
                      <ArrowRight className="h-4 w-4 text-silver/30" />
                    </motion.div>
                  )}

                  <h3 className="font-heading text-lg font-normal tracking-[0.06em] metallic-text">{step.title}</h3>
                  <p className="mt-1.5 text-[12px] text-muted-foreground font-light leading-relaxed max-w-[180px] mx-auto">{step.desc}</p>
                  {/* Action label */}
                  <p className="mt-3 text-[9px] font-heading tracking-[0.15em] uppercase text-secondary/50">
                    {step.action}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mini timeline — visual speed indicator */}
        <div className="mt-12 flex items-center justify-center gap-3 flex-wrap" data-reveal style={{ transitionDelay: "0.4s" }}>
          {[
            { day: "Step 1", text: "You call us", icon: Phone, color: "#C4324A" },
            { day: "Step 2", text: "Itinerary ready", icon: Map, color: "#B0B8C4" },
            { day: "Step 3", text: "Everything booked", icon: CheckCircle, color: "#C4324A" },
          ].map((item, i) => (
            <div key={item.day} className="flex items-center gap-3">
              <motion.div className="flex items-center gap-2.5 rounded-full bg-white border border-silver/15 px-4 py-2.5 shadow-sm group hover:shadow-md hover:border-secondary/15 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={howInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.5 + i * 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <item.icon className="h-3.5 w-3.5" style={{ color: item.color }} strokeWidth={1.5} />
                <span className="text-[9px] font-heading font-medium tracking-[0.15em] uppercase" style={{ color: item.color }}>{item.day}</span>
                <span className="text-[11px] text-muted-foreground/60">{item.text}</span>
              </motion.div>
              {i < 2 && <ArrowRight className="h-3 w-3 text-silver/30 hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center" data-reveal style={{ transitionDelay: "0.5s" }}>
          <button onClick={() => leadModal.open("how-it-works")} className="metallic-cta group inline-flex items-center gap-2.5 px-9 py-4 text-[11px] text-white tracking-[0.15em] uppercase cursor-pointer">
            <span className="relative z-10 flex items-center gap-2">
              Start Your Journey <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3. CATEGORIES — enhanced with icon animations & visual hints
   ═══════════════════════════════════════════════════════════════ */

const categories = [
  { icon: Palmtree, title: "Leisure", tagline: "Unwind & Recharge", desc: "Pristine beaches, luxury resorts, and serene hill stations — for those who travel to breathe.", image: "/images/categories/leisure.jpg", num: "01", stat: "200+ packages", accent: "#C4324A" },
  { icon: GraduationCap, title: "Education", tagline: "Learn & Grow", desc: "Heritage walks, cultural immersions, and field trips that turn the world into your classroom.", image: "/images/categories/education.jpg", num: "02", stat: "15+ programs", accent: "#B0B8C4" },
  { icon: Mountain, title: "Adventure", tagline: "Thrill & Conquer", desc: "Scale peaks, raft rapids, trek ancient trails. For those who travel to feel truly alive.", image: "/images/categories/adventure.jpg", num: "03", stat: "30+ experiences", accent: "#C4324A" },
]

function CategoriesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16" data-reveal>
          <p className="text-[10px] font-heading font-normal tracking-[0.3em] uppercase text-secondary/70">How Do You Travel?</p>
          <h2 className="mt-4 font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.12em] leading-tight metallic-text heading-accent">
            Three Ways to Explore
          </h2>
        </div>

        <div className="space-y-6">
          {categories.map((cat, i) => {
            const flip = i % 2 === 1
            return (
              <div key={cat.title} data-reveal style={{ transitionDelay: `${i * 0.12}s` }}>
                <TiltCard strength={4} className="cursor-pointer">
                  <Link href={`/categories/${cat.title.toLowerCase()}`} className="group block">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(11,20,38,0.04)] border border-silver/10 transition-all duration-500 group-hover:shadow-[0_12px_50px_rgba(11,20,38,0.1)] group-hover:border-secondary/10">
                      <div className={cn("grid grid-cols-1 md:grid-cols-5", flip && "md:[direction:rtl]")}>
                        {/* Photo */}
                        <div className="relative h-56 sm:h-64 md:h-80 md:col-span-2 overflow-hidden">
                          <Image src={cat.image} alt={cat.title} fill className="object-cover transition-all duration-[2s] group-hover:scale-110 group-hover:translate-x-1 group-hover:translate-y-[-2px]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/15 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-primary/5" />
                          <span className="absolute bottom-4 left-5 text-6xl font-bold text-white/[0.08] font-heading select-none overflow-hidden">
                            <span className="relative inline-block">{cat.num}
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s]" />
                            </span>
                          </span>
                          <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-xl border border-white/10">
                            <cat.icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                          </div>
                        </div>
                        {/* Content */}
                        <div className={cn("md:col-span-3 flex flex-col justify-center p-8 sm:p-12", flip && "md:[direction:ltr]")}>
                          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase" style={{ color: `${cat.accent}99` }}>{cat.tagline}</p>
                          <h3 className="mt-3 font-heading text-2xl sm:text-3xl font-normal metallic-text tracking-[0.1em]">{cat.title}</h3>
                          <p className="mt-4 text-[14px] leading-[1.8] text-muted-foreground max-w-md font-light tracking-wide">{cat.desc}</p>
                          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary/[0.04] border border-secondary/[0.08] px-3 py-1 text-[10px] font-medium text-secondary/50 tracking-[0.1em]">
                            {cat.stat}
                          </div>
                          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground/40 group-hover:text-secondary transition-colors duration-500">
                            Explore {cat.title}
                            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   4. DESTINATIONS — photo cards with enhanced interaction
   ═══════════════════════════════════════════════════════════════ */

const destinations = [
  { name: "Bali", country: "Indonesia", price: 45000, priceLabel: "45,000", rating: "4.8", image: "/images/destinations/bali.jpg", accent: "#C4324A" },
  { name: "Santorini", country: "Greece", price: 85000, priceLabel: "85,000", rating: "4.9", image: "/images/destinations/santorini.jpg", accent: "#B0B8C4" },
  { name: "Jaipur", country: "India", price: 12000, priceLabel: "12,000", rating: "4.7", image: "/images/destinations/jaipur.jpg", accent: "#C4324A" },
  { name: "Swiss Alps", country: "Switzerland", price: 120000, priceLabel: "1,20,000", rating: "4.9", image: "/images/destinations/swiss-alps.jpg", accent: "#0A1425" },
]

function DestinationsSection() {
  return (
    <section className="py-24 bg-brand-gradient-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div data-reveal>
            <p className="text-[10px] font-heading font-normal tracking-[0.3em] uppercase text-secondary/70">Trending Now</p>
            <h2 className="mt-3 font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.12em] metallic-text">
              Popular Destinations
            </h2>
          </div>
          <div data-reveal style={{ transitionDelay: "0.1s" }}>
            <Link href="/destinations" className="animated-underline inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-secondary transition-colors group">
              View all destinations <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((dest, i) => (
            <div key={dest.name} data-reveal-scale style={{ transitionDelay: `${i * 0.1}s` }}>
              <TiltCard strength={8}>
                <Link href={`/destinations/${dest.name.toLowerCase().replace(/\s+/g, "-")}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl shadow-[0_2px_20px_rgba(11,20,38,0.06)] transition-all duration-500 group-hover:shadow-[0_16px_60px_rgba(11,20,38,0.15)]">
                    <div className="relative h-80 sm:h-[22rem]">
                      <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

                      {/* Shine sweep */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.4s] ease-in-out" />

                      {/* Rating chip */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-primary/40 backdrop-blur-xl px-2.5 py-1 border border-silver/[0.1]">
                        <Star className="h-3 w-3 fill-secondary text-secondary" />
                        <span className="text-[11px] font-semibold text-white/90">{dest.rating}</span>
                      </div>

                      {/* Arrow */}
                      <div className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                        <ArrowRight className="h-4 w-4 text-white/70" />
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="font-heading text-lg font-normal text-white tracking-[0.1em]">{dest.name}</h3>
                        <div className="flex items-center gap-1.5 mt-1 text-silver-light/60">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{dest.country}</span>
                        </div>
                        <div className="mt-3 flex items-baseline gap-1">
                          <span className="text-[10px] text-silver/40 uppercase tracking-wider font-body">From</span>
                          <span className="text-xl font-bold text-white font-heading tracking-wide">₹{dest.priceLabel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </div>
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
    <section ref={ref} className="relative overflow-hidden noise-overlay">
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(160deg, #030810 0%, #0A1425 35%, #152240 65%, #0A1425 100%)", backgroundSize: "400% 400%", animation: "gradientShift 25s ease infinite" }} />
      <div className="absolute top-0 right-[10%] h-[600px] w-[600px] rounded-full bg-secondary/[0.04] blur-[200px] animate-[orbFloat1_30s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-[5%] h-[400px] w-[400px] rounded-full bg-silver/[0.02] blur-[150px] animate-[orbFloat2_35s_ease-in-out_infinite]" />
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(176,184,196,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(176,184,196,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — content */}
          <div>
            <div data-reveal>
              <div className="brand-badge mb-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <HeartHandshake className="h-3.5 w-3.5 text-secondary/70" />
                <span className="text-white/25">Our Promise</span>
              </div>
            </div>

            <div data-reveal style={{ transitionDelay: "0.1s" }}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] tracking-[0.12em]">
                <span className="metallic-text-dark">We Pick Up.</span>
                <br />
                <span className="metallic-red">Every Call.</span>
                <br />
                <span className="metallic-silver">Every Time.</span>
              </h2>
            </div>

            <div data-reveal style={{ transitionDelay: "0.2s" }}>
              <p className="mt-6 text-[14px] leading-[1.9] text-silver/35 max-w-md font-light tracking-wide">
                Not a chatbot. Not a menu. Not a queue.
                <br />
                Just a real person who genuinely cares about making your trip perfect.
              </p>
            </div>

            {/* Anti-features — clearly styled with brand colors */}
            <div data-reveal className="mt-7 flex flex-wrap gap-2.5" style={{ transitionDelay: "0.3s" }}>
              {[
                { icon: PhoneOff, label: "No IVR" },
                { icon: Bot, label: "No Chatbots" },
                { icon: Users, label: "No Queues" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 rounded-full bg-secondary/[0.05] border border-secondary/[0.08] px-4 py-2">
                  <item.icon className="h-3 w-3 text-secondary/50" />
                  <span className="text-[11px] text-silver/25 line-through decoration-secondary/30">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div data-reveal className="mt-8 flex items-center gap-5" style={{ transitionDelay: "0.4s" }}>
              <Link href="/consultation" className="metallic-cta group inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-bold text-white tracking-[0.1em] uppercase">
                <span className="relative z-10 flex items-center gap-2">
                  <motion.span animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}>
                    <Phone className="h-4 w-4" />
                  </motion.span>
                  Talk to a Human
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <motion.div className="h-1.5 w-1.5 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="text-[10px] text-silver/15 tracking-wide">Avg. response: 30s</span>
              </div>
            </div>
          </div>

          {/* Right — animated chat */}
          <div data-reveal-right className="flex justify-center lg:justify-end">
            <TiltCard strength={4} className="w-full max-w-[360px]">
              <div className="glass-card-dark rounded-[28px] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
                {/* Header */}
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] border border-silver/[0.06] px-4 py-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary/20 to-silver/10 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white/60" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-white/80">TravelSense</p>
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
                          ? "rounded-br-sm bg-secondary/40 border border-secondary/20"
                          : "rounded-bl-sm bg-white/[0.06] border border-silver/[0.06]"
                      )}>
                        <p className="text-[12px] leading-relaxed text-white/75">{msg.text}</p>
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
                          <div key={d} className="h-1.5 w-1.5 rounded-full bg-silver/20 animate-bounce" style={{ animationDelay: `${d * 150}ms` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: msgCount >= 4 ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-green-500/[0.04] border border-green-500/[0.08] py-2.5"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-[10px] font-medium text-green-400/60">Response: under 30 seconds</p>
                </motion.div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   5b. WHAT SETS US APART — enhanced flip cards with visual clarity
   ═══════════════════════════════════════════════════════════════ */

/* Unique animation per differentiator card */
const cardAnimations = [
  // Card 0 — Consultation: typing dots appear inside
  { animate: { y: [0, -2, 0] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const } },
  // Card 1 — Shield: heartbeat pulse
  { animate: { scale: [1, 1.12, 1, 1.08, 1] }, transition: { duration: 1.8, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" as const } },
  // Card 2 — Compass: slow continuous rotation
  { animate: { rotate: [0, 360] }, transition: { duration: 15, repeat: Infinity, ease: "linear" as const } },
  // Card 3 — Handshake: horizontal oscillation
  { animate: { x: [0, 3, -3, 2, -1, 0] }, transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const } },
]

const differentiators: { Icon: LucideIcon; title: string; desc: string; benefit: string; vs: string; color: string }[] = [
  { Icon: MessageSquare, title: "Consultation First", desc: "We listen before we sell", benefit: "Your trip, your rules", vs: "Others: aggressive upselling", color: "#C4324A" },
  { Icon: Shield, title: "Women-Led, Trust-Built", desc: "Safety & transparency first", benefit: "Founded by a woman traveler", vs: "Others: faceless corporates", color: "#B0B8C4" },
  { Icon: Compass, title: "All Travel, One Place", desc: "Leisure + Adventure + Education", benefit: "3 categories, 1 platform", vs: "Others: single category", color: "#C4324A" },
  { Icon: Handshake, title: "Tech + Personal Touch", desc: "Smart tools, real humans", benefit: "AI-powered, human-delivered", vs: "Others: chatbots only", color: "#B0B8C4" },
]

function WhatSetsUsApartSection() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})
  const toggleFlip = (i: number) => setFlippedCards((prev) => ({ ...prev, [i]: !prev[i] }))

  return (
    <section className="py-20 bg-brand-mesh">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14" data-reveal>
          <p className="text-[10px] font-heading font-normal tracking-[0.3em] uppercase text-secondary/70">Why TravelSense</p>
          <h2 className="mt-3 font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.08em] leading-tight metallic-text heading-accent">
            What Sets Us Apart
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {differentiators.map((d, i) => (
            <div key={d.title} data-reveal-scale style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="group relative h-[300px] cursor-pointer flip-card-trigger" style={{ perspective: "800px" }} onClick={() => toggleFlip(i)}>
                <div className={cn("flip-card-inner relative w-full h-full transition-transform duration-700", flippedCards[i] && "[transform:rotateY(180deg)]")} style={{ transformStyle: "preserve-3d" }}>
                  {/* Front face */}
                  <div className="absolute inset-0 rounded-2xl bg-white border border-silver/10 p-6 shadow-[0_2px_20px_rgba(11,20,38,0.04)] text-center flex flex-col items-center justify-center transition-shadow duration-500 group-hover:shadow-[0_10px_40px_rgba(11,20,38,0.08)]" style={{ backfaceVisibility: "hidden" }}>
                    <motion.div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${d.color}08, ${d.color}18)`,
                        border: `1.5px solid ${d.color}20`,
                        boxShadow: `0 4px 20px ${d.color}10`,
                      }}>
                      <motion.div className="magnetic-icon"
                        animate={cardAnimations[i].animate}
                        transition={cardAnimations[i].transition}>
                        <d.Icon className="h-9 w-9" style={{ color: d.color, filter: `drop-shadow(0 2px 6px ${d.color}25)` }} strokeWidth={1.5} />
                      </motion.div>
                    </motion.div>
                    <h3 className="font-heading text-[15px] font-normal metallic-text tracking-[0.04em] mb-1.5">{d.title}</h3>
                    <p className="text-[12px] text-muted-foreground font-light">{d.desc}</p>
                    {/* Benefit highlight */}
                    <p className="mt-3 text-[10px] font-medium text-secondary/50 tracking-[0.08em]">{d.benefit}</p>
                    <p className="mt-3 text-[9px] text-silver/30 tracking-[0.15em] uppercase"><span className="hidden sm:inline">Hover</span><span className="sm:hidden">Tap</span> to compare</p>
                  </div>
                  {/* Back face */}
                  <div className="absolute inset-0 rounded-2xl border border-silver/10 p-6 shadow-[0_2px_20px_rgba(11,20,38,0.04)] text-center flex flex-col items-center justify-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: `linear-gradient(135deg, ${d.color}08, ${d.color}05)` }}>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full mb-4" style={{ background: `${d.color}15`, border: `1.5px solid ${d.color}20` }}>
                      <CheckCircle className="h-7 w-7" style={{ color: d.color }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-[14px] font-semibold tracking-[0.04em] mb-3" style={{ color: d.color }}>TravelSense</h3>
                    <p className="text-[12px] text-foreground/60 font-medium mb-4">{d.desc}</p>
                    <div className="w-full h-px bg-silver/10 mb-3" />
                    <p className="text-[10px] text-secondary/40 line-through">{d.vs}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   6. COMING SOON — enhanced with brand styling
   ═══════════════════════════════════════════════════════════════ */

function ComingSoonSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14" data-reveal>
          <span className="brand-badge brand-badge-red mb-5">
            <Sparkles className="h-3 w-3" /> Coming Soon
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.12em] metallic-text heading-accent">The Future of Travel</h2>
          <p className="mt-3 text-muted-foreground text-sm">Two game-changing features that will transform how you experience travel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Glasses, title: "AR/VR Destination Preview",
              desc: "Walk through hotels, explore landmarks, preview activities — all before you book. See your destination like you're already there.",
              features: ["360° hotel walkthroughs", "Virtual landmark tours", "Activity previews"],
              gradient: "from-primary-dark via-primary to-primary-light",
            },
            {
              icon: ShoppingBag, title: "Travel Marketplace",
              desc: "Flights, hotels, gear, local experiences — everything for your trip in one place. One search. One checkout. Done.",
              features: ["Flights & accommodation", "Travel gear & essentials", "Local experiences & tours"],
              gradient: "from-primary-light via-primary to-primary-dark",
            },
          ].map((f, i) => (
            <div key={f.title} data-reveal-scale style={{ transitionDelay: `${i * 0.12}s` }}>
              <TiltCard strength={5}>
                <div className="group overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(11,20,38,0.04)] transition-all duration-500 hover:shadow-[0_12px_50px_rgba(11,20,38,0.1)] hover:-translate-y-1 relative">
                  {/* Holographic animated border */}
                  <div className="absolute inset-0 rounded-2xl p-[1.5px] overflow-hidden">
                    <motion.div className="absolute inset-[-200%] rounded-2xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{ background: "conic-gradient(from 0deg, transparent 0%, #C4324A20 25%, #B0B8C430 50%, #C4324A20 75%, transparent 100%)" }} />
                  </div>
                  <div className="relative bg-white rounded-2xl overflow-hidden">
                    {/* Dark header */}
                    <div className={`relative h-44 bg-gradient-to-br ${f.gradient} flex items-center justify-center overflow-hidden`}>
                      {i === 0 ? (
                        <>
                          <motion.div className="absolute top-4 right-6" animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                            <Glasses className="h-5 w-5 text-silver/10" />
                          </motion.div>
                          <motion.div className="absolute bottom-6 left-8" animate={{ y: [0, 5, 0], x: [0, 3, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                            <Compass className="h-4 w-4 text-silver/8" />
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <motion.div className="absolute top-5 left-8" animate={{ y: [0, -4, 0], rotate: [0, -8, 0] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                            <ShoppingBag className="h-5 w-5 text-silver/10" />
                          </motion.div>
                          <motion.div className="absolute bottom-5 right-6" animate={{ y: [0, 4, 0], x: [0, -3, 0] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
                            <Ticket className="h-4 w-4 text-silver/8" />
                          </motion.div>
                        </>
                      )}
                      <div className="relative flex h-18 w-18 items-center justify-center rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-silver/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:bg-white/[0.1]">
                        <f.icon className="h-9 w-9 text-silver/60" strokeWidth={1} />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[8px] font-bold text-silver/60 uppercase tracking-[0.15em] bg-white/[0.06] border border-silver/[0.04] backdrop-blur-xl">
                          <Sparkles className="h-2.5 w-2.5" /> Phase 2
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s]" />
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(176,184,196,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(176,184,196,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                    </div>
                    {/* Content */}
                    <div className="p-7">
                      <h3 className="font-heading text-xl font-normal metallic-text tracking-[0.06em]">{f.title}</h3>
                      <p className="mt-2 text-[13px] text-muted-foreground leading-[1.8] font-light tracking-wide">{f.desc}</p>
                      <ul className="mt-5 space-y-2.5">
                        {f.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2.5 text-sm text-foreground/50">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/[0.06]">
                              <ArrowRight className="h-3 w-3 text-secondary/60" />
                            </div>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   7. TESTIMONIALS — enhanced with better visual hierarchy
   ═══════════════════════════════════════════════════════════════ */

const testimonials = [
  { name: "Priya Sharma", location: "Mumbai", review: "TravelSense made our Kerala trip magical. Every detail felt handpicked — like traveling with a friend who just knows.", initials: "PS", trip: "Kerala, Dec 2025" },
  { name: "Rahul Deshmukh", location: "Pune", review: "Ladakh was flawless. When I needed help at 11pm, someone actually answered. That never happens anywhere.", initials: "RD", trip: "Ladakh, Oct 2025" },
  { name: "Ananya Kulkarni", location: "Bangalore", review: "Bali exceeded everything. Having a real human available 24/7 while abroad felt like a genuine lifeline.", initials: "AK", trip: "Bali, Nov 2025" },
  { name: "Vikram Mehta", location: "Delhi", review: "Organized a trip for 40 students. Heritage walks were beautifully curated. Parents actually called to thank us.", initials: "VM", trip: "Rajasthan, Jan 2026" },
]

function TestimonialsSection() {
  const testRef = useRef<HTMLElement>(null)
  const testInView = useInView(testRef, { once: true, margin: "-80px" })

  return (
    <section ref={testRef} className="py-24 bg-brand-gradient-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14" data-reveal>
          <p className="text-[10px] font-heading font-normal tracking-[0.3em] uppercase text-secondary/70">Real Stories</p>
          <h2 className="mt-3 font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.12em] metallic-text heading-accent">
            Verified by Travelers
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
            Don&apos;t take our word for it. Talk to them directly via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div key={t.name} data-reveal-scale style={{ transitionDelay: `${i * 0.08}s` }}>
              <TiltCard strength={5}>
                <motion.div className="flex flex-col h-full rounded-2xl glass-card p-6 relative"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, rotateY: 10 }}
                  animate={testInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                  {/* Quote mark */}
                  <motion.span className="absolute top-3 right-4 text-4xl font-serif text-secondary/[0.08] leading-none select-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={testInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}>
                    &ldquo;
                  </motion.span>
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <motion.div key={j}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={testInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.15 + j * 0.08, duration: 0.3, type: "spring", stiffness: 300 }}>
                        <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                      </motion.div>
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="flex-1 text-[13px] leading-[1.8] text-muted-foreground font-light tracking-wide">&ldquo;{t.review}&rdquo;</p>
                  {/* Trip tag */}
                  <span className="inline-flex self-start items-center rounded-full bg-primary/[0.04] border border-primary/[0.06] px-3 py-1 text-[10px] font-medium text-primary/60 mt-4">{t.trip}</span>
                  {/* Author */}
                  <div className="mt-4 flex items-center gap-2.5 border-t border-silver/10 pt-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-[10px] font-bold text-white">{t.initials}</div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-[12px] font-semibold text-foreground">{t.name}</p>
                        <BadgeCheck className="h-3.5 w-3.5 text-green-500" />
                      </div>
                      <p className="text-[10px] text-silver-dark">{t.location}</p>
                    </div>
                  </div>
                  {/* Verify link */}
                  <a
                    href="https://wa.me/91XXXXXXXXXX?text=I%20want%20to%20verify%20a%20testimonial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[10px] text-silver/30 hover:text-green-600 transition-colors"
                  >
                    <MessageCircle className="h-3 w-3" /> Verify via WhatsApp
                  </a>
                </motion.div>
              </TiltCard>
            </div>
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
  const ctaRef = useRef<HTMLElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })
  const leadModal = useLeadModal()

  return (
    <section ref={ctaRef} className="relative py-28 sm:py-36 overflow-hidden noise-overlay">
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(160deg, #030810 0%, #0A1425 35%, #152240 65%, #0A1425 100%)", backgroundSize: "400% 400%", animation: "gradientShift 25s ease infinite" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-secondary/[0.05] blur-[200px] animate-[orbFloat1_20s_ease-in-out_infinite]" />
      <div className="absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-silver/[0.02] blur-[150px]" />
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(176,184,196,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(176,184,196,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Animated world map dots — scroll-linked reveal, much more visible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 800 400" className="w-full max-w-5xl opacity-[0.15]">
          {/* North America — fades in with scroll */}
          {[[150,100],[160,110],[140,120],[170,105],[155,130],[145,115],[165,125],[135,110],[148,95],[162,135]].map(([x,y],i) => (
            <motion.circle key={`na-${i}`} cx={x} cy={y} r="4" fill="#B0B8C4"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0 }}
              transition={{ duration: 3, delay: 0.2 + i * 0.1, repeat: Infinity }} />
          ))}
          {/* Europe */}
          {[[380,90],[390,100],[370,95],[400,85],[385,110],[395,95],[405,100],[375,105],[388,80],[402,92]].map(([x,y],i) => (
            <motion.circle key={`eu-${i}`} cx={x} cy={y} r="4" fill="#B0B8C4"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0 }}
              transition={{ duration: 3, delay: 0.8 + i * 0.1, repeat: Infinity }} />
          ))}
          {/* Asia/India — cherry red, hero continent */}
          {[[500,130],[520,140],[510,120],[530,135],[515,150],[525,125],[540,145],[505,140],[498,118],[535,128]].map(([x,y],i) => (
            <motion.circle key={`as-${i}`} cx={x} cy={y} r="4" fill="#C4324A"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
              transition={{ duration: 2.5, delay: 1.4 + i * 0.08, repeat: Infinity }} />
          ))}
          {/* "You are here" pulsing beacon on India */}
          <motion.circle cx="515" cy="138" r="6" fill="#C4324A"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: [0.6, 1, 0.6] } : { opacity: 0 }}
            transition={{ duration: 2, delay: 1.8, repeat: Infinity }} />
          <motion.circle cx="515" cy="138" r="12" fill="none" stroke="#C4324A" strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: [0.4, 0, 0.4], r: [8, 18, 8] } : { opacity: 0 }}
            transition={{ duration: 2, delay: 1.8, repeat: Infinity }} />
          {/* Africa */}
          {[[400,180],[410,200],[390,190],[405,210],[395,175],[415,195],[398,205]].map(([x,y],i) => (
            <motion.circle key={`af-${i}`} cx={x} cy={y} r="3.5" fill="#1B2D4E"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0 }}
              transition={{ duration: 4, delay: 2 + i * 0.15, repeat: Infinity }} />
          ))}
          {/* Australia */}
          {[[600,240],[610,250],[620,245],[605,255],[615,238]].map(([x,y],i) => (
            <motion.circle key={`au-${i}`} cx={x} cy={y} r="3.5" fill="#B0B8C4"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0 }}
              transition={{ duration: 3.5, delay: 2.5 + i * 0.2, repeat: Infinity }} />
          ))}
          {/* Connecting flight lines — more visible */}
          <motion.line x1="160" y1="110" x2="385" y2="100" stroke="#C4324A" strokeWidth="1" strokeDasharray="3 6"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: [0, 0.5, 0], strokeDashoffset: [0, -20] } : { opacity: 0 }}
            transition={{ duration: 4, delay: 3, repeat: Infinity }} />
          <motion.line x1="395" y1="100" x2="520" y2="135" stroke="#B0B8C4" strokeWidth="1" strokeDasharray="3 6"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: [0, 0.5, 0], strokeDashoffset: [0, -20] } : { opacity: 0 }}
            transition={{ duration: 4, delay: 3.5, repeat: Infinity }} />
          <motion.line x1="520" y1="140" x2="610" y2="248" stroke="#C4324A" strokeWidth="1" strokeDasharray="3 6"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: [0, 0.5, 0], strokeDashoffset: [0, -20] } : { opacity: 0 }}
            transition={{ duration: 4, delay: 4, repeat: Infinity }} />
        </svg>
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <div data-reveal>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-normal tracking-[0.12em] leading-[1.15]">
            <span className="metallic-text-dark">Ready to Plan Your</span>
            <br />
            <span className="metallic-red relative inline-block">Dream Trip
              <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }} />
            </span><span className="metallic-text-dark"> ?</span>
          </h2>
        </div>
        <div data-reveal style={{ transitionDelay: "0.1s" }}>
          <p className="mt-5 text-[14px] text-silver/30 max-w-lg mx-auto font-light tracking-wide leading-[1.8]">
            No bots. No waiting. Just honest guidance from a real human who&apos;ll make it happen.
          </p>
        </div>
        <div data-reveal style={{ transitionDelay: "0.12s" }}>
          <p className="mt-3 text-[9px] tracking-[0.3em] uppercase text-silver/20 font-semibold">Seen · Planned · Sorted</p>
        </div>
        <div data-reveal className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ transitionDelay: "0.15s" }}>
          <button onClick={() => leadModal.open("cta-book-consultation")} className="metallic-cta group inline-flex items-center gap-2 px-9 py-4 text-[13px] font-bold text-white tracking-[0.1em] uppercase cursor-pointer">
            <span className="relative z-10 flex items-center gap-2">
              <motion.span animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}>
                <Phone className="h-4 w-4" />
              </motion.span>
              Book Free Consultation
            </span>
          </button>
          <button onClick={() => leadModal.open("cta-browse")} className="inline-flex items-center gap-2 rounded-full border border-silver/[0.1] bg-white/[0.03] px-8 py-4 text-[13px] font-semibold text-silver/30 tracking-[0.08em] uppercase backdrop-blur-xl hover:bg-white/[0.08] hover:text-silver/50 hover:border-silver/20 transition-all duration-500 cursor-pointer">
            Browse Destinations
          </button>
        </div>

        {/* Floating testimonial snippets */}
        <div className="hidden md:block">
          {[
            { text: "Best decision ever!", author: "Priya S.", x: "-15%", y: "20%", delay: 0, dur: 8 },
            { text: "11pm and they picked up!", author: "Rahul D.", x: "85%", y: "30%", delay: 3, dur: 9 },
            { text: "Felt like a lifeline abroad", author: "Ananya K.", x: "-10%", y: "70%", delay: 6, dur: 7 },
          ].map((snip, i) => (
            <motion.div key={i} className="absolute rounded-lg glass-card-dark px-3 py-2 pointer-events-none"
              style={{ left: snip.x, top: snip.y }}
              animate={{ opacity: [0, 0.6, 0.6, 0], y: [10, 0, 0, -10] }}
              transition={{ duration: snip.dur, delay: snip.delay, repeat: Infinity, ease: "easeInOut" }}>
              <p className="text-[10px] text-silver/30 italic">&ldquo;{snip.text}&rdquo;</p>
              <p className="text-[8px] text-silver/15 mt-0.5">— {snip.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   9. NEWSLETTER — clean brand-styled
   ═══════════════════════════════════════════════════════════════ */

function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    setTimeout(() => {
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
    }, 1000)
  }

  return (
    <section className="py-14 bg-white border-t border-silver/10">
      <div className="max-w-md mx-auto px-6 text-center" data-reveal>
        <RevealText text="Travel Inspiration, Delivered" className="font-heading text-xl font-normal metallic-text tracking-[0.06em]" />
        <motion.p
          className="mt-1.5 text-sm text-silver-dark/50"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Curated ideas, deals, and tips — straight to your inbox.
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
   WAVE DIVIDERS — brand styled
   ═══════════════════════════════════════════════════════════════ */

function WaveWhiteToGray() {
  return (
    <div className="wave-divider -mb-3" style={{ background: "#F4F6F9" }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
        <rect x="0" y="0" width="1440" height="8" fill="#FFFFFF" />
        <path d="M0,0 L0,30 Q360,5 720,35 T1440,20 L1440,0 Z" fill="#FFFFFF" />
      </svg>
    </div>
  )
}

function WaveGrayToWhite() {
  return (
    <div className="wave-divider -mb-3" style={{ background: "#FFFFFF" }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
        <rect x="0" y="0" width="1440" height="8" fill="#F4F6F9" />
        <path d="M0,0 L0,30 Q360,5 720,35 T1440,20 L1440,0 Z" fill="#F4F6F9" />
      </svg>
    </div>
  )
}

function WaveWhiteToDark() {
  return (
    <div className="wave-divider -mb-3" style={{ background: "#0A1425" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <rect x="0" y="0" width="1440" height="10" fill="#FFFFFF" />
        <path d="M0,0 L0,35 Q360,5 720,40 T1440,25 L1440,0 Z" fill="#FFFFFF" />
        <path d="M0,0 L0,20 Q360,0 720,25 T1440,15 L1440,0 Z" fill="#FFFFFF" opacity="0.5" />
      </svg>
    </div>
  )
}

function WaveDarkToWhite() {
  return (
    <div className="wave-divider -mb-3" style={{ background: "#FFFFFF" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <rect x="0" y="0" width="1440" height="10" fill="#0A1425" />
        <path d="M0,0 L0,35 Q360,5 720,40 T1440,25 L1440,0 Z" fill="#0A1425" />
        <path d="M0,0 L0,20 Q360,0 720,25 T1440,15 L1440,0 Z" fill="#0A1425" opacity="0.5" />
      </svg>
    </div>
  )
}

function WaveGrayToDark() {
  return (
    <div className="wave-divider -mb-3" style={{ background: "#0A1425" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <rect x="0" y="0" width="1440" height="10" fill="#F4F6F9" />
        <path d="M0,0 L0,30 Q360,5 720,35 T1440,20 L1440,0 Z" fill="#F4F6F9" />
        <path d="M0,0 L0,15 Q360,0 720,20 T1440,10 L1440,0 Z" fill="#F4F6F9" opacity="0.5" />
      </svg>
    </div>
  )
}

function WaveDarkToGray() {
  return (
    <div className="wave-divider -mb-3" style={{ background: "#F4F6F9" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <rect x="0" y="0" width="1440" height="10" fill="#0A1425" />
        <path d="M0,0 L0,40 Q360,5 720,35 T1440,25 L1440,0 Z" fill="#0A1425" />
        <path d="M0,0 L0,20 Q360,0 720,25 T1440,10 L1440,0 Z" fill="#0A1425" opacity="0.5" />
      </svg>
    </div>
  )
}

function WaveToFooter() {
  return (
    <div className="wave-divider -mb-3" style={{ background: "#0A1425" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <rect x="0" y="0" width="1440" height="10" fill="#FFFFFF" />
        <path d="M0,0 L0,35 Q360,5 720,30 T1440,25 L1440,0 Z" fill="#FFFFFF" />
        <path d="M0,0 L0,20 Q360,0 720,20 T1440,15 L1440,0 Z" fill="#FFFFFF" opacity="0.5" />
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
      <TrustMarquee />
      <WaveWhiteToDark />
      <ProblemSection />
      <WaveDarkToWhite />
      <HowItWorksSection />
      <WaveWhiteToGray />
      <DestinationsSection />
      <WaveGrayToDark />
      <USPSection />
      <WaveDarkToWhite />
      <WhatSetsUsApartSection />
      <ComingSoonSection />
      <WaveWhiteToGray />
      <TestimonialsSection />
      <WaveGrayToDark />
      <CTASection />
      <WaveDarkToWhite />
      <NewsletterSection />
      <WaveToFooter />
    </>
  )
}
