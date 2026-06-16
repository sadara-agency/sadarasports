'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ELECTRIC = '22, 41, 226';    // #1629e2
const ELECTRIC_HI = '62, 80, 255'; // #3e50ff

/**
 * Version 4 — "Final" backdrop.
 *
 * Three electric-blue aurora blobs on **fixed, symmetric, predictable paths**
 * (no randomness). Each blob travels a slow oval orbit so the gradient field
 * feels alive but never chaotic — consistent, premium.
 *
 * Also adds film-grain texture (same as V1).
 * Decorative: pointer-events-none, aria-hidden, behind hero content.
 * Reduced-motion → blobs render static.
 */
export function HeroBackdrop_v4() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">

      {/* Blob A — top-left, slow clockwise oval. */}
      <motion.div
        className="absolute h-[65vh] w-[65vh] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(closest-side, rgba(${ELECTRIC_HI}, 0.26) 0%, rgba(${ELECTRIC}, 0.10) 55%, transparent 80%)`,
          top: '10%',
          left: '12%',
        }}
        animate={reduce ? undefined : {
          x: [0, 60, 60, 0, -60, -60, 0],
          y: [0, -30, 30, 60, 30, -30, 0],
        }}
        transition={reduce ? undefined : {
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.17, 0.33, 0.5, 0.67, 0.83, 1],
        }}
      />

      {/* Blob B — right-center, counter-clockwise, larger, more opacity. */}
      <motion.div
        className="absolute h-[78vh] w-[78vh] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(closest-side, rgba(${ELECTRIC}, 0.28) 0%, rgba(${ELECTRIC}, 0.10) 50%, transparent 78%)`,
          top: '25%',
          right: '4%',
        }}
        animate={reduce ? undefined : {
          x: [0, -50, -50, 0, 50, 50, 0],
          y: [0, 40, -40, -60, -40, 40, 0],
        }}
        transition={reduce ? undefined : {
          duration: 34,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.17, 0.33, 0.5, 0.67, 0.83, 1],
        }}
      />

      {/* Blob C — bottom-center, slow vertical bob. */}
      <motion.div
        className="absolute h-[52vh] w-[52vh] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(closest-side, rgba(${ELECTRIC_HI}, 0.20) 0%, rgba(${ELECTRIC}, 0.08) 55%, transparent 80%)`,
          bottom: '0%',
          left: '38%',
        }}
        animate={reduce ? undefined : {
          x: [0, 40, 0, -40, 0],
          y: [0, -25, -50, -25, 0],
        }}
        transition={reduce ? undefined : {
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      />

      {/* Film grain — faint texture over the field. */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
}
