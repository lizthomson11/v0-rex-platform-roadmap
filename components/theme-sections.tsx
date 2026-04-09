"use client"

import { Workflow, TrendingUp, KeyRound, Calendar, BarChart3, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

const getQuarterStatusColor = (quarter: string) => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentQuarter = Math.ceil(currentMonth / 3)

  const match = quarter.match(/Q(\d)\s+(\d{4})/)
  if (!match) return "bg-gray-500/20 text-gray-400"
  
  const q = parseInt(match[1])
  const year = parseInt(match[2])

  if (year < currentYear || (year === currentYear && q < currentQuarter)) {
    return "bg-emerald-500/20 text-emerald-400"
  } else if (year === currentYear && q === currentQuarter) {
    return "bg-blue-500/20 text-blue-400"
  } else {
    return "bg-amber-500/20 text-amber-400"
  }
}

type Feature = {
  name: string
  quarter: string
  description: string
}

type ThemeSection = {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  personas: string[]
  features: Feature[]
  colorClass: string
}

const SECTION_COLORS: Record<string, { iconBg: string; iconText: string; personaBg: string; personaText: string; personaBorder: string }> = {
  "access": {
    iconBg: "bg-emerald-500/20 border-emerald-500/30",
    iconText: "text-emerald-300",
    personaBg: "bg-emerald-500/15",
    personaText: "text-emerald-300",
    personaBorder: "border-emerald-500/20",
  },
  "intelligence": {
    iconBg: "bg-amber-500/20 border-amber-500/30",
    iconText: "text-amber-300",
    personaBg: "bg-amber-500/15",
    personaText: "text-amber-300",
    personaBorder: "border-amber-500/20",
  },
  "operations": {
    iconBg: "bg-cyan-500/20 border-cyan-500/30",
    iconText: "text-cyan-300",
    personaBg: "bg-cyan-500/15",
    personaText: "text-cyan-300",
    personaBorder: "border-cyan-500/20",
  },
  "crm": {
    iconBg: "bg-blue-500/20 border-blue-500/30",
    iconText: "text-blue-300",
    personaBg: "bg-blue-500/15",
    personaText: "text-blue-300",
    personaBorder: "border-blue-500/20",
  },
  "experience": {
    iconBg: "bg-pink-500/20 border-pink-500/30",
    iconText: "text-pink-300",
    personaBg: "bg-pink-500/15",
    personaText: "text-pink-300",
    personaBorder: "border-pink-500/20",
  },
}

const THEME_SECTIONS: ThemeSection[] = [
  {
    id: "leasing-revenue",
    title: "Leasing & Revenue Growth",
    subtitle: "From prospect to signed lease, faster",
    icon: FileText,
    personas: ["Leasing Teams", "Asset Managers"],
    description: "Leasing velocity matters. We're building tools that streamline lease management, automate billing, and connect leasing activity to revenue.",
    colorClass: "crm",
    features: [
      {
        name: "Lease Management & AI Abstraction",
        quarter: "Q2 2026",
        description: "Centralized lease tracking with key dates, terms, and renewal workflows. AI-powered extraction turns complex lease documents into actionable data.",
      },
      {
        name: "Yardi Integration",
        quarter: "Q2 2026",
        description: "Bi-directional sync with Yardi for tenant data, lease information, and billing. Your source of truth, connected.",
      },
      {
        name: "Billing & Invoicing",
        quarter: "Q2 2026",
        description: "Generate invoices from service requests and bookings with automatic Yardi posting. Reduce manual billing work.",
      },
      {
        name: "Lease Terms with Credits",
        quarter: "Q4 2026",
        description: "Include booking credits and amenity allowances as part of lease terms. Automatically provision entitlements when leases are signed.",
      },
    ],
  },
  {
    id: "tenant-insights",
    title: "Tenant Health & Retention",
    subtitle: "Understand and retain your best tenants",
    icon: TrendingUp,
    personas: ["Asset Managers", "Executives"],
    description: "Tenant retention starts with understanding engagement. We're building intelligence tools that surface risk signals early and help you take action before it's too late.",
    colorClass: "intelligence",
    features: [
      {
        name: "User Activity Enhancements",
        quarter: "Q1 2026",
        description: "Deeper visibility into how tenants interact with your building — from app usage to amenity bookings — so you can understand what drives satisfaction.",
      },
      {
        name: "Tenant Health Score",
        quarter: "Q3 2026",
        description: "A composite score that combines engagement data, service request patterns, and usage metrics to identify at-risk tenants before renewal conversations.",
      },
      {
        name: "AI Analyst Agent",
        quarter: "Q4 2026",
        description: "Ask questions about your portfolio in natural language and get instant, data-backed answers. No more waiting for reports or digging through dashboards.",
      },
    ],
  },
  {
    id: "operations",
    title: "Streamlined Operations",
    subtitle: "Reduce manual work and automate daily tasks",
    icon: Workflow,
    personas: ["Property Managers", "Experience Teams"],
    description: "Modern property management demands efficiency. We're building tools that automate service request routing, connect bookings to maintenance workflows, and let you manage operations from anywhere.",
    colorClass: "operations",
    features: [
      {
        name: "Teams, Catalogues & Routing",
        quarter: "Q2 2026",
        description: "Automatically route service requests to the right teams based on categories, locations, and custom rules. No more manual triage or missed handoffs.",
      },
      {
        name: "Messaging & Feedback",
        quarter: "Q2 2026",
        description: "Enable two-way communication with tenants on service requests and automatically collect feedback when work is complete.",
      },
      {
        name: "Admin On the Go",
        quarter: "Q2 2026",
        description: "Manage service requests, check-ins, and communications from your mobile device. Everything you need to run operations without being at your desk.",
      },
      {
        name: "Preventative Maintenance",
        quarter: "Q3 2026",
        description: "Schedule recurring maintenance tasks and inspections. Stay ahead of issues before they become tenant complaints.",
      },
      {
        name: "Inventory & Inspections",
        quarter: "Q3 2026",
        description: "Track equipment, supplies, and inspection schedules in one place. Know what you have and when it needs attention.",
      },
    ],
  },
  {
    id: "events-experience",
    title: "Elevated Tenant Experiences",
    subtitle: "Programming that brings your building to life",
    icon: Calendar,
    personas: ["Experience Teams", "Hospitality Teams"],
    description: "Great buildings need great experiences. We're building event tools that make it easy to plan multi-day programming, manage attendance, and keep tenants engaged.",
    colorClass: "experience",
    features: [
      {
        name: "Event Management On the Go",
        quarter: "Q2 2026",
        description: "Check in attendees, manage event details, and communicate with guests from your phone. Perfect for on-site event managers.",
      },
      {
        name: "Multi-day Events",
        quarter: "Q3 2026",
        description: "Plan conferences, wellness weeks, and other multi-day programming with connected sessions and unified registration.",
      },
      {
        name: "Automated Feedback",
        quarter: "Q3 2026",
        description: "Automatically send satisfaction surveys after events and bookings. Understand what's working and what needs improvement.",
      },
      {
        name: "Flexible Payment Routing",
        quarter: "Q3 2026",
        description: "Route event payments to different accounts based on event type, department, or custom rules.",
      },
      {
        name: "Recurring Events",
        quarter: "Q4 2026",
        description: "Set up weekly fitness classes, monthly socials, or any recurring programming with automatic scheduling.",
      },
    ],
  },
  {
    id: "access-security",
    title: "Unified Access Control",
    subtitle: "One platform for all your access systems",
    icon: KeyRound,
    personas: ["Property Managers", "Security Teams"],
    description: "Managing credentials across multiple access control systems is painful. We're building a unified layer that lets you provision, audit, and manage access from one place.",
    colorClass: "access",
    features: [
      {
        name: "AMAG & Integriti Credentials",
        quarter: "Q1 2026",
        description: "Issue Wallet/NFC credentials and QR visitor passes for properties using AMAG and Integriti access control systems.",
      },
      {
        name: "Genetec Credentials",
        quarter: "Q2 2026",
        description: "Full credential support for Genetec — both tenant mobile credentials and visitor QR passes integrated into your existing system.",
      },
      {
        name: "Brivo BLE Credentials",
        quarter: "Q2 2026",
        description: "Bluetooth Low Energy credential support for Brivo, enabling seamless mobile access without NFC requirements.",
      },
      {
        name: "Command Center Audit Logs",
        quarter: "Q3 2026",
        description: "Complete visibility into credential activity across all your access systems. Track who accessed what, when, and from which device.",
      },
      {
        name: "Kastle Credentials",
        quarter: "Q4 2026",
        description: "Extend mobile credential and visitor pass support to Kastle access control systems.",
      },
    ],
  },
  {
    id: "connected-systems",
    title: "Connected Building Systems",
    subtitle: "Break down data silos",
    icon: BarChart3,
    personas: ["Property Managers", "Asset Managers"],
    description: "Your building runs on multiple systems. We're building integrations that bring data together, automate handoffs, and give you a complete picture of operations.",
    colorClass: "operations",
    features: [
      {
        name: "Office 365 Integration",
        quarter: "Q2 2026",
        description: "Sync room bookings with Outlook calendars. Tenants book through the app, meetings appear in their calendar automatically.",
      },
      {
        name: "Tripleseat Integration",
        quarter: "Q2 2026",
        description: "Connect catering and event management with Tripleseat. Bookings flow seamlessly between systems.",
      },
      {
        name: "Room Kiosks",
        quarter: "Q2 2026",
        description: "Deploy digital signage outside meeting rooms showing availability and allowing quick bookings on the spot.",
      },
      {
        name: "Resource Booking Automation",
        quarter: "Q3 2026",
        description: "Automatically trigger service requests when bookings are made — AV setup, catering orders, room configuration.",
      },
    ],
  },
]

export function ThemeSections() {
  return (
    <div className="font-[family-name:var(--font-source-sans)]">
      {THEME_SECTIONS.map((section, sectionIdx) => {
        const Icon = section.icon
        const isEven = sectionIdx % 2 === 0
        const colors = SECTION_COLORS[section.colorClass]
        
        return (
          <section 
            key={section.id} 
            id={section.id}
            className={`py-16 md:py-20 border-b border-white/5 scroll-mt-20 ${isEven ? 'bg-black' : 'bg-slate-950/30'}`}
          >
            <div className="container mx-auto max-w-[1400px] px-5 sm:px-8 md:px-10 lg:px-14">
              {/* Section header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl border shrink-0 ${colors.iconBg}`}>
                  <Icon className={`size-6 ${colors.iconText}`} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{section.title}</h2>
                  <p className="text-sm text-roadmap-text-secondary/70 mt-1">{section.subtitle}</p>
                </div>
              </div>
              
              {/* Personas */}
              <div className="flex flex-wrap gap-2 mb-6 ml-[68px]">
                {section.personas.map((persona) => (
                  <span key={persona} className={`text-[10px] px-2 py-1 rounded-full border ${colors.personaBg} ${colors.personaText} ${colors.personaBorder}`}>
                    {persona}
                  </span>
                ))}
              </div>
              
              {/* Description */}
              <p className="text-base text-roadmap-text-secondary/90 leading-relaxed mb-10 ml-[68px] max-w-3xl">
                {section.description}
              </p>
              
              {/* Features grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ml-0 md:ml-[68px]">
                {section.features.map((feature) => (
                  <div 
                    key={feature.name}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-base font-semibold text-white">{feature.name}</h3>
                      <span className={`shrink-0 text-[10px] px-2 py-1 rounded-full font-medium ${getQuarterStatusColor(feature.quarter)}`}>
                        {feature.quarter}
                      </span>
                    </div>
                    <p className="text-sm text-roadmap-text-secondary/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}
      
      {/* CTA to full roadmap */}
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto max-w-[1400px] px-5 sm:px-8 md:px-10 lg:px-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want more detail?
          </h2>
          <p className="text-base text-roadmap-text-secondary/70 mb-8 max-w-xl mx-auto">
            Explore all features organized by suite and quarter on our detailed roadmap view.
          </p>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors"
          >
            View Roadmap by Quarter
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
