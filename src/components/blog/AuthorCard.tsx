import Image from "next/image"

interface AuthorCardProps {
  name: string
  image?: string
  bio?: string
}

export function AuthorCard({ name, image, bio }: AuthorCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white/10">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-medium text-white/60">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <p className="text-[10px] font-body font-semibold uppercase tracking-[0.24em] text-white/50">Written by</p>
        <p className="font-heading text-lg font-medium tracking-[-0.015em] leading-[1.15] text-white mt-0.5">{name}</p>
        {bio && (
          <p className="mt-1 text-sm leading-relaxed text-white/50">{bio}</p>
        )}
      </div>
    </div>
  )
}
