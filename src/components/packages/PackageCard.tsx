"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Mountain } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export interface PackageCardData {
  _id: string
  title: string
  slug: string
  description: string
  category?: string
  duration?: { days: number; nights: number }
  price?: number
  discountedPrice?: number
  heroImage?: string
  difficulty?: string
  featured?: boolean
  highlights?: string[]
  rating?: number
  reviewCount?: number
  destination?: {
    name: string
    slug: string
    region?: string
  }
}

interface PackageCardProps {
  pkg: PackageCardData
  /**
   * Render the wide/hero variant (taller image, larger title). When omitted the
   * card falls back to the package's own `featured` flag. The Packages grid
   * passes this explicitly so the 2-column span stays a deliberate accent.
   */
  big?: boolean
  /** Grid index — reserved for deterministic stagger; not currently read. */
  index?: number
}

const EASE = "cubic-bezier(0.22,1,0.36,1)"

/** Difficulty → number of filled dots in the 3-dot meter. */
const DIFF: Record<string, number> = {
  Easy: 1,
  Moderate: 2,
  Challenging: 3,
  Extreme: 3,
}

/** Per-category accent (prototype CAT_COLOR — only leisure/adventure live now). */
const CAT_COLOR: Record<string, string> = {
  leisure: "#C4324A",
  adventure: "#1F8A7A",
  educational: "#B8862F",
}

/** Total segments in the duration bar (prototype renders 12 ticks). */
const DURATION_SEGMENTS = 12

export function PackageCard({ pkg, big }: PackageCardProps) {
  const {
    title,
    slug,
    category,
    duration,
    price,
    discountedPrice,
    heroImage,
    difficulty,
    featured,
    rating,
    reviewCount,
    destination,
  } = pkg

  const isBig = big ?? Boolean(featured)
  const catKey = (category ?? "leisure").toLowerCase()
  const accent = CAT_COLOR[catKey] ?? "#C4324A"

  const hasDiscount =
    typeof discountedPrice === "number" &&
    typeof price === "number" &&
    discountedPrice < price
  const pct = hasDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0

  const days = duration?.days ?? 0
  const diffDots = difficulty ? DIFF[difficulty] ?? 1 : 1

  return (
    <Link
      href={`/packages/${slug}`}
      className="pcard group flex h-full flex-col overflow-hidden bg-white no-underline"
      style={{
        borderRadius: 20,
        boxShadow: "0 3px 18px rgba(11,20,38,0.07)",
        border: "1px solid rgba(176,184,196,0.18)",
        transition: `box-shadow .5s ${EASE}, transform .5s ${EASE}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 22px 58px rgba(11,20,38,0.16)"
        e.currentTarget.style.transform = "translateY(-4px)"
        const im = e.currentTarget.querySelector("img")
        if (im) (im as HTMLImageElement).style.transform = "scale(1.07)"
        const ar = e.currentTarget.querySelector<HTMLElement>(".pc-arrow")
        if (ar) {
          ar.style.background = "var(--secondary)"
          ar.style.transform = "translateX(3px)"
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 3px 18px rgba(11,20,38,0.07)"
        e.currentTarget.style.transform = "translateY(0)"
        const im = e.currentTarget.querySelector("img")
        if (im) (im as HTMLImageElement).style.transform = "scale(1)"
        const ar = e.currentTarget.querySelector<HTMLElement>(".pc-arrow")
        if (ar) {
          ar.style.background = "rgba(196,50,74,0.08)"
          ar.style.transform = "translateX(0)"
        }
      }}
    >
      {/* image */}
      <div
        className="relative overflow-hidden"
        style={{ height: isBig ? 240 : 190 }}
      >
        {heroImage ? (
          <Image
            src={heroImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            style={{ transition: `transform 1.1s ${EASE}` }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0D1A30] to-[#0A1425]">
            <Mountain className="h-12 w-12 text-white/20" />
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,20,38,0.25), transparent 45%)",
          }}
        />
        {/* category tag */}
        <span
          className="font-tech absolute"
          style={{
            top: 14,
            left: 14,
            fontSize: 8.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#fff",
            background: `${accent}e6`,
            padding: "5px 10px",
            borderRadius: 9999,
          }}
        >
          {catKey}
        </span>
        {/* % OFF */}
        {pct > 0 && (
          <span
            className="font-tech absolute"
            style={{
              top: 14,
              right: 14,
              fontSize: 9,
              letterSpacing: "0.08em",
              color: "#fff",
              background: "rgba(11,20,38,0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "5px 10px",
              borderRadius: 9999,
            }}
          >
            {pct}% OFF
          </span>
        )}
        {/* rating chip */}
        {typeof rating === "number" && (
          <div
            className="absolute flex items-center"
            style={{
              bottom: 12,
              left: 14,
              gap: 5,
              background: "rgba(11,20,38,0.4)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: 9999,
              padding: "4px 10px",
            }}
          >
            <Star
              className="h-3 w-3"
              style={{ color: "var(--secondary-glow)" }}
              fill="var(--secondary-glow)"
              strokeWidth={1.5}
            />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>
              {rating}
            </span>
            {typeof reviewCount === "number" && (
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>
                ({reviewCount})
              </span>
            )}
          </div>
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col" style={{ padding: 20 }}>
        <h3
          className="font-heading m-0"
          style={{
            fontSize: isBig ? 23 : 19,
            fontWeight: 500,
            color: "var(--primary)",
            letterSpacing: "-0.015em",
            lineHeight: 1.12,
            fontVariationSettings: "'opsz' 144",
          }}
        >
          {title}
        </h3>

        {destination && (
          <div
            className="flex items-center"
            style={{ gap: 6, marginTop: 7, color: "var(--silver-dark)" }}
          >
            {/* Ic.mapPin + Ic.mapPinDot — raw paths verbatim */}
            <svg
              width={13}
              height={13}
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--secondary)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <span style={{ fontSize: 12.5, color: "var(--muted-foreground)" }}>
              {destination.name}
            </span>
            {destination.region && (
              <>
                <span
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: "var(--silver)",
                  }}
                />
                <span style={{ fontSize: 12, color: "var(--silver-dark)" }}>
                  {destination.region}
                </span>
              </>
            )}
          </div>
        )}

        {/* trip spec row */}
        <div
          className="flex items-center"
          style={{
            gap: 22,
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid rgba(176,184,196,0.22)",
          }}
        >
          {/* duration segment-bar */}
          <div>
            <div
              className="font-tech"
              style={{
                fontSize: 7.5,
                letterSpacing: "0.14em",
                color: "var(--silver-dark)",
                textTransform: "uppercase",
              }}
            >
              Duration
            </div>
            <div
              className="flex items-center"
              style={{ gap: 7, marginTop: 5 }}
            >
              <span
                className="font-heading"
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--primary)",
                }}
              >
                {days}D
              </span>
              <span className="flex" style={{ gap: 2 }}>
                {Array.from({ length: DURATION_SEGMENTS }).map((_, b) => (
                  <span
                    key={b}
                    style={{
                      width: 3,
                      height: 10,
                      borderRadius: 1,
                      background:
                        b < days
                          ? "var(--secondary)"
                          : "rgba(176,184,196,0.3)",
                    }}
                  />
                ))}
              </span>
            </div>
          </div>

          {/* difficulty 3-dot meter */}
          {difficulty && (
            <div>
              <div
                className="font-tech"
                style={{
                  fontSize: 7.5,
                  letterSpacing: "0.14em",
                  color: "var(--silver-dark)",
                  textTransform: "uppercase",
                }}
              >
                Difficulty
              </div>
              <div
                className="flex items-center"
                style={{ gap: 6, marginTop: 5 }}
              >
                <span style={{ fontSize: 12.5, color: "var(--foreground)" }}>
                  {difficulty}
                </span>
                <span className="flex" style={{ gap: 3 }}>
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background:
                          n <= diffDots ? accent : "rgba(176,184,196,0.35)",
                      }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* price + arrow */}
        <div
          className="flex items-end justify-between"
          style={{ marginTop: 18, flex: 1 }}
        >
          <div style={{ alignSelf: "flex-end" }}>
            <div className="flex items-baseline" style={{ gap: 7 }}>
              {price !== undefined ? (
                <>
                  <span
                    className="font-heading"
                    style={{
                      fontSize: 22,
                      fontWeight: 500,
                      color: "var(--secondary)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {formatCurrency(hasDiscount ? discountedPrice : price)}
                  </span>
                  {hasDiscount && (
                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--silver-dark)",
                        textDecoration: "line-through",
                      }}
                    >
                      {formatCurrency(price)}
                    </span>
                  )}
                </>
              ) : (
                <span style={{ fontSize: 14, color: "var(--silver-dark)" }}>
                  Price on request
                </span>
              )}
            </div>
            <div style={{ fontSize: 11, color: "var(--silver-dark)" }}>
              per person
            </div>
          </div>
          <span
            className="pc-arrow inline-flex items-center justify-center"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "rgba(196,50,74,0.08)",
              transition: "background .3s, transform .3s",
            }}
          >
            <ArrowRight
              className="h-[17px] w-[17px]"
              style={{ color: "var(--secondary)" }}
              strokeWidth={1.5}
            />
          </span>
        </div>
      </div>
    </Link>
  )
}
