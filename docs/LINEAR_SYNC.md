# Linear → Roadmap sync

The public roadmap (`/roadmap`) and the Dawkins demo chat both pull their
feature list from **Linear** so there's a single source of truth — no more
maintaining a separate list in code.

## How it works

- **Source of truth:** every Linear project labeled **`Roadmap`**.
- On each page render (cached hourly via ISR), the app queries the Linear
  GraphQL API for those projects and maps each one into the grid:
  - **Quarter** ← the project's `targetDate` (e.g. `2026-08-01` → `Q3 2026`).
    New quarter columns (like `Q1 2027`) appear automatically as work is dated
    further out.
  - **Suite** ← resolved in priority order (see `lib/roadmap-config.ts`):
    1. The **`Swimlane …`** initiative on the project (the explicit grouping).
    2. The project's **name prefix** (text before the first ` - `), matched to a
       product area — this mirrors how the grid was organized by hand.
    3. The owning **team**, as a last resort.
    - When a project has *multiple* swimlanes, the one matching its name prefix
      wins; otherwise a fixed priority order breaks the tie.
  - **Feature name** ← the project name.
  - Canceled projects are dropped.
- **Delivered history is frozen in code.** Linear's `Roadmap` label only covers
  current/future work, so the shipped quarters (through
  `ARCHIVED_THROUGH_QUARTER`, currently **Q2 2026**) live in
  `DELIVERED_ARCHIVE` in `lib/roadmap-config.ts`. They're merged in front of the
  live Linear data. These never change, so they aren't a maintenance burden.
- **No duplicates / no false "delivered".** If a delivered item slipped and now
  shows up in Linear (Q3/Q4), it's dropped from the archive automatically (exact
  name match, in `mergeWithArchive`). Reworded slips that an exact match can't
  catch are cleaned out of `DELIVERED_ARCHIVE` by hand — five were removed in the
  initial pass (e.g. Yardi integration, SR Pricing & Payments).
- **External publish horizon.** Quarters after `PUBLISHED_THROUGH_QUARTER`
  (currently **Q4 2026**) are still fetched and built but hidden from the public
  grid and the chat. Q1 2027 exists in the data — bump this constant to publish
  it when it's ready.

## Setup (one-time)

The app needs a Linear **personal API key**:

1. In Linear: **Settings → Security & access → Personal API keys → New key**.
   A read-only key is sufficient.
2. Add it to Vercel: **Project → Settings → Environment Variables** →
   `LINEAR_API_KEY = <key>` (Production + Preview). Redeploy.
3. For local dev, copy `.env.example` to `.env.local` and fill in the key.

**Without the key**, nothing breaks — the site renders the static fallback in
`lib/roadmap-config.ts` (`source: "fallback"`).

## Keeping the mapping accurate

The mapping was validated against all Roadmap-labeled projects with zero
unmapped items. To keep it clean as the roadmap grows:

- Prefer giving each roadmap project **exactly one `Swimlane …` initiative** —
  that's the most reliable suite signal and removes any guesswork.
- If a new product area appears that isn't recognized, add it to
  `PREFIX_TO_SUITE` (or `TEAM_TO_SUITE`) in `lib/roadmap-config.ts`. Anything
  unrecognized falls back to the **Experience** suite.

## Files

| File | Role |
| --- | --- |
| `lib/roadmap-config.ts` | Types, suite metadata, delivered archive, fallback, and the pure Linear→suite/quarter mapping. Client-safe. |
| `lib/linear.ts` | Server-only Linear GraphQL fetch + `getRoadmap()` (merge + fallback). |
| `app/roadmap/page.tsx` | Server component; fetches via `getRoadmap()` with `revalidate = 3600`. |
| `components/roadmap-grid.tsx` | Renders `suites` / `quarterColumns` passed as props. |
| `app/api/chat/route.ts` | Dawkins prompt; roadmap knowledge generated from `getRoadmap()`. |
