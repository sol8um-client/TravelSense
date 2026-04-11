import type { Metadata } from "next"
import { sanityClient, allBlogPostsQuery, urlFor } from "@/lib/sanity"
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { BlogGrid } from "@/components/blog/BlogGrid"
import type { BlogPost } from "@/components/blog/BlogCard"

export const revalidate = 3600

export const metadata: Metadata = generatePageMetadata({
  title: "Travel Blog | TravelSense",
  description:
    "Discover travel tips, destination guides, adventure stories, and insider knowledge from TravelSense. Plan your next trip with expert insights.",
  path: "/blog",
})

// ─── Placeholder data when Sanity is unavailable ────────────────────────────

const placeholderPosts: BlogPost[] = [
  {
    _id: "p1",
    title: "10 Hidden Gems in Kerala You Must Visit in 2026",
    slug: "hidden-gems-kerala-2026",
    excerpt:
      "Beyond the backwaters and beaches, Kerala holds secrets that most tourists never discover. From misty tea estates to ancient temples, here are 10 places that will take your breath away.",
    coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=500&fit=crop",
    category: "Destination Guides",
    tags: ["Kerala", "Hidden Gems", "India"],
    readTime: 8,
    featured: true,
    publishedAt: "2026-03-15T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p2",
    title: "Budget Backpacking Through Southeast Asia",
    slug: "budget-backpacking-southeast-asia",
    excerpt:
      "How to explore Thailand, Vietnam, and Cambodia on less than Rs 2,000 a day. A complete guide to budget travel in Southeast Asia.",
    coverImage: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=500&fit=crop",
    category: "Budget Travel",
    tags: ["Budget", "Southeast Asia", "Backpacking"],
    readTime: 12,
    featured: false,
    publishedAt: "2026-03-10T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p3",
    title: "The Ultimate Ladakh Road Trip Checklist",
    slug: "ladakh-road-trip-checklist",
    excerpt:
      "Planning a road trip to Ladakh? From permits to packing, altitude sickness to accommodation, this comprehensive checklist covers everything you need.",
    coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=500&fit=crop",
    category: "Adventure",
    tags: ["Ladakh", "Road Trip", "Adventure"],
    readTime: 10,
    featured: false,
    publishedAt: "2026-03-05T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p4",
    title: "Street Food Tour: Best Eats in Old Delhi",
    slug: "street-food-old-delhi",
    excerpt:
      "Navigate the narrow lanes of Chandni Chowk and discover the best street food that Delhi has to offer. From paranthas to jalebis, a food lover's paradise awaits.",
    coverImage: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&h=500&fit=crop",
    category: "Food & Cuisine",
    tags: ["Delhi", "Street Food", "Food"],
    readTime: 7,
    featured: false,
    publishedAt: "2026-02-28T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p5",
    title: "How to Plan Your First International Trip from India",
    slug: "first-international-trip-india",
    excerpt:
      "A step-by-step guide for first-time international travelers from India. Passports, visas, forex, packing, and everything in between.",
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&h=500&fit=crop",
    category: "Travel Planning",
    tags: ["International Travel", "Planning", "Tips"],
    readTime: 15,
    featured: false,
    publishedAt: "2026-02-20T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p6",
    title: "Understanding the Rich Heritage of Rajasthan",
    slug: "heritage-rajasthan-guide",
    excerpt:
      "From the pink city of Jaipur to the blue streets of Jodhpur, explore the royal heritage, vibrant culture, and timeless architecture of Rajasthan.",
    coverImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=500&fit=crop",
    category: "Culture",
    tags: ["Rajasthan", "Heritage", "Culture"],
    readTime: 9,
    featured: false,
    publishedAt: "2026-02-15T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
]

// ─── Data Fetching ──────────────────────────────────────────────────────────

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await sanityClient.fetch(allBlogPostsQuery)
    if (!posts || posts.length === 0) return placeholderPosts

    return posts.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (post: any) => ({
        _id: post._id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        coverImage: post.coverImage
          ? urlFor(post.coverImage).width(800).height(500).url()
          : undefined,
        category: post.category || "Travel Tips",
        tags: post.tags || [],
        readTime: post.readTime,
        featured: post.featured,
        publishedAt: post.publishedAt,
        author: post.author
          ? {
              name: post.author.name,
              image: post.author.image
                ? urlFor(post.author.image).width(80).height(80).url()
                : undefined,
            }
          : undefined,
      })
    )
  } catch {
    return placeholderPosts
  }
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />

      <PageHero
        title="Travel Blog"
        subtitle="Stories, tips, and guides to inspire your next adventure"
        backgroundImage="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&h=600&fit=crop"
      />

      <div className="bg-[#0A1425]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Blog", href: "/blog" }]}
            className="mb-10"
          />
          <BlogGrid posts={posts} />
        </div>
      </div>
    </>
  )
}
