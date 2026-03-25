import { type FC, type HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "main" | "article"
}

export const Container: FC<ContainerProps> = ({
  className,
  as: Component = "div",
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Container
