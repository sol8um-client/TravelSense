import {
  Sparkles,
  BadgePercent,
  ShieldCheck,
  Phone,
  PhoneOff,
  Bot,
  Users,
  MessageCircle,
  HeartHandshake,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/Container"

const supportingFeatures = [
  {
    icon: Sparkles,
    title: "Personalized Itineraries",
    description:
      "Every trip is tailored to your preferences, budget, and travel style. No cookie-cutter plans.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: BadgePercent,
    title: "Best Prices Guaranteed",
    description:
      "We negotiate exclusive deals with our partners so you always get the best value.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: ShieldCheck,
    title: "Hassle-Free Booking",
    description:
      "Transparent pricing, easy cancellation, and a seamless experience from start to finish.",
    color: "text-primary-light",
    bgColor: "bg-primary/10",
  },
]

export default function WhyChooseUs() {
  return (
    <section>
      {/* ═══ HERO USP BLOCK — 24/7 Human Assistance ═══ */}
      <div className="relative bg-primary py-20 sm:py-28 overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative blurs */}
        <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-accent/8 blur-3xl" />

        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm mb-6">
                <HeartHandshake className="h-4 w-4 text-secondary" />
                What Sets Us Apart
              </div>

              <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Real Humans.{" "}
                <span className="text-secondary">Real Help.</span>{" "}
                <span className="text-accent">24/7.</span>
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-white/70 max-w-lg">
                When you travel with us, you get a dedicated human travel
                assistant — not a chatbot, not an automated menu, not a queue.
                Just a real person who cares about your journey, available
                round the clock.
              </p>

              {/* What we DON'T do — crossed out */}
              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  { icon: PhoneOff, label: "No IVR Menus" },
                  { icon: Bot, label: "No Chatbots" },
                  { icon: Users, label: "No Long Queues" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2"
                  >
                    <item.icon className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-medium text-white/70 line-through decoration-red-400/60">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* What we DO */}
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/10 border border-white/10 px-5 py-4 backdrop-blur-sm max-w-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    One call. One real person. Zero wait.
                  </p>
                  <p className="text-xs text-white/50 mt-0.5">
                    Available on call, WhatsApp, and chat — 24 hours a day
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Visual — Chat mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                {/* Phone frame */}
                <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 shadow-2xl">
                  {/* Chat header */}
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 mb-3">
                    <div className="h-9 w-9 rounded-full bg-secondary/30 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        TravelSense Support
                      </p>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        <p className="text-xs text-green-400">Online now</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="space-y-3 px-2">
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="rounded-2xl rounded-br-md bg-secondary/80 px-4 py-2.5 max-w-[80%]">
                        <p className="text-sm text-white">
                          Hi! I need help planning a Bali trip for 2 people 🏝️
                        </p>
                      </div>
                    </div>

                    {/* Agent message */}
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-md bg-white/15 px-4 py-2.5 max-w-[85%]">
                        <p className="text-sm text-white/90">
                          Hey! I&apos;m Priya, your travel assistant. I&apos;d love to
                          help! 😊 When are you planning to travel?
                        </p>
                      </div>
                    </div>

                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="rounded-2xl rounded-br-md bg-secondary/80 px-4 py-2.5 max-w-[80%]">
                        <p className="text-sm text-white">March end, 5 nights</p>
                      </div>
                    </div>

                    {/* Agent message */}
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-md bg-white/15 px-4 py-2.5 max-w-[85%]">
                        <p className="text-sm text-white/90">
                          Perfect timing! Let me create a personalized itinerary
                          for you. I&apos;ll call you in 10 mins? 📞
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Response time badge */}
                  <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 py-2 px-3">
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                    <p className="text-xs font-medium text-green-400">
                      Average response time: under 30 seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ═══ SUPPORTING FEATURES ═══ */}
      <div className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supportingFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group relative flex flex-col rounded-2xl bg-white border border-border/50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                    feature.bgColor
                  )}
                >
                  <feature.icon
                    className={cn("h-7 w-7", feature.color)}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>

                {/* Hover accent bar */}
                <div
                  className={cn(
                    "absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100",
                    feature.color === "text-secondary"
                      ? "bg-secondary"
                      : feature.color === "text-accent"
                        ? "bg-accent"
                        : "bg-primary"
                  )}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
