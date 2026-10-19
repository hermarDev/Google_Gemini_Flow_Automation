/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          background: '#09090b',
          panel: '#18181b',
          subtle: '#27272a',
          hover: '#3f3f46',
        },
        primary: {
          text: '#f4f4f5',
        },
        secondary: {
          text: '#a1a1aa',
        },
        muted: {
          text: '#71717a',
        },
        border: {
          subtle: '#27272a',
          muted: '#3f3f46',
          focus: '#3b82f6',
        },
        brand: {
          primary: '#2563eb',
          primaryHover: '#1d4ed8',
          primaryActive: '#1e40af',
          accent: '#60a5fa',
        },
        status: {
          idle: '#71717a',
          rendering: '#60a5fa',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#f43f5e',
        },
        zinc: {
          950: '#09090b',
          900: '#18181b',
          800: '#27272a',
          700: '#3f3f46',
          500: '#71717a',
          400: '#a1a1aa',
          100: '#f4f4f5',
        },
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
      },
    },
  },
  plugins: [],
};
