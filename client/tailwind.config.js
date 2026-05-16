/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0F2C",
        accent: "#7B2FFF",
        highlight: "#00F5FF",
        background: "#12172B",
        textMain: "#FFFFFF",
        textMuted: "#C8C8D4",
        success: "#00D68F",
        error: "#FF3D57",
      },
      fontFamily: {
        heading: ['"Syne"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        accent: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
