import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F4F4F1",
        surface: "#FFFFFF",
        ink: "#17181C",
        muted: "#6B6E76",
        line: "#E5E4DE",
        accent: {
          DEFAULT: "#2540E6",
          hover: "#1B31C4",
          soft: "#ECEEFE",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
        content: "72rem",
      },
      boxShadow: {
        tile: "0 1px 2px rgba(23,24,28,0.04), 0 8px 24px -12px rgba(23,24,28,0.12)",
        "tile-hover":
          "0 2px 4px rgba(23,24,28,0.06), 0 18px 40px -16px rgba(37,64,230,0.28)",
      },
      keyframes: {
        "caret-blink": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
