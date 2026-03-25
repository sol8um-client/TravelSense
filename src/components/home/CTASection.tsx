import Link from "next/link"
import { Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/Container"

export default function CTASection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(43,165,165,0.25),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_20%,rgba(232,146,62,0.15),transparent)]" />

      {/* Decorative shapes */}
      <div className="absolute top-10 right-20 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute bottom-10 left-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Plan Your{" "}
            <span className="text-secondary">Dream Trip?</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/80">
            Book a free consultation with our travel experts. We will help you
            design a personalized itinerary that fits your budget, timeline, and
            travel style perfectly.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <Button
              size="lg"
              className="bg-secondary text-white hover:bg-secondary-dark shadow-lg shadow-secondary/25"
              asChild
            >
              <Link href="/consultation">
                <Phone className="mr-2 h-5 w-5" />
                Book Free Consultation
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/50 hover:text-white backdrop-blur-sm"
              asChild
            >
              <Link href="/destinations">
                Browse Destinations
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/50">
            No commitment required. Speak with an expert today.
          </p>
        </div>
      </Container>
    </section>
  )
}
