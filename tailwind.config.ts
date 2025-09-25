import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        dracula: {
          bg: "#f8f8fa",
          text: "#282a36",
          accent: "#bd93f9",
          accent2: "#50fa7b",
          highlight: "#ff79c6",
          muted: "#6272a4",
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
