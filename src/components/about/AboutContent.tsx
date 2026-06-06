"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  Eye,
  ShieldCheck,
  Star,
  Lightbulb,
  Users,
  Award,
  BadgeCheck,
  HeadphonesIcon,
  Compass,
  MapPin,
  Globe,
  Rocket,
  Plane,
  Monitor,
  ChevronRight,
  ArrowRight,
  Phone,
} from "lucide-react"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"
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

/* ─── Data (content preserved verbatim from the original page) ─────── */

const values = [
  {
    icon: Heart,
    title: "Personalization",
    description:
      "Two travelers are never the same. We listen first, plan second, and deliver experiences that feel uniquely yours. Every itinerary is a reflection of your interests, pace, and travel style.",
    numeral: "01",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    description:
      "No hidden fees, no surprise charges. What we quote is what you pay. We believe trust is built through transparency, honest communication, and delivering on every promise we make.",
    numeral: "02",
  },
  {
    icon: Star,
    title: "Quality",
    description:
      "Every hotel, every route, every detail is vetted by our team. We personally inspect accommodations and experiences to ensure they meet our standards before recommending them to you.",
    numeral: "03",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We combine decades of on-ground travel expertise with modern technology to create a smarter, faster, and more enjoyable way to plan your trips. The future of travel is here.",
    numeral: "04",
  },
]

const features = [
  {
    icon: Users,
    title: "Personal Curation",
    description:
      "Every trip is handcrafted to your preferences. No cookie-cutter packages - just experiences tailored to the way you travel.",
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
      "Jayshree Lakhotiya started a boutique travel practice in Maharashtra, driven by a passion for creating unforgettable travel experiences for families and working professionals.",
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
      "Expanded into specialised group travel for families and corporates, broadening beyond pure leisure. Distinct travel experiences now under one roof.",
    icon: Star,
  },
  {
    year: "2022",
    title: "500 Trips Milestone",
    description:
      "Surpassed 500 curated trips and 2,000 happy travellers. Built a loyal community of repeat clients who trust the team with every family vacation and group expedition.",
    icon: Plane,
  },
  {
    year: "2026",
    title: "TravelSense Goes Digital",
    description:
      "Incorporated TravelSense Private Limited and launched the digital platform - combining 15+ years of curation expertise with AI-powered personalisation and 24/7 human support.",
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
          HERO - light mesh, display headline, breadcrumb, trust chips
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brand-mesh px-4 pt-[120px] pb-20 sm:px-6 sm:pt-[150px] sm:pb-24">
        {/* soft brand washes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div
            className="absolute -top-[10%] left-[6%] h-[460px] w-[560px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(212,168,83,0.12), rgba(196,50,74,0.05) 52%, transparent 76%)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute -bottom-[12%] right-[4%] h-[480px] w-[480px] rounded-full"
            style={{
              background: "radial-gradient(closest-side, rgba(74,120,205,0.10), transparent 72%)",
              filter: "blur(100px)",
            }}
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
            <Link href="/" className="transition-colors hover:text-secondary">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-silver" />
            <span className="font-semibold text-primary">About</span>
          </motion.nav>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/70 px-3.5 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Who we are
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-heading text-[2.5rem] font-medium leading-[1.04] tracking-[-0.025em] text-primary sm:text-[3.4rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Travel, the{" "}
            <span className="italic font-normal text-secondary">human</span> way.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mx-auto mt-5 max-w-xl font-body text-[15px] leading-[1.7] text-foreground/70 sm:text-[17px]"
          >
            Founded by Jayshree Lakhotiya, TravelSense pairs 15+ years of on-ground travel
            expertise with modern technology - so every journey feels personal, effortless and
            unmistakably yours.
          </motion.p>

          {/* trust chips */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
          >
            {[
              { icon: Compass, label: "500+ trips planned" },
              { icon: MapPin, label: "50+ destinations" },
              { icon: Star, label: "15+ years of craft" },
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

      {/* ═══════════════════════════════════════════════════════════
          STORY - light band, glass card copy + founder portrait
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Our story
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              The story behind{" "}
              <span className="italic font-normal text-secondary">TravelSense.</span>
            </h2>
            <div className="mt-6 space-y-4 font-body text-[14.5px] leading-[1.75] text-muted-foreground sm:text-[15px]">
              <p>
                For Jayshree Lakhotiya, travel was never just a business - it was a calling.
                Growing up in Pune, she was captivated by the idea that a single trip could change
                a person&apos;s perspective, strengthen a family&apos;s bond, and create memories
                that last a lifetime.
              </p>
              <p>
                In 2010, she turned that passion into a boutique travel practice built on a simple
                promise: every trip should feel personal. While the industry pushed cookie-cutter
                packages, Jayshree spent hours understanding what each traveller truly wanted. A
                honeymooning couple looking for seclusion in Bali. A school group eager to explore
                European history. A family of cricket fans chasing the World Cup across continents.
                Each trip was different, and that was the point.
              </p>
              <p>
                Over 15 years and 500+ trips later, she noticed something: India&apos;s working
                professionals desperately wanted great vacations but didn&apos;t have the time or
                patience to plan them. The big platforms offered endless options but zero curation.
                The local agents offered personal touch but lacked technology.
              </p>
              <p>
                TravelSense was born to bridge that gap - a digital platform that combines
                Jayshree&apos;s decades of on-ground expertise with modern technology. A place where
                AI helps you discover your perfect trip, but a real human ensures every detail is
                right.
              </p>
            </div>
          </motion.div>

          {/* Founder portrait (glass-framed) with graceful fallback */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="glass-panel relative overflow-hidden rounded-[28px] p-2.5 shadow-[0_30px_80px_rgba(11,20,38,0.18)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-primary/10">
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
                    {/* Decorative glows */}
                    <div
                      className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(196,50,74,0.18), rgba(212,168,83,0.12) 60%, transparent)",
                      }}
                    />
                    <div className="pointer-events-none absolute right-1/4 top-1/4 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />

                    <div className="relative px-6 text-center">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 ring-1 ring-white/15">
                        <Globe className="h-12 w-12 text-accent/70" strokeWidth={1.4} />
                      </div>
                      <h3 className="mt-6 font-heading text-lg font-medium tracking-[-0.015em] text-white">
                        Jayshree Lakhotiya
                      </h3>
                      <p className="mt-2 font-body text-sm tracking-wide text-accent/85">
                        Founder &amp; Lead Travel Curator
                      </p>
                      <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
                      <p className="mx-auto mt-4 max-w-[240px] font-body text-xs leading-relaxed text-white/40">
                        15+ years of crafting unforgettable journeys across 50+ destinations
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* floating accent chip */}
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl glass-pill px-4 py-3 sm:block">
              <p className="font-heading text-xl font-medium leading-none text-primary">15+</p>
              <p className="mt-1 font-body text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Years of craft
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MISSION & VISION - light band, two glass plaques
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-brand-mesh px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              What drives us
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Purpose, made <span className="italic font-normal text-secondary">clear.</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {/* Mission */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="glass-panel group relative overflow-hidden rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-6 select-none font-heading text-[8rem] italic font-normal leading-none text-primary/[0.05]"
              >
                01
              </span>
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                  <Heart className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-heading text-[1.5rem] font-medium tracking-[-0.02em] text-primary">
                  Our <span className="italic font-normal text-secondary">mission.</span>
                </h3>
                <p className="mt-4 font-body text-[15.5px] font-medium leading-[1.6] text-primary/85">
                  Making extraordinary travel experiences accessible to every Indian family.
                </p>
                <p className="mt-3 font-body text-[14px] leading-relaxed text-muted-foreground">
                  We believe every working professional, every family, and every group of friends
                  deserves a vacation that feels effortless from the first inquiry to the last
                  sunset. Travel should be a joy to plan, not a chore to endure.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="glass-panel group relative overflow-hidden rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-6 select-none font-heading text-[8rem] italic font-normal leading-none text-primary/[0.05]"
              >
                02
              </span>
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent-dark transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Eye className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-heading text-[1.5rem] font-medium tracking-[-0.02em] text-primary">
                  Our <span className="italic font-normal text-secondary">vision.</span>
                </h3>
                <p className="mt-4 font-body text-[15.5px] font-medium leading-[1.6] text-primary/85">
                  India&apos;s most trusted personalized travel platform.
                </p>
                <p className="mt-3 font-body text-[14px] leading-relaxed text-muted-foreground">
                  A place where technology amplifies human expertise, where AI helps you discover
                  possibilities and a real travel curator ensures every detail is perfect. Every
                  journey as unique as the traveler.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          VALUES - light band, glass-panel grid with icons
         ═══════════════════════════════════════════════════════════ */}
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
              Our values
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              What we <span className="italic font-normal text-secondary">stand for.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              These four principles guide every trip we plan and every relationship we build.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="glass-panel group relative overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-1 -top-4 select-none font-heading text-[5.5rem] italic font-normal leading-none text-primary/[0.05]"
                >
                  {value.numeral}
                </span>
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                    <value.icon className="h-6 w-6" strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-4 font-heading text-[17px] font-semibold tracking-[-0.01em] text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-2 font-body text-[13.5px] leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionWave from="#F4F6F9" to="#0A1425" />

      {/* ═══════════════════════════════════════════════════════════
          STATS - navy band, glass-dark stat cards
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0A1425] px-4 py-16 sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute right-[6%] top-[10%] h-[300px] w-[300px] rounded-full bg-primary-light/20 blur-[90px]" />
          <div
            className="absolute -left-[4%] bottom-[6%] h-[280px] w-[280px] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(212,168,83,0.10), transparent 70%)", filter: "blur(80px)" }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              By the numbers
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-white sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Fifteen years, <span className="italic font-normal text-accent">measured.</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="glass-dark group rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1 md:p-8"
              >
                <stat.icon className="mx-auto mb-3 h-6 w-6 text-accent/80" strokeWidth={1.6} />
                <p
                  className="font-heading text-[2rem] font-medium tracking-[-0.02em] text-white sm:text-[2.4rem]"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                >
                  {stat.number}
                </p>
                <p className="mt-1 font-body text-[13.5px] text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          JOURNEY / TIMELINE - navy band, glass-dark milestone rail
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0A1425] px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              Our journey
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-white sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              From a single office to{" "}
              <span className="italic font-normal text-accent">all of India.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-white/55">
              From a small practice in Pune to a digital travel platform serving families across
              India.
            </p>
          </motion.div>

          {/* Timeline rail */}
          <div className="relative mt-14 pl-2">
            {/* vertical line */}
            <div
              className="absolute left-[26px] top-2 bottom-2 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(196,50,74,0.45), rgba(212,168,83,0.30), transparent)",
              }}
              aria-hidden
            />

            <div className="space-y-7">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative flex gap-5"
                >
                  {/* node */}
                  <div className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full glass-dark">
                    <milestone.icon className="h-5 w-5 text-secondary-glow" strokeWidth={1.7} />
                  </div>
                  {/* content card */}
                  <div className="glass-dark flex-1 rounded-2xl p-5 sm:p-6">
                    <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-accent/80">
                      {milestone.year}
                    </span>
                    <h3 className="mt-1.5 font-heading text-[17px] font-medium tracking-[-0.015em] text-white">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 font-body text-[13.5px] leading-relaxed text-white/60">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionWave from="#0A1425" to="#F4F6F9" flip />

      {/* ═══════════════════════════════════════════════════════════
          WHY CHOOSE US - light band, glass-panel feature grid
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Why choose us
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Why travellers choose{" "}
              <span className="italic font-normal text-secondary">TravelSense.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              We combine decades of travel expertise with a modern, technology-driven approach to
              deliver experiences you can trust.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="glass-panel group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                  <feature.icon className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <h3 className="mt-4 font-heading text-[16px] font-semibold tracking-[-0.01em] text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 font-body text-[13.5px] leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionWave from="#F4F6F9" to="#0A1425" />

      {/* ═══════════════════════════════════════════════════════════
          CTA - navy band, founder closing line + actions
         ═══════════════════════════════════════════════════════════ */}
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
            Let&apos;s begin
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.025em] text-white sm:text-[2.9rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Ready to plan your next{" "}
            <span className="italic font-normal text-secondary-glow">adventure?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-4 max-w-xl font-body text-[15px] leading-[1.7] text-white/65 sm:text-[16px]"
          >
            Let our travel experts craft the perfect trip for you. No commitment, no pressure - just
            a friendly conversation about where you want to go.
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
            className="mt-8 font-body text-[12.5px] text-white/40"
          >
            TravelSense Private Limited &middot; Founded by Jayshree Lakhotiya, Pune
          </motion.p>
        </div>
      </section>
    </>
  )
}
