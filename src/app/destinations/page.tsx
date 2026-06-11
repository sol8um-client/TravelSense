import Link from "next/link"
import { Phone } from "lucide-react"
import { generatePageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { WhatsAppLink } from "@/components/shared/WhatsAppLink"
import { DestinationsExplorer } from "@/components/destinations/DestinationsExplorer"
import type { DestinationCardData } from "@/components/destinations/DestinationCard"
import { coordFor } from "@/components/destinations/destinationCoords"
import { destinations, comingSoonDestinations } from "@/data/destinations"
import { packages } from "@/data/packages"
import { packageTags } from "@/data/packageTags"

export const dynamic = "force-static"

export const metadata = generatePageMetadata({
  title: "Destinations",
  description:
    "Explore handpicked travel destinations across India and beyond. From serene beaches to majestic mountains, find your perfect getaway with TravelSense.",
  path: "/destinations",
})

/* ─── Map static data → bento card data (coords + live package counts) ────── */

// Live package count per destination slug ("N experiences").
const packageCounts: Record<string, number> = packages.reduce<Record<string, number>>((acc, p) => {
  acc[p.destinationSlug] = (acc[p.destinationSlug] ?? 0) + 1
  return acc
}, {})

// Each destination's tag set = the UNION of its packages' activity + vibe tags,
// reusing the same packageTags taxonomy as the /packages drill-down. Drop the
// lowercase auto-tag junk + the over-broad Leisure/Adventure so chips stay
// meaningful (Trek, Beach, Snow & Winter, Backwaters, Islands...).
const destTags: Record<string, string[]> = {}
for (const p of packages) {
  const t = packageTags[p.slug]
  if (!t) continue
  const set = (destTags[p.destinationSlug] ??= [])
  for (const tag of [...(t.activities ?? []), ...(t.vibes ?? [])]) {
    if (/^[A-Z]/.test(tag) && tag !== "Leisure" && tag !== "Adventure" && !set.includes(tag)) {
      set.push(tag)
    }
  }
}

const destinationCards: DestinationCardData[] = destinations.map((d, i) => {
  const count = packageCounts[d.slug] ?? 0
  return {
    _id: `dest-${i + 1}`,
    name: d.name,
    slug: d.slug,
    description: d.tagline + " - " + d.description,
    heroImage: d.heroImage,
    region: d.region,
    country: d.country,
    startingPrice: d.startingPrice,
    highlights: d.highlights,
    featured: d.featured,
    coord: coordFor(d.slug),
    tag: d.tagline,
    experienceCount: count,
    tags: destTags[d.slug] ?? [],
    // If the destination has exactly one package, deep-link straight to it.
    directPackageSlug: count === 1 ? packages.find((p) => p.destinationSlug === d.slug)?.slug : undefined,
  }
})

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function DestinationsPage() {
  const ctaImage = destinations.find((d) => d.slug === "kerala")?.heroImage

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Travel Destinations",
          description:
            "Explore handpicked travel destinations across India and beyond with TravelSense.",
          url: "https://travelsense.co.in/destinations",
        }}
      />

      {/* Globe-backed cream hero + sticky region board + bento grid */}
      <DestinationsExplorer destinations={destinationCards} />

      {/* ═══════════ Coming soon - "More horizons, on the way." ═══════════ */}
      {comingSoonDestinations.length > 0 && (
        <section className="bg-brand-mesh" style={{ padding: "0 32px 90px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
            <p
              className="font-body"
              style={{
                margin: 0,
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              Coming soon
            </p>
            <h2
              className="font-heading"
              style={{
                margin: "12px 0 0",
                fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--primary)",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              More horizons,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary)" }}>on the way.</em>
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 22,
              }}
            >
              {comingSoonDestinations.map((c) => (
                <Link
                  key={c.slug}
                  href={`/contact?enquiry=${encodeURIComponent(c.name)}`}
                  className="link-underline"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    borderRadius: 9999,
                    border: "1px dashed rgba(176,184,196,0.5)",
                    background: "#fff",
                    padding: "9px 16px",
                    fontSize: 13,
                    color: "var(--muted-foreground)",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ CTA - "Can't decide? Let's talk." ═══════════ */}
      <section style={{ position: "relative", overflow: "hidden", background: "#0A1425" }}>
        {ctaImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ctaImage}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.32 }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(10,20,37,0.9), rgba(21,34,64,0.8))",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto", padding: "100px 32px", textAlign: "center" }}>
          <h2
            className="font-heading"
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: "#fff",
              fontVariationSettings: "'opsz' 144",
            }}
          >
            Can&apos;t decide?{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--secondary-glow)" }}>Let&apos;s talk.</em>
          </h2>
          <p style={{ margin: "18px auto 0", maxWidth: 420, fontSize: 15.5, lineHeight: 1.7, color: "rgba(208,213,220,0.7)" }}>
            Tell a real expert your vibe and budget - we&apos;ll match you to the perfect place.
          </p>
          <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
            <WhatsAppLink source="destinations-cta" className="btn btn-primary" style={{ padding: "15px 30px", fontSize: 14 }}>
              <Phone size={16} strokeWidth={1.5} /> Talk to a human
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </>
  )
}
