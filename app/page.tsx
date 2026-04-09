import { RoadmapGrid } from "@/components/roadmap-grid"
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto max-w-[1920px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 py-8 md:py-12 lg:py-16 pb-12 md:pb-20">
        {/* Modern Header */}
        <div className="mb-8 md:mb-12 text-center relative">
          {/* Subtle glow effect behind header */}
          <div className="absolute inset-0 -top-10 flex justify-center pointer-events-none">
            <div className="w-[400px] h-[200px] bg-gradient-to-b from-violet-500/8 via-fuchsia-500/5 to-transparent blur-3xl opacity-70" />
          </div>
          
          <div className="relative">
            {/* Logo with cute glow */}
            <div className="mb-4 md:mb-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-violet-400/25 via-fuchsia-400/20 to-pink-400/25 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                <Image
                  src="/images/hqo-profile-pic-x2.png"
                  alt="HqO Logo"
                  width={64}
                  height={64}
                  className="relative rounded-full w-12 h-12 md:w-16 md:h-16 ring-2 ring-white/10 shadow-lg"
                />
              </div>
            </div>
            
            {/* Title - smaller and cuter */}
            <h1 className="mb-2 md:mb-3 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
              REX Platform Roadmap
            </h1>
            
            {/* Subtitle */}
            <p className="text-balance text-xs md:text-sm text-roadmap-text-secondary/70 max-w-sm mx-auto">
              What we're building for 2025–2026
            </p>
          </div>
        </div>
        <RoadmapGrid />
      </div>
    </div>
  )
}
