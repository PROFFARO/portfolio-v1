import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      colors: {
        bg: {
          DEFAULT: "#05050a",
          soft: "#0a0a0f",
          card: "#0d0d16",
        },
        neon: {
          green: "#00ff88",
          blue: "#00d4ff",
          purple: "#7b2fff",
        },
        ink: "#e2e8f0",
        muted: "#8b93a7",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        display: ["var(--font-orbitron)", "var(--font-jetbrains)", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-green": "0 0 5px #00ff88, 0 0 20px rgba(0,255,136,0.4)",
        "neon-blue": "0 0 5px #00d4ff, 0 0 20px rgba(0,212,255,0.4)",
        "neon-purple": "0 0 5px #7b2fff, 0 0 20px rgba(123,47,255,0.4)",
      },
      keyframes: {
        "glitch-top": {
          "0%,100%": { clip: "rect(0,9999px,0,0)", transform: "translate(0)" },
          "5%": { clip: "rect(0,9999px,40px,0)", transform: "translate(-3px,-2px)" },
          "10%": { clip: "rect(0,9999px,10px,0)", transform: "translate(3px,2px)" },
          "15%": { clip: "rect(0,9999px,50px,0)", transform: "translate(-3px,1px)" },
        },
        "glitch-bottom": {
          "0%,100%": { clip: "rect(0,9999px,0,0)", transform: "translate(0)" },
          "5%": { clip: "rect(60px,9999px,90px,0)", transform: "translate(3px,2px)" },
          "10%": { clip: "rect(40px,9999px,70px,0)", transform: "translate(-3px,-2px)" },
          "15%": { clip: "rect(70px,9999px,100px,0)", transform: "translate(3px,-1px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 5px #00ff88, 0 0 15px rgba(0,255,136,0.3)" },
          "50%": { boxShadow: "0 0 10px #00ff88, 0 0 30px rgba(0,255,136,0.6)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "glitch-top": "glitch-top 2.5s infinite linear alternate-reverse",
        "glitch-bottom": "glitch-bottom 2s infinite linear alternate-reverse",
        scan: "scan 6s linear infinite",
        flicker: "flicker 3s infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
