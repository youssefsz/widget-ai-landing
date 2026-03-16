import { useState, useEffect } from "react"
import { buttonVariants } from "@/components/ui/button-variants"
import { Menu, X } from "lucide-react"
import { siteConfig } from "@/lib/site"
import logoImage from "@/assets/logo.png"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ["how-it-works", "features", "faq"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) {
        setActiveSection(current)
      } else if (window.scrollY < 100) {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div
        className={`fixed inset-x-0 top-4 z-40 mx-auto flex w-[95%] max-w-7xl items-center justify-between rounded-full border border-border/50 bg-background/60 px-6 py-3 shadow-sm backdrop-blur-md transition-all duration-300 ${
          scrolled ? "md:w-[85%] md:max-w-4xl" : ""
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img
              src={logoImage.src}
              alt="WidgetAI Logo"
              width={833}
              height={217}
              className="h-8 w-auto object-contain"
            />
          </a>
        </div>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a
            href="#how-it-works"
            className={`transition-colors hover:text-foreground ${activeSection === "how-it-works" ? "font-semibold text-foreground" : ""}`}
          >
            How it Works
          </a>
          <a
            href="#features"
            className={`transition-colors hover:text-foreground ${activeSection === "features" ? "font-semibold text-foreground" : ""}`}
          >
            Features
          </a>
          <a
            href="#faq"
            className={`transition-colors hover:text-foreground ${activeSection === "faq" ? "font-semibold text-foreground" : ""}`}
          >
            FAQ
          </a>
        </nav>

        {/* CTA - Desktop */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 md:flex">
            <a
              href={siteConfig.dashboardUrl}
              className="mr-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Log in
            </a>
            <a
              href={siteConfig.dashboardUrl}
              className={cn(
                buttonVariants(),
                "rounded-full shadow-md hover:shadow-lg"
              )}
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="flex cursor-pointer items-center justify-center p-2 text-foreground transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-80 active:scale-[0.94] md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/40 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border/50 bg-background/95 p-8 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-12 flex justify-end">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="cursor-pointer rounded-full bg-muted/50 p-2 text-foreground transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-muted active:scale-[0.94]"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4 flex h-full w-full flex-col gap-6 text-2xl font-bold tracking-tight">
          <a
            href="#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block border-b border-border/50 pb-4 transition-colors ${activeSection === "how-it-works" ? "text-primary" : "hover:text-primary"}`}
          >
            How it Works
          </a>
          <a
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block border-b border-border/50 pb-4 transition-colors ${activeSection === "features" ? "text-primary" : "hover:text-primary"}`}
          >
            Features
          </a>
          <a
            href="#faq"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block border-b border-border/50 pb-4 transition-colors ${activeSection === "faq" ? "text-primary" : "hover:text-primary"}`}
          >
            FAQ
          </a>
        </nav>

        <div className="mt-auto flex flex-col gap-4 pt-12 pb-6">
          <a
            href={siteConfig.dashboardUrl}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mb-4 text-center text-lg font-medium text-muted-foreground hover:text-foreground"
          >
            Log in to dashboard
          </a>
          <a
            href={siteConfig.dashboardUrl}
            className={cn(
              buttonVariants(),
              "h-14 w-full rounded-full text-lg font-medium shadow-md"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started Now
          </a>
        </div>
      </div>
    </>
  )
}
