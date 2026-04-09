import type { QuickReply, Artifact } from './ai-chat-types';

export interface WorkflowStep {
  assistantMessage: string;
  quickReplies?: QuickReply[];
  workflowStepData?: {
    label: string;
    description: string;
    tool: string;
    result: string;
    duration: string;
  };
  artifacts?: Artifact[];
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
}

export interface WorkflowNode {
  step: WorkflowStep;
  next?: Record<string, string>;
  autoNext?: string;
}

export interface WorkflowScript {
  id: string;
  triggerKeywords: string[];
  triggerMinMatches: number;
  entryNode: string;
  nodes: Record<string, WorkflowNode>;
}

// ---------------------------------------------------------------------------
// BOOKING WORKFLOW
// ---------------------------------------------------------------------------

export const BOOKING_WORKFLOW: WorkflowScript = {
  id: 'booking-workflow',
  triggerKeywords: ['book', 'room', 'conference', 'AV', 'catering', 'meeting room', 'reserve'],
  triggerMinMatches: 2,
  entryNode: 'ask-room',
  nodes: {
    'ask-room': {
      step: {
        assistantMessage:
          "I can help you book a room! Let me check what's available today. Here are your options:",
        quickReplies: [
          { id: 'boardroom', label: 'Boardroom — 12 pax, 85" LED' },
          { id: 'innovation', label: 'Innovation Room — 8 pax, 75" LED' },
          { id: 'collaboration', label: 'Collaboration Room — 15 pax, 90" LED' },
        ],
      },
      next: {
        boardroom: 'confirm-boardroom',
        innovation: 'confirm-innovation',
        collaboration: 'confirm-collaboration',
      },
    },
    'confirm-boardroom': {
      step: {
        assistantMessage:
          '**Boardroom** — reserved for 2:00 PM – 3:30 PM today. ✓\n\nWhat AV setup do you need?',
        workflowStepData: {
          label: 'Reserve Conference Room',
          description: 'Boardroom (12 pax) — confirmed 2:00 PM – 3:30 PM',
          tool: 'Resource Booking API',
          result: 'Booking #BK-20260410-BR confirmed for Meridian Capital',
          duration: '0.5s',
        },
        quickReplies: [
          { id: 'av-standard', label: 'Standard — HDMI + sound bar' },
          { id: 'av-full', label: 'Full Conference — projector, mics, video conf' },
          { id: 'av-none', label: 'No AV needed' },
        ],
      },
      next: {
        'av-standard': 'ask-catering',
        'av-full': 'ask-catering',
        'av-none': 'ask-catering',
      },
    },
    'confirm-innovation': {
      step: {
        assistantMessage:
          '**Innovation Room** — reserved for 10:00 AM – 11:30 AM today. ✓\n\nWhat AV setup do you need?',
        workflowStepData: {
          label: 'Reserve Conference Room',
          description: 'Innovation Room (8 pax) — confirmed 10:00 AM – 11:30 AM',
          tool: 'Resource Booking API',
          result: 'Booking #BK-20260410-IN confirmed for Meridian Capital',
          duration: '0.4s',
        },
        quickReplies: [
          { id: 'av-standard', label: 'Standard — HDMI + sound bar' },
          { id: 'av-full', label: 'Full Conference — projector, mics, video conf' },
          { id: 'av-none', label: 'No AV needed' },
        ],
      },
      next: {
        'av-standard': 'ask-catering',
        'av-full': 'ask-catering',
        'av-none': 'ask-catering',
      },
    },
    'confirm-collaboration': {
      step: {
        assistantMessage:
          '**Collaboration Room** — reserved for 1:00 PM – 2:30 PM today. ✓\n\nWhat AV setup do you need?',
        workflowStepData: {
          label: 'Reserve Conference Room',
          description: 'Collaboration Room (15 pax) — confirmed 1:00 PM – 2:30 PM',
          tool: 'Resource Booking API',
          result: 'Booking #BK-20260410-CR confirmed for Meridian Capital',
          duration: '0.6s',
        },
        quickReplies: [
          { id: 'av-standard', label: 'Standard — HDMI + sound bar' },
          { id: 'av-full', label: 'Full Conference — projector, mics, video conf' },
          { id: 'av-none', label: 'No AV needed' },
        ],
      },
      next: {
        'av-standard': 'ask-catering',
        'av-full': 'ask-catering',
        'av-none': 'ask-catering',
      },
    },
    'ask-catering': {
      step: {
        assistantMessage:
          'AV setup request submitted. ✓\n\nNow for catering — what would you like?',
        workflowStepData: {
          label: 'Create AV Setup Request',
          description: 'Service request for AV equipment and configuration',
          tool: 'Service Request API',
          result: 'SR-8847 created → routed to AV Team (auto-assigned)',
          duration: '0.4s',
        },
        quickReplies: [
          { id: 'catering-coffee', label: 'Coffee & light snacks' },
          { id: 'catering-lunch', label: 'Lunch boxes (12 pax)' },
          { id: 'catering-full', label: 'Full catering — hot lunch + beverages' },
          { id: 'catering-none', label: 'No catering' },
        ],
      },
      next: {
        'catering-coffee': 'process-coffee',
        'catering-lunch': 'process-lunch',
        'catering-full': 'process-full-catering',
        'catering-none': 'generate-invoice-no-catering',
      },
    },
    'process-coffee': {
      step: {
        assistantMessage: 'Coffee & snacks order placed via Tripleseat. ✓\n\nGenerating your invoice...',
        workflowStepData: {
          label: 'Submit Catering Order',
          description: 'Coffee service + light snacks via Tripleseat',
          tool: 'Tripleseat Integration',
          result: 'Order #TS-2291 — coffee service, pastry platter for 12',
          duration: '0.6s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1500,
      },
      autoNext: 'finalize-invoice-coffee',
    },
    'process-lunch': {
      step: {
        assistantMessage: 'Lunch boxes ordered via Tripleseat. ✓\n\nGenerating your invoice...',
        workflowStepData: {
          label: 'Submit Catering Order',
          description: 'Lunch box order (12 pax) via Tripleseat',
          tool: 'Tripleseat Integration',
          result: 'Order #TS-2292 — 12x assorted lunch boxes, beverages',
          duration: '0.6s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1500,
      },
      autoNext: 'finalize-invoice-lunch',
    },
    'process-full-catering': {
      step: {
        assistantMessage:
          'Full catering order submitted via Tripleseat. ✓\n\nGenerating your invoice...',
        workflowStepData: {
          label: 'Submit Catering Order',
          description: 'Hot lunch + full beverage service (12 pax) via Tripleseat',
          tool: 'Tripleseat Integration',
          result: 'Order #TS-2293 — hot lunch buffet, coffee, beverages for 12',
          duration: '0.8s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1500,
      },
      autoNext: 'finalize-invoice-full',
    },
    'generate-invoice-no-catering': {
      step: {
        assistantMessage: 'No problem — skipping catering. Generating your invoice...',
        autoAdvance: true,
        autoAdvanceDelay: 1200,
      },
      autoNext: 'finalize-invoice-none',
    },

    // ---- Final invoice nodes ----

    'finalize-invoice-coffee': {
      step: {
        assistantMessage:
          "All done! Here's your booking summary — invoice has been automatically posted to Yardi.",
        workflowStepData: {
          label: 'Generate & Post Invoice',
          description: 'Invoice generated and posted to Yardi Voyager',
          tool: 'Billing Engine → Yardi Integration',
          result: 'INV-2026-04187 posted → AR batch 2026-04-10',
          duration: '0.8s',
        },
        artifacts: [
          {
            type: 'invoice-preview',
            title: 'Generated Invoice',
            invoice: {
              number: 'INV-2026-04187',
              date: 'April 10, 2026',
              tenant: 'Meridian Capital Group',
              building: 'One Liberty Plaza',
              lineItems: [
                { description: 'Conference Room — 1.5 hr block', quantity: 1, unitPrice: '$450.00', total: '$450.00' },
                { description: 'AV Package', quantity: 1, unitPrice: '$175.00', total: '$175.00' },
                { description: 'Coffee & light snacks (12 pax)', quantity: 1, unitPrice: '$145.00', total: '$145.00' },
              ],
              subtotal: '$770.00',
              tax: '$68.38',
              total: '$838.38',
              status: 'Posted to Yardi',
              postedTo: 'Yardi Voyager — AR Batch 2026-04-10',
            },
          },
          {
            type: 'metric-cards',
            cards: [
              { label: 'Total Time', value: '2.3s', deltaType: 'neutral' },
              { label: 'Tools Called', value: '5', deltaType: 'neutral' },
              { label: 'Manual Steps Saved', value: '11', delta: 'vs. legacy', deltaType: 'positive' },
              { label: 'Auto-Reconciled', value: 'Yes', deltaType: 'positive' },
            ],
          },
        ],
      },
    },
    'finalize-invoice-lunch': {
      step: {
        assistantMessage:
          "All done! Here's your booking summary — invoice has been automatically posted to Yardi.",
        workflowStepData: {
          label: 'Generate & Post Invoice',
          description: 'Invoice generated and posted to Yardi Voyager',
          tool: 'Billing Engine → Yardi Integration',
          result: 'INV-2026-04188 posted → AR batch 2026-04-10',
          duration: '0.8s',
        },
        artifacts: [
          {
            type: 'invoice-preview',
            title: 'Generated Invoice',
            invoice: {
              number: 'INV-2026-04188',
              date: 'April 10, 2026',
              tenant: 'Meridian Capital Group',
              building: 'One Liberty Plaza',
              lineItems: [
                { description: 'Conference Room — 1.5 hr block', quantity: 1, unitPrice: '$450.00', total: '$450.00' },
                { description: 'AV Package', quantity: 1, unitPrice: '$175.00', total: '$175.00' },
                { description: 'Lunch boxes (assorted)', quantity: 12, unitPrice: '$28.50', total: '$342.00' },
                { description: 'Beverage service', quantity: 1, unitPrice: '$85.00', total: '$85.00' },
              ],
              subtotal: '$1,052.00',
              tax: '$93.37',
              total: '$1,145.37',
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
    },
    'finalize-invoice-full': {
      step: {
        assistantMessage:
          "All done! Here's your booking summary — invoice has been automatically posted to Yardi.",
        workflowStepData: {
          label: 'Generate & Post Invoice',
          description: 'Invoice generated and posted to Yardi Voyager',
          tool: 'Billing Engine → Yardi Integration',
          result: 'INV-2026-04189 posted → AR batch 2026-04-10',
          duration: '0.9s',
        },
        artifacts: [
          {
            type: 'invoice-preview',
            title: 'Generated Invoice',
            invoice: {
              number: 'INV-2026-04189',
              date: 'April 10, 2026',
              tenant: 'Meridian Capital Group',
              building: 'One Liberty Plaza',
              lineItems: [
                { description: 'Conference Room — 1.5 hr block', quantity: 1, unitPrice: '$450.00', total: '$450.00' },
                { description: 'AV Package', quantity: 1, unitPrice: '$175.00', total: '$175.00' },
                { description: 'Hot lunch buffet (12 pax)', quantity: 1, unitPrice: '$540.00', total: '$540.00' },
                { description: 'Full beverage service', quantity: 1, unitPrice: '$185.00', total: '$185.00' },
                { description: 'Event coordination fee', quantity: 1, unitPrice: '$125.00', total: '$125.00' },
              ],
              subtotal: '$1,475.00',
              tax: '$130.91',
              total: '$1,605.91',
              status: 'Posted to Yardi',
              postedTo: 'Yardi Voyager — AR Batch 2026-04-10',
            },
          },
          {
            type: 'metric-cards',
            cards: [
              { label: 'Total Time', value: '3.1s', deltaType: 'neutral' },
              { label: 'Tools Called', value: '6', deltaType: 'neutral' },
              { label: 'Manual Steps Saved', value: '14', delta: 'vs. legacy', deltaType: 'positive' },
              { label: 'Auto-Reconciled', value: 'Yes', deltaType: 'positive' },
            ],
          },
        ],
      },
    },
    'finalize-invoice-none': {
      step: {
        assistantMessage:
          "All done! Room is booked and AV is set up. Here's your invoice — posted to Yardi automatically.",
        workflowStepData: {
          label: 'Generate & Post Invoice',
          description: 'Invoice generated and posted to Yardi Voyager',
          tool: 'Billing Engine → Yardi Integration',
          result: 'INV-2026-04190 posted → AR batch 2026-04-10',
          duration: '0.7s',
        },
        artifacts: [
          {
            type: 'invoice-preview',
            title: 'Generated Invoice',
            invoice: {
              number: 'INV-2026-04190',
              date: 'April 10, 2026',
              tenant: 'Meridian Capital Group',
              building: 'One Liberty Plaza',
              lineItems: [
                { description: 'Conference Room — 1.5 hr block', quantity: 1, unitPrice: '$450.00', total: '$450.00' },
                { description: 'AV Package', quantity: 1, unitPrice: '$175.00', total: '$175.00' },
              ],
              subtotal: '$625.00',
              tax: '$55.47',
              total: '$680.47',
              status: 'Posted to Yardi',
              postedTo: 'Yardi Voyager — AR Batch 2026-04-10',
            },
          },
        ],
      },
    },
  },
};

// ---------------------------------------------------------------------------
// INVOICE WORKFLOW
// ---------------------------------------------------------------------------

export const INVOICE_WORKFLOW: WorkflowScript = {
  id: 'invoice-workflow',
  triggerKeywords: ['invoice', 'billing', 'charge', 'tenant event', 'generate invoice', 'Yardi'],
  triggerMinMatches: 2,
  entryNode: 'ask-event-type',
  nodes: {
    'ask-event-type': {
      step: {
        assistantMessage:
          'I can generate an invoice for a tenant event. What type of event are we billing for?',
        quickReplies: [
          { id: 'cocktail', label: 'Cocktail reception (75 pax)' },
          { id: 'corporate', label: 'Corporate meeting — full day' },
          { id: 'wellness', label: 'Wellness event — studio booking' },
        ],
      },
      next: {
        cocktail: 'collect-cocktail',
        corporate: 'collect-corporate',
        wellness: 'collect-wellness',
      },
    },

    // ---- Collect charges (auto-advance) ----

    'collect-cocktail': {
      step: {
        assistantMessage: 'Collecting charges for the cocktail reception...',
        workflowStepData: {
          label: 'Collect Billable Items',
          description: 'Aggregating charges: event space, AV, catering, security',
          tool: 'Billing Engine',
          result: '4 line items — event space, AV & staging, catering (75 pax), security',
          duration: '0.2s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1200,
      },
      autoNext: 'ask-credit-cocktail',
    },
    'collect-corporate': {
      step: {
        assistantMessage: 'Collecting charges for the corporate meeting...',
        workflowStepData: {
          label: 'Collect Billable Items',
          description: 'Aggregating charges: boardroom, AV, catering, coordination',
          tool: 'Billing Engine',
          result: '4 line items — boardroom full-day, AV, lunch catering, coordination',
          duration: '0.2s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1200,
      },
      autoNext: 'ask-credit-corporate',
    },
    'collect-wellness': {
      step: {
        assistantMessage: 'Collecting charges for the wellness event...',
        workflowStepData: {
          label: 'Collect Billable Items',
          description: 'Aggregating charges: studio space, equipment, instructor, refreshments',
          tool: 'Billing Engine',
          result: '4 line items — studio, equipment rental, instructor fee, refreshments',
          duration: '0.2s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1200,
      },
      autoNext: 'ask-credit-wellness',
    },

    // ---- Ask about lease credit ----

    'ask-credit-cocktail': {
      step: {
        assistantMessage:
          'Charges collected. ✓\n\nThis tenant has a **$500/mo amenity credit** on their lease. Apply it?',
        quickReplies: [
          { id: 'credit-yes', label: 'Yes — apply $312 credit' },
          { id: 'credit-no', label: 'No — bill full amount' },
        ],
      },
      next: {
        'credit-yes': 'process-cocktail-credit',
        'credit-no': 'process-cocktail-no-credit',
      },
    },
    'ask-credit-corporate': {
      step: {
        assistantMessage:
          'Charges collected. ✓\n\nThis tenant has a **$500/mo amenity credit** on their lease. Apply it?',
        quickReplies: [
          { id: 'credit-yes', label: 'Yes — apply $312 credit' },
          { id: 'credit-no', label: 'No — bill full amount' },
        ],
      },
      next: {
        'credit-yes': 'process-corporate-credit',
        'credit-no': 'process-corporate-no-credit',
      },
    },
    'ask-credit-wellness': {
      step: {
        assistantMessage:
          'Charges collected. ✓\n\nThis tenant has a **$500/mo amenity credit** on their lease. Apply it?',
        quickReplies: [
          { id: 'credit-yes', label: 'Yes — apply $312 credit' },
          { id: 'credit-no', label: 'No — bill full amount' },
        ],
      },
      next: {
        'credit-yes': 'process-wellness-credit',
        'credit-no': 'process-wellness-no-credit',
      },
    },

    // ---- Process: tax + generate (auto-advance chains) ----

    'process-cocktail-credit': {
      step: {
        assistantMessage: 'Applying lease credit and calculating tax...',
        workflowStepData: {
          label: 'Apply Lease Terms & Calculate Tax',
          description: '$312 amenity credit applied, NYC 8.875% tax calculated',
          tool: 'Lease Management API → Tax Engine',
          result: 'Credit applied, tax: $567.38 on taxable subtotal',
          duration: '0.4s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1200,
      },
      autoNext: 'generate-cocktail-credit',
    },
    'generate-cocktail-credit': {
      step: {
        assistantMessage: 'Generating invoice PDF and posting to Yardi...',
        workflowStepData: {
          label: 'Generate Invoice & Post to Yardi',
          description: 'PDF generated, pushed to Yardi Voyager AR module',
          tool: 'Document Service → Yardi Integration',
          result: 'INV-2026-04192 posted → AR batch 2026-04-10, Lease #L-2024-0891',
          duration: '0.8s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1500,
      },
      autoNext: 'finalize-cocktail-credit',
    },
    'process-cocktail-no-credit': {
      step: {
        assistantMessage: 'Calculating tax on full amount...',
        workflowStepData: {
          label: 'Calculate Tax',
          description: 'NYC commercial occupancy tax rate applied',
          tool: 'Tax Engine',
          result: '8.875% applied — tax: $595.07',
          duration: '0.1s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1200,
      },
      autoNext: 'generate-cocktail-no-credit',
    },
    'generate-cocktail-no-credit': {
      step: {
        assistantMessage: 'Generating invoice PDF and posting to Yardi...',
        workflowStepData: {
          label: 'Generate Invoice & Post to Yardi',
          description: 'PDF generated, pushed to Yardi Voyager AR module',
          tool: 'Document Service → Yardi Integration',
          result: 'INV-2026-04193 posted → AR batch 2026-04-10, Lease #L-2024-0891',
          duration: '0.8s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1500,
      },
      autoNext: 'finalize-cocktail-no-credit',
    },

    'process-corporate-credit': {
      step: {
        assistantMessage: 'Applying lease credit and calculating tax...',
        workflowStepData: {
          label: 'Apply Lease Terms & Calculate Tax',
          description: '$312 amenity credit applied, NYC 8.875% tax calculated',
          tool: 'Lease Management API → Tax Engine',
          result: 'Credit applied, tax: $122.30 on taxable subtotal',
          duration: '0.4s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1200,
      },
      autoNext: 'generate-corporate-credit',
    },
    'generate-corporate-credit': {
      step: {
        assistantMessage: 'Generating invoice PDF and posting to Yardi...',
        workflowStepData: {
          label: 'Generate Invoice & Post to Yardi',
          description: 'PDF generated, pushed to Yardi Voyager AR module',
          tool: 'Document Service → Yardi Integration',
          result: 'INV-2026-04194 posted → AR batch 2026-04-10',
          duration: '0.8s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1500,
      },
      autoNext: 'finalize-corporate-credit',
    },
    'process-corporate-no-credit': {
      step: {
        assistantMessage: 'Calculating tax on full amount...',
        workflowStepData: {
          label: 'Calculate Tax',
          description: 'NYC commercial occupancy tax rate applied',
          tool: 'Tax Engine',
          result: '8.875% applied — tax: $149.99',
          duration: '0.1s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1200,
      },
      autoNext: 'generate-corporate-no-credit',
    },
    'generate-corporate-no-credit': {
      step: {
        assistantMessage: 'Generating invoice PDF and posting to Yardi...',
        workflowStepData: {
          label: 'Generate Invoice & Post to Yardi',
          description: 'PDF generated, pushed to Yardi Voyager AR module',
          tool: 'Document Service → Yardi Integration',
          result: 'INV-2026-04195 posted → AR batch 2026-04-10',
          duration: '0.8s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1500,
      },
      autoNext: 'finalize-corporate-no-credit',
    },

    'process-wellness-credit': {
      step: {
        assistantMessage: 'Applying lease credit and calculating tax...',
        workflowStepData: {
          label: 'Apply Lease Terms & Calculate Tax',
          description: '$312 amenity credit applied, NYC 8.875% tax calculated',
          tool: 'Lease Management API → Tax Engine',
          result: 'Credit applied, tax: $129.84 on taxable subtotal',
          duration: '0.4s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1200,
      },
      autoNext: 'generate-wellness-credit',
    },
    'generate-wellness-credit': {
      step: {
        assistantMessage: 'Generating invoice PDF and posting to Yardi...',
        workflowStepData: {
          label: 'Generate Invoice & Post to Yardi',
          description: 'PDF generated, pushed to Yardi Voyager AR module',
          tool: 'Document Service → Yardi Integration',
          result: 'INV-2026-04196 posted → AR batch 2026-04-10',
          duration: '0.8s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1500,
      },
      autoNext: 'finalize-wellness-credit',
    },
    'process-wellness-no-credit': {
      step: {
        assistantMessage: 'Calculating tax on full amount...',
        workflowStepData: {
          label: 'Calculate Tax',
          description: 'NYC commercial occupancy tax rate applied',
          tool: 'Tax Engine',
          result: '8.875% applied — tax: $157.53',
          duration: '0.1s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1200,
      },
      autoNext: 'generate-wellness-no-credit',
    },
    'generate-wellness-no-credit': {
      step: {
        assistantMessage: 'Generating invoice PDF and posting to Yardi...',
        workflowStepData: {
          label: 'Generate Invoice & Post to Yardi',
          description: 'PDF generated, pushed to Yardi Voyager AR module',
          tool: 'Document Service → Yardi Integration',
          result: 'INV-2026-04197 posted → AR batch 2026-04-10',
          duration: '0.8s',
        },
        autoAdvance: true,
        autoAdvanceDelay: 1500,
      },
      autoNext: 'finalize-wellness-no-credit',
    },

    // ---- Final invoice nodes ----

    'finalize-cocktail-credit': {
      step: {
        assistantMessage:
          "All done! Here's the invoice — it's been automatically posted to Yardi with the lease credit applied.",
        artifacts: [
          {
            type: 'invoice-preview',
            title: 'Generated Invoice',
            invoice: {
              number: 'INV-2026-04192',
              date: 'April 10, 2026',
              tenant: 'Meridian Capital Group',
              building: 'One Liberty Plaza',
              lineItems: [
                { description: 'Event Space — Grand Terrace, 4hr block', quantity: 1, unitPrice: '$2,200.00', total: '$2,200.00' },
                { description: 'AV & staging package', quantity: 1, unitPrice: '$650.00', total: '$650.00' },
                { description: 'Catering — cocktail reception (75 pax)', quantity: 1, unitPrice: '$3,375.00', total: '$3,375.00' },
                { description: 'Security detail — after-hours (4 hrs)', quantity: 1, unitPrice: '$480.00', total: '$480.00' },
                { description: 'Amenity credit (lease term)', quantity: 1, unitPrice: '-$312.00', total: '-$312.00' },
              ],
              subtotal: '$6,393.00',
              tax: '$567.38',
              total: '$6,960.38',
              status: 'Posted to Yardi',
              postedTo: 'Yardi Voyager — AR Batch 2026-04-10, Lease #L-2024-0891',
            },
          },
          {
            type: 'metric-cards',
            cards: [
              { label: 'Total Time', value: '1.8s', deltaType: 'neutral' },
              { label: 'Tools Called', value: '6', deltaType: 'neutral' },
              { label: 'Manual Steps Saved', value: '14', delta: 'vs. legacy', deltaType: 'positive' },
              { label: 'Auto-Reconciled', value: 'Yes', deltaType: 'positive' },
            ],
          },
        ],
      },
    },
    'finalize-cocktail-no-credit': {
      step: {
        assistantMessage: "All done! Here's the invoice — posted to Yardi automatically.",
        artifacts: [
          {
            type: 'invoice-preview',
            title: 'Generated Invoice',
            invoice: {
              number: 'INV-2026-04193',
              date: 'April 10, 2026',
              tenant: 'Meridian Capital Group',
              building: 'One Liberty Plaza',
              lineItems: [
                { description: 'Event Space — Grand Terrace, 4hr block', quantity: 1, unitPrice: '$2,200.00', total: '$2,200.00' },
                { description: 'AV & staging package', quantity: 1, unitPrice: '$650.00', total: '$650.00' },
                { description: 'Catering — cocktail reception (75 pax)', quantity: 1, unitPrice: '$3,375.00', total: '$3,375.00' },
                { description: 'Security detail — after-hours (4 hrs)', quantity: 1, unitPrice: '$480.00', total: '$480.00' },
              ],
              subtotal: '$6,705.00',
              tax: '$595.07',
              total: '$7,300.07',
              status: 'Posted to Yardi',
              postedTo: 'Yardi Voyager — AR Batch 2026-04-10, Lease #L-2024-0891',
            },
          },
          {
            type: 'metric-cards',
            cards: [
              { label: 'Total Time', value: '1.5s', deltaType: 'neutral' },
              { label: 'Tools Called', value: '5', deltaType: 'neutral' },
              { label: 'Manual Steps Saved', value: '12', delta: 'vs. legacy', deltaType: 'positive' },
              { label: 'Auto-Reconciled', value: 'Yes', deltaType: 'positive' },
            ],
          },
        ],
      },
    },
    'finalize-corporate-credit': {
      step: {
        assistantMessage:
          "All done! Here's the invoice — posted to Yardi with the lease credit applied.",
        artifacts: [
          {
            type: 'invoice-preview',
            title: 'Generated Invoice',
            invoice: {
              number: 'INV-2026-04194',
              date: 'April 10, 2026',
              tenant: 'Meridian Capital Group',
              building: 'One Liberty Plaza',
              lineItems: [
                { description: 'Boardroom — full day rental', quantity: 1, unitPrice: '$850.00', total: '$850.00' },
                { description: 'AV package — projector, video conf', quantity: 1, unitPrice: '$175.00', total: '$175.00' },
                { description: 'Lunch catering (20 pax)', quantity: 1, unitPrice: '$540.00', total: '$540.00' },
                { description: 'Event coordination fee', quantity: 1, unitPrice: '$125.00', total: '$125.00' },
                { description: 'Amenity credit (lease term)', quantity: 1, unitPrice: '-$312.00', total: '-$312.00' },
              ],
              subtotal: '$1,378.00',
              tax: '$122.30',
              total: '$1,500.30',
              status: 'Posted to Yardi',
              postedTo: 'Yardi Voyager — AR Batch 2026-04-10',
            },
          },
          {
            type: 'metric-cards',
            cards: [
              { label: 'Total Time', value: '1.8s', deltaType: 'neutral' },
              { label: 'Tools Called', value: '6', deltaType: 'neutral' },
              { label: 'Manual Steps Saved', value: '14', delta: 'vs. legacy', deltaType: 'positive' },
              { label: 'Auto-Reconciled', value: 'Yes', deltaType: 'positive' },
            ],
          },
        ],
      },
    },
    'finalize-corporate-no-credit': {
      step: {
        assistantMessage: "All done! Here's the invoice — posted to Yardi automatically.",
        artifacts: [
          {
            type: 'invoice-preview',
            title: 'Generated Invoice',
            invoice: {
              number: 'INV-2026-04195',
              date: 'April 10, 2026',
              tenant: 'Meridian Capital Group',
              building: 'One Liberty Plaza',
              lineItems: [
                { description: 'Boardroom — full day rental', quantity: 1, unitPrice: '$850.00', total: '$850.00' },
                { description: 'AV package — projector, video conf', quantity: 1, unitPrice: '$175.00', total: '$175.00' },
                { description: 'Lunch catering (20 pax)', quantity: 1, unitPrice: '$540.00', total: '$540.00' },
                { description: 'Event coordination fee', quantity: 1, unitPrice: '$125.00', total: '$125.00' },
              ],
              subtotal: '$1,690.00',
              tax: '$149.99',
              total: '$1,839.99',
              status: 'Posted to Yardi',
              postedTo: 'Yardi Voyager — AR Batch 2026-04-10',
            },
          },
          {
            type: 'metric-cards',
            cards: [
              { label: 'Total Time', value: '1.5s', deltaType: 'neutral' },
              { label: 'Tools Called', value: '5', deltaType: 'neutral' },
              { label: 'Manual Steps Saved', value: '12', delta: 'vs. legacy', deltaType: 'positive' },
              { label: 'Auto-Reconciled', value: 'Yes', deltaType: 'positive' },
            ],
          },
        ],
      },
    },
    'finalize-wellness-credit': {
      step: {
        assistantMessage:
          "All done! Here's the invoice — posted to Yardi with the lease credit applied.",
        artifacts: [
          {
            type: 'invoice-preview',
            title: 'Generated Invoice',
            invoice: {
              number: 'INV-2026-04196',
              date: 'April 10, 2026',
              tenant: 'Meridian Capital Group',
              building: 'One Liberty Plaza',
              lineItems: [
                { description: 'Wellness Studio — 3hr block', quantity: 1, unitPrice: '$800.00', total: '$800.00' },
                { description: 'Equipment rental (mats, weights)', quantity: 1, unitPrice: '$350.00', total: '$350.00' },
                { description: 'Instructor fee', quantity: 1, unitPrice: '$400.00', total: '$400.00' },
                { description: 'Refreshments & towel service', quantity: 1, unitPrice: '$225.00', total: '$225.00' },
                { description: 'Amenity credit (lease term)', quantity: 1, unitPrice: '-$312.00', total: '-$312.00' },
              ],
              subtotal: '$1,463.00',
              tax: '$129.84',
              total: '$1,592.84',
              status: 'Posted to Yardi',
              postedTo: 'Yardi Voyager — AR Batch 2026-04-10',
            },
          },
          {
            type: 'metric-cards',
            cards: [
              { label: 'Total Time', value: '1.8s', deltaType: 'neutral' },
              { label: 'Tools Called', value: '6', deltaType: 'neutral' },
              { label: 'Manual Steps Saved', value: '14', delta: 'vs. legacy', deltaType: 'positive' },
              { label: 'Auto-Reconciled', value: 'Yes', deltaType: 'positive' },
            ],
          },
        ],
      },
    },
    'finalize-wellness-no-credit': {
      step: {
        assistantMessage: "All done! Here's the invoice — posted to Yardi automatically.",
        artifacts: [
          {
            type: 'invoice-preview',
            title: 'Generated Invoice',
            invoice: {
              number: 'INV-2026-04197',
              date: 'April 10, 2026',
              tenant: 'Meridian Capital Group',
              building: 'One Liberty Plaza',
              lineItems: [
                { description: 'Wellness Studio — 3hr block', quantity: 1, unitPrice: '$800.00', total: '$800.00' },
                { description: 'Equipment rental (mats, weights)', quantity: 1, unitPrice: '$350.00', total: '$350.00' },
                { description: 'Instructor fee', quantity: 1, unitPrice: '$400.00', total: '$400.00' },
                { description: 'Refreshments & towel service', quantity: 1, unitPrice: '$225.00', total: '$225.00' },
              ],
              subtotal: '$1,775.00',
              tax: '$157.53',
              total: '$1,932.53',
              status: 'Posted to Yardi',
              postedTo: 'Yardi Voyager — AR Batch 2026-04-10',
            },
          },
          {
            type: 'metric-cards',
            cards: [
              { label: 'Total Time', value: '1.5s', deltaType: 'neutral' },
              { label: 'Tools Called', value: '5', deltaType: 'neutral' },
              { label: 'Manual Steps Saved', value: '12', delta: 'vs. legacy', deltaType: 'positive' },
              { label: 'Auto-Reconciled', value: 'Yes', deltaType: 'positive' },
            ],
          },
        ],
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Registry & detection
// ---------------------------------------------------------------------------

export const WORKFLOW_SCRIPTS: WorkflowScript[] = [BOOKING_WORKFLOW, INVOICE_WORKFLOW];

export function detectWorkflow(userMessage: string): WorkflowScript | null {
  const lower = userMessage.toLowerCase();
  for (const script of WORKFLOW_SCRIPTS) {
    const matches = script.triggerKeywords.filter((kw) => lower.includes(kw.toLowerCase()));
    if (matches.length >= script.triggerMinMatches) {
      return script;
    }
  }
  return null;
}
