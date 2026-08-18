/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx,svelte,vue}"],
    theme: {
      extend: {
        colors: {
          forest: "#2D5016",
          stone: "#8B7355",
          golden: "#D4A853",
          cream: "#FAF7F2",
          text: "#1C1C1C",
        },
        fontFamily: {
          heading: ["Playfair Display", "serif"],
          body: ["Inter", "sans-serif"],
          stats: ["JetBrains Mono", "monospace"],
        },
      },
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: false,
    },
  };