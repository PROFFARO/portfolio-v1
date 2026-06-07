/**
 * Static facts that genuinely cannot live on GitHub (education, certifications,
 * achievements, phone) — sourced 1:1 from Dayananda's real resume.
 * Everything that CAN come from GitHub (name, bio, avatar, stats, repos,
 * language usage) is fetched live in src/lib/github.ts.
 */

export const profile = {
  // Fallbacks only — overridden by live GitHub profile when available.
  name: "Dayananda Bindhani",
  handle: "PROFFARO",
  username: "proffaro",
  // Real roles taken from the resume objective/skills (no invented titles).
  roles: [
    "Cyber Security Student",
    "Software Developer",
    "Penetration Tester",
    "AI Threat-Detection Dev",
    "Cloud & DevOps Enthusiast",
  ],
  objective:
    "B.Tech–M.Tech CSE student specializing in Cyber Security and Software Development. Aiming to leverage expertise in AI-driven threat detection, penetration testing, and vulnerability analysis to fortify enterprise infrastructure — architecting scalable systems and automating infrastructure security with modern cloud and DevOps technologies.",
  location: "Delhi, India",
  email: "dayabindhani2005@gmail.com",
  resumeUrl: "/Dayananda_Resume.pdf",
  links: {
    github: "https://github.com/proffaro",
    linkedin: "https://linkedin.com/in/proffaro",
    leetcode: "https://leetcode.com/u/PROFFARO",
    email: "mailto:dayabindhani2005@gmail.com",
  },
};

/** Skill groups from the resume. NOTE: no fabricated proficiency percentages.
 *  Live language proportions come from the GitHub API instead. */
export const skillGroups: { category: string; icon: string; items: string[] }[] = [
  {
    category: "Programming Languages",
    icon: "</>",
    items: ["C / C++", "Python", "Java", "Rust", "Bash", "C#", "SQL", "JavaScript", "HTML / CSS"],
  },
  {
    category: "Cyber Security & Networking",
    icon: "[#]",
    items: ["Kali Linux", "Metasploit", "Burp Suite", "Wireshark", "Nmap", "Vulnerability Assessment", "Pentesting"],
  },
  {
    category: "Cloud, DevOps & Databases",
    icon: "{ }",
    items: ["GCP", "AWS", "Docker", "CI / CD", "Nginx", "MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Frameworks & Core Concepts",
    icon: "AI",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "System Administration", "Data Structures & Algorithms"],
  },
];

export type Education = {
  period: string;
  institution: string;
  qualification: string;
  score: string;
  location: string;
};

export const education: Education[] = [
  {
    period: "2022 — 2027",
    institution: "National Forensic Sciences University (LNJN NICFS)",
    qualification: "B.Tech – M.Tech (CSE), specializing in Cyber Security",
    score: "CGPA: 9.40 / 10",
    location: "Delhi, India",
  },
  {
    period: "2020 — 2022",
    institution: "Prayash Higher Secondary School",
    qualification: "Senior Secondary (XII), CHSE",
    score: "90.00%",
    location: "Odisha, India",
  },
  {
    period: "2019 — 2020",
    institution: "Saraswati Vidya Mandir",
    qualification: "Secondary (X), BSE",
    score: "81.16%",
    location: "Odisha, India",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  detail: string;
};

export const certifications: Certification[] = [
  {
    title: "Ethical Hacking 101: Beginner's Guide to Ethical Hacking",
    issuer: "Simplilearn SkillUp",
    date: "Mar 2026",
    detail: "Mastered core ethical-hacking methodologies and techniques.",
  },
  {
    title: "HackFest 2025 — 24-Hour Global Hackathon",
    issuer: "GDG Cloud New Delhi & Agora",
    date: "Nov 2025",
    detail: "24-hour global online hackathon — rapid problem-solving & technical collaboration.",
  },
  {
    title: "Web Application Development",
    issuer: "Acmegrade",
    date: "Sep — Oct 2024",
    detail: "Built & deployed a full-stack E-Kart app (HTML/CSS/JS/PHP) with XAMPP and User Access Control.",
  },
  {
    title: "Data Science With Python",
    issuer: "Upgrad Campus",
    date: "Dec 2022",
    detail: "Data cleaning, manipulation and Exploratory Data Analysis for predictive modeling.",
  },
];

export const achievements: { rank: string; title: string }[] = [
  { rank: "1st Place", title: "Smart India Hackathon (Internal College Selection)" },
  { rank: "3rd Place", title: "Digital Crime Scene Investigation" },
  { rank: "Competitor", title: "Table Tennis (College Tournament)" },
  { rank: "Participant", title: "Collegiate Group Discussions (GD)" },
];

/** Enrichment for specific GitHub repos — real resume context layered on top of
 *  live API data (display name, richer description, period). NOT fabricated. */
export const projectMeta: Record<
  string,
  { display: string; description: string; period: string; classified?: boolean }
> = {
  nexus: {
    display: "Nexus — AI-Driven Adaptive Honeypot",
    description:
      "Next-gen honeypot using AI & LLMs to deploy realistic service emulations (FTP, SSH, MySQL), with real-time anomaly detection, full session recording, Chain-of-Custody logging, and a web dashboard for live monitoring.",
    period: "Aug 2025 — Jan 2026",
    classified: false,
  },
  "web-scrapper-python": {
    display: "Web Scraping Tool",
    description:
      "Multi-page crawler that extracts text across interconnected webpages, with a selective HTML parser and regex-based email/phone extraction, persisting structured output to local directories.",
    period: "Jul — Aug 2023",
    classified: false,
  },
  "text-encryption-decryption": {
    display: "Encryption / Decryption Tool",
    description:
      "Custom letter-shuffle positional encryption for text obfuscation, hardened with cryptographic hashing, a configurable Caesar cipher, and a Playfair cipher.",
    period: "Apr — Jun 2023",
    classified: false,
  },
};

export type Project = {
  name: string;
  display: string;
  description: string;
  tags: string[];
  language: string;
  stars: number;
  forks: number;
  url: string;
  demo?: string;
  status: "ACTIVE" | "PRIVATE" | "ARCHIVED";
  classified?: boolean;
  period?: string;
  updated?: string;
};

/** Used only if the GitHub API is unreachable. Mirrors the 3 resume projects. */
export const fallbackProjects: Project[] = [
  {
    name: "nexus",
    display: projectMeta.nexus.display,
    description: projectMeta.nexus.description,
    tags: ["Python", "Docker", "Machine Learning", "Threat Detection"],
    language: "Python",
    stars: 0,
    forks: 0,
    url: "https://github.com/proffaro/nexus",
    status: "ACTIVE",
    classified: false,
    period: projectMeta.nexus.period,
  },
  {
    name: "web-scrapper-python",
    display: projectMeta["web-scrapper-python"].display,
    description: projectMeta["web-scrapper-python"].description,
    tags: ["Python", "Web Crawler", "Regex"],
    language: "Python",
    stars: 0,
    forks: 0,
    url: "https://github.com/proffaro/web-scrapper-python",
    status: "ACTIVE",
    period: projectMeta["web-scrapper-python"].period,
  },
  {
    name: "text-encryption-decryption",
    display: projectMeta["text-encryption-decryption"].display,
    description: projectMeta["text-encryption-decryption"].description,
    tags: ["Python", "Cryptography", "Security Algorithms"],
    language: "Python",
    stars: 1,
    forks: 0,
    url: "https://github.com/proffaro/text-encryption-decryption",
    status: "ACTIVE",
    period: projectMeta["text-encryption-decryption"].period,
  },
];

export type GitHubProfile = {
  name: string;
  login: string;
  bio: string;
  avatarUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  location: string | null;
  htmlUrl: string;
  blog: string | null;
};

export type LanguageStat = { name: string; bytes: number; percent: number };

export type SiteData = {
  github: GitHubProfile | null;
  projects: Project[];
  languages: LanguageStat[];
  totalStars: number;
};
