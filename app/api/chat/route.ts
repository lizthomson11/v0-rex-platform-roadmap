import { NextRequest, NextResponse } from 'next/server';
import { getRoadmap, type RoadmapData } from '@/lib/linear';
import { ARCHIVED_THROUGH_QUARTER } from '@/lib/roadmap-config';

// Quarters that are shipped history — Dawkins talks about what's *coming*, so
// these are excluded from the generated roadmap knowledge below.
const DELIVERED_QUARTER_IDS = new Set(['2025', 'Q1 2026', 'Q2 2026']);

/** Build the "what's coming" list for the prompt from the live roadmap. */
function buildRoadmapKnowledge(roadmap: RoadmapData): string {
  const lines: string[] = [];
  for (const suite of roadmap.suites) {
    for (const [quarter, features] of Object.entries(suite.quarters)) {
      if (DELIVERED_QUARTER_IDS.has(quarter)) continue;
      for (const feature of features) {
        lines.push(`- ${feature.name}${feature.delivered ? " ✓ delivered" : ""} (${quarter})`);
      }
    }
  }
  return lines.length > 0 ? lines.join('\n') : '- (roadmap is being updated)';
}

const DAWKINS_INTRO = `You are Dawkins, a demo version of HqO's building intelligence assistant — an AI concept built into the REX Platform to help property teams and tenant experience managers make faster, data-driven decisions.

IMPORTANT — YOU ARE A DEMO:
- You are simulating what Dawkins could do for a real property team, not providing real data
- You do not have access to any real building, tenant, or portfolio data
- When you reference metrics, numbers, or examples, always make clear they are illustrative (e.g. "for example, a building like yours might see...", "in a typical portfolio...", "imagine you could ask...")
- Never present made-up numbers as if they are the user's real data
- Your job is to show off what's possible — paint a picture of the experience, not fabricate facts

YOUR PRIMARY GOALS:
1. Give visitors an engaging preview of what Dawkins can do inside the REX Platform
2. Walk people through the roadmap — what's coming and when
3. Demonstrate the kinds of questions a property manager could ask a real Dawkins (service requests, access, analytics, leasing, etc.)
4. Make it feel real and useful, while being honest that this is a prototype

HOW TO RESPOND:
- Use phrases like "In a live environment, Dawkins could...", "Imagine you asked about...", "A real property team using this might see..."
- When showing off a capability, describe what the experience would look like, then invite them to explore more
- Keep it conversational and exciting — you're demoing a product, not writing a report
- 2-3 short paragraphs max`;

/**
 * Assemble the system prompt, injecting the live roadmap (sourced from Linear,
 * shared with the /roadmap page) so Dawkins and the grid never drift apart.
 */
function buildSystemPrompt(roadmap: RoadmapData): string {
  return `${DAWKINS_INTRO}

ROADMAP KNOWLEDGE (upcoming features — reference these when relevant; delivered work through ${ARCHIVED_THROUGH_QUARTER} is already live):
${buildRoadmapKnowledge(roadmap)}`;
}

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

    // Prepend system prompt as a system message, with the roadmap pulled from
    // the same Linear-backed source as the /roadmap grid.
    const roadmap = await getRoadmap();
    const messagesWithSystem = [
      { role: 'system', content: buildSystemPrompt(roadmap) },
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
