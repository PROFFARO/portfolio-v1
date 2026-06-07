"use client";

import { useEffect, useState, type ReactNode } from "react";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import MatrixRain from "./MatrixRain";
import EasterEggs from "./EasterEggs";
import SocialLinks from "./SocialLinks";

export default function ClientShell({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);

  // lock scroll during boot
  useEffect(() => {
    document.body.style.overflow = booted ? "" : "hidden";
  }, [booted]);

  return (
    <>
      {!booted && <Preloader onDone={() => setBooted(true)} />}
      <CustomCursor />
      <EasterEggs />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <MatrixRain opacity={0.07} />
      </div>

      <div
        className={`relative z-10 transition-opacity duration-1000 ${
          booted ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <SocialLinks variant="rail" />
        <main>{children}</main>
      </div>
    </>
  );
}
