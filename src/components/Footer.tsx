import { profile, type GitHubProfile } from "@/data/profile";

export default function Footer({ github }: { github: GitHubProfile | null }) {
  const name = github?.name || profile.name;
  return (
    <footer className="relative border-t border-white/10 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-xs text-muted sm:flex-row">
        <p>
          <span className="text-neon-green">©</span> {name}
        </p>
        <p className="flex items-center gap-1.5 text-[11px] text-muted/70">
          <span className="text-neon-purple/80">psst</span>
          <span className="opacity-60">— try the konami code:</span>
          <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 tracking-widest text-neon-green/90">
            ↑↑↓↓←→←→ B A
          </kbd>
        </p>
        <p className="flex items-center gap-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-neon-green" />
          all systems operational
        </p>
      </div>
    </footer>
  );
}
