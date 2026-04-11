"use client"

import Image from "next/image"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { urlFor } from "@/lib/sanity"

interface BlogContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[]
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const imageUrl = urlFor(value).width(1200).height(675).url()
      return (
        <figure className="my-8">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt={value.alt || "Blog image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-white/40">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 font-heading text-2xl font-normal tracking-wide text-white md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-heading text-xl font-normal tracking-wide text-white md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-6 font-heading text-lg font-normal tracking-wide text-white">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[#C4324A] py-2 pl-6 italic text-white/70">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-5 font-body text-base leading-relaxed text-white/80 md:text-lg md:leading-relaxed">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc space-y-2 pl-6 text-white/80">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-2 pl-6 text-white/80">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-body text-base leading-relaxed md:text-lg">{children}</li>
    ),
    number: ({ children }) => (
      <li className="font-body text-base leading-relaxed md:text-lg">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || "#"
      const isExternal = href.startsWith("http")
      return (
        <a
          href={href}
          className="text-[#C4324A] underline underline-offset-4 transition-colors hover:text-[#D4A853]"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      )
    },
    code: ({ children }) => (
      <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-[#D4A853]">
        {children}
      </code>
    ),
  },
}

export function BlogContent({ body }: BlogContentProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <PortableText value={body} components={portableTextComponents} />
    </div>
  )
}
