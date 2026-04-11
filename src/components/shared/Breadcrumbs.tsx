import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { JsonLd } from "@/components/shared/JsonLd"
import { breadcrumbSchema } from "@/lib/seo"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          allItems.map((item) => ({ name: item.label, url: item.href }))
        )}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center gap-1.5 text-sm text-white/50">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index === 0 ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white/80"
                  >
                    <Home className="h-3.5 w-3.5" />
                  </Link>
                ) : isLast ? (
                  <span className="text-white/80">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white/80"
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight className="h-3 w-3 text-white/30" />
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
