import { RoadmapCard } from "./roadmap-card"

const roadmapData = [
  {
    quarter: "Q3 2025",
    items: [
      {
        suite: "Experience",
        features: ["Events – Tickets", "Events – QR Check-in", "Events – Waitlist"],
      },
      {
        suite: "Operations",
        features: [
          "Visitor Management – Loading Dock Support",
          "Visitor Management – Wallet Visitor Pass (Wavelynx)",
          "Visitor Management – Reporting Enhancements",
          "Visitor Management – Bulk Registration",
          "Resource Booking – Branded Emails",
          "Resource Booking – Add Visitor to Booking",
          "Files – File Repository",
          "Access Control – AMAG Integration",
        ],
      },
      {
        suite: "Intelligence",
        features: ["Analytics – Analytics v2 with Chatbot"],
      },
    ],
  },
  {
    quarter: "Q4 2025",
    items: [
      {
        suite: "CRM",
        features: [
          "Tours – Brochure & Tour Content Tools",
          "Data Management – Building Object & Table",
          "Data Management – Tagging Framework",
        ],
      },
      {
        suite: "Experience",
        features: ["Events – Multi-slot Events"],
      },
      {
        suite: "Operations",
        features: [
          "Access Control – Genetec Integration",
          "Visitor Management – Bulk Registration via CSV",
          "Service Requests – Teams, Catalogues & Routing",
          "Service Requests – Two-way Communications",
          "Resource Booking – Collections",
          "Resource Booking – Combined Meeting Rooms",
          "Payments – Credits & Discounts",
          "Visitor Management – Automated Visitor Passes via Bookings",
          "Files – File Repository",
        ],
      },
      {
        suite: "Intelligence",
        features: ["Reporting – New Report Types", "AI Automation – Agent Development"],
      },
    ],
  },
  {
    quarter: "Q1 2026",
    items: [
      {
        suite: "CRM",
        features: ["Contacts – Contact Tracking", "Tours – Tour & Brochure Management"],
      },
      {
        suite: "Experience",
        features: [
          "Payments – Flexible Payment Routing",
          "Payments – Credits",
          "Web Experience – Public Property Page",
          "AI Automation – Request Engine",
        ],
      },
      {
        suite: "Operations",
        features: [
          "Access Control – Integriti Integration",
          "Visitor Management – Visitor Self Check-in (Kiosk)",
          "Service Requests – Inventory & Inspections",
          "Service Requests – Payments",
          "Resource Booking – Cancellation & Preset Refunds",
          "Visitor Management – Improved Kiosk Experience",
          "Admin Tools – Admin App",
          "Files – File Repository",
        ],
      },
      {
        suite: "Intelligence",
        features: ["Reporting – New Report Types", "AI Automation – Agent Development"],
      },
    ],
  },
  {
    quarter: "Q2 2026",
    items: [
      {
        suite: "CRM",
        features: [
          "Leases – Lease Terms with Credits",
          "Integrations – Yardi Integration",
          "Data Management – Custom Objects & Fields",
        ],
      },
      {
        suite: "Experience",
        features: [
          "Events – Multi-day Events",
          "Events – Recurring Events",
          "Web Experience – Public Registration",
          "AI Automation – Concierge Consumer App",
        ],
      },
      {
        suite: "Operations",
        features: [
          "Access Control – Brivo Integration",
          "Service Requests – Preventative Maintenance",
          "Service Requests – Billing & Yardi Invoicing",
          "Automation – Resource Booking → Service Request",
          "Resource Booking – Office 365 Integration",
          "Integrations – Outlook Integration",
          "Files – File Scanning",
        ],
      },
      {
        suite: "Intelligence",
        features: [
          "Reporting – New Report Types",
          "AI Automation – Admin Assistant",
          "AI Automation – Agent Development",
        ],
      },
    ],
  },
]

const suiteColors: Record<string, string> = {
  CRM: "suite-crm",
  Experience: "suite-experience",
  Operations: "suite-operations",
  Intelligence: "suite-intelligence",
}

export function RoadmapGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
      {roadmapData.map((quarter) => (
        <div key={quarter.quarter} className="space-y-4">
          <div className="sticky top-4 z-10 rounded-lg border border-roadmap-border bg-roadmap-surface backdrop-blur-sm px-4 py-3">
            <h2 className="text-center text-2xl font-bold text-roadmap-text-primary">{quarter.quarter}</h2>
          </div>
          <div className="space-y-4">
            {quarter.items.map((item) => (
              <RoadmapCard
                key={`${quarter.quarter}-${item.suite}`}
                suite={item.suite}
                features={item.features}
                color={suiteColors[item.suite]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
