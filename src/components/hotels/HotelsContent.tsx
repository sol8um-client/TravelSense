"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Building2,
  BedDouble,
  Mountain,
  Palmtree,
  Landmark,
  BadgePercent,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Bell,
  Loader2,
  MessageCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react"
import { toast } from "sonner"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"
import { SectionWave } from "@/components/shared/SectionWave"

/* The stay types we curate - editorial style descriptors, not live listings.
   Every property is hand-picked, so we describe the *kinds* of stays we cover. */
const stayTypes = [
  {
    icon: Palmtree,
    title: "Luxury resorts",
    description:
      "Beachfront pools, spa retreats and all-suite escapes for travellers who want to be looked after.",
  },
  {
    icon: Landmark,
    title: "Heritage havelis",
    description:
      "Restored palaces, courtyards and boutique heritage homes that put you inside the story of a place.",
  },
  {
    icon: Mountain,
    title: "Mountain lodges",
    description:
      "Cosy lodges and view-first stays in the hills, handpicked for location, warmth and quiet.",
  },
  {
    icon: BedDouble,
    title: "City & beach stays",
    description:
      "From smart city hotels to laid-back beach villas, matched to your route and the way you travel.",
  },
]

/* Why book a stay through TravelSense - honest, human reasons (no live engine yet). */
const benefits = [
  {
    icon: Sparkles,
    title: "Handpicked, never scraped",
    description:
      "We only suggest properties we would happily book ourselves - vetted for location, comfort and value.",
  },
  {
    icon: BadgePercent,
    title: "Fair, transparent rates",
    description:
      "We tap trade rates and seasonal pricing to keep your stay sensible, with no surprise fees at checkout.",
  },
  {
    icon: HeartHandshake,
    title: "Booked by a real human",
    description:
      "A travel expert confirms your stay and stays reachable - so a late check-in or a room swap is one message away.",
  },
  {
    icon: ShieldCheck,
    title: "Part of your whole trip",
    description:
      "Your stay slots into your itinerary, transfers and visas - one team, one plan, no juggling tabs.",
  },
]

/* Hotel partners we are integrating - shown honestly as "coming soon". */
const partners = [
  "Taj Hotels",
  "ITC Hotels",
  "Marriott",
  "Leading Hotels",
  "Lemon Tree",
  "OYO Rooms",
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function HotelsContent() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("subscribe failed")
      toast.success("You're on the list!", {
        description: "We'll let you know the moment hotel booking goes live.",
      })
      setEmail("")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* ── HERO - light mesh, display headline, glass trust chips ───────────── */}
      <section className="relative overflow-hidden bg-brand-mesh px-4 pt-[120px] pb-20 sm:px-6 sm:pt-[150px] sm:pb-24">
        {/* soft brand washes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-[10%] left-[6%] h-[460px] w-[560px] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(212,168,83,0.12), rgba(196,50,74,0.05) 52%, transparent 76%)", filter: "blur(90px)" }}
          />
          <div
            className="absolute -bottom-[12%] right-[4%] h-[480px] w-[480px] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(74,120,205,0.10), transparent 72%)", filter: "blur(100px)" }}
          />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          {/* breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center justify-center gap-1.5 font-body text-[12px] text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-secondary">Home</Link>
            <ChevronRight className="h-3 w-3 text-silver" />
            <span className="font-semibold text-primary">Hotels</span>
          </motion.nav>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/70 px-3.5 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Hotel booking &middot; Launching soon
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-heading text-[2.5rem] font-medium leading-[1.04] tracking-[-0.025em] text-primary sm:text-[3.4rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Stays,{" "}
            <span className="italic font-normal text-secondary">sorted.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mx-auto mt-5 max-w-xl font-body text-[15px] leading-[1.7] text-foreground/70 sm:text-[17px]"
          >
            Find and book the perfect stay for your trip, from budget-friendly to luxury.
            Our instant booking engine is on its way - until then, we will hand-pick and
            book your room for you.
          </motion.p>

          {/* trust chips */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
          >
            {[
              { icon: Building2, label: "Curated across India" },
              { icon: BadgePercent, label: "Fair trade rates" },
              { icon: HeartHandshake, label: "Booked by a human" },
            ].map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/65 px-3.5 py-1.5 font-body text-[12.5px] font-medium text-primary shadow-[0_6px_18px_rgba(11,20,38,0.06)] backdrop-blur-md"
              >
                <c.icon className="h-3.5 w-3.5 text-secondary" strokeWidth={1.9} />
                {c.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STAY TYPES - editorial glass cards on light ─────────────────────── */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Stays for every style
            </p>
            <h2 className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]" style={{ fontVariationSettings: "'opsz' 144" }}>
              From boutique havelis to{" "}
              <span className="italic font-normal text-secondary">beachfront resorts.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              We are curating the finest properties across India and beyond - so whatever
              your trip needs, the right room is waiting.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stayTypes.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="glass-panel group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                  <s.icon className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <h3 className="mt-4 font-heading text-[17px] font-semibold tracking-[-0.01em] text-primary">
                  {s.title}
                </h3>
                <p className="mt-2 font-body text-[13.5px] leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BOOK WITH US - glass cards on light ─────────────────────────── */}
      <section className="bg-brand-mesh px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Why book your stay with us
            </p>
            <h2 className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]" style={{ fontVariationSettings: "'opsz' 144" }}>
              The difference is in the details.
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              No endless tabs, no scraped junk listings - just the right room, booked by
              someone who actually cares about your trip.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="glass-panel group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                  <b.icon className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <h3 className="mt-4 font-heading text-[17px] font-semibold tracking-[-0.01em] text-primary">
                  {b.title}
                </h3>
                <p className="mt-2 font-body text-[13.5px] leading-relaxed text-muted-foreground">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionWave from="#FFFFFF" to="#0A1425" />

      {/* ── COMING SOON / BOOK THROUGH US - navy band, glass panel, CTAs ─────── */}
      <section className="relative overflow-hidden bg-[#0A1425] px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[6%] top-[8%] h-[300px] w-[300px] rounded-full bg-primary-light/20 blur-[90px]" />
          <div className="absolute -left-[4%] bottom-[6%] h-[280px] w-[280px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(212,168,83,0.10), transparent 70%)", filter: "blur(80px)" }} />
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
              <Building2 className="h-7 w-7" strokeWidth={1.6} />
            </div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              Instant booking - coming soon
            </p>
            <h2 className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.5rem]" style={{ fontVariationSettings: "'opsz' 144" }}>
              We are building a seamless way to{" "}
              <span className="italic font-normal text-accent">book your stay.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-[14.5px] leading-[1.7] text-white/60 sm:text-[15.5px]">
              A self-serve booking experience with curated stays across India and
              international destinations is on the way. Want a room sooner? We will
              hand-pick and book it for you right now.
            </p>
          </motion.div>

          {/* primary CTAs - book through us now */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <WhatsAppLink
              source="hotels-book-now"
              message="Hi TravelSense! I'd like help booking a hotel for my trip - can you assist?"
              className="btn btn-primary"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
              Book a stay through us
            </WhatsAppLink>
            <Link href="/consultation" className="btn btn-ghost">
              Plan my whole trip
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </motion.div>

          {/* notify-me lead capture (glass panel) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="glass-dark mx-auto mt-12 max-w-xl rounded-2xl p-6 text-center sm:p-8"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-accent">
              <Bell className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <h3 className="glass-text mt-4 font-heading text-[18px] font-semibold text-white">
              Get notified when we launch
            </h3>
            <p className="glass-text mx-auto mt-2 max-w-md font-body text-[13.5px] leading-relaxed text-white/65">
              Be the first to know when instant hotel booking goes live on TravelSense.
              Drop your email and we will keep you posted.
            </p>

            <form
              onSubmit={handleNotify}
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email for hotel booking notification"
                className="glass-field-dark h-11 flex-1 rounded-full px-4 font-body text-[14px] text-white placeholder:text-white/35 focus:outline-none focus-visible:border-secondary"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Bell className="h-4 w-4" strokeWidth={1.8} />
                    Notify me
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* hotel partners - honestly framed as coming soon */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-14"
          >
            <p className="text-center font-body text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/35">
              Hotel partners - coming soon
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {partners.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-heading text-[12.5px] font-medium tracking-[-0.01em] text-white/40"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* secondary nudge to browse packages while they wait */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-12 text-center font-body text-[13.5px] text-white/55"
          >
            Looking for a full trip instead?{" "}
            <Link href="/packages" className="font-semibold text-accent underline-offset-4 hover:underline">
              Browse our curated packages
            </Link>
            .
          </motion.p>
        </div>
      </section>
    </>
  )
}
