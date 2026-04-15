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

      {/* ── Map Section ─────────────────────────────────────── */}
      <section className="bg-[#060B15]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          {/* Heading + Address */}
          <div className="mb-8 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-[#C4324A]" />
              <h2 className="font-heading text-lg tracking-wider text-white/90 uppercase">
                Our Location
              </h2>
            </div>
            <p className="font-body text-sm text-white/50">
              Pune, Maharashtra, India
            </p>
          </div>

          {/* Map embed */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A1425]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.68092556046!2d73.72287834081918!3d18.524600199498765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
              title="TravelSense office location — Pune, Maharashtra, India"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </section>
    </>
  )
}
