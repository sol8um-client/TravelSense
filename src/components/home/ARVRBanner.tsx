"use client"

/**
 * ARVRBanner — a thin, premium "coming soon" ribbon for the upcoming AR/VR
 * preview feature. Dark-navy liquid glass (the Problem-section navy #0A1425)
 * with gold (var(--accent)) accents.
 *
 * It deliberately reads as the white → navy TRANSITION into the Problem section:
 * the band itself is navy, sits flush above the Problem block, and the hero's
 * Wave divider flows the white TrustBar down into it. Thin and elegant — not a
 * boxy block. Stacks cleanly on mobile.
 *
 * Figure slot: if `public/images/brand/vr-preview.png` ever ships, swap the
 * placeholder for an <Image> that overhangs the band's top edge. For now there's
 * no such asset, so we render a large VR-goggles glyph inside a soft glowing gold
 * ring as the placeholder (no real image used).
 */

import Image from "next/image"
import Link from "next/link"
import { Glasses, ArrowRight, Sparkles } from "lucide-react"

export default function ARVRBanner() {
  return (
    <section
      aria-label="Coming soon: AR/VR destination preview"
      className="relative overflow-hidden"
      style={{ background: "#0A1425" }}
    >
      {/* soft gold + navy glows for depth (siblings — no filter on clipped kids) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[6%] top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-accent/[0.10] blur-[90px]" />
        <div className="absolute right-[8%] top-[10%] h-[240px] w-[240px] rounded-full bg-primary-light/30 blur-[80px]" />
      </div>
      {/* faint dot grid (right side) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #D4A853 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "linear-gradient(to left, black 0%, transparent 55%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 55%)",
        }}
      />
      {/* hairline gold top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />

      <div className="relative mx-auto max-w-[1180px] px-6 py-7 sm:py-8">
        <div className="glass-dark flex flex-col items-center gap-5 rounded-[22px] px-6 py-5 text-center sm:flex-row sm:gap-7 sm:px-7 sm:text-left">
          {/* ── Figure: the face area of the VR traveller, in a glowing ring ── */}
          <div className="relative shrink-0" aria-hidden>
            <span
              className="absolute inset-0 -m-2.5 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(212,168,83,0.34) 0%, transparent 70%)", filter: "blur(14px)" }}
            />
            <span
              className="relative block h-[70px] w-[70px] overflow-hidden rounded-full sm:h-[86px] sm:w-[86px]"
              style={{
                border: "1px solid rgba(212,168,83,0.5)",
                boxShadow: "inset 0 1px 0 rgba(255,235,190,0.25), 0 10px 26px rgba(0,0,0,0.42)",
              }}
            >
              <Image
                src="/images/hero/vr-face.png"
                alt="A traveller previewing a destination in virtual reality"
                fill
                sizes="86px"
                className="object-cover"
                priority
              />
            </span>
          </div>

          {/* ── Copy ──────────────────────────────────────────────────────── */}
          <div className="flex-1">
            <span className="eyebrow justify-center text-accent sm:justify-start" style={{ color: "var(--accent)" }}>
              <span className="dot" style={{ background: "var(--accent)" }} />
              Coming soon
            </span>

            <p
              className="mt-2 font-heading text-[23px] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[27px]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Preview before you travel.
            </p>
            <p className="mx-auto mt-2 max-w-xl text-[13.5px] leading-[1.6] text-white/70 sm:mx-0">
              Walk through hotels and experience destinations in VR — choose with confidence.
            </p>
          </div>

          {/* ── CTA (ghost / gold) + small VR glyph ───────────────────────── */}
          <div className="shrink-0">
            <Link
              href="/consultation"
              className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[13px] font-body font-semibold text-accent transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(212,168,83,0.08)",
                border: "1px solid rgba(212,168,83,0.5)",
                boxShadow: "inset 0 1px 0 rgba(255,235,190,0.18)",
              }}
            >
              <Glasses className="h-4 w-4" strokeWidth={1.8} />
              Explore in VR
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </Link>
            <p className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 text-[10.5px] font-body uppercase tracking-[0.14em] text-white/45 sm:justify-end">
              <Sparkles className="h-3 w-3 text-accent/70" strokeWidth={1.8} />
              In development
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
