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

const BACKEND_URL = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:3000';
const REQUEST_TIMEOUT_MS = 30_000;

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

    const fullMessages = [
      { role: 'system', content: DAWKINS_SYSTEM_PROMPT },
      ...messages,
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: fullMessages,
          model: model || 'dawkins',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        return NextResponse.json(
          {
            message: {
              role: 'assistant',
              content: `I encountered an issue processing that request (${response.status}). Please try again.`,
            },
            model: model || 'dawkins',
            error: errorText,
          },
          { status: response.status, headers: corsHeaders() },
        );
      }

      const data = await response.json();

      return NextResponse.json(
        {
          message: data.message,
          model: data.model || model || 'dawkins',
        },
        { headers: corsHeaders() },
      );
    } catch (fetchError: unknown) {
      clearTimeout(timeout);

      if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
        return NextResponse.json(
          {
            message: {
              role: 'assistant',
              content:
                'The request timed out — Dawkins is taking longer than usual. The model may be under heavy load. Please try again in a moment.',
            },
            model: model || 'dawkins',
          },
          { status: 504, headers: corsHeaders() },
        );
      }

      return NextResponse.json(
        {
          message: {
            role: 'assistant',
            content:
              'Dawkins is currently offline. The GPU instances may need to be started. Please contact your administrator or try again later.',
          },
          model: model || 'dawkins',
        },
        { status: 503, headers: corsHeaders() },
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
