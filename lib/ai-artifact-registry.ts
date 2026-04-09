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
  {
    id: 'booking-workflow',
    label: 'Book a room with AV and catering',
    icon: 'Zap',
    description: 'See the full booking workflow in action',
  },
  {
    id: 'invoice-demo',
    label: 'Generate an invoice for a tenant event',
    icon: 'Receipt',
    description: 'Watch invoice generation and Yardi posting',
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
  {
    keywords: ['book', 'conference', 'room', 'AV', 'catering', 'setup', 'workflow', 'reserve', 'meeting room'],
    minMatches: 2,
    artifacts: [
      {
        type: 'workflow-steps',
        title: 'Booking Workflow — Automated',
        steps: [
          {
            label: 'Check Room Availability',
            description: 'Querying resource booking system for Conference Room 4B availability',
            tool: 'Resource Booking API',
            status: 'completed',
            result: 'Available — 2:00 PM – 3:30 PM, April 10',
            duration: '0.3s',
          },
          {
            label: 'Reserve Conference Room',
            description: 'Creating confirmed reservation with tenant access credentials',
            tool: 'Resource Booking API',
            status: 'completed',
            result: 'Booking #BK-20260410-4B confirmed for Meridian Capital',
            duration: '0.5s',
          },
          {
            label: 'Create AV Setup Request',
            description: 'Generating service request for projector, wireless HDMI, and video conferencing',
            tool: 'Service Request API',
            status: 'completed',
            result: 'SR-8847 created → routed to AV Team (auto-assigned)',
            duration: '0.4s',
          },
          {
            label: 'Create Catering Request',
            description: 'Submitting catering order to Tripleseat integration',
            tool: 'Tripleseat Integration',
            status: 'completed',
            result: 'Order #TS-2291 — 12x lunch boxes, coffee service for 15',
            duration: '0.6s',
          },
          {
            label: 'Generate Invoice',
            description: 'Calculating charges: room rental + AV fee + catering',
            tool: 'Billing Engine',
            status: 'completed',
            result: 'Invoice INV-2026-04187 generated — $1,847.50',
            duration: '0.2s',
          },
          {
            label: 'Post to Yardi',
            description: 'Pushing invoice to Yardi Voyager for AR processing',
            tool: 'Yardi Integration',
            status: 'completed',
            result: 'Posted to Yardi → AR batch 2026-04-10 (auto-reconciled)',
            duration: '0.8s',
          },
        ],
      },
      {
        type: 'invoice-preview',
        title: 'Generated Invoice',
        invoice: {
          number: 'INV-2026-04187',
          date: 'April 10, 2026',
          tenant: 'Meridian Capital Group',
          building: 'One Liberty Plaza',
          lineItems: [
            { description: 'Conference Room 4B — 1.5 hr block', quantity: 1, unitPrice: '$450.00', total: '$450.00' },
            { description: 'AV Package — projector, wireless HDMI, video conf', quantity: 1, unitPrice: '$175.00', total: '$175.00' },
            { description: 'Lunch box (assorted)', quantity: 12, unitPrice: '$28.50', total: '$342.00' },
            { description: 'Coffee & beverage service (15 pax)', quantity: 1, unitPrice: '$185.00', total: '$185.00' },
            { description: 'Event coordination fee', quantity: 1, unitPrice: '$125.00', total: '$125.00' },
          ],
          subtotal: '$1,277.00',
          tax: '$113.65',
          total: '$1,390.65',
          status: 'Posted to Yardi',
          postedTo: 'Yardi Voyager — AR Batch 2026-04-10',
        },
      },
      {
        type: 'metric-cards',
        cards: [
          { label: 'Total Time', value: '2.8s', deltaType: 'neutral' },
          { label: 'Tools Called', value: '6', deltaType: 'neutral' },
          { label: 'Manual Steps Saved', value: '14', delta: 'vs. legacy', deltaType: 'positive' },
          { label: 'Auto-Reconciled', value: 'Yes', deltaType: 'positive' },
        ],
      },
    ],
  },
  {
    keywords: ['invoice', 'billing', 'charge', 'payment', 'Yardi', 'AR', 'accounts receivable', 'tenant event', 'generate invoice'],
    minMatches: 2,
    artifacts: [
      {
        type: 'workflow-steps',
        title: 'Invoice Generation Pipeline',
        steps: [
          {
            label: 'Collect Billable Items',
            description: 'Aggregating charges from bookings, service requests, and add-ons',
            tool: 'Billing Engine',
            status: 'completed',
            result: '4 line items — 2 bookings, 1 service, 1 add-on',
            duration: '0.2s',
          },
          {
            label: 'Apply Lease Terms',
            description: 'Checking lease for included credits and rate overrides',
            tool: 'Lease Management API',
            status: 'completed',
            result: 'Tenant has $500/mo amenity credit — $312.00 applied',
            duration: '0.3s',
          },
          {
            label: 'Calculate Tax',
            description: 'Applying NYC commercial occupancy tax rate',
            tool: 'Tax Engine',
            status: 'completed',
            result: '8.875% applied to taxable subtotal',
            duration: '0.1s',
          },
          {
            label: 'Generate Invoice PDF',
            description: 'Creating formatted invoice document with line items and terms',
            tool: 'Document Service',
            status: 'completed',
            result: 'INV-2026-04192 generated — Net 30 terms',
            duration: '0.4s',
          },
          {
            label: 'Post to Yardi Voyager',
            description: 'Pushing to accounts receivable module for processing',
            tool: 'Yardi Integration',
            status: 'completed',
            result: 'AR entry created — auto-matched to lease #L-2024-0891',
            duration: '0.6s',
          },
          {
            label: 'Notify Tenant',
            description: 'Sending invoice notification via app and email',
            tool: 'Notification Service',
            status: 'completed',
            result: 'Push notification + email sent to billing@meridiancap.com',
            duration: '0.2s',
          },
        ],
      },
      {
        type: 'invoice-preview',
        title: 'Invoice Preview',
        invoice: {
          number: 'INV-2026-04192',
          date: 'April 9, 2026',
          tenant: 'Meridian Capital Group',
          building: 'One Liberty Plaza',
          lineItems: [
            { description: 'Event Space — Grand Terrace, 4hr block (Apr 8)', quantity: 1, unitPrice: '$2,200.00', total: '$2,200.00' },
            { description: 'AV & staging package', quantity: 1, unitPrice: '$650.00', total: '$650.00' },
            { description: 'Catering — cocktail reception (75 pax)', quantity: 1, unitPrice: '$3,375.00', total: '$3,375.00' },
            { description: 'Security detail — after-hours access (4 hrs)', quantity: 1, unitPrice: '$480.00', total: '$480.00' },
            { description: 'Amenity credit (lease term)', quantity: 1, unitPrice: '-$312.00', total: '-$312.00' },
          ],
          subtotal: '$6,393.00',
          tax: '$567.38',
          total: '$6,960.38',
          status: 'Posted to Yardi',
          postedTo: 'Yardi Voyager — AR Batch 2026-04-09, Lease #L-2024-0891',
        },
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
