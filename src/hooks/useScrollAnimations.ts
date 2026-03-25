"use client"

import { useRef } from "react"
import {
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "framer-motion"

/**
 * Scroll-linked parallax displacement.
 * Returns a MotionValue that shifts the element based on scroll position.
 * Speed > 0 moves slower (parallax), speed < 0 moves faster (reverse parallax).
 */
export function useParallax(ref: React.RefObject<HTMLElement | null>, speed = 0.3) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  return useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed])
}

/**
 * Returns current scroll velocity as a smoothed MotionValue.
 * Useful for speed-responsive animations (e.g., marquee speed).
 */
export function useScrollVelocity() {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  return useSpring(velocity, { stiffness: 100, damping: 30 })
}

/**
 * Magnetic hover effect — element displaces toward cursor.
 * Returns motion values for x, y displacement and rotateX, rotateY tilt.
 */
export function useMagneticHover(strength = 0.15) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })
  const rotateX = useTransform(springY, [-20, 20], [5, -5])
  const rotateY = useTransform(springX, [-20, 20], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { x: springX, y: springY, rotateX, rotateY, handleMouseMove, handleMouseLeave }
}

/**
 * Generates staggered spring animation props for N children.
 * Returns array of { initial, animate, transition } objects.
 */
export function useStaggerReveal(count: number, baseDelay = 0.1) {
  return Array.from({ length: count }, (_, i) => ({
    initial: { opacity: 0, y: 30, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 14,
      delay: i * baseDelay,
    },
  }))
}

/**
 * Section zoom-in effect: content starts at scale 0.98 and reaches 1.0 when centered.
 */
export function useSectionZoom(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  return useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.97])
}
