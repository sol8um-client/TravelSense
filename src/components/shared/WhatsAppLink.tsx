"use client"

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react"
import { waHref } from "@/lib/whatsapp"

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Where the click came from (e.g. "header", "hero", "package-detail") — sent
   *  to analytics so we can see how many people open WhatsApp from each spot. */
  source: string
  /** Optional prefilled message (defaults to a generic planning enquiry). */
  message?: string
  children: ReactNode
}

/**
 * A link that opens the business WhatsApp chat and fires a `whatsapp_click`
 * analytics event. NOTE: WhatsApp does NOT hand back the visitor's phone number
 * when they tap a wa.me link, so we can only record the *click* (intent) here,
 * not the number of someone who opens WhatsApp but doesn't send a message. To
 * actually capture a phone number you need a form step before the redirect —
 * that's what the lead forms on the Contact / request pages are for.
 */
export function WhatsAppLink({ source, message, children, onClick, ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    try {
      const w = window as unknown as {
        gtag?: (...args: unknown[]) => void
        dataLayer?: unknown[]
        fbq?: (...args: unknown[]) => void
      }
      w.gtag?.("event", "whatsapp_click", { source })
      w.dataLayer?.push({ event: "whatsapp_click", source })
      w.fbq?.("trackCustom", "WhatsAppClick", { source })
    } catch {
      /* analytics is best-effort */
    }
    onClick?.(e)
  }

  return (
    <a
      href={waHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-wa-source={source}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  )
}

export default WhatsAppLink
