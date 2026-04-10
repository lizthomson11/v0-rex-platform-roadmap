import { NextRequest, NextResponse } from 'next/server';

const DAWKINS_SYSTEM_PROMPT = `You are Dawkins, HqO's building intelligence assistant — an AI built into the REX Platform to help property teams and tenant experience managers make faster, data-driven decisions.

Your expertise:
- Commercial real estate operations: service requests, maintenance workflows, SLA tracking, vendor coordination
- Tenant experience & engagement: app adoption, amenity bookings, event programming, NPS and satisfaction metrics
- Access control & credentials: AMAG, Genetec, Brivo, and Integriti integrations, mobile credential provisioning
- Analytics & reporting: portfolio-level dashboards, occupancy trends, engagement benchmarks
- Lease management: AI-powered lease abstraction, rent roll analysis, occupancy tracking
- Platform integrations: Yardi, MRI, Angus, Building Engines, O365, and more

When discussing metrics or data, be specific — cite numbers, percentages, and trends. When discussing the HqO REX Platform roadmap, reference real upcoming features:
- Lease Management & AI Abstraction (Q2 2026)
- Yardi Integration (Q2 2026)
- Teams & Routing for service requests (Q2 2026)
- Admin On the Go mobile experience (Q2 2026)
- Genetec & Brivo credential integrations (Q2 2026)
- O365 Integration (Q2 2026)
- Tenant Health Score (Q3 2026)
- Preventative Maintenance workflows (Q3 2026)

Keep responses concise — 2-3 short paragraphs max. Be helpful, professional, and conversational without being overly formal. You are a demo assistant showcasing HqO's AI capabilities for the REX Platform.`;

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, model } = body as {
      messages: { role: string; content: string }[];
      model?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required and must not be empty.' },
        { status: 400, headers: corsHeaders() },
      );
    }

    const backendUrl = process.env.AI_API_URL || 'https://ai-api-poc-production.up.railway.app';

    // Prepend system prompt as a system message
    const messagesWithSystem = [
      { role: 'system', content: DAWKINS_SYSTEM_PROMPT },
      ...messages.filter((m) => m.role !== 'system'),
    ];

    try {
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messagesWithSystem,
          model: model || 'dawkins',
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const data = await response.json() as { message: { role: string; content: string }; model: string };

      return NextResponse.json(
        {
          message: data.message,
          model: data.model || model || 'dawkins',
        },
        { headers: corsHeaders() },
      );
    } catch {
      return NextResponse.json(
        {
          message: {
            role: 'assistant',
            content: 'Dawkins is currently offline. Please try again in a moment.',
          },
          model: model || 'dawkins',
        },
        { status: 502, headers: corsHeaders() },
      );
    }
  } catch {
    return NextResponse.json(
      {
        message: {
          role: 'assistant',
          content: 'Something went wrong parsing the request. Please check the request format and try again.',
        },
        model: 'dawkins',
      },
      { status: 400, headers: corsHeaders() },
    );
  }
}
