"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  className?: string
  children?: React.ReactNode
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[320px] items-center justify-center overflow-hidden bg-[#0A1425] px-4 pt-20 pb-12 md:min-h-[400px] md:pt-24",
        className
      )}
    >
      {/* Background image with overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-[#0A1425]/80" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1425]/60 via-transparent to-[#0A1425]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hx font-heading text-4xl font-medium tracking-[-0.02em] leading-[1.04] text-white md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 font-body text-base text-white/60 md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
