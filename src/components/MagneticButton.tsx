"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost";
  download?: boolean;
  target?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  download,
  target,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const ripple = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const circle = document.createElement("span");
    const d = Math.max(el.clientWidth, el.clientHeight);
    const rect = el.getBoundingClientRect();
    circle.style.cssText = `position:absolute;border-radius:50%;background:rgba(0,255,136,0.35);width:${d}px;height:${d}px;left:${
      e.clientX - rect.left - d / 2
    }px;top:${e.clientY - rect.top - d / 2}px;transform:scale(0);pointer-events:none;transition:transform .6s ease,opacity .6s ease;opacity:1;`;
    el.appendChild(circle);
    requestAnimationFrame(() => {
      circle.style.transform = "scale(2.5)";
      circle.style.opacity = "0";
    });
    setTimeout(() => circle.remove(), 600);
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md px-6 py-3 font-mono text-sm font-medium transition-[box-shadow,background] duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-neon-green/10 text-neon-green border border-neon-green/50 hover:shadow-neon-green hover:bg-neon-green/20"
      : "bg-transparent text-ink border border-white/20 hover:border-neon-blue/60 hover:text-neon-blue hover:shadow-neon-blue";

  const cls = `${base} ${styles} ${className}`;
  const handlers = {
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onClick: (e: MouseEvent) => {
      ripple(e);
      onClick?.();
    },
  };

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={cls}
        download={download}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        {...handlers}
      >
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} className={cls} {...handlers}>
      {children}
    </button>
  );
}
