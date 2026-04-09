"use client"

import { useRef, useEffect } from "react"
import { Workflow, TrendingUp, KeyRound, Calendar, BarChart3, FileText } from "lucide-react"
import Link from "next/link"

type Feature = {
  name: string
  quarter: string
}

type KeyTheme = {
  id: string
  title: string
  problem: string
  personas: string[]
  icon: React.ComponentType<{ className?: string }>
  description: string
  features: Feature[]
  colorClass: string
}

const THEME_COLORS: Record<string, { border: string; iconBg: string; iconText: string; hoverBorder: string }> = {
  "access": {
    border: "border-emerald-500/50",
    hoverBorder: "hover:border-emerald-400/70",
    iconBg: "bg-emerald-500/20 border-emerald-500/30",
    iconText: "text-emerald-300",
  },
  "intelligence": {
    border: "border-amber-500/50",
    hoverBorder: "hover:border-amber-400/70",
    iconBg: "bg-amber-500/20 border-amber-500/30",
    iconText: "text-amber-300",
  },
  "operations": {
    border: "border-cyan-500/50",
    hoverBorder: "hover:border-cyan-400/70",
    iconBg: "bg-cyan-500/20 border-cyan-500/30",
    iconText: "text-cyan-300",
  },
  "crm": {
    border: "border-blue-500/50",
    hoverBorder: "hover:border-blue-400/70",
    iconBg: "bg-blue-500/20 border-blue-500/30",
    iconText: "text-blue-300",
  },
  "experience": {
    border: "border-pink-500/50",
    hoverBorder: "hover:border-pink-400/70",
    iconBg: "bg-pink-500/20 border-pink-500/30",
    iconText: "text-pink-300",
  },
}

const KEY_THEMES: KeyTheme[] = [
  {
    id: "leasing-revenue",
    title: "Leasing & Revenue Growth",
    problem: "Manual lease processes slow down deals",
    personas: ["Leasing Teams", "Asset Managers"],
    icon: FileText,
    description: "Accelerate leasing with streamlined lease management, integrated billing, and tools that connect leasing activity to revenue.",
    colorClass: "crm",
    features: [
      { name: "Lease Management & AI Abstraction", quarter: "Q2 2026" },
      { name: "Yardi Integration", quarter: "Q2 2026" },
      { name: "Billing & Invoicing", quarter: "Q2 2026" },
      { name: "Lease Terms with Credits", quarter: "Q4 2026" },
    ],
  },
  {
    id: "tenant-insights",
    title: "Tenant Health & Retention",
    problem: "Limited visibility into tenant engagement",
    personas: ["Asset Managers", "Executives"],
    icon: TrendingUp,
    description: "Understand how tenants engage with your properties, identify at-risk relationships early, and take action to improve retention.",
    colorClass: "intelligence",
    features: [
      { name: "User Activity Enhancements", quarter: "Q1 2026" },
      { name: "Tenant Health Score", quarter: "Q3 2026" },
      { name: "AI Analyst Agent", quarter: "Q4 2026" },
    ],
  },
  {
    id: "operations",
    title: "Streamlined Operations",
    problem: "Too much time spent on manual coordination",
    personas: ["Property Managers", "Experience Teams"],
    icon: Workflow,
    description: "Reduce manual work by automating service request routing, connecting bookings to maintenance workflows, and managing operations on the go.",
    colorClass: "operations",
    features: [
      { name: "Teams, Catalogues & Routing", quarter: "Q2 2026" },
      { name: "Messaging & Feedback", quarter: "Q2 2026" },
      { name: "Admin On the Go", quarter: "Q2 2026" },
      { name: "Preventative Maintenance", quarter: "Q3 2026" },
      { name: "Inventory & Inspections", quarter: "Q3 2026" },
    ],
  },
  {
    id: "events-experience",
    title: "Elevated Tenant Experiences",
    problem: "Difficulty delivering engaging programming",
    personas: ["Experience Teams", "Hospitality Teams"],
    icon: Calendar,
    description: "Create memorable experiences with flexible event management, multi-day programming, and seamless attendee communication.",
    colorClass: "experience",
    features: [
      { name: "Event Management On the Go", quarter: "Q2 2026" },
      { name: "Multi-day Events", quarter: "Q3 2026" },
      { name: "Automated Feedback", quarter: "Q3 2026" },
      { name: "Flexible Payment Routing", quarter: "Q3 2026" },
      { name: "Recurring Events", quarter: "Q4 2026" },
    ],
  },
  {
    id: "access-security",
    title: "Unified Access Control",
    problem: "Fragmented credential management across systems",
    personas: ["Property Managers", "Security Teams"],
    icon: KeyRound,
    description: "Manage tenant and visitor credentials across multiple access control systems from one place, with full audit visibility.",
    colorClass: "access",
    features: [
      { name: "AMAG & Integriti Credentials", quarter: "Q1 2026" },
      { name: "Genetec Credentials", quarter: "Q2 2026" },
      { name: "Brivo BLE Credentials", quarter: "Q2 2026" },
      { name: "Command Center Audit Logs", quarter: "Q3 2026" },
      { name: "Kastle Credentials", quarter: "Q4 2026" },
    ],
  },
  {
    id: "connected-systems",
    title: "Connected Building Systems",
    problem: "Data siloed across multiple platforms",
    personas: ["Property Managers", "Asset Managers"],
    icon: BarChart3,
    description: "Bring your systems together with integrations that sync calendars, automate billing, and connect booking data to operations.",
    colorClass: "operations",
    features: [
      { name: "Office 365 Integration", quarter: "Q2 2026" },
      { name: "Tripleseat Integration", quarter: "Q2 2026" },
      { name: "Room Kiosks", quarter: "Q2 2026" },
      { name: "Resource Booking Automation", quarter: "Q3 2026" },
    ],
  },
]

export function HeroCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)

  const duplicatedThemes = [...KEY_THEMES, ...KEY_THEMES]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const intervalId = setInterval(() => {
      if (!scrollContainer || isPausedRef.current) return
      
      const singleSetWidth = scrollContainer.scrollWidth / 2
      
      if (scrollContainer.scrollLeft >= singleSetWidth) {
        scrollContainer.scrollLeft = scrollContainer.scrollLeft - singleSetWidth
      }
      
      scrollContainer.scrollLeft += 1
    }, 30)

    return () => clearInterval(intervalId)
  }, [])

  const renderCard = (theme: KeyTheme, index: number) => {
    const Icon = theme.icon
    const colors = THEME_COLORS[theme.colorClass]
    return (
      <Link
        key={`${theme.id}-${index}`}
        href={`#${theme.id}`}
        className={`shrink-0 group relative rounded-xl w-[260px] text-left transition-all duration-300 hover:scale-[1.02] border ${colors.border} ${colors.hoverBorder} bg-black/90 backdrop-blur-sm`}
      >
        <div className="h-full rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg border shrink-0 ${colors.iconBg}`}>
              <Icon className={`size-5 ${colors.iconText}`} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white leading-tight">{theme.title}</h3>
              <p className="text-[11px] text-roadmap-text-secondary/60 mt-1">{theme.problem}</p>
            </div>
          </div>
          <div className={`text-[10px] mt-3 opacity-60 group-hover:opacity-100 transition-opacity ${colors.iconText}`}>
            Learn more →
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="mt-10 md:mt-12">
      <h2 className="text-sm md:text-base font-medium text-roadmap-text-secondary/80 mb-4">Explore by theme</h2>
      <div 
        ref={scrollRef}
        onMouseEnter={() => { isPausedRef.current = true }}
        onMouseLeave={() => { isPausedRef.current = false }}
        onTouchStart={() => { isPausedRef.current = true }}
        onTouchEnd={() => { isPausedRef.current = false }}
        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
      >
        {duplicatedThemes.map((theme, index) => renderCard(theme, index))}
      </div>
      
      {/* CTA to roadmap by quarter */}
      <div className="mt-6">
        <Link 
          href="/roadmap" 
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 hover:border-white/30 transition-all overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <span className="relative">View roadmap by quarter</span>
          <span aria-hidden className="relative text-violet-400">→</span>
        </Link>
      </div>
    </div>
  )
}
