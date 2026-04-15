import Image from "next/image"
import { generatePageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { PageHero } from "@/components/shared/PageHero"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ItineraryForm from "@/components/itinerary/ItineraryForm"

export const metadata = generatePageMetadata({
  title: "Itinerary Builder — Plan Your Perfect Trip",
  description:
    "Build a personalized travel itinerary in minutes. Tell us your destination, budget, and interests, and we'll recommend the perfect packages for you.",
  path: "/itinerary-builder",
})

export default function ItineraryBuilderPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "TravelSense Itinerary Builder",
            applicationCategory: "TravelApplication",
            description:
              "AI-powered itinerary builder that creates personalized travel plans based on your preferences.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
            },
          }}
        />

        <PageHero
          title="Itinerary Builder"
          subtitle="Tell us what you love, where you want to go, and your budget. We'll craft the perfect travel plan for you."
          backgroundImage="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1920&h=1080&fit=crop"
        >
          <Breadcrumbs
            items={[
              { label: "Itinerary Builder", href: "/itinerary-builder" },
            ]}
          />
        </PageHero>

        {/* ── Builder Section with Travel Imagery ─────────────── */}
        <section className="bg-[#0A1425] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-5">
              {/* Form column */}
              <div className="lg:col-span-3">
                <ItineraryForm />
              </div>

              {/* Travel inspiration column */}
              <div className="hidden space-y-5 lg:col-span-2 lg:block">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop"
                    alt="Lake surrounded by mountains"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/80 to-transparent" />
                  <p className="absolute bottom-4 left-4 font-body text-sm text-white/80">
                    Mountain lake getaway
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=350&fit=crop"
                    alt="Traditional boat in Southeast Asia"
                    width={600}
                    height={350}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/80 to-transparent" />
                  <p className="absolute bottom-4 left-4 font-body text-sm text-white/80">
                    Southeast Asia exploration
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&h=350&fit=crop"
                    alt="Desert safari adventure"
                    width={600}
                    height={350}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/80 to-transparent" />
                  <p className="absolute bottom-4 left-4 font-body text-sm text-white/80">
                    Desert safari adventure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
