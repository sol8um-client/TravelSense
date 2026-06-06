import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import ServicesContent from "@/components/services/ServicesContent"

export const metadata = generatePageMetadata({
  title: "Our Services - TravelSense",
  description:
    "Explore TravelSense services: travel consultation, custom itineraries, hotel & vehicle booking, visa assistance, and group travel. Everything you need for the perfect trip.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "TravelSense Travel Services",
          provider: {
            "@type": "TravelAgency",
            name: "TravelSense",
          },
          description:
            "End-to-end travel services: consultation, itinerary planning, hotel and vehicle booking, visa and passport assistance, and group and corporate travel.",
          areaServed: "IN",
        }}
      />
      <ServicesContent />
    </>
  )
}
