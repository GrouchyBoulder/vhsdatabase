import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#101014',
        card: '#1b1b24',
        neon: '#b026ff',
        crt: '#76ffdd'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(118,255,221,0.35), 0 0 24px rgba(176,38,255,0.25)'
      },
      fontFamily: {
        heading: ['"Courier Prime"', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
