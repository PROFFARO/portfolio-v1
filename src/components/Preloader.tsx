"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "[ BOOT ] initializing secure kernel ...........  OK",
  "[ AUTH ] verifying biometric signature .......  OK",
  "[ NET  ] establishing encrypted tunnel .......  OK",
  "[ SCAN ] probing local subsystems ............  OK",
  "[ CRYPT] loading cipher modules ..............  OK",
  "[ DATA ] decrypting profile: PROFFARO ........  OK",
  "[ SYS  ] mounting portfolio.runtime ..........  OK",
  "[ DONE ] ACCESS GRANTED — welcome operator.",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setLines(LINES.slice(0, 1));
    setProgress(Math.round((1 / LINES.length) * 100));
    idx.current = 1;

    const id = setInterval(() => {
      const next = LINES[idx.current];
      if (next !== undefined) {
        setLines((prev) => [...prev, next]);
        setProgress(Math.round(((idx.current + 1) / LINES.length) * 100));
        idx.current++;
      } else {
        clearInterval(id);
        setTimeout(() => setExit(true), 500);
        setTimeout(onDone, 1100);
      }
    }, 320);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-opacity duration-500 ${
        exit ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative w-[min(92vw,640px)] rounded-lg border border-neon-green/30 bg-black/70 p-5 font-mono text-xs shadow-neon-green sm:text-sm">
        <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-neon-green/80" />
          <span className="ml-2 text-muted">root@proffaro: ~/secure-boot</span>
        </div>
        <div className="min-h-[200px] space-y-1">
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l?.includes("ACCESS GRANTED")
                  ? "text-neon-green text-glow"
                  : "text-neon-green/80"
              }
            >
              <span className="text-neon-blue">$</span> {l}
            </div>
          ))}
          <span className="inline-block h-4 w-2 animate-pulse bg-neon-green align-middle" />
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[10px] text-muted">
            <span>DECRYPTING SYSTEM</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-neon-green to-neon-blue transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
