/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Track a custom event with Google Analytics 4.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (typeof window === "undefined") return
  const w = window as any
  if (typeof w.gtag === "function") {
    w.gtag("event", eventName, params)
  }
}

/**
 * Track a page view (useful for SPA-style navigation).
 */
export function trackPageView(url: string) {
  if (typeof window === "undefined") return
  const w = window as any
  if (typeof w.gtag === "function") {
    w.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

/**
 * Track a Meta Pixel custom event.
 */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (typeof window === "undefined") return
  const w = window as any
  if (typeof w.fbq === "function") {
    w.fbq("track", eventName, params)
  }
}

/**
 * Track a lead conversion across both GA4 and Meta Pixel.
 */
export function trackLead(params?: {
  source?: string
  destination?: string
  value?: number
}) {
  trackEvent("generate_lead", params)
  trackMetaEvent("Lead", params)
}

/**
 * Track a form submission.
 */
export function trackFormSubmit(formName: string) {
  trackEvent("form_submit", { form_name: formName })
  trackMetaEvent("SubmitApplication", { form_name: formName })
}
