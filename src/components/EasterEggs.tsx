"use client";

import { useEffect, useRef, useState } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const HACK_LINES = [
  "> root access detected ...",
  "> bypassing firewall [████████] 100%",
  "> decrypting hidden payload ...",
  "> ACHIEVEMENT UNLOCKED: 1337 H4X0R",
  "> you found the secret. nice. — Dayananda",
];

export default function EasterEggs() {
  const seq = useRef<string[]>([]);
  const [show, setShow] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI.length);
      if (KONAMI.every((k, i) => k.toLowerCase() === seq.current[i]?.toLowerCase())) {
        setShow(true);
        setLines([]);
        HACK_LINES.forEach((l, i) =>
          setTimeout(() => setLines((p) => [...p, l]), i * 600)
        );
        setTimeout(() => setShow(false), HACK_LINES.length * 600 + 2500);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // click particle burst
  useEffect(() => {
    const burst = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, input, textarea")) return;
      const colors = ["#00ff88", "#00d4ff", "#7b2fff"];
      for (let i = 0; i < 10; i++) {
        const p = document.createElement("span");
        const angle = (Math.PI * 2 * i) / 10;
        const dist = 30 + Math.random() * 30;
        p.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:5px;height:5px;border-radius:50%;background:${
          colors[i % 3]
        };pointer-events:none;z-index:9998;transition:transform .6s ease-out,opacity .6s ease-out;`;
        document.body.appendChild(p);
        requestAnimationFrame(() => {
          p.style.transform = `translate(${Math.cos(angle) * dist}px, ${
            Math.sin(angle) * dist
          }px) scale(0)`;
          p.style.opacity = "0";
        });
        setTimeout(() => p.remove(), 650);
      }
    };
    window.addEventListener("click", burst);
    return () => window.removeEventListener("click", burst);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-[min(90vw,520px)] rounded-lg border border-neon-purple/50 bg-black/90 p-6 font-mono text-sm shadow-neon-purple">
        <div className="mb-3 text-neon-purple">/// CLASSIFIED TERMINAL ///</div>
        {lines.map((l, i) => (
          <div key={i} className="text-neon-green/90">
            {l}
          </div>
        ))}
        <span className="inline-block h-4 w-2 animate-pulse bg-neon-green align-middle" />
      </div>
    </div>
  );
}
