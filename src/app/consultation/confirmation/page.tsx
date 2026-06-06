import { generatePageMetadata } from "@/lib/seo"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ConfirmationContent from "@/components/booking/ConfirmationContent"

export const metadata = generatePageMetadata({
  title: "Consultation Confirmed",
  description:
    "Your consultation request has been received. Our travel experts will be in touch shortly.",
  path: "/consultation/confirmation",
  noIndex: true,
})

export default function ConsultationConfirmationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ConfirmationContent />
      </main>
      <Footer />
    </>
  )
}
