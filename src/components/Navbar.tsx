"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certs", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 ${
          scrolled ? "glass rounded-full py-2 shadow-neon-green/10" : ""
        } transition-all duration-300`}
        style={scrolled ? { width: "min(94%, 72rem)" } : {}}
      >
        <button
          onClick={() => go("home")}
          className="font-display text-lg font-bold tracking-widest text-neon-green text-glow"
          data-cursor="hover"
        >
          {"<PROFFARO/>"}
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => go(s.id)}
                data-cursor="hover"
                className={`group relative px-3 py-1.5 font-mono text-sm transition-colors ${
                  active === s.id ? "text-neon-green" : "text-muted hover:text-ink"
                }`}
              >
                {s.label}
                <span
                  className={`absolute inset-x-2 -bottom-0.5 h-px bg-neon-green transition-all duration-300 ${
                    active === s.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(true)}
          className={`relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden ${
            open ? "pointer-events-none opacity-0" : "opacity-100"
          } transition-opacity duration-200`}
          aria-label="Open menu"
          aria-expanded={open}
          data-cursor="hover"
        >
          <span className="h-0.5 w-6 bg-neon-green" />
          <span className="h-0.5 w-6 bg-neon-green" />
          <span className="h-0.5 w-6 bg-neon-green" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-bg/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Dedicated close button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          data-cursor="hover"
          className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-neon-green/40 bg-neon-green/5 text-neon-green transition-all hover:rotate-90 hover:border-neon-green hover:shadow-neon-green"
        >
          <svg
            width="20"
            height="20"
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

        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            className={`font-mono text-2xl transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } ${active === s.id ? "text-neon-green text-glow" : "text-ink"}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </header>
  );
}
