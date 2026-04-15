import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Star } from "lucide-react"
import { travelCategories } from "@/config/categories"
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"

export const metadata: Metadata = generatePageMetadata({
  title: "Travel Categories | TravelSense",
  description:
    "Explore curated travel experiences across leisure, adventure, educational, and sports categories. Find the perfect trip style for you.",
  path: "/categories",
})

export default function CategoriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Categories", url: "/categories" },
        ])}
      />

      <PageHero
        title="Travel Categories"
        subtitle="Choose your travel style and discover curated experiences designed just for you"
        backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=600&fit=crop"
      />

      <div className="bg-[#0A1425]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Categories", href: "/categories" }]}
            className="mb-12"
          />

          <div className="space-y-8">
            {travelCategories.map((category, index) => {
              const Icon = category.icon
              const isEven = index % 2 === 0

              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:border-[#C4324A]/30 hover:bg-white/[0.07]"
                >
                  <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    {/* Category image area */}
                    <div className="relative flex min-h-[240px] flex-col items-center justify-center overflow-hidden px-8 py-10 lg:w-2/5 lg:min-h-[360px]">
                      <Image
                        src={category.image}
                        alt={category.title}
                        width={800}
                        height={600}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color.gradient} opacity-60`} />
                      <div className="absolute inset-0 bg-[#0A1425]/40" />
                      <div className="relative z-10 text-center">
                        <div className="mx-auto rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                          <Icon className="h-12 w-12 text-white" />
                        </div>
                        <h2 className="mt-5 font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
                          {category.title}
                        </h2>
                        <p className="mt-2 text-center text-sm text-white/70">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
                      <div>
                        <p className="font-body text-sm leading-relaxed text-white/60 md:text-base">
                          {category.longDescription}
                        </p>

                        {/* Highlights */}
                        <div className="mt-6">
                          <h3 className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-white/40">
                            <Star className="h-3.5 w-3.5" />
                            Highlights
                          </h3>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {category.highlights.map((highlight) => (
                              <div
                                key={highlight}
                                className="flex items-start gap-2 text-sm text-white/60"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C4324A]" />
                                {highlight}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Popular destinations */}
                        <div className="mt-6">
                          <h3 className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-white/40">
                            <MapPin className="h-3.5 w-3.5" />
                            Popular Destinations
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {category.popularDestinations.map((dest) => (
                              <span
                                key={dest}
                                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50"
                              >
                                {dest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#C4324A] transition-colors group-hover:text-[#D4A853]">
                        Explore {category.title}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* ── Explore Banner ──────────────────────────────────── */}
          <div className="mt-12 relative overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&h=500&fit=crop"
              alt="Diverse travel experiences around the world"
              width={1920}
              height={500}
              className="h-[220px] w-full object-cover md:h-[300px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1425]/90 via-[#0A1425]/60 to-[#0A1425]/90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h2 className="font-heading text-xl tracking-wide text-white md:text-2xl">
                  Not Sure Which Category Fits You?
                </h2>
                <p className="mx-auto mt-3 max-w-lg font-body text-sm text-white/60 md:text-base">
                  Book a free consultation and our experts will help you discover the perfect travel style.
                </p>
                <Link
                  href="/consultation"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#C4324A] px-6 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-[#C4324A]/80"
                >
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
