// @ts-check

import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"

const site =
  process.env.SITE_URL ??
  process.env.PUBLIC_SITE_URL ??
  "https://widgetai.youssef.tn"

// https://astro.build/config
export default defineConfig({
  site,
  build: {
    // The page's CSS is small; inlining it removes a render-blocking request.
    inlineStylesheets: "always",
  },
  prefetch: false,
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
})
