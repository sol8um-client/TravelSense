import Link from "next/link"
import { generatePageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import VehicleFleet from "@/components/booking/VehicleFleet"
import VehicleRequestForm from "@/components/booking/VehicleRequestForm"
import { Phone, ArrowRight } from "lucide-react"

export const metadata = generatePageMetadata({
  title: "Vehicle Rental Services - Comfortable Travel Transport",
  description:
    "Book reliable vehicles for your trip - sedans, SUVs, tempo travellers, mini buses, and luxury coaches. Affordable rates with experienced drivers across India.",
  path: "/vehicles",
})

export default function VehiclesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Vehicle Rental Services",
            provider: {
              "@type": "TravelAgency",
              name: "TravelSense",
            },
            description:
              "Reliable vehicle rental services for travel across India including sedans, SUVs, tempo travellers, and luxury coaches.",
            areaServed: "IN",
          }}
        />

        {/* ── Cream hero + fleet spec plates + custom card + road banner ──── */}
        <VehicleFleet />

        {/* ═══════════ REQUEST FORM ═══════════ */}
        <section
          id="request"
          className="bg-white px-8 py-[90px]"
          style={{ borderTop: "1px solid rgba(176,184,196,0.18)" }}
        >
          <div className="mx-auto max-w-[680px]">
            <div className="mb-8 text-center">
              <h2
                className="m-0 font-heading font-medium text-primary"
                style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                  letterSpacing: "-0.025em",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Request a{" "}
                <em className="font-normal italic text-secondary" style={{ fontStyle: "italic" }}>
                  vehicle.
                </em>
              </h2>
              <p className="mx-auto mt-3 max-w-[440px] font-body text-[14.5px] text-muted-foreground">
                Tell us your travel details and we&apos;ll match the best vehicle and driver for your
                trip.
              </p>
            </div>
            <VehicleRequestForm variant="light" />
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="relative overflow-hidden bg-[#0A1425]">
          <div className="relative z-[2] mx-auto max-w-[680px] px-8 py-[90px] text-center">
            <h2
              className="m-0 font-heading font-medium text-white"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.025em",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              Planning a whole{" "}
              <em
                className="font-normal italic"
                style={{ fontStyle: "italic", color: "var(--secondary-glow)" }}
              >
                road trip?
              </em>
            </h2>
            <p
              className="mx-auto mt-[18px] max-w-[430px] font-body text-[15.5px]"
              style={{ lineHeight: 1.7, color: "rgba(208,213,220,0.7)" }}
            >
              Our experts pair the right vehicle with a route, stays and stops - one seamless plan.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-[14px]">
              <Link href="/consultation" className="btn btn-primary">
                <Phone size={16} /> Book a consultation
              </Link>
              <Link href="/packages" className="btn btn-ghost">
                Browse packages
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
