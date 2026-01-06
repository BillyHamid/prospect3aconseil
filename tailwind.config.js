/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        'deep-navy': '#0F172A',
        'accent-blue': '#2563EB',
        'off-white': '#F9FAFB',
        'navy-blue': '#1e3a8a',
        'gold': '#d4af37',
      },
      borderRadius: {
        'lg': '8px',
      }
    },
  },
  plugins: [],
}