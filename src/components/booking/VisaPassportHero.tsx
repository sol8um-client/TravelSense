"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { FileText } from "lucide-react"

/* ═══════════════════════════════════════════════════════════════════════════
   TravelSense — Visa & Passport hero (ported from design_handoff/vp-page.jsx)
   Signature device: a tilted gold-foil PASSPORT COVER graphic with a spinning
   gold compass emblem, floating over a navy radial field dusted with faint
   embassy stamps and a gold grid. All-navy + gold-foil theme.
   ═══════════════════════════════════════════════════════════════════════════ */

const EASE = "cubic-bezier(0.22,1,0.36,1)"
const GOLD = "#C9A24B"

/* ── Reveal — fade/slide in on scroll via IntersectionObserver (home-kit) ──── */
interface RevealProps {
  children: ReactNode
  y?: number
  delay?: number
  style?: CSSProperties
  className?: string
}

function Reveal({ children, y = 22, delay = 0, style, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : `translateY(${y}px)`,
        transition: `opacity .8s ${EASE} ${delay}s, transform .8s ${EASE} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

/* ── Gold compass emblem — raw SVG (geometry reproduced from shared.jsx Compass,
   recoloured to gold-foil to sit on the navy passport cover). ──────────────── */
function GoldCompass({ size = 92 }: { size?: number }) {
  return (
    <div aria-hidden style={{ position: "relative", width: size, height: size }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, #F5E6C8 0%, #D9BC7E 45%, #B8862F 100%)",
          boxShadow:
            "0 1px 0 rgba(255,245,220,0.7) inset, 0 -1px 0 rgba(11,20,38,0.35) inset, 0 8px 22px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
        }}
      />
      {/* tick ring + cardinals (static) */}
      <svg
        viewBox="0 0 100 100"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = i * 10
          const long = i % 9 === 0
          return (
            <line
              key={i}
              x1="50"
              y1={long ? 6 : 8}
              x2="50"
              y2={long ? 14 : 12}
              stroke="#5A3E12"
              strokeWidth={long ? 0.9 : 0.45}
              opacity={long ? 0.85 : 0.45}
              transform={`rotate(${angle} 50 50)`}
            />
          )
        })}
        <text x="50" y="20" textAnchor="middle" fontSize="6" fontFamily="var(--font-heading), Fraunces, serif" fontWeight="500" fill="#3A2A08">N</text>
        <text x="50" y="86" textAnchor="middle" fontSize="6" fontFamily="var(--font-heading), Fraunces, serif" fontWeight="500" fill="#3A2A08">S</text>
        <text x="84" y="53" textAnchor="middle" fontSize="6" fontFamily="var(--font-heading), Fraunces, serif" fontWeight="500" fill="#3A2A08">E</text>
        <text x="16" y="53" textAnchor="middle" fontSize="6" fontFamily="var(--font-heading), Fraunces, serif" fontWeight="500" fill="#3A2A08">W</text>
      </svg>
      {/* spinning needle */}
      <svg
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          animation: `spinReverse 16s ${EASE} infinite`,
        }}
      >
        <polygon points="50,22 46,50 54,50" fill="#C4324A" />
        <polygon points="50,78 46,50 54,50" fill="#7A5A1E" />
        <circle cx="50" cy="50" r="3.6" fill="#3A2A08" />
        <circle cx="50" cy="50" r="1.5" fill="#F5E6C8" />
      </svg>
    </div>
  )
}

export default function VisaPassportHero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 70% 20%, #14223E, #0A1425 60%)",
        padding: "150px 32px 90px",
      }}
    >
      {/* gold grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            "linear-gradient(rgba(201,162,75,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,75,0.6) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      {/* faint stamps */}
      {(
        [
          [90, 200, -18, 90],
          [80, 70, 12, 70],
        ] as const
      ).map(([r, t, rot, sz], i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            right: r,
            top: t,
            width: sz,
            height: sz,
            transform: `rotate(${rot}deg)`,
            opacity: 0.06,
          }}
        >
          <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
            <circle cx="60" cy="60" r="52" fill="none" stroke={GOLD} strokeWidth="3" />
            <circle
              cx="60"
              cy="60"
              r="42"
              fill="none"
              stroke={GOLD}
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
          </svg>
        </div>
      ))}

      <div className="visa-hero-grid">
        {/* ── copy column ── */}
        <div>
          <Reveal>
            <p
              style={{
                margin: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              <span style={{ width: 22, height: 1, background: GOLD, opacity: 0.6 }} />
              Visa &amp; Passport
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              style={{
                margin: "18px 0 0",
                fontFamily: "var(--font-heading), Georgia, serif",
                fontSize: "clamp(2.6rem, 5.4vw, 4.4rem)",
                fontWeight: 500,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "#fff",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              Paperwork sorted.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}>
                You just travel.
              </em>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              style={{
                margin: "20px 0 0",
                maxWidth: 440,
                fontSize: 16,
                lineHeight: 1.75,
                color: "rgba(208,213,220,0.6)",
              }}
            >
              From document checklists to embassy appointments, our visa team handles
              the file end-to-end — we even fill the forms for you.
            </p>
          </Reveal>
          <Reveal delay={0.2} style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
            <a href="#checklist" className="btn btn-primary">
              <FileText size={15} />
              See checklists
            </a>
            <a
              href="#inquiry"
              className="btn"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              Submit an inquiry
            </a>
          </Reveal>
        </div>

        {/* ── passport cover graphic ── */}
        <Reveal delay={0.18} y={30}>
          <div
            className="visa-passport-cover"
            style={{
              position: "relative",
              width: 250,
              margin: "0 auto",
              aspectRatio: "3/4",
              borderRadius: 14,
              background: "linear-gradient(150deg, #15294A, #0A1425)",
              border: "1px solid rgba(201,162,75,0.3)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
              transform: "rotate(5deg)",
              animation: `float-y 7s ${EASE} infinite`,
              padding: 22,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* inner gold keyline */}
            <div
              aria-hidden
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid rgba(201,162,75,0.25)",
                borderRadius: 8,
                position: "absolute",
                inset: 10,
              }}
            />
            <p
              style={{
                margin: "8px 0 0",
                fontFamily: "var(--font-mono-tech)",
                fontSize: 8.5,
                letterSpacing: "0.3em",
                color: GOLD,
                position: "relative",
              }}
            >
              REPUBLIC OF TRAVELLERS
            </p>
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
              <GoldCompass size={92} />
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-heading), serif",
                    fontSize: 22,
                    fontWeight: 500,
                    color: GOLD,
                    letterSpacing: "0.04em",
                    fontVariationSettings: "'opsz' 144",
                  }}
                >
                  Passport
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontFamily: "var(--font-mono-tech)",
                    fontSize: 8,
                    letterSpacing: "0.34em",
                    color: "rgba(201,162,75,0.7)",
                  }}
                >
                  TRAVELSENSE
                </p>
              </div>
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-mono-tech)",
                fontSize: 7,
                letterSpacing: "0.24em",
                color: "rgba(201,162,75,0.5)",
                position: "relative",
              }}
            >
              P&lt;IND&lt;TRAVELSENSE&lt;&lt;&lt;
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
        .visa-hero-grid {
          position: relative;
          z-index: 2;
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (max-width: 880px) {
          .visa-hero-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .visa-passport-cover { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
