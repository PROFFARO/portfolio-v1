"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/data/profile";

type Action = {
  id: string;
  label: string;
  hint: string;
  icon: string;
  group: "Navigate" | "Links" | "Actions";
  keywords?: string;
  run: () => void;
};

const SECTIONS: { id: string; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certs", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

function openExternal(url: string) {
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  const goto = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      close();
    },
    [close]
  );

  const actions = useMemo<Action[]>(() => {
    const nav: Action[] = SECTIONS.map((s) => ({
      id: `nav-${s.id}`,
      label: `Go to ${s.label}`,
      hint: "section",
      icon: "→",
      group: "Navigate",
      keywords: s.id,
      run: () => goto(s.id),
    }));

    const links: Action[] = [
      {
        id: "link-github",
        label: "GitHub",
        hint: "github.com/proffaro",
        icon: "◆",
        group: "Links",
        run: () => {
          openExternal(profile.links.github);
          close();
        },
      },
      {
        id: "link-linkedin",
        label: "LinkedIn",
        hint: "linkedin.com/in/proffaro",
        icon: "◆",
        group: "Links",
        run: () => {
          openExternal(profile.links.linkedin);
          close();
        },
      },
      {
        id: "link-leetcode",
        label: "LeetCode",
        hint: "leetcode.com/u/PROFFARO",
        icon: "◆",
        group: "Links",
        run: () => {
          openExternal(profile.links.leetcode);
          close();
        },
      },
      {
        id: "link-resume",
        label: "Open résumé",
        hint: "PDF",
        icon: "▤",
        group: "Links",
        keywords: "cv pdf download",
        run: () => {
          openExternal(profile.resumeUrl);
          close();
        },
      },
    ];

    const acts: Action[] = [
      {
        id: "act-terminal",
        label: "Open terminal",
        hint: "interactive shell",
        icon: "▌",
        group: "Actions",
        keywords: "cli command line console",
        run: () => {
          window.dispatchEvent(new CustomEvent("open-terminal"));
          close();
        },
      },
      {
        id: "act-copy-email",
        label: "Copy email",
        hint: profile.email,
        icon: "✉",
        group: "Actions",
        keywords: "mail contact clipboard",
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => flash("Email copied to clipboard"),
            () => flash("Couldn't copy — " + profile.email)
          );
          close();
        },
      },
      {
        id: "act-konami",
        label: "Konami code hint",
        hint: "↑↑↓↓←→←→ B A",
        icon: "★",
        group: "Actions",
        keywords: "easter egg secret",
        run: () => {
          flash("Try: ↑ ↑ ↓ ↓ ← → ← → B A");
          close();
        },
      },
    ];

    return [...nav, ...links, ...acts];
  }, [goto, close, flash]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) =>
      `${a.label} ${a.hint} ${a.keywords ?? ""} ${a.group}`
        .toLowerCase()
        .includes(q)
    );
  }, [query, actions]);

  // Keep active index in range when the filtered list changes.
  useEffect(() => {
    setActive((i) => Math.min(i, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  // Global toggle: Cmd/Ctrl + K.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset + focus on open.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Scroll the active row into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-idx="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) =>
        filtered.length ? (i - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  return (
    <>
      {/* Toast (works even when palette is closed) */}
      {toast && (
        <div className="fixed bottom-20 right-5 z-[130] rounded-lg border border-neon-green/40 bg-black/90 px-4 py-2 font-mono text-xs text-neon-green shadow-neon-green backdrop-blur">
          {toast}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[115] flex justify-center bg-black/60 px-4 backdrop-blur-sm"
          onMouseDown={close}
        >
          <div
            role="dialog"
            aria-label="Command palette"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="glass mt-[12vh] flex h-fit max-h-[70vh] w-[min(92vw,560px)] flex-col overflow-hidden rounded-xl border border-neon-green/40 font-mono shadow-neon-green"
          >
            {/* Search row */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="text-neon-green">⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                spellCheck={false}
                autoComplete="off"
                aria-label="Search commands"
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent text-sm text-ink caret-neon-green outline-none placeholder:text-muted/60"
              />
              <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] text-muted">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-muted">
                  No matches for &quot;{query}&quot;
                </div>
              ) : (
                groupOrder
                  .filter((g) => filtered.some((a) => a.group === g))
                  .map((g) => (
                    <div key={g} className="mb-1">
                      <div className="px-4 py-1 text-[10px] uppercase tracking-widest text-muted/60">
                        {g}
                      </div>
                      {filtered
                        .filter((a) => a.group === g)
                        .map((a) => {
                          const idx = filtered.indexOf(a);
                          const isActive = idx === active;
                          return (
                            <button
                              key={a.id}
                              data-idx={idx}
                              data-cursor="hover"
                              onMouseEnter={() => setActive(idx)}
                              onClick={a.run}
                              className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                                isActive
                                  ? "bg-neon-green/10 text-neon-green"
                                  : "text-ink hover:bg-white/5"
                              }`}
                            >
                              <span
                                className={`w-4 text-center ${
                                  isActive ? "text-neon-green" : "text-muted"
                                }`}
                              >
                                {a.icon}
                              </span>
                              <span className="flex-1">{a.label}</span>
                              <span className="truncate text-[11px] text-muted">
                                {a.hint}
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  ))
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[10px] text-muted">
              <span>
                <span className="text-neon-green">↑↓</span> navigate ·{" "}
                <span className="text-neon-green">↵</span> select
              </span>
              <span>
                <span className="text-neon-green">⌘K</span> /{" "}
                <span className="text-neon-green">Ctrl K</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const groupOrder: Action["group"][] = ["Navigate", "Links", "Actions"];
