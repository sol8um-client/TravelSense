"use client"

import { useState } from "react"
import { Send, CheckCircle2, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/Container"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus("loading")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setStatus("success")
    setEmail("")

    // Reset after a few seconds
    setTimeout(() => setStatus("idle"), 4000)
  }

  return (
    <section className="py-16 sm:py-20 bg-muted/60">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Get Travel Inspiration Delivered to Your Inbox
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Join 2,000+ travelers who get exclusive destination guides, deals, and
            travel tips every week.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={status === "loading" || status === "success"}
                className={cn(
                  "h-12 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors",
                  "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                  "disabled:cursor-not-allowed disabled:opacity-60",
                  "sm:rounded-r-none sm:border-r-0"
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={cn(
                "h-12 px-6 sm:rounded-l-none",
                status === "success" && "bg-success hover:bg-success"
              )}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Subscribe
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground/70">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </section>
  )
}
