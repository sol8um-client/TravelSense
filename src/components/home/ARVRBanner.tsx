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
import { Glasses, ArrowRight, Cog } from "lucide-react"

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
            className="group absolute inset-x-0 flex flex-row items-center gap-3.5 overflow-visible rounded-[18px] py-3.5 pl-[72px] pr-3.5 text-left backdrop-blur-md -mt-[18px] -translate-y-1/2 sm:gap-6 sm:rounded-[22px] sm:py-[17px] sm:pl-[128px] sm:pr-6 sm:-mt-[25px] lg:-mt-[30px]"
            style={{
              background: "rgba(13,21,42,0.97)",
              border: "1px solid rgba(120,150,210,0.22)",
              boxShadow: "0 16px 40px rgba(3,8,16,0.42), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            {/* ── VR traveller - the portrait STRADDLES the bar's top edge (~50%
                 submerged, ~50% emerging). NO ring/circle: a soft feathered mask
                 melts the image edges into the navy so the person reads as part of
                 the bar rather than a framed circle sitting on top of it. ── */}
            <div className="absolute left-3.5 top-0 z-20 -translate-y-1/2 sm:left-6" aria-hidden>
              <div className="relative" style={{ animation: "vrBob 5s ease-in-out infinite" }}>
                <span
                  className="relative block h-[58px] w-[58px] overflow-hidden transition-transform duration-300 group-hover:scale-[1.04] sm:h-[104px] sm:w-[104px]"
                  style={{
                    // Asymmetric feather: keep the face (upper-centre) crisp but
                    // fade the LOWER-LEFT hard (his hand/fingers + blue shirt) so it
                    // dissolves into the navy bar instead of reading as a cut-out.
                    maskImage: "radial-gradient(ellipse 74% 66% at 60% 38%, #000 36%, rgba(0,0,0,0) 96%)",
                    WebkitMaskImage: "radial-gradient(ellipse 74% 66% at 60% 38%, #000 36%, rgba(0,0,0,0) 96%)",
                    filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
                  }}
                >
                  <Image
                    src="/images/hero/vr-face.png"
                    alt="A traveller previewing a destination in virtual reality"
                    fill
                    sizes="104px"
                    className="object-cover"
                    style={{ objectPosition: "50% 30%" }}
                    loading="lazy"
                  />
                </span>
              </div>
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

            {/* ── "In development" + CTA on ONE line (not stacked) ── */}
            <div className="flex shrink-0 items-center gap-3 sm:gap-4">
              <p className="hidden items-center gap-1.5 whitespace-nowrap text-[10.5px] font-body uppercase tracking-[0.14em] text-white/45 sm:inline-flex">
                <Cog className="h-3 w-3 animate-spin text-accent/70" strokeWidth={1.8} style={{ animationDuration: "4s" }} />
                In development
              </p>
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
