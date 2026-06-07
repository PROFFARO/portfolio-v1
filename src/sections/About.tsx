"use client";

import { profile, type GitHubProfile } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";

const HIGHLIGHTS = [
  { icon: "🛡", label: "Penetration Testing", desc: "Offensive security, ethical hacking & vulnerability analysis" },
  { icon: "🔐", label: "AI Threat Detection", desc: "ML/LLM-driven anomaly detection & adaptive honeypots" },
  { icon: "☁", label: "Cloud & DevOps", desc: "GCP, AWS, Docker & CI/CD for scalable, secure infra" },
  { icon: "⚡", label: "Software Dev", desc: "C/C++, Python, Java, Rust & full-stack engineering" },
];

export default function About({ github }: { github: GitHubProfile | null }) {
  const info = [
    { key: "name", value: github?.name || profile.name },
    { key: "alias", value: github?.login ? `@${github.login}` : profile.handle },
    { key: "role", value: "B.Tech–M.Tech CSE · Cyber Security" },
    { key: "location", value: github?.location || profile.location },
    ...(github
      ? [
          { key: "repos", value: String(github.publicRepos) },
          { key: "network", value: `${github.followers} followers / ${github.following} following` },
        ]
      : []),
  ];

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading index="01" command="cat ./about.me" title="About Me" />

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal variant="left">
          <div className="glass holo rounded-lg border border-neon-green/20">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-neon-green/80" />
              <span className="ml-2 font-mono text-xs text-muted">
                profile.decrypt() — bash
              </span>
            </div>
            <div className="space-y-2 p-5 font-mono text-sm">
              <p className="text-neon-green/80">
                <span className="text-neon-blue">$</span> whoami --verbose
                {github && (
                  <span className="ml-2 text-[10px] text-neon-blue/70">
                    [live · github api]
                  </span>
                )}
              </p>
              {info.map((row) => (
                <div key={row.key} className="flex gap-2">
                  <span className="w-24 shrink-0 text-muted">{row.key}:</span>
                  <ScrambleText text={row.value} className="text-ink" />
                </div>
              ))}
              <p className="pt-3 text-neon-green/80">
                <span className="text-neon-blue">$</span> cat objective.txt
              </p>
              <p className="leading-relaxed text-muted">{profile.objective}</p>
              <p className="pt-2 text-muted">
                <span className="text-neon-blue">$</span>{" "}
                <span className="inline-block h-4 w-2 animate-pulse bg-neon-green align-middle" />
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.label} variant="right" delay={i * 100}>
              <div className="glass holo group h-full rounded-lg border border-white/10 p-5 transition-colors hover:border-neon-green/40">
                <div className="mb-3 text-2xl">{h.icon}</div>
                <h3 className="font-display text-lg font-bold text-ink group-hover:text-neon-green">
                  {h.label}
                </h3>
                <p className="mt-1 font-mono text-xs leading-relaxed text-muted">
                  {h.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
