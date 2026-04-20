"use client"

import { motion } from "framer-motion"
import {
  Heart,
  Eye,
  Award,
  Users,
  Globe,
  ShieldCheck,
  Sparkles,
  HeadphonesIcon,
  BadgeCheck,
  ArrowRight,
  MapPin,
  Compass,
  Star,
  Lightbulb,
  Calendar,
  Rocket,
  Monitor,
  Plane,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"

/* ─── Animation variants ─────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

/* ─── Data ───────────────────────────────────────────────────────── */

const features = [
  {
    icon: Users,
    title: "Personal Curation",
    description:
      "Every trip is handcrafted to your preferences. No cookie-cutter packages — just experiences tailored to the way you travel.",
  },
  {
    icon: Award,
    title: "Expert Knowledge",
    description:
      "With 15+ years of industry experience, we know the destinations, the hidden gems, and the perfect timing for every trip.",
  },
  {
    icon: HeadphonesIcon,
    title: "End-to-End Support",
    description:
      "From the first call to the last day of your trip, our team is always one message away. No bots, no hold music.",
  },
  {
    icon: BadgeCheck,
    title: "Best Value Guarantee",
    description:
      "Premium experiences at fair prices. We negotiate directly with partners to pass on the best rates without compromising quality.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Personalization",
    description:
      "Two travelers are never the same. We listen first, plan second, and deliver experiences that feel uniquely yours. Every itinerary is a reflection of your interests, pace, and travel style.",
    iconBox: "icon-box-red",
    iconColor: "text-secondary",
    glow: "from-[#C4324A]/[0.08] to-transparent",
    numeral: "01",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    description:
      "No hidden fees, no surprise charges. What we quote is what you pay. We believe trust is built through transparency, honest communication, and delivering on every promise we make.",
    iconBox: "icon-box-silver",
    iconColor: "text-silver",
    glow: "from-[#B0B8C4]/[0.08] to-transparent",
    numeral: "02",
  },
  {
    icon: Star,
    title: "Quality",
    description:
      "Every hotel, every route, every detail is vetted by our team. We personally inspect accommodations and experiences to ensure they meet our standards before recommending them to you.",
    iconBox: "icon-box-silver",
    iconColor: "text-[#D4A853]",
    glow: "from-[#D4A853]/[0.08] to-transparent",
    numeral: "03",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We combine decades of on-ground travel expertise with modern technology to create a smarter, faster, and more enjoyable way to plan your trips. The future of travel is here.",
    iconBox: "icon-box-red",
    iconColor: "text-secondary",
    glow: "from-[#C4324A]/[0.08] via-transparent to-[#D4A853]/[0.05]",
    numeral: "04",
  },
]

const stats = [
  { number: "500+", label: "Trips Planned", icon: Compass },
  { number: "2,000+", label: "Happy Travelers", icon: Users },
  { number: "50+", label: "Destinations", icon: MapPin },
  { number: "4", label: "Travel Categories", icon: Globe },
]

const milestones = [
  {
    year: "2010",
    title: "The Journey Begins",
    description:
      "Jayshree Lakhotiya founded V9 Travels in Pune, driven by a passion for creating unforgettable travel experiences for families and working professionals.",
    icon: Rocket,
  },
  {
    year: "2014",
    title: "Expanding Horizons",
    description:
      "Crossed 100 trips planned. Expanded beyond leisure into adventure travel, with treks across the Himalayas and expeditions to Southeast Asia becoming client favourites.",
    icon: Compass,
  },
  {
    year: "2018",
    title: "New Categories Launch",
    description:
      "Introduced educational tours for schools and colleges, and sports travel for cricket and football fans. Four distinct travel categories now under one roof.",
    icon: Star,
  },
  {
    year: "2022",
    title: "500 Trips Milestone",
    description:
      "Surpassed 500 curated trips and 2,000 happy travelers. Built a loyal community of repeat clients who trust V9 Travels with every family vacation and group expedition.",
    icon: Plane,
  },
  {
    year: "2026",
    title: "TravelSense Goes Digital",
    description:
      "Launched TravelSense as the tech-enabled evolution of V9 Travels. A modern digital platform combining 15+ years of expertise with AI-powered personalization.",
    icon: Monitor,
  },
]

/* ─── Component ──────────────────────────────────────────────────── */

export default function AboutContent() {
  const { open } = useLeadModal()
  const [imgError, setImgError] = useState(true)

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          FOUNDER STORY
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0A1425] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center"
          >
            {/* Text */}
            <div>
              <motion.div variants={fadeUp} custom={0} className="mb-4 flex">
                <span className="inline-block h-1 w-12 rounded-full bg-secondary" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="font-heading text-3xl font-medium tracking-[-0.015em] leading-[1.15] text-white sm:text-4xl"
              >
                The Story Behind TravelSense
              </motion.h2>
              <motion.div
                variants={fadeUp}
                custom={1}
                className="mt-6 space-y-4 font-body text-base leading-relaxed text-white/60"
              >
                <p>
                  For Jayshree Lakhotiya, travel was never just a business — it
                  was a calling. Growing up in Pune, she was captivated by the
                  idea that a single trip could change a person&apos;s
                  perspective, strengthen a family&apos;s bond, and create
                  memories that last a lifetime.
                </p>
                <p>
                  In 2010, she turned that passion into V9 Travels — a boutique
                  travel company built on a simple promise: every trip should
                  feel personal. While the industry pushed cookie-cutter
                  packages, Jayshree spent hours understanding what each
                  traveler truly wanted. A honeymooning couple looking for
                  seclusion in Bali. A school group eager to explore European
                  history. A family of cricket fans chasing the World Cup across
                  continents. Each trip was different, and that was the point.
                </p>
                <p>
                  Over 15 years and 500+ trips later, she noticed something:
                  India&apos;s working professionals desperately wanted great
                  vacations but didn&apos;t have the time or patience to plan
                  them. The big platforms offered endless options but zero
                  curation. The local agents offered personal touch but lacked
                  technology.
                </p>
                <p>
                  TravelSense was born to bridge that gap — a digital platform
                  that combines Jayshree&apos;s decades of on-ground expertise
                  with modern technology. A place where AI helps you discover
                  your perfect trip, but a real human ensures every detail is
                  right.
                </p>
              </motion.div>
            </div>

            {/* Founder image / fallback */}
            <motion.div variants={fadeUp} custom={2} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                {!imgError ? (
                  <Image
                    src="/images/about/founder.jpg"
                    alt="Jayshree Lakhotiya, Founder of TravelSense"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0A1425] via-[#122040] to-[#0A1425]">
                    {/* Decorative gradient circles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-[#C4324A]/10 to-[#D4A853]/10 blur-3xl" />
                    <div className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full bg-[#D4A853]/5 blur-2xl" />

                    <div className="relative text-center">
                      {/* Globe icon with gradient ring */}
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#C4324A]/20 to-[#D4A853]/20 ring-1 ring-white/10">
                        <Globe className="h-12 w-12 text-[#D4A853]/60" />
                      </div>

                      {/* Name */}
                      <h3 className="mt-6 font-heading text-lg font-medium tracking-[-0.015em] leading-[1.15] text-white">
                        Jayshree Lakhotiya
                      </h3>

                      {/* Title */}
                      <p className="mt-2 font-body text-sm tracking-wide text-[#D4A853]/80">
                        Founder &amp; Lead Travel Curator
                      </p>

                      {/* Decorative line */}
                      <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[#C4324A]/40 to-transparent" />

                      {/* Tagline */}
                      <p className="mt-4 max-w-[240px] font-body text-xs leading-relaxed text-white/30">
                        15+ years of crafting unforgettable journeys across 50+
                        destinations
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl border border-secondary/20 bg-secondary/5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#060B15] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A1425] p-6 text-center md:p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C4324A]/5 to-transparent" />
                <div className="relative">
                  <stat.icon className="mx-auto mb-3 h-6 w-6 text-[#D4A853]/60" />
                  <p className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white sm:text-3xl">
                    {stat.number}
                  </p>
                  <p className="mt-1 font-body text-sm text-white/50">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MISSION & VISION
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0A1425] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2"
          >
            {/* Mission — brushed red metal plaque */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="group relative rounded-2xl metal-card metal-card-red p-8 md:p-10"
            >
              {/* Watermark numeral */}
              <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 font-heading italic font-normal text-[9rem] leading-none text-white/[0.035] select-none transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1">01</span>
              {/* Hover red glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C4324A]/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {/* Top silver shine */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-silver/30 to-transparent" />
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl icon-box-red magnetic-icon">
                  <Heart className="h-6 w-6 text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="hx font-heading text-3xl font-medium tracking-[-0.02em] leading-[1.08] text-white">
                  Our <em className="italic font-normal text-[#FFB3A3]">mission.</em>
                </h3>
                <p className="mt-5 font-body text-lg leading-[1.55] text-[#D4A853]/90 font-medium">
                  Making extraordinary travel experiences accessible to every
                  Indian family.
                </p>
                <p className="mt-4 font-body text-[15px] leading-relaxed text-white/55">
                  We believe every working professional, every family, and every
                  group of friends deserves a vacation that feels effortless from
                  the first inquiry to the last sunset. Travel should be a joy to
                  plan, not a chore to endure.
                </p>
              </div>
            </motion.div>

            {/* Vision — brushed silver metal plaque */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="group relative rounded-2xl metal-card p-8 md:p-10"
            >
              {/* Watermark numeral */}
              <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 font-heading italic font-normal text-[9rem] leading-none text-white/[0.035] select-none transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1">02</span>
              {/* Hover silver/gold glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4A853]/[0.07] via-transparent to-[#B0B8C4]/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {/* Top silver shine */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-silver/40 to-transparent" />
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl icon-box-silver magnetic-icon">
                  <Eye className="h-6 w-6 text-silver" strokeWidth={1.5} />
                </div>
                <h3 className="hx font-heading text-3xl font-medium tracking-[-0.02em] leading-[1.08] text-white">
                  Our <em className="italic font-normal text-[#FFB3A3]">vision.</em>
                </h3>
                <p className="mt-5 font-body text-lg leading-[1.55] text-[#D4A853]/90 font-medium">
                  India&apos;s most trusted personalized travel platform.
                </p>
                <p className="mt-4 font-body text-[15px] leading-relaxed text-white/55">
                  A place where technology amplifies human expertise, where AI
                  helps you discover possibilities and a real travel curator
                  ensures every detail is perfect. Every journey as unique as the
                  traveler.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          OUR VALUES
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#060B15] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-14 text-center">
              <div className="mb-4 flex justify-center">
                <span className="inline-block h-1 w-12 rounded-full bg-secondary" />
              </div>
              <h2 className="font-heading text-3xl font-medium tracking-[-0.015em] leading-[1.15] text-white sm:text-4xl">
                What We Stand For
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-base text-white/60">
                These four principles guide every trip we plan and every
                relationship we build.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  custom={i + 1}
                  className={cn(
                    "group relative rounded-2xl p-7 metal-card",
                    value.iconBox === "icon-box-red" && value.title === "Personalization" && "metal-card-red",
                    value.title === "Innovation" && "metal-card-red",
                    value.title === "Quality" && "metal-card-gold",
                    // Trust stays default metal-card (brushed silver)
                  )}
                >
                  {/* Watermark numeral — Fraunces italic ghost */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-4 font-heading italic font-normal text-[7rem] leading-none text-white/[0.04] select-none transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    {value.numeral}
                  </span>
                  {/* Hover glow — brand-colored */}
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", value.glow)} />
                  {/* Top silver shine line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-silver/25 to-transparent" />
                  {/* Side accent bar */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-6 h-8 w-[3px] rounded-r-full bg-gradient-to-b transition-all duration-500 group-hover:h-16 group-hover:w-[4px]",
                      value.iconBox === "icon-box-red"
                        ? "from-secondary via-secondary/50 to-transparent"
                        : "from-silver via-silver/50 to-transparent"
                    )}
                  />
                  <div className="relative">
                    <div className={cn("mb-5 flex h-12 w-12 items-center justify-center rounded-xl magnetic-icon", value.iconBox)}>
                      <value.icon className={cn("h-5 w-5", value.iconColor)} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-lg font-medium tracking-[-0.015em] leading-[1.15] text-white">
                      {value.title}
                    </h3>
                    <p className="mt-3 font-body text-[13.5px] leading-[1.65] text-white/55">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          JOURNEY / TIMELINE
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0A1425] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-14 text-center">
              <div className="mb-4 flex justify-center">
                <span className="inline-block h-1 w-12 rounded-full bg-secondary" />
              </div>
              <h2 className="font-heading text-3xl font-medium tracking-[-0.015em] leading-[1.15] text-white sm:text-4xl">
                Our Journey
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-base text-white/60">
                From a small office in Pune to a digital travel platform serving
                families across India.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line (desktop) */}
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#C4324A]/30 via-[#D4A853]/20 to-transparent md:block" />
              {/* Vertical line (mobile) */}
              <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#C4324A]/30 via-[#D4A853]/20 to-transparent md:hidden" />

              <div className="space-y-12 md:space-y-16">
                {milestones.map((milestone, i) => {
                  const isLeft = i % 2 === 0
                  return (
                    <motion.div
                      key={milestone.year}
                      variants={fadeUp}
                      custom={i + 1}
                      className="relative"
                    >
                      {/* Desktop layout */}
                      <div className="hidden md:grid md:grid-cols-2 md:gap-12 items-center">
                        {/* Left content */}
                        <div
                          className={cn(
                            "text-right",
                            !isLeft && "order-2 text-left"
                          )}
                        >
                          {isLeft ? (
                            <div className="ml-auto max-w-md">
                              <span className="font-heading text-sm font-medium tracking-[-0.015em] leading-[1.15] text-[#D4A853]/70">
                                {milestone.year}
                              </span>
                              <h3 className="mt-2 font-heading text-lg font-medium tracking-[-0.015em] leading-[1.15] text-white">
                                {milestone.title}
                              </h3>
                              <p className="mt-3 font-body text-sm leading-relaxed text-white/50">
                                {milestone.description}
                              </p>
                            </div>
                          ) : (
                            <div />
                          )}
                        </div>

                        {/* Center dot */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0A1425]">
                            <milestone.icon className="h-5 w-5 text-[#C4324A]" />
                          </div>
                        </div>

                        {/* Right content */}
                        <div
                          className={cn(
                            "text-left",
                            !isLeft && "order-1 text-right"
                          )}
                        >
                          {!isLeft ? (
                            <div className="mr-auto max-w-md">
                              <span className="font-heading text-sm font-medium tracking-[-0.015em] leading-[1.15] text-[#D4A853]/70">
                                {milestone.year}
                              </span>
                              <h3 className="mt-2 font-heading text-lg font-medium tracking-[-0.015em] leading-[1.15] text-white">
                                {milestone.title}
                              </h3>
                              <p className="mt-3 font-body text-sm leading-relaxed text-white/50">
                                {milestone.description}
                              </p>
                            </div>
                          ) : (
                            <div />
                          )}
                        </div>
                      </div>

                      {/* Mobile layout */}
                      <div className="flex gap-6 md:hidden">
                        {/* Dot */}
                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0A1425]">
                          <milestone.icon className="h-5 w-5 text-[#C4324A]" />
                        </div>
                        {/* Content */}
                        <div className="pb-2">
                          <span className="font-heading text-sm font-medium tracking-[-0.015em] leading-[1.15] text-[#D4A853]/70">
                            {milestone.year}
                          </span>
                          <h3 className="mt-1 font-heading text-base font-medium tracking-[-0.015em] leading-[1.15] text-white">
                            {milestone.title}
                          </h3>
                          <p className="mt-2 font-body text-sm leading-relaxed text-white/50">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHY CHOOSE US
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#060B15] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-14 text-center">
              <div className="mb-4 flex justify-center">
                <span className="inline-block h-1 w-12 rounded-full bg-secondary" />
              </div>
              <h2 className="font-heading text-3xl font-medium tracking-[-0.015em] leading-[1.15] text-white sm:text-4xl">
                Why Choose TravelSense
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-base text-white/60">
                We combine decades of travel expertise with a modern,
                technology-driven approach to deliver experiences you can trust.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  custom={i + 1}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A1425] p-6 transition-colors duration-300 hover:border-white/20"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white/5">
                    <feature.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-heading text-sm font-medium tracking-[-0.015em] leading-[1.15] text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 font-body text-sm leading-relaxed text-white/50">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0A1425] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4 flex justify-center">
              <span className="inline-block h-1 w-12 rounded-full bg-secondary" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-heading text-3xl font-medium tracking-[-0.015em] leading-[1.15] text-white sm:text-4xl"
            >
              Ready to Plan Your Next Adventure?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mx-auto mt-4 max-w-xl font-body text-base text-white/60"
            >
              Let our travel experts craft the perfect trip for you. No
              commitment, no pressure — just a friendly conversation about where
              you want to go.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-8">
              <Button
                size="lg"
                variant="secondary"
                className="font-body"
                onClick={() => open("about-cta")}
              >
                Start Planning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
