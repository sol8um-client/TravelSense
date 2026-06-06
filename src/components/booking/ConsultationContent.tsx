"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Headphones,
  Globe,
  IndianRupee,
  ShieldCheck,
  MessageSquare,
  CalendarCheck,
  Plane,
  Star,
  Clock,
  ChevronRight,
} from "lucide-react"
import ConsultationForm from "@/components/booking/ConsultationForm"
import { SectionWave } from "@/components/shared/SectionWave"

const benefits = [
  {
    icon: Headphones,
    title: "Expert guidance",
    description:
      "Speak directly with a seasoned travel specialist who understands your needs and recommends the perfect trip.",
  },
  {
    icon: Globe,
    title: "Personalized itineraries",
    description:
      "Receive a custom plan built around your interests, schedule and travel style - never a cookie-cutter package.",
  },
  {
    icon: IndianRupee,
    title: "Budget optimization",
    description:
      "Get the most from your budget with insider tips on deals, seasonal pricing and smart booking strategies.",
  },
  {
    icon: ShieldCheck,
    title: "Zero obligation",
    description:
      "The consultation is completely free with no strings attached. Explore your options before committing to anything.",
  },
]

const steps = [
  {
    icon: MessageSquare,
    title: "Share your details",
    description: "Tell us where you dream of going, when, and who's travelling.",
  },
  {
    icon: CalendarCheck,
    title: "We reach out",
    description: "A real expert calls you back at a time that suits you - no bots, no IVR.",
  },
  {
    icon: Plane,
    title: "Get your plan",
    description: "Receive a tailored itinerary with transparent pricing, ready to book.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function ConsultationContent() {
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
            <span className="font-semibold text-primary">Consultation</span>
          </motion.nav>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/70 px-3.5 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Free &middot; No obligation
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-heading text-[2.5rem] font-medium leading-[1.04] tracking-[-0.025em] text-primary sm:text-[3.4rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Let&apos;s plan your trip,{" "}
            <span className="italic font-normal text-secondary">together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mx-auto mt-5 max-w-xl font-body text-[15px] leading-[1.7] text-foreground/70 sm:text-[17px]"
          >
            Tell us about your dream trip and a real travel expert will craft the perfect
            plan - completely free.
          </motion.p>

          {/* trust chips */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
          >
            {[
              { icon: Plane, label: "500+ trips planned" },
              { icon: Star, label: "4.9 average rating" },
              { icon: Clock, label: "Replies within a day" },
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

      {/* ── BENEFITS - liquid-glass cards on light ──────────────────────────── */}
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
              Why book a consultation
            </p>
            <h2 className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]" style={{ fontVariationSettings: "'opsz' 144" }}>
              Planning made effortless.
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              Let our experts do the heavy lifting so you can focus on the excitement.
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

      <SectionWave from="#F4F6F9" to="#0A1425" />

      {/* ── FORM - navy band, "how it works" rail + glass form ──────────────── */}
      <section className="relative overflow-hidden bg-[#0A1425] px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[6%] top-[8%] h-[300px] w-[300px] rounded-full bg-primary-light/20 blur-[90px]" />
          <div className="absolute -left-[4%] bottom-[6%] h-[280px] w-[280px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(212,168,83,0.10), transparent 70%)", filter: "blur(80px)" }} />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-start lg:gap-16">
          {/* left: how it works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              How it works
            </p>
            <h2 className="mt-3 font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.4rem]" style={{ fontVariationSettings: "'opsz' 144" }}>
              Three steps to your{" "}
              <span className="italic font-normal text-accent">perfect trip.</span>
            </h2>

            <div className="mt-9 space-y-7">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="flex gap-4"
                >
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <s.icon className="h-5 w-5" strokeWidth={1.8} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-[16px] font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 font-body text-[13.5px] leading-relaxed text-white/55">
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* right: the form */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="mb-5 font-heading text-[20px] font-medium text-white">
              Book your free consultation
            </h3>
            <ConsultationForm />
          </motion.div>
        </div>
      </section>
    </>
  )
}
