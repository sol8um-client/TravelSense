import { generatePageMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import ContactContent from "@/components/contact/ContactContent"

export const metadata = generatePageMetadata({
  title: "Contact TravelSense - Get In Touch",
  description:
    "Have a question or ready to plan your next trip? Contact TravelSense via phone, email, or WhatsApp. Based in Pune, serving travelers across India.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />
      <ContactContent />
    </>
  )
}
