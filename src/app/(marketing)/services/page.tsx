import { generatePageMetadata } from "@/lib/seo"
import ServicesContent from "@/components/services/ServicesContent"

export const metadata = generatePageMetadata({
  title: "Our Services — TravelSense",
  description:
    "Explore TravelSense services: travel consultation, custom itineraries, hotel & vehicle booking, visa assistance, and group travel. Everything you need for the perfect trip.",
  path: "/services",
})

export default function ServicesPage() {
  return <ServicesContent />
}
