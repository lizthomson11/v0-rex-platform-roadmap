import { RoadmapGrid } from "@/components/roadmap-grid"
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-roadmap-background">
      <div className="container mx-auto px-2 md:px-4 py-6 md:py-12 lg:py-16">
        <div className="mb-6 md:mb-12 text-center">
          <div className="mb-3 md:mb-6 flex justify-center">
            <Image
              src="/images/hqo-profile-pic-x2.png"
              alt="HqO Logo"
              width={80}
              height={80}
              className="rounded-full w-12 h-12 md:w-20 md:h-20"
            />
          </div>
          <h1 className="mb-2 md:mb-4 text-2xl md:text-4xl font-bold tracking-tight text-roadmap-text-primary lg:text-5xl">
            REX Platform Roadmap
          </h1>
          <p className="text-balance text-sm md:text-xl text-roadmap-text-secondary">
            2025–2026 Product Development Timeline
          </p>
        </div>
        <RoadmapGrid />
      </div>
    </div>
  )
}
