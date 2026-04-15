import Image from "next/image"
import { generatePageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { PageHero } from "@/components/shared/PageHero"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ConsultationForm from "@/components/booking/ConsultationForm"
import {
  Headphones,
  Globe,
  IndianRupee,
  ShieldCheck,
} from "lucide-react"

export const metadata = generatePageMetadata({
  title: "Book a Free Travel Consultation",
  description:
    "Schedule a free one-on-one consultation with our travel experts. Get personalized trip recommendations, itinerary advice, and budget planning tailored to your needs.",
  path: "/consultation",
})

const benefits = [
  {
    icon: Headphones,
    title: "Expert Guidance",
    description:
      "Speak directly with a seasoned travel specialist who understands your needs and can recommend the perfect trip.",
  },
  {
    icon: Globe,
    title: "Personalized Itineraries",
    description:
      "Receive a custom travel plan built around your interests, schedule, and travel style — no cookie-cutter packages.",
  },
  {
    icon: IndianRupee,
    title: "Budget Optimization",
    description:
      "Get the most out of your travel budget with insider tips on deals, seasonal pricing, and smart booking strategies.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Obligation",
    description:
      "Our consultation is completely free with no strings attached. Explore your options before making any commitments.",
  },
]

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

        <PageHero
          title="Free Travel Consultation"
          subtitle="Tell us about your dream trip and our travel experts will craft the perfect plan for you — completely free."
          backgroundImage="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop"
        >
          <Breadcrumbs
            items={[{ label: "Consultation", href: "/consultation" }]}
          />
        </PageHero>

        {/* ── Benefits Section ────────────────────────────────── */}
        <section className="bg-[#0A1425] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
                Why Book a Consultation?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-body text-sm text-white/50 md:text-base">
                Planning a trip can be overwhelming. Let our experts do the heavy
                lifting so you can focus on the excitement.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-[#C4324A]/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C4324A]/10 text-[#C4324A] transition-colors group-hover:bg-[#C4324A]/20">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-sm font-normal tracking-wide text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/50">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Form Section with Travel Imagery ────────────────── */}
        <section className="bg-[#0D1A30] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
                Schedule Your Consultation
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-body text-sm text-white/50 md:text-base">
                Fill in a few details and we will reach out to schedule a call at
                your convenience.
              </p>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
              {/* Travel imagery column */}
              <div className="hidden space-y-6 lg:block">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&h=500&fit=crop"
                    alt="Couple planning a trip with a world map"
                    width={800}
                    height={500}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/80 to-transparent" />
                  <p className="absolute bottom-4 left-4 font-body text-sm text-white/80">
                    Your dream trip starts with a conversation
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop"
                    alt="Scenic lake surrounded by mountains"
                    width={800}
                    height={400}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/80 to-transparent" />
                </div>
              </div>

              {/* Form column */}
              <div className="mx-auto w-full max-w-xl lg:max-w-none">
                <ConsultationForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
