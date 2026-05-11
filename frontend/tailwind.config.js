import defaultConfig from 'tailwindcss/defaultConfig'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00D1FF", // Neon Blue
        secondary: "#020617", // Deep Dark Navy/Black
        accent: "#E2E8F0", // Silver/Slate
      },
    },
  },
  plugins: [],
}
