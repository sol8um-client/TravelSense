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
        >
          <Breadcrumbs
            items={[
              { label: "Itinerary Builder", href: "/itinerary-builder" },
            ]}
          />
        </PageHero>

        {/* ── Builder Section ─────────────────────────────────── */}
        <section className="bg-[#0A1425] py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <ItineraryForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
