import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import MiceContent from "@/components/mice/MiceContent"

export const metadata = generatePageMetadata({
  title: "MICE & Corporate Travel - Meetings, Incentives, Conferences & Events",
  description:
    "TravelSense plans and runs MICE travel - corporate meetings, incentive trips, conferences, events and exhibitions. Venues, group air, logistics and on-ground teams, handled end to end.",
  path: "/mice",
})

export default function MicePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "MICE & Corporate", url: "/mice" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "MICE & Corporate Travel",
          serviceType: "Meetings, Incentives, Conferences and Events travel",
          provider: { "@type": "TravelAgency", name: "TravelSense" },
          description:
            "End-to-end MICE travel management - meetings, incentive programmes, conferences, events and exhibitions.",
          areaServed: "IN",
        }}
      />
      <MiceContent />
    </>
  )
}
