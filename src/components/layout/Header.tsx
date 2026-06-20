"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { ChevronDown, Phone, Search, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { mainNavItems } from "@/config/navigation"
import { siteConfig } from "@/config/site"
import { waHref } from "@/lib/whatsapp"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"
import { MobileNav } from "@/components/layout/MobileNav"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [navQuery, setNavQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const leadModal = useLeadModal()

  useEffect(() => {
    const onScroll = () => {
      // Collapse the nav (glass shift + links→Menu) only after the hero section.
      const hero = document.querySelector("section")
      const limit = hero
        ? hero.offsetTop + hero.offsetHeight - 96
        : window.innerHeight * 0.8
      setScrolled(window.scrollY > limit)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  // Close the Menu dropdown whenever we expand back to the full nav.
  useEffect(() => {
    if (!scrolled) setMenuOpen(false)
  }, [scrolled])

  const handleDropdownEnter = useCallback((title: string) => setActiveDropdown(title), [])
  const handleDropdownLeave = useCallback(() => setActiveDropdown(null), [])

  // Desktop bar surfaces the core sections incl. About + the Services menu.
  const primaryNav = mainNavItems.slice(0, 5)

  const onNavSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/destinations")
  }

  return (
    <>
      {/* Floating liquid-glass nav pill - navy-blue glass at top → lighter navy glass past the hero */}
      <header
        className={cn(
          "fixed inset-x-0 z-50 flex justify-center px-3 transition-all duration-300 sm:px-4",
          scrolled ? "top-2 sm:top-3" : "top-3 sm:top-4",
        )}
      >
        <div
          className={cn(
            // Always the blue liquid glass (nav-top) - keeps the blue frosted look
            // in both the hero and scrolled states, per design feedback.
            "glass-dark nav-top flex h-14 w-full items-center justify-between gap-2 rounded-full py-1.5 pl-5 pr-1.5 transition-all duration-300",
            scrolled ? "max-w-4xl" : "max-w-5xl",
          )}
        >
          {/* Logo + divider */}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/"
              onClick={(e) => {
                // On the homepage, "/" is the current route so Next won't
                // navigate - smooth-scroll up to the hero instead.
                if (pathname === "/") {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
              className="group flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/brand/logo-emblem.webp"
                alt="TravelSense"
                width={49}
                height={24}
                priority
              />
              <span className="font-body text-[13.5px] font-semibold uppercase leading-none tracking-[0.18em] text-white">
                Travel<span className="font-normal text-white/85">Sense</span>
              </span>
            </Link>
            <span className="hidden h-6 w-px bg-white/15 lg:block" />
          </div>

          {/* Center: nav links (top) ↔ inline "Where to?" planner (scrolled) */}
          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            {scrolled ? (
              <form
                onSubmit={onNavSearch}
                className="flex w-full max-w-[340px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 duration-300 animate-in fade-in slide-in-from-top-1"
              >
                <Search className="h-3.5 w-3.5 shrink-0 text-[#FF8E9E]" />
                <input
                  value={navQuery}
                  onChange={(e) => setNavQuery(e.target.value)}
                  placeholder="Where to?"
                  aria-label="Search destinations"
                  className="glass-text min-w-0 flex-1 bg-transparent text-[13px] font-medium text-white placeholder:text-white/55 focus:outline-none"
                />
              </form>
            ) : (
              <nav className="flex items-center gap-1">
                {primaryNav.map((item) => (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() =>
                      item.children ? handleDropdownEnter(item.title) : undefined
                    }
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[12.5px] font-medium tracking-wide text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                    >
                      {item.title}
                      {item.children && (
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            activeDropdown === item.title && "rotate-180",
                          )}
                        />
                      )}
                    </Link>

                    {/* Services dropdown - dark glass per design */}
                    {item.children && activeDropdown === item.title && (
                      <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                        <div className="min-w-[244px] overflow-hidden rounded-2xl border border-white/10 bg-[#0C162A]/88 p-2 shadow-[0_24px_60px_rgba(3,8,16,0.5)] backdrop-blur-[40px] backdrop-saturate-150 duration-200 animate-in fade-in slide-in-from-top-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-start gap-2.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.07]"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                              <span className="flex flex-col gap-0.5">
                                <span className="text-[13px] font-semibold text-white">
                                  {child.title}
                                </span>
                                {child.description && (
                                  <span className="text-[11px] text-white/55">
                                    {child.description}
                                  </span>
                                )}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex shrink-0 items-center gap-1.5">
            {/* Menu dropdown - appears when scrolled (full nav incl. Blog/Contact) */}
            {scrolled && (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-label="Menu"
                  aria-expanded={menuOpen}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/[0.12]"
                >
                  <span className="flex w-3.5 flex-col gap-[3px]">
                    <span className={cn("h-[1.6px] rounded bg-white transition-transform", menuOpen && "translate-y-[4.6px] rotate-45")} />
                    <span className={cn("h-[1.6px] rounded bg-white transition-opacity", menuOpen && "opacity-0")} />
                    <span className={cn("h-[1.6px] rounded bg-white transition-transform", menuOpen && "-translate-y-[4.6px] -rotate-45")} />
                  </span>
                  Menu
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-[calc(100%+12px)] w-[280px] rounded-2xl border border-white/[0.12] bg-[#0C162A]/88 p-2 shadow-[0_26px_64px_rgba(3,8,16,0.55)] backdrop-blur-[40px] backdrop-saturate-150 duration-200 animate-in fade-in slide-in-from-top-2">
                    {mainNavItems.map((l) =>
                      l.children ? (
                        <div key={l.title} className="py-1">
                          <div className="px-3 pb-1 pt-2 font-tech text-[8.5px] uppercase tracking-[0.18em] text-white/50">
                            {l.title}
                          </div>
                          {l.children.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.07]"
                            >
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                              <span className="text-[13px] font-medium text-white">{c.title}</span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          key={l.title}
                          href={l.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.07]"
                        >
                          <span className="text-[13.5px] font-semibold text-white">{l.title}</span>
                          <ArrowRight className="h-3 w-3 text-white/50" />
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Phone icon + number - opens WhatsApp (number text hides when scrolled, icon stays) */}
            <a
              href={waHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                try {
                  const w = window as unknown as {
                    gtag?: (...args: unknown[]) => void
                  }
                  w.gtag?.("event", "whatsapp_click", { source: "header-phone" })
                } catch {
                  /* analytics is best-effort */
                }
              }}
              className="hidden items-center gap-1.5 rounded-full px-2.5 py-2 text-[12.5px] font-medium text-white/80 transition-colors hover:text-white xl:flex"
            >
              <Phone className="h-3.5 w-3.5 text-[#FF8E9E]" />
              {!scrolled && <span>{siteConfig.contact.phone}</span>}
            </a>

            {/* CTA */}
            <button
              onClick={() => leadModal.open("header")}
              className="metallic-cta hidden h-11 cursor-pointer items-center rounded-full px-5 font-body text-[13px] font-semibold tracking-[0.01em] text-white sm:inline-flex"
            >
              <span className="relative z-10">Plan my trip</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
            >
              <span className="flex w-4 flex-col gap-[3px]">
                <span className="h-[2px] rounded bg-white" />
                <span className="h-[2px] rounded bg-white" />
                <span className="h-[2px] rounded bg-white" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  )
}

export default Header
