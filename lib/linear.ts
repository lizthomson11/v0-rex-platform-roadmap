/**
 * Live roadmap data from Linear (server only).
 *
 * Source of truth: Linear projects labeled "Roadmap". We fetch them, map each
 * into a suite + quarter (see lib/roadmap-config.ts), merge with the frozen
 * delivered archive, and hand the grid a ready-to-render structure.
 *
 * Requires a LINEAR_API_KEY env var (a Linear personal API key). If it is
 * missing or the request fails, we fall back to the static roadmap so the site
 * always renders.
 *
 * The fetch is cached via Next's data cache (revalidate = ROADMAP_REVALIDATE),
 * so both the /roadmap page and the chat route share one hourly refresh instead
 * of hitting Linear on every request.
 */

import {
  buildSuitesFromProjects,
  mergeWithArchive,
  limitToPublishedQuarters,
  staticToSuite,
  FALLBACK_SUITES,
  FALLBACK_QUARTER_COLUMNS,
  type LinearProject,
  type Suite,
  type QuarterColumn,
} from "./roadmap-config"

const LINEAR_API_URL = "https://api.linear.app/graphql"
const ROADMAP_LABEL = "Roadmap"

/** Cache lifetime for the Linear fetch, in seconds. */
export const ROADMAP_REVALIDATE = 3600

export type RoadmapData = {
  suites: Suite[]
  quarterColumns: QuarterColumn[]
  source: "linear" | "fallback"
}

// Note: Linear collection filters (labels/teams/etc.) require a `some`/`every`/
// `none` wrapper — `{ labels: { name: {...} } }` is rejected with a 400.
// `state` is the stable scalar project state ("backlog" | "planned" |
// "started" | "completed" | "canceled"); we avoid the `status { type }` object
// to stay compatible across Linear API versions.
const PROJECTS_QUERY = /* GraphQL */ `
  query RoadmapProjects($after: String, $label: String!) {
    projects(
      first: 50
      after: $after
      filter: { labels: { some: { name: { eq: $label } } } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        name
        targetDate
        state
        initiatives(first: 10) {
          nodes {
            name
          }
        }
        teams(first: 10) {
          nodes {
            name
          }
        }
      }
    }
  }
`

type RawProject = {
  name: string
  targetDate: string | null
  state: string | null
  initiatives: { nodes: { name: string }[] }
  teams: { nodes: { name: string }[] }
}

function toLinearProject(p: RawProject): LinearProject {
  return {
    name: p.name,
    targetDate: p.targetDate,
    statusType: p.state ?? null,
    initiatives: p.initiatives?.nodes ?? [],
    teams: p.teams?.nodes ?? [],
  }
}

async function fetchRoadmapProjects(apiKey: string): Promise<LinearProject[]> {
  const projects: LinearProject[] = []
  let after: string | null = null

  // Paginate defensively (cap iterations so a bad cursor can't loop forever).
  for (let page = 0; page < 20; page++) {
    const res: Response = await fetch(LINEAR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        query: PROJECTS_QUERY,
        variables: { after, label: ROADMAP_LABEL },
      }),
      next: { revalidate: ROADMAP_REVALIDATE },
    })

    if (!res.ok) {
      const body = await res.text().catch(() => "")
      throw new Error(`Linear API returned ${res.status} ${res.statusText}: ${body.slice(0, 500)}`)
    }

    const json = (await res.json()) as {
      data?: { projects?: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: RawProject[] } }
      errors?: { message: string }[]
    }

    if (json.errors?.length) {
      throw new Error(`Linear GraphQL error: ${json.errors.map((e) => e.message).join("; ")}`)
    }

    const connection = json.data?.projects
    if (!connection) break

    projects.push(...connection.nodes.map(toLinearProject))

    if (!connection.pageInfo.hasNextPage) break
    after = connection.pageInfo.endCursor
  }

  return projects
}

/**
 * Returns the merged roadmap (delivered archive + live Linear). Never throws —
 * on any failure it returns the static fallback with source: "fallback".
 */
export async function getRoadmap(): Promise<RoadmapData> {
  const apiKey = process.env.LINEAR_API_KEY

  if (!apiKey) {
    return {
      suites: FALLBACK_SUITES.map(staticToSuite),
      quarterColumns: FALLBACK_QUARTER_COLUMNS,
      source: "fallback",
    }
  }

  try {
    const projects = await fetchRoadmapProjects(apiKey)
    if (projects.length === 0) {
      // No Roadmap-labeled projects came back — treat as a failure rather than
      // wiping the roadmap to just the delivered archive.
      throw new Error("Linear returned no Roadmap-labeled projects")
    }
    const merged = mergeWithArchive(buildSuitesFromProjects(projects))
    const published = limitToPublishedQuarters(merged)
    return { ...published, source: "linear" }
  } catch (err) {
    console.error("[roadmap] Falling back to static data:", err)
    return {
      suites: FALLBACK_SUITES.map(staticToSuite),
      quarterColumns: FALLBACK_QUARTER_COLUMNS,
      source: "fallback",
    }
  }
}
