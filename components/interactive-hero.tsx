"use client"

import React, { useRef, useState } from "react"
import Image from "next/image"

export function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateX = (mouseY / rect.height) * -15
    const rotateY = (mouseX / rect.width) * 15
    
    setTransform({ rotateX, rotateY, scale: 1.02 })
  }

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 })
  }

  return (
    <div className="mb-10 md:mb-14 text-center relative">
      {/* Subtle glow effect behind header */}
      <div className="absolute inset-0 -top-10 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-gradient-to-b from-blue-500/10 via-violet-500/8 to-transparent blur-3xl opacity-60" />
      </div>
      
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Left side - Text content */}
        <div className="text-center lg:text-left max-w-md">
          {/* Logo with cute glow */}
          <div className="mb-4 md:mb-5 flex justify-center lg:justify-start">
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
          
          {/* Title */}
          <h1 className="mb-2 md:mb-3 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
            REX Platform Roadmap
          </h1>
          
          {/* Subtitle */}
          <p className="text-balance text-xs md:text-sm text-roadmap-text-secondary/70">
            ✨ What we're building for 2025–2026
          </p>
        </div>
        
        {/* Right side - Interactive product image */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-[400px] lg:max-w-[500px] perspective-1000"
          style={{ perspective: "1000px" }}
        >
          {/* Glow behind image */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-teal-500/15 to-emerald-500/20 blur-3xl rounded-full scale-75 opacity-50" />
          
          {/* Floating animation wrapper */}
          <div 
            className="relative animate-float"
            style={{
              transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
              transition: "transform 0.15s ease-out",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="/images/product-collage.png"
              alt="HqO Platform Features"
              width={500}
              height={500}
              className="relative drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
