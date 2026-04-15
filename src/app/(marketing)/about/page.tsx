import { generatePageMetadata, organizationSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { PageHero } from "@/components/shared/PageHero"
import AboutContent from "@/components/about/AboutContent"

export const metadata = generatePageMetadata({
  title: "About TravelSense — Our Story, Mission & Values",
  description:
    "Learn about TravelSense, founded by Jayshree Lakhotiya with 15+ years of travel expertise. Discover our mission to make curated, stress-free travel accessible to every working professional.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />

      <PageHero
        title="About TravelSense"
        subtitle="Founded by Jayshree Lakhotiya — 15+ years of crafting unforgettable journeys"
        backgroundImage="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&h=1080&fit=crop"
      >
        <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
      </PageHero>

      <AboutContent />
    </>
  )
}
