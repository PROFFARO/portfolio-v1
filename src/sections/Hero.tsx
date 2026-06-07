"use client";

import Image from "next/image";
import { profile, type GitHubProfile } from "@/data/profile";
import ParticleNetwork from "@/components/ParticleNetwork";
import MagneticButton from "@/components/MagneticButton";
import SocialLinks from "@/components/SocialLinks";

export default function Hero({
  github,
  totalStars,
}: {
  github: GitHubProfile | null;
  totalStars: number;
}) {
  const name = github?.name || profile.name;
  const bio = github?.bio || profile.objective;

  const stats = [
    { label: "repos", value: github?.publicRepos ?? "—" },
    { label: "followers", value: github?.followers ?? "—" },
    { label: "stars", value: totalStars },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-16 pt-24"
    >
      <ParticleNetwork />
      <div className="bg-radial-fade pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {github?.avatarUrl && (
          <div className="mx-auto mb-6 h-24 w-24 sm:h-28 sm:w-28">
            <div className="relative h-full w-full rounded-full p-[2px] shadow-neon-green/40 [background:conic-gradient(from_0deg,var(--neon-green),var(--neon-blue),var(--neon-purple),var(--neon-green))]">
              <Image
                src={github.avatarUrl}
                alt={name}
                width={112}
                height={112}
                priority
                className="h-full w-full rounded-full border-2 border-bg object-cover"
              />
              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-bg bg-neon-green" />
            </div>
          </div>
        )}

        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/5 px-4 py-1.5 font-mono text-xs text-neon-green">
          <span className="h-2 w-2 animate-pulse rounded-full bg-neon-green shadow-neon-green" />
          [ STATUS: ACTIVE ] — open to opportunities
        </p>

        <h1 className="mt-2 font-display text-4xl font-black leading-tight sm:text-6xl md:text-7xl">
          <span className="glitch text-ink" data-text={name}>
            {name}
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl font-mono text-sm leading-relaxed text-muted sm:text-base">
          {bio}
        </p>

        {/* live GitHub stats */}
        <div className="mx-auto mt-8 flex max-w-md items-stretch justify-center divide-x divide-white/10 rounded-lg border border-white/10 bg-white/[0.02]">
          {stats.map((s) => (
            <div key={s.label} className="flex-1 px-4 py-3">
              <div className="font-display text-xl font-bold text-neon-green sm:text-2xl">
                {s.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="#projects" variant="primary">
            {">"} view_projects()
          </MagneticButton>
          <MagneticButton href={profile.resumeUrl} variant="ghost" target="_blank">
            ↓ download_resume
          </MagneticButton>
        </div>

        <div className="mt-9">
          <SocialLinks githubUrl={github?.htmlUrl} />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce font-mono text-xs text-muted">
        ↓ scroll
      </div>
    </section>
  );
}
