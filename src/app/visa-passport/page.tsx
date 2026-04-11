import Link from "next/link"
import { generatePageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { PageHero } from "@/components/shared/PageHero"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import VisaInquiryForm from "@/components/booking/VisaInquiryForm"
import { Button } from "@/components/ui/button"
import {
  FileCheck2,
  BookOpen,
  FileText,
  Mic2,
  ArrowRight,
} from "lucide-react"

export const metadata = generatePageMetadata({
  title: "Visa & Passport Services — Hassle-Free Documentation",
  description:
    "Get expert assistance with visa applications, passport services, document guidance, and interview preparation. Stress-free travel documentation support.",
  path: "/visa-passport",
})

const services = [
  {
    icon: FileCheck2,
    title: "Visa Application",
    description:
      "End-to-end visa application support for tourist, business, and transit visas. We handle paperwork, appointments, and follow-ups.",
  },
  {
    icon: BookOpen,
    title: "Passport Services",
    description:
      "New passport applications, renewals, name corrections, and tatkal processing. Guidance through every step of the process.",
  },
  {
    icon: FileText,
    title: "Document Guidance",
    description:
      "Complete checklist of required documents, formatting guidelines, and verification support to ensure your application is accepted.",
  },
  {
    icon: Mic2,
    title: "Interview Preparation",
    description:
      "Mock interview sessions and preparation guides for countries that require visa interviews. Boost your confidence and approval odds.",
  },
]

const popularDestinations = [
  { name: "Thailand", flag: "\u{1F1F9}\u{1F1ED}", type: "Visa on Arrival" },
  { name: "Dubai (UAE)", flag: "\u{1F1E6}\u{1F1EA}", type: "e-Visa" },
  { name: "Singapore", flag: "\u{1F1F8}\u{1F1EC}", type: "e-Visa" },
  { name: "Malaysia", flag: "\u{1F1F2}\u{1F1FE}", type: "e-Visa / eNTRI" },
  { name: "Sri Lanka", flag: "\u{1F1F1}\u{1F1F0}", type: "ETA" },
  { name: "Indonesia (Bali)", flag: "\u{1F1EE}\u{1F1E9}", type: "Visa on Arrival" },
  { name: "Vietnam", flag: "\u{1F1FB}\u{1F1F3}", type: "e-Visa" },
  { name: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", type: "Standard Visa" },
  { name: "United States", flag: "\u{1F1FA}\u{1F1F8}", type: "B1/B2 Visa" },
  { name: "Schengen (Europe)", flag: "\u{1F1EA}\u{1F1FA}", type: "Schengen Visa" },
  { name: "Japan", flag: "\u{1F1EF}\u{1F1F5}", type: "Tourist Visa" },
  { name: "Australia", flag: "\u{1F1E6}\u{1F1FA}", type: "eVisitor / ETA" },
]

export default function VisaPassportPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Visa & Passport Services",
            provider: {
              "@type": "TravelAgency",
              name: "TravelSense",
            },
            description:
              "Expert visa and passport assistance including application support, document guidance, and interview preparation.",
            areaServed: "IN",
          }}
        />

        <PageHero
          title="Visa & Passport Services"
          subtitle="Stress-free documentation assistance so you can focus on planning your trip, not the paperwork."
        >
          <Breadcrumbs
            items={[{ label: "Visa & Passport", href: "/visa-passport" }]}
          />
        </PageHero>

        {/* ── Services Grid ───────────────────────────────────── */}
        <section className="bg-[#0A1425] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
                Our Services
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-body text-sm text-white/50 md:text-base">
                From application to approval, we guide you through every step of
                the visa and passport process.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-[#C4324A]/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C4324A]/10 text-[#C4324A] transition-colors group-hover:bg-[#C4324A]/20">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-sm font-normal tracking-wide text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/50">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Popular Destinations ─────────────────────────────── */}
        <section className="bg-[#0D1A30] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
                Popular Visa Destinations
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-body text-sm text-white/50 md:text-base">
                We assist with visa applications for these popular destinations
                and many more.
              </p>
            </div>

            <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {popularDestinations.map((dest) => (
                <div
                  key={dest.name}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur transition-colors hover:border-white/20"
                >
                  <span className="text-2xl" role="img" aria-label={`${dest.name} flag`}>
                    {dest.flag}
                  </span>
                  <div>
                    <p className="font-body text-sm font-medium text-white">
                      {dest.name}
                    </p>
                    <p className="font-body text-xs text-[#D4A853]">
                      {dest.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Inquiry Form ────────────────────────────────────── */}
        <section className="bg-[#0A1425] py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
                Submit a Visa Inquiry
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-body text-sm text-white/50 md:text-base">
                Share your travel details and our visa experts will guide you
                through the process.
              </p>
            </div>

            <div className="mt-10">
              <VisaInquiryForm />
            </div>
          </div>
        </section>

        {/* ── CTA Section ────────────────────────────────────── */}
        <section className="bg-[#0D1A30] py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
              Have Questions About Visa Requirements?
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-sm text-white/50 md:text-base">
              Our visa experts are here to help you navigate the documentation
              process. Reach out and we will guide you every step of the way.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                className="bg-[#C4324A] font-body text-white hover:bg-[#C4324A]/80"
                size="lg"
              >
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 font-body text-white hover:bg-white/5"
                size="lg"
              >
                <Link href="/consultation">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
