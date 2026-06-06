"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { PageHero } from "@/components/shared/PageHero"

/**
 * LegalContent - the shared client shell for the long-form legal pages
 * (Terms of Service, Privacy Policy). Renders the site-wide <PageHero> then
 * drops the verbatim legal copy into a centred liquid-glass "prose" card with
 * readable display typography, on a soft staggered entrance. The actual legal
 * text lives in the server page and is passed in as `children` so it is never
 * touched here - this component only restyles it.
 */
export default function LegalContent({
  eyebrow,
  title,
  accent,
  subtitle,
  crumb,
  lastUpdated,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  accent?: string
  subtitle?: string
  crumb?: string
  lastUpdated?: string
  children: ReactNode
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        accent={accent}
        subtitle={subtitle}
        crumb={crumb}
      />

      {/* ── Legal body - centred glass prose card on a light band ─────────── */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel legal-prose rounded-[28px] p-6 shadow-[0_30px_80px_rgba(11,20,38,0.12)] sm:p-10 lg:p-12"
          >
            {lastUpdated && (
              <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-white/60 px-3.5 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Last updated: {lastUpdated}
              </p>
            )}
            {children}
          </motion.article>
        </div>
      </section>
    </>
  )
}
