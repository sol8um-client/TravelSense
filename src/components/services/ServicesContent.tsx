"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
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
  Phone,
  type LucideIcon,
} from "lucide-react"
import { travelCategories } from "@/config/categories"
import PageHero from "@/components/shared/PageHero"
import { SectionWave } from "@/components/shared/SectionWave"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"

/* ─── Core services (every offering preserved, restyled) ─────────────── */

interface CoreService {
  icon: LucideIcon
  title: string
  description: string
  href: string
  badge?: string
}

const coreServices: CoreService[] = [
  {
    icon: Headphones,
    title: "Travel Consultation",
    description:
      "Speak with our travel experts to plan your dream trip. First session is complimentary.",
    href: "/consultation",
    badge: "Free First Session",
  },
  {
    icon: Map,
    title: "Itinerary Planning",
    description:
      "Custom day-by-day itineraries tailored to your preferences, budget, and travel style.",
    href: "/itinerary-builder",
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    description:
      "Access the best rates across thousands of properties worldwide. Price match guaranteed.",
    href: "/hotels",
  },
  {
    icon: Car,
    title: "Vehicle Booking",
    description:
      "Airport transfers, intercity cabs, and self-drive rentals for seamless road travel.",
    href: "/vehicles",
  },
  {
    icon: FileCheck,
    title: "Visa & Passport Assistance",
    description:
      "End-to-end visa processing and passport services. No paperwork headaches.",
    href: "/visa-passport",
  },
  {
    icon: Users,
    title: "Group & Corporate Travel",
    description:
      "Tailored packages for corporate offsites, team outings, and large group getaways.",
    href: "/contact",
  },
]

/* ─── How we work (4 steps preserved) ───────────────────────────────── */

interface Step {
  number: string
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Tell Us Your Dream",
    description:
      "Share your travel vision - destinations, dates, budget, and preferences. We listen.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We Curate",
    description:
      "Our experts craft a personalized itinerary with handpicked stays, experiences, and transfers.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "You Review & Customize",
    description:
      "Review every detail, request changes, and finalize only when you are completely satisfied.",
  },
  {
    number: "04",
    icon: Plane,
    title: "Travel Stress-Free",
    description:
      "Everything is booked and confirmed. All you need to do is pack your bags and enjoy.",
  },
]

/* ─── Motion ─────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function ServicesContent() {
  return (
    <>
      {/* ── HERO - shared PageHero, service quick-chips kept as children ─────── */}
      <PageHero
        eyebrow="What we do"
        title="Everything,"
        accent="handled."
        subtitle="From the first idea to the last sunset, every part of your journey is taken care of by a real human team - planning, stays, transfers, visas and more."
        crumb="Services"
      >
        {coreServices.map((s) => (
          <a
            key={s.title}
            href={`#${slugify(s.title)}`}
            className="glass-pill inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-body text-[12.5px] font-medium text-primary transition-transform hover:-translate-y-0.5"
          >
            <s.icon className="h-3.5 w-3.5 text-secondary" strokeWidth={1.9} />
            {s.title.replace(" Assistance", "").replace(" & Corporate Travel", "")}
          </a>
        ))}
      </PageHero>

      {/* ── CORE SERVICES - liquid-glass cards on light ─────────────────────── */}
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
              Core services
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Every part of the trip,{" "}
              <span className="italic font-normal text-secondary">covered.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              Pick what you need or hand us the whole journey. We handle the details so
              you can focus on the experience.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  id={slugify(service.title)}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  style={{ scrollMarginTop: "calc(var(--nav-h) + 16px)" }}
                  className="glass-panel group relative flex flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  {service.badge && (
                    <span className="absolute right-5 top-5 rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-0.5 font-body text-[10.5px] font-semibold text-secondary">
                      {service.badge}
                    </span>
                  )}

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.7} />
                  </div>

                  <h3 className="mt-4 font-heading text-[17px] font-semibold tracking-[-0.01em] text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 font-body text-[13.5px] leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-secondary transition-colors hover:text-secondary-dark"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TRAVEL STYLES - alternating glass showcase on light ─────────────── */}
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
              Travel styles
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Two ways to{" "}
              <span className="italic font-normal text-secondary">explore.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              From serene beaches to adrenaline-filled adventures, we cover every kind of
              journey.
            </p>
          </motion.div>

          <div className="mt-12 flex flex-col gap-5">
            {travelCategories.map((cat, i) => {
              const Icon = cat.icon
              const name = cat.title.replace(" Travel", "")
              return (
                <motion.div
                  key={cat.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="glass-panel group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
                    <div className="flex items-start gap-4 lg:w-[42%]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                        <Icon className="h-6 w-6" strokeWidth={1.7} />
                      </div>
                      <div>
                        <h3 className="font-heading text-[20px] font-semibold tracking-[-0.01em] text-primary">
                          {name} <span className="italic font-normal text-secondary">travel.</span>
                        </h3>
                        <p className="mt-2 font-body text-[13.5px] leading-relaxed text-muted-foreground">
                          {cat.longDescription}
                        </p>
                      </div>
                    </div>

                    <div className="lg:flex-1">
                      <ul className="grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
                        {cat.highlights.slice(0, 6).map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 font-body text-[13px] leading-snug text-foreground/75"
                          >
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={cat.href}
                        className="mt-5 inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-secondary transition-colors hover:text-secondary-dark"
                      >
                        Explore {name}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <SectionWave from="#FFFFFF" to="#0A1425" />

      {/* ── HOW WE WORK - navy band, numbered rail ──────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1425] px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute right-[6%] top-[8%] h-[300px] w-[300px] rounded-full bg-primary-light/20 blur-[90px]" />
          <div
            className="absolute -left-[4%] bottom-[6%] h-[280px] w-[280px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(212,168,83,0.10), transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              How we work
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Four steps from dream to{" "}
              <span className="italic font-normal text-accent">departure.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-white/55">
              From the first consultation to the last sunset of your trip, every detail is
              thoughtfully handled. Your only job is to enjoy the journey.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="glass-dark group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <span className="font-heading text-[1.6rem] font-medium leading-none text-white/15">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="glass-text mt-4 font-heading text-[16px] font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="glass-text mt-2 font-body text-[13px] leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA - navy with brand glow ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1425]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 600px 400px at 20% 20%, rgba(196,50,74,0.16), transparent 60%), radial-gradient(ellipse 600px 400px at 85% 90%, rgba(27,45,78,0.6), transparent 60%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-24"
        >
          <h2
            className="font-heading text-[1.9rem] font-medium tracking-[-0.025em] text-white sm:text-[2.9rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Ready to start{" "}
            <span className="italic font-normal" style={{ color: "var(--secondary-glow)" }}>
              planning?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-[15px] leading-[1.7] text-white/65 sm:text-[15.5px]">
            Book a free consultation with our travel experts and let us turn your travel
            dreams into reality.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/consultation" className="btn btn-primary">
              Book free consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppLink source="services-cta" className="btn btn-ghost">
              <Phone className="h-4 w-4" strokeWidth={1.7} />
              Talk to a human
            </WhatsAppLink>
            <Link href="/contact" className="btn btn-ghost">
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}

/* ─── helpers ────────────────────────────────────────────────────────── */

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
