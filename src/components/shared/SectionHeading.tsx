import { type FC } from "react"

import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  as?: "h1" | "h2" | "h3"
  className?: string
}

export const SectionHeading: FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
  className,
}) => {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl md:mb-14",
        {
          "mx-auto text-center": align === "center",
          "text-left": align === "left",
          "ml-auto text-right": align === "right",
        },
        className
      )}
    >
      {/* Decorative accent line */}
      <div
        className={cn("mb-4 flex", {
          "justify-center": align === "center",
          "justify-start": align === "left",
          "justify-end": align === "right",
        })}
      >
        <span className="inline-block h-1 w-12 rounded-full bg-secondary" />
      </div>

      <Tag className="hx font-heading text-3xl font-medium tracking-[-0.02em] leading-[1.04] text-foreground sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Tag>

      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
