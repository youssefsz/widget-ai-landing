import ogImage from "@/assets/og-img.jpg"
import logoImage from "@/assets/logo.png"

const env = import.meta.env

export const siteConfig = {
  name: "WidgetAI",
  siteUrl: "https://widgetai.youssef.tn",
  locale: "en_US",
  themeColor: "#020617",
  backgroundColor: "#020617",
  defaultTitle: "WidgetAI | An AI Assistant for Your Website, Open After Hours",
  defaultDescription:
    "WidgetAI answers your website's visitors from what you've written down, at any hour. One script tag, your colours, your corner, your allowed domains.",
  defaultKeywords: [
    "AI website widget",
    "website chatbot",
    "AI chat widget",
    "embeddable AI assistant",
    "AI customer support widget",
    "after hours customer support",
    "custom AI widget",
    "OpenRouter chatbot",
  ],
  ogImage,
  ogImageAlt:
    "WidgetAI: Open after hours. A website chat answering a guest's question on a café terrace at night.",
  logo: logoImage,
  dashboardUrl: "https://dashboard.widgetai.youssef.tn/login",
  privacyUrl: "https://dashboard.widgetai.youssef.tn/privacy",
  termsUrl: "https://dashboard.widgetai.youssef.tn/terms",
  supportEmail: "dhibi.ywsf@gmail.com",
  supportEmailHref: "mailto:dhibi.ywsf@gmail.com",
  embedScriptUrl: "https://api.widgetai.dhibi.tn/widget/embed.js",
} as const

/**
 * The live widget on the landing page (the launcher in the corner and the
 * "What it says" chat). Override per environment with PUBLIC_* variables,
 * e.g. point them at a local backend while developing.
 */
export const widgetConfig = {
  apiUrl: (env.PUBLIC_WIDGET_API_URL || "https://api.widgetai.dhibi.tn").replace(
    /\/$/,
    ""
  ),
  widgetId: env.PUBLIC_WIDGET_ID || "widget_68948c13a96e4a3986284ee886f88154",
  dashboardUrl: env.PUBLIC_DASHBOARD_URL || siteConfig.dashboardUrl,
} as const

/** The practical part: rendered as a conversation and as FAQPage structured data. */
export const faqItems = [
  {
    question: "How do I install it?",
    answer:
      "One script tag before </body>. No SDK, no framework, no build step, so it works on WordPress, Webflow, Shopify themes and hand-written HTML alike.",
  },
  {
    question: "What does it know about my business?",
    answer:
      "Only the context and instructions you write for that widget. It doesn't crawl your site or read anything you didn't paste in.",
  },
  {
    question: "And when it doesn't know?",
    answer:
      "It says so and points to your contact instead of inventing an answer. You saw it do that with pricing, further up.",
  },
  {
    question: "Can someone else put it on their site?",
    answer:
      "Not if you list your domains. Requests from any other site are refused before the AI is asked.",
  },
  {
    question: "Will it look like my site?",
    answer:
      "Pick the primary and panel colours, the corner and offsets from 0 to 2000px. It renders in a shadow DOM, so your CSS and its CSS stay apart.",
  },
  {
    question: "Which AI does it use?",
    answer:
      "WidgetAI's managed AI by default, or your own OpenRouter key with the model you choose. Keys are stored encrypted.",
  },
  {
    question: "How do I sign up?",
    answer:
      "Sign in with Google. One account can run several widgets, each with its own settings. Anything else: dhibi.ywsf@gmail.com.",
  },
] as const

export type StructuredData = Record<string, unknown>

export function getAbsoluteUrl(path: string, site: URL) {
  return new URL(path, site).toString()
}

export function getHomepageStructuredData(site: URL): StructuredData[] {
  const homepageUrl = getAbsoluteUrl("/", site)
  const logoUrl = getAbsoluteUrl(siteConfig.logo.src, site)
  const imageUrl = getAbsoluteUrl(siteConfig.ogImage.src, site)

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: homepageUrl,
      logo: logoUrl,
      email: siteConfig.supportEmail,
      founder: { "@type": "Person", name: "Youssef Dhibi" },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.supportEmail,
          availableLanguage: ["en"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: homepageUrl,
      description: siteConfig.defaultDescription,
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: siteConfig.defaultTitle,
      url: homepageUrl,
      description: siteConfig.defaultDescription,
      isPartOf: { "@type": "WebSite", name: siteConfig.name, url: homepageUrl },
      primaryImageOfPage: imageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: homepageUrl,
      image: imageUrl,
      description: siteConfig.defaultDescription,
      provider: { "@type": "Organization", name: siteConfig.name, url: homepageUrl },
      featureList: [
        "Embeddable AI website widget installed with one script tag",
        "Answers only from the business context you write",
        "Says when it doesn't know instead of inventing answers",
        "Domain allowlisting",
        "Brand colours, corner placement and offsets",
        "Shadow DOM isolation from the host site's CSS",
        "WidgetAI-managed AI or your own OpenRouter key and model",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ]
}
