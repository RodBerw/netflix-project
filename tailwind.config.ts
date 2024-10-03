import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|dropdown|input|ripple|spinner|menu|divider|popover).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "#141414",
        primary: "white",
        secondary: "#e50914",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
