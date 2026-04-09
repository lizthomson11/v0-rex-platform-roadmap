"use client"

import { useState, useRef, useEffect } from "react"
import { X, Zap, Receipt, Brain, Link2, Sparkles, Building2 } from "lucide-react"

type KeyTheme = {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  description: string
  features: string[]
}

const KEY_THEMES: KeyTheme[] = [
  {
    id: "automation",
    title: "Workflow Automation",
    subtitle: "Service Requests + Resource Booking",
    icon: Zap,
    color: "violet",
    description: "Seamlessly connect Service Requests and Resource Booking to create automated workflows that save time and reduce manual work.",
    features: [
      "Auto-generate service requests from bookings",
      "Trigger maintenance workflows automatically",
      "Cross-suite data synchronization",
      "Custom automation rules",
    ],
  },
  {
    id: "invoicing",
    title: "Connected Invoicing",
    subtitle: "Unified billing across operations",
    icon: Receipt,
    color: "violet",
    description: "Generate invoices automatically from service requests, bookings, and other platform activities with direct Yardi integration.",
    features: [
      "Automated invoice generation",
      "Yardi billing integration",
      "Service request pricing & payments",
      "Consolidated tenant billing",
    ],
  },
  {
    id: "ai-leasing",
    title: "AI Lease Abstraction",
    subtitle: "Intelligent document processing",
    icon: Brain,
    color: "violet",
    description: "Use AI to automatically extract and structure key terms from lease documents, reducing manual data entry and improving accuracy.",
    features: [
      "Automatic term extraction",
      "Lease document parsing",
      "Data validation & verification",
      "Integration with lease management",
    ],
  },
  {
    id: "integrations",
    title: "Deep Integrations",
    subtitle: "Connect your systems",
    icon: Link2,
    color: "violet",
    description: "Expand connectivity with Office 365, Tripleseat, and more to create a unified property management ecosystem.",
    features: [
      "Office 365 (Outlook) calendar sync",
      "Tripleseat event management",
      "Access control systems",
      "Building management systems",
    ],
  },
  {
    id: "ai-assistant",
    title: "AI Admin Assistant",
    subtitle: "Intelligent automation",
    icon: Sparkles,
    color: "violet",
    description: "An AI-powered assistant to help property managers automate routine tasks and get intelligent recommendations.",
    features: [
      "Natural language commands",
      "Automated task execution",
      "Smart recommendations",
      "Cross-suite intelligence",
    ],
  },
  {
    id: "command-center",
    title: "Command Center",
    subtitle: "Unified access control visibility",
    icon: Building2,
    color: "violet",
    description: "A centralized dashboard for managing credentials, viewing activity logs, and maintaining security across your portfolio.",
    features: [
      "Unified credential visibility",
      "Activity & audit logs",
      "Multi-ACS management",
      "Security monitoring",
    ],
  },
]

export function HeroCarousel() {
  const [selectedTheme, setSelectedTheme] = useState<KeyTheme | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Duplicate themes for infinite scroll effect
  const duplicatedThemes = [...KEY_THEMES, ...KEY_THEMES]

  // Auto-scroll effect with seamless loop
  useEffect(() => {
    if (isPaused || selectedTheme) return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const intervalId = setInterval(() => {
      if (!scrollContainer) return
      
      // Get the width of one set of items (half the total since we duplicated)
      const singleSetWidth = scrollContainer.scrollWidth / 2
      
      // When we've scrolled past the first set, seamlessly reset to start
      if (scrollContainer.scrollLeft >= singleSetWidth) {
        scrollContainer.scrollLeft = scrollContainer.scrollLeft - singleSetWidth
      }
      
      scrollContainer.scrollLeft += 1
    }, 30) // ~33fps, moves 1px every 30ms

    return () => clearInterval(intervalId)
  }, [isPaused, selectedTheme])

  const renderCard = (theme: KeyTheme, index: number) => {
    const Icon = theme.icon
    return (
      <button
        key={`${theme.id}-${index}`}
        onClick={() => setSelectedTheme(theme)}
        className="shrink-0 group relative rounded-xl p-[1px] w-[240px] text-left transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-violet-500/50 via-fuchsia-500/30 to-violet-500/50 hover:from-violet-400/70 hover:via-fuchsia-400/50 hover:to-violet-400/70"
      >
        <div className="h-full rounded-xl bg-black/90 backdrop-blur-sm p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-500/20 border border-violet-500/30 shrink-0">
                <Icon className="size-5 text-violet-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">{theme.title}</h3>
            </div>
            <p className="text-[11px] text-roadmap-text-secondary/70 leading-relaxed">{theme.subtitle}</p>
          </div>
          <div className="absolute bottom-3 right-3 text-[10px] text-violet-400/60 opacity-0 group-hover:opacity-100 transition-opacity">
            Learn more →
          </div>
        </div>
      </button>
    )
  }

  return (
    <>
      {/* Carousel */}
      <div className="mt-10 md:mt-12">
        <p className="text-xs text-roadmap-text-secondary/60 mb-4">Key themes we're investing in</p>
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
        >
          {duplicatedThemes.map((theme, index) => renderCard(theme, index))}
        </div>
      </div>

      {/* Modal */}
      {selectedTheme && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedTheme(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal content */}
          <div 
            className="relative rounded-2xl p-[1px] max-w-lg w-full bg-gradient-to-br from-violet-500/60 via-fuchsia-500/40 to-violet-500/60 shadow-2xl shadow-violet-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black/95 backdrop-blur-md rounded-2xl p-6">
              {/* Close button */}
              <button
                onClick={() => setSelectedTheme(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="size-4 text-white" />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-violet-500/20 border border-violet-500/30">
                  <selectedTheme.icon className="size-6 text-violet-300" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedTheme.title}</h2>
                  <p className="text-sm text-roadmap-text-secondary/70">{selectedTheme.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-roadmap-text-secondary/90 leading-relaxed mb-6">
                {selectedTheme.description}
              </p>

              {/* Features */}
              <div>
                <h3 className="text-xs font-semibold text-roadmap-text-secondary/60 uppercase tracking-wider mb-3">What's included</h3>
                <ul className="space-y-2">
                  {selectedTheme.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white">
                      <div className="size-1.5 rounded-full bg-violet-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-[11px] text-roadmap-text-secondary/50 italic">
                  Explore the roadmap below for detailed timelines
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
