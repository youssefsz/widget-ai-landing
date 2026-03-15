// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"

const site = process.env.SITE_URL ?? process.env.PUBLIC_SITE_URL ?? "https://widgetai.youssef.tn"

// https://astro.build/config
export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
})
