import { generatePageMetadata, organizationSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { PageHero } from "@/components/shared/PageHero"
import ContactForm from "@/components/contact/ContactForm"
import ContactInfo from "@/components/contact/ContactInfo"
import { MapPin } from "lucide-react"

export const metadata = generatePageMetadata({
  title: "Contact TravelSense — Get In Touch",
  description:
    "Have a question or ready to plan your next trip? Contact TravelSense via phone, email, or WhatsApp. Based in Pune, serving travelers across India.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />

      <PageHero
        title="Get In Touch"
        subtitle="Questions, ideas, or ready to plan? We'd love to hear from you."
      >
        <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      </PageHero>

      {/* ── Form + Info grid ──────────────────────────────────── */}
      <section className="bg-[#0A1425] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Form — wider column */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            {/* Info — narrower column */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* ── Map placeholder ───────────────────────────────────── */}
      <section className="bg-[#060B15]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A1425]">
            <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
                <MapPin className="h-6 w-6 text-white/30" />
              </div>
              <p className="mt-4 font-heading text-sm tracking-wider text-white/40">
                Interactive Map Coming Soon
              </p>
              <p className="mt-1 font-body text-xs text-white/25">
                Pune, Maharashtra, India
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
