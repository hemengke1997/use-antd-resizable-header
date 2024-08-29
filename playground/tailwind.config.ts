import { type Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,html}'],
  corePlugins: {
    preflight: false,
  },
} as Config
