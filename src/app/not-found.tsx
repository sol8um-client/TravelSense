import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-[#0A1425] px-4">
        <div className="text-center">
          <p className="font-heading text-8xl font-normal text-[#C4324A]">404</p>
          <h1 className="mt-4 font-heading text-2xl font-medium tracking-[-0.015em] leading-[1.15] text-white">
            Page not found
          </h1>
          <p className="mt-3 text-white/50">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center rounded-lg bg-[#C4324A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C4324A]/90"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
