"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

/* "Your world awaits" - 4-up destination collage with scale-in reveal + hover
   zoom. Uses the same real images the prototype referenced. (veh-page Reveal). */

const EASE = "cubic-bezier(0.22,1,0.36,1)"

function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
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
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : "translateY(22px) scale(0.96)",
        transition: `opacity .8s ${EASE} ${delay}s, transform .8s ${EASE} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

const ITEMS: { img: string; label: string }[] = [
  { img: "/images/destinations/santorini.jpg", label: "Santorini, Greece" },
  { img: "/images/generated/dubai-hero.webp", label: "Dubai, UAE" },
  { img: "/images/generated/thailand-hero.webp", label: "Bangkok, Thailand" },
  { img: "/images/destinations/swiss-alps.jpg", label: "Zermatt, Switzerland" },
]

export default function VisaWorldCollage() {
  return (
    <div className="visa-collage-grid">
      {ITEMS.map((it, i) => (
        <Reveal key={it.label} delay={i * 0.08}>
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
              height: 280,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={it.img}
              alt={it.label}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: `transform .5s ${EASE}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.06)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(10,20,37,0.85))",
              }}
            />
            <p
              style={{
                position: "absolute",
                bottom: 14,
                left: 14,
                margin: 0,
                fontFamily: "var(--font-heading), serif",
                fontSize: 15,
                fontWeight: 500,
                color: "#fff",
              }}
            >
              {it.label}
            </p>
          </div>
        </Reveal>
      ))}

      <style>{`
        .visa-collage-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 900px) {
          .visa-collage-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .visa-collage-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
