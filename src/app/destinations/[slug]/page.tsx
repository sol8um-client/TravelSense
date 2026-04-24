import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  MapPin,
  Calendar,
  Cloud,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react"
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { formatCurrency } from "@/lib/utils"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd } from "@/components/shared/JsonLd"
import { PageHero } from "@/components/shared/PageHero"
import { destinations, getDestinationBySlug } from "@/data/destinations"
import { packages } from "@/data/packages"
import { PackageCard } from "@/components/packages/PackageCard"

export const dynamic = "force-static"

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
      title: "Destination Not Found | TravelSense",
      description: "The requested destination could not be found.",
      path: `/destinations/${slug}`,
    })
  }

  return generatePageMetadata({
    title: `${dest.name} — Travel Guide | TravelSense`,
    description: dest.description,
    path: `/destinations/${slug}`,
    image: dest.heroImage,
  })
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

  return (
    <>
      {/* JSON-LD */}
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
        }}
      />

      {/* Hero */}
      <PageHero
        title={destination.name}
        subtitle={destination.tagline}
        backgroundImage={destination.heroImage}
      >
        <Breadcrumbs
          items={[
            { label: "Destinations", href: "/destinations" },
            { label: destination.name, href: `/destinations/${slug}` },
          ]}
        />
      </PageHero>

      {/* Quick info bar */}
      <section className="border-b border-white/5 bg-[#0D1A30] px-4 py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 text-sm text-white/60 md:gap-10">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#C4324A]" />
            {destination.region}
            {destination.country && `, ${destination.country}`}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#D4A853]" />
            Best time: {destination.bestTimeToVisit}
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#D4A853]" />
            Starting from{" "}
            <span className="font-medium text-[#C4324A]">
              {formatCurrency(destination.startingPrice)}
            </span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-[#0A1425] px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl">
            Overview
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            {destination.description}
          </p>
          <div className="mt-6 whitespace-pre-line text-white/60 leading-relaxed">
            {destination.longDescription}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-[#0D1A30] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl">
            Highlights
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {destination.highlights.map((highlight, i) => (
              <span
                key={i}
                className="rounded-full border border-[#C4324A]/20 bg-[#C4324A]/10 px-4 py-2 text-sm text-white/80"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#0A1425] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl">
            Gallery
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destination.galleryImages.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10"
              >
                <Image
                  src={img}
                  alt={`${destination.name} gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Experiences */}
      <section className="bg-[#0D1A30] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl">
            Popular Experiences
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {destination.popularExperiences.map((exp, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-[#C4324A]/30"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl" role="img" aria-label={exp.title}>
                    {exp.icon}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-medium tracking-[-0.015em] leading-[1.15] text-white">
                      {exp.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages for this destination */}
      {destinationPackages.length > 0 && (
        <section className="bg-[#0A1425] px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
              <div>
                <p className="text-[10.5px] font-body font-semibold tracking-[0.28em] uppercase text-[#E8485E]">
                  Ready-to-book itineraries
                </p>
                <h2 className="hx mt-3 font-heading text-3xl font-medium tracking-[-0.02em] leading-[1.04] text-white md:text-4xl lg:text-5xl">
                  Packages for <em className="italic font-normal text-[#FFB3A3]">{destination.name}.</em>
                </h2>
                <p className="mt-3 text-white/55 max-w-xl">
                  {destinationPackages.length === 1
                    ? `A curated ${destination.name} itinerary — refine it with your travel consultant.`
                    : `${destinationPackages.length} curated ${destination.name} itineraries — from shorter escapes to extended expeditions. Refine any of them with your travel consultant.`}
                </p>
              </div>
              <Link
                href="/packages"
                className="animated-underline inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-[#E8485E] transition-colors shrink-0 group"
              >
                View all packages
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destinationPackages.map((pkg) => (
                <PackageCard
                  key={pkg.slug}
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
                    destination: {
                      name: pkg.destinationName,
                      slug: pkg.destinationSlug,
                    },
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Time to Visit & Weather */}
      <section className="bg-[#0D1A30] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl">
            Best Time to Visit
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-[#D4A853]">
                <Calendar className="h-5 w-5" />
                <h3 className="font-heading text-sm font-medium tracking-[-0.015em] leading-[1.15]">
                  Ideal Season
                </h3>
              </div>
              <p className="mt-3 text-lg text-white/80">
                {destination.bestTimeToVisit}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-[#D4A853]">
                <Cloud className="h-5 w-5" />
                <h3 className="font-heading text-sm font-medium tracking-[-0.015em] leading-[1.15]">
                  Weather & Climate
                </h3>
              </div>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                {destination.weather}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Things to Know */}
      <section className="bg-[#0A1425] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl">
            Things to Know
          </h2>
          <div className="space-y-4">
            {destination.thingsToKnow.map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl border border-white/5 bg-white/5 p-4"
              >
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#D4A853]" />
                <p className="text-sm text-white/70 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D1A30] px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="hx font-heading text-2xl font-medium tracking-[-0.02em] leading-[1.1] text-white md:text-3xl">
            Ready to explore <em className="italic font-normal text-[#FFB3A3]">{destination.name}?</em>
          </h2>
          <p className="mt-4 text-white/50">
            Let our travel experts craft the perfect itinerary for your trip.
          </p>
          <div className="mt-2 text-sm text-white/40">
            Starting from{" "}
            <span className="font-medium text-[#C4324A]">
              {formatCurrency(destination.startingPrice)}
            </span>{" "}
            per person
          </div>
          <Link
            href="/consultation"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C4324A] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C4324A]/90"
          >
            Book a Free Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
