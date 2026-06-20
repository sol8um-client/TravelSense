"use client"

import { useEffect, useState } from "react"

/**
 * Auto-hide-on-scroll for sticky chrome (filter/sort bars).
 *
 * Returns `true` when the bar should be HIDDEN — i.e. the user is scrolling DOWN
 * (reading more results). Returns `false` (shown) when scrolling UP or near the
 * top, so the controls are there the moment the user reaches for them but never
 * eat screen space while browsing.
 *
 * @param revealTop  px from the top below which the bar is always shown.
 */
export function useHideOnScrollDown(revealTop = 220): boolean {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const delta = y - last
      // Ignore tiny jitters; require a deliberate scroll.
      if (Math.abs(delta) > 6) {
        if (y < revealTop) setHidden(false)
        else setHidden(delta > 0) // down → hide, up → show
        last = y
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [revealTop])

  return hidden
}
