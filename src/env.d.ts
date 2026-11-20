/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WIDGET_API_URL?: string
  readonly PUBLIC_WIDGET_ID?: string
  readonly PUBLIC_DASHBOARD_URL?: string
  readonly PUBLIC_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
