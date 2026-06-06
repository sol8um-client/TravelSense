"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

/**
 * PageHero - the single, shared hero used at the top of every non-home page so
 * the whole site reads as one premium system. Light "brand-mesh" canvas with
 * layered brand-colour glows + a faint dot-grid for depth, a frosted eyebrow
 * pill, a Fraunces display headline (pass the accent word in `accent`, it lands
 * in italic cherry), a subtitle, an auto Home > <crumb> breadcrumb, and an
 * optional slot for chips / CTAs - all on a smooth staggered entrance.
 *
 * Keep page bodies flowing out of this with a <SectionWave/> or a light band.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.06 + i * 0.08, ease: EASE },
  }),
}

export function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  crumb,
  children,
}: {
  /** small uppercase kicker shown in the frosted pill */
  eyebrow?: string
  /** main line(s); plain string or JSX */
  title: React.ReactNode
  /** optional trailing word/phrase rendered in italic cherry on its own line */
  accent?: string
  subtitle?: string
  /** current page label for the "Home > <crumb>" breadcrumb */
  crumb?: string
  /** chips, buttons, etc. rendered under the subtitle */
  children?: React.ReactNode
  /** legacy prop from the old hero - accepted but ignored while pages migrate */
  backgroundImage?: string
}) {
  return (
    <section className="relative overflow-hidden bg-brand-mesh px-4 pt-[116px] pb-16 sm:px-6 sm:pt-[150px] sm:pb-20">
      {/* Layered brand auras - warm sunrise (gold->cherry) upper-left, cool blue
          atmosphere lower-right, a cherry accent, and a soft warm spotlight behind
          the headline. Richer hues + glows so the hero reads premium (not flat
          white) and echoes the homepage's auras. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-[16%] -left-[8%] h-[620px] w-[780px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(212,168,83,0.30), rgba(196,50,74,0.13) 46%, transparent 74%)", filter: "blur(90px)" }}
        />
        <div
          className="absolute -bottom-[20%] -right-[8%] h-[640px] w-[640px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(74,120,205,0.24), rgba(74,120,205,0.07) 55%, transparent 78%)", filter: "blur(100px)" }}
        />
        <div
          className="absolute top-[14%] right-[12%] h-[360px] w-[360px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(196,50,74,0.13), transparent 70%)", filter: "blur(85px)" }}
        />
        <div
          className="absolute left-1/2 top-[44%] h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(255,238,210,0.6), transparent 72%)", filter: "blur(55px)" }}
        />
      </div>
      {/* faint dot-grid for texture, masked so it melts away toward the centre */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.65]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(176,184,196,0.55) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 38%, transparent 30%, #000 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 38%, transparent 30%, #000 85%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* breadcrumb */}
        {crumb && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="mb-6 flex items-center justify-center gap-1.5 font-body text-[12px] text-muted-foreground"
          >
            <Link href="/" className="transition-colors hover:text-secondary">Home</Link>
            <ChevronRight className="h-3 w-3 text-silver" />
            <span className="font-semibold text-primary">{crumb}</span>
          </motion.nav>
        )}

        {eyebrow && (
          <motion.span
            variants={fade}
            custom={0}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/70 px-3.5 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          variants={fade}
          custom={1}
          initial="hidden"
          animate="show"
          className="mt-5 font-heading text-[2.5rem] font-medium leading-[1.04] tracking-[-0.025em] text-primary sm:text-[3.4rem]"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {title}
          {accent && (
            <>
              {" "}
              <span className="italic font-normal text-secondary">{accent}</span>
            </>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            variants={fade}
            custom={2}
            initial="hidden"
            animate="show"
            className="mx-auto mt-5 max-w-xl font-body text-[15px] leading-[1.7] text-foreground/70 sm:text-[17px]"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            variants={fade}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default PageHero
