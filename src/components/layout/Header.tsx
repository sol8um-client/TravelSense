"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { mainNavItems } from "@/config/navigation"
import { siteConfig } from "@/config/site"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/Container"
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

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary",
          isScrolled && "shadow-lg"
        )}
      >
        <Container>
          <div className="flex h-18 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/brand/logo-blue-bg.png"
                alt="TravelSense"
                width={160}
                height={90}
                className="h-11 w-auto sm:h-13 logo-embossed"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {mainNavItems.map((item) => (
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
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-light tracking-wide transition-colors duration-200 text-white/60 hover:bg-white/10 hover:text-white"
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
                    <div className="absolute left-1/2 top-full pt-2 -translate-x-1/2">
                      <div className="min-w-[240px] overflow-hidden rounded-xl border border-border/80 bg-white p-2 shadow-xl shadow-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
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
            <div className="flex items-center gap-3">
              {/* Phone number - visible on xl+ */}
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className={cn(
                  "hidden items-center gap-2 text-sm font-medium transition-colors xl:flex text-white/80 hover:text-white"
                )}
              >
                <Phone className="h-4 w-4" />
                <span>{siteConfig.contact.phone}</span>
              </a>

              {/* CTA Button */}
              <button
                onClick={() => leadModal.open("header")}
                className="metallic-cta hidden sm:inline-flex items-center px-6 py-2.5 text-[11px] font-normal text-white tracking-[0.15em] uppercase cursor-pointer"
              >
                <span className="relative z-10">Book Consultation</span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileNavOpen(true)}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden text-white hover:bg-white/10"
                )}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation */}
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  )
}

export default Header
