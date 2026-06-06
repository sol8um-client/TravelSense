import { generatePageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import VisaInquiryForm from "@/components/booking/VisaInquiryForm"
import VisaChecklist from "@/components/booking/VisaChecklist"
import VisaServicesPanel from "@/components/booking/VisaServicesPanel"
import VisaPassportHero from "@/components/booking/VisaPassportHero"
import VisaWorldCollage from "@/components/booking/VisaWorldCollage"

export const metadata = generatePageMetadata({
  title: "Visa & Passport Services - Hassle-Free Documentation",
  description:
    "Get expert assistance with visa applications, passport services, document guidance, and interview preparation. Stress-free travel documentation support.",
  path: "/visa-passport",
})

const NAVY = "#0A1425"
const GOLD = "#C9A24B"

export default function VisaPassportPage() {
  return (
    <>
      <Header />
      <main style={{ background: NAVY }}>
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

        {/* ═══════════ HERO - tilted gold-foil passport cover ═══════════ */}
        <VisaPassportHero />

        {/* ═══════════ SERVICES ═══════════ */}
        <section style={{ background: NAVY, padding: "20px 32px 90px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p
                style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-body)",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: GOLD,
                }}
              >
                What we handle
              </p>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading), Georgia, serif",
                  fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Everything,{" "}
                <em style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}>
                  handled.
                </em>
              </h2>
            </div>
            <VisaServicesPanel />
          </div>
        </section>

        {/* ═══════════ PASSPORT SPREAD CHECKLIST ═══════════ */}
        <section
          id="checklist"
          style={{
            background: "linear-gradient(180deg, #0A1425, #0D1A30)",
            padding: "90px 32px",
          }}
        >
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body)",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: GOLD,
                }}
              >
                Document checklist
              </p>
              <h2
                style={{
                  margin: "14px 0 0",
                  fontFamily: "var(--font-heading), Georgia, serif",
                  fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Open your{" "}
                <em style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}>
                  passport.
                </em>
              </h2>
              <p
                style={{
                  margin: "12px auto 0",
                  maxWidth: 520,
                  fontSize: 14.5,
                  color: "rgba(208,213,220,0.55)",
                }}
              >
                Pick a region and a country to see the visa type, fees and exact
                documents you&apos;ll need.
              </p>
            </div>

            <VisaChecklist />
          </div>
        </section>

        {/* ═══════════ INQUIRY FORM ═══════════ */}
        <section id="inquiry" style={{ background: NAVY, padding: "90px 32px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading), Georgia, serif",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Submit a visa{" "}
                <em style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}>
                  inquiry.
                </em>
              </h2>
              <p
                style={{
                  margin: "12px auto 0",
                  maxWidth: 440,
                  fontSize: 14.5,
                  color: "rgba(208,213,220,0.55)",
                }}
              >
                Share your travel details and our visa experts will guide you through
                the process.
              </p>
            </div>
            <VisaInquiryForm />
          </div>
        </section>

        {/* ═══════════ COLLAGE - your world awaits ═══════════ */}
        <section style={{ background: "#0D1A30", padding: "90px 32px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading), Georgia, serif",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Your world{" "}
                <em style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}>
                  awaits.
                </em>
              </h2>
            </div>
            <VisaWorldCollage />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
