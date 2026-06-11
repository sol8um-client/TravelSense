import type { Metadata, Viewport } from "next"
import { Fraunces, Outfit, Caveat, Michroma } from "next/font/google"
import { Toaster } from "sonner"
import { LeadModalProvider } from "@/components/shared/LeadCaptureModal"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"
import { MetaPixel } from "@/components/analytics/MetaPixel"
import ScrollToTop from "@/components/shared/ScrollToTop"
import "./globals.css"

// Load Fraunces as a VARIABLE font with the optical-size (opsz) axis so the
// `font-variation-settings: 'opsz' 144` on headings actually renders the dramatic
// high-contrast DISPLAY cut (per the design). Specifying static `weight`s instead
// strips the opsz axis and falls back to the flat text optical size.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
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

export const metadata: Metadata = {
  title: {
    default: "TravelSense - Your Trusted Travel Partner",
    template: "%s | TravelSense",
  },
  description:
    "Curated leisure and adventure travel experiences. Expert consultation, personalized itineraries, and seamless booking by TravelSense, Pune.",
  keywords: [
    "travel",
    "travel packages",
    "adventure travel",
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
    title: "TravelSense - Your Trusted Travel Partner",
    description:
      "Curated leisure and adventure travel experiences. Expert consultation, personalized itineraries, and seamless booking.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelSense - Your Trusted Travel Partner",
    description:
      "Curated travel experiences with expert consultation and personalized itineraries.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Lock the layout to device width and STOP pinch-zoom from going below the
// natural fit (minimumScale 1) - zooming out past 100% was what exposed the
// device-width layout's right edge as a persistent "gap" on every page after a
// pinch in/out. Zoom-IN stays fully allowed (accessibility), and viewport-fit
// cover keeps it edge-to-edge on notched phones.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  themeColor: "#0A1425",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable} ${caveat.variable} ${michroma.variable} grain`}>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <GoogleAnalytics />
        <MetaPixel />
        <LeadModalProvider>
          {children}
        </LeadModalProvider>
        <ScrollToTop />
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
