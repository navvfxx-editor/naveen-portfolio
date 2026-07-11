/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05050700',
        obsidian: '#0A0A0C',
        charcoal: '#141417',
        graphite: '#1D1D22',
        ash: '#8A8A93',
        mist: '#E9E9EC',
        blood: '#8B14E1',
        'blood-dim': '#5B0DA6',
        ember: '#B24CFF',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        heading: ['"Archivo Black"', 'Oswald', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        'red-glow': 'radial-gradient(circle at 50% 0%, rgba(139,20,225,0.18), transparent 60%)',
      },
      boxShadow: {
        premium: '0 8px 40px -8px rgba(0,0,0,0.7)',
        'red-glow': '0 0 40px rgba(139,20,225,0.35)',
        glass: 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: 0.6 }, '100%': { transform: 'scale(1.9)', opacity: 0 } },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        floaty: 'floaty 5s ease-in-out infinite',
        pulseRing: 'pulseRing 1.8s cubic-bezier(0.2,0.6,0.4,1) infinite',
      },
    },
  },
  plugins: [],
}
