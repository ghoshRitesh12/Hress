/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}',
    'content/**/*.md'
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          100: '#9ffca5',
          200: '#8DF894',
          300: '#65fc6f'
        },
        primary: {
          900: '#0e0e0e',
        },
      },
    },
  },
  plugins: [],
}

