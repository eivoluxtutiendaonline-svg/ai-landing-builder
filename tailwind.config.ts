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
          50: "#f7f7ff",
          100: "#ebeafc",
          200: "#d9d7f7",
          300: "#c0b9ef",
          400: "#9b8ee3",
          500: "#7e6bd3",
          600: "#6a52c0",
          700: "#5941a4",
          800: "#483784",
          900: "#3c2f6a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
