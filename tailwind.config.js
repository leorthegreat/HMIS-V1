/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#0071e3',
        'apple-gray': {
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e6e6e6',
          300: '#d1d1d1',
          400: '#a8a8a8',
          500: '#737373',
          600: '#555555',
          700: '#363636',
          800: '#1d1d1d',
          900: '#0a0a0a',
        },
        primary: '#0071e3',
        secondary: '#f5f5f7',
        destructive: '#ff3b30',
        border: 'hsl(214.3 31.8% 91.4%)',
        input: 'hsl(214.3 31.8% 91.4%)',
        ring: '#0071e3',
        background: 'white',
        foreground: '#1d1d1f',
        'primary-foreground': 'white',
        'secondary-foreground': '#1d1d1f',
        'destructive-foreground': 'white',
        'muted-foreground': '#86868b',
        'accent-foreground': '#1d1d1f',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'San Francisco',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      boxShadow: {
        'apple-sm': '0 2px 5px -1px rgba(50, 50, 93, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.1)',
        'apple-md': '0 4px 6px -1px rgba(50, 50, 93, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'apple-lg': '0 10px 15px -3px rgba(50, 50, 93, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};