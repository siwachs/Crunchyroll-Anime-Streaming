import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: { "15": "3.75rem", "4.5": "1.125rem" },
      screens: { sm: "568px", md: "800px", xl: "1440px" },
      lineHeight: { "leading-4.5": "1.125rem" },
      transitionTimingFunction: { quick: "ease" },
    },
  },
  plugins: [],
};
export default config;
