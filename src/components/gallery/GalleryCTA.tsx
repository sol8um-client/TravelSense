"use client"

import { motion } from "framer-motion"
import { Camera, ArrowRight } from "lucide-react"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"

export function GalleryCTA() {
  const { open } = useLeadModal()

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#0A1425]">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C4324A]/5 via-transparent to-[#D4A853]/5" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#C4324A]/10"
        >
          <Camera className="h-7 w-7 text-[#C4324A]" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-2xl font-normal tracking-wide text-white md:text-3xl"
        >
          Want to Be in Our Next Gallery?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-white/50 md:text-lg"
        >
          Travel with TravelSense and create memories worth capturing. Share
          your travel stories with us and get featured in our gallery.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <button
            onClick={() => open("gallery-cta")}
            className="group inline-flex items-center gap-2 rounded-full bg-[#C4324A] px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-white shadow-lg shadow-[#C4324A]/25 transition-all duration-300 hover:bg-[#A82940] hover:shadow-xl hover:shadow-[#C4324A]/30"
          >
            Start Planning Your Trip
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
