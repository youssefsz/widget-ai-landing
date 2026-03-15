import type { APIRoute } from "astro"

import { siteConfig } from "@/lib/site"

export const GET: APIRoute = ({ site }) => {
  const baseSite = site ?? new URL(siteConfig.siteUrl)
  const robots = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${new URL("/sitemap-index.xml", baseSite).toString()}`,
  ].join("\n")

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
