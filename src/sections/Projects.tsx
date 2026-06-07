"use client";

import { type Project } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

const statusColor: Record<string, string> = {
  ACTIVE: "text-neon-green border-neon-green/40 bg-neon-green/5",
  PRIVATE: "text-neon-purple border-neon-purple/40 bg-neon-purple/5",
  ARCHIVED: "text-muted border-white/20 bg-white/5",
};

function ProjectCard({ p }: { p: Project }) {
  return (
    <TiltCard className="group h-full" max={9}>
      <article className="glass holo relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 p-5 transition-all duration-300 group-hover:border-neon-green/50 group-hover:shadow-neon-green/20">
        {/* header */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold capitalize text-ink">
            {p.display}
          </h3>
          <span
            className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] ${statusColor[p.status]}`}
          >
            {p.status}
          </span>
        </div>

        {p.period && (
          <p className="mb-2 font-mono text-[10px] text-neon-blue/80">{p.period}</p>
        )}

        <p className="mb-4 flex-1 font-mono text-xs leading-relaxed text-muted">
          {p.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs text-muted">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-neon-blue" />
              {p.language}
            </span>
            <span>★ {p.stars}</span>
            <span>⑂ {p.forks}</span>
          </span>
        </div>

        {/* hover popup micro-interaction */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/92 p-5 text-center opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neon-green">
            {p.classified ? ">> classified // private repo" : ">> access repository"}
          </span>
          <h4 className="font-display text-lg font-bold capitalize text-ink">
            {p.display}
          </h4>
          <p className="line-clamp-3 font-mono text-[11px] text-muted">
            {p.description}
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-md border border-neon-green/50 bg-neon-green/10 px-4 py-2 font-mono text-xs text-neon-green transition-all hover:-translate-y-0.5 hover:shadow-neon-green"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
              </svg>
              {p.classified ? "view profile↗" : "view on github↗"}
            </a>
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-1 rounded-md border border-neon-blue/50 bg-neon-blue/10 px-4 py-2 font-mono text-xs text-neon-blue transition-all hover:-translate-y-0.5 hover:shadow-neon-blue"
              >
                live demo↗
              </a>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        index="03"
        command="ls -la ./projects"
        title="Projects Showcase"
        // subtitle="// live repositories pulled from github.com/proffaro — hover to access"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.name} variant="up" delay={(i % 3) * 100}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 text-center">
        <a
          href="https://github.com/proffaro?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-muted underline-offset-4 transition-colors hover:text-neon-green hover:underline"
          data-cursor="hover"
        >
          {">"} view all repositories on github →
        </a>
      </Reveal>
    </section>
  );
}
