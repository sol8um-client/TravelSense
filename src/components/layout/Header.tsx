"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { mainNavItems } from "@/config/navigation"
import { siteConfig } from "@/config/site"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"
import { MobileNav } from "@/components/layout/MobileNav"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const leadModal = useLeadModal()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDropdownEnter = useCallback((title: string) => {
    setActiveDropdown(title)
  }, [])

  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  // Desktop pill shows the design's three primary items; the rest stay reachable
  // on mobile (full list below) and in the footer.
  const primaryNav = mainNavItems.slice(0, 3)

  return (
    <>
      {/* Floating pill navbar (per design handoff) */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={cn(
            "mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full bg-[#0A1425]/95 py-1.5 pl-5 pr-1.5 shadow-[0_14px_44px_rgba(11,20,38,0.28)] ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300",
            isScrolled && "max-w-4xl bg-[#0A1425] shadow-[0_10px_30px_rgba(11,20,38,0.35)]"
          )}
        >
          {/* Logo + divider */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/brand/logo-blue-bg.png"
                alt="TravelSense"
                width={160}
                height={90}
                className="h-9 w-auto logo-embossed"
                priority
              />
            </Link>
            <span className="hidden h-6 w-px bg-white/15 lg:block" />
          </div>

          {/* Desktop Navigation — three primary items */}
          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
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
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-light tracking-wide text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                >
                  {item.title}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        activeDropdown === item.title && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.title && (
                  <div className="absolute left-1/2 top-full pt-3 -translate-x-1/2">
                    <div className="min-w-[240px] overflow-hidden rounded-2xl border border-border/80 bg-white p-2 shadow-xl shadow-black/10 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group/item flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
                        >
                          <span className="text-sm font-medium text-foreground group-hover/item:text-primary">
                            {child.title}
                          </span>
                          {child.description && (
                            <span className="text-xs text-muted-foreground">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Phone number - visible on xl+ */}
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="hidden items-center gap-1.5 pr-1 text-[13px] font-medium text-white/75 transition-colors hover:text-white xl:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{siteConfig.contact.phone}</span>
            </a>

            {/* CTA Button */}
            <button
              onClick={() => leadModal.open("header")}
              className="metallic-cta hidden h-11 items-center rounded-full px-5 text-[13px] font-body font-semibold tracking-[0.01em] text-white cursor-pointer sm:inline-flex"
            >
              <span className="relative z-10">Plan my trip</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
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
