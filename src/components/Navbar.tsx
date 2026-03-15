import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { siteConfig } from "@/lib/site"

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
        className={`fixed top-4 inset-x-0 mx-auto flex items-center justify-between rounded-full border border-border/50 bg-background/60 px-6 py-3 backdrop-blur-md shadow-sm z-40 transition-all duration-300 w-[95%] max-w-7xl ${
          scrolled ? "md:w-[85%] md:max-w-4xl" : ""
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <img
              src="/logo.png"
              alt="WidgetAI Logo"
              width={833}
              height={217}
              className="h-8 w-auto object-contain"
            />
          </a>
        </div>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#how-it-works" className={`transition-colors hover:text-foreground ${activeSection === 'how-it-works' ? 'text-foreground font-semibold' : ''}`}>How it Works</a>
          <a href="#features" className={`transition-colors hover:text-foreground ${activeSection === 'features' ? 'text-foreground font-semibold' : ''}`}>Features</a>
          <a href="#faq" className={`transition-colors hover:text-foreground ${activeSection === 'faq' ? 'text-foreground font-semibold' : ''}`}>FAQ</a>
        </nav>

        {/* CTA - Desktop */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <a href={siteConfig.dashboardUrl} className="text-sm font-medium hover:text-foreground text-muted-foreground mr-2">
              Log in
            </a>
            <a href={siteConfig.dashboardUrl}>
              <Button className="rounded-full shadow-md hover:shadow-lg transition-all" variant="default">
                Get Started
              </Button>
            </a>
          </div>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden flex items-center justify-center p-2 text-foreground hover:opacity-80 transition-opacity"
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
          className="fixed inset-0 bg-background/40 backdrop-blur-sm z-50 md:hidden transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border/50 bg-background/95 backdrop-blur-xl p-8 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-12">
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="rounded-full bg-muted/50 p-2 text-foreground hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex flex-col gap-6 text-2xl font-bold tracking-tight mt-4 w-full h-full">
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors block pb-4 border-border/50 border-b ${activeSection === 'how-it-works' ? 'text-primary' : 'hover:text-primary'}`}>How it Works</a>
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors block pb-4 border-border/50 border-b ${activeSection === 'features' ? 'text-primary' : 'hover:text-primary'}`}>Features</a>
          <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors block pb-4 border-border/50 border-b ${activeSection === 'faq' ? 'text-primary' : 'hover:text-primary'}`}>FAQ</a>
        </nav>
        
        <div className="mt-auto flex flex-col gap-4 pt-12 pb-6">
          <a href={siteConfig.dashboardUrl} onClick={() => setIsMobileMenuOpen(false)} className="text-center font-medium hover:text-foreground text-muted-foreground text-lg mb-4">
            Log in to dashboard
          </a>
          <a href={siteConfig.dashboardUrl} className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full rounded-full h-14 text-lg font-medium shadow-md" variant="default">
              Get Started Now
            </Button>
          </a>
        </div>
      </div>
    </>
  )
}
