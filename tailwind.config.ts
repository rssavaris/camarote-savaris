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
        gold: {
          100: "#FFF5CC",
          200: "#FFE699",
          300: "#FFD666",
          400: "#FFCC33",
          500: "#C9A84C",
          600: "#A68B3D",
          700: "#836D30",
          800: "#624E24",
          900: "#413017",
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C, #FFE699, #C9A84C)",
      },
      animation: {
        "glitter": "glitter 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
      },
      keyframes: {
        glitter: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #C9A84C, 0 0 10px #C9A84C" },
          "100%": { boxShadow: "0 0 20px #FFE699, 0 0 40px #C9A84C" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-gold": {
          "0%, 100%": { textShadow: "0 0 10px #C9A84C, 0 0 20px #C9A84C" },
          "50%": { textShadow: "0 0 20px #FFE699, 0 0 40px #C9A84C, 0 0 60px #C9A84C" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
