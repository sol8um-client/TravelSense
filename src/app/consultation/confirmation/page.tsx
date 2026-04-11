import { generatePageMetadata } from "@/lib/seo"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { PageHero } from "@/components/shared/PageHero"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  ClipboardList,
  PhoneCall,
  Map,
  ArrowRight,
} from "lucide-react"

export const metadata = generatePageMetadata({
  title: "Consultation Confirmed",
  description:
    "Your consultation request has been received. Our travel experts will be in touch shortly.",
  path: "/consultation/confirmation",
  noIndex: true,
})

const steps = [
  {
    icon: ClipboardList,
    title: "We Review Your Request",
    description:
      "Our team reviews your travel preferences, dates, and interests to prepare tailored recommendations.",
  },
  {
    icon: PhoneCall,
    title: "Expert Calls You",
    description:
      "A dedicated travel expert will call you at your preferred time to discuss your trip in detail.",
  },
  {
    icon: Map,
    title: "Itinerary Created",
    description:
      "Based on our conversation, we craft a personalized itinerary and share it with you for review.",
  },
]

export default function ConsultationConfirmationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <PageHero
          title="Thank You!"
          subtitle="Your consultation request has been received."
        >
          <Breadcrumbs
            items={[
              { label: "Consultation", href: "/consultation" },
              { label: "Confirmation", href: "/consultation/confirmation" },
            ]}
          />
        </PageHero>

        {/* ── Confirmation Content ────────────────────────────── */}
        <section className="bg-[#0A1425] py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>
            </div>

            <div className="mt-6 text-center">
              <h2 className="font-heading text-xl font-normal tracking-wide text-white md:text-2xl">
                Your consultation is booked
              </h2>
              <p className="mx-auto mt-3 max-w-lg font-body text-sm leading-relaxed text-white/50 md:text-base">
                We have received your details and our travel experts are already
                looking into the best options for you. Here is what happens next:
              </p>
            </div>

            {/* Steps */}
            <div className="mt-12 space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C4324A]/10 text-[#C4324A]">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-body text-xs font-semibold text-[#D4A853]">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="mt-1 font-heading text-sm font-normal tracking-wide text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 font-body text-sm leading-relaxed text-white/50">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                className="bg-[#C4324A] font-body text-white hover:bg-[#C4324A]/80"
                size="lg"
              >
                <Link href="/packages">
                  Browse Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 font-body text-white hover:bg-white/5"
                size="lg"
              >
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
