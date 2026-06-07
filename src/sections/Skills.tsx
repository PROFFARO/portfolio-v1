"use client";

import { skillGroups, type LanguageStat } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { useReveal } from "@/hooks/useReveal";

function LangBar({ stat, delay }: { stat: LanguageStat; delay: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="mb-1 flex items-center justify-between font-mono text-xs">
        <span className="text-ink">{stat.name}</span>
        <span className="text-neon-green">{stat.percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-neon-green via-neon-blue to-neon-green shadow-neon-green transition-all duration-1000 ease-out"
          style={{ width: visible ? `${stat.percent}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

export default function Skills({ languages }: { languages: LanguageStat[] }) {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        index="02"
        command="./skills.decrypt()"
        title="Skills & Arsenal"
        // subtitle="// language usage pulled live from GitHub — tooling sourced from résumé"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Live language breakdown */}
        <Reveal variant="left" className="lg:col-span-2">
          <div className="glass holo h-full rounded-lg border border-neon-blue/20 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink">
                Language Usage
              </h3>
              <span className="font-mono text-[10px] text-neon-blue/80">
                [live · github]
              </span>
            </div>
            {languages.length ? (
              <div className="space-y-4">
                {languages.map((l, i) => (
                  <LangBar key={l.name} stat={l} delay={i * 80} />
                ))}
              </div>
            ) : (
              <p className="font-mono text-xs text-muted">
                Language stats unavailable (API rate-limited). Tooling below is
                sourced from the résumé.
              </p>
            )}
            <p className="mt-5 border-t border-white/10 pt-3 font-mono text-[10px] text-muted">
              * computed from public-repo byte counts, recalculated hourly.
            </p>
          </div>
        </Reveal>

        {/* Real skill categories — chips, no fabricated levels */}
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.category} variant="scale" delay={gi * 80}>
              <div className="glass holo h-full rounded-lg border border-white/10 p-5 transition-colors hover:border-neon-green/30">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded border border-neon-green/30 bg-neon-green/5 font-mono text-xs text-neon-green">
                    {group.icon}
                  </span>
                  <h3 className="font-display text-base font-bold text-ink">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-green/50 hover:text-neon-green hover:shadow-neon-green/20"
                      data-cursor="hover"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
