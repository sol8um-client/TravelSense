import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HotelsContent from "@/components/hotels/HotelsContent"

export const metadata = generatePageMetadata({
  title: "Hotel Booking - Find Your Perfect Stay",
  description:
    "Search and book hotels across India and international destinations. Budget-friendly to luxury stays, curated by TravelSense. Coming soon.",
  path: "/hotels",
})

export default function HotelsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Hotels", url: "/hotels" },
          ])}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Hotel Booking",
            serviceType: "Hotel booking and curated stays",
            provider: {
              "@type": "TravelAgency",
              name: "TravelSense",
            },
            description:
              "Curated hotel stays across India and international destinations, hand-picked and booked by TravelSense travel experts.",
            areaServed: "IN",
          }}
        />
        <HotelsContent />
      </main>
      <Footer />
    </>
  )
}
