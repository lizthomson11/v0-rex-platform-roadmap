import { Check, Clock, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
      "Q3 2026": [
        "Access Control – Command Center Unified Credential Visibility",
        "Access Control – Command Center Activity & Audit Logs",
      ],
      "Q4 2026": [],
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
        "Service Requests – Billing & Yardi Invoicing",
        "Resource Booking – Automated Feedback",
        "Resource Booking – Office 365 (Outlook) Integration",
        "Resource Booking – Tripleseat Integration",
        "Admin On the Go – Service Request Management",
      ],
      "Q3 2026": [
        "Service Requests – Preventative Maintenance",
        "Experience – Digital Signage",
        "Automation – Resource Booking → Service Request Integration",
        "Resource Booking – Room Kiosks",
        "Resource Booking – Two-way Messaging",
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

export function RoadmapGrid() {
  const getQuarterTotal = (quarterName: string) => {
    return suites.reduce((total, suite) => {
      return total + (suite.quarters[quarterName as keyof typeof suite.quarters]?.length || 0)
    }, 0)
  }

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      "suite-crm": "bg-suite-crm",
      "suite-experience": "bg-suite-experience",
      "suite-operations": "bg-suite-operations",
      "suite-intelligence": "bg-suite-intelligence",
      "suite-access": "bg-suite-access",
    }
    return colors[color] || "bg-primary"
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

  return (
    <div className="-mx-6 px-6">
      {/* Quarter Headers - Now sticky to viewport */}
      <div className="sticky top-0 z-40 bg-roadmap-background shadow-lg pb-4 -mx-6 px-6 overflow-x-auto">
        <div className="min-w-[2180px]">
          <div className="relative grid grid-cols-[300px_repeat(6,280px)] gap-6">
            <div className="sticky left-0 z-50 rounded-lg border border-roadmap-border bg-roadmap-background backdrop-blur-xl px-4 py-4 flex items-center justify-center shadow-lg h-full">
              <h2 className="relative text-xl font-bold text-roadmap-text-primary">Suite</h2>
            </div>
            {quarterHeaders.map((header) => (
              <div
                key={header.quarter}
                className="rounded-lg border border-roadmap-border bg-roadmap-background backdrop-blur-xl px-4 py-4 shadow-lg flex flex-col justify-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center flex-wrap gap-2">
                    <h2 className="text-center text-xl font-bold text-roadmap-text-primary">{header.quarter}</h2>
                    {header.status === "delivered" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-semibold text-green-400 border border-green-500/30">
                        <Check className="size-3" />
                        Delivered
                      </span>
                    )}
                    {header.status === "in-progress" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/30">
                        <Clock className="size-3" />
                        In Progress
                      </span>
                    )}
                    {header.status === "upcoming" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-semibold text-purple-400 border border-purple-500/30">
                        <Calendar className="size-3" />
                        Upcoming
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-roadmap-text-secondary">
                    {getQuarterTotal(header.quarter)} features
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suite Rows - Scrollable content */}
      <div className="overflow-x-auto -mx-6 px-6">
        <div className="min-w-[2180px] space-y-8 pb-4">
          {/* Suite Rows */}
          {suites.map((suite) => (
            <div
              key={suite.name}
              className="grid grid-cols-[300px_repeat(6,280px)] gap-6 pb-6 border-b border-roadmap-border/30 last:border-b-0"
            >
              <div className="sticky left-0 z-10 rounded-lg border border-roadmap-border bg-roadmap-background/60 backdrop-blur-sm p-4 flex items-start gap-4 h-full shadow-md">
                <div
                  className="relative mt-1 size-4 shrink-0 rounded-full ring-2 ring-offset-2 ring-offset-roadmap-background ring-current/30"
                  style={{ backgroundColor: getBorderColor(suite.color) }}
                />
                <div className="relative">
                  <h3 className="text-xl font-bold text-roadmap-text-primary mb-2">{suite.name}</h3>
                  <p className="text-sm text-roadmap-text-secondary leading-relaxed">{suite.description}</p>
                </div>
              </div>

              {/* Quarter Cards */}
              {quarterHeaders.map((header) => {
                const features = suite.quarters[header.quarter as keyof typeof suite.quarters] || []
                return (
                  <Card
                    key={`${suite.name}-${header.quarter}`}
                    className="border-l-4 border-t border-r border-b border-roadmap-border bg-roadmap-background/60 backdrop-blur-sm transition-all hover:border-roadmap-border-hover hover:shadow-lg"
                    style={{ borderLeftColor: getBorderColor(suite.color) }}
                  >
                    <CardContent className="p-5">
                      {features.length > 0 ? (
                        <ul className="space-y-3">
                          {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-roadmap-text-secondary" />
                              <span className="leading-relaxed text-roadmap-text-primary">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-center text-sm text-roadmap-text-secondary/50 py-4">No features</div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
