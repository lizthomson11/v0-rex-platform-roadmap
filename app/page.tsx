import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { ThemeSections } from "@/components/theme-sections"
import { AiChatButton } from "@/components/ai-chat"

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex flex-col scroll-smooth" style={{ scrollPaddingTop: "80px" }}>
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative font-[family-name:var(--font-source-sans)] overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-black to-black" />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Gradient orbs for visual interest */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
          
          <div className="relative container mx-auto max-w-[1920px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 py-12 md:py-16 lg:py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-roadmap-text-secondary mb-6">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Updated for Q2 2026
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Product Roadmap
              </h1>
              <p className="text-base md:text-lg text-roadmap-text-secondary/80 leading-relaxed">
                See what we're building for the REX Platform. This is a look at our current priorities and what's ahead for 2026.
              </p>
            </div>
            
            <HeroCarousel />
          </div>
        </section>

        {/* Divider */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Theme Sections - detailed breakdown by problem/persona */}
        <ThemeSections />
      </main>

      <SiteFooter />
      <AiChatButton />
    </div>
  )
}
