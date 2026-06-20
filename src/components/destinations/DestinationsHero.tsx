"use client"

import { useEffect, useState, useRef, type CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MapPin, Search } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { DestinationCardData } from "./DestinationCard"
import type { Scope } from "./DestinationGrid"

/* Globe reused from the homepage - client-only, no SSR (WebGL). */
const Globe3D = dynamic(() => import("@/components/home/Globe3D"), { ssr: false })

const EASE = "cubic-bezier(0.22,1,0.36,1)"
const fmt = (n: number): string => formatCurrency(n)

const JUMP_REGIONS: string[] = ["Domestic", "International"]

/* ─── Reveal (mirrors home-kit Reveal) ────────────────────────────────────── */
interface RevealProps {
  children: React.ReactNode
  y?: number
  delay?: number
  style?: CSSProperties
}
function Reveal({ children, y = 22, delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.12 })
  return (
    <div
      ref={ref}
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

/* ─── Spotlight - auto-rotating featured carousel + thumbnail filmstrip ────── */
function Spotlight({ featured }: { featured: DestinationCardData[] }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || featured.length <= 1) return
    const t = setInterval(() => setI((v) => (v + 1) % featured.length), 4200)
    return () => clearInterval(t)
  }, [paused, featured.length])

  if (featured.length === 0) return null
  const d = featured[i]
  const href = d.directPackageSlug ? `/packages/${d.directPackageSlug}` : `/destinations/${d.slug}`

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        borderRadius: 26,
        overflow: "hidden",
        height: 460,
        boxShadow: "0 32px 80px rgba(11,20,38,0.28)",
        border: "1px solid rgba(255,255,255,0.5)",
      }}
    >
      {featured.map((f, idx) =>
        f.heroImage ? (
          <Image
            key={f._id}
            src={f.heroImage}
            alt={f.name}
            fill
            sizes="(max-width: 980px) 100vw, 600px"
            priority={idx === 0}
            style={{
              objectFit: "cover",
              opacity: idx === i ? 1 : 0,
              transform: idx === i ? "scale(1.04)" : "scale(1)",
              transition: "opacity 1s var(--ease), transform 5s linear",
            }}
          />
        ) : null
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(11,20,38,0.12) 0%, transparent 28%, transparent 44%, rgba(11,20,38,0.82) 100%)",
        }}
      />

      {/* live "Featured now" tag */}
      <div
        className="glass-dark"
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          display: "flex",
          alignItems: "center",
          gap: 7,
          borderRadius: 9999,
          padding: "6px 12px",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#4ADE80",
            boxShadow: "0 0 0 3px rgba(74,222,128,0.25)",
          }}
        />
        <span
          className="glass-text font-tech"
          style={{
            fontSize: 8.5,
            letterSpacing: "0.18em",
            color: "#fff",
            textTransform: "uppercase",
          }}
        >
          Featured now
        </span>
      </div>

      {/* coordinate chip */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: "rgba(11,20,38,0.4)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: 9999,
          padding: "5px 11px",
        }}
      >
        <span
          className="font-tech"
          style={{ fontSize: 8.5, letterSpacing: "0.14em", color: "rgba(255,255,255,0.85)" }}
        >
          {d.coord}
        </span>
      </div>

      {/* caption */}
      <div key={`cap-${i}`} className="fade-in-soft" style={{ position: "absolute", left: 26, right: 26, bottom: 92 }}>
        {d.tag && (
          <p className="font-script" style={{ margin: "0 0 4px", fontSize: 19, color: "var(--secondary-glow)" }}>
            {d.tag}
          </p>
        )}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 14 }}>
          <h3
            className="font-heading"
            style={{
              margin: 0,
              fontSize: 38,
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "-0.025em",
              lineHeight: 1,
              fontVariationSettings: "'opsz' 144",
            }}
          >
            {d.name}
          </h3>
          <Link
            href={href}
            className="btn btn-primary"
            style={{ padding: "11px 18px", fontSize: 12.5, flexShrink: 0 }}
          >
            Explore
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 8,
            color: "rgba(208,213,220,0.85)",
            fontSize: 12.5,
            flexWrap: "wrap",
          }}
        >
          <span>{d.country ?? d.region}</span>
          {typeof d.experienceCount === "number" && d.experienceCount > 0 && (
            <>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(208,213,220,0.6)" }} />
              <span>{d.experienceCount} experiences</span>
            </>
          )}
          {d.startingPrice ? (
            <>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(208,213,220,0.6)" }} />
              <span style={{ color: "#fff" }}>from {fmt(d.startingPrice)}</span>
            </>
          ) : null}
        </div>
      </div>

      {/* thumbnail filmstrip */}
      <div
        style={{
          position: "absolute",
          left: 26,
          right: 26,
          bottom: 22,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        {featured.map((f, idx) => (
          <button
            key={f._id}
            onClick={() => setI(idx)}
            aria-label={`Show ${f.name}`}
            style={{
              cursor: "pointer",
              flex: idx === i ? "0 0 54px" : "0 0 40px",
              height: 40,
              borderRadius: 10,
              overflow: "hidden",
              padding: 0,
              border: idx === i ? "2px solid #fff" : "2px solid rgba(255,255,255,0.35)",
              transition: "flex .4s var(--ease), border-color .3s",
              position: "relative",
            }}
          >
            {f.heroImage ? (
              <Image src={f.heroImage} alt="" fill sizes="54px" style={{ objectFit: "cover" }} />
            ) : null}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <span
          className="font-tech"
          style={{ fontSize: 9, letterSpacing: "0.14em", color: "rgba(255,255,255,0.7)" }}
        >
          {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}

/* ─── Hero - globe-backed cream editorial split + Spotlight + search ───────── */
interface DestinationsHeroProps {
  featured: DestinationCardData[]
  totalCount: number
  query: string
  onQueryChange: (q: string) => void
  onJump: (scope: Scope, group: string) => void
}

export function DestinationsHero({
  featured,
  totalCount,
  query,
  onQueryChange,
  onJump,
}: DestinationsHeroProps) {
  const scrollToGrid = () => {
    document.getElementById("dest-grid")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="bg-brand-mesh grain" style={{ position: "relative", overflow: "hidden", padding: "136px 32px 56px" }}>
      {/* Globe - subtle background layer behind the editorial split (lg+ only). */}
      <div
        aria-hidden
        className="pointer-events-none hidden lg:block"
        style={{
          position: "absolute",
          top: "-12%",
          left: "-22%",
          width: "70%",
          height: "130%",
          opacity: 0.5,
          zIndex: 1,
          maskImage: "radial-gradient(closest-side, black 55%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(closest-side, black 55%, transparent 100%)",
        }}
      >
        <Globe3D />
      </div>

      <div className="dest-hero-grid" style={{ position: "relative", zIndex: 3, maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 56, alignItems: "center" }}>
        <style>{`
          @media (max-width: 980px) {
            .dest-hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          }
        `}</style>

        {/* LEFT - editorial copy + search + region jumps + stats */}
        <div>
          <Reveal>
            <p className="eyebrow">
              <span>{totalCount}+ destinations</span>
              <span className="dot" />
              <span>India &amp; beyond</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className="font-heading"
              style={{
                margin: "18px 0 0",
                fontSize: "clamp(2.6rem, 5vw, 4.3rem)",
                fontWeight: 500,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "var(--primary)",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              Where will you{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>wander</em> next?
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p style={{ margin: "20px 0 0", maxWidth: 440, fontSize: 16, lineHeight: 1.7, color: "var(--muted-foreground)" }}>
              Extraordinary places, handpicked by our experts and planned by a real human - start to finish. Search a
              place, or jump to a region:
            </p>
          </Reveal>

          {/* Search input (wired to the bento grid) */}
          <Reveal delay={0.18}>
            <div
              className="glass-field"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                borderRadius: 9999,
                padding: "12px 18px",
                marginTop: 20,
                maxWidth: 440,
              }}
            >
              <Search size={17} stroke="var(--silver-dark)" strokeWidth={1.5} />
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") scrollToGrid()
                }}
                placeholder="Search Kashmir, Bali, Kerala…"
                aria-label="Search destinations"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontFamily: "var(--font-body)",
                  fontSize: 14.5,
                  color: "var(--foreground)",
                  minWidth: 0,
                }}
              />
              {query && (
                <button
                  onClick={() => onQueryChange("")}
                  aria-label="Clear search"
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    color: "var(--silver-dark)",
                    fontSize: 18,
                    lineHeight: 1,
                    padding: 0,
                  }}
                >
                  ×
                </button>
              )}
            </div>
          </Reveal>

          {/* Region jump pills */}
          <Reveal delay={0.22}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
              {JUMP_REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onJump(r === "International" ? "international" : "domestic", "")
                    scrollToGrid()
                  }}
                  className="glass-pill"
                  style={{
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    borderRadius: 9999,
                    padding: "9px 15px",
                    fontFamily: "var(--font-body)",
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--primary)",
                  }}
                >
                  <MapPin size={12} stroke="var(--secondary)" strokeWidth={1.5} />
                  {r}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.26}>
            <div style={{ display: "flex", gap: 28, marginTop: 34 }}>
              {(
                [
                  [`${totalCount}+`, "Destinations"],
                  ["4.9★", "Avg rating"],
                  ["100%", "Human-planned"],
                ] as const
              ).map(([n, l]) => (
                <div key={l}>
                  <div
                    className="font-heading"
                    style={{
                      fontSize: 25,
                      fontWeight: 500,
                      color: "var(--primary)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      fontVariationSettings: "'opsz' 144",
                    }}
                  >
                    {n}
                  </div>
                  <div style={{ fontSize: 10.5, color: "var(--silver-dark)", marginTop: 5 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT - auto-rotating featured spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        >
          <Spotlight featured={featured} />
        </motion.div>
      </div>
    </section>
  )
}
