"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A1425] px-4">
      <div className="text-center">
        <p className="font-heading text-6xl font-normal text-[#C4324A]">Oops</p>
        <h2 className="mt-4 font-heading text-xl font-medium tracking-[-0.015em] leading-[1.15] text-white">
          Something went wrong
        </h2>
        <p className="mt-3 max-w-md text-sm text-white/50">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center rounded-lg bg-[#C4324A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C4324A]/90"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
