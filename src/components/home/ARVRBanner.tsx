"use client"

/**
 * ARVRBanner - a slim premium "coming soon" ribbon for the AR/VR preview feature.
 *
 * The opaque-navy ribbon straddles the white -> navy section break EXACTLY 50/50:
 * the bar's own `-translate-y-1/2` lifts it by half its height (whatever that is)
 * and a small `-mt` lands that pivot on the wave's midline. The bar lives inside a
 * zero-height anchor so it reserves NO flow space - the navy band + the gap down
 * to the Problem heading are controlled purely by the spacer, matching the rhythm
 * of the other sections.
 *
 * The VR traveller's HEAD (above-neck crop) rises up out of the bar's TOP border
 * for a subtle 3D pop-out; a gentle idle bob + a hover lift/glow keep it feeling
 * alive and interactive.
 */

import Image from "next/image"
import Link from "next/link"
import { Glasses, ArrowRight, Sparkles } from "lucide-react"

export default function ARVRBanner() {
  return (
    <section
      aria-label="Coming soon: AR/VR destination preview"
      className="relative overflow-visible"
      // The preceding <Wave> is z-index:2 and `.wave-divider + *` pins this section
      // to z-index:0 - which trapped the lifted bar behind the wave. Lift it above.
      style={{ background: "#0A1425", position: "relative", zIndex: 40 }}
    >
      {/* soft navy glow for depth */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[10%] top-[14%] h-[220px] w-[220px] rounded-full bg-primary-light/30 blur-[80px]" />
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

      {/* Width-optimised ribbon. The bar sits in a zero-height anchor + absolute,
          so the straddle is preserved but the bar reserves no flow height - the
          navy band below is the spacer alone (a clean, normal gap to Problem). */}
      <div className="relative z-30 mx-auto max-w-[1040px] px-4 sm:px-6">
        <div className="relative h-0">
          <div
            className="group absolute inset-x-0 flex flex-row items-center gap-3.5 overflow-visible rounded-[18px] py-3.5 pl-[58px] pr-3.5 text-left backdrop-blur-md -mt-[18px] -translate-y-1/2 sm:gap-6 sm:rounded-[22px] sm:py-[17px] sm:pl-[112px] sm:pr-6 sm:-mt-[25px] lg:-mt-[30px]"
            style={{
              background: "rgba(13,21,42,0.97)",
              border: "1px solid rgba(120,150,210,0.22)",
              boxShadow: "0 16px 40px rgba(3,8,16,0.42), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            {/* ── VR traveller's HEAD - emerges up out of the bar's TOP border ── */}
            <div className="absolute bottom-full left-3.5 z-20 -mb-2 sm:left-6" aria-hidden>
              {/* gold halo behind the head (brightens on hover) */}
              <span className="absolute -inset-2 rounded-full bg-[radial-gradient(closest-side,rgba(212,168,83,0.38),transparent_72%)] opacity-70 blur-[6px] transition-opacity duration-300 group-hover:opacity-100" />
              {/* above-neck crop, sits on the top border, gentle idle bob + hover lift */}
              <span
                className="relative block h-[50px] w-[46px] overflow-hidden transition-transform duration-300 group-hover:-translate-y-[3px] sm:h-[90px] sm:w-[82px]"
                style={{
                  borderRadius: "50% 50% 40% 40% / 60% 60% 26% 26%",
                  border: "1px solid rgba(212,168,83,0.55)",
                  boxShadow: "inset 0 1px 0 rgba(255,235,190,0.3), 0 14px 26px rgba(0,0,0,0.5)",
                  animation: "vrBob 5s ease-in-out infinite",
                }}
              >
                <Image
                  src="/images/hero/vr-face.png"
                  alt="A traveller previewing a destination in virtual reality"
                  fill
                  sizes="90px"
                  className="object-cover"
                  style={{ objectPosition: "50% 14%" }}
                  loading="lazy"
                />
              </span>
              {/* soft contact shadow where the head meets the bar's top edge */}
              <span className="absolute -bottom-1 left-1/2 h-2 w-[78%] -translate-x-1/2 rounded-[50%] bg-black/45 blur-md" />
            </div>

            {/* ── Copy ── */}
            <div className="min-w-0 flex-1">
              <span className="eyebrow justify-start text-accent" style={{ color: "var(--accent)" }}>
                <span className="dot" style={{ background: "var(--accent)" }} />
                Coming soon
              </span>
              <p
                className="mt-1 font-heading text-[16px] font-medium leading-[1.15] tracking-[-0.02em] text-white sm:mt-1.5 sm:text-[25px]"
                style={{ fontVariationSettings: "'opsz' 144" }}
              >
                Preview before you travel.
              </p>
              <p className="mt-1.5 hidden max-w-xl text-[13px] leading-[1.6] text-white/70 sm:block">
                Walk through hotels and experience destinations in VR - choose with confidence.
              </p>
            </div>

            {/* ── CTA (ghost / gold) ── */}
            <div className="shrink-0">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[12.5px] font-body font-semibold text-accent transition-all duration-300 group-hover:bg-[rgba(212,168,83,0.16)] sm:px-6 sm:py-3 sm:text-[13px]"
                style={{
                  background: "rgba(212,168,83,0.08)",
                  border: "1px solid rgba(212,168,83,0.5)",
                  boxShadow: "inset 0 1px 0 rgba(255,235,190,0.18)",
                }}
              >
                <Glasses className="h-4 w-4" strokeWidth={1.8} />
                <span className="hidden sm:inline">Explore in VR</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
              </Link>
              <p className="mt-2.5 hidden w-full items-center justify-center gap-1.5 text-[10.5px] font-body uppercase tracking-[0.14em] text-white/45 sm:inline-flex sm:justify-end">
                <Sparkles className="h-3 w-3 text-accent/70" strokeWidth={1.8} />
                In development
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navy band below the straddling bar - this single spacer sets the gap down
          to the Problem heading (no compounding padding/translate reserve). */}
      <div className="h-[54px] sm:h-[76px]" aria-hidden />

      <style>{`@keyframes vrBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
    </section>
  )
}
