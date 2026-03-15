import ogImage from "@/assets/og-img.png"
import logoImage from "@/assets/logo.png"

export const siteConfig = {
  name: "WidgetAI",
  siteUrl: "https://widgetai.youssef.tn",
  locale: "en_US",
  themeColor: "#131722",
  backgroundColor: "#131722",
  defaultTitle: "WidgetAI | AI Website Widgets You Can Launch in Minutes",
  defaultDescription:
    "Launch a branded AI website widget in minutes. Control answers with business context, customize the design, restrict approved domains, and install with one script tag.",
  defaultKeywords: [
    "AI website widget",
    "website chatbot",
    "AI chat widget",
    "embeddable AI assistant",
    "AI customer support widget",
    "AI sales chatbot",
    "custom AI widget",
    "widget installation",
  ],
  ogImage,
  ogImageAlt: "WidgetAI dashboard preview and embeddable website chat widget",
  logo: logoImage,
  dashboardUrl: "https://dashboard.widgetai.youssef.tn/login",
  privacyUrl: "https://dashboard.widgetai.youssef.tn/privacy",
  termsUrl: "https://dashboard.widgetai.youssef.tn/terms",
  supportEmail: "dhibi.ywsf@gmail.com",
  supportEmailHref: "mailto:dhibi.ywsf@gmail.com",
  embedScriptUrl: "https://api.widgetai.dhibi.tn/widget/embed.js",
} as const

export const faqItems = [
  {
    question: "How does the widget work?",
    answer:
      "You sign in, create a widget in your private dashboard, add business context and instructions, then install the chat interface on your website with a single lightweight script tag.",
  },
  {
    question: "How do I control the AI's answers?",
    answer:
      "The assistant answers from the business context you provide for each widget. You can also add system instructions to control tone, style, and how responses should be formatted.",
  },
  {
    question: "Can the widget be customized to match my branding?",
    answer:
      "Yes. You can customize key visual settings such as the primary brand color and the panel background so the widget feels native to your site.",
  },
  {
    question: "Can I restrict where the widget is loaded?",
    answer:
      "Yes. Domain allowlisting lets you restrict each widget to approved websites so it cannot be embedded on unauthorized domains.",
  },
  {
    question: "Can I use my own AI credentials?",
    answer:
      "Yes. In addition to platform-managed usage, you can provide your own OpenRouter credentials and choose custom models that fit your workflow and cost requirements.",
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
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: homepageUrl,
      },
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
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: homepageUrl,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Embeddable AI website widget",
        "Per-widget business context and instructions",
        "Brand customization",
        "Domain allowlisting",
        "Single script tag installation",
        "Support for platform-managed and user-managed AI credentials",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ]
}
