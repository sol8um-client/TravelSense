"use client"
import { useRef, useState, useCallback } from "react"

export function use3DTilt(strength = 8) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
    transition: "transform 0.15s ease-out",
  })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rx = ((y - cy) / rect.height) * strength
      const ry = ((cx - x) / rect.width) * strength
      setStyle({
        transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`,
        transition: "transform 0.1s ease-out",
      })
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.4s ease-out",
    })
  }, [])

  return { ref, style, handleMouseMove, handleMouseLeave }
}
