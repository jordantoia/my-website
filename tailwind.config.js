/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'avo-black':   '#060904',
        'avo-dark':    '#0f1509',
        'avo-surface': '#18200f',
        'avo-border':  '#2c3d1c',
        'avo-muted':   '#576e38',
        'avo-green':   '#8aab58',
        'avo-flesh':   '#b8d46a',
        'avo-cream':   '#e2e9cc',
        'avo-dim':     '#8a9a6c',
      },
      fontFamily: {
        'display': ['var(--font-display)', 'sans-serif'],
        'body':    ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
