"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  profile,
  skillGroups,
  education,
  certifications,
  achievements,
  fallbackProjects,
  type Project,
  type SiteData,
} from "@/data/profile";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Line = { id: number; type: "input" | "output"; node: ReactNode };

type CommandCtx = {
  data: SiteData;
  args: string[];
  raw: string;
  print: (node: ReactNode) => void;
  clear: () => void;
  close: () => void;
  goto: (id: string) => void;
};

type Command = {
  desc: string;
  usage?: string;
  hidden?: boolean;
  /** Return a ReactNode to print, or void to print nothing extra. */
  run: (ctx: CommandCtx) => ReactNode | void;
};

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "projects",
  "education",
  "certs",
  "contact",
] as const;

/* ------------------------------------------------------------------ */
/*  Tiny presentational helpers (themed output blocks)                */
/* ------------------------------------------------------------------ */

function Green({ children }: { children: ReactNode }) {
  return <span className="text-neon-green">{children}</span>;
}
function Blue({ children }: { children: ReactNode }) {
  return <span className="text-neon-blue">{children}</span>;
}
function Purple({ children }: { children: ReactNode }) {
  return <span className="text-neon-purple">{children}</span>;
}
function Muted({ children }: { children: ReactNode }) {
  return <span className="text-muted">{children}</span>;
}
function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      className="break-all text-neon-blue underline decoration-neon-blue/40 underline-offset-2 hover:text-neon-green"
    >
      {children}
    </a>
  );
}

const PROFFARO_ART = `
 ___  ___  ___  ___ ___ ___  ___  ___
| _ \\| _ \\/ _ \\| __| __/ _ \\| _ \\/ _ \\
|  _/|   / (_) | _|| _| (_) |   / (_) |
|_|  |_|_\\\\___/|_| |_| \\___/|_|_\\\\___/
`;

/* ------------------------------------------------------------------ */
/*  Command registry                                                  */
/* ------------------------------------------------------------------ */

const COMMANDS: Record<string, Command> = {
  help: {
    desc: "List all available commands",
    run: () => {
      const entries = Object.entries(COMMANDS).filter(([, c]) => !c.hidden);
      return (
        <div className="space-y-2">
          <div className="text-muted">
            Available commands — type a name and hit{" "}
            <Green>Enter</Green>.
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
            {entries.map(([name, c]) => (
              <div key={name} className="flex gap-2">
                <span className="w-28 shrink-0 text-neon-green">
                  {c.usage || name}
                </span>
                <span className="text-muted">{c.desc}</span>
              </div>
            ))}
          </div>
          <div className="pt-1 text-muted">
            Tips: <Green>↑/↓</Green> recall history · <Green>Tab</Green>{" "}
            autocompletes · <Green>goto contact</Green> jumps to a section ·{" "}
            <Green>clear</Green> wipes the screen.
          </div>
        </div>
      );
    },
  },

  whoami: {
    desc: "Who is Dayananda? (about)",
    run: ({ data }) => {
      const name = data.github?.name || profile.name;
      return (
        <div className="space-y-1">
          <div>
            <Green>{name}</Green>{" "}
            <Muted>
              (@{data.github?.login || profile.username})
            </Muted>
          </div>
          <div className="text-muted">{profile.roles.join(" · ")}</div>
          <div>
            <Blue>location</Blue> {data.github?.location || profile.location}
          </div>
          <div className="max-w-2xl pt-1 leading-relaxed text-ink/90">
            {profile.objective}
          </div>
        </div>
      );
    },
  },

  skills: {
    desc: "Tech stack & security tooling",
    run: () => (
      <div className="space-y-2">
        {skillGroups.map((g) => (
          <div key={g.category}>
            <div className="text-neon-green">
              {g.icon} {g.category}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="rounded border border-neon-green/30 bg-neon-green/5 px-1.5 py-0.5 text-[11px] text-neon-green/90"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },

  projects: {
    desc: "Featured repositories (live)",
    usage: "projects [n]",
    run: ({ data, args }) => {
      const list: Project[] =
        data.projects && data.projects.length ? data.projects : fallbackProjects;

      // `projects 2` -> detail view for a single project.
      if (args[0]) {
        const idx = parseInt(args[0], 10) - 1;
        const p = list[idx];
        if (!p) return <Muted>No project #{args[0]}. Try just `projects`.</Muted>;
        return (
          <div className="space-y-1">
            <div className="text-neon-green">{p.display}</div>
            <div className="text-ink/90">{p.description}</div>
            <div className="text-muted">
              {p.language} · ⭐ {p.stars} · {p.status}
              {p.period ? ` · ${p.period}` : ""}
            </div>
            {p.tags?.length ? (
              <div className="text-muted">tags: {p.tags.join(", ")}</div>
            ) : null}
            <div>
              <Link href={p.url}>{p.url}</Link>
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-2">
          <Muted>
            {list.length} projects — run <Green>projects 1</Green> for details.
          </Muted>
          {list.map((p, i) => (
            <div key={p.name} className="flex flex-col">
              <div>
                <span className="text-neon-green">{i + 1}.</span>{" "}
                <span className="text-ink">{p.display}</span>{" "}
                <Muted>
                  ({p.language} · ⭐{p.stars})
                </Muted>
              </div>
              <div className="pl-5 text-muted">
                <Link href={p.url}>{p.url}</Link>
              </div>
            </div>
          ))}
        </div>
      );
    },
  },

  github: {
    desc: "Live GitHub stats",
    run: ({ data }) => {
      const g = data.github;
      if (!g) {
        return (
          <Muted>
            GitHub API unavailable right now. Profile:{" "}
            <Link href={profile.links.github}>{profile.links.github}</Link>
          </Muted>
        );
      }
      return (
        <div className="space-y-1">
          <div>
            <Green>{g.name}</Green> <Muted>@{g.login}</Muted>
          </div>
          {g.bio ? <div className="text-ink/90">{g.bio}</div> : null}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-muted">
            <span>
              <Blue>repos</Blue> {g.publicRepos}
            </span>
            <span>
              <Blue>followers</Blue> {g.followers}
            </span>
            <span>
              <Blue>following</Blue> {g.following}
            </span>
            <span>
              <Blue>total ⭐</Blue> {data.totalStars}
            </span>
          </div>
          <div>
            <Link href={g.htmlUrl}>{g.htmlUrl}</Link>
          </div>
        </div>
      );
    },
  },

  languages: {
    desc: "Most-used languages (live %)",
    run: ({ data }) => {
      const langs = data.languages || [];
      if (!langs.length) return <Muted>No language data available.</Muted>;
      return (
        <div className="space-y-1">
          {langs.map((l) => {
            const filled = Math.max(1, Math.round(l.percent / 5)); // 20-cell bar
            const bar = "█".repeat(filled) + "░".repeat(Math.max(0, 20 - filled));
            return (
              <div key={l.name} className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-ink">{l.name}</span>
                <span className="text-neon-green">{bar}</span>
                <span className="text-muted">{l.percent.toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      );
    },
  },

  education: {
    desc: "Academic background",
    run: () => (
      <div className="space-y-2">
        {education.map((e) => (
          <div key={e.institution}>
            <div className="text-neon-green">{e.qualification}</div>
            <div className="text-ink/90">{e.institution}</div>
            <div className="text-muted">
              {e.period} · {e.score} · {e.location}
            </div>
          </div>
        ))}
      </div>
    ),
  },

  certs: {
    desc: "Certifications & training",
    run: () => (
      <div className="space-y-2">
        {certifications.map((c) => (
          <div key={c.title}>
            <div className="text-neon-green">{c.title}</div>
            <div className="text-muted">
              {c.issuer} · {c.date}
            </div>
            <div className="text-ink/90">{c.detail}</div>
          </div>
        ))}
      </div>
    ),
  },

  achievements: {
    desc: "Awards & competitions",
    run: () => (
      <div className="space-y-1">
        {achievements.map((a) => (
          <div key={a.title}>
            <Green>{a.rank}</Green> <span className="text-ink/90">{a.title}</span>
          </div>
        ))}
      </div>
    ),
  },

  contact: {
    desc: "How to reach me",
    run: () => (
      <div className="space-y-1">
        <div>
          <Blue>email</Blue>{" "}
          <Link href={profile.links.email}>{profile.email}</Link>
        </div>
        <div>
          <Blue>github</Blue>{" "}
          <Link href={profile.links.github}>{profile.links.github}</Link>
        </div>
        <div>
          <Blue>linkedin</Blue>{" "}
          <Link href={profile.links.linkedin}>{profile.links.linkedin}</Link>
        </div>
        <div>
          <Blue>leetcode</Blue>{" "}
          <Link href={profile.links.leetcode}>{profile.links.leetcode}</Link>
        </div>
      </div>
    ),
  },

  resume: {
    desc: "Open my résumé (PDF)",
    run: () => {
      if (typeof window !== "undefined") {
        window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
      }
      return (
        <Muted>
          Opening résumé… if blocked,{" "}
          <Link href={profile.resumeUrl}>click here</Link>.
        </Muted>
      );
    },
  },

  social: {
    desc: "Social links",
    run: () => (
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        <Link href={profile.links.github}>github</Link>
        <Link href={profile.links.linkedin}>linkedin</Link>
        <Link href={profile.links.leetcode}>leetcode</Link>
        <Link href={profile.links.email}>email</Link>
      </div>
    ),
  },

  goto: {
    desc: "Scroll to a section",
    usage: "goto <section>",
    run: ({ args, goto, close }) => {
      const target = (args[0] || "").toLowerCase();
      if (!target || !SECTION_IDS.includes(target as (typeof SECTION_IDS)[number])) {
        return (
          <Muted>
            Usage: <Green>goto &lt;section&gt;</Green> — one of:{" "}
            {SECTION_IDS.join(", ")}
          </Muted>
        );
      }
      goto(target);
      close();
    },
  },

  clear: {
    desc: "Clear the terminal",
    run: ({ clear }) => {
      clear();
    },
  },

  echo: {
    desc: "Print text",
    usage: "echo <text>",
    run: ({ args }) => <span className="text-ink/90">{args.join(" ")}</span>,
  },

  banner: {
    desc: "Show the PROFFARO banner",
    run: () => (
      <div>
        <pre className="whitespace-pre text-[10px] leading-tight text-neon-green text-glow sm:text-xs">
          {PROFFARO_ART}
        </pre>
        <div className="text-muted">
          {profile.name} — type <Green>help</Green> to explore.
        </div>
      </div>
    ),
  },

  history: {
    desc: "Show command history",
    run: ({ data }) => {
      void data;
      return null; // replaced at runtime (needs live history) — see runCommand
    },
  },

  date: {
    desc: "Current date & time",
    run: () => <span className="text-ink/90">{new Date().toString()}</span>,
  },

  sudo: {
    desc: "Elevate privileges",
    hidden: true,
    run: ({ args }) => (
      <span className="text-neon-purple">
        [sudo] password for visitor: <br />
        Nice try 😏 — {args.join(" ") || "that"} requires root. This incident
        will be reported.
      </span>
    ),
  },

  hack: {
    desc: "Initiate the hack",
    hidden: true,
    run: () => (
      <div className="space-y-0.5 text-neon-green">
        <div>{"> bypassing firewall [████████] 100%"}</div>
        <div>{"> ACCESS GRANTED"}</div>
        <Muted>
          psst… there&apos;s a real easter egg. Try the Konami code:{" "}
          <Green>↑↑↓↓←→←→ B A</Green>
        </Muted>
      </div>
    ),
  },

  matrix: {
    desc: "Follow the white rabbit",
    hidden: true,
    run: () => (
      <span className="text-neon-green">Wake up, Neo… 🐇 (the code is all around you)</span>
    ),
  },

  exit: {
    desc: "Close the terminal",
    run: ({ close }) => {
      close();
    },
  },
};

// Aliases -> canonical command name.
const ALIASES: Record<string, string> = {
  about: "whoami",
  stats: "github",
  langs: "languages",
  edu: "education",
  certifications: "certs",
  open: "goto",
  cls: "clear",
  quit: "exit",
  close: "exit",
};

const COMMAND_NAMES = [
  ...Object.keys(COMMANDS),
  ...Object.keys(ALIASES),
].sort();

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Terminal({ data }: { data: SiteData }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [welcomed, setWelcomed] = useState(false);

  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const nextId = () => ++idRef.current;

  const print = useCallback((node: ReactNode, type: Line["type"] = "output") => {
    setLines((prev) => [...prev, { id: nextId(), type, node }]);
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const goto = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Welcome banner on first open.
  useEffect(() => {
    if (open && !welcomed) {
      setWelcomed(true);
      print(
        <div className="space-y-1">
          <pre className="whitespace-pre text-[10px] leading-tight text-neon-green text-glow sm:text-xs">
            {PROFFARO_ART}
          </pre>
          <div className="text-muted">
            Welcome to <Green>{profile.name}</Green>&apos;s portfolio shell.
            Type <Green>help</Green> to list commands, or try{" "}
            <Green>whoami</Green>, <Green>projects</Green>,{" "}
            <Green>github</Green>.
          </div>
        </div>
      );
    }
  }, [open, welcomed, print]);

  // Autoscroll to bottom on new output.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  // Focus input when opened.
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Global shortcut: Ctrl+` toggles. Esc closes. (Ctrl+K is reserved for the command palette.)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Allow other components (e.g. the command palette) to open the terminal.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-terminal", onOpen);
    return () => window.removeEventListener("open-terminal", onOpen);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      // Echo the prompt + entered command.
      print(
        <div>
          <span className="text-neon-green">visitor@proffaro</span>
          <span className="text-muted">:~$</span> {trimmed}
        </div>,
        "input"
      );

      if (!trimmed) return;

      setCmdHistory((prev) => [...prev, trimmed]);

      const [nameRaw, ...args] = trimmed.split(/\s+/);
      const name = nameRaw.toLowerCase();
      const canonical = ALIASES[name] || name;
      const cmd = COMMANDS[canonical];

      if (!cmd) {
        print(
          <span className="text-neon-purple">
            command not found: {name} — type <Green>help</Green>
          </span>
        );
        return;
      }

      // `history` needs live state, handle here.
      if (canonical === "history") {
        print(
          cmdHistory.length ? (
            <div className="space-y-0.5">
              {cmdHistory.map((h, i) => (
                <div key={i}>
                  <Muted>{i + 1}</Muted> {h}
                </div>
              ))}
            </div>
          ) : (
            <Muted>No history yet.</Muted>
          )
        );
        return;
      }

      const result = cmd.run({
        data,
        args,
        raw: trimmed,
        print,
        clear,
        close: () => setOpen(false),
        goto,
      });
      if (result !== undefined && result !== null) print(result);
    },
    [print, clear, goto, data, cmdHistory]
  );

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      setHistIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const idx =
        histIndex === -1 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(idx);
      setInput(cmdHistory[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === -1) return;
      const idx = histIndex + 1;
      if (idx >= cmdHistory.length) {
        setHistIndex(-1);
        setInput("");
      } else {
        setHistIndex(idx);
        setInput(cmdHistory[idx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const frag = input.trim().toLowerCase();
      if (!frag) return;
      const matches = COMMAND_NAMES.filter((c) => c.startsWith(frag));
      if (matches.length === 1) {
        setInput(matches[0] + " ");
      } else if (matches.length > 1) {
        // complete to the longest common prefix, and list options
        const lcp = longestCommonPrefix(matches);
        if (lcp.length > frag.length) setInput(lcp);
        print(
          <div className="flex flex-wrap gap-x-4 text-muted">
            {matches.map((m) => (
              <span key={m} className="text-neon-green">
                {m}
              </span>
            ))}
          </div>
        );
      }
    }
  };

  const promptPrefix = useMemo(
    () => (
      <>
        <span className="text-neon-green">visitor@proffaro</span>
        <span className="text-muted">:~$</span>
      </>
    ),
    []
  );

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open terminal"
          data-cursor="hover"
          className="group fixed bottom-5 right-5 z-[100] grid h-12 w-12 place-items-center rounded-full border border-neon-green/40 bg-black/70 font-mono text-neon-green shadow-neon-green backdrop-blur transition-all hover:scale-110 hover:border-neon-green"
        >
          <span className="text-sm font-bold">&gt;_</span>
          <span className="pointer-events-none absolute inset-0 animate-ping rounded-full border border-neon-green/30 [animation-duration:2.5s]" />
        </button>
      )}

      {/* Window */}
      {open && (
        <div
          role="dialog"
          aria-label="Portfolio terminal"
          onMouseDown={() => inputRef.current?.focus()}
          className="fixed inset-x-3 bottom-3 z-[110] flex h-[68dvh] max-h-[600px] flex-col overflow-hidden rounded-xl border border-neon-green/40 bg-black/95 font-mono text-[13px] shadow-neon-green backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[min(70vh,460px)] sm:w-[min(92vw,640px)]"
        >
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 text-xs text-muted">
                proffaro@portfolio: ~
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close terminal"
              data-cursor="hover"
              className="grid h-7 w-7 place-items-center rounded text-muted transition-colors hover:bg-white/10 hover:text-neon-green"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollback */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-2 overflow-y-auto px-4 py-3 leading-relaxed"
          >
            {lines.map((l) => (
              <div key={l.id}>{l.node}</div>
            ))}

            {/* Live prompt row */}
            <div className="flex items-center gap-2">
              {promptPrefix}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onInputKey}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal input"
                className="flex-1 bg-transparent text-ink caret-neon-green outline-none placeholder:text-muted/50"
                placeholder="type a command…  (try: help)"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  utils                                                             */
/* ------------------------------------------------------------------ */

function longestCommonPrefix(words: string[]): string {
  if (!words.length) return "";
  let prefix = words[0];
  for (const w of words) {
    while (!w.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}
