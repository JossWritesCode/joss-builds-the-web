import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        dracula: {
          // neutrals
          bg: "#f8f8fa",
          surface: "#ffffff",
          text: "#20232f",
          muted: "#667085",
          border: "#e6e8ee",
          ink: "#0f172a", // deep anchor for icons/dividers when needed
          // brand purples (light → dark)
          accentLight: "#C7BDFE", // decorative only (gradients, glows)
          accent: "#8B5CF6", // primary brand (links, filled buttons) — AA on #f8f8fa
          accentDark: "#6D28D9", // high-contrast (active/pressed, text on light)
          highlightLight: "#E9B4FF",
          highlight: "#C026D3", // AA on #f8f8fa for large text/icons; use decoratively for small text
          success: "#22C55E",
        },
      },

      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
