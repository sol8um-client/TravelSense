import Image from "next/image"
import { Sparkles, Wand2, Clock } from "lucide-react"
import { generatePageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { PageHero } from "@/components/shared/PageHero"
import { SectionWave } from "@/components/shared/SectionWave"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ItineraryForm from "@/components/itinerary/ItineraryForm"

export const metadata = generatePageMetadata({
  title: "Itinerary Builder - Plan Your Perfect Trip",
  description:
    "Build a personalized travel itinerary in minutes. Tell us your destination, budget, and interests, and we'll recommend the perfect packages for you.",
  path: "/itinerary-builder",
})

const inspirations = [
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop",
    alt: "Lake surrounded by mountains",
    label: "Mountain lake getaway",
  },
  {
    src: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=350&fit=crop",
    alt: "Traditional boat in Southeast Asia",
    label: "Southeast Asia exploration",
  },
  {
    src: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&h=350&fit=crop",
    alt: "Desert safari adventure",
    label: "Desert safari adventure",
  },
]

export default function ItineraryBuilderPage() {
  return (
    <>
      {/* Standalone route - no layout.tsx, so render the site chrome here */}
      <Header />
      <main className="min-h-screen">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "TravelSense Itinerary Builder",
            applicationCategory: "TravelApplication",
            description:
              "Personalized itinerary builder that recommends curated travel packages based on your destination, budget, and interests.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
            },
          }}
        />

        {/* ── HERO - shared site hero ────────────────────────────────────── */}
        <PageHero
          eyebrow="Plan in minutes"
          title="Your itinerary,"
          accent="built around you."
          subtitle="Tell us what you love, where you want to go, and your budget. We'll craft the perfect travel plan for you."
          crumb="Itinerary Builder"
        >
          {[
            { icon: Wand2, label: "Personalized picks" },
            { icon: Sparkles, label: "Free to use" },
            { icon: Clock, label: "Ready in minutes" },
          ].map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/65 px-3.5 py-1.5 font-body text-[12.5px] font-medium text-primary shadow-[0_6px_18px_rgba(11,20,38,0.06)] backdrop-blur-md"
            >
              <c.icon className="h-3.5 w-3.5 text-secondary" strokeWidth={1.9} />
              {c.label}
            </span>
          ))}
        </PageHero>

        <SectionWave from="#FFFFFF" to="#0A1425" />

        {/* ── BUILDER - navy band keeps the dark-glass form styling intact ── */}
        <section className="relative overflow-hidden bg-[#0A1425] py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-[6%] top-[8%] h-[300px] w-[300px] rounded-full bg-primary-light/20 blur-[90px]" />
            <div
              className="absolute -left-[4%] bottom-[10%] h-[280px] w-[280px] rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(212,168,83,0.10), transparent 70%)", filter: "blur(80px)" }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-start">
              {/* Form column - logic untouched */}
              <div className="lg:col-span-3">
                <ItineraryForm />
              </div>

              {/* Travel inspiration column */}
              <div className="hidden space-y-5 lg:col-span-2 lg:block">
                <div className="mb-1">
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                    Need inspiration?
                  </p>
                  <h2
                    className="mt-2 font-heading text-[1.5rem] font-medium leading-[1.1] tracking-[-0.02em] text-white"
                    style={{ fontVariationSettings: "'opsz' 144" }}
                  >
                    Where dreamers{" "}
                    <span className="italic font-normal text-accent">begin.</span>
                  </h2>
                </div>
                {inspirations.map((img) => (
                  <div
                    key={img.label}
                    className="glass-dark group relative overflow-hidden rounded-2xl p-1.5"
                  >
                    <div className="relative overflow-hidden rounded-xl">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={600}
                        height={380}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/85 via-transparent to-transparent" />
                      <p className="glass-text absolute bottom-3 left-4 font-body text-sm font-medium text-white">
                        {img.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
