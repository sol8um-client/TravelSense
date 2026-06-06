import { generatePageMetadata } from "@/lib/seo"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import LegalContent from "@/components/legal/LegalContent"
import { siteConfig } from "@/config/site"

export const metadata = generatePageMetadata({
  title: "Terms of Service - TravelSense",
  description:
    "Read the terms and conditions that govern the use of TravelSense travel services and website.",
  path: "/terms-of-service",
})

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <LegalContent
          eyebrow="Legal"
          title="Terms of"
          accent="Service"
          subtitle="Terms and conditions governing the use of TravelSense services."
          crumb="Terms of Service"
          lastUpdated="April 2026"
        >
          <p>
            Welcome to TravelSense. By accessing or using our website and
            services, you agree to be bound by these Terms of Service. Please
            read them carefully before using our platform.
          </p>

          <h2>Services</h2>
          <p>
            TravelSense provides travel consultation, itinerary planning,
            booking assistance, vehicle rental coordination, visa and
            passport services, and related travel services. We act as an
            intermediary between travelers and service providers (hotels,
            transport operators, visa agencies, etc.).
          </p>

          <h2>Booking and Payments</h2>
          <ul>
            <li>All bookings are subject to availability and confirmation.</li>
            <li>Prices displayed are indicative and may vary based on season, availability, and other factors.</li>
            <li>Payment processing is handled through secure third-party payment gateways.</li>
            <li>Full payment or applicable deposit is required to confirm bookings.</li>
          </ul>

          <h2>Cancellations and Refunds</h2>
          <p>
            Cancellation policies vary by service and provider. Specific
            cancellation terms will be communicated at the time of booking.
            Refunds, where applicable, will be processed within 7-14 business
            days to the original payment method.
          </p>

          <h2>User Responsibilities</h2>
          <p>As a user of TravelSense, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information when making inquiries or bookings</li>
            <li>Ensure valid travel documents (passport, visa) are in order before travel</li>
            <li>Comply with all applicable laws and regulations of your travel destination</li>
            <li>Not misuse or attempt to exploit our services or website</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            TravelSense acts as an intermediary and is not liable for
            services provided by third-party vendors including hotels,
            airlines, transport operators, and visa agencies. We are not
            responsible for delays, cancellations, or quality issues caused
            by third-party service providers, natural disasters, or events
            beyond our control.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website including text, graphics, logos,
            images, and software is the property of TravelSense and is
            protected by intellectual property laws. Unauthorized use or
            reproduction is prohibited.
          </p>

          <h2>Modifications</h2>
          <p>
            We reserve the right to update these Terms of Service at any
            time. Changes will be effective immediately upon posting to our
            website. Continued use of our services constitutes acceptance of
            the updated terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes
            arising from these terms shall be subject to the jurisdiction of
            courts in Pune, Maharashtra.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these Terms, please contact us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </LegalContent>
      </main>
      <Footer />
    </>
  )
}
