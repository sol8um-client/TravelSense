import Link from "next/link"
import Image from "next/image"
import { Clock, Calendar } from "lucide-react"
import { cn, formatDate } from "@/lib/utils"

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: string
  category: string
  tags?: string[]
  readTime?: number
  featured?: boolean
  publishedAt: string
  author?: {
    name: string
    image?: string
  }
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  className?: string
}

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  const imageUrl = post.coverImage || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop"

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:border-[#C4324A]/30 hover:bg-white/[0.07]",
        featured && "md:col-span-2 md:grid md:grid-cols-2",
        className
      )}
    >
      {/* Image */}
      <div className={cn(
        "relative overflow-hidden",
        featured ? "aspect-[16/10] md:aspect-auto md:min-h-full" : "aspect-[16/10]"
      )}>
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1425]/60 to-transparent" />

        {/* Category badge */}
        <span className="absolute top-4 left-4 rounded-full bg-[#C4324A]/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {post.category}
        </span>

        {/* Featured badge */}
        {post.featured && (
          <span className="absolute top-4 right-4 rounded-full bg-[#D4A853]/90 px-3 py-1 text-xs font-medium text-[#0A1425] backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className={cn("flex flex-col justify-between p-5", featured && "md:p-8")}>
        <div>
          <h3 className={cn(
            "font-heading font-normal tracking-wide text-white transition-colors group-hover:text-[#C4324A]",
            featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
          )}>
            {post.title}
          </h3>
          <p className={cn(
            "mt-2 line-clamp-2 font-body text-white/60",
            featured ? "text-sm md:text-base md:line-clamp-3" : "text-sm"
          )}>
            {post.excerpt}
          </p>
        </div>

        {/* Meta */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-3">
            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-2">
                <div className="relative h-7 w-7 overflow-hidden rounded-full bg-white/10">
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
                <span className="text-xs text-white/50">{post.author.name}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishedAt, { format: "short" })}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime} min
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
