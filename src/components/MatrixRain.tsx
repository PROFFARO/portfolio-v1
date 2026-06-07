"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain({ opacity = 0.12 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const chars = "01░▒█アカサタナハマヤラワ0123ABCDEF<>/{}#$%";
    let columns = 0;
    let drops: number[] = [];
    let raf: number;
    let last = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / 16);
      drops = Array(columns).fill(1);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);
      if (ts - last < 55) return;
      last = ts;
      ctx.fillStyle = "rgba(5,5,10,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = drops[i] * 16;
        ctx.fillStyle = Math.random() > 0.975 ? "#00d4ff" : "#00ff88";
        ctx.fillText(text, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden
    />
  );
}
