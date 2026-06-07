"use client";

import { profile } from "@/data/profile";

type IconProps = { className?: string };

const GitHubIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
  </svg>
);

const LinkedInIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const LeetCodeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M16.1 1.6 8.4 9.4a4 4 0 0 0 0 5.6l3.5 3.5a1.4 1.4 0 0 0 2-2l-3.5-3.5a1.2 1.2 0 0 1 0-1.7l7.7-7.7a1.4 1.4 0 0 0-2-2ZM10.6 13.3a1.4 1.4 0 0 0 0 2l1.6 1.5a4.5 4.5 0 0 0 6.3 0l2.6-2.6a1.4 1.4 0 0 0-2-2L16.5 15a1.6 1.6 0 0 1-2.3 0l-1.6-1.6a1.4 1.4 0 0 0-2 0Z" />
    <path d="M6.6 11.2H4.4a1.4 1.4 0 1 0 0 2.9h2.2a1.4 1.4 0 0 0 0-2.9Z" />
  </svg>
);

const MailIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="m3 6 9 6 9-6" />
  </svg>
);

const ICONS = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  leetcode: LeetCodeIcon,
  email: MailIcon,
};

const SOCIALS: { key: keyof typeof ICONS; href: string; label: string }[] = [
  { key: "github", href: profile.links.github, label: "GitHub" },
  { key: "linkedin", href: profile.links.linkedin, label: "LinkedIn" },
  { key: "leetcode", href: profile.links.leetcode, label: "LeetCode" },
  { key: "email", href: profile.links.email, label: "Email" },
];

export default function SocialLinks({
  variant = "row",
  githubUrl,
}: {
  variant?: "row" | "rail";
  githubUrl?: string;
}) {
  const socials = SOCIALS.map((s) =>
    s.key === "github" && githubUrl ? { ...s, href: githubUrl } : s
  );

  if (variant === "rail") {
    return (
      <div className="fixed bottom-0 left-5 z-40 hidden flex-col items-center gap-4 lg:flex">
        {socials.map(({ key, href, label }) => {
          const Icon = ICONS[key];
          return (
            <a
              key={key}
              href={href}
              target={key === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              data-cursor="hover"
              className="group text-muted transition-all duration-300 hover:-translate-y-1 hover:text-neon-green"
            >
              <Icon className="h-5 w-5 transition-[filter] group-hover:drop-shadow-[0_0_6px_#00ff88]" />
            </a>
          );
        })}
        <span className="mt-2 h-20 w-px bg-gradient-to-b from-neon-green/60 to-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {socials.map(({ key, href, label }) => {
        const Icon = ICONS[key];
        return (
          <a
            key={key}
            href={href}
            target={key === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 font-mono text-xs text-muted backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-green/50 hover:text-neon-green hover:shadow-neon-green/30"
          >
            <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span>{label}</span>
          </a>
        );
      })}
    </div>
  );
}
