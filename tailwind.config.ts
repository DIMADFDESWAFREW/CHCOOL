import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.35)",
      },
      borderRadius: {
        xl2: "16px",
      },
      colors: {
        bg: "#0b1220",
        panel: "rgba(255,255,255,.04)",
        line: "rgba(255,255,255,.08)",
      },
    },
  },
  plugins: [],
};

export default config;
