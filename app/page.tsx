import { RoadmapGrid } from "@/components/roadmap-grid"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-roadmap-background via-roadmap-surface to-roadmap-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-roadmap-text-primary lg:text-5xl">
            REX Platform Roadmap
          </h1>
          <p className="text-balance text-xl text-roadmap-text-secondary">2025–2026 Product Development Timeline</p>
        </div>
        <RoadmapGrid />
      </div>
    </div>
  )
}
