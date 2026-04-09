"use client"

import { useState, useMemo } from "react"
import { Search, Sparkles, ArrowRight, X } from "lucide-react"
import Link from "next/link"

type Solution = {
  themeId: string
  themeTitle: string
  problem: string
  features: string[]
  keywords: string[]
}

const SOLUTIONS: Solution[] = [
  {
    themeId: "operations",
    themeTitle: "Streamlined Operations",
    problem: "Too much time spent on manual coordination",
    features: ["Teams, Catalogues & Routing", "Messaging & Feedback", "Admin On the Go", "Preventative Maintenance"],
    keywords: ["manual", "time", "coordination", "routing", "service request", "maintenance", "work order", "triage", "feedback", "mobile", "automate", "automation", "efficiency", "workflow", "slow", "tedious", "repetitive"],
  },
  {
    themeId: "tenant-insights",
    themeTitle: "Tenant Health & Retention",
    problem: "Limited visibility into tenant engagement",
    features: ["Tenant Health Score", "User Activity Enhancements", "AI Analyst Agent"],
    keywords: ["tenant", "retention", "churn", "engagement", "renewal", "risk", "leaving", "satisfaction", "unhappy", "visibility", "insight", "analytics", "data", "report", "understand", "behavior"],
  },
  {
    themeId: "access-security",
    themeTitle: "Unified Access Control",
    problem: "Fragmented credential management across systems",
    features: ["AMAG & Integriti Credentials", "Genetec Credentials", "Brivo BLE Credentials", "Audit Logs"],
    keywords: ["access", "credential", "badge", "key", "security", "visitor", "guest", "mobile", "wallet", "nfc", "ble", "qr", "fragmented", "multiple systems", "brivo", "genetec", "amag", "kastle", "audit"],
  },
  {
    themeId: "events-experience",
    themeTitle: "Elevated Tenant Experiences",
    problem: "Difficulty delivering engaging programming",
    features: ["Multi-day Events", "Event Management On the Go", "Automated Feedback", "Recurring Events"],
    keywords: ["event", "programming", "experience", "amenity", "engagement", "attendance", "check-in", "registration", "conference", "wellness", "fitness", "class", "social", "community", "hospitality"],
  },
  {
    themeId: "leasing-revenue",
    themeTitle: "Leasing & Revenue Growth",
    problem: "Manual lease processes slow down deals",
    features: ["Lease Management & AI Abstraction", "Yardi Integration", "Billing & Invoicing", "Lease Terms with Credits"],
    keywords: ["lease", "leasing", "revenue", "billing", "invoice", "payment", "yardi", "deal", "prospect", "renewal", "terms", "credit", "amenity allowance", "slow", "manual"],
  },
  {
    themeId: "connected-systems",
    themeTitle: "Connected Building Systems",
    problem: "Data siloed across multiple platforms",
    features: ["Office 365 Integration", "Tripleseat Integration", "Room Kiosks", "Resource Booking Automation"],
    keywords: ["integration", "sync", "connect", "silo", "calendar", "outlook", "office 365", "booking", "room", "meeting", "tripleseat", "catering", "kiosk", "display", "signage"],
  },
]

export function ProblemSearch() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const matchedSolutions = useMemo(() => {
    if (!query.trim() || query.length < 2) return []
    
    const lowerQuery = query.toLowerCase()
    const words = lowerQuery.split(/\s+/).filter(w => w.length > 2)
    
    const scored = SOLUTIONS.map(solution => {
      let score = 0
      
      // Check problem statement
      if (solution.problem.toLowerCase().includes(lowerQuery)) {
        score += 10
      }
      
      // Check keywords
      words.forEach(word => {
        solution.keywords.forEach(keyword => {
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 3
          }
        })
      })
      
      // Check features
      solution.features.forEach(feature => {
        if (feature.toLowerCase().includes(lowerQuery)) {
          score += 5
        }
        words.forEach(word => {
          if (feature.toLowerCase().includes(word)) {
            score += 2
          }
        })
      })
      
      return { solution, score }
    })
    
    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(s => s.solution)
  }, [query])

  const showResults = isFocused && query.length >= 2

  return (
    <div className="mt-8 max-w-xl">
      <div className="relative">
        {/* Input */}
        <div className={`relative rounded-xl transition-all duration-300 ${showResults && matchedSolutions.length > 0 ? 'rounded-b-none' : ''}`}>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="size-5 text-roadmap-text-secondary/50" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Describe a challenge you're facing..."
            className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-roadmap-text-secondary/40 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="size-4 text-roadmap-text-secondary/50" />
            </button>
          )}
        </div>

        {/* Results dropdown */}
        {showResults && matchedSolutions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 rounded-b-xl bg-slate-900/95 border border-t-0 border-white/10 backdrop-blur-md overflow-hidden">
            <div className="p-2">
              <p className="text-[10px] text-roadmap-text-secondary/50 uppercase tracking-wider px-3 py-2">
                <Sparkles className="size-3 inline mr-1" />
                How we can help
              </p>
              {matchedSolutions.map((solution) => (
                <Link
                  key={solution.themeId}
                  href={`#${solution.themeId}`}
                  onClick={() => {
                    setQuery("")
                    setIsFocused(false)
                  }}
                  className="block px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">
                        {solution.themeTitle}
                      </h4>
                      <p className="text-xs text-roadmap-text-secondary/60 mt-0.5">
                        {solution.features.slice(0, 3).join(" · ")}
                        {solution.features.length > 3 && ` +${solution.features.length - 3} more`}
                      </p>
                    </div>
                    <ArrowRight className="size-4 text-roadmap-text-secondary/40 group-hover:text-violet-400 transition-colors shrink-0 mt-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {showResults && query.length >= 2 && matchedSolutions.length === 0 && (
          <div className="absolute top-full left-0 right-0 z-50 rounded-b-xl bg-slate-900/95 border border-t-0 border-white/10 backdrop-blur-md p-4">
            <p className="text-sm text-roadmap-text-secondary/60 text-center">
              No matches found. Try different keywords or browse the themes below.
            </p>
          </div>
        )}
      </div>

      {/* Helper text */}
      <p className="text-[11px] text-roadmap-text-secondary/40 mt-3 pl-1">
        Try: "tenant retention", "manual processes", "access control", "event management"
      </p>
    </div>
  )
}
