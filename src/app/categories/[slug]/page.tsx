import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  travelCategories,
  getCategoryBySlug,
} from "@/config/categories"
import { packages } from "@/data/packages"
import { getDestinationBySlug } from "@/data/destinations"
import { packageTags } from "@/data/packageTags"
import {
  generatePageMetadata,
  breadcrumbSchema,
} from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import CategoryContent, {
  type PackageItem,
} from "@/components/categories/CategoryContent"

export const dynamic = "force-static"
// Only the categories defined in config are valid routes - any other slug
// (e.g. the archived /categories/educational) hard-404s instead of rendering.
export const dynamicParams = false

// ─── Static Params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  return travelCategories.map((c) => ({ slug: c.slug }))
}

// ─── Dynamic Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) {
    return generatePageMetadata({
      title: "Category Not Found",
      description: "The category you are looking for does not exist.",
      path: `/categories/${slug}`,
    })
  }
  return generatePageMetadata({
    title: `${category.title}`,
    description: category.longDescription,
    path: `/categories/${category.slug}`,
  })
}

// ─── Real package filtering by category ─────────────────────────────────────
// Pulls live packages from src/data and filters by the category slug, so a
// click on Adventure / Leisure / Educational shows exactly those packages.

// Activity/vibe tags for a package, reusing the packageTags taxonomy. Drop the
// over-broad category labels so chips only ever add a NEW way to slice
// (Trek, River Rafting, Snow & Winter, Wildlife Safari, Beach...).
function activityTagsFor(slug: string): string[] {
  const t = packageTags[slug]
  if (!t) return []
  const merged = [...(t.activities ?? []), ...(t.vibes ?? [])]
  return Array.from(new Set(merged)).filter(
    (x) => /^[A-Z]/.test(x) && x !== "Leisure" && x !== "Adventure",
  )
}

function getCategoryPackages(categorySlug: string): PackageItem[] {
  return packages
    .filter((p) => p.category === categorySlug)
    .map((p) => {
      const dest = getDestinationBySlug(p.destinationSlug)
      return {
        _id: p.slug,
        title: p.title,
        slug: p.slug,
        description: p.description,
        category: p.category,
        duration: p.duration,
        price: p.price,
        discountedPrice: p.discountedPrice,
        heroImage: p.heroImage,
        difficulty: p.difficulty,
        featured: p.featured,
        tags: activityTagsFor(p.slug),
        destination: {
          name: p.destinationName,
          slug: p.destinationSlug,
          region: dest?.region ?? "",
        },
      }
    })
    // Featured first, then by price ascending
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return (a.discountedPrice ?? a.price) - (b.discountedPrice ?? b.price)
    })
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) notFound()

  const categoryPackages = getCategoryPackages(slug)

  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Categories", url: "/categories" },
          { name: category.title, url: `/categories/${category.slug}` },
        ])}
      />

      {/* Header + Footer come from src/app/categories/layout.tsx (shared by the
          whole /categories route group), so this page only renders its body. */}
      <CategoryContent slug={slug} packages={categoryPackages} />
    </>
  )
}
