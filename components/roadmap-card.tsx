import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RoadmapCardProps {
  suite: string
  features: string[]
  color: string
}

export function RoadmapCard({ suite, features, color }: RoadmapCardProps) {
  const getColorClass = (suite: string) => {
    const colors: Record<string, string> = {
      "suite-crm": "bg-suite-crm",
      "suite-experience": "bg-suite-experience",
      "suite-operations": "bg-suite-operations",
      "suite-intelligence": "bg-suite-intelligence",
      "suite-access": "bg-suite-access",
    }
    return colors[suite] || "bg-primary"
  }

  const getBorderColor = (colorProp: string) => {
    // Extract the suite name (e.g., "crm" from "suite-crm" or just "crm")
    const suiteName = colorProp.replace("suite-", "")
    const colors: Record<string, string> = {
      crm: "var(--color-suite-crm)",
      experience: "var(--color-suite-experience)",
      operations: "var(--color-suite-operations)",
      intelligence: "var(--color-suite-intelligence)",
      access: "var(--color-suite-access)",
    }
    return colors[suiteName] || "var(--color-primary)"
  }

  return (
    <Card
      className="group border-l-4 border-roadmap-border bg-roadmap-surface backdrop-blur-sm transition-all hover:border-roadmap-border-hover hover:shadow-lg hover:shadow-roadmap-background/20"
      style={{ borderLeftColor: getBorderColor(color) }}
    >
      <CardHeader className="pb-0">
        <div
          className={`mb-2 inline-flex items-center rounded-full ${getColorClass(color)} px-3 py-1 text-xs font-semibold text-roadmap-text-primary shadow-lg`}
        >
          {suite}
        </div>
        <CardTitle className="text-sm font-medium text-roadmap-text-secondary mb-0">
          {features.length} {features.length === 1 ? "Feature" : "Features"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-roadmap-text-secondary" />
              <span className="leading-relaxed text-roadmap-text-primary">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
