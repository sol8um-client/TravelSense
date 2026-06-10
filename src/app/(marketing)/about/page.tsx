import {
  generatePageMetadata,
  organizationSchema,
  localBusinessSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import AboutContent from "@/components/about/AboutContent"

export const metadata = generatePageMetadata({
  title: "About TravelSense - Travel, the Human Way",
  description:
    "Booking is easy; genuine human support is rare. TravelSense brings it back - every journey starts with a conversation and a real person who stands behind every booking. Read the moments that define us.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />

      <AboutContent />
    </>
  )
}
