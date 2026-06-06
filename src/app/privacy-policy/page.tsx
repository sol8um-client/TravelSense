import { generatePageMetadata } from "@/lib/seo"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import LegalContent from "@/components/legal/LegalContent"
import { siteConfig } from "@/config/site"

export const metadata = generatePageMetadata({
  title: "Privacy Policy - TravelSense",
  description:
    "Learn how TravelSense collects, uses, and protects your personal information. Your privacy matters to us.",
  path: "/privacy-policy",
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <LegalContent
          eyebrow="Legal"
          title="Privacy"
          accent="Policy"
          subtitle="How we collect, use, and protect your personal information."
          crumb="Privacy Policy"
          lastUpdated="April 2026"
        >
          <p>
            TravelSense (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy
            of our users. This Privacy Policy explains how we collect, use,
            and safeguard your personal information when you visit our
            website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide
            when using our services, including:
          </p>
          <ul>
            <li>Name, email address, and phone number</li>
            <li>Travel preferences and destination interests</li>
            <li>Booking and inquiry details</li>
            <li>Passport and visa-related information (when you use our visa services)</li>
            <li>Payment information (processed securely through our payment partners)</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your travel bookings and inquiries</li>
            <li>Provide personalized travel recommendations</li>
            <li>Send you relevant travel deals and newsletters (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Data Protection</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We may share your information with trusted third parties such as
            hotel partners, transport providers, and payment processors
            solely for the purpose of fulfilling your travel bookings.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website uses cookies to enhance your browsing experience and
            analyze website traffic. You can control cookie preferences
            through your browser settings.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications at any time</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your personal
            data, please contact us at{" "}
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
