import Link from "next/link"
import {
  MapPin,
  Globe,
  Users,
  Compass,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/Container"

const trustBadges = [
  { icon: Users, label: "500+ Happy Travelers" },
  { icon: Globe, label: "50+ Destinations" },
  { icon: Compass, label: "3 Travel Categories" },
]

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(43,165,165,0.3),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(232,146,62,0.15),transparent)]" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite_1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/[0.02] blur-2xl" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Container className="relative z-10 py-24 sm:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Tagline chip */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm animate-[fadeInDown_0.6s_ease-out]">
            <MapPin className="h-4 w-4 text-secondary" />
            TravelSense, Pune
          </div>

          {/* Headline */}
          <h1 className="font-heading max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-[fadeInUp_0.8s_ease-out]">
            Discover the World,{" "}
            <span className="relative">
              <span className="relative z-10 text-secondary">Your Way</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-secondary/20 -skew-x-3 sm:bottom-2 sm:h-4" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            From serene getaways to thrilling adventures, we craft personalized
            travel experiences that turn your dream journeys into unforgettable
            memories.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <Button size="lg" className="bg-secondary text-white hover:bg-secondary-dark shadow-lg shadow-secondary/25" asChild>
              <Link href="/destinations">
                <Globe className="mr-2 h-5 w-5" />
                Explore Destinations
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/50 hover:text-white backdrop-blur-sm"
              asChild
            >
              <Link href="/consultation">
                Book a Consultation
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:gap-10 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 text-white/70"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <badge.icon className="h-5 w-5 text-secondary-light" />
                </div>
                <span className="text-sm font-medium tracking-wide">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
