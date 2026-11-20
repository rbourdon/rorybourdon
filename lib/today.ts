import { cacheLife } from "next/cache";

// The raw material pieces are made from: what is on the front page of Hacker
// News right now, and what Rory has pushed to public repositories lately.

export interface Story {
  id: string;
  title: string;
  points: number;
  comments: number;
  hoursAgo: number;
  domain: string;
}

export interface Commit {
  id: string;
  repo: string;
  message: string;
  hoursAgo: number;
}

export interface Today {
  stories: Story[];
  commits: Commit[];
  /** True when a source could not be reached and stand-in data is shown. */
  sample: boolean;
}

const HOUR = 3_600_000;

function domainOf(url: string | null | undefined) {
  if (!url) return "news.ycombinator.com";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "news.ycombinator.com";
  }
}

interface AlgoliaHit {
  objectID: string;
  title?: string;
  url?: string | null;
  points?: number | null;
  num_comments?: number | null;
  created_at_i: number;
}

async function fetchStories(now: number): Promise<Story[]> {
  const res = await fetch(
    "https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30",
  );
  if (!res.ok) throw new Error(`Hacker News answered ${res.status}`);
  const body = (await res.json()) as { hits: AlgoliaHit[] };
  return body.hits
    .filter((hit) => hit.title)
    .map((hit) => ({
      id: `s${hit.objectID}`,
      title: hit.title ?? "",
      points: hit.points ?? 1,
      comments: hit.num_comments ?? 0,
      hoursAgo: Math.max(0, (now - hit.created_at_i * 1000) / HOUR),
      domain: domainOf(hit.url),
    }));
}

interface CommitHit {
  sha: string;
  commit: { message: string; author: { date: string } };
  repository: { name: string };
}

async function fetchCommits(now: number): Promise<Commit[]> {
  const res = await fetch(
    "https://api.github.com/search/commits?q=author:rbourdon&sort=author-date&order=desc&per_page=6",
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) throw new Error(`GitHub answered ${res.status}`);
  const body = (await res.json()) as { items: CommitHit[] };
  return body.items.map((item) => ({
    id: `c${item.sha.slice(0, 10)}`,
    repo: item.repository.name,
    message: item.commit.message.split("\n")[0] ?? "",
    hoursAgo: Math.max(0, (now - Date.parse(item.commit.author.date)) / HOUR),
  }));
}

// Cached for an hour when it works. When a source cannot be reached the
// stand-in data is cached for a minute only, so the next visitor tries again.
// (The failure is handled in here because an error thrown out of a cached
// function fails the build even when the caller catches it.)
export async function getToday(): Promise<Today> {
  "use cache";
  try {
    const now = Date.now();
    const [stories, commits] = await Promise.all([
      fetchStories(now),
      // Commits are a garnish. Losing them should not lose the day.
      fetchCommits(now).catch(() => []),
    ]);
    if (stories.length === 0) throw new Error("The front page came back empty");
    cacheLife("hours");
    return { stories, commits, sample: false };
  } catch {
    cacheLife({ stale: 60, revalidate: 60, expire: 600 });
    return sampleToday;
  }
}

// Stand-in material for when the network is not there (local sandboxes,
// outages). The titles are deliberately generic so nobody mistakes them for
// news.
const sampleShape: [points: number, comments: number, hoursAgo: number][] = [
  [1240, 612, 9.5],
  [873, 301, 6.2],
  [702, 455, 13.0],
  [540, 120, 4.1],
  [488, 266, 17.4],
  [431, 97, 2.6],
  [390, 340, 20.2],
  [352, 61, 7.7],
  [318, 143, 11.3],
  [290, 88, 1.4],
  [262, 204, 15.8],
  [240, 39, 5.0],
  [221, 72, 8.9],
  [198, 150, 22.1],
  [180, 26, 3.3],
  [167, 58, 12.2],
  [151, 110, 18.6],
  [139, 17, 0.8],
  [128, 44, 6.9],
  [117, 80, 14.5],
  [104, 12, 2.0],
  [96, 35, 10.1],
  [88, 61, 19.3],
  [79, 9, 4.6],
  [71, 28, 16.7],
  [64, 19, 1.1],
  [57, 41, 21.0],
  [49, 6, 7.2],
];
const sampleDomains = ["a.example", "b.example", "c.example", "d.example"];

const sampleToday: Today = {
  sample: true,
  stories: sampleShape.map(([points, comments, hoursAgo], i) => ({
    id: `s${i}`,
    title: `Sample story ${i + 1}`,
    points,
    comments,
    hoursAgo,
    domain: sampleDomains[(i * 7) % sampleDomains.length] ?? "a.example",
  })),
  commits: [
    { id: "c0", repo: "sample", message: "Sample commit 1", hoursAgo: 3.5 },
    { id: "c1", repo: "sample", message: "Sample commit 2", hoursAgo: 11 },
    { id: "c2", repo: "sample", message: "Sample commit 3", hoursAgo: 19.5 },
  ],
};
