"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BlogCard, type BlogPost } from "./BlogCard"
import { Pagination } from "@/components/shared/Pagination"
import { EmptyState } from "@/components/shared/EmptyState"
import { cn } from "@/lib/utils"

const BLOG_CATEGORIES = [
  "All",
  "Travel Tips",
  "Destination Guides",
  "Adventure",
  "Culture",
  "Food & Cuisine",
  "Travel Planning",
  "Budget Travel",
] as const

const POSTS_PER_PAGE = 9

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts
    return posts.filter((p) => p.category === activeCategory)
  }, [posts, activeCategory])

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0]
  const remainingPosts = filteredPosts.filter((p) => p._id !== featuredPost?._id)

  const totalPages = Math.ceil(remainingPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = remainingPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setCurrentPage(1)
  }

  return (
    <div>
      {/* Category filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              activeCategory === cat
                ? "bg-[#C4324A] text-white"
                : "border border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <EmptyState
          title="No posts found"
          description="There are no blog posts in this category yet. Check back soon!"
        />
      ) : (
        <>
          {/* Featured post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <BlogCard post={featuredPost} featured />
            </motion.div>
          )}

          {/* Posts grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {paginatedPosts.map((post, i) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
