import { WHATSAPP_NUMBER } from "@/lib/constants"

/** The single business WhatsApp number, digits only (e.g. "918087453658"). */
export const WHATSAPP_DIGITS = WHATSAPP_NUMBER.replace(/\D/g, "")

/** Human-readable display form used in the header / contact surfaces. */
export const WHATSAPP_DISPLAY = "+91 80874 53658"

/**
 * Build a click-to-chat WhatsApp deep link (wa.me) with an optional prefilled
 * message. Used by every "Talk to a human / expert / us" CTA so they all land
 * in the same inbox.
 */
export function waHref(message?: string): string {
  const text =
    message ?? "Hi TravelSense! I'd like help planning a trip - can you assist?"
  return `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(text)}`
}
