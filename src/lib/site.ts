import ogImage from "@/assets/og-img.png"
import logoImage from "@/assets/logo.png"

export const siteConfig = {
  name: "WidgetAI",
  siteUrl: "https://widgetai.youssef.tn",
  locale: "en_US",
  themeColor: "#131722",
  backgroundColor: "#131722",
  defaultTitle: "WidgetAI | Embed a Branded AI Assistant on Your Website",
  defaultDescription:
    "Create a branded AI website widget. Control answers with business context and instructions, restrict approved domains, and install it with one script tag.",
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
    question: "What does WidgetAI use to answer questions?",
    answer:
      "Each widget answers from the business context you add in the dashboard, plus optional instructions for tone and behavior. You decide what information and rules it receives.",
  },
  {
    question: "Do I need a framework or SDK?",
    answer:
      "No. Add the generated script tag to your site. The embed is plain JavaScript and works independently of your frontend stack.",
  },
  {
    question: "How do I control the assistant's answers?",
    answer:
      "The assistant answers from the context you provide for each widget. You can also add instructions to control tone, behavior, and how responses should be formatted.",
  },
  {
    question: "What can I customize?",
    answer:
      "You can set the primary brand color, panel background, launcher placement, and offsets so the widget fits the surrounding site.",
  },
  {
    question: "Can I control where a widget runs?",
    answer:
      "Yes. Leave it public, or use domain allowlisting to limit the websites that may use it.",
  },
  {
    question: "Can I use my own AI model?",
    answer:
      "Yes. Use WidgetAI-managed AI, or connect your OpenRouter credentials and choose a model that fits your workflow.",
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
