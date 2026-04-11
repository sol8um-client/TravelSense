import { BlogCard, type BlogPost } from "./BlogCard"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="mt-16 border-t border-white/10 pt-12">
      <h2 className="mb-8 font-heading text-2xl font-normal tracking-wide text-white">
        Related Articles
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  )
}
