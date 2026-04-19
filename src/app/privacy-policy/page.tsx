import { generatePageMetadata } from "@/lib/seo"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { PageHero } from "@/components/shared/PageHero"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { siteConfig } from "@/config/site"

export const metadata = generatePageMetadata({
  title: "Privacy Policy — TravelSense",
  description:
    "Learn how TravelSense collects, uses, and protects your personal information. Your privacy matters to us.",
  path: "/privacy-policy",
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <PageHero
          title="Privacy Policy"
          subtitle="How we collect, use, and protect your personal information."
        >
          <Breadcrumbs
            items={[{ label: "Privacy Policy", href: "/privacy-policy" }]}
          />
        </PageHero>

        <section className="bg-[#0A1425] py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert prose-sm max-w-none space-y-8 font-body text-white/60 [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-normal [&_h2]:font-medium tracking-[-0.015em] leading-[1.15] [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_strong]:text-white/80">
              <p className="text-sm text-white/40">
                Last updated: April 2026
              </p>

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
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Travel preferences and destination interests</li>
                <li>Booking and inquiry details</li>
                <li>Passport and visa-related information (when you use our visa services)</li>
                <li>Payment information (processed securely through our payment partners)</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
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
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications at any time</li>
              </ul>

              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or your personal
                data, please contact us at{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-[#D4A853] hover:text-[#D4A853]/80 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
