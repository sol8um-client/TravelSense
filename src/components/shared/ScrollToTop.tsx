"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

/**
 * ScrollToTop - a minimal, subtle liquid-glass button that fades in once the
 * visitor scrolls past the hero and returns them smoothly to the top (the hero,
 * on the homepage). Bottom-right, unobtrusive; hidden while still in the hero.
 */
export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:-translate-y-0.5 sm:bottom-6 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{
        background: "rgba(255,255,255,0.6)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "0 8px 24px rgba(11,20,38,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      <ChevronUp
        className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5"
        strokeWidth={2.2}
      />
    </button>
  )
}
