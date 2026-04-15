import { createClient, type SanityClient } from "@sanity/client"

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim()
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim()

// Create a no-op client that returns empty results when Sanity isn't configured
function createSafeClient(options: Parameters<typeof createClient>[0]): SanityClient {
  if (!options.projectId) {
    // Return a proxy that returns empty arrays/null for fetch calls
    return new Proxy({} as SanityClient, {
      get(_, prop) {
        if (prop === "fetch") {
          return async () => []
        }
        if (prop === "config") {
          return () => options
        }
        return undefined
      },
    })
  }
  return createClient(options)
}

export const sanityClient = createSafeClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
})

// Preview client (no CDN, for draft content in Studio)
export const previewClient = createSafeClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export function getClient(preview = false) {
  return preview ? previewClient : sanityClient
}
