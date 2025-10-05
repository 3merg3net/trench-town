import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'ui-sans-serif', 'system-ui'],
        inter: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        trench: "url('/images/landing-bg.png')",
      },
    },
  },
  plugins: [],
}
export default config

