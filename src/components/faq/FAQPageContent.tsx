"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, HelpCircle, Clock, ShieldCheck } from "lucide-react"
import { PageHero } from "@/components/shared/PageHero"
import { SectionWave } from "@/components/shared/SectionWave"
import { waHref } from "@/lib/whatsapp"
import FAQAccordion, { type FAQItem } from "@/components/faq/FAQAccordion"

interface FAQPageContentProps {
  faqs: FAQItem[]
}

export default function FAQPageContent({ faqs }: FAQPageContentProps) {
  return (
    <>
      {/* ── HERO - shared site hero ──────────────────────────────────────── */}
      <PageHero
        eyebrow="Help center"
        title="Questions, answered"
        accent="clearly."
        subtitle="Everything you need to know about planning your trip with TravelSense - booking, payments, cancellations and more."
        crumb="FAQ"
      >
        {[
          { icon: HelpCircle, label: `${faqs.length} answers` },
          { icon: Clock, label: "Replies within a day" },
          { icon: ShieldCheck, label: "Real humans, no bots" },
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

      {/* ── FAQ ACCORDION - glass cards on light ─────────────────────────── */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Before you book
            </p>
            <h2
              className="mt-3 font-heading text-[1.9rem] font-medium tracking-[-0.02em] text-primary sm:text-[2.4rem]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Find your answer fast.
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-[14.5px] leading-[1.65] text-muted-foreground">
              Search a keyword or pick a category, then tap any question to expand the answer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-12"
          >
            <FAQAccordion faqs={faqs} />
          </motion.div>
        </div>
      </section>

      <SectionWave from="#F4F6F9" to="#0A1425" />

      {/* ── STILL HAVE QUESTIONS - navy CTA band ─────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1425] px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[6%] top-[8%] h-[300px] w-[300px] rounded-full bg-primary-light/20 blur-[90px]" />
          <div
            className="absolute -left-[4%] bottom-[6%] h-[280px] w-[280px] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(196,50,74,0.12), transparent 70%)", filter: "blur(80px)" }}
          />
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent"
          >
            <MessageCircle className="h-6 w-6" strokeWidth={1.8} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.025em] text-white sm:text-[2.4rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Still have{" "}
            <span className="italic font-normal text-accent">questions?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="mx-auto mt-4 max-w-md font-body text-[15px] leading-[1.7] text-white/55"
          >
            Our travel experts are happy to help. Reach out and we will get back to you within a few hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/contact" className="btn btn-primary" style={{ padding: "15px 30px", fontSize: 14 }}>
              Contact us
              <ArrowRight size={15} strokeWidth={1.8} />
            </Link>
            <a
              href={waHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ padding: "15px 28px", fontSize: 14 }}
              onClick={() => {
                try {
                  const w = window as unknown as {
                    gtag?: (...args: unknown[]) => void
                  }
                  w.gtag?.("event", "whatsapp_click", { source: "faq" })
                } catch {
                  /* analytics is best-effort */
                }
              }}
            >
              <MessageCircle size={16} strokeWidth={1.8} /> WhatsApp us
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
