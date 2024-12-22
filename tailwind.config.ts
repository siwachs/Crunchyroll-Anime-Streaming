import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: { "15": "3.75rem", "4.5": "1.125rem", "7.5": "1.875rem" },
      screens: {
        sm: "568px",
        "2sm": "680px",
        md: "800px",
        "2md": "980px",
        xl: "1440px",
        "2xl": "1720px",
        "3xl": "2160px",
      },
      lineHeight: { "leading-4.5": "1.125rem", "leading-6.5": "1.625rem" },
      transitionTimingFunction: { quick: "ease" },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".app-transition-colors": {},
      });
    }),
  ],
};

export default config;
