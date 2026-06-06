"use client"

import { motion } from "framer-motion"
import { Camera, ArrowRight } from "lucide-react"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"
import { SectionWave } from "@/components/shared/SectionWave"

export function GalleryCTA() {
  const { open } = useLeadModal()

  return (
    <>
      <SectionWave from="#F4F6F9" to="#0A1425" />

      <section className="relative overflow-hidden bg-[#0A1425] px-4 py-16 sm:px-6 sm:py-24">
        {/* brand glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[6%] top-[8%] h-[300px] w-[300px] rounded-full bg-primary-light/20 blur-[90px]" />
          <div
            className="absolute -left-[4%] bottom-[6%] h-[280px] w-[280px] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(212,168,83,0.10), transparent 70%)", filter: "blur(80px)" }}
          />
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent"
          >
            <Camera className="h-6 w-6" strokeWidth={1.8} />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-[1.9rem] font-medium leading-[1.1] tracking-[-0.025em] text-white sm:text-[2.4rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Want to be in our{" "}
            <span className="italic font-normal text-accent">next gallery?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-md font-body text-[15px] leading-[1.7] text-white/55"
          >
            Travel with TravelSense and create memories worth capturing. Share your travel stories with us and get featured in our gallery.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <button
              onClick={() => open("gallery-cta")}
              className="btn btn-primary group"
              style={{ padding: "15px 30px", fontSize: 14 }}
            >
              Start planning your trip
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
