"use client";

import { education } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { useReveal } from "@/hooks/useReveal";

export default function Education() {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="education" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <SectionHeading
        index="04"
        command="git log --education"
        title="Education"
        // subtitle="// academic record — National Forensic Sciences University & beyond"
      />

      <div ref={ref} className="relative pl-8 sm:pl-12">
        <div className="absolute left-[11px] top-0 h-full w-px bg-white/10 sm:left-[15px]">
          <div
            className="w-full bg-gradient-to-b from-neon-green via-neon-blue to-neon-purple shadow-neon-green transition-all duration-[1800ms] ease-out"
            style={{ height: visible ? "100%" : "0%" }}
          />
        </div>

        <div className="space-y-10">
          {education.map((item, i) => (
            <Reveal key={i} variant="left" delay={i * 200}>
              <div className="relative">
                <span className="absolute -left-8 top-1.5 grid h-6 w-6 place-items-center rounded-full border border-neon-green/50 bg-bg sm:-left-12">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-neon-green shadow-neon-green" />
                </span>

                <div className="glass holo rounded-lg border border-white/10 p-5 transition-colors hover:border-neon-green/30">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs text-neon-blue">
                      [{item.period}]
                    </span>
                    <span className="rounded border border-neon-green/40 px-2 py-0.5 font-mono text-[10px] text-neon-green">
                      {item.score}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink">
                    {item.institution}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-muted">
                    {item.qualification}
                  </p>
                  <p className="mt-1 font-mono text-xs text-neon-green/70">
                    {item.location}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
