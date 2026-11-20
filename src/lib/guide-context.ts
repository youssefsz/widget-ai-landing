/**
 * The context shown in "What it was given". The live widget on the page answers
 * from its own context in the dashboard, so keep the widget configured in
 * PUBLIC_WIDGET_ID set to exactly this text.
 */
export const guideContext = `WidgetAI lets a business put an AI assistant on its website.
The assistant answers visitors from the business context the owner writes in the dashboard, plus optional instructions for tone and behaviour.
Install: copy one script tag from the dashboard and paste it into the site's HTML, before </body>. No SDK, no framework, no build step.
The script tag looks like <script src="https://api.widgetai.dhibi.tn/widget/embed.js" data-widget-id="widget_..."></script>.
The widget renders inside a shadow DOM, so the site's CSS does not leak into it and its CSS does not leak into the site.
Appearance: primary colour, panel background colour, launcher corner (bottom-right, bottom-left, top-right, top-left) and X/Y offsets from 0 to 2000 pixels. Default is bottom-right, 20px from each edge.
Domains: a widget is public by default. It can be restricted to a list of approved domains; requests from other sites are refused.
AI: each widget uses WidgetAI-managed AI by default. Owners can instead connect their own OpenRouter API key and choose any OpenRouter model. Keys are stored encrypted.
One account can have many widgets, each with its own context, instructions, colours and domains, for example one for support and one for sales.
Sign-in is with Google. The dashboard is at dashboard.widgetai.youssef.tn.
WidgetAI is built and run by Youssef Dhibi. Contact: dhibi.ywsf@gmail.com.
The landing page is open source under the MIT licence.`

export const guideContextLines = guideContext.split("\n")
