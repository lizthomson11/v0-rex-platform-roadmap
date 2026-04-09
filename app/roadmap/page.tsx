import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RoadmapGrid } from "@/components/roadmap-grid"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <SiteHeader />
      
      <main className="flex-1 font-[family-name:var(--font-source-sans)]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-black to-black" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative container mx-auto max-w-[1920px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 py-10 md:py-14">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-roadmap-text-secondary/70 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="size-4" />
              Back to Overview
            </Link>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
              Product Roadmap
            </h1>
            <p className="text-sm md:text-base text-roadmap-text-secondary/80 leading-relaxed max-w-2xl">
              Every feature across all suites, organized by quarter. Filter and search to find what matters most to you.
            </p>
          </div>
        </section>

        {/* Roadmap Grid */}
        <section className="bg-black">
          <div className="container mx-auto max-w-[1920px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 py-6 md:py-8 pb-12 md:pb-20">
            <RoadmapGrid />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
