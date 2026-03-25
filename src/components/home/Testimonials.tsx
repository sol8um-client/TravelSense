"use client"

import { useState } from "react"
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  BadgeCheck,
  MessageCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/Container"
import { SectionHeading } from "@/components/shared/SectionHeading"

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review:
      "TravelSense made our family trip to Kerala absolutely magical. Every detail was taken care of, from the houseboat experience to the tea plantation visits. The personalized itinerary was spot-on.",
    initials: "PS",
    color: "bg-primary",
    verified: true,
    tripDestination: "Kerala, Dec 2025",
  },
  {
    name: "Rahul Deshmukh",
    location: "Pune",
    rating: 5,
    review:
      "Booked an adventure package to Ladakh. The trip was perfectly organized, safety measures were excellent, and the experience was truly life-changing. Highly recommend for thrill-seekers!",
    initials: "RD",
    color: "bg-accent",
    verified: true,
    tripDestination: "Ladakh, Oct 2025",
  },
  {
    name: "Ananya Kulkarni",
    location: "Bangalore",
    rating: 5,
    review:
      "The Bali escape package exceeded our expectations. Great hotel choices, smooth transfers, and the sunset temple visit was breathtaking. Will definitely book with TravelSense again.",
    initials: "AK",
    color: "bg-secondary",
    verified: true,
    tripDestination: "Bali, Nov 2025",
  },
  {
    name: "Vikram Mehta",
    location: "Delhi",
    rating: 5,
    review:
      "Organized an educational trip for our school students to Rajasthan. The heritage walks and cultural experiences were curated beautifully. Parents and students were thrilled.",
    initials: "VM",
    color: "bg-violet-600",
    verified: true,
    tripDestination: "Rajasthan, Jan 2026",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating
              ? "fill-secondary text-secondary"
              : "fill-border text-border"
          )}
        />
      ))}
    </div>
  )
}

function TestimonialCard({
  t,
  className,
}: {
  t: (typeof testimonials)[number]
  className?: string
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white border border-border/40 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        // Left accent border
        "before:absolute before:left-0 before:top-6 before:bottom-6 before:w-1 before:rounded-r-full before:bg-secondary/0 before:transition-all before:duration-300 group-hover:before:bg-secondary",
        className
      )}
    >
      <Quote className="absolute top-5 right-5 h-8 w-8 text-muted/80 transition-colors group-hover:text-secondary/30" />

      <StarRating rating={t.rating} />

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{t.review}&rdquo;
      </p>

      {/* Trip destination tag */}
      <div className="mt-3">
        <span className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          {t.tripDestination}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-border/50 pt-5">
        {/* Avatar with initials */}
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white",
            t.color
          )}
        >
          {t.initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-foreground">{t.name}</p>
            {t.verified && (
              <BadgeCheck className="h-4 w-4 text-green-500 shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">{t.location}</p>
        </div>
      </div>

      {/* WhatsApp verify link */}
      {t.verified && (
        <a
          href="https://wa.me/91XXXXXXXXXX?text=I%20want%20to%20verify%20a%20testimonial"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground/70 transition-colors hover:text-green-600"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Speak directly with this traveler
        </a>
      )}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () =>
    setActive((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () =>
    setActive((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section className="py-20 sm:py-28 bg-background-alt">
      <Container>
        <SectionHeading
          title="What Our Travelers Say"
          subtitle="Real stories from verified travelers. Don't just take our word for it — speak directly with them."
        />

        {/* Desktop: card grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>

        {/* Mobile: single card slider */}
        <div className="md:hidden">
          <TestimonialCard t={testimonials[active]} />

          {/* Slider controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === active
                      ? "w-6 bg-secondary"
                      : "w-2 bg-border hover:bg-muted-foreground/30"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
