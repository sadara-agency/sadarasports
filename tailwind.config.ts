import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // CAA-faithful register: navy takes CAA's bold "crimson" slot (full-bleed
        // home + dark bands); electric blue is the action accent; paper/ink for
        // the light editorial interior.
        navy: { DEFAULT: '#11132B', deep: '#0B0D1F', soft: '#1A1D3A' },
        paper: '#FFFFFF',
        canvas: { DEFAULT: '#F7F7F4', 2: '#EFEFEA' },
        ink: { DEFAULT: '#0A0A0F', soft: '#16161D' },
        muted: '#52525B',
        faint: '#8A8A92',
        hairline: '#D8D8D2',
        electric: { DEFAULT: '#1629E2', hi: '#3E50FF', dim: '#1421A8' },
        ok: '#34C759',
        warn: '#FF9F0A',
        danger: '#FF453A',
      },
      fontFamily: {
        ar: ['var(--font-ar)', 'system-ui', 'sans-serif'],
        en: ['var(--font-en)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Oversized, tight-tracked editorial scale (CAA register).
        display: ['clamp(3rem, 6.5vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        h1: ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.6rem, 3vw, 2.4rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        h3: ['clamp(1.25rem, 2vw, 1.6rem)', { lineHeight: '1.18', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.05rem, 1.4vw, 1.3rem)', { lineHeight: '1.6' }],
        // CAA homepage pillar headlines (For Talent / For Brands / For Enterprise).
        pillar: ['clamp(2.4rem, 5.5vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.04em' }],
        'pillar-sm': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.04', letterSpacing: '-0.04em' }],
      },
      maxWidth: { wrap: '1280px', prose: '68ch' },
      borderRadius: { card: '10px' },
      transitionTimingFunction: { sadara: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'ken-burns': { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.06)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'ken-burns': 'ken-burns 16s ease-out both',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [typography],
};

export default config;
