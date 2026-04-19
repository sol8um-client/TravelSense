import type { Metadata } from "next"
import { Fraunces, Outfit, Caveat, Michroma, Exo_2 } from "next/font/google"
import { Toaster } from "sonner"
import { LeadModalProvider } from "@/components/shared/LeadCaptureModal"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"
import { MetaPixel } from "@/components/analytics/MetaPixel"
import "./globals.css"

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
})

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
})

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "TravelSense — Your Trusted Travel Partner",
    template: "%s | TravelSense",
  },
  description:
    "Curated leisure, adventure, educational, and sports travel experiences. Expert consultation, personalized itineraries, and seamless booking by TravelSense, Pune.",
  keywords: [
    "travel",
    "travel packages",
    "adventure travel",
    "educational travel",
    "sports travel",
    "leisure travel",
    "travel consultation",
    "personalized itinerary",
    "India travel",
    "TravelSense",
    "Pune travel agency",
  ],
  authors: [{ name: "TravelSense" }],
  creator: "Sol8um",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "TravelSense",
    title: "TravelSense — Your Trusted Travel Partner",
    description:
      "Curated leisure, adventure, educational, and sports travel experiences. Expert consultation, personalized itineraries, and seamless booking.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelSense — Your Trusted Travel Partner",
    description:
      "Curated travel experiences with expert consultation and personalized itineraries.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable} ${caveat.variable} ${michroma.variable} ${exo2.variable} grain`}>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <GoogleAnalytics />
        <MetaPixel />
        <LeadModalProvider>
          {children}
        </LeadModalProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0A1425",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  )
}
