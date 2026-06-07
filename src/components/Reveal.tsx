"use client";

import { type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "scale" | "left" | "right";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const hidden =
    variant === "scale"
      ? "opacity-0 scale-95"
      : variant === "left"
      ? "opacity-0 -translate-x-8"
      : variant === "right"
      ? "opacity-0 translate-x-8"
      : "opacity-0 translate-y-8";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hidden
      } ${className}`}
    >
      {children}
    </div>
  );
}
