import Image from "next/image"
import { generatePageMetadata } from "@/lib/seo"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { PageHero } from "@/components/shared/PageHero"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HotelsComingSoon from "@/components/hotels/HotelsComingSoon"

export const metadata = generatePageMetadata({
  title: "Hotel Booking — Find Your Perfect Stay",
  description:
    "Search and book hotels across India and international destinations. Budget-friendly to luxury stays, curated by TravelSense. Coming soon.",
  path: "/hotels",
})

export default function HotelsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <PageHero
          title="Hotel Booking"
          subtitle="Find and book the perfect stay for your trip — from budget-friendly to luxury."
          backgroundImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop"
        >
          <Breadcrumbs items={[{ label: "Hotels", href: "/hotels" }]} />
        </PageHero>

        {/* ── Hotel Types Showcase ────────────────────────────── */}
        <section className="bg-[#0D1A30] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
                Stays for Every Style
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-body text-sm text-white/50 md:text-base">
                From boutique heritage havelis to beachfront resorts, we are curating the finest properties across India.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&h=600&fit=crop", label: "Luxury Resort", alt: "Luxury pool resort" },
                { src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&h=600&fit=crop", label: "Heritage Haveli", alt: "Heritage haveli courtyard" },
                { src: "https://images.unsplash.com/photo-1470770841497-7b3200f18585?w=500&h=600&fit=crop", label: "Mountain Lodge", alt: "Mountain lodge with scenic view" },
                { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=600&fit=crop", label: "Beach Villa", alt: "Beach villa with ocean view" },
              ].map((hotel) => (
                <div key={hotel.label} className="group relative overflow-hidden rounded-2xl">
                  <Image
                    src={hotel.src}
                    alt={hotel.alt}
                    width={500}
                    height={600}
                    className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-72"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/90 via-[#0A1425]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="font-heading text-sm tracking-wide text-white">{hotel.label}</p>
                    <p className="mt-0.5 font-body text-xs text-[#D4A853]">Coming Soon</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HotelsComingSoon />
      </main>
      <Footer />
    </>
  )
}
