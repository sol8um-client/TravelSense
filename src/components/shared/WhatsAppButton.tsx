"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

interface WhatsAppButtonProps {
  /** Override the default WhatsApp number from site config */
  phoneNumber?: string
  /** Pre-filled message */
  message?: string
  /** Custom class name */
  className?: string
}

export function WhatsAppButton({
  phoneNumber,
  message = "Hi! I'm interested in learning more about your travel packages.",
  className,
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const phone = phoneNumber ?? siteConfig.contact.whatsapp ?? siteConfig.contact.phone
  const cleanPhone = phone.replace(/[^0-9+]/g, "")
  const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(message)}`

  useEffect(() => {
    // Show the button after a short delay for a polished entrance
    const timer = setTimeout(() => setIsVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 transition-all duration-500",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0",
        className
      )}
    >
      {/* Tooltip */}
      <div
        className={cn(
          "absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-lg bg-[#1A1A2E] px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200",
          isHovered
            ? "translate-y-0 opacity-100"
            : "translate-y-1 opacity-0 pointer-events-none"
        )}
      >
        Chat with us on WhatsApp
        {/* Tooltip arrow */}
        <div className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 bg-[#1A1A2E]" />
      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300",
          "bg-[#25D366] text-white hover:bg-[#20BD5A] hover:scale-110 hover:shadow-2xl hover:shadow-[#25D366]/30",
          "active:scale-95"
        )}
        aria-label="Chat on WhatsApp"
      >
        {/* Ping animation */}
        <span className="absolute h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
        <MessageCircle className="relative h-6 w-6 fill-current" />
      </a>
    </div>
  )
}
