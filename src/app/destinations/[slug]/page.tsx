import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  MapPin,
  CalendarClock,
  Cloud,
  Sparkles,
  ArrowRight,
  Info,
  Compass,
  Phone,
} from "lucide-react"
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { formatCurrency } from "@/lib/utils"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd } from "@/components/shared/JsonLd"
import { destinations, getDestinationBySlug } from "@/data/destinations"
import { packages } from "@/data/packages"
import { PackageCard } from "@/components/packages/PackageCard"

export const dynamic = "force-static"

/* ─── Palette / motion constants (mirror PackageDetail + PackageCard) ──────── */

/** Per-category accent - same mapping the redesigned PackageCard uses. */
const CAT_COLOR: Record<string, string> = {
  leisure: "#C4324A",
  adventure: "#1F8A7A",
  educational: "#B8862F",
}

/* ─── Static params ───────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

/* ─── Dynamic metadata ────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)

  if (!dest) {
    return generatePageMetadata({
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
      path: `/destinations/${slug}`,
    })
  }

  return generatePageMetadata({
    title: `${dest.name} - Travel Guide`,
    description: dest.description,
    path: `/destinations/${slug}`,
    image: dest.heroImage,
  })
}

/* ─── Small server-side helpers ───────────────────────────────────────────── */

/**
 * Split a destination name into words and pick the index of the word to render
 * in italic-cherry (mirrors PackageDetail's hero emphasis). Names with ≤2 words
 * accent the last word; longer names accent roughly the middle word.
 */
function emphasisIndex(words: string[]): number {
  if (words.length <= 1) return 0
  if (words.length === 2) return 1
  return Math.floor(words.length / 2)
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)

  if (!destination) notFound()

  // Packages tagged to this destination, featured first, then by price ascending
  const destinationPackages = packages
    .filter((p) => p.destinationSlug === slug)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      const ap = a.discountedPrice ?? a.price
      const bp = b.discountedPrice ?? b.price
      return ap - bp
    })

  const accent = CAT_COLOR[destination.category] ?? "#C4324A"

  // Hero title - one italic-cherry accent word.
  const titleWords = destination.name.split(" ")
  const emIdx = emphasisIndex(titleWords)

  // Stylised coordinate micro-label (no real geo data in the dataset).
  const coordLabel = `${destination.region.toUpperCase()} · ${destination.category.toUpperCase()}`

  // Quick-facts rail - only real data.
  const facts: { icon: "season" | "weather" | "price"; label: string; value: string }[] = []
  if (destination.bestTimeToVisit)
    facts.push({ icon: "season", label: "Best time to visit", value: destination.bestTimeToVisit })
  if (destination.startingPrice)
    facts.push({ icon: "price", label: "Starting from", value: `${formatCurrency(destination.startingPrice)} / person` })
  if (destination.weather)
    facts.push({ icon: "weather", label: "Weather & climate", value: destination.weather })

  return (
    <div style={{ background: "#FAF8F4" }}>
      {/* ═══════════ JSON-LD (kept intact) ═══════════ */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Destinations", url: "/destinations" },
          { name: destination.name, url: `/destinations/${slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: destination.name,
          description: destination.description,
          image: destination.heroImage,
          address: {
            "@type": "PostalAddress",
            addressRegion: destination.region,
            addressCountry: destination.country,
          },
        }}
      />

      {/* ═══════════ CINEMATIC HERO (~80vh) ═══════════ */}
      <section style={{ position: "relative", height: "80vh", minHeight: 560, overflow: "hidden" }}>
        {destination.heroImage && (
          <Image
            src={destination.heroImage}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", animation: "kenburns 24s ease-in-out infinite alternate" }}
          />
        )}

        {/* tonal gradient for legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,20,37,0.55) 0%, rgba(10,20,37,0.1) 32%, rgba(10,20,37,0.25) 58%, rgba(10,20,37,0.92) 100%)",
          }}
        />
        {/* faint engineering grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* frosted readability scrim that FEATHERS into the sharp image above (no
            hard edge). The mask ramps the backdrop-blur in gradually. No CSS
            `filter` lives on this masked element's ancestors - that would break
            the mask (clip-path + filter gotcha). */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "70%",
            zIndex: 1,
            pointerEvents: "none",
            WebkitBackdropFilter: "blur(12px) saturate(135%)",
            backdropFilter: "blur(12px) saturate(135%)",
            background:
              "linear-gradient(180deg, rgba(10,20,37,0) 0%, rgba(10,20,37,0.06) 30%, rgba(10,20,37,0.20) 55%, rgba(12,24,52,0.42) 78%, rgba(10,20,37,0.62) 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.12) 24%, rgba(0,0,0,0.4) 42%, rgba(0,0,0,0.78) 62%, #000 82%)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.12) 24%, rgba(0,0,0,0.4) 42%, rgba(0,0,0,0.78) 62%, #000 82%)",
          }}
        />

        {/* content - accounts for the floating nav via padding-top */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1280,
            margin: "0 auto",
            height: "100%",
            padding: "calc(var(--nav-h) + 24px) 40px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {/* breadcrumb */}
          <div className="fade-up" style={{ marginBottom: 22 }}>
            <Breadcrumbs
              items={[
                { label: "Destinations", href: "/destinations" },
                { label: destination.name, href: `/destinations/${slug}` },
              ]}
            />
          </div>

          {/* eyebrow - region · country */}
          <p
            className="fade-up eyebrow"
            style={{ margin: "0 0 18px", color: "var(--secondary-glow)" }}
          >
            <span className="dot" />
            {destination.region}
            {destination.country ? ` · ${destination.country}` : ""}
          </p>

          {/* huge Fraunces title with one italic-cherry accent word */}
          <h1
            className="fade-up"
            style={{
              margin: 0,
              fontFamily: "var(--font-heading), Fraunces, serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 500,
              lineHeight: 0.96,
              letterSpacing: "-0.035em",
              color: "#fff",
              maxWidth: 1000,
              fontVariationSettings: "'opsz' 144",
            }}
          >
            {titleWords.map((w, i) =>
              i === emIdx ? (
                <em
                  key={i}
                  style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary-glow)" }}
                >
                  {w}
                  {i < titleWords.length - 1 ? " " : ""}
                </em>
              ) : (
                <span key={i}>
                  {w}
                  {i < titleWords.length - 1 ? " " : ""}
                </span>
              )
            )}
          </h1>

          {/* Caveat script tagline */}
          {destination.tagline && (
            <p
              className="fade-up"
              style={{
                margin: "18px 0 0",
                maxWidth: 620,
                fontFamily: "var(--font-script), Caveat, cursive",
                fontSize: 28,
                lineHeight: 1.25,
                color: "rgba(255,255,255,0.94)",
              }}
            >
              {destination.tagline}
            </p>
          )}

          {/* coordinate micro-label + From ₹X chip */}
          <div
            className="fade-up"
            style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 26, flexWrap: "wrap" }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                color: "rgba(255,255,255,0.9)",
                fontSize: 15,
              }}
            >
              <MapPin size={16} color="var(--secondary-glow)" strokeWidth={1.8} />
              {destination.country || destination.region}
            </span>
            <span
              className="font-tech"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {coordLabel}
            </span>
            {destination.startingPrice ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 7,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 9999,
                  padding: "8px 16px",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.28)",
                }}
              >
                <span
                  className="font-tech"
                  style={{
                    fontSize: 8.5,
                    letterSpacing: "0.16em",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  From
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-heading), Fraunces, serif",
                    fontSize: 19,
                    fontWeight: 500,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {formatCurrency(destination.startingPrice)}
                </span>
              </span>
            ) : null}
          </div>
        </div>

        {/* scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            animation: "scrollNudge 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
          }}
        >
          <span
            className="font-tech"
            style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)" }}
          >
            SCROLL
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* ═══════════ PACKAGES IN {destination} ═══════════ */}
      <section style={{ background: "#fff", padding: "clamp(60px, 8vw, 100px) 40px", borderTop: "1px solid rgba(176,184,196,0.2)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 36,
            }}
          >
            <div>
              <p className="eyebrow">
                <span className="dot" />
                Ready-to-book itineraries
              </p>
              <h2
                style={{
                  margin: "16px 0 0",
                  fontFamily: "var(--font-heading), Fraunces, serif",
                  fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.04,
                  color: "var(--primary)",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Packages in{" "}
                <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>
                  {destination.name}.
                </em>
              </h2>
              {destinationPackages.length > 0 && (
                <p style={{ margin: "14px 0 0", maxWidth: 560, fontSize: 14.5, lineHeight: 1.7, color: "var(--muted-foreground)" }}>
                  {destinationPackages.length === 1
                    ? `A curated ${destination.name} itinerary - refine it with your travel consultant.`
                    : `${destinationPackages.length} curated ${destination.name} itineraries, from shorter escapes to extended expeditions - refine any of them with your travel consultant.`}
                </p>
              )}
            </div>
            {destinationPackages.length > 0 && (
              <Link
                href="/packages"
                className="link-underline"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--muted-foreground)",
                  textDecoration: "none",
                  flexShrink: 0,
                }}
              >
                View all packages
                <ArrowRight size={15} />
              </Link>
            )}
          </div>

          {destinationPackages.length > 0 ? (
            <div
              className="dd-pkg-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}
            >
              {destinationPackages.map((pkg, i) => (
                <PackageCard
                  key={pkg.slug}
                  big={i === 0 && pkg.featured ? true : false}
                  pkg={{
                    _id: pkg.slug,
                    title: pkg.title,
                    slug: pkg.slug,
                    description: pkg.description,
                    category: pkg.category,
                    duration: pkg.duration,
                    price: pkg.price,
                    discountedPrice: pkg.discountedPrice,
                    heroImage: pkg.heroImage,
                    difficulty: pkg.difficulty,
                    featured: pkg.featured,
                    highlights: pkg.highlights,
                    rating: pkg.rating,
                    reviewCount: pkg.reviewCount,
                    destination: {
                      name: pkg.destinationName,
                      slug: pkg.destinationSlug,
                      region: destination.region,
                    },
                  }}
                />
              ))}
            </div>
          ) : (
            /* 0 packages - tasteful "crafted on request" block */
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 18,
                borderRadius: 24,
                border: "1px solid rgba(176,184,196,0.3)",
                background: "linear-gradient(135deg, rgba(196,50,74,0.04), transparent 70%), #fff",
                padding: "clamp(32px, 5vw, 52px)",
                boxShadow: "0 10px 40px rgba(11,20,38,0.05)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "rgba(196,50,74,0.08)",
                  border: "1px solid rgba(196,50,74,0.14)",
                }}
              >
                <Compass size={24} color={accent} strokeWidth={1.6} />
              </span>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading), Fraunces, serif",
                  fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "var(--primary)",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Crafted on request,{" "}
                <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>
                  just for you.
                </em>
              </h3>
              <p style={{ margin: 0, maxWidth: 560, fontSize: 15, lineHeight: 1.75, color: "var(--muted-foreground)" }}>
                We don&apos;t have a fixed {destination.name} package listed yet - but this is exactly
                what we do best. Tell us your dates, pace and interests, and a real travel consultant
                will build a {destination.name} itinerary around you.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 6 }}>
                <Link href="/consultation" className="btn btn-primary">
                  <Phone size={15} /> Talk to a consultant
                </Link>
                <Link href="/packages" className="btn btn-ghost">
                  Browse all packages
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ EDITORIAL INTRO ═══════════ */}
      <section style={{ padding: "clamp(70px, 9vw, 120px) 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: facts.length ? "1.5fr 1fr" : "1fr",
            gap: "clamp(40px, 6vw, 90px)",
            alignItems: "start",
          }}
          className="dd-intro-grid"
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: 0 }}>
              <span className="dot" />
              The place
            </p>
            <p
              style={{
                margin: "22px 0 0",
                fontFamily: "var(--font-heading), Fraunces, serif",
                fontSize: "clamp(1.4rem, 2.3vw, 2rem)",
                lineHeight: 1.45,
                letterSpacing: "-0.015em",
                color: "var(--primary)",
                fontWeight: 400,
                fontVariationSettings: "'opsz' 100",
              }}
            >
              {destination.description}
            </p>
            <div
              style={{
                marginTop: 26,
                whiteSpace: "pre-line",
                fontSize: 15,
                lineHeight: 1.85,
                color: "var(--muted-foreground)",
              }}
            >
              {destination.longDescription}
            </div>
          </div>

          {/* quick facts rail */}
          {facts.length > 0 && (
            <aside
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                background: "rgba(176,184,196,0.3)",
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid rgba(176,184,196,0.3)",
              }}
            >
              {facts.map((f) => (
                <div key={f.label} style={{ background: "#fff", padding: "22px 24px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 9,
                      color: f.icon === "season" ? "var(--accent-dark)" : f.icon === "price" ? "var(--secondary)" : "var(--silver-dark)",
                    }}
                  >
                    {f.icon === "season" && <CalendarClock size={16} strokeWidth={1.8} />}
                    {f.icon === "weather" && <Cloud size={16} strokeWidth={1.8} />}
                    {f.icon === "price" && <Sparkles size={16} strokeWidth={1.8} />}
                    <span
                      className="font-tech"
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--silver-dark)",
                      }}
                    >
                      {f.label}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: f.icon === "weather" ? 13 : 15,
                      lineHeight: 1.6,
                      color: f.icon === "weather" ? "var(--muted-foreground)" : "var(--primary)",
                      fontWeight: f.icon === "weather" ? 400 : 500,
                    }}
                  >
                    {f.value}
                  </p>
                </div>
              ))}
            </aside>
          )}
        </div>
      </section>

      {/* ═══════════ SIGNATURE HIGHLIGHTS ═══════════ */}
      {destination.highlights.length > 0 && (
        <section style={{ background: "#fff", padding: "clamp(60px, 8vw, 100px) 40px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <p className="eyebrow">
              <span className="dot" />
              Signature moments
            </p>
            <h2
              style={{
                margin: "16px 0 28px",
                fontFamily: "var(--font-heading), Fraunces, serif",
                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                color: "var(--primary)",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              What you&apos;ll{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>
                remember.
              </em>
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {destination.highlights.map((h, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    borderRadius: 9999,
                    border: "1px solid rgba(196,50,74,0.2)",
                    background: "rgba(196,50,74,0.06)",
                    padding: "10px 18px",
                    fontSize: 14,
                    color: "var(--primary)",
                  }}
                >
                  <Compass size={14} color="var(--secondary)" strokeWidth={1.8} />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ POPULAR EXPERIENCES (premium cards) ═══════════ */}
      {destination.popularExperiences.length > 0 && (
        <section
          style={{
            padding: "clamp(60px, 8vw, 100px) 40px",
            background: "linear-gradient(180deg, #fff, #FAF8F4)",
          }}
        >
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <p className="eyebrow">
              <span className="dot" />
              Things to do
            </p>
            <h2
              style={{
                margin: "16px 0 32px",
                fontFamily: "var(--font-heading), Fraunces, serif",
                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                color: "var(--primary)",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              Experiences worth{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>
                the journey.
              </em>
            </h2>
            <div
              className="dd-exp-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}
            >
              {destination.popularExperiences.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 18,
                    borderRadius: 20,
                    border: "1px solid rgba(176,184,196,0.25)",
                    background: "#fff",
                    padding: 26,
                    boxShadow: "0 3px 18px rgba(11,20,38,0.05)",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: "rgba(196,50,74,0.06)",
                      border: "1px solid rgba(196,50,74,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                    }}
                    role="img"
                    aria-label={exp.title}
                  >
                    {exp.icon}
                  </span>
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-heading), Fraunces, serif",
                        fontSize: 19,
                        fontWeight: 500,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.15,
                        color: "var(--primary)",
                        fontVariationSettings: "'opsz' 144",
                      }}
                    >
                      {exp.title}
                    </h3>
                    <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.7, color: "var(--muted-foreground)" }}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ GALLERY STRIP ═══════════ */}
      {destination.galleryImages.length > 0 && (
        <section style={{ background: "#FAF8F4", padding: "clamp(50px, 7vw, 90px) 40px", borderTop: "1px solid rgba(176,184,196,0.2)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <p className="eyebrow">
              <span className="dot" />
              The gallery
            </p>
            <h2
              style={{
                margin: "16px 0 28px",
                fontFamily: "var(--font-heading), Fraunces, serif",
                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                color: "var(--primary)",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              A glimpse of{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>
                {destination.name}.
              </em>
            </h2>
            <div
              className="dd-gallery-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
            >
              {destination.galleryImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    aspectRatio: "3/2",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(176,184,196,0.25)",
                  }}
                >
                  <Image
                    src={img}
                    alt={`${destination.name} gallery ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ THINGS TO KNOW ═══════════ */}
      {destination.thingsToKnow.length > 0 && (
        <section style={{ background: "#FAF8F4", padding: "clamp(50px, 7vw, 90px) 40px", borderTop: "1px solid rgba(176,184,196,0.2)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <p className="eyebrow">
              <span className="dot" />
              Good to know
            </p>
            <h2
              style={{
                margin: "16px 0 28px",
                fontFamily: "var(--font-heading), Fraunces, serif",
                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                color: "var(--primary)",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              Before you{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>
                go.
              </em>
            </h2>
            <div
              className="dd-know-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}
            >
              {destination.thingsToKnow.map((tip, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    borderRadius: 16,
                    border: "1px solid rgba(176,184,196,0.25)",
                    background: "#fff",
                    padding: "18px 20px",
                  }}
                >
                  <Info size={18} color="var(--accent-dark)" strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "var(--muted-foreground)" }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ CTA BAND ═══════════ */}
      <section style={{ position: "relative", overflow: "hidden", background: "#0A1425" }}>
        {destination.heroImage && (
          <Image src={destination.heroImage} alt="" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.35 }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,20,37,0.9), rgba(21,34,64,0.8))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto", padding: "clamp(70px, 9vw, 110px) 40px", textAlign: "center" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-heading), Fraunces, serif",
              fontSize: "clamp(2.2rem, 4.4vw, 3.4rem)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: "#fff",
              fontVariationSettings: "'opsz' 144",
            }}
          >
            Plan your{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary-glow)" }}>
              {destination.name} trip.
            </em>
          </h2>
          <p style={{ margin: "20px auto 0", maxWidth: 460, fontSize: 15.5, lineHeight: 1.7, color: "rgba(208,213,220,0.7)" }}>
            One conversation and a real expert builds this trip around you - every detail handled.
            {destination.startingPrice ? ` Trips start from ${formatCurrency(destination.startingPrice)} per person.` : ""}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 34, flexWrap: "wrap" }}>
            <Link href="/consultation" className="btn btn-primary">
              <Phone size={16} /> Book a free consultation
            </Link>
            <Link href="/packages" className="btn btn-ghost">
              See more packages
            </Link>
          </div>
        </div>
      </section>

      {/* Local responsive rules (NOT in globals.css) */}
      <style>{`
        @media (max-width: 900px) {
          .dd-intro-grid { grid-template-columns: 1fr !important; }
          .dd-exp-grid { grid-template-columns: 1fr !important; }
          .dd-know-grid { grid-template-columns: 1fr !important; }
          .dd-pkg-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 760px) {
          .dd-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 620px) {
          .dd-pkg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
