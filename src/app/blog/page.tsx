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
    title: "10 Hidden Gems in Kashmir Beyond the Tourist Trail",
    slug: "hidden-gems-kashmir-beyond-tourist-trail",
    excerpt:
      "Kashmir is far more than Srinagar and Gulmarg. Discover offbeat valleys, secret meadows, and remote villages that most tourists never see. These hidden gems will redefine your idea of paradise.",
    coverImage: "https://images.unsplash.com/photo-1597074866923-dc0589150bd6?w=800&h=500&fit=crop",
    category: "destination_guides",
    tags: ["Kashmir", "Hidden Gems", "Offbeat Travel"],
    readTime: 8,
    featured: true,
    publishedAt: "2026-03-20T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p2",
    title: "The Ultimate Ladakh Road Trip Checklist for 2026",
    slug: "ultimate-ladakh-road-trip-checklist-2026",
    excerpt:
      "Planning a road trip to Ladakh? From permits and packing to altitude sickness and accommodation, this comprehensive checklist covers everything you need for a safe and unforgettable journey.",
    coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=500&fit=crop",
    category: "travel_tips",
    tags: ["Ladakh", "Road Trip", "Checklist", "Adventure"],
    readTime: 12,
    featured: true,
    publishedAt: "2026-03-15T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p3",
    title: "Why Northeast India Should Be Your Next Adventure",
    slug: "why-northeast-india-next-adventure",
    excerpt:
      "Living root bridges, crystal-clear rivers, vibrant tribal festivals, and landscapes that rival anywhere on earth. Here is why Northeast India deserves a spot on every traveller's bucket list.",
    coverImage: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&h=500&fit=crop",
    category: "destination_guides",
    tags: ["Northeast India", "Meghalaya", "Adventure", "Offbeat"],
    readTime: 10,
    featured: false,
    publishedAt: "2026-03-10T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p4",
    title: "Budget Backpacking Through Rajasthan — A Complete Guide",
    slug: "budget-backpacking-rajasthan-complete-guide",
    excerpt:
      "Rajasthan does not have to break the bank. From budget stays in heritage havelis to free temple visits and cheap local eats, here is how to experience the land of kings on a shoestring budget.",
    coverImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=500&fit=crop",
    category: "travel_tips",
    tags: ["Rajasthan", "Budget Travel", "Backpacking"],
    readTime: 11,
    featured: false,
    publishedAt: "2026-03-05T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p5",
    title: "Kerala Houseboat Guide — Everything You Need to Know",
    slug: "kerala-houseboat-guide-everything-you-need",
    excerpt:
      "A Kerala houseboat stay is a bucket-list experience. Learn how to pick the right houseboat, the best routes through the backwaters, what to expect on board, and how to avoid common tourist traps.",
    coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=500&fit=crop",
    category: "destination_guides",
    tags: ["Kerala", "Houseboat", "Backwaters", "Guide"],
    readTime: 9,
    featured: false,
    publishedAt: "2026-02-28T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p6",
    title: "How to Plan Your First International Trip from India",
    slug: "plan-first-international-trip-from-india",
    excerpt:
      "A step-by-step guide for first-time international travellers from India. Passports, visas, forex, travel insurance, packing, and everything else you need to know before your first flight abroad.",
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&h=500&fit=crop",
    category: "travel_tips",
    tags: ["International Travel", "Planning", "First Trip", "Tips"],
    readTime: 15,
    featured: false,
    publishedAt: "2026-02-20T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p7",
    title: "Street Food Tour — Best Eats in Old Delhi, Varanasi & Jaipur",
    slug: "street-food-tour-delhi-varanasi-jaipur",
    excerpt:
      "From the paranthas of Chandni Chowk to the kachoris of Varanasi and the lassi of Jaipur, this street food tour covers the best eats across three of India's most flavourful cities.",
    coverImage: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&h=500&fit=crop",
    category: "food_and_culture",
    tags: ["Street Food", "Delhi", "Varanasi", "Jaipur", "Food"],
    readTime: 7,
    featured: false,
    publishedAt: "2026-02-15T10:00:00Z",
    author: { name: "TravelSense Team" },
  },
  {
    _id: "p8",
    title: "Char Dham Yatra 2026 — Complete Planning Guide",
    slug: "char-dham-yatra-2026-complete-planning-guide",
    excerpt:
      "Everything you need to plan your Char Dham Yatra in 2026 — registration, best time to visit, route options, helicopter vs road, accommodation, and essential tips for a safe pilgrimage.",
    coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=500&fit=crop",
    category: "destination_guides",
    tags: ["Char Dham", "Pilgrimage", "Uttarakhand", "Planning"],
    readTime: 14,
    featured: true,
    publishedAt: "2026-02-10T10:00:00Z",
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
