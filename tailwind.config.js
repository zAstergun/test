/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        aster: {
          beige: {
            DEFAULT: "#f8f5e6",
            dark: "#e1dac8",
          },
          dark: {
            DEFAULT: "#1a1a2e",
            lighter: "#22223a",
          },
          accent: {
            DEFAULT: "#6c63ff",
            light: "#a29bfe",
            dark: "#4834d4",
          },
          mint: "#00cec9",
        },
      },
      boxShadow: {
        cel: "5px 5px 0px 0px rgba(0,0,0,1)",
        "cel-sm": "3px 3px 0px 0px rgba(0,0,0,1)",
        "cel-accent": "5px 5px 0px 0px rgba(108,99,255,0.6)",
      },
      animation: {
        "bounce-subtle": "bounceSubtle 0.3s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        bounceSubtle: {
          "0%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(108,99,255,0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(108,99,255,0.6)" },
        },
      },
    },
  },
  plugins: [],
};
