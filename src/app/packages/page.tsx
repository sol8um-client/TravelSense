import Link from "next/link"
import Image from "next/image"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { PackageFilters } from "@/components/packages/PackageFilters"
import type { PackageCardData } from "@/components/packages/PackageCard"
import { packages } from "@/data/packages"
import { destinations } from "@/data/destinations"

export const metadata = generatePageMetadata({
  title: "Travel Packages",
  description:
    "Browse curated travel packages across leisure and adventure categories. Find the perfect trip for your next getaway.",
  path: "/packages",
})

/* ─── Map static data to PackageCardData ─────────────────────────────────── */

function getPackageCards(): PackageCardData[] {
  // Build a slug -> region lookup for fast region resolution
  const regionBySlug = new Map<string, string>(
    destinations.map((d) => [d.slug, d.region])
  )

  return packages.map((p, i) => ({
    _id: `pkg-${i + 1}`,
    title: p.title,
    slug: p.slug,
    description: p.description,
    category: p.category,
    duration: p.duration,
    price: p.price,
    discountedPrice: p.discountedPrice,
    heroImage: p.heroImage,
    difficulty: p.difficulty,
    featured: p.featured,
    highlights: p.highlights,
    rating: p.rating,
    reviewCount: p.reviewCount,
    destination: {
      name: p.destinationName,
      slug: p.destinationSlug,
      region: regionBySlug.get(p.destinationSlug) ?? undefined,
    },
  }))
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function PackagesPage() {
  const pkgCards = getPackageCards()

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: "#FAF8F4" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Travel Packages",
          description:
            "Browse curated travel packages across India and beyond with TravelSense.",
          url: "https://travelsense.co.in/packages",
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Packages", url: "/packages" },
        ])}
      />

      {/* ── HERO ── */}
      <section
        className="bg-brand-mesh grain relative overflow-hidden"
        style={{ padding: "150px 32px 56px" }}
      >
        <div
          className="relative mx-auto text-center"
          style={{ zIndex: 2, maxWidth: 1180 }}
        >
          {/* breadcrumb trail (light) */}
          <nav
            aria-label="Breadcrumb"
            className="fade-in-soft mb-6 flex justify-center"
          >
            <ol
              className="flex items-center font-body"
              style={{ gap: 8, fontSize: 13, color: "var(--silver-dark)" }}
            >
              <li>
                <Link href="/" className="link-underline transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden style={{ color: "var(--silver)" }}>
                /
              </li>
              <li style={{ color: "var(--muted-foreground)" }}>Packages</li>
            </ol>
          </nav>

          <div className="fade-in-soft flex justify-center">
            <p className="eyebrow">
              <span>Curated trips</span>
              <span className="dot" />
              <span>Leisure · Adventure</span>
            </p>
          </div>

          <h1
            className="fade-in-soft mx-auto"
            style={{
              margin: "18px auto 0",
              maxWidth: 760,
              fontFamily: "var(--font-heading, 'Fraunces', Georgia, serif)",
              fontSize: "clamp(2.6rem, 5.4vw, 4.4rem)",
              fontWeight: 500,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "var(--primary)",
              fontVariationSettings: "'opsz' 144",
              animationDelay: "0.08s",
            }}
          >
            Trips crafted by{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--secondary)",
              }}
            >
              humans,
            </em>{" "}
            not algorithms.
          </h1>

          <p
            className="fade-in-soft mx-auto font-body"
            style={{
              margin: "20px auto 0",
              maxWidth: 500,
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--muted-foreground)",
              animationDelay: "0.14s",
            }}
          >
            Every itinerary is hand-built, fully transparent, and adjustable.
            Compare, then make it yours.
          </p>
        </div>
      </section>

      {/* ── FILTER BOARD + GRID ── */}
      <section style={{ paddingBottom: 90 }}>
        <PackageFilters packages={pkgCards} />
      </section>

      {/* ── CTA ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0A1425" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&h=900&fit=crop"
          alt=""
          fill
          aria-hidden
          className="object-cover"
          style={{ opacity: 0.3 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,20,37,0.9), rgba(21,34,64,0.8))",
          }}
        />
        <div
          className="relative mx-auto text-center"
          style={{ zIndex: 2, maxWidth: 700, padding: "100px 32px" }}
        >
          <h2
            className="m-0"
            style={{
              fontFamily: "var(--font-heading, 'Fraunces', Georgia, serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: "#fff",
              fontVariationSettings: "'opsz' 144",
            }}
          >
            Want it{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--secondary-glow)",
              }}
            >
              tailored?
            </em>
          </h2>
          <p
            className="mx-auto font-body"
            style={{
              margin: "18px auto 0",
              maxWidth: 430,
              fontSize: 15.5,
              lineHeight: 1.7,
              color: "rgba(208,213,220,0.7)",
            }}
          >
            Every package bends to your dates, budget and pace. One call and a
            real expert reshapes it around you.
          </p>
          <div style={{ marginTop: 32 }} className="flex justify-center">
            <Link href="/consultation" className="btn btn-primary">
              {/* Ic.phone - raw path verbatim */}
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Build my trip
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
