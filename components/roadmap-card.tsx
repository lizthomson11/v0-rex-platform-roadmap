import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RoadmapCardProps {
  suite: string
  features: string[]
  color: string
}

export function RoadmapCard({ suite, features, color }: RoadmapCardProps) {
  const getGradientClass = (suite: string) => {
    const gradients: Record<string, string> = {
      "suite-crm": "bg-gradient-to-r from-suite-crm-start to-suite-crm-end",
      "suite-experience": "bg-gradient-to-r from-suite-experience-start to-suite-experience-end",
      "suite-operations": "bg-gradient-to-r from-suite-operations-start to-suite-operations-end",
      "suite-intelligence": "bg-gradient-to-r from-suite-intelligence-start to-suite-intelligence-end",
    }
    return gradients[suite] || "bg-primary"
  }

  return (
    <Card className="group border-roadmap-border bg-roadmap-surface backdrop-blur-sm transition-all hover:border-roadmap-border-hover hover:shadow-lg hover:shadow-roadmap-background/20">
      <CardHeader className="pb-0">
        <div
          className={`mb-2 inline-flex items-center rounded-full ${getGradientClass(color)} px-3 py-1 text-xs font-semibold text-roadmap-text-primary shadow-lg`}
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
