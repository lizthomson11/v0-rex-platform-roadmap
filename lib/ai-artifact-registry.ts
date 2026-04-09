import type { Artifact, SuggestedPrompt } from './ai-chat-types';

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: 'engagement',
    label: 'Show me tenant engagement trends',
    icon: 'TrendingUp',
    description: 'View engagement metrics across your portfolio',
  },
  {
    id: 'roadmap',
    label: "What's coming in Q2 2026?",
    icon: 'Calendar',
    description: 'Explore upcoming platform features',
  },
  {
    id: 'operations',
    label: 'How efficient are our operations?',
    icon: 'Workflow',
    description: 'Analyze service request performance',
  },
  {
    id: 'access',
    label: 'Access control overview',
    icon: 'KeyRound',
    description: 'Review credential provisioning status',
  },
  {
    id: 'leasing',
    label: 'Leasing pipeline status',
    icon: 'FileText',
    description: 'Check lease extraction and revenue data',
  },
];

interface ArtifactTrigger {
  keywords: string[];
  minMatches: number;
  artifacts: Artifact[];
}

export const ARTIFACT_TRIGGERS: ArtifactTrigger[] = [
  {
    keywords: ['engagement', 'active users', 'tenant', 'app usage', 'adoption', 'retention'],
    minMatches: 2,
    artifacts: [
      {
        type: 'metric-cards',
        cards: [
          { label: 'Monthly Active Users', value: '12,847', delta: '+18%', deltaType: 'positive' },
          { label: 'Avg Sessions/Week', value: '4.2', delta: '+12%', deltaType: 'positive' },
          { label: 'Amenity Bookings', value: '3,291/mo', delta: '+24%', deltaType: 'positive' },
          { label: 'NPS Score', value: '72', delta: '+8', deltaType: 'positive' },
        ],
      },
      {
        type: 'line-chart',
        title: 'Engagement Trends (6 Months)',
        data: [
          { month: 'Nov', mau: 9120, sessions: 2.8, bookings: 1940 },
          { month: 'Dec', mau: 9680, sessions: 3.1, bookings: 2180 },
          { month: 'Jan', mau: 10450, sessions: 3.4, bookings: 2410 },
          { month: 'Feb', mau: 11200, sessions: 3.7, bookings: 2780 },
          { month: 'Mar', mau: 12100, sessions: 3.9, bookings: 3050 },
          { month: 'Apr', mau: 12847, sessions: 4.2, bookings: 3291 },
        ],
        lines: [
          { key: 'mau', color: '#6366f1', label: 'MAU' },
          { key: 'sessions', color: '#22d3ee', label: 'Sessions/Week' },
          { key: 'bookings', color: '#a78bfa', label: 'Bookings' },
        ],
      },
    ],
  },
  {
    keywords: [
      'service request',
      'maintenance',
      'resolution',
      'SLA',
      'HVAC',
      'operations',
      'efficiency',
      'work order',
    ],
    minMatches: 2,
    artifacts: [
      {
        type: 'metric-cards',
        cards: [
          { label: 'Avg Resolution Time', value: '4.2 hrs', delta: '-15%', deltaType: 'positive' },
          { label: 'SLA Compliance', value: '94.7%', delta: '+3.2%', deltaType: 'positive' },
          { label: 'Open Tickets', value: '127', deltaType: 'neutral' },
          { label: 'First Response', value: '18 min', delta: '-22%', deltaType: 'positive' },
        ],
      },
      {
        type: 'bar-chart',
        title: 'Avg Resolution Hours by Category',
        data: [
          { name: 'HVAC', value: 6.1, fill: '#6366f1' },
          { name: 'Plumbing', value: 3.8, fill: '#22d3ee' },
          { name: 'Electrical', value: 4.5, fill: '#a78bfa' },
          { name: 'Janitorial', value: 1.9, fill: '#34d399' },
          { name: 'Elevator', value: 8.2, fill: '#f472b6' },
          { name: 'General', value: 2.7, fill: '#fbbf24' },
        ],
      },
    ],
  },
  {
    keywords: [
      'credential',
      'access control',
      'provisioning',
      'badge',
      'mobile credential',
      'AMAG',
      'Genetec',
      'Brivo',
    ],
    minMatches: 2,
    artifacts: [
      {
        type: 'metric-cards',
        cards: [
          { label: 'Credentials Issued', value: '28,493', delta: '+31%', deltaType: 'positive' },
          { label: 'Systems Connected', value: '4', deltaType: 'neutral' },
          { label: 'Avg Provisioning', value: '2.3 min', delta: '-45%', deltaType: 'positive' },
          { label: 'Mobile Adoption', value: '67%', delta: '+12%', deltaType: 'positive' },
        ],
      },
      {
        type: 'bar-chart',
        title: 'Credentials by Access System',
        data: [
          { name: 'AMAG', value: 8420, fill: '#6366f1' },
          { name: 'Genetec', value: 7830, fill: '#22d3ee' },
          { name: 'Brivo', value: 6290, fill: '#a78bfa' },
          { name: 'Integriti', value: 3105, fill: '#34d399' },
          { name: 'Manual/Legacy', value: 2848, fill: '#fbbf24' },
        ],
      },
    ],
  },
  {
    keywords: ['lease', 'revenue', 'occupancy', 'rent', 'extraction', 'abstraction'],
    minMatches: 2,
    artifacts: [
      {
        type: 'metric-cards',
        cards: [
          { label: 'Active Leases', value: '342', deltaType: 'neutral' },
          { label: 'Occupancy Rate', value: '91.3%', delta: '+2.1%', deltaType: 'positive' },
          { label: 'Avg Extraction Time', value: '4.7 min', deltaType: 'neutral' },
          { label: 'Revenue Pipeline', value: '$48.2M', delta: '+8%', deltaType: 'positive' },
        ],
      },
      {
        type: 'table',
        title: 'Leasing KPIs — Quarter over Quarter',
        columns: ['Metric', 'Current', 'Prior Quarter', 'Change'],
        rows: [
          ['Occupancy Rate', '91.3%', '89.2%', '+2.1%'],
          ['Avg Lease Value', '$142K/yr', '$137K/yr', '+3.6%'],
          ['Renewal Rate', '78.4%', '74.1%', '+4.3%'],
          ['Avg Days to Execute', '12.3', '18.7', '-34.2%'],
          ['Revenue Pipeline', '$48.2M', '$44.6M', '+8.1%'],
        ],
      },
    ],
  },
  {
    keywords: ['roadmap', 'Q2', 'Q3', 'upcoming', 'feature', 'release', '2026'],
    minMatches: 2,
    artifacts: [
      {
        type: 'table',
        title: 'Platform Roadmap — Upcoming Features',
        columns: ['Feature', 'Suite', 'Target', 'Status'],
        rows: [
          ['Lease Management', 'Flex', 'Q2 2026', 'In Development'],
          ['Yardi Integration', 'Connect', 'Q2 2026', 'In Development'],
          ['Teams & Routing', 'Operations', 'Q2 2026', 'In Development'],
          ['Admin On the Go', 'Operations', 'Q2 2026', 'Design Complete'],
          ['Genetec Credentials', 'Access', 'Q2 2026', 'In Development'],
          ['O365 Integration', 'Connect', 'Q2 2026', 'Planning'],
          ['Tenant Health Score', 'Engage', 'Q3 2026', 'Planning'],
          ['Preventative Maintenance', 'Operations', 'Q3 2026', 'Planning'],
        ],
      },
    ],
  },
];

export function detectArtifacts(responseText: string): Artifact[] {
  const lower = responseText.toLowerCase();

  for (const trigger of ARTIFACT_TRIGGERS) {
    const matches = trigger.keywords.filter((kw) => lower.includes(kw.toLowerCase()));
    if (matches.length >= trigger.minMatches) {
      return trigger.artifacts;
    }
  }

  return [];
}
