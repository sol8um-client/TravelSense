"use client"

import { useState, type CSSProperties, type ComponentType } from "react"
import {
  FileCheck2,
  BookOpen,
  FileText,
  Mic2,
  ChevronRight,
  Check,
} from "lucide-react"

const GOLD = "#C9A24B"

interface LucideProps {
  size?: number
  stroke?: string
  strokeWidth?: number
  style?: CSSProperties
}

interface ServiceItem {
  Icon: ComponentType<LucideProps>
  title: string
  desc: string
  tag: string
  gets: string[]
}

/* Real services copy (matches the prototype's SERVICES + SVC_EXTRA). */
const SERVICES: ServiceItem[] = [
  {
    Icon: FileCheck2,
    title: "Visa application",
    desc: "End-to-end support for tourist, business and transit visas — paperwork, appointments and follow-ups, handled.",
    tag: "Tourist · business · transit",
    gets: ["Form filling", "Appointments", "Follow-ups"],
  },
  {
    Icon: BookOpen,
    title: "Passport services",
    desc: "New applications, renewals, name corrections and tatkal processing, with guidance at every step.",
    tag: "New · renewal · tatkal",
    gets: ["New & renewal", "Name change", "Tatkal"],
  },
  {
    Icon: FileText,
    title: "Document guidance",
    desc: "A complete checklist, formatting guidelines and verification so your application is accepted first time.",
    tag: "Checklist · formatting",
    gets: ["Full checklist", "Formatting", "Pre-check"],
  },
  {
    Icon: Mic2,
    title: "Interview prep",
    desc: "Mock sessions and country-specific guides that boost your confidence and your approval odds.",
    tag: "Mock sessions · guides",
    gets: ["Mock rounds", "Country guides", "Confidence"],
  },
]

export default function VisaServicesPanel() {
  const [sel, setSel] = useState(0)
  const s = SERVICES[sel]
  const ActiveIcon = s.Icon

  return (
    <div className="visa-services-panel">
      {/* selector list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SERVICES.map((sv, i) => {
          const on = i === sel
          const RowIcon = sv.Icon
          return (
            <button
              key={sv.title}
              type="button"
              onClick={() => setSel(i)}
              onMouseEnter={() => setSel(i)}
              style={{
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 14,
                borderRadius: 16,
                padding: "16px 18px",
                transition: "all .3s cubic-bezier(0.22,1,0.36,1)",
                border: `1px solid ${on ? "rgba(201,162,75,0.5)" : "rgba(255,255,255,0.1)"}`,
                background: on ? "rgba(201,162,75,0.1)" : "rgba(255,255,255,0.03)",
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  borderRadius: 11,
                  background: on
                    ? "linear-gradient(135deg, #C9A24B, #B8862F)"
                    : "rgba(201,162,75,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background .3s",
                }}
              >
                <RowIcon size={19} stroke={on ? "#0A1425" : GOLD} strokeWidth={1.6} />
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-heading), Georgia, serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {sv.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono-tech)",
                    fontSize: 8,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(208,213,220,0.5)",
                    marginTop: 3,
                  }}
                >
                  {sv.tag}
                </div>
              </div>
              <ChevronRight
                size={15}
                stroke={on ? GOLD : "rgba(208,213,220,0.3)"}
                style={{ transform: on ? "translateX(2px)" : "none", transition: "all .3s" }}
              />
            </button>
          )
        })}
      </div>

      {/* detail panel */}
      <div
        key={sel}
        className="fade-in-soft glass-dark"
        style={{
          position: "relative",
          borderRadius: 22,
          padding: "clamp(28px, 3vw, 42px)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: -30,
            right: -10,
            fontFamily: "var(--font-heading), Georgia, serif",
            fontSize: 200,
            fontWeight: 500,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(201,162,75,0.14)",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {String(sel + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background:
              "linear-gradient(135deg, rgba(201,162,75,0.22), rgba(201,162,75,0.08))",
            border: "1px solid rgba(201,162,75,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <ActiveIcon size={30} stroke={GOLD} strokeWidth={1.5} />
        </span>
        <h3
          className="glass-text"
          style={{
            margin: "20px 0 0",
            fontFamily: "var(--font-heading), Georgia, serif",
            fontSize: 26,
            fontWeight: 500,
            color: "#fff",
            letterSpacing: "-0.02em",
            position: "relative",
            fontVariationSettings: "'opsz' 144",
          }}
        >
          {s.title}
        </h3>
        <p
          className="glass-text"
          style={{
            margin: "12px 0 0",
            fontSize: 14.5,
            lineHeight: 1.7,
            color: "rgba(208,213,220,0.78)",
            maxWidth: 440,
            position: "relative",
          }}
        >
          {s.desc}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 22,
            position: "relative",
          }}
        >
          {s.gets.map((g) => (
            <span
              key={g}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                borderRadius: 9999,
                border: "1px solid rgba(201,162,75,0.28)",
                background: "rgba(201,162,75,0.08)",
                padding: "7px 13px",
                fontSize: 11.5,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <Check size={11} stroke={GOLD} strokeWidth={2.4} />
              {g}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .visa-services-panel {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 28px;
          align-items: stretch;
        }
        @media (max-width: 860px) {
          .visa-services-panel { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
