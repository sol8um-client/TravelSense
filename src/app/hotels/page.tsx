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
        >
          <Breadcrumbs items={[{ label: "Hotels", href: "/hotels" }]} />
        </PageHero>

        <HotelsComingSoon />
      </main>
      <Footer />
    </>
  )
}
