'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Version 2 — "Magnetic" backdrop (medium / interactive).
 *
 * A soft electric-blue spotlight that follows the cursor across the dark field,
 * making the background feel alive as the guest moves the mouse. Spring-smoothed
 * so it trails the pointer gently. Pure framer-motion, no new deps.
 *
 * Falls back to a centered static glow when: reduced-motion, or no pointer events
 * fire (touch / keyboard-only). Decorative: pointer-events-none, aria-hidden.
 *
 * Direction-agnostic — tracks absolute viewport coordinates, identical LTR/RTL.
 */
const ELECTRIC_HI = '62, 80, 255'; // #3e50ff
const ELECTRIC = '22, 41, 226'; // #1629e2

export function HeroBackdrop_v2() {
  const reduce = useReducedMotion();

  // Start centred; spring toward the pointer.
  const x = useMotionValue(0.7);
  const y = useMotionValue(0.4);
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return; // skip touch
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, x, y]);

  const left = useSpringPercent(sx);
  const top = useSpringPercent(sy);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Static base wash so the field is never flat black. */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 90% 70% at 70% 40%, rgba(${ELECTRIC}, 0.12), transparent 100%)` }}
      />
      {/* Cursor-tracking spotlight. */}
      <motion.div
        className="absolute h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          left,
          top,
          background: `radial-gradient(closest-side, rgba(${ELECTRIC_HI}, 0.28) 0%, rgba(${ELECTRIC}, 0.12) 45%, transparent 78%)`,
        }}
      />
    </div>
  );
}

// Map a 0..1 motion value to a "NN%" string for CSS positioning.
function useSpringPercent(mv: ReturnType<typeof useSpring>) {
  const out = useMotionValue('70%');
  useEffect(() => {
    const update = (v: number) => out.set(`${(v * 100).toFixed(2)}%`);
    update(mv.get());
    const unsub = mv.on('change', update);
    return unsub;
  }, [mv, out]);
  return out;
}
