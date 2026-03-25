import Link from "next/link"
import {
  Clock,
  MapPin,
  Star,
  Check,
  ArrowRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { formatCurrency, formatDuration } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/Container"
import { SectionHeading } from "@/components/shared/SectionHeading"

const packages = [
  {
    title: "Enchanting Kerala Backwaters",
    slug: "enchanting-kerala-backwaters",
    destination: "Kerala, India",
    days: 6,
    price: 28000,
    originalPrice: 35000,
    discount: 20,
    rating: 4.8,
    reviewCount: 124,
    highlights: [
      "Alleppey houseboat stay",
      "Munnar tea plantation visit",
      "Kathakali dance performance",
      "Spice garden tour",
    ],
    gradient: "from-emerald-400 to-teal-600",
    featured: true,
  },
  {
    title: "Royal Rajasthan Heritage Tour",
    slug: "royal-rajasthan-heritage-tour",
    destination: "Rajasthan, India",
    days: 8,
    price: 42000,
    originalPrice: 50000,
    discount: 16,
    rating: 4.9,
    reviewCount: 98,
    highlights: [
      "Jaipur palace tour",
      "Udaipur lake cruise",
      "Desert safari in Jaisalmer",
      "Jodhpur blue city walk",
    ],
    gradient: "from-amber-400 to-orange-600",
    featured: false,
  },
  {
    title: "Magical Bali Escape",
    slug: "magical-bali-escape",
    destination: "Bali, Indonesia",
    days: 7,
    price: 52000,
    originalPrice: 65000,
    discount: 20,
    rating: 4.7,
    reviewCount: 87,
    highlights: [
      "Ubud rice terrace trek",
      "Tanah Lot sunset temple",
      "Seminyak beach club access",
      "Balinese spa ritual",
    ],
    gradient: "from-cyan-400 to-blue-600",
    featured: false,
  },
]

export default function PopularPackages() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <Container>
        <SectionHeading
          title="Popular Packages"
          subtitle="Our most loved travel packages, thoughtfully designed to deliver exceptional value and unforgettable experiences."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Discount badge */}
              {pkg.discount > 0 && (
                <div className="absolute top-4 right-4 z-10 rounded-full bg-error px-3 py-1 text-xs font-bold text-white shadow-sm">
                  {pkg.discount}% OFF
                </div>
              )}

              {/* Gradient header (placeholder for image) */}
              <div
                className={cn(
                  "relative h-48 bg-gradient-to-br",
                  pkg.gradient
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <div className="flex items-center gap-1 text-white/80">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-sm font-medium">{pkg.destination}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground leading-snug">
                  {pkg.title}
                </h3>

                {/* Meta row */}
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(pkg.days)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    <span className="font-medium text-foreground">{pkg.rating}</span>
                    <span>({pkg.reviewCount})</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="mt-4 flex-1 space-y-2">
                  {pkg.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Starting from
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">
                        {formatCurrency(pkg.price)}
                      </span>
                      {pkg.originalPrice > pkg.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatCurrency(pkg.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">per person</p>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/packages/${pkg.slug}`}>
                      View Details
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-secondary"
          >
            Browse All Packages
            <ArrowRight className="h-5 w-5 transition-transform hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
