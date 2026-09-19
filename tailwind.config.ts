import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1B2A4A",
        rust: "#C8622A",
        paper: "#FAF7F2",
      },
    },
  },
  plugins: [],
};
export default config;
