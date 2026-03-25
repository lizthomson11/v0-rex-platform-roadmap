import { RoadmapGrid } from "@/components/roadmap-grid"
import { InteractiveHero } from "@/components/interactive-hero"

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto max-w-[1920px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 py-8 md:py-12 lg:py-16 pb-12 md:pb-20">
        <InteractiveHero />
        <RoadmapGrid />
      </div>
    </div>
  )
}
