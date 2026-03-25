import { RoadmapGrid } from "@/components/roadmap-grid"
import { InteractiveHero } from "@/components/interactive-hero"

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black via-black to-slate-950">
        <div className="container mx-auto max-w-[1920px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 py-8 md:py-12 lg:py-16">
          <InteractiveHero />
        </div>
      </div>
      
      {/* Divider Banner */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-teal-500/20" />
        <div className="relative bg-slate-950/80 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto max-w-[1920px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 py-4">
            <p className="text-center text-sm text-roadmap-text-secondary/80">
              Explore our product development timeline below
            </p>
          </div>
        </div>
      </div>
      
      {/* Roadmap Section */}
      <div className="bg-black">
        <div className="container mx-auto max-w-[1920px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 py-8 md:py-12 pb-12 md:pb-20">
          <RoadmapGrid />
        </div>
      </div>
    </div>
  )
}
