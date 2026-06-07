"use client";

import { useEffect, useRef, useState } from "react";

/** Counts from 0 -> target when `active` becomes true. */
export function useCounter(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>();
  const startTs = useRef<number>();

  useEffect(() => {
    if (!active) return;
    const step = (ts: number) => {
      if (startTs.current === undefined) startTs.current = ts;
      const progress = Math.min((ts - startTs.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current ?? 0);
  }, [active, target, duration]);

  return value;
}
