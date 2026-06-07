"use client";

import { useEffect } from "react";
import { useScramble } from "@/hooks/useScramble";
import { useReveal } from "@/hooks/useReveal";

type Props = {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/** Reveals text with a "decrypt" scramble when scrolled into view. */
export default function ScrambleText({ text, className = "", as = "span" }: Props) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const { output, run } = useScramble(text);
  const Tag = as as any;

  useEffect(() => {
    if (visible) run();
  }, [visible, run]);

  return (
    <Tag
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: output }}
    />
  );
}
