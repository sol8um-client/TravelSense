"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Heart,
  Compass,
  MapPin,
  Star,
  Users,
  PlaneTakeoff,
  PhoneCall,
  Cake,
  Hotel,
  ArrowRight,
  Phone,
  Quote,
  Check,
  Sparkles,
  CheckCheck,
  Wifi,
} from "lucide-react"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"
import PageHero from "@/components/shared/PageHero"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"
import { SectionWave } from "@/components/shared/SectionWave"

/* ─── Animation variants ─────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

/* ─── Content ────────────────────────────────────────────────────── */

// "Travel is about ___" - the human stakes, shown as a quiet pill row.
const stakes = ["Dreams", "Celebrations", "Family time", "Once-in-a-lifetime moments"]

// The team behind every itinerary, shown as role chips.
const roles = [
  "Travel experts",
  "Destination specialists",
  "Visa consultants",
  "Customer support",
  "Holiday planners",
]

// The four real moments that define TravelSense (lightly tightened for web pace).
const moments: {
  icon: typeof PlaneTakeoff
  title: string
  place: string
  body: string[]
  takeaway: string
}[] = [
  {
    icon: PlaneTakeoff,
    title: "The 1:00 AM airport call",
    place: "A cancelled flight, past midnight",
    body: [
      "One night, a traveller reached the airport ready to begin a long-awaited trip. Everything was planned, confirmed, on schedule. Then, minutes before departure, the flight was cancelled.",
      "It was already past midnight. The queues were growing, the options were thin - and at around 1:00 AM, our phone rang.",
      "There was never a question of waiting until morning. While the traveller waited, we worked the phones - airline desks, alternate routes, every schedule we could find. Within a short while a new arrangement was secured, and the journey was back on track.",
    ],
    takeaway: "Our work doesn't end when a ticket is issued. Sometimes, that's exactly when it begins.",
  },
  {
    icon: PhoneCall,
    title: "A crisis solved from another country",
    place: "Leading a group in Nepal, on WhatsApp calls",
    body: [
      "One of the hardest situations we've handled came while we were leading a tour group in Nepal. It had already been a long day of sightseeing, transfers and check-ins - and our international roaming had stopped working. A WhatsApp call was our only reliable line.",
      "Late that evening, a traveller messaged with urgent news: their flight to Himachal Pradesh had been cancelled. We were in another country, on patchy connectivity - but our responsibility hadn't changed.",
      "Over those WhatsApp calls we coordinated alternatives, explored routes and kept communicating until arrangements were made. The traveller continued their journey without major disruption. Most never saw the scramble behind the scenes.",
    ],
    takeaway: "Great support is often invisible. Travellers simply remember that someone was there.",
  },
  {
    icon: Cake,
    title: "A celebration to remember in Andaman",
    place: "A wedding anniversary, quietly arranged",
    body: [
      "Not every moment we treasure comes from solving a problem. Some come from creating joy.",
      "A couple travelling with us were celebrating their wedding anniversary in the Andaman Islands. Quietly, without telling them, our team coordinated with the hotel to arrange a cake and a small celebration - the timing, the presentation, the surprise.",
      "When they returned that evening and discovered it, their reaction was priceless. It wasn't grand. It wasn't expensive. But it was thoughtful.",
    ],
    takeaway: "Years later, travellers forget room numbers and flight times. They never forget how someone made them feel.",
  },
  {
    icon: Hotel,
    title: "When we stepped in, in person",
    place: "Srinagar - taking ownership, not forwarding it",
    body: [
      "A traveller was staying at a beautiful hotel in Srinagar, but kept facing slow service and delayed responses. When they told us, we had two choices: forward the complaint and wait - or take ownership.",
      "We chose to take ownership. Our local representative visited the hotel in person, met the management, explained the concerns in detail, and followed up until things changed.",
      "The difference was immediate - prompt service and personal attention for the rest of the stay.",
    ],
    takeaway: "What mattered most wasn't just fixing the issue. It was showing the traveller that someone would stand beside them.",
  },
]

// "Our promise" - what you actually get with TravelSense.
const promises = [
  "Celebrates your milestones",
  "Solves the unexpected",
  "Answers the late-night calls",
  "Stands behind every booking",
  "Treats your trip as their own",
]

/* ─── Story visuals - a distinct little scene that brings each defining moment
   to life (0 airport · 1 WhatsApp · 2 Andaman cake · 3 Srinagar houseboat). ─── */
function MomentVisual({ i }: { i: number }) {
  const shell =
    "relative h-[250px] w-full overflow-hidden rounded-[20px] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-full sm:min-h-[300px]"

  if (i === 0) {
    // The 1:00 AM airport call - boarding pass stamped CANCELLED + live call chip
    return (
      <div className={shell} style={{ background: "linear-gradient(155deg, #0e1a36 0%, #060b18 100%)" }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(212,168,83,0.7) 1px, transparent 1.4px)",
            backgroundSize: "20px 20px",
            maskImage: "linear-gradient(to bottom, #000, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000, transparent 85%)",
          }}
        />
        <div
          className="absolute left-1/2 top-[44%] w-[80%] max-w-[262px] -translate-x-1/2 -translate-y-1/2 -rotate-[5deg]"
          style={{ animation: "aboutFloat 6s ease-in-out infinite" }}
        >
          <div className="overflow-hidden rounded-[14px] bg-[#FBF7EF] shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between bg-[#0A1425] px-3.5 py-2">
              <span className="font-body text-[8px] font-semibold uppercase tracking-[0.2em] text-white/70">Boarding pass</span>
              <span className="font-body text-[8px] font-semibold tracking-[0.16em] text-accent">6E 204</span>
            </div>
            <div className="flex items-center justify-between px-3.5 py-3">
              <div className="text-left">
                <p className="font-heading text-[19px] font-medium leading-none text-primary">DEL</p>
                <p className="mt-1 font-body text-[8px] uppercase tracking-[0.12em] text-muted-foreground">Delhi · 12:40 AM</p>
              </div>
              <PlaneTakeoff className="h-4 w-4 text-secondary" strokeWidth={1.8} />
              <div className="text-right">
                <p className="font-heading text-[19px] font-medium leading-none text-primary/25">— —</p>
                <p className="mt-1 font-body text-[8px] uppercase tracking-[0.12em] text-muted-foreground">Seat 14A</p>
              </div>
            </div>
          </div>
          <span
            className="absolute -right-1.5 -top-2 rotate-[13deg] rounded-md border-2 border-secondary/80 px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-[0.1em] text-secondary"
            style={{ background: "rgba(196,50,74,0.12)" }}
          >
            Cancelled
          </span>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <Phone className="h-3.5 w-3.5 text-white/80" strokeWidth={1.8} />
          <span className="font-body text-[11.5px] font-medium text-white/85">Incoming call</span>
          <span className="ml-auto font-body text-[10px] font-semibold tracking-[0.12em] text-accent">1:00 AM</span>
        </div>
      </div>
    )
  }

  if (i === 1) {
    // Crisis from Nepal - WhatsApp chat on a weak signal
    return (
      <div className={shell}>
        <Image src="/images/generated/leh-ladakh-hero.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, rgba(7,16,15,0.40) 0%, rgba(6,13,12,0.86) 100%)" }} />
        <div className="absolute inset-x-5 top-6 space-y-2.5">
          <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-white/92 px-3.5 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
            <p className="font-body text-[11.5px] leading-snug text-primary">Our flight to Himachal just got cancelled.</p>
            <p className="mt-0.5 text-right font-body text-[8px] text-muted-foreground">11:58 PM</p>
          </div>
          <div className="ml-auto max-w-[84%] rounded-2xl rounded-tr-md px-3.5 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.35)]" style={{ background: "#1f3d2f" }}>
            <p className="font-body text-[11.5px] leading-snug text-white/92">On it — finding you another route right now.</p>
            <p className="mt-0.5 flex items-center justify-end gap-1 font-body text-[8px] text-emerald-300/85">
              12:01 AM <CheckCheck className="h-2.5 w-2.5" strokeWidth={2.4} />
            </p>
          </div>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 backdrop-blur-md">
          <Wifi className="h-3.5 w-3.5 text-amber-300/80" strokeWidth={1.8} />
          <span className="font-body text-[11px] font-medium text-white/85">WhatsApp call · Nepal</span>
          <span className="ml-auto font-body text-[9.5px] font-semibold uppercase tracking-[0.12em] text-amber-300/90">Weak signal</span>
        </div>
      </div>
    )
  }

  if (i === 2) {
    // Andaman anniversary - a quietly arranged cake by the sea
    return (
      <div className={shell}>
        <Image src="/images/generated/andaman-islands-hero.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(243,176,121,0.24) 0%, rgba(120,60,100,0.32) 50%, rgba(28,20,55,0.6) 100%)" }} />
        {[14, 30, 50, 68, 84].map((l, k) => (
          <span
            key={k}
            className="absolute block h-1.5 w-1.5 rounded-[2px]"
            style={{
              left: `${l}%`,
              top: `${10 + (k % 3) * 7}%`,
              background: ["#fff", "#FCE8B5", "#C4324A", "#fff", "#FCE8B5"][k],
              transform: `rotate(${k * 24}deg)`,
              animation: `aboutConfetti 3.6s ease-in-out ${k * 0.4}s infinite`,
            }}
          />
        ))}
        {/* sea band */}
        <div className="absolute inset-x-0 bottom-0 h-[34%]" style={{ background: "linear-gradient(to top, rgba(12,20,40,0.5), transparent)" }} />
        {/* cake */}
        <div className="absolute bottom-[26%] left-1/2 -translate-x-1/2" style={{ animation: "aboutFloat 6.5s ease-in-out infinite" }}>
          {/* candles + flames */}
          <div className="mb-1 flex items-end justify-center gap-3">
            {[0, 1, 2].map((c) => (
              <span key={c} className="relative block">
                <span className="block h-5 w-1 rounded-sm" style={{ background: "linear-gradient(#fff, #f1d9b3)" }} />
                <span
                  className="absolute -top-2 left-1/2 h-2.5 w-2 -translate-x-1/2 rounded-full"
                  style={{ background: "radial-gradient(circle at 50% 30%, #FFF6D6, #F5A623 70%, transparent)", animation: `aboutFlame 1.4s ease-in-out ${c * 0.25}s infinite` }}
                />
              </span>
            ))}
          </div>
          <div className="h-7 w-[92px] rounded-t-md bg-[#FBEFD8] shadow-[0_14px_30px_rgba(0,0,0,0.35)]" style={{ borderBottom: "3px solid #E8B4C4" }} />
          <div className="mx-auto h-9 w-[112px] rounded-b-md rounded-t-sm bg-[#F7E2C8]" style={{ borderTop: "3px solid #E8B4C4" }} />
        </div>
        {/* ribbon */}
        <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white/90 px-3.5 py-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
          <span className="flex items-center gap-1.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.1em] text-secondary">
            <Cake className="h-3.5 w-3.5" strokeWidth={1.8} /> Happy anniversary
          </span>
        </div>
      </div>
    )
  }

  // i === 3 - Srinagar - taking ownership in person
  return (
    <div className={shell}>
      <Image src="/images/generated/kashmir-shikara-dal-lake.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,20,36,0.20) 0%, rgba(11,19,34,0.74) 100%)" }} />
      {/* service-resolved card */}
      <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.08] px-3.5 py-2.5 backdrop-blur-md">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
          <Check className="h-4 w-4" strokeWidth={2.6} />
        </span>
        <div className="min-w-0">
          <p className="font-body text-[11.5px] font-semibold text-white">Handled in person</p>
          <p className="font-body text-[9px] text-white/55">Our rep visited the hotel</p>
        </div>
        <span className="ml-auto flex items-center gap-0.5">
          {[0, 1, 2, 3, 4].map((s) => (
            <Star key={s} className="h-3 w-3 text-accent" strokeWidth={1.4} fill="currentColor" />
          ))}
        </span>
      </div>
    </div>
  )
}

/* Condensed leads for the scroll stage (the scenes carry the emotion). */
const momentLeads = [
  "A traveller reached the airport for a long-awaited trip - and minutes before departure, the flight was cancelled. Past midnight our phone rang, and we worked every desk and route until a new arrangement was secured.",
  "Leading a group in Nepal with roaming dead and only a WhatsApp call working, we learned a traveller's onward flight to Himachal had been cancelled. From another country, on patchy signal, we found them a way through.",
  "A couple were marking their wedding anniversary in the Andamans. Quietly, without telling them, we arranged a cake and a small celebration with their hotel - and their reaction when they walked in was priceless.",
  "At a beautiful Srinagar hotel, a traveller kept hitting slow service. We could forward the complaint and wait - or take ownership. Our local rep went in person and stayed on it until everything changed.",
]

/* ─── Moments, SCROLL-DRIVEN - the four stories advance one at a time as you
   scroll, on the same pinned-stage mechanism as the homepage "How it works". ─── */
function MomentsScroll() {
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
  const active = Math.min(moments.length - 1, Math.floor(t * 0.999 * moments.length))
  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const total = Math.max(1, el.offsetHeight - window.innerHeight)
    window.scrollTo({ top: el.offsetTop + ((i + 0.5) / moments.length) * total, behavior: "smooth" })
  }

  return (
    <section ref={ref} className="relative bg-[#0A1425]" style={{ height: "420vh" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-[6%] top-[14%] h-[320px] w-[320px] rounded-full bg-primary-light/20 blur-[100px]" />
        <div
          className="absolute -left-[4%] bottom-[14%] h-[300px] w-[300px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(212,168,83,0.10), transparent 70%)", filter: "blur(80px)" }}
        />
      </div>

      <div className="sticky top-[var(--nav-h)] flex h-[calc(100svh-var(--nav-h))] flex-col overflow-hidden px-4 py-5 sm:px-6 sm:py-7">
        {/* header */}
        <div className="mx-auto w-full max-w-5xl shrink-0 text-center">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Moments that define us</p>
          <h2
            className="mt-2 font-heading text-[1.55rem] font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.3rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Anyone can promise good <span className="italic font-normal text-accent">service.</span>
          </h2>
        </div>

        {/* progress rail (clickable) */}
        <div className="mx-auto mt-4 flex w-full max-w-md shrink-0 items-center sm:mt-5">
          {moments.map((m, i) => (
            <button key={m.title} type="button" onClick={() => jump(i)} aria-label={m.title} className="flex flex-1 items-center last:flex-none">
              <span
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-body text-[11px] font-semibold transition-all duration-300 " +
                  (i <= active ? "bg-accent text-[#0A1425]" : "bg-white/[0.08] text-white/45")
                }
              >
                {`0${i + 1}`}
              </span>
              {i < moments.length - 1 && (
                <span className="mx-1.5 h-px flex-1 overflow-hidden rounded bg-white/12 sm:mx-2.5">
                  <span className="block h-full bg-accent transition-all duration-500" style={{ width: i < active ? "100%" : "0%" }} />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* stage - the active story crossfades in */}
        <div className="relative mx-auto mt-5 w-full max-w-5xl flex-1 sm:mt-6">
          {moments.map((m, i) => {
            const on = i === active
            return (
              <div
                key={m.title}
                aria-hidden={!on}
                className="absolute inset-0 flex items-center transition-all duration-[600ms]"
                style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(18px) scale(0.99)", pointerEvents: on ? "auto" : "none" }}
              >
                <div className="grid w-full items-center gap-5 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
                  <div><MomentVisual i={i} /></div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-accent"
                        style={{ background: "rgba(212,168,83,0.12)", border: "1px solid rgba(212,168,83,0.24)", boxShadow: "inset 0 1px 0 rgba(255,235,190,0.18)" }}
                      >
                        <m.icon className="h-5 w-5" strokeWidth={1.6} />
                      </div>
                      <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-accent/80">{m.place}</span>
                    </div>
                    <h3 className="mt-3.5 font-heading text-[22px] font-medium tracking-[-0.015em] text-white sm:text-[27px]">{m.title}</h3>
                    <p className="mt-3 font-body text-[14px] leading-[1.72] text-white/70 sm:text-[15.5px]">{momentLeads[i]}</p>
                    <p className="mt-5 border-t border-white/10 pt-4 font-heading text-[15px] font-medium italic leading-[1.5] text-accent-light sm:text-[17px]">
                      {m.takeaway}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mx-auto mt-3 shrink-0 text-center font-body text-[10px] uppercase tracking-[0.2em] text-white/30">
          Scroll to live each moment
        </p>
      </div>

      <style>{`
        @keyframes aboutFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes aboutFlame { 0%,100%{transform:translateX(-50%) scaleY(1);opacity:.95} 50%{transform:translateX(-50%) scaleY(.82) translateX(.5px);opacity:.7} }
        @keyframes aboutConfetti { 0%{transform:translateY(0) rotate(0);opacity:0} 12%{opacity:1} 100%{transform:translateY(26px) rotate(220deg);opacity:0} }
      `}</style>
    </section>
  )
}

/* ─── Component ──────────────────────────────────────────────────── */

export default function AboutContent() {
  const { open } = useLeadModal()
  const [imgError, setImgError] = useState(true)

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <PageHero
        eyebrow="About TravelSense"
        title={
          <>
            Travel, the{" "}
            <span className="italic font-normal text-secondary">human</span> way.
          </>
        }
        subtitle="Booking a flight or a hotel takes only a few clicks today. The one thing all that technology made harder to find is genuine human support - and that is exactly what TravelSense exists to bring back."
        crumb="About"
      >
        {[
          { icon: Compass, label: "500+ trips planned" },
          { icon: MapPin, label: "50+ destinations" },
          { icon: Star, label: "Real humans, 24/7" },
        ].map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/65 px-3.5 py-1.5 font-body text-[12.5px] font-medium text-primary shadow-[0_6px_18px_rgba(11,20,38,0.06)] backdrop-blur-md"
          >
            <c.icon className="h-3.5 w-3.5 text-secondary" strokeWidth={1.9} />
            {c.label}
          </span>
        ))}
      </PageHero>

      {/* ═══════════ WHY WE EXIST - the belief ═══════════ */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[32px] px-6 py-12 text-center shadow-[0_44px_100px_rgba(11,20,38,0.32)] sm:px-14 sm:py-16"
          style={{ background: "linear-gradient(150deg, #16243f 0%, #0A1425 72%)" }}
        >
          {/* ambient brand glows so the dark panel reads premium, not flat */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -right-[6%] -top-[14%] h-[280px] w-[280px] rounded-full bg-primary-light/25 blur-[90px]" />
            <div
              className="absolute -left-[6%] bottom-[-14%] h-[260px] w-[260px] rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(196,50,74,0.16), transparent 70%)", filter: "blur(70px)" }}
            />
          </div>

          <div className="relative">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              Why we exist
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.5rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Travel is never just flights and{" "}
              <span className="italic font-normal text-secondary-light">hotels.</span>
            </h2>
            <div className="mx-auto mt-6 max-w-2xl space-y-4 font-body text-[15px] leading-[1.8] text-white/65 sm:text-[16px]">
              <p>
                Travel has changed dramatically. Endless websites, endless reviews, thousands of
                options at our fingertips. Yet despite all of it, one thing has quietly become hard to
                find: genuine human support.
              </p>
              <p>
                We believe a journey is about dreams, about celebrations, about family time, about
                once-in-a-lifetime moments - and when something unexpected happens, it is about knowing
                there is someone you can trust. That belief is what inspired TravelSense: a place where
                no traveller is ever a booking reference number, where every journey begins with a
                conversation, and a real person is always ready to help.
              </p>
            </div>

            {/* the human stakes */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
              {stakes.map((s) => (
                <span
                  key={s}
                  className="glass-dark inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-body text-[13px] font-medium text-white"
                >
                  <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={1.8} />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ MEET THE PEOPLE ═══════════ */}
      <section className="bg-brand-mesh px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* Team / founder portrait (glass-framed) with graceful fallback */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="glass-panel relative overflow-hidden rounded-[28px] p-2.5 shadow-[0_30px_80px_rgba(11,20,38,0.18)]">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-primary/10">
                {!imgError ? (
                  <Image
                    src="/images/about/team.jpg"
                    alt="The TravelSense team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0A1425] via-[#122040] to-[#0A1425]">
                    <div
                      className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(196,50,74,0.18), rgba(212,168,83,0.12) 60%, transparent)",
                      }}
                    />
                    <div className="relative px-6 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 ring-1 ring-white/15">
                        <Users className="h-9 w-9 text-accent/75" strokeWidth={1.4} />
                      </div>
                      <h3 className="mt-5 font-heading text-lg font-medium tracking-[-0.015em] text-white">
                        The people behind TravelSense
                      </h3>
                      <p className="mx-auto mt-3 max-w-[260px] font-body text-xs leading-relaxed text-white/45">
                        A team photo lives here - real faces, ready to help.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl glass-pill px-4 py-3 sm:block">
              <p className="font-heading text-xl font-medium leading-none text-primary">Real</p>
              <p className="mt-1 font-body text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                People, not bots
              </p>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Meet the people
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              The people behind your{" "}
              <span className="italic font-normal text-secondary">journey.</span>
            </h2>
            <div className="mt-6 space-y-4 font-body text-[14.5px] leading-[1.75] text-muted-foreground sm:text-[15px]">
              <p>
                Behind every itinerary is a team that genuinely cares about creating exceptional
                experiences. Destinations may change - our mission never does: to make every
                traveller feel supported, valued and cared for, from the first conversation to the
                last sunset.
              </p>
            </div>

            {/* role chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {roles.map((r) => (
                <span
                  key={r}
                  className="inline-flex items-center rounded-full border border-secondary/20 bg-white/70 px-3 py-1.5 font-body text-[12.5px] font-medium text-primary backdrop-blur-md"
                >
                  {r}
                </span>
              ))}
            </div>

            {/* pull quote */}
            <div className="mt-7 flex gap-3 rounded-2xl border-l-2 border-secondary/50 bg-white/55 p-5 backdrop-blur-md">
              <Quote className="h-5 w-5 shrink-0 text-secondary/70" strokeWidth={1.8} />
              <p className="font-heading text-[17px] font-medium leading-[1.4] tracking-[-0.01em] text-primary sm:text-[19px]">
                For us, travel planning is not a transaction. It is a{" "}
                <span className="italic font-normal text-secondary">responsibility.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionWave from="#F4F6F9" to="#0A1425" />

      {/* ═══════════ MOMENTS THAT DEFINE TRAVELSENSE - scroll-driven ═══════════ */}
      <MomentsScroll />

      {/* navy -> light: NOT flipped, so the navy continues seamlessly into the wave
          (the flip left a light strip against the navy section = the "white line"). */}
      <SectionWave from="#0A1425" to="#F4F6F9" />

      {/* ═══════════ OUR PROMISE ═══════════ */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Our promise
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-primary sm:text-[2.5rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              More than an itinerary. A team that{" "}
              <span className="italic font-normal text-secondary">shows up.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              When you choose TravelSense, you get a dedicated team that genuinely cares about your
              journey - and treats your trip as if it were their own.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {promises.map((p, i) => (
              <motion.div
                key={p}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="glass-panel flex items-center gap-3 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Check className="h-4 w-4" strokeWidth={2.6} />
                </span>
                <p className="font-body text-[14.5px] font-medium leading-snug text-primary">{p}</p>
              </motion.div>
            ))}

            {/* closing promise tile */}
            <motion.div
              custom={promises.length}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative overflow-hidden rounded-2xl p-5 text-white sm:col-span-2 lg:col-span-1"
              style={{ background: "linear-gradient(135deg, #122040, #0A1425)" }}
            >
              <Heart className="h-5 w-5 text-secondary-glow" strokeWidth={1.8} />
              <p className="mt-3 font-body text-[14px] leading-[1.6] text-white/80">
                Leisure, adventure, a celebration, business or family - our promise stays the same:
                smooth, memorable and worry-free.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionWave from="#F4F6F9" to="#0A1425" />

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative overflow-hidden bg-[#0A1425] px-4 py-20 sm:px-6 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 600px 400px at 20% 20%, rgba(196,50,74,0.16), transparent 60%), radial-gradient(ellipse 600px 400px at 85% 90%, rgba(27,45,78,0.6), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent"
          >
            Let&apos;s plan your next journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.025em] text-white sm:text-[2.9rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            One conversation. One seamless{" "}
            <span className="italic font-normal text-secondary-glow">journey.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-4 max-w-xl font-body text-[15px] leading-[1.7] text-white/65 sm:text-[16px]"
          >
            The world is full of extraordinary places. Our job is to help you experience them with
            confidence - with one dedicated travel expert beside you the whole way.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <button type="button" onClick={() => open("about-cta")} className="btn btn-primary">
              Start planning
              <ArrowRight className="h-4 w-4" />
            </button>
            <WhatsAppLink source="about-cta" className="btn btn-ghost">
              <Phone className="h-4 w-4" strokeWidth={1.6} />
              Talk to a human
            </WhatsAppLink>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 font-heading text-[15px] font-medium tracking-[0.04em] text-white/80"
          >
            TravelSense <span className="text-white/35">&mdash;</span>{" "}
            <span className="text-accent">Human. Personal. Everywhere.</span>
          </motion.p>
        </div>
      </section>
    </>
  )
}
