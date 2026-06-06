import type { Metadata } from "next"
import { BookOpen, Compass, Sparkles } from "lucide-react"
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo"
import { JsonLd } from "@/components/shared/JsonLd"
import { PageHero } from "@/components/shared/PageHero"
import { BlogGrid } from "@/components/blog/BlogGrid"
import { blogPosts, categoryDisplayNames } from "@/data/blog"
import type { BlogPost } from "@/components/blog/BlogCard"

export const metadata: Metadata = generatePageMetadata({
  title: "Travel Blog",
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

// ─── Page (blog/layout.tsx already renders Header + Footer) ─────────────────

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

      {/* ── HERO - shared site hero ──────────────────────────────────────── */}
      <PageHero
        eyebrow="The journal"
        title="Stories that"
        accent="inspire."
        subtitle="Tips, guides and tales from the road to help you plan your next adventure."
        crumb="Blog"
      >
        {[
          { icon: BookOpen, label: `${posts.length} articles` },
          { icon: Compass, label: "Destination guides" },
          { icon: Sparkles, label: "Expert insights" },
        ].map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/65 px-3.5 py-1.5 font-body text-[12.5px] font-medium text-primary shadow-[0_6px_18px_rgba(11,20,38,0.06)] backdrop-blur-md"
          >
            <c.icon className="h-3.5 w-3.5 text-secondary" strokeWidth={1.9} />
            {c.label}
          </span>
        ))}
      </PageHero>

      {/* ── POSTS - glass cards on light ─────────────────────────────────── */}
      <section className="bg-[#F4F6F9] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <BlogGrid posts={posts} />
        </div>
      </section>
    </>
  )
}
