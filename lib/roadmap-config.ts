/**
 * Roadmap data model + Linear→roadmap mapping.
 *
 * This module is client-safe (no secrets, no network). It holds:
 *  - the Suite / QuarterColumn types the grid renders,
 *  - DELIVERED_ARCHIVE: frozen "what we shipped" history that does NOT live in
 *    Linear (Linear's Roadmap-labeled projects only cover current/future work),
 *  - FALLBACK_SUITES: the full static roadmap, used only if the Linear fetch
 *    fails or no API key is configured,
 *  - the pure mapping logic that turns Linear projects into suites + quarters.
 *
 * The live fetch itself lives in lib/linear.ts (server only).
 */

export type Suite = {
  name: string
  description: string
  color: string
  quarters: Record<string, string[]>
}

export type QuarterColumn = {
  id: string
  label: string
  sublabel?: string
  defaultExpanded: boolean
}

/**
 * Quarters at or before this one are considered delivered and are sourced from
 * the static DELIVERED_ARCHIVE below. Everything after is owned by Linear.
 * Flip the merge off entirely by setting USE_LINEAR = false.
 */
export const ARCHIVED_THROUGH_QUARTER = "Q2 2026"

/**
 * Latest quarter shown externally. Quarters after this are still fetched and
 * built (so they can be turned on later), but hidden from the public grid and
 * the demo chat. Bump this to publish a further-out quarter.
 */
export const PUBLISHED_THROUGH_QUARTER = "Q4 2026"

/** Suite identity (name/description/color) — Linear has no equivalent field. */
export const SUITE_META: { name: string; description: string; color: string }[] = [
  {
    name: "CRM",
    description: "Customer Relationship Management tools for managing contacts, tours, and leases",
    color: "suite-crm",
  },
  {
    name: "Experience",
    description: "Guest and tenant experiences including events, communications, and web portals",
    color: "suite-experience",
  },
  {
    name: "Access Control (PAIR)",
    description: "Physical access and visitor management",
    color: "suite-access",
  },
  {
    name: "Operations",
    description: "Service requests, resource booking, and operational workflows",
    color: "suite-operations",
  },
  {
    name: "Intelligence",
    description: "Analytics, reporting, and AI-powered automation",
    color: "suite-intelligence",
  },
]

const SUITE_NAMES = SUITE_META.map((s) => s.name)
export type SuiteName = (typeof SUITE_NAMES)[number]

// ---------------------------------------------------------------------------
// Static delivered archive (frozen — these shipped and never change).
// Linear's Roadmap label covers Q3 2026 onward; these earlier quarters are the
// "what we shipped" story and are intentionally kept in code.
// ---------------------------------------------------------------------------
export const DELIVERED_ARCHIVE: Suite[] = [
  {
    ...SUITE_META[0],
    quarters: {
      "2025": [
        "Contacts – Key Contacts",
        "Contacts – Contact Notes",
        "Data Management – Building Object & Table",
        "Data Management – Tagging Framework",
      ],
      "Q1 2026": ["User Profile – Activity Enhancements"],
      // Yardi integration and Lease Management & AI Abstraction slipped to
      // Q3/Q4 (now owned by Linear), so they are no longer shown as delivered.
      "Q2 2026": [],
    },
  },
  {
    ...SUITE_META[1],
    quarters: {
      "2025": [
        "Events – Tickets",
        "Events – QR Check-in",
        "Events – Waitlist",
        "Events – Discounts",
        "Events – Multi-slot Events",
        "Events – Add Attendees from Admin",
        "Communication – Rich Content",
        "Communication – Newsletters",
      ],
      "Q1 2026": [
        "Web Experience – Public Registration",
        "Web Experience – Customization Enhancements",
        "Web Experience – Custom Domain Setup",
      ],
      "Q2 2026": [
        "Experience – Automated Localized Posts",
        "Events – Limiting Session Claims",
        "Events – Cancellation Notice",
        "Admin On the Go – Event Management, Check-in & Communications",
      ],
    },
  },
  {
    ...SUITE_META[2],
    quarters: {
      "2025": [
        "Visitor Management – Loading Dock Support",
        "Visitor Management – Wallet Visitor Pass (Wavelynx)",
        "Visitor Management – Reporting Enhancements",
        "Visitor Management – Bulk Registration",
        "Visitor Management – Automated Visitor Passes via Bookings",
        "Tenant Credentials – Wallet/NFC (Lenel, Genea, C-CURE)",
        "Visitor Credentials – QR Pass (Lenel, C-CURE)",
      ],
      "Q1 2026": [
        "Tenant Credentials – Wallet/NFC (AMAG, Integriti)",
        "Visitor Credentials – QR Pass (AMAG, Integriti)",
        "Visitor Management – Tenant-Initiated Vendor Visit Requests",
      ],
      "Q2 2026": [
        "Tenant Credentials – Wallet/NFC (Genetec)",
        "Tenant Credentials – BLE (Brivo)",
        "Visitor Credentials – QR Pass (Genetec)",
        "Visitor Management – Kiosk & Self-Service Check-in",
      ],
    },
  },
  {
    ...SUITE_META[3],
    quarters: {
      "2025": [
        "Resource Booking – Branded Emails",
        "Resource Booking – Add Visitor to Booking",
        "Resource Booking – Discounts",
        "Resource Booking – On Account Payments",
        "Resource Booking – Collections",
        "Resource Booking – Combined Meeting Rooms",
      ],
      "Q1 2026": ["Resource Booking – Credits", "Resource Booking – Manage Paid Bookings in Admin"],
      // Removed items slipped to Q3/Q4 and are now owned by Linear:
      // Pricing & Payments, Billing & Yardi Invoicing, and O365/Outlook.
      "Q2 2026": [
        "Resource Booking – Cancellation & Preset Refunds",
        "Service Requests – Teams, Catalogues & Routing",
        "Service Requests – Messaging & Feedback",
        "Admin On the Go – Service Request Management",
        "Resource Booking – Room Kiosks",
        "Resource Booking – Tripleseat Integration",
      ],
    },
  },
  {
    ...SUITE_META[4],
    quarters: {
      "2025": ["Reporting – New Intelligence Platform", "AI Automation – Agent Development"],
      "Q1 2026": [
        "Reporting – New Access Performance Reports",
        "Reporting – New Content Performance Reports",
        "Reporting – Sentiment & Feedback Analysis",
      ],
      "Q2 2026": [
        "Reporting – New Communications Reports",
        "Reporting – New Service Request Performance Reports",
      ],
    },
  },
]

// ---------------------------------------------------------------------------
// Full static fallback (archive + the last hand-maintained future roadmap).
// Only used when Linear cannot be reached, so the site never renders empty.
// ---------------------------------------------------------------------------
export const FALLBACK_SUITES: Suite[] = [
  {
    ...SUITE_META[0],
    quarters: {
      ...DELIVERED_ARCHIVE[0].quarters,
      "Q3 2026": ["Data Management – Custom Objects & Fields"],
      "Q4 2026": [
        "Tours – Brochure & Tour Content Tools",
        "Onboarding – Customizable Tenant Onboarding Workflows",
        "Leases – Lease Terms with Credits",
      ],
    },
  },
  {
    ...SUITE_META[1],
    quarters: {
      ...DELIVERED_ARCHIVE[1].quarters,
      "Q3 2026": [
        "Events – Automated Feedback",
        "Events – Multi-day Events",
        "Events – Flexible Payment Routing",
        "Experience – Integrated Digital Signage",
      ],
      "Q4 2026": ["Events – Recurring Events"],
    },
  },
  {
    ...SUITE_META[2],
    quarters: {
      ...DELIVERED_ARCHIVE[2].quarters,
      "Q3 2026": ["Access Control – Command Center Activity & Audit Logs"],
      "Q4 2026": [
        "Access Control – Command Center Unified Credential Visibility",
        "Tenant Credentials – Wallet/NFC (Kastle)",
        "Visitor Credentials – QR Pass (Kastle)",
      ],
    },
  },
  {
    ...SUITE_META[3],
    quarters: {
      ...DELIVERED_ARCHIVE[3].quarters,
      "Q3 2026": [
        "Service Requests – Inventory & Inspections",
        "Service Requests – Preventative Maintenance",
        "Resource Booking – Automated Feedback",
        "Resource Booking – Two-way Messaging",
        "Automation – Resource Booking → Service Request Integration",
      ],
      "Q4 2026": ["AI Automation – Admin Assistant"],
    },
  },
  {
    ...SUITE_META[4],
    quarters: {
      ...DELIVERED_ARCHIVE[4].quarters,
      "Q3 2026": ["Reporting – Tenant Health Score", "Reporting – New CRM Reports & Reporting"],
      "Q4 2026": [
        "Reporting – New Resource Booking Performance Reports",
        "Reporting – New Event Performance Reports",
      ],
    },
  },
]

export const FALLBACK_QUARTER_COLUMNS: QuarterColumn[] = [
  { id: "2025", label: "2025", defaultExpanded: true },
  { id: "Q1 2026", label: "Q1 2026", defaultExpanded: true },
  { id: "Q2 2026", label: "Q2 2026", defaultExpanded: true },
  { id: "Q3 2026", label: "Q3 2026", defaultExpanded: true },
  { id: "Q4 2026", label: "Q4 2026", defaultExpanded: true },
]

// ---------------------------------------------------------------------------
// Linear → suite mapping.
//
// Suite is resolved from three signals, in this order (validated against all 82
// Roadmap-labeled projects — 0 unmapped):
//   1. "Swimlane …" initiative — the PM's explicit suite grouping in Linear.
//   2. Product-area name prefix — matches how the existing grid is organized.
//   3. Owning team — final fallback.
// When a project carries MULTIPLE swimlanes we prefer the one that agrees with
// its name prefix, else fall back to SUITE_PRIORITY order.
// ---------------------------------------------------------------------------
export const SWIMLANE_TO_SUITE: Record<string, SuiteName> = {
  "Swimlane Engage - HqOX": "Experience",
  "Swimlane Orchestrate - HqOS": "Operations",
  "Swimlane Activate - HqO PAIR": "Access Control (PAIR)",
  "Swimlane Understand - HqO Intelligence": "Intelligence",
  "Swimlane Connect - HqO CRM": "CRM",
}

/** Product-area prefix (text before the first " - " in the project name). */
export const PREFIX_TO_SUITE: Record<string, SuiteName> = {
  CRM: "CRM",
  Contacts: "CRM",
  "Data Management": "CRM",
  "User Profile": "CRM",
  Leases: "CRM",
  Leasing: "CRM",
  Tours: "CRM",
  Onboarding: "CRM",
  Tenants: "CRM",
  Events: "Experience",
  Communication: "Experience",
  Communications: "Experience",
  "Web Experience": "Experience",
  "Web App": "Experience",
  Experience: "Experience",
  Content: "Experience",
  "Homescreen Tiles": "Experience",
  Mobile: "Experience",
  SMS: "Experience",
  Discounts: "Experience",
  "Visitor Management": "Access Control (PAIR)",
  Visitor: "Access Control (PAIR)",
  "Tenant Credentials": "Access Control (PAIR)",
  "Visitor Credentials": "Access Control (PAIR)",
  Access: "Access Control (PAIR)",
  "Access Control": "Access Control (PAIR)",
  "Resource Booking": "Operations",
  "Service Requests": "Operations",
  Vendors: "Operations",
  "Connected Workflows": "Operations",
  Automation: "Operations",
  "AI Automation": "Operations",
  Payments: "Operations",
  Reporting: "Intelligence",
  Intelligence: "Intelligence",
  Analytics: "Intelligence",
}

export const TEAM_TO_SUITE: Record<string, SuiteName> = {
  CRM: "CRM",
  Intelligence: "Intelligence",
  Access: "Access Control (PAIR)",
  Visitor: "Access Control (PAIR)",
  Resources: "Operations",
  "Smart Building": "Experience",
  "Mobile Experience": "Experience",
  "Mobile delivery": "Experience",
}

/** Tiebreak order when a project has multiple, conflicting swimlanes. */
const SUITE_PRIORITY: SuiteName[] = [
  "Experience",
  "Operations",
  "Access Control (PAIR)",
  "CRM",
  "Intelligence",
]

const DEFAULT_SUITE: SuiteName = "Experience"

/** Minimal shape we consume from a Linear project. */
export type LinearProject = {
  name: string
  targetDate?: string | null
  initiatives?: { name: string }[]
  teams?: { name: string }[]
  statusType?: string | null
}

function normalizeDash(s: string): string {
  return s.replace(/[–—]/g, "-")
}

export function prefixOf(name: string): string {
  const n = normalizeDash(name)
  const idx = n.indexOf(" - ")
  return (idx === -1 ? n : n.slice(0, idx)).trim()
}

export function resolveSuite(p: LinearProject): SuiteName {
  const initiatives = (p.initiatives ?? []).map((i) => i.name)
  const swimlaneSuites = initiatives
    .map((n) => SWIMLANE_TO_SUITE[n])
    .filter((s): s is SuiteName => Boolean(s))

  const prefixSuite = PREFIX_TO_SUITE[prefixOf(p.name)]

  if (swimlaneSuites.length === 1) return swimlaneSuites[0]
  if (swimlaneSuites.length > 1) {
    // Prefer the swimlane that agrees with the product-area prefix.
    if (prefixSuite && swimlaneSuites.includes(prefixSuite)) return prefixSuite
    for (const s of SUITE_PRIORITY) if (swimlaneSuites.includes(s)) return s
  }

  if (prefixSuite) return prefixSuite

  for (const t of p.teams ?? []) {
    const teamSuite = TEAM_TO_SUITE[t.name]
    if (teamSuite) return teamSuite
  }

  return DEFAULT_SUITE
}

/** Bucket a Linear targetDate (YYYY-MM-DD) into a quarter column id. */
export function resolveQuarter(targetDate?: string | null): string {
  if (!targetDate) return "Later"
  const year = Number(targetDate.slice(0, 4))
  const month = Number(targetDate.slice(5, 7))
  if (!year) return "Later"
  if (year <= 2025) return "2025"
  const quarter = Math.floor((month - 1) / 3) + 1
  return `Q${quarter} ${year}`
}

/** Normalized form for comparing feature names across the archive and Linear. */
export function normalizeFeatureName(name: string): string {
  return normalizeDash(name).toLowerCase().replace(/\s+/g, " ").trim()
}
// Internal alias kept for readability at call sites.
const featureKey = normalizeFeatureName

/** Chronological sort key for a quarter column id. "2025" first, "Later" last. */
function quarterOrder(id: string): number {
  if (id === "2025") return 0
  if (id === "Later") return Number.MAX_SAFE_INTEGER
  const m = id.match(/Q(\d)\s+(\d{4})/)
  if (m) return Number(m[2]) * 10 + Number(m[1])
  return Number.MAX_SAFE_INTEGER - 1
}

/**
 * Turn a flat list of Linear projects into the grid's suites + quarter columns.
 * Canceled projects are dropped. Suites are always returned in SUITE_META order.
 */
export function buildSuitesFromProjects(projects: LinearProject[]): {
  suites: Suite[]
  quarterColumns: QuarterColumn[]
} {
  const live = projects.filter((p) => p.statusType !== "canceled")

  const quarterIds = new Set<string>()
  // Group feature names by suite → quarter.
  const grouped: Record<string, Record<string, string[]>> = {}
  for (const meta of SUITE_META) grouped[meta.name] = {}

  for (const p of live) {
    const suite = resolveSuite(p)
    const quarter = resolveQuarter(p.targetDate)
    quarterIds.add(quarter)
    ;(grouped[suite][quarter] ??= []).push(normalizeDash(p.name).trim())
  }

  const orderedQuarters = [...quarterIds].sort((a, b) => quarterOrder(a) - quarterOrder(b))

  const suites: Suite[] = SUITE_META.map((meta) => {
    const quarters: Record<string, string[]> = {}
    for (const q of orderedQuarters) {
      quarters[q] = (grouped[meta.name][q] ?? []).sort((a, b) => a.localeCompare(b))
    }
    return { ...meta, quarters }
  })

  const quarterColumns: QuarterColumn[] = orderedQuarters.map((id) => ({
    id,
    label: id,
    defaultExpanded: true,
  }))

  return { suites, quarterColumns }
}

/**
 * Merge the frozen delivered archive (quarters ≤ ARCHIVED_THROUGH_QUARTER) with
 * the live Linear roadmap (later quarters), preserving shipped history.
 */
export function mergeWithArchive(live: { suites: Suite[]; quarterColumns: QuarterColumn[] }): {
  suites: Suite[]
  quarterColumns: QuarterColumn[]
} {
  const cutoff = quarterOrder(ARCHIVED_THROUGH_QUARTER)

  // Safety net: any delivered item whose name also appears in the live Linear
  // data slipped and is now owned by Linear — drop it from the archive so it
  // never shows twice (or falsely as "delivered").
  const liveFeatureKeys = new Set<string>()
  for (const s of live.suites) {
    for (const features of Object.values(s.quarters)) {
      for (const f of features) liveFeatureKeys.add(featureKey(f))
    }
  }

  const archiveQuarterIds = new Set<string>()
  for (const s of DELIVERED_ARCHIVE) {
    for (const q of Object.keys(s.quarters)) {
      if (quarterOrder(q) <= cutoff) archiveQuarterIds.add(q)
    }
  }

  const liveQuarterIds = live.quarterColumns.map((c) => c.id).filter((id) => quarterOrder(id) > cutoff)

  const orderedQuarters = [...new Set([...archiveQuarterIds, ...liveQuarterIds])].sort(
    (a, b) => quarterOrder(a) - quarterOrder(b),
  )

  const archiveByName = Object.fromEntries(DELIVERED_ARCHIVE.map((s) => [s.name, s]))
  const liveByName = Object.fromEntries(live.suites.map((s) => [s.name, s]))

  const suites: Suite[] = SUITE_META.map((meta) => {
    const quarters: Record<string, string[]> = {}
    for (const q of orderedQuarters) {
      if (quarterOrder(q) <= cutoff) {
        quarters[q] = (archiveByName[meta.name]?.quarters[q] ?? []).filter(
          (f) => !liveFeatureKeys.has(featureKey(f)),
        )
      } else {
        quarters[q] = liveByName[meta.name]?.quarters[q] ?? []
      }
    }
    return { ...meta, quarters }
  })

  const mergedColumns: QuarterColumn[] = orderedQuarters.map((id) => ({
    id,
    label: id,
    defaultExpanded: true,
  }))

  return { suites, quarterColumns: mergedColumns }
}

/**
 * Trim quarters after PUBLISHED_THROUGH_QUARTER from what gets shown externally.
 * The data is still built upstream; this only controls what the public grid and
 * the demo chat display.
 */
export function limitToPublishedQuarters(data: {
  suites: Suite[]
  quarterColumns: QuarterColumn[]
}): { suites: Suite[]; quarterColumns: QuarterColumn[] } {
  const limit = quarterOrder(PUBLISHED_THROUGH_QUARTER)

  const quarterColumns = data.quarterColumns.filter((c) => quarterOrder(c.id) <= limit)
  const keep = new Set(quarterColumns.map((c) => c.id))

  const suites = data.suites.map((s) => ({
    ...s,
    quarters: Object.fromEntries(Object.entries(s.quarters).filter(([q]) => keep.has(q))),
  }))

  return { suites, quarterColumns }
}

/**
 * Map every roadmap feature (normalized name) to its quarter id. Used by the
 * overview page so its curated cards show the same quarter/status as the
 * Linear-backed roadmap instead of a hand-maintained value that can drift.
 */
export function featureQuarterLookup(data: { suites: Suite[] }): Record<string, string> {
  const lookup: Record<string, string> = {}
  for (const suite of data.suites) {
    for (const [quarter, features] of Object.entries(suite.quarters)) {
      for (const feature of features) lookup[normalizeFeatureName(feature)] = quarter
    }
  }
  return lookup
}
