"use client"

import React from "react"
import { Check, Clock, Calendar, Users, Star, Shield, Settings, BarChart3, Search, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const suites = [
  {
    name: "CRM",
    description: "Customer Relationship Management tools for managing contacts, tours, and leases",
    color: "suite-crm",
    quarters: {
      "Q3 2025": ["Contacts – Key Contacts", "Contacts – Contact Notes"],
      "Q4 2025": ["Data Management – Building Object & Table", "Data Management – Tagging Framework"],
      "Q1 2026": ["Contacts – Contact Tracking", "Leases - Yardi integration"],
      "Q2 2026": ["Data Management – Pipeline & Lease Object"],
      "Q3 2026": ["Leases – Lease Terms with Credits", "Data Management – Custom Objects & Fields"],
      "Q4 2026": ["Tours – Brochure & Tour Content Tools", "Onboarding – Customizable Tenant Onboarding Workflows"],
    },
  },
  {
    name: "Experience",
    description: "Guest and tenant experiences including events, communications, and web portals",
    color: "suite-experience",
    quarters: {
      "Q3 2025": ["Events – Tickets", "Events – QR Check-in", "Events – Waitlist", "Events – Discounts"],
      "Q4 2025": [
        "Events – Multi-slot Events",
        "Events – Add Attendees from Admin",
        "Communication – Rich Content",
        "Communication – Newsletters",
      ],
      "Q1 2026": ["Events – Flexible Payment Routing", "Experience – Automated Localized Posts"],
      "Q2 2026": ["Events – Multi-day Events", "Events – Automated Feedback"],
      "Q3 2026": [
        "Web Experience – Public Property Page",
        "Web Experience – Public Registration",
        "Experience – Integrated Digital Signage",
        "Admin On the Go – Event Management, Check-in & Communications",
      ],
      "Q4 2026": ["Events – Recurring Events", "AI Automation – Concierge Consumer App"],
    },
  },
  {
    name: "Access Control (PAIR)",
    description: "Physical access and visitor management",
    color: "suite-access",
    quarters: {
      "Q3 2025": [
        "Access Control – AMAG Integration",
        "Visitor Management – Loading Dock Support",
        "Visitor Management – Wallet Visitor Pass (Wavelynx)",
        "Visitor Management – Reporting Enhancements",
      ],
      "Q4 2025": [
        "Access Control – Genetec Integration",
        "Visitor Management – Bulk Registration",
        "Visitor Management – Automated Visitor Passes via Bookings",
      ],
      "Q1 2026": [
        "Access Control – Integriti Integration",
        "Visitor Management – Tenant-Initiated Vendor Visit Requests",
        "Visitor Management – Kiosk & Self-Service Check-in",
      ],
      "Q2 2026": ["Access Control – Brivo Integration", "Access Control – Kastle Integration"],
      "Q3 2026": ["Access Control – Command Center Activity & Audit Logs"],
      "Q4 2026": ["Access Control – Command Center Unified Credential Visibility"],
    },
  },
  {
    name: "Operations",
    description: "Service requests, resource booking, and operational workflows",
    color: "suite-operations",
    quarters: {
      "Q3 2025": [
        "Resource Booking – Branded Emails",
        "Resource Booking – Add Visitor to Booking",
        "Resource Booking – Discounts",
        "Resource Booking – On Account Payments",
      ],
      "Q4 2025": [
        "Service Requests – Teams, Catalogues & Routing",
        "Service Requests – Two-way Messaging",
        "Resource Booking – Collections",
        "Resource Booking – Combined Meeting Rooms",
      ],
      "Q1 2026": [
        "Service Requests – Inventory & Inspections",
        "Service Requests – Pricing & Payments",
        "Service Requests – Automated Feedback",
        "Resource Booking – Credits",
        "Resource Booking – Cancellation & Preset Refunds",
      ],
      "Q2 2026": [
        "Resource Booking – Automated Feedback",
        "Resource Booking – Office 365 (Outlook) Integration",
        "Resource Booking – Tripleseat Integration",
        "Service Requests – Billing & Yardi Invoicing",
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
      "Q3 2025": ["Reporting- New intelligence platform", "AI Automation – Agent Development"],
      "Q4 2025": ["AI Automation – Agent Development"],
      "Q1 2026": [
        "Reporting – New Access Performance Reports",
        "Reporting – New Content Performance Reports",
        "Reporting – Sentiment & Feedback Analysis",
        "Reporting – New Communications Reports",
      ],
      "Q2 2026": [
        "Reporting – New Service Request Performance Reports",
        "Reporting – New Event Performance Reports",
        "Reporting – New Resource Booking Performance Reports",
        "Reporting – New CRM Reports",
      ],
      "Q3 2026": ["Reporting – Tenant Health Score", "Reporting – New CRM Reports & Reporting"],
      "Q4 2026": ["Reporting – New Report Types"],
    },
  },
]

const quarterHeaders = [
  { quarter: "Q3 2025", status: "delivered" as const },
  { quarter: "Q4 2025", status: "delivered" as const },
  { quarter: "Q1 2026", status: "in-progress" as const },
  { quarter: "Q2 2026", status: "upcoming" as const },
  { quarter: "Q3 2026", status: "upcoming" as const },
  { quarter: "Q4 2026", status: "upcoming" as const },
]

const LEFT_COL_DESKTOP = 300
const LEFT_COL_MOBILE = 60
const COL_WIDTH_DESKTOP = 280
const COL_WIDTH_DESKTOP_WIDE = 240
const COL_WIDTH_MOBILE = 240
const GAP = 24 // gap-6 in pixels

const getSuiteIcon = (name: string) => {
  const icons: Record<string, React.ReactNode> = {
    CRM: <Users className="size-5" />,
    Experience: <Star className="size-5" />,
    "Access Control (PAIR)": <Shield className="size-5" />,
    Operations: <Settings className="size-5" />,
    Intelligence: <BarChart3 className="size-5" />,
  }
  return icons[name] || <Users className="size-5" />
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

export function RoadmapGrid() {
  const colCount = quarterHeaders.length

  const headerScrollRef = React.useRef<HTMLDivElement | null>(null)
  const bodyScrollRef = React.useRef<HTMLDivElement | null>(null)
  const syncingRef = React.useRef<"header" | "body" | null>(null)

  const [isMobile, setIsMobile] = React.useState(false)
  const [viewportWidth, setViewportWidth] = React.useState(0)
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setViewportWidth(width)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const LEFT_COL = isMobile ? LEFT_COL_MOBILE : LEFT_COL_DESKTOP
  const COL_WIDTH = isMobile
    ? COL_WIDTH_MOBILE
    : viewportWidth >= 1536
      ? COL_WIDTH_DESKTOP_WIDE
      : COL_WIDTH_DESKTOP

  const syncScroll = (source: "header" | "body") => {
    const headerEl = headerScrollRef.current
    const bodyEl = bodyScrollRef.current
    if (!headerEl || !bodyEl) return

    if (syncingRef.current && syncingRef.current !== source) return

    syncingRef.current = source

    const left = source === "header" ? headerEl.scrollLeft : bodyEl.scrollLeft
    if (source === "header") bodyEl.scrollLeft = left
    else headerEl.scrollLeft = left

    requestAnimationFrame(() => {
      syncingRef.current = null
    })
  }

  const getQuarterTotal = (quarterName: string) => {
    return suites.reduce((total, suite) => {
      return total + (suite.quarters[quarterName as keyof typeof suite.quarters]?.length || 0)
    }, 0)
  }

  const getFilteredFeatures = (features: string[]) => {
    if (!searchQuery.trim()) return features
    return features.filter((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const suiteHasMatchingFeatures = (suite: (typeof suites)[0]) => {
    if (!searchQuery.trim()) return true
    return Object.values(suite.quarters).some((features) =>
      features.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  const contentWidth = LEFT_COL + colCount * COL_WIDTH + colCount * GAP

  const gridColsStyle: React.CSSProperties = {
    gridTemplateColumns: `${LEFT_COL}px repeat(${colCount}, ${COL_WIDTH}px)`,
  }

  const filteredSuites = searchQuery.trim() ? suites.filter(suiteHasMatchingFeatures) : suites

  return (
    <div className="w-full px-2 md:px-6 lg:px-0">
      <div className="mb-4 md:mb-6">
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
            Showing results for "{searchQuery}" in {filteredSuites.length} suite(s)
          </p>
        )}
        {!searchQuery && (
          <p className="text-center text-xs md:text-sm text-roadmap-text-secondary/80 mt-2">
            {isMobile ? "Swipe horizontally to see more quarters →" : "Scroll horizontally to see more quarters →"}
          </p>
        )}
      </div>

      <div className="sticky top-0 z-50 bg-roadmap-background/90 backdrop-blur-xl pb-2 md:pb-4 shadow-lg">
        <div
          ref={headerScrollRef}
          onScroll={() => syncScroll("header")}
          className="overflow-x-auto overflow-y-hidden bg-roadmap-background pl-2 md:pl-4 [scrollbar-gutter:stable]"
        >
          <div className="grid gap-3 md:gap-6" style={{ ...gridColsStyle, width: contentWidth }}>
            <div className="sticky left-0 z-[60] rounded-lg border border-roadmap-border bg-roadmap-background/90 backdrop-blur-xl px-2 md:px-4 py-2 md:py-4 flex items-center justify-center shadow-lg">
              <h2 className="hidden md:block text-xl font-bold text-roadmap-text-primary">Suite</h2>
              <span className="md:hidden text-xs font-bold text-roadmap-text-secondary">Suite</span>
            </div>

            {quarterHeaders.map((header) => (
              <div
                key={header.quarter}
                className="rounded-lg border border-roadmap-border bg-roadmap-surface/80 backdrop-blur-xl px-2 md:px-4 py-2 md:py-4 shadow-lg flex flex-col justify-center"
              >
                <div className="flex flex-col items-center gap-1 md:gap-2">
                  <div className="flex items-center justify-center flex-wrap gap-1 md:gap-2">
                    <h2 className="text-center text-sm md:text-xl font-bold text-roadmap-text-primary">
                      {header.quarter}
                    </h2>

                    {header.status === "delivered" && (
                      <span className="inline-flex items-center gap-0.5 md:gap-1 rounded-full bg-green-600 px-1.5 md:px-2.5 py-0.5 md:py-1 text-[10px] md:text-xs font-bold text-white shadow-sm">
                        <Check className="size-2.5 md:size-3.5" strokeWidth={3} />
                        <span className="hidden sm:inline">Delivered</span>
                      </span>
                    )}
                    {header.status === "in-progress" && (
                      <span className="inline-flex items-center gap-0.5 md:gap-1 rounded-full bg-blue-600 px-1.5 md:px-2.5 py-0.5 md:py-1 text-[10px] md:text-xs font-bold text-white shadow-sm">
                        <Clock className="size-2.5 md:size-3.5" strokeWidth={3} />
                        <span className="hidden sm:inline">In Progress</span>
                      </span>
                    )}
                    {header.status === "upcoming" && (
                      <span className="inline-flex items-center gap-0.5 md:gap-1 rounded-full bg-amber-500 px-1.5 md:px-2.5 py-0.5 md:py-1 text-[10px] md:text-xs font-bold text-white shadow-sm">
                        <Calendar className="size-2.5 md:size-3.5" strokeWidth={3} />
                        <span className="hidden sm:inline">Planned</span>
                      </span>
                    )}
                  </div>

                  <div className="text-xs md:text-sm font-medium text-roadmap-text-secondary">
                    {getQuarterTotal(header.quarter)} <span className="hidden sm:inline">features</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={bodyScrollRef}
        onScroll={() => syncScroll("body")}
        className="overflow-x-auto overflow-y-visible bg-roadmap-background pl-2 md:pl-4 [scrollbar-gutter:stable]"
      >
        <div className="space-y-3 md:space-y-4" style={{ width: contentWidth }}>
          {filteredSuites.map((suite) => (
            <div
              key={suite.name}
              className="grid gap-3 md:gap-6 pb-4 md:pb-6 border-b border-roadmap-border/30 last:border-b-0"
              style={gridColsStyle}
            >
              <div className="sticky left-0 z-40 rounded-lg border border-roadmap-border bg-roadmap-background/90 backdrop-blur-sm p-2 pl-3 md:p-4 md:pl-6 flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-4 shadow-md">
                <div
                  className="size-8 md:size-4 shrink-0 rounded-full ring-2 ring-offset-2 ring-offset-roadmap-background ring-current/30 flex items-center justify-center md:mt-1"
                  style={{ backgroundColor: getBorderColor(suite.color) }}
                >
                  <span className="md:hidden text-white">{getSuiteIcon(suite.name)}</span>
                </div>
                <div className="hidden md:block">
                  <h3 className="text-xl font-bold text-roadmap-text-primary mb-2">{suite.name}</h3>
                  <p className="text-sm text-roadmap-text-secondary leading-relaxed">{suite.description}</p>
                </div>
                <span className="md:hidden text-[10px] font-semibold text-roadmap-text-secondary text-center leading-tight">
                  {suite.name.split(" ")[0]}
                </span>
              </div>

              {quarterHeaders.map((header) => {
                const allFeatures = suite.quarters[header.quarter as keyof typeof suite.quarters] || []
                const features = getFilteredFeatures(allFeatures)
                const hasHiddenFeatures = searchQuery && features.length < allFeatures.length

                return (
                  <Card
                    key={`${suite.name}-${header.quarter}`}
                    className="border-l-4 border-t border-r border-b border-roadmap-border bg-roadmap-surface/60 backdrop-blur-sm transition-all hover:border-roadmap-border-hover hover:shadow-lg"
                    style={{ borderLeftColor: getBorderColor(suite.color) }}
                  >
                    <CardContent className="p-2 md:p-5">
                      {features.length > 0 ? (
                        <>
                          <ul className="space-y-1 md:space-y-2">
                            {features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-1.5 md:gap-3 text-xs md:text-sm leading-snug">
                                <span className="mt-1 md:mt-1.5 size-1.5 md:size-2 shrink-0 rounded-full bg-roadmap-text-secondary" />
                                <span className="leading-relaxed text-roadmap-text-primary">
                                  {searchQuery ? <HighlightText text={feature} highlight={searchQuery} /> : feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                          {hasHiddenFeatures && (
                            <p className="text-xs text-roadmap-text-secondary/50 mt-2">
                              +{allFeatures.length - features.length} more
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="text-center text-xs md:text-sm text-roadmap-text-secondary/50 py-2 md:py-4">
                          {searchQuery ? "No matches" : "No features"}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ))}

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
