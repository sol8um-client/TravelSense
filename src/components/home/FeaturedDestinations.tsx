import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import { Container } from "@/components/layout/Container"
import { SectionHeading } from "@/components/shared/SectionHeading"

const destinations = [
  {
    name: "Bali",
    country: "Indonesia",
    price: 45000,
    gradient: "from-cyan-400 via-teal-500 to-emerald-600",
    slug: "bali",
  },
  {
    name: "Santorini",
    country: "Greece",
    price: 85000,
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    slug: "santorini",
  },
  {
    name: "Jaipur",
    country: "India",
    price: 12000,
    gradient: "from-amber-400 via-orange-500 to-red-500",
    slug: "jaipur",
  },
  {
    name: "Swiss Alps",
    country: "Switzerland",
    price: 120000,
    gradient: "from-slate-400 via-emerald-500 to-teal-700",
    slug: "swiss-alps",
  },
]

export default function FeaturedDestinations() {
  return (
    <section className="py-20 sm:py-28 bg-background-alt">
      <Container>
        <SectionHeading
          title="Popular Destinations"
          subtitle="Handpicked destinations that promise extraordinary experiences, from tropical paradises to mountain escapes."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Gradient background (placeholder for image) */}
              <div
                className={cn(
                  "relative h-56 bg-gradient-to-br transition-transform duration-500 group-hover:scale-[1.02]",
                  dest.gradient
                )}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white">
                        {dest.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 text-white/80">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="text-sm">{dest.country}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/60 uppercase tracking-wider">
                        Starting from
                      </p>
                      <p className="text-lg font-bold text-secondary-light">
                        {formatCurrency(dest.price)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-secondary"
          >
            View All Destinations
            <ArrowRight className="h-5 w-5 transition-transform hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
