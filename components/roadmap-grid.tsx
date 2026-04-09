"use client"

import React from "react"
import { CircleCheck, Zap, Target, Search, X, Sparkles, ChevronLeft, ChevronsRight, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const SPOTLIGHT_FEATURES = new Set([
  "Resource Booking – Credits",
  "Service Requests – Teams, Catalogues & Routing",
  "Service Requests – Preventative Maintenance",
  "Reporting – Tenant Health Score",
  "Leases – Lease Management",
  "Events – Multi-day Events",
])

function isSpotlightFeature(feature: string) {
  return SPOTLIGHT_FEATURES.has(feature)
}

/** Parse credential features to extract ACS systems */
function parseCredentialFeature(feature: string): { label: string; acsSystems: string[] } | null {
  const credentialMatch = feature.match(/^(Tenant Credentials|Visitor Credentials)\s*–\s*(.+?)\s*\((.+)\)$/)
  if (credentialMatch) {
    const [, type, method, acsString] = credentialMatch
    const acsSystems = acsString.split(',').map(s => s.trim())
    return {
      label: `${type} – ${method}`,
      acsSystems,
    }
  }
  return null
}

/** Help documentation links for delivered features */
function getHelpLink(feature: string): string | null {
  const lowerFeature = feature.toLowerCase()
  
  if (lowerFeature.includes("reporting") || lowerFeature.includes("intelligence") || lowerFeature.includes("analytics")) {
    return "https://helphub.hqo.com/help/analytics"
  }
  if (lowerFeature.includes("event")) {
    return "https://helphub.hqo.com/help/events"
  }
  if (lowerFeature.includes("visitor management") || lowerFeature.includes("access control")) {
    return "https://helphub.hqo.com/help/hqo-visitor-management-user-guides"
  }
  if (lowerFeature.includes("resource booking")) {
    return "https://helphub.hqo.com/help/hqo-resource-booking"
  }
  
  return null
}

const suites = [
  {
    name: "CRM",
    description: "Customer Relationship Management tools for managing contacts, tours, and leases",
    color: "suite-crm",
    quarters: {
      "2025": ["Contacts – Key Contacts", "Contacts – Contact Notes", "Data Management – Building Object & Table", "Data Management – Tagging Framework"],
      "Q1 2026": [],
      "Q2 2026": ["Leases - Yardi integration", "Leases – Lease Management"],
      "Q3 2026": ["Data Management – Custom Objects & Fields"],
      "Q4 2026": ["Tours – Brochure & Tour Content Tools", "Onboarding – Customizable Tenant Onboarding Workflows", "Leases – Lease Terms with Credits"],
    },
  },
  {
    name: "Experience",
    description: "Guest and tenant experiences including events, communications, and web portals",
    color: "suite-experience",
    quarters: {
      "2025": [
        "Events – Tickets", "Events – QR Check-in", "Events – Waitlist", "Events – Discounts",
        "Events – Multi-slot Events", "Events – Add Attendees from Admin", "Communication – Rich Content", "Communication – Newsletters",
      ],
      "Q1 2026": ["Experience – Automated Localized Posts", "Web Experience – Public Registration"],
      "Q2 2026": ["Events – Limiting Session Claims", "Events – Cancellation Notice"],
      "Q3 2026": [
        "Events – Automated Feedback",
        "Events – Multi-day Events",
        "Events – Flexible Payment Routing",
        "Experience – Integrated Digital Signage",
        "Admin On the Go – Event Management, Check-in & Communications",
      ],
      "Q4 2026": ["Events – Recurring Events"],
    },
  },
  {
    name: "Access Control (PAIR)",
    description: "Physical access and visitor management",
    color: "suite-access",
    quarters: {
      "2025": [
        "Visitor Management – Loading Dock Support", "Visitor Management – Wallet Visitor Pass (Wavelynx)", "Visitor Management – Reporting Enhancements",
        "Visitor Management – Bulk Registration", "Visitor Management – Automated Visitor Passes via Bookings",
        "Tenant Credentials – Wallet/NFC (Lenel, Genea, C-CURE)",
        "Visitor Credentials – QR Pass (Lenel, C-CURE)",
      ],
      "Q1 2026": [
        "Tenant Credentials – Wallet/NFC (AMAG, Integriti)",
        "Visitor Credentials – QR Pass (AMAG, Integriti)",
        "Visitor Management – Tenant-Initiated Vendor Visit Requests",
        "Visitor Management – Kiosk & Self-Service Check-in",
      ],
      "Q2 2026": [
        "Tenant Credentials – Wallet/NFC (Brivo, Genetec)",
        "Visitor Credentials – QR Pass (Brivo, Genetec)",
      ],
      "Q3 2026": ["Access Control – Command Center Activity & Audit Logs"],
      "Q4 2026": [
        "Access Control – Command Center Unified Credential Visibility",
        "Tenant Credentials – Wallet/NFC (Kastle)",
        "Visitor Credentials – QR Pass (Kastle)",
      ],
    },
  },
  {
    name: "Operations",
    description: "Service requests, resource booking, and operational workflows",
    color: "suite-operations",
    quarters: {
      "2025": [
        "Resource Booking – Branded Emails", "Resource Booking – Add Visitor to Booking", "Resource Booking – Discounts", "Resource Booking – On Account Payments",
        "Service Requests – Teams, Catalogues & Routing", "Service Requests – Two-way Messaging", "Resource Booking – Collections", "Resource Booking – Combined Meeting Rooms",
      ],
      "Q1 2026": [
        "Service Requests – Automated Feedback",
        "Resource Booking – Credits",
        "Resource Booking – Cancellation & Preset Refunds",
      ],
      "Q2 2026": [
        "Service Requests – Inventory & Inspections",
        "Service Requests – Pricing & Payments",
        "Service Requests – Billing & Yardi Invoicing",
        "Resource Booking – Automated Feedback",
        "Resource Booking – Office 365 (Outlook) Integration",
        "Resource Booking – Tripleseat Integration",
        "Admin On the Go – Service Request Management",
      ],
      "Q3 2026": [
        "Service Requests – Preventative Maintenance",
        "Resource Booking – Room Kiosks",
        "Resource Booking – Two-way Messaging",
        "Automation – Resource Booking → Service Request Integration",
      ],
      "Q4 2026": ["AI Automation – Admin Assistant"],
    },
  },
  {
    name: "Intelligence",
    description: "Analytics, reporting, and AI-powered automation",
    color: "suite-intelligence",
    quarters: {
      "2025": ["Reporting – New Intelligence Platform", "AI Automation – Agent Development"],
      "Q1 2026": [
        "Reporting – New Access Performance Reports",
        "Reporting – New Content Performance Reports",
        "Reporting – Sentiment & Feedback Analysis",
      ],
      "Q2 2026": ["Reporting – New Communications Reports", "Reporting – New Service Request Performance Reports"],
      "Q3 2026": ["Reporting – Tenant Health Score", "Reporting – New CRM Reports & Reporting"],
      "Q4 2026": ["Reporting – New Resource Booking Performance Reports", "Reporting – New Event Performance Reports"],
    },
  },
]

type QuarterColumn = {
  id: string
  label: string
  sublabel?: string
  status: "delivered" | "in-progress" | "upcoming"
  defaultExpanded: boolean
}

const QUARTER_COLUMNS: QuarterColumn[] = [
  { id: "2025", label: "2025", status: "delivered", defaultExpanded: true },
  { id: "Q1 2026", label: "Q1 2026", status: "delivered", defaultExpanded: true },
  { id: "Q2 2026", label: "Q2 2026", status: "upcoming", defaultExpanded: true },
  { id: "Q3 2026", label: "Q3 2026", status: "upcoming", defaultExpanded: true },
  { id: "Q4 2026", label: "Q4 2026", status: "upcoming", defaultExpanded: true },
]

const getStatusLabel = (status: QuarterColumn["status"]) => {
  switch (status) {
    case "delivered":
      return "Delivered"
    case "in-progress":
      return "In Progress"
    case "upcoming":
      return "Planned"
  }
}

function getFeaturesForQuarter(suite: (typeof suites)[0], quarterId: string): string[] {
  return suite.quarters[quarterId as keyof typeof suite.quarters] ?? []
}

function getTotalFeaturesForQuarter(quarterId: string): number {
  return suites.reduce((total, suite) => total + getFeaturesForQuarter(suite, quarterId).length, 0)
}

const getBorderColor = (color: string) => {
  const colors: Record<string, string> = {
    "suite-crm": "oklch(0.65 0.2 240)",
    "suite-experience": "oklch(0.60 0.18 310)",
    "suite-operations": "oklch(0.70 0.15 200)",
    "suite-intelligence": "oklch(0.75 0.18 90)",
    "suite-access": "oklch(0.68 0.20 150)",
  }
  return colors[color] || "oklch(0.70 0.15 240)"
}

const getStatusIcon = (status: QuarterColumn["status"]) => {
  switch (status) {
    case "delivered":
      return <CircleCheck className="size-3.5" strokeWidth={2.5} />
    case "in-progress":
      return <Zap className="size-3.5" strokeWidth={2.5} />
    case "upcoming":
      return <Target className="size-3.5" strokeWidth={2.5} />
  }
}

const getStatusColor = (status: QuarterColumn["status"]) => {
  switch (status) {
    case "delivered":
      return "bg-green-600"
    case "in-progress":
      return "bg-blue-600"
    case "upcoming":
      return "bg-amber-500"
  }
}

const LEFT_COL_DESKTOP = 280
const LEFT_COL_MOBILE = 100
const COL_WIDTH = 260

export function RoadmapGrid() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const headerScrollRef = React.useRef<HTMLDivElement>(null)
  const isScrollSyncing = React.useRef(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isMobile, setIsMobile] = React.useState(false)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  // Sync horizontal scroll between header and body
  const syncScroll = React.useCallback((source: "header" | "body") => {
    if (isScrollSyncing.current) return
    isScrollSyncing.current = true
    
    const header = headerScrollRef.current
    const body = scrollContainerRef.current
    
    if (source === "header" && header && body) {
      body.scrollLeft = header.scrollLeft
    } else if (source === "body" && header && body) {
      header.scrollLeft = body.scrollLeft
    }
    
    requestAnimationFrame(() => {
      isScrollSyncing.current = false
    })
  }, [])

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Check scroll position for indicators
  const updateScrollIndicators = React.useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    const hasHorizontalScroll = el.scrollWidth > el.clientWidth + 5
    setCanScrollLeft(hasHorizontalScroll && el.scrollLeft > 20)
    setCanScrollRight(hasHorizontalScroll && el.scrollLeft < el.scrollWidth - el.clientWidth - 20)
  }, [])

  React.useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    // Small delay to ensure content is rendered
    const timer = setTimeout(updateScrollIndicators, 100)
    el.addEventListener("scroll", updateScrollIndicators)
    window.addEventListener("resize", updateScrollIndicators)
    return () => {
      clearTimeout(timer)
      el.removeEventListener("scroll", updateScrollIndicators)
      window.removeEventListener("resize", updateScrollIndicators)
    }
  }, [updateScrollIndicators])

  const getFilteredFeatures = (features: string[]) => {
    if (!searchQuery.trim()) return features
    return features.filter((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const suiteHasMatchingFeatures = (suite: (typeof suites)[0]) => {
    if (!searchQuery.trim()) return true
    return QUARTER_COLUMNS.some((q) => {
      const features = getFeaturesForQuarter(suite, q.id)
      return features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
    })
  }

  const filteredSuites = searchQuery.trim() ? suites.filter(suiteHasMatchingFeatures) : suites

  const LEFT_COL = isMobile ? LEFT_COL_MOBILE : LEFT_COL_DESKTOP

  const colWidths = QUARTER_COLUMNS.map(() => COL_WIDTH)
  const totalWidth = LEFT_COL + colWidths.reduce((a, b) => a + b, 0) + (QUARTER_COLUMNS.length * 12)

  return (
    <div className="w-full">
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-roadmap-text-secondary" />
          <Input
            type="text"
            placeholder="Search features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 bg-roadmap-surface/60 border-roadmap-border text-roadmap-text-primary placeholder:text-roadmap-text-secondary/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-roadmap-text-secondary hover:text-roadmap-text-primary"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-center text-sm text-roadmap-text-secondary mt-2">
            Showing results for "{searchQuery}"
          </p>
        )}
        <p className="hidden md:block text-center text-[11px] text-roadmap-text-secondary/50 mt-3">
          Scroll horizontally to see more quarters →
        </p>
      </div>

      {/* Sticky header row - hidden on mobile */}
      <div className="hidden md:block sticky top-0 z-50 bg-black pt-4 pb-4">
        <div className="relative">
          {/* Left scroll indicator for header */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black via-black/80 to-transparent z-40 pointer-events-none flex items-center justify-start pl-1">
              <div className="bg-roadmap-surface/90 rounded-full p-1.5 shadow-lg">
                <ChevronLeft className="size-4 text-roadmap-text-secondary" />
              </div>
            </div>
          )}
          
          {/* Right scroll indicator for header */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-black/80 to-transparent z-40 pointer-events-none flex items-center justify-end pr-2">
              <div className="bg-roadmap-surface/90 rounded-full p-1.5 shadow-lg flex items-center gap-1">
                <span className="text-[10px] text-roadmap-text-secondary font-medium">More</span>
                <ChevronsRight className="size-4 text-roadmap-text-secondary" />
              </div>
            </div>
          )}

          <div 
            ref={headerScrollRef}
            onScroll={() => syncScroll("header")}
            className="overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-3" style={{ minWidth: totalWidth }}>
              {/* Spacer for suite column - sticky to match body */}
              <div className="shrink-0 sticky left-0 z-[60] bg-black" style={{ width: LEFT_COL }} />

              {/* Quarter column headers */}
              {QUARTER_COLUMNS.map((quarter, idx) => {
                const featureCount = getTotalFeaturesForQuarter(quarter.id)
                
                return (
                  <div
                    key={quarter.id}
                    className="shrink-0 rounded-xl border border-roadmap-border bg-roadmap-surface/80 px-4 py-4"
                    style={{ width: colWidths[idx] }}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-roadmap-text-primary">{quarter.label}</span>
                        <span className={cn(
                          "text-[9px] font-medium px-1.5 py-0.5 rounded-full",
                          quarter.status === "delivered" && "bg-emerald-500/20 text-emerald-400",
                          quarter.status === "in-progress" && "bg-blue-500/20 text-blue-400",
                          quarter.status === "upcoming" && "bg-amber-500/20 text-amber-400",
                        )}>
                          {getStatusLabel(quarter.status)}
                        </span>
                      </div>
                      <span className="text-[11px] text-roadmap-text-secondary/70">{featureCount} features</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Body with scroll sync */}
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          onScroll={() => syncScroll("body")}
          className="overflow-x-auto pb-4"
        >
          <div style={{ minWidth: totalWidth }}>
            {/* Suite rows */}
            <div className="space-y-4">
            {filteredSuites.map((suite) => (
              <div key={suite.name} className="flex flex-col md:flex-row gap-3">
                {/* Suite info - full width on mobile, sticky left on desktop */}
                <div
                  className="w-full md:w-auto shrink-0 md:sticky md:left-0 z-40 rounded-xl border border-roadmap-border bg-roadmap-surface/95 backdrop-blur-sm p-4 md:p-5 transition-all duration-300 hover:bg-roadmap-surface shadow-lg"
                  style={{ 
                    width: isMobile ? '100%' : LEFT_COL, 
                    borderLeftColor: getBorderColor(suite.color), 
                    borderLeftWidth: 4 
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-1.5 size-3 shrink-0 rounded-full"
                      style={{ backgroundColor: getBorderColor(suite.color) }}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm md:text-base font-bold text-roadmap-text-primary">{suite.name}</h3>
                      <p className="text-[10px] md:text-xs text-roadmap-text-secondary leading-relaxed">
                        {suite.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Quarter cells - horizontal scroll on mobile */}
                <div className="flex gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">

                {/* Quarter cells */}
                {QUARTER_COLUMNS.map((quarter, idx) => {
                  const allFeatures = getFeaturesForQuarter(suite, quarter.id)
                  const features = getFilteredFeatures(allFeatures)
                  const hasHiddenFeatures = searchQuery && features.length < allFeatures.length

                  // Sort: credentials first, then spotlight, then regular
                  const sortedFeatures = [...features].sort((a, b) => {
                    const aCredential = parseCredentialFeature(a) ? 0 : 1
                    const bCredential = parseCredentialFeature(b) ? 0 : 1
                    if (aCredential !== bCredential) return aCredential - bCredential
                    const aSpot = isSpotlightFeature(a) ? 0 : 1
                    const bSpot = isSpotlightFeature(b) ? 0 : 1
                    return aSpot - bSpot
                  })

                  return (
                    <div
                      key={quarter.id}
                      className="shrink-0 rounded-xl border border-roadmap-border transition-all duration-300 bg-roadmap-surface/60 p-4 hover:bg-roadmap-surface/70"
                      style={{
                        width: colWidths[idx],
                        borderLeftColor: getBorderColor(suite.color),
                        borderLeftWidth: 4,
                      }}
                    >
                      {sortedFeatures.length > 0 ? (
                        <>
                          <div className="flex flex-wrap gap-1.5">
                            {sortedFeatures.map((feature, index) => {
                              const spotlight = isSpotlightFeature(feature)
                              const isDelivered = quarter.status === "delivered"
                              const helpLink = isDelivered ? getHelpLink(feature) : null
                              const credentialData = parseCredentialFeature(feature)
                              
                              const staggerClass = cn(
                                index === 0 && "stagger-1",
                                index === 1 && "stagger-2",
                                index === 2 && "stagger-3",
                                index === 3 && "stagger-4",
                                index >= 4 && "stagger-5",
                              )
                                
                                // Special rendering for credential features with ACS badges
                                if (credentialData) {
                                  return (
                                    <div
                                      key={index}
                                      className={cn(
                                        "animate-fade-in-up opacity-0 rounded-lg px-2.5 py-2 transition-all duration-200",
                                        "bg-roadmap-surface/40 border border-dashed border-roadmap-border hover:border-roadmap-text-secondary/50",
                                        staggerClass,
                                      )}
                                    >
                                      <div className="text-[10px] text-roadmap-text-secondary mb-1.5">
                                        {credentialData.label}
                                      </div>
                                      <div className="flex flex-wrap gap-1">
                                        {credentialData.acsSystems.map((acs, acsIndex) => (
                                          <span
                                            key={acsIndex}
                                            className="text-[10px] px-2 py-1 rounded bg-roadmap-surface-hover text-roadmap-text-primary border border-roadmap-border/50"
                                          >
                                            {acs}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )
                                }
                                
                                const pillClasses = cn(
                                  "animate-fade-in-up opacity-0 text-[11px] leading-snug rounded-full px-2.5 py-1.5 transition-all duration-200",
                                  spotlight
                                    ? "bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-orange-500/15 border border-amber-400/30 hover:border-amber-400/50 hover:scale-[1.02]"
                                    : "bg-roadmap-surface-hover/60 border border-roadmap-border/30 hover:border-roadmap-border/50 hover:bg-roadmap-surface-hover",
                                  helpLink && "cursor-pointer hover:scale-[1.02]",
                                  staggerClass,
                                )
                                
                                const pillContent = (
                                  <>
                                    {spotlight && (
                                      <Sparkles className="inline size-3 text-amber-400 mr-1" />
                                    )}
                                    <span
                                      className={cn(
                                        "text-roadmap-text-primary",
                                        spotlight && "font-medium text-amber-100",
                                      )}
                                    >
                                      {searchQuery ? (
                                        <HighlightText text={feature} highlight={searchQuery} />
                                      ) : (
                                        feature
                                      )}
                                    </span>
                                    {helpLink && (
                                      <ExternalLink className="inline size-3 text-roadmap-text-secondary/60 ml-1.5" />
                                    )}
                                  </>
                                )
                                
                                return helpLink ? (
                                  <a
                                    key={index}
                                    href={helpLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={pillClasses}
                                  >
                                    {pillContent}
                                  </a>
                                ) : (
                                  <div key={index} className={pillClasses}>
                                    {pillContent}
                                  </div>
                                )
                              })}
                          </div>
                          {hasHiddenFeatures && (
                            <p className="text-[10px] text-roadmap-text-secondary/50 mt-2">
                              +{allFeatures.length - features.length} more
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-[11px] text-roadmap-text-secondary/40 text-center py-6 italic">
                          {searchQuery ? "No matches" : "On our radar"}
                        </p>
                      )}
                    </div>
                  )
                })}
                </div>
              </div>
            ))}
          </div>

          {searchQuery && filteredSuites.length === 0 && (
            <div className="text-center py-12">
              <p className="text-roadmap-text-secondary text-lg">No features found matching "{searchQuery}"</p>
              <button onClick={() => setSearchQuery("")} className="mt-4 text-blue-400 hover:text-blue-300 underline">
                Clear search
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
      
      {/* Footer disclaimer */}
      <div className="mt-8 text-center">
        <p className="text-[11px] text-roadmap-text-secondary/50 italic">
          The further out, the fuzzier things get 🔮 — plans may shift as we learn and grow
        </p>
      </div>
    </div>
  )
}

function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) return <>{text}</>

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-500/30 text-roadmap-text-primary rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}
