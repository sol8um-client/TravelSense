"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Users,
  Trophy,
  Presentation,
  PartyPopper,
  Plane,
  Hotel,
  Bus,
  Utensils,
  ClipboardList,
  ShieldCheck,
  Phone,
  type LucideIcon,
} from "lucide-react"
import PageHero from "@/components/shared/PageHero"
import { SectionWave } from "@/components/shared/SectionWave"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: EASE },
  }),
}

interface Pillar {
  letter: string
  icon: LucideIcon
  title: string
  description: string
}

const PILLARS: Pillar[] = [
  {
    letter: "M",
    icon: Users,
    title: "Meetings",
    description:
      "Board meetings, sales kick-offs and client offsites - venue, AV, rooms and transfers handled end to end.",
  },
  {
    letter: "I",
    icon: Trophy,
    title: "Incentives",
    description:
      "Reward-trip programmes that motivate your top performers, from beach resorts to bucket-list escapes.",
  },
  {
    letter: "C",
    icon: Presentation,
    title: "Conferences",
    description:
      "Large conferences and conventions with delegate management, group air, hotels and on-ground logistics.",
  },
  {
    letter: "E",
    icon: PartyPopper,
    title: "Events & Exhibitions",
    description:
      "Product launches, annual days, gala dinners and exhibition travel - planned and run by a dedicated team.",
  },
]

interface Handled {
  icon: LucideIcon
  title: string
  text: string
}

const HANDLED: Handled[] = [
  { icon: Hotel, title: "Venues & hotels", text: "Sourcing, negotiation and block bookings at the right rate." },
  { icon: Plane, title: "Group air", text: "Group fares, seat blocks and coordinated arrivals/departures." },
  { icon: Bus, title: "Ground transport", text: "Coaches, transfers and on-site shuttles for every delegate." },
  { icon: ClipboardList, title: "Delegate management", text: "Registration, rooming lists, badges and live coordination." },
  { icon: Utensils, title: "F&B & gala", text: "Themed dinners, gala nights and dietary-aware catering." },
  { icon: ShieldCheck, title: "On-ground team", text: "A dedicated coordinator on site so nothing slips." },
]

const STATS: [string, string][] = [
  ["500+", "Delegates handled per event"],
  ["100%", "Single point of contact"],
  ["24/7", "On-trip support"],
]

export default function MiceContent() {
  return (
    <>
      <PageHero
        eyebrow="For teams & organisations"
        title="MICE &"
        accent="corporate travel."
        subtitle="Meetings, incentives, conferences and events - planned, booked and run by a dedicated TravelSense team so your people just show up and shine."
        crumb="MICE"
      >
        <Link
          href="/contact?enquiry=MICE%20%26%20Corporate%20Travel"
          className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-[12.5px] font-medium text-primary transition-transform hover:-translate-y-0.5"
        >
          <Users className="h-3.5 w-3.5 text-secondary" strokeWidth={1.9} />
          Request a proposal
        </Link>
      </PageHero>

      {/* ── The four pillars ─────────────────────────────────────────────── */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              What MICE means
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Four ways we move{" "}
              <span className="italic font-normal text-secondary">your team.</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="glass-panel group relative flex flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="absolute right-5 top-4 font-heading text-[2.2rem] font-medium leading-none text-secondary/12">
                    {p.letter}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-4 font-heading text-[17px] font-semibold tracking-[-0.01em] text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-body text-[13.5px] leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── What we handle ───────────────────────────────────────────────── */}
      <section className="bg-brand-mesh px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              End to end
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              One team for{" "}
              <span className="italic font-normal text-secondary">every detail.</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HANDLED.map((h, i) => {
              const Icon = h.icon
              return (
                <motion.div
                  key={h.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="glass-panel flex items-start gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-heading text-[15.5px] font-semibold text-primary">
                      {h.title}
                    </h3>
                    <p className="mt-1 font-body text-[13px] leading-relaxed text-muted-foreground">
                      {h.text}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <SectionWave from="#FFFFFF" to="#0A1425" />

      {/* ── Why TravelSense + stats (navy) ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1425] px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute right-[6%] top-[8%] h-[300px] w-[300px] rounded-full bg-primary-light/20 blur-[90px]" />
          <div
            className="absolute -left-[4%] bottom-[6%] h-[280px] w-[280px] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(196,50,74,0.12), transparent 70%)", filter: "blur(80px)" }}
          />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {STATS.map(([n, l], i) => (
              <motion.div
                key={l}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="glass-dark rounded-2xl p-7 text-center"
              >
                <div
                  className="font-heading text-[2.4rem] font-medium leading-none text-white"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                >
                  {n}
                </div>
                <div className="mt-2 font-body text-[12.5px] text-white/55">{l}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="glass-dark mt-12 rounded-[28px] p-8 text-center md:p-12"
          >
            <h2
              className="glass-text font-heading text-[1.7rem] font-medium leading-[1.1] tracking-[-0.02em] text-white md:text-[2.2rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Planning an offsite, conference or incentive{" "}
              <span className="italic font-normal text-accent">trip?</span>
            </h2>
            <p className="glass-text mx-auto mt-3 max-w-xl font-body text-[14.5px] leading-[1.65] text-white/60 md:text-[15.5px]">
              Tell us your group size, dates and goals - we&apos;ll send a tailored
              proposal with venues, costs and a day-by-day plan.
            </p>
            <div className="mt-7 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact?enquiry=MICE%20%26%20Corporate%20Travel"
                className="btn btn-primary"
                style={{ padding: "15px 30px", fontSize: 14 }}
              >
                Request a proposal
                <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
              <WhatsAppLink source="mice-cta" className="btn btn-ghost">
                <Phone className="h-4 w-4" strokeWidth={1.7} />
                Talk to a human
              </WhatsAppLink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
