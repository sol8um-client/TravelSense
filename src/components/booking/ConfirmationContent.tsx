"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  CheckCircle2,
  ClipboardList,
  PhoneCall,
  Map,
  ArrowRight,
  Home,
  Package,
  MessageCircle,
} from "lucide-react"
import { PageHero } from "@/components/shared/PageHero"
import { SectionWave } from "@/components/shared/SectionWave"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  }),
}

const steps = [
  {
    icon: ClipboardList,
    title: "We Review Your Request",
    description:
      "Our team reviews your travel preferences, dates, and interests to prepare tailored recommendations.",
  },
  {
    icon: PhoneCall,
    title: "Expert Calls You",
    description:
      "A dedicated travel expert will call you at your preferred time to discuss your trip in detail.",
  },
  {
    icon: Map,
    title: "Itinerary Created",
    description:
      "Based on our conversation, we craft a personalized itinerary and share it with you for review.",
  },
]

export default function ConfirmationContent() {
  return (
    <>
      {/* ── HERO - shared site hero ──────────────────────────────────────── */}
      <PageHero
        eyebrow="Request received"
        title="You're all set."
        accent="Thank you"
        subtitle="Your consultation request has been received and a real travel expert is already on it."
        crumb="Confirmation"
      />

      {/* ── SUCCESS CARD + what-happens-next on a light band ──────────────── */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="glass-panel rounded-[28px] p-6 text-center shadow-[0_30px_80px_rgba(11,20,38,0.12)] sm:p-10"
          >
            {/* animated check */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/12 ring-1 ring-emerald-500/20"
            >
              <CheckCircle2 className="h-10 w-10 text-emerald-500" strokeWidth={1.8} />
            </motion.div>

            <h2
              className="mt-6 font-heading text-[1.6rem] font-medium leading-[1.12] tracking-[-0.02em] text-primary sm:text-[2rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Your consultation is booked
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.7] text-muted-foreground sm:text-[15.5px]">
              We have received your details and our travel experts are already
              looking into the best options for you. Here is what happens next:
            </p>

            {/* steps */}
            <div className="mt-10 space-y-4 text-left">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="flex gap-4 rounded-2xl border border-white/70 bg-white/55 p-5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <step.icon className="h-6 w-6" strokeWidth={1.7} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-dark">
                      Step {i + 1}
                    </span>
                    <h3 className="mt-0.5 font-heading text-[16px] font-semibold tracking-[-0.01em] text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-1 font-body text-[13.5px] leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="mt-10 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row"
            >
              <Link href="/packages" className="btn btn-primary" style={{ padding: "14px 26px", fontSize: 13 }}>
                <Package size={16} strokeWidth={1.8} />
                Explore packages
                <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
              <Link href="/" className="btn btn-ghost" style={{ padding: "14px 24px", fontSize: 13 }}>
                <Home size={15} strokeWidth={1.8} />
                Back to home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionWave from="#F4F6F9" to="#0A1425" />

      {/* ── "Prefer to chat now?" navy CTA band ──────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1425]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 600px 400px at 20% 20%, rgba(196,50,74,0.16), transparent 60%), radial-gradient(ellipse 600px 400px at 85% 90%, rgba(27,45,78,0.6), transparent 60%)",
          }}
        />
        <div className="relative z-[2] mx-auto max-w-[680px] px-6 py-[clamp(64px,9vw,96px)] text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-heading text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.025em] text-white"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Prefer to chat{" "}
            <span className="italic font-normal" style={{ color: "var(--secondary-glow)" }}>now?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
            className="mx-auto mt-4 max-w-[440px] font-body text-[15.5px] leading-[1.7] text-[rgba(208,213,220,0.7)]"
          >
            Can&apos;t wait for the call? Message a real travel expert on WhatsApp and we will
            pick up right where you left off.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <WhatsAppLink
              source="consultation-confirmation"
              message="Hi TravelSense, I just booked a consultation and would love to start planning."
              className="btn btn-primary"
              style={{ padding: "15px 30px", fontSize: 14 }}
            >
              <MessageCircle size={16} strokeWidth={1.8} /> Chat on WhatsApp
            </WhatsAppLink>
            <Link href="/destinations" className="btn btn-ghost" style={{ padding: "15px 28px", fontSize: 14 }}>
              Browse destinations
              <ArrowRight size={15} strokeWidth={1.8} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
