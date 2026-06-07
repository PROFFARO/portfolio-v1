"use client";

import { certifications, achievements } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

export default function Certifications() {
  return (
    <section id="certs" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        index="05"
        command="./verify --credentials"
        title="Certifications & Training"
        // subtitle="// verified competency tracks and hands-on training"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal key={c.title} variant="scale" delay={i * 90}>
            <TiltCard className="h-full" max={7}>
              <div className="glass holo flex h-full gap-4 rounded-lg border border-white/10 p-5 transition-colors hover:border-neon-green/40">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-neon-green/50 bg-neon-green/5 text-xl text-neon-green shadow-neon-green/30">
                  🛡
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold leading-snug text-ink">
                      {c.title}
                    </h3>
                  </div>
                  <p className="mt-1 font-mono text-xs text-neon-green/80">
                    {c.issuer} · <span className="text-neon-blue">{c.date}</span>
                  </p>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
                    {c.detail}
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Achievements */}
      <Reveal className="mt-14">
        <h3 className="mb-6 text-center font-mono text-sm uppercase tracking-widest text-neon-green/80">
          {"// achievements.log"}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => (
            <Reveal key={a.title} variant="up" delay={i * 80}>
              <div className="glass h-full rounded-lg border border-white/10 p-4 text-center transition-colors hover:border-neon-purple/40">
                <div className="font-display text-sm font-bold text-neon-purple">
                  {a.rank}
                </div>
                <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
                  {a.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
