"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01ABCDEF$%&";

/**
 * "Decrypt"-style text scramble. Resolves a target string from random chars.
 */
export function useScramble(target: string, opts?: { auto?: boolean; speed?: number }) {
  const { auto = false, speed = 1 } = opts ?? {};
  const [output, setOutput] = useState(auto ? "" : target);
  const frame = useRef(0);
  const raf = useRef<number>();

  const run = useCallback(() => {
    const length = target.length;
    const queue = Array.from({ length }, (_, i) => ({
      from: CHARS[Math.floor(Math.random() * CHARS.length)],
      to: target[i],
      start: Math.floor(Math.random() * 20 * speed),
      end: Math.floor(Math.random() * 20 * speed) + 20 * speed,
      char: "",
    }));
    frame.current = 0;

    const tick = () => {
      let out = "";
      let done = 0;
      for (const q of queue) {
        if (frame.current >= q.end) {
          done++;
          out += q.to;
        } else if (frame.current >= q.start) {
          if (!q.char || Math.random() < 0.28) {
            q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          out += `<span class="text-neon-blue/70">${q.char}</span>`;
        } else {
          out += q.from === " " ? " " : "";
        }
      }
      setOutput(out);
      if (done < queue.length) {
        frame.current++;
        raf.current = requestAnimationFrame(tick);
      } else {
        setOutput(target);
      }
    };
    cancelAnimationFrame(raf.current ?? 0);
    raf.current = requestAnimationFrame(tick);
  }, [target, speed]);

  useEffect(() => {
    if (auto) run();
    return () => cancelAnimationFrame(raf.current ?? 0);
  }, [auto, run]);

  return { output, run };
}
