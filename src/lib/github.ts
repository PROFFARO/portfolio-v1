import {
  fallbackProjects,
  projectMeta,
  type Project,
  type GitHubProfile,
  type LanguageStat,
  type SiteData,
} from "@/data/profile";

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "proffaro";

function authHeaders(): HeadersInit {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function gh<T>(url: string, revalidate = 3600): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: authHeaders(), next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function fetchProfile(): Promise<GitHubProfile | null> {
  const data = await gh<any>(`https://api.github.com/users/${USERNAME}`);
  if (!data || !data.login) return null;
  return {
    name: data.name ?? data.login,
    login: data.login,
    bio: data.bio ?? "",
    avatarUrl: data.avatar_url,
    followers: data.followers ?? 0,
    following: data.following ?? 0,
    publicRepos: data.public_repos ?? 0,
    location: data.location ?? null,
    htmlUrl: data.html_url,
    blog: data.blog || null,
  };
}

function toProject(r: GitHubRepo): Project {
  const meta = projectMeta[r.name];
  return {
    name: r.name,
    display: meta?.display ?? r.name.replace(/[-_]/g, " "),
    description:
      meta?.description ?? r.description ?? "No description provided on GitHub.",
    tags:
      r.topics && r.topics.length
        ? r.topics.slice(0, 5)
        : [r.language ?? "Code"].filter(Boolean),
    language: r.language ?? "Code",
    stars: r.stargazers_count,
    forks: r.forks_count,
    url: r.html_url,
    demo: r.homepage || undefined,
    status: r.archived ? "ARCHIVED" : "ACTIVE",
    classified: meta?.classified,
    period: meta?.period,
    updated: r.updated_at,
  };
}

/** Aggregate real bytes-per-language across the top repos. */
async function fetchLanguageStats(repos: GitHubRepo[]): Promise<LanguageStat[]> {
  const top = repos.slice(0, 12);
  const totals: Record<string, number> = {};

  const results = await Promise.all(
    top.map((r) => gh<Record<string, number>>(r.languages_url))
  );

  for (const langs of results) {
    if (!langs) continue;
    for (const [name, bytes] of Object.entries(langs)) {
      totals[name] = (totals[name] ?? 0) + bytes;
    }
  }

  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  if (sum === 0) return [];

  return Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: Math.round((bytes / sum) * 1000) / 10,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8);
}

/** Single entry point — fetches everything dynamically with a graceful fallback. */
export async function getSiteData(): Promise<SiteData> {
  const [profile, repos] = await Promise.all([
    fetchProfile(),
    gh<GitHubRepo[]>(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`
    ),
  ]);

  if (!repos || !Array.isArray(repos)) {
    return { github: profile, projects: fallbackProjects, languages: [], totalStars: 0 };
  }

  const real = repos.filter((r) => !r.fork);

  const languages = await fetchLanguageStats(real);

  let projects = real.map(toProject);

  // Ensure curated/private resume projects (e.g. nexus) appear even if private.
  const present = new Set(projects.map((p) => p.name));
  const missing = fallbackProjects.filter((p) => !present.has(p.name));
  projects = [...missing, ...projects];

  // Featured-first: the curated résumé projects (in projectMeta) always win a
  // slot regardless of stars/recency, then classified, then stars, then recency.
  const isFeatured = (p: Project) => p.name in projectMeta;
  projects.sort((a, b) => {
    const fa = isFeatured(a);
    const fb = isFeatured(b);
    if (fa !== fb) return fa ? -1 : 1;
    if (a.classified !== b.classified) return a.classified ? -1 : 1;
    if (b.stars !== a.stars) return b.stars - a.stars;
    return (b.updated ?? "").localeCompare(a.updated ?? "");
  });

  const totalStars = real.reduce((sum, r) => sum + r.stargazers_count, 0);

  return { github: profile, projects: projects.slice(0, 9), languages, totalStars };
}
