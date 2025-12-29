import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f8f7f2",
          100: "#ede6d3",
          200: "#d8c79d",
          300: "#c2a965",
          400: "#b08d3e",
          500: "#9a7425",
          600: "#7a5a1d",
          700: "#5d4417",
          800: "#3f2f10",
          900: "#1f1a0a",
        },
        night: {
          900: "#050507",
          800: "#0a0a0f",
          700: "#0f1016",
          600: "#141722",
          500: "#1c1f2d",
        },
      },
      boxShadow: {
        glow: "0 10px 60px rgba(176, 141, 62, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
