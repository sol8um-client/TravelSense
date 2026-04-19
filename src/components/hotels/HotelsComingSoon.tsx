"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Building2,
  Search,
  Calendar,
  Users,
  Bell,
  MapPin,
  Loader2,
  ArrowRight,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
}

const inputStyles = cn(
  "border-white/10 bg-white/5 text-white placeholder:text-white/30",
  "focus-visible:border-[#C4324A] focus-visible:ring-[#C4324A]/20"
)

const partnerLogos = [
  "Leading Hotels",
  "OYO Rooms",
  "Taj Hotels",
  "ITC Hotels",
  "Marriott",
  "Lemon Tree",
]

export default function HotelsComingSoon() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success("You're on the list!", {
        description:
          "We'll notify you as soon as hotel booking goes live.",
      })
      setEmail("")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-[#0A1425] py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Mockup Search Bar */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8"
          >
            {/* Coming Soon overlay */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[#0A1425]/60 backdrop-blur-[2px]">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D4A853]/10">
                  <Building2 className="h-8 w-8 text-[#D4A853]" />
                </div>
                <h2 className="mt-4 font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white md:text-3xl">
                  Coming Soon
                </h2>
                <p className="mx-auto mt-2 max-w-md font-body text-sm text-white/50 md:text-base">
                  We are building a seamless hotel booking experience with
                  curated stays across India and international destinations.
                </p>
              </div>
            </div>

            {/* Non-functional search UI */}
            <div className="opacity-40">
              <h3 className="font-heading text-lg font-medium tracking-[-0.015em] leading-[1.15] text-white">
                Search Hotels
              </h3>
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <div>
                  <label className="mb-1.5 block font-body text-xs text-white/50">
                    Destination
                  </label>
                  <div className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3">
                    <MapPin className="h-4 w-4 text-white/30" />
                    <span className="font-body text-sm text-white/30">
                      Where are you going?
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block font-body text-xs text-white/50">
                    Check In
                  </label>
                  <div className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3">
                    <Calendar className="h-4 w-4 text-white/30" />
                    <span className="font-body text-sm text-white/30">
                      Select date
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block font-body text-xs text-white/50">
                    Check Out
                  </label>
                  <div className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3">
                    <Calendar className="h-4 w-4 text-white/30" />
                    <span className="font-body text-sm text-white/30">
                      Select date
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block font-body text-xs text-white/50">
                    Guests
                  </label>
                  <div className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3">
                    <Users className="h-4 w-4 text-white/30" />
                    <span className="font-body text-sm text-white/30">
                      2 Adults
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <div className="flex h-10 items-center gap-2 rounded-lg bg-[#C4324A]/50 px-6">
                  <Search className="h-4 w-4 text-white/60" />
                  <span className="font-body text-sm text-white/60">
                    Search Hotels
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Lead Capture ──────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="mt-12 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C4324A]/10">
              <Bell className="h-6 w-6 text-[#C4324A]" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-medium tracking-[-0.015em] leading-[1.15] text-white">
              Get Notified When We Launch
            </h3>
            <p className="mx-auto mt-2 max-w-md font-body text-sm text-white/50">
              Be the first to know when hotel booking goes live on TravelSense.
              Drop your email and we will keep you posted.
            </p>

            <form
              onSubmit={handleNotify}
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email for hotel booking notification"
                className={cn(inputStyles, "flex-1")}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#C4324A] font-body text-white hover:bg-[#C4324A]/80"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Bell className="h-4 w-4" />
                    Notify Me
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* ── Browse CTAs ────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              asChild
              className="bg-[#C4324A] font-body text-white hover:bg-[#C4324A]/80"
              size="lg"
            >
              <Link href="/packages">
                Browse Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 font-body text-white hover:bg-white/5"
              size="lg"
            >
              <Link href="/consultation">Book Consultation</Link>
            </Button>
          </motion.div>

          {/* ── Partner Logos Placeholder ─────────────────────── */}
          <motion.div variants={fadeUp} custom={3} className="mt-16">
            <p className="text-center font-body text-xs uppercase tracking-widest text-white/30">
              Hotel Partners (Coming Soon)
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {partnerLogos.map((name) => (
                <div
                  key={name}
                  className="flex h-12 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] px-5"
                >
                  <span className="font-heading text-xs font-medium tracking-[-0.015em] leading-[1.15] text-white/20">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
