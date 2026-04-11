import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Calendar, Tag } from "lucide-react"
import {
  sanityClient,
  blogPostBySlugQuery,
  blogSlugsQuery,
  urlFor,
} from "@/lib/sanity"
import {
  generatePageMetadata,
  breadcrumbSchema,
  blogPostSchema,
} from "@/lib/seo"
import { formatDate } from "@/lib/utils"
import { JsonLd } from "@/components/shared/JsonLd"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { ShareButtons } from "@/components/shared/ShareButtons"
import { BlogContent } from "@/components/blog/BlogContent"
import { AuthorCard } from "@/components/blog/AuthorCard"
import { RelatedPosts } from "@/components/blog/RelatedPosts"
import type { BlogPost } from "@/components/blog/BlogCard"

export const revalidate = 3600

// ─── Placeholder post for fallback ─────────────────────────────────────────

const placeholderPost = {
  _id: "placeholder",
  title: "10 Hidden Gems in Kerala You Must Visit in 2026",
  slug: "hidden-gems-kerala-2026",
  excerpt:
    "Beyond the backwaters and beaches, Kerala holds secrets that most tourists never discover.",
  coverImage:
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&h=675&fit=crop",
  body: [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Kerala, known as God's Own Country, is one of the most beautiful destinations in India. While its backwaters and beaches draw millions of tourists every year, there are countless hidden gems waiting to be explored. This guide takes you off the beaten path to discover places that will leave you spellbound.",
        },
      ],
    },
    {
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: "1. Wayanad's Ancient Caves" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Tucked away in the Western Ghats, the Edakkal Caves in Wayanad feature ancient petroglyphs dating back to 6000 BCE. The hike to the caves offers stunning views of the surrounding valleys and tea plantations.",
        },
      ],
    },
    {
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: "2. The Silent Valley" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "One of the last remaining tropical evergreen forests in India, Silent Valley National Park is a biodiversity hotspot that was saved from a hydroelectric project in the 1980s. Today, it stands as a testament to conservation and offers unparalleled trekking experiences.",
        },
      ],
    },
    {
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: "3. Bekal Fort and Beach" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "While most travelers head to Fort Kochi, the massive Bekal Fort in Kasaragod district offers an equally impressive historical experience with far fewer crowds. The adjacent beach is pristine and perfect for a quiet afternoon.",
        },
      ],
    },
  ],
  category: "Destination Guides",
  tags: ["Kerala", "Hidden Gems", "India", "Travel"],
  readTime: 8,
  featured: true,
  publishedAt: "2026-03-15T10:00:00Z",
  author: {
    name: "TravelSense Team",
    bio: "Curating extraordinary travel experiences across India and beyond.",
  },
  relatedPosts: [] as BlogPost[],
}

// ─── Static Params ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const slugs: string[] = await sanityClient.fetch(blogSlugsQuery)
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

// ─── Dynamic Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
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

// ─── Data Fetching ──────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getPost(slug: string): Promise<any | null> {
  try {
    const post = await sanityClient.fetch(blogPostBySlugQuery, { slug })
    if (!post) return null

    return {
      ...post,
      coverImage: post.coverImage
        ? urlFor(post.coverImage).width(1200).height(675).url()
        : undefined,
      author: post.author
        ? {
            ...post.author,
            image: post.author.image
              ? urlFor(post.author.image).width(120).height(120).url()
              : undefined,
          }
        : undefined,
      relatedPosts: (post.relatedPosts || []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (rp: any) => ({
          ...rp,
          coverImage: rp.coverImage
            ? urlFor(rp.coverImage).width(800).height(500).url()
            : undefined,
          author: rp.author
            ? {
                ...rp.author,
                image: rp.author.image
                  ? urlFor(rp.author.image).width(80).height(80).url()
                  : undefined,
              }
            : undefined,
        })
      ),
    }
  } catch {
    // Return placeholder only for the matching slug
    if (slug === placeholderPost.slug) return placeholderPost
    return null
  }
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const imageUrl =
    post.coverImage ||
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=675&fit=crop"

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
          description: post.excerpt || "",
          url: `/blog/${post.slug}`,
          image: imageUrl,
          datePublished: post.publishedAt,
          authorName: post.author?.name || "TravelSense Team",
        })}
      />

      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[360px] w-full bg-[#0A1425]">
        <Image
          src={imageUrl}
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
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="inline-block rounded-full bg-[#C4324A]/20 px-3 py-1 text-xs font-medium text-[#C4324A] transition-colors hover:bg-[#C4324A]/30"
            >
              {post.category}
            </Link>

            <h1 className="mt-4 font-heading text-3xl font-normal tracking-wide text-white md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 text-lg text-white/60">{post.excerpt}</p>
            )}

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/40">
              {post.author && (
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/10">
                    {post.author.image ? (
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-medium text-white/60">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-white/60">{post.author.name}</span>
                </div>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime} min read
                </span>
              )}
            </div>
          </header>

          {/* Body */}
          {post.body && <BlogContent body={post.body} />}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
              <Tag className="h-4 w-4 text-white/30" />
              {post.tags.map((tag: string) => (
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
            {post.author && (
              <AuthorCard
                name={post.author.name}
                image={post.author.image}
                bio={post.author.bio}
              />
            )}
          </div>

          {/* Related posts */}
          <RelatedPosts posts={post.relatedPosts || []} />

          {/* Bottom spacing */}
          <div className="pb-16" />
        </div>
      </div>
    </>
  )
}
