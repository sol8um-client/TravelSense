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
} from "lucide-react"
import Image from "next/image"
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
    icon: ShieldCheck,
    title: "Transparency",
    description:
      "No hidden fees, no surprise charges. What we quote is what you pay. We believe trust is built on honesty.",
    accent: "from-[#D4A853]/20 to-transparent",
  },
  {
    icon: Sparkles,
    title: "Personalization",
    description:
      "Two travelers are never the same. We listen first, plan second, and deliver experiences that feel uniquely yours.",
    accent: "from-[#C4324A]/20 to-transparent",
  },
  {
    icon: Globe,
    title: "Excellence",
    description:
      "Every hotel, every route, every detail is vetted by our team. We don't settle for good enough — and neither should you.",
    accent: "from-[#8A9BB5]/20 to-transparent",
  },
]

/* ─── Component ──────────────────────────────────────────────────── */

export default function AboutContent() {
  const { open } = useLeadModal()

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          OUR STORY
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
                className="font-heading text-3xl font-normal tracking-wide text-white sm:text-4xl"
              >
                Our Story
              </motion.h2>
              <motion.div
                variants={fadeUp}
                custom={1}
                className="mt-6 space-y-4 font-body text-base leading-relaxed text-white/60"
              >
                <p>
                  TravelSense was born from a simple observation: planning a trip
                  should be exciting, not exhausting. Founded by Jayshree
                  Lakhotiya, a travel professional with over 15 years of
                  experience, the journey began with V9 Travels in Pune — a
                  small but passionate team dedicated to creating memorable
                  travel experiences.
                </p>
                <p>
                  Over the years, Jayshree personally curated hundreds of trips
                  — from serene Bali getaways to adventurous Himalayan treks,
                  from educational European tours to sports expeditions across
                  continents. Each trip deepened her understanding of what
                  travelers truly need: not just bookings, but a trusted partner
                  who listens, plans, and delivers.
                </p>
                <p>
                  In 2026, TravelSense was launched as a tech-enabled evolution
                  of that legacy. Combining decades of on-ground expertise with
                  modern technology, TravelSense brings personalized travel
                  planning to India&apos;s working professionals — people who
                  deserve a great trip but don&apos;t have the time to plan one.
                </p>
              </motion.div>
            </div>

            {/* Image placeholder */}
            <motion.div variants={fadeUp} custom={2} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#122040]">
                <Image
                  src="/images/about/founder.jpg"
                  alt="Jayshree Lakhotiya, Founder of TravelSense"
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Fallback overlay if image is missing */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#122040]/60">
                  <div className="text-center">
                    <Globe className="mx-auto h-16 w-16 text-white/20" />
                    <p className="mt-3 font-heading text-sm tracking-wider text-white/30">
                      Founder Portrait
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl border border-secondary/20 bg-secondary/5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MISSION & VISION
         ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#060B15] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2"
          >
            {/* Mission */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A1425] p-8 md:p-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C4324A]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-heading text-xl font-normal tracking-wide text-white">
                  Our Mission
                </h3>
                <p className="mt-4 font-body text-base leading-relaxed text-white/60">
                  To make curated, stress-free travel accessible to every
                  working professional. We believe everyone deserves a vacation
                  that feels effortless from the first inquiry to the last
                  sunset.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A1425] p-8 md:p-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4A853]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-normal tracking-wide text-white">
                  Our Vision
                </h3>
                <p className="mt-4 font-body text-base leading-relaxed text-white/60">
                  To be India&apos;s most trusted personalized travel platform.
                  A place where technology amplifies human expertise, and every
                  journey is as unique as the traveler.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHY CHOOSE US
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
              <h2 className="font-heading text-3xl font-normal tracking-wide text-white sm:text-4xl">
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
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#060B15] p-6 transition-colors duration-300 hover:border-white/20"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white/5">
                    <feature.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-heading text-sm font-normal tracking-wider text-white">
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
              <h2 className="font-heading text-3xl font-normal tracking-wide text-white sm:text-4xl">
                What We Stand For
              </h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  custom={i + 1}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A1425] p-8"
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-40",
                      value.accent
                    )}
                  />
                  <div className="relative">
                    <value.icon className="mb-5 h-8 w-8 text-white/40" />
                    <h3 className="font-heading text-lg font-normal tracking-wider text-white">
                      {value.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-white/50">
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
              className="font-heading text-3xl font-normal tracking-wide text-white sm:text-4xl"
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
