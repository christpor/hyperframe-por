import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sr: {
          ink: "#131109",
          "ink-2": "rgba(19, 17, 9, 0.62)",
          "ink-3": "rgba(19, 17, 9, 0.42)",
          line: "rgba(19, 17, 9, 0.14)",
          glass: "rgba(247, 236, 211, 0.65)",
          chip: "rgba(255, 255, 255, 0.42)",
          pill: "#131109",
          "pill-ink": "#f4f1ea",
          warm: "#f7ecd3",
          card: "rgba(255, 250, 242, 0.72)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
