import type { Metadata } from "next"
import { Inter, Playfair_Display, Rajdhani, Michroma, Orbitron, Exo_2 } from "next/font/google"
import { LeadModalProvider } from "@/components/shared/LeadCaptureModal"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${rajdhani.variable} ${michroma.variable} ${orbitron.variable} ${exo2.variable} grain`}>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <LeadModalProvider>
          {children}
        </LeadModalProvider>
      </body>
    </html>
  )
}
