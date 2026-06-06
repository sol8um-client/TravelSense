import { generatePageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ConsultationContent from "@/components/booking/ConsultationContent"

export const metadata = generatePageMetadata({
  title: "Book a Free Travel Consultation",
  description:
    "Schedule a free one-on-one consultation with our travel experts. Get personalized trip recommendations, itinerary advice, and budget planning tailored to your needs.",
  path: "/consultation",
})

export default function ConsultationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Free Travel Consultation",
            provider: {
              "@type": "TravelAgency",
              name: "TravelSense",
            },
            description:
              "Free one-on-one travel consultation with expert travel advisors.",
            areaServed: "IN",
          }}
        />
        <ConsultationContent />
      </main>
      <Footer />
    </>
  )
}
