'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const ELECTRIC = '22, 41, 226'; // #1629e2
const ELECTRIC_HI = '62, 80, 255'; // #3e50ff

/**
 * Version 3 — "Cinematic Entrance" backdrop (bold / wow).
 *
 * On load: a deep gradient mesh fades + zooms in, then a diagonal electric light
 * beam sweeps once across the navy, and the ambient glow "ignites" up to full.
 * After the entrance it settles into a slow, low-amplitude living gradient.
 *
 * Pure framer-motion (gated with useReducedMotion). Direction-agnostic.
 * Decorative: pointer-events-none, aria-hidden, behind hero content.
 */
export function HeroBackdrop_v3() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Mesh base — fades + zooms in on load. */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 75% 35%, rgba(${ELECTRIC}, 0.22), transparent 70%),
                       radial-gradient(ellipse 60% 70% at 25% 80%, rgba(${ELECTRIC_HI}, 0.16), transparent 72%)`,
        }}
        initial={reduce ? false : { opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduce ? undefined : { duration: 1.4, ease: EASE }}
      />

      {/* Living glow — ignites then breathes. */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[95vh] w-[75vh] blur-3xl"
        style={{
          background: `radial-gradient(closest-side, rgba(${ELECTRIC_HI}, 0.34) 0%, rgba(${ELECTRIC}, 0.14) 45%, transparent 80%)`,
        }}
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? { opacity: 0.8 } : { opacity: [0, 0.95, 0.65, 0.85] }}
        transition={reduce ? undefined : { duration: 6, times: [0, 0.35, 0.7, 1], ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 0 }}
      />

      {/* One-shot diagonal light beam sweep across the field. */}
      {!reduce && (
        <motion.div
          className="absolute inset-y-[-30%] w-[40vw] -skew-x-12"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${ELECTRIC_HI}, 0.18), rgba(255,255,255,0.06), transparent)`,
          }}
          initial={{ left: '-50%', opacity: 0 }}
          animate={{ left: ['-50%', '120%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, delay: 0.5, ease: EASE, times: [0, 0.15, 0.85, 1] }}
        />
      )}
    </div>
  );
}
