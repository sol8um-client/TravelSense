"use client"

import { Glasses, ShoppingBag, Sparkles, ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"

export default function ComingSoon() {
  const features = [
    {
      icon: Glasses,
      title: "AR/VR Destination Preview",
      description:
        "Experience destinations before you travel. Walk through hotels, explore landmarks, and preview activities — all from the comfort of your home.",
      highlights: [
        "360° hotel room walkthroughs",
        "Virtual landmark exploration",
        "Activity & experience previews",
      ],
      gradient: "from-primary via-primary-light to-primary",
      accentGlow: "bg-secondary/20",
    },
    {
      icon: ShoppingBag,
      title: "One-Stop Travel Marketplace",
      description:
        "Book flights, accommodation, travel gear, and local experiences — everything you need for your trip, all in one place.",
      highlights: [
        "Flights & accommodation",
        "Travel gear & essentials",
        "Local experiences & activities",
      ],
      gradient: "from-primary-light via-primary to-primary",
      accentGlow: "bg-accent/20",
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary mb-6">
            <Sparkles className="h-4 w-4" />
            Coming Soon
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
            The Future of Travel
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            We&apos;re building the next generation of travel tools to make your
            journeys even more seamless and exciting.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Gradient top section */}
                <div
                  className={`relative h-44 bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                >
                  {/* Floating decorative elements */}
                  <div className="absolute top-4 right-4 h-20 w-20 rounded-full bg-white/5 animate-[float_6s_ease-in-out_infinite]" />
                  <div className="absolute bottom-4 left-4 h-14 w-14 rounded-full bg-white/5 animate-[float_8s_ease-in-out_infinite_1s]" />

                  {/* Icon */}
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-10 w-10 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Shimmer badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white uppercase tracking-wider"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.35), rgba(255,255,255,0.15))",
                        backgroundSize: "200% auto",
                        animation: "shimmer 3s linear infinite",
                      }}
                    >
                      <Sparkles className="h-3 w-3" />
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* Highlights list */}
                  <ul className="mt-4 space-y-2">
                    {feature.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                          <ArrowRight className="h-3 w-3 text-secondary" />
                        </div>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Notify CTA */}
                  <button
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                    onClick={() => {
                      /* TODO: Notify me flow */
                    }}
                  >
                    Notify Me When It Launches
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
