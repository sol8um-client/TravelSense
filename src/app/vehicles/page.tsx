import Link from "next/link"
import Image from "next/image"
import { generatePageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { PageHero } from "@/components/shared/PageHero"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import VehicleRequestForm from "@/components/booking/VehicleRequestForm"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Car, Truck, Bus, Crown, Users, ArrowRight } from "lucide-react"

export const metadata = generatePageMetadata({
  title: "Vehicle Rental Services — Comfortable Travel Transport",
  description:
    "Book reliable vehicles for your trip — sedans, SUVs, tempo travellers, mini buses, and luxury coaches. Affordable rates with experienced drivers across India.",
  path: "/vehicles",
})

const vehicleTypes = [
  {
    icon: Car,
    name: "Sedan",
    capacity: "Up to 4 passengers",
    description:
      "Comfortable sedans perfect for couples and small families. Ideal for airport transfers and city tours.",
    highlight: false,
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&h=400&fit=crop",
  },
  {
    icon: Truck,
    name: "SUV",
    capacity: "Up to 6 passengers",
    description:
      "Spacious SUVs for families and small groups. Great for hill stations and off-road adventures.",
    highlight: false,
    image: "https://images.unsplash.com/photo-1533473359331-2f218f26bfbb?w=600&h=400&fit=crop",
  },
  {
    icon: Users,
    name: "Tempo Traveller",
    capacity: "12 - 18 passengers",
    description:
      "The go-to choice for group trips. Pushback seats, AC, and ample luggage space for road journeys.",
    highlight: true,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop",
  },
  {
    icon: Bus,
    name: "Mini Bus",
    capacity: "20 - 30 passengers",
    description:
      "Perfect for large groups, corporate outings, and educational tours. Comfortable seating with entertainment systems.",
    highlight: false,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&h=400&fit=crop",
  },
  {
    icon: Crown,
    name: "Luxury Coach",
    capacity: "30 - 45 passengers",
    description:
      "Premium coaches for large-scale travel. Recliner seats, Wi-Fi, and onboard washrooms for long-distance comfort.",
    highlight: false,
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=600&h=400&fit=crop",
  },
]

export default function VehiclesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Vehicle Rental Services",
            provider: {
              "@type": "TravelAgency",
              name: "TravelSense",
            },
            description:
              "Reliable vehicle rental services for travel across India including sedans, SUVs, tempo travellers, and luxury coaches.",
            areaServed: "IN",
          }}
        />

        <PageHero
          title="Vehicle Rental Services"
          subtitle="Travel in comfort with our wide range of well-maintained vehicles and experienced drivers."
          backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop"
        >
          <Breadcrumbs items={[{ label: "Vehicles", href: "/vehicles" }]} />
        </PageHero>

        {/* ── Vehicle Types Grid ──────────────────────────────── */}
        <section className="bg-[#0A1425] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
                Choose Your Vehicle
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-body text-sm text-white/50 md:text-base">
                From intimate city rides to large group journeys, we have the
                right vehicle for every trip.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vehicleTypes.map((vehicle) => (
                <div
                  key={vehicle.name}
                  className={cn(
                    "group overflow-hidden rounded-2xl border bg-white/5 backdrop-blur transition-colors",
                    vehicle.highlight
                      ? "border-[#D4A853]/30 hover:border-[#D4A853]/50"
                      : "border-white/10 hover:border-[#C4324A]/30"
                  )}
                >
                  {/* Vehicle image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425] via-[#0A1425]/30 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                        vehicle.highlight
                          ? "bg-[#D4A853]/10 text-[#D4A853] group-hover:bg-[#D4A853]/20"
                          : "bg-[#C4324A]/10 text-[#C4324A] group-hover:bg-[#C4324A]/20"
                      )}
                    >
                      <vehicle.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-heading text-base font-normal tracking-wide text-white">
                      {vehicle.name}
                    </h3>
                    <p className="mt-1 font-body text-xs font-semibold text-[#D4A853]">
                      {vehicle.capacity}
                    </p>
                    <p className="mt-2 font-body text-sm leading-relaxed text-white/50">
                      {vehicle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Road Trip Banner ─────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0A1425]">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1920&h=600&fit=crop"
              alt="Scenic Indian highway winding through mountains"
              width={1920}
              height={600}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1425] via-[#0A1425]/60 to-[#0A1425]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="mx-auto max-w-3xl px-4 text-center">
                <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
                  Every Journey Deserves the Right Ride
                </h2>
                <p className="mx-auto mt-3 max-w-xl font-body text-sm text-white/60 md:text-base">
                  From the winding roads of the Western Ghats to the highways of Rajasthan,
                  travel comfortably with our handpicked fleet and experienced drivers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Request Form Section ────────────────────────────── */}
        <section className="bg-[#0D1A30] py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
                Request a Vehicle
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-body text-sm text-white/50 md:text-base">
                Tell us your travel details and we will find the best vehicle and
                driver for your trip.
              </p>
            </div>

            <div className="mt-10">
              <VehicleRequestForm />
            </div>
          </div>
        </section>

        {/* ── CTA Section ────────────────────────────────────── */}
        <section className="bg-[#0A1425] py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
              Need Help Planning Your Trip?
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-sm text-white/50 md:text-base">
              Our travel experts can help you choose the right vehicle and plan
              the perfect road trip experience.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                className="bg-[#C4324A] font-body text-white hover:bg-[#C4324A]/80"
                size="lg"
              >
                <Link href="/consultation">
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 font-body text-white hover:bg-white/5"
                size="lg"
              >
                <Link href="/packages">Browse Packages</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

