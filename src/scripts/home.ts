/* Client behaviour for the home page. Everything here enhances server-rendered
   HTML: without JavaScript the page still shows all of its content. */

interface WidgetSettings {
  apiUrl: string
  widgetId: string
}

const root = document.querySelector<HTMLElement>("[data-widget-api]")
const settings: WidgetSettings = {
  apiUrl: root?.dataset.widgetApi ?? "",
  widgetId: root?.dataset.widgetId ?? "",
}

/* ---------- reveal on scroll, once ---------- */
function setUpReveals() {
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]")
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"))
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add("is-in")
        io.unobserve(entry.target)
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
  )
  targets.forEach((el) => io.observe(el))
}

/* ---------- the visitor's own clock ---------- */
function setUpClock() {
  const when = document.getElementById("when")
  if (!when) return
  const now = new Date()
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now)
  const hour = now.getHours()
  const strong = document.createElement("strong")
  strong.textContent = time
  const night = hour >= 19 || hour < 8
  when.replaceChildren(
    "It's ",
    strong,
    night
      ? " where you are, and most help desks closed hours ago. WidgetAI answers your visitors from what you've written down, whether or not anyone is at the desk."
      : " where you are. Tonight, when nobody is at the desk, WidgetAI still answers your visitors from what you've written down."
  )
}

/* ---------- which line of the context a question leans on ---------- */
const STOP_WORDS = new Set(
  "a an the is are am do does did i you your we our it its of to in on at for and or can my me be with how what when where which who will would should could there this that from have has any as by if not no yes about".split(
    " "
  )
)

function words(text: string) {
  return (text.toLowerCase().match(/[a-z0-9À-ɏ]+/g) ?? [])
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
    .map((w) => w.replace(/(ing|ed|es|s)$/, ""))
}

/** Scores each line by the question words it shares, rarer words counting more. */
function bestLine(question: string, lines: string[]) {
  const asked = new Set(words(question))
  const lineWords = lines.map((line) => new Set(words(line)))
  const lineCount = (w: string) => lineWords.filter((set) => set.has(w)).length
  let best: { index: number; score: number } | null = null
  lineWords.forEach((set, index) => {
    let score = 0
    asked.forEach((w) => {
      if (set.has(w)) score += 1 / lineCount(w)
    })
    if (score > 0 && (!best || score > best.score)) best = { index, score }
  })
  // A match resting only on words found on most lines is a guess: show none.
  const found = best as { index: number; score: number } | null
  return found && found.score >= 0.34 ? found : null
}

/* ---------- "What it says": a live chat with the real widget ---------- */
function setUpChat() {
  const ctx = document.getElementById("ctx")
  const log = document.getElementById("log")
  const form = document.getElementById("chatForm") as HTMLFormElement | null
  const input = document.getElementById("msg") as HTMLInputElement | null
  const note = document.getElementById("note")
  if (!ctx || !log || !form || !input || !note) return

  const lineEls = Array.from(ctx.querySelectorAll<HTMLElement>("[data-l]"))
  const lines = lineEls.map((el) => el.textContent ?? "")

  const light = (question: string) => {
    lineEls.forEach((el) => el.classList.remove("lit"))
    const match = bestLine(question, lines)
    if (match) lineEls[match.index]?.classList.add("lit")
    return match
  }
  light("Will it break my site's CSS?")

  const add = (kind: "u" | "b", text: string) => {
    const bubble = document.createElement("div")
    bubble.className = `m ${kind}`
    bubble.textContent = text
    log.appendChild(bubble)
    log.scrollTop = log.scrollHeight
    return bubble
  }

  const ask = async (question: string) => {
    const response = await fetch(`${settings.apiUrl}/api/v1/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ widgetId: settings.widgetId, message: question }),
    })
    const payload = (await response.json().catch(() => null)) as {
      message?: unknown
    } | null
    if (!response.ok || typeof payload?.message !== "string") {
      throw new Error("No answer")
    }
    return payload.message.replace(/\*\*/g, "").replace(/`/g, "")
  }

  const send = async (question: string) => {
    if (!question.trim()) return
    add("u", question)
    const match = light(question)
    const waiting = add("b", "Reading its context…")
    waiting.classList.add("wait")
    try {
      waiting.textContent = await ask(question)
      note.textContent = "Answered live by the real widget."
    } catch {
      waiting.textContent = match
        ? `Offline preview. It would answer from the highlighted line: “${lines[match.index]}”`
        : "Offline preview. Nothing on the left covers that, so it would say it doesn't know."
      note.textContent =
        "The WidgetAI backend isn't reachable right now, so this is a preview of which line it would use."
    } finally {
      waiting.classList.remove("wait")
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    const question = input.value
    input.value = ""
    void send(question)
  })
  document
    .querySelectorAll<HTMLButtonElement>("[data-suggest]")
    .forEach((button) =>
      button.addEventListener("click", () => void send(button.textContent ?? ""))
    )
}

/* ---------- copy the install tag ---------- */
function setUpCopy() {
  const button = document.getElementById("copyTag")
  const tag = document.getElementById("tag")
  if (!button || !tag) return
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(tag.textContent ?? "")
      button.textContent = "Copied"
      button.classList.add("done")
    } catch {
      button.textContent = "Select and copy"
    }
    window.setTimeout(() => {
      button.textContent = "Copy"
      button.classList.remove("done")
    }, 1800)
  })
}

/* ---------- the real widget in the corner, loaded after the page ---------- */
function loadWidget() {
  if (!settings.apiUrl || !settings.widgetId) return
  const script = document.createElement("script")
  script.src = `${settings.apiUrl}/widget/embed.js`
  script.async = true
  script.dataset.widgetId = settings.widgetId
  script.dataset.apiBaseUrl = settings.apiUrl
  script.dataset.title = "WidgetAI"
  script.dataset.welcome = "Still here. Ask me anything about WidgetAI."
  script.dataset.placeholder = "Ask about WidgetAI"
  document.body.appendChild(script)
}

function whenIdle(task: () => void) {
  const run = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(task, { timeout: 2500 })
    } else {
      setTimeout(task, 1200)
    }
  }
  if (document.readyState === "complete") run()
  else window.addEventListener("load", run, { once: true })
}

setUpReveals()
setUpClock()
setUpChat()
setUpCopy()
whenIdle(loadWidget)
