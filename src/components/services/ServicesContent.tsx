"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Check,
  Headphones,
  Map,
  Hotel,
  Car,
  FileCheck,
  Users,
  MessageCircle,
  Sparkles,
  ClipboardCheck,
  Plane,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { Button } from "@/components/ui/button"
import { travelCategories } from "@/config/categories"

/* ─── Animation Variants ─────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
}

/* ─── Core Services Data ─────────────────────────────────────────────── */

const coreServices = [
  {
    icon: Headphones,
    title: "Travel Consultation",
    description:
      "Speak with our travel experts to plan your dream trip. First session is complimentary.",
    href: "/consultation",
    badge: "Free First Session",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop",
  },
  {
    icon: Map,
    title: "Itinerary Planning",
    description:
      "Custom day-by-day itineraries tailored to your preferences, budget, and travel style.",
    href: "/itinerary-builder",
    badge: null,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=250&fit=crop",
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    description:
      "Access the best rates across thousands of properties worldwide. Price match guaranteed.",
    href: "/hotels",
    badge: null,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
  },
  {
    icon: Car,
    title: "Vehicle Booking",
    description:
      "Airport transfers, intercity cabs, and self-drive rentals for seamless road travel.",
    href: "/vehicles",
    badge: null,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=250&fit=crop",
  },
  {
    icon: FileCheck,
    title: "Visa & Passport Assistance",
    description:
      "End-to-end visa processing and passport services. No paperwork headaches.",
    href: "/visa-passport",
    badge: null,
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&h=250&fit=crop",
  },
  {
    icon: Users,
    title: "Group & Corporate Travel",
    description:
      "Tailored packages for corporate offsites, team outings, and large group getaways.",
    href: "/contact",
    badge: null,
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&h=250&fit=crop",
  },
]

/* ─── How It Works Steps ─────────────────────────────────────────────── */

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Tell Us Your Dream",
    description:
      "Share your travel vision — destinations, dates, budget, and preferences. We listen.",
    color: "text-[#C4324A]",
    bg: "bg-[#C4324A]/10",
    border: "border-[#C4324A]/20",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We Curate",
    description:
      "Our experts craft a personalized itinerary with handpicked stays, experiences, and transfers.",
    color: "text-[#D4A853]",
    bg: "bg-[#D4A853]/10",
    border: "border-[#D4A853]/20",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "You Review & Customize",
    description:
      "Review every detail, request changes, and finalize only when you are completely satisfied.",
    color: "text-[#2BA5A5]",
    bg: "bg-[#2BA5A5]/10",
    border: "border-[#2BA5A5]/20",
  },
  {
    number: "04",
    icon: Plane,
    title: "Travel Stress-Free",
    description:
      "Everything is booked and confirmed. All you need to do is pack your bags and enjoy.",
    color: "text-[#4DC9C9]",
    bg: "bg-[#4DC9C9]/10",
    border: "border-[#4DC9C9]/20",
  },
]

/* ─── Component ──────────────────────────────────────────────────────── */

export default function ServicesContent() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Our Services"
        subtitle="Everything you need for the perfect trip"
        backgroundImage="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&h=1080&fit=crop"
      >
        <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
      </PageHero>

      {/* ── Travel Categories ──────────────────────────────────────── */}
      <section className="bg-[#0A1425] px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="mb-14 text-center"
          >
            <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl lg:text-4xl">
              Travel Categories
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-white/50 md:text-base">
              From serene beaches to adrenaline-filled adventures, we cover
              every kind of journey.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2"
          >
            {travelCategories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.id}
                  variants={fadeUp}
                  custom={i}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-colors hover:border-white/[0.12] md:p-8"
                >
                  {/* Gradient accent line */}
                  <div
                    className={cn(
                      "absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r",
                      cat.color.gradient
                    )}
                  />

                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                        cat.color.bg
                      )}
                    >
                      <Icon className={cn("h-6 w-6", cat.color.text)} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-medium tracking-[-0.015em] leading-[1.15] text-white">
                        {cat.title}
                      </h3>
                      <p className="mt-1.5 font-body text-sm leading-relaxed text-white/50">
                        {cat.longDescription}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {cat.highlights.slice(0, 4).map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2 font-body text-sm text-white/40"
                      >
                        <Check
                          className={cn("h-3.5 w-3.5 shrink-0", cat.color.text)}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={cat.href}
                    className={cn(
                      "mt-6 inline-flex items-center gap-1.5 font-body text-sm font-medium transition-colors",
                      cat.color.text
                    )}
                  >
                    Explore {cat.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Core Services Grid ─────────────────────────────────────── */}
      <section className="bg-[#0D1A30] px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="mb-14 text-center"
          >
            <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl lg:text-4xl">
              Core Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-white/50 md:text-base">
              Every aspect of your journey, handled with care.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {coreServices.map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  variants={scaleIn}
                  custom={i}
                  className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] transition-colors hover:border-[#C4324A]/30 hover:bg-white/[0.05]"
                >
                  {/* Service image */}
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={250}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A30] via-[#0D1A30]/40 to-transparent" />
                  </div>

                  <div className="p-6">
                    {service.badge && (
                      <span className="absolute right-4 top-4 rounded-full bg-[#C4324A]/15 px-2.5 py-0.5 font-body text-[11px] font-medium text-[#C4324A] backdrop-blur-sm">
                        {service.badge}
                      </span>
                    )}

                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#C4324A]/10">
                      <Icon className="h-5 w-5 text-[#C4324A]" />
                    </div>

                    <h3 className="font-heading text-base font-medium tracking-[-0.015em] leading-[1.15] text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-white/45">
                      {service.description}
                    </p>

                    <Link
                      href={service.href}
                      className="mt-4 inline-flex items-center gap-1 font-body text-sm font-medium text-[#D4A853] transition-colors hover:text-[#D4A853]/80"
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Travel Experience Banner ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[280px] md:h-[360px]">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=600&fit=crop"
            alt="Beautiful tropical beach with crystal clear water"
            width={1920}
            height={600}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1425]/90 via-[#0A1425]/60 to-[#0A1425]/90" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto max-w-3xl px-4 text-center">
              <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl">
                Travel With Confidence
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-body text-sm text-white/70 md:text-base">
                From the first consultation to the last sunset of your trip, every detail is thoughtfully handled.
                Your only job is to enjoy the journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────── */}
      <section className="bg-[#0A1425] px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="mb-14 text-center"
          >
            <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl lg:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-white/50 md:text-base">
              Four simple steps from dream to departure.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  custom={i}
                  className="relative text-center"
                >
                  {/* Connector line (hidden on last item and mobile) */}
                  {i < steps.length - 1 && (
                    <div className="absolute right-0 top-10 hidden h-[1px] w-[calc(50%-24px)] bg-gradient-to-r from-white/10 to-transparent lg:block" />
                  )}

                  <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
                    {/* Outer ring */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full border",
                        step.border
                      )}
                    />
                    {/* Inner circle */}
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full",
                        step.bg
                      )}
                    >
                      <Icon className={cn("h-6 w-6", step.color)} />
                    </div>
                    {/* Step number */}
                    <span
                      className={cn(
                        "absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0A1425] font-body text-[10px] font-semibold ring-1",
                        step.color,
                        step.border
                      )}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-medium tracking-[-0.015em] leading-[1.15] text-white">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[240px] font-body text-sm leading-relaxed text-white/45">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────── */}
      <section className="bg-[#0D1A30] px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl lg:text-4xl">
              Ready to Start Planning?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/50 md:text-base">
              Book a free consultation with our travel experts and let us turn
              your travel dreams into reality.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/consultation">
                  Book Free Consultation
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
