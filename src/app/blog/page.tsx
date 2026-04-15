import type { Metadata } from "next"
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { PageHero } from "@/components/shared/PageHero"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { BlogGrid } from "@/components/blog/BlogGrid"
import { blogPosts, categoryDisplayNames } from "@/data/blog"
import type { BlogPost } from "@/components/blog/BlogCard"

export const metadata: Metadata = generatePageMetadata({
  title: "Travel Blog | TravelSense",
  description:
    "Discover travel tips, destination guides, adventure stories, and insider knowledge from TravelSense. Plan your next trip with expert insights.",
  path: "/blog",
})

// ─── Map static data to BlogCard shape ─────────────────────────────────────

function mapToBlogPosts(): BlogPost[] {
  return blogPosts.map((post, index) => ({
    _id: `post-${index + 1}`,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    category: categoryDisplayNames[post.category] || post.category,
    tags: post.tags,
    readTime: post.readTime,
    featured: index < 3, // first 3 posts are featured
    publishedAt: post.publishedAt,
    author: {
      name: post.author.name,
      image: post.author.avatar,
    },
  }))
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const posts = mapToBlogPosts()

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
