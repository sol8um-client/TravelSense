"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { X, ChevronDown, Phone, Mail, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { mainNavItems } from "@/config/navigation"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useLeadModal } from "@/components/shared/LeadCaptureModal"

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const leadModal = useLeadModal()

  const toggleExpanded = (title: string) => {
    setExpandedItem((prev) => (prev === title ? null : title))
  }

  const handleLinkClick = () => {
    onOpenChange(false)
    setExpandedItem(null)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300 ease-in-out">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <Link
                href="/"
                onClick={handleLinkClick}
                className="flex items-center gap-2"
              >
                <Image
                  src="/images/brand/logo-final-nobg.png"
                  alt="TravelSense"
                  width={120}
                  height={67}
                  className="h-9 w-auto"
                />
              </Link>
              <Dialog.Close className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Dialog.Close>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <nav className="space-y-1">
                {mainNavItems.map((item) => (
                  <div key={item.title}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleExpanded(item.title)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                        >
                          {item.title}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-muted-foreground transition-transform duration-200",
                              expandedItem === item.title && "rotate-180"
                            )}
                          />
                        </button>

                        {/* Sub-menu */}
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-200",
                            expandedItem === item.title
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          )}
                        >
                          <div className="ml-3 space-y-0.5 border-l-2 border-primary/20 pl-4 pb-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={handleLinkClick}
                                className="group flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
                              >
                                <span className="text-sm font-medium text-foreground group-hover:text-primary">
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
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className="flex items-center rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* CTA */}
              <div className="mt-6 px-3">
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="w-full rounded-full"
                >
                  <button onClick={() => { leadModal.open("mobile-nav"); onOpenChange(false) }}>
                    Book a Free Consultation
                  </button>
                </Button>
              </div>
            </div>

            {/* Contact Info Footer */}
            <div className="border-t border-border px-6 py-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Get in Touch
              </p>
              <div className="space-y-3">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {siteConfig.contact.email}
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {siteConfig.contact.address ?? "Pune, Maharashtra, India"}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MobileNav
