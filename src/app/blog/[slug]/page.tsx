import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Calendar, Tag } from "lucide-react"
import {
  generatePageMetadata,
  breadcrumbSchema,
  blogPostSchema,
} from "@/lib/seo"
import { formatDate } from "@/lib/utils"
import { JsonLd } from "@/components/shared/JsonLd"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { ShareButtons } from "@/components/shared/ShareButtons"
import { AuthorCard } from "@/components/blog/AuthorCard"
import { RelatedPosts } from "@/components/blog/RelatedPosts"
import type { BlogPost } from "@/components/blog/BlogCard"
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedPosts,
  categoryDisplayNames,
} from "@/data/blog"

// ─── Static Params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

// ─── Dynamic Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) {
    return generatePageMetadata({
      title: "Post Not Found | TravelSense",
      description: "The blog post you are looking for does not exist.",
      path: `/blog/${slug}`,
    })
  }

  return generatePageMetadata({
    title: `${post.title} | TravelSense Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
  })
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) notFound()

  const categoryLabel = categoryDisplayNames[post.category] || post.category
  const relatedPostsData = getRelatedPosts(post.relatedSlugs)

  // Map related posts to the BlogCard shape
  const relatedBlogPosts: BlogPost[] = relatedPostsData.map((rp, i) => ({
    _id: `related-${i}`,
    title: rp.title,
    slug: rp.slug,
    excerpt: rp.excerpt,
    coverImage: rp.coverImage,
    category: categoryDisplayNames[rp.category] || rp.category,
    tags: rp.tags,
    readTime: rp.readTime,
    publishedAt: rp.publishedAt,
    author: {
      name: rp.author.name,
      image: rp.author.avatar,
    },
  }))

  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        data={blogPostSchema({
          title: post.title,
          description: post.excerpt,
          url: `/blog/${post.slug}`,
          image: post.coverImage,
          datePublished: post.publishedAt,
          authorName: post.author.name,
        })}
      />

      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[360px] w-full bg-[#0A1425]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425] via-[#0A1425]/40 to-transparent" />
      </div>

      {/* Content area */}
      <div className="bg-[#0A1425]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
            className="mb-8 pt-8"
          />

          {/* Post header */}
          <header className="mb-10">
            {/* Category badge */}
            <Link
              href={`/blog?category=${encodeURIComponent(categoryLabel)}`}
              className="inline-block rounded-full bg-[#C4324A]/20 px-3 py-1 text-xs font-medium text-[#C4324A] transition-colors hover:bg-[#C4324A]/30"
            >
              {categoryLabel}
            </Link>

            <h1 className="mt-4 font-heading text-3xl font-normal tracking-wide text-white md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-white/60">{post.excerpt}</p>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/10">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white/60">{post.author.name}</span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} min read
              </span>
            </div>
          </header>

          {/* Body — rendered from HTML string */}
          <div
            className="blog-content mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
              <Tag className="h-4 w-4 text-white/30" />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 transition-colors hover:border-[#D4A853]/30 hover:text-[#D4A853]"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Share & Author */}
          <div className="mt-8 space-y-8">
            <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
            <AuthorCard
              name={post.author.name}
              image={post.author.avatar}
              bio={`${post.author.role} — Curating extraordinary travel experiences across India and beyond.`}
            />
          </div>

          {/* Related posts */}
          <RelatedPosts posts={relatedBlogPosts} />

          {/* Bottom spacing */}
          <div className="pb-16" />
        </div>
      </div>
    </>
  )
}
