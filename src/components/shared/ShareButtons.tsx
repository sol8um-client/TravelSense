"use client"

import { useState } from "react"
import { Share2, Check, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShareButtonsProps {
  url: string
  title: string
  className?: string
}

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = url.startsWith("http") ? url : `${typeof window !== "undefined" ? window.location.origin : ""}${url}`
  const encoded = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const buttons = [
    {
      label: "WhatsApp",
      icon: <MessageCircle className="h-4 w-4" />,
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      color: "hover:bg-green-500/10 hover:text-green-400",
    },
    {
      label: "X",
      icon: <span className="text-xs font-bold">X</span>,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
      color: "hover:bg-white/10 hover:text-white",
    },
    {
      label: "Facebook",
      icon: <span className="text-xs font-bold">f</span>,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      color: "hover:bg-blue-500/10 hover:text-blue-400",
    },
    {
      label: "LinkedIn",
      icon: <span className="text-xs font-bold">in</span>,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      color: "hover:bg-blue-600/10 hover:text-blue-300",
    },
  ]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-xs text-white/40 uppercase tracking-wider">Share</span>
      {buttons.map((btn) => (
        <a
          key={btn.label}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors",
            btn.color
          )}
          aria-label={`Share on ${btn.label}`}
        >
          {btn.icon}
        </a>
      ))}
      <button
        onClick={handleCopy}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Copy link"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Share2 className="h-4 w-4" />}
      </button>
    </div>
  )
}
