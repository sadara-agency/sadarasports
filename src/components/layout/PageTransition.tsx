'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';

/*
 * Full-screen page-transition overlay — fires on every route change.
 * Phase 1 (enter): overlay fades in + arc spins  →  ~400 ms
 * Phase 2 (exit):  overlay fades out             →  ~300 ms
 */
export function PageTransition() {
  const pathname = usePathname();
  const prev = useRef(pathname);
  const [phase, setPhase] = useState<'idle' | 'enter' | 'exit'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname === prev.current) return;
    prev.current = pathname;

    // Cancel any running timer.
    if (timerRef.current) clearTimeout(timerRef.current);

    setPhase('enter');

    // Hold the overlay briefly, then fade it out.
    timerRef.current = setTimeout(() => {
      setPhase('exit');
      timerRef.current = setTimeout(() => setPhase('idle'), 350);
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  if (phase === 'idle') return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-300"
      style={{
        opacity: phase === 'enter' ? 1 : 0,
        backdropFilter: 'blur(18px) brightness(0.45)',
        WebkitBackdropFilter: 'blur(18px) brightness(0.45)',
        backgroundColor: 'rgba(0,0,0,0.35)',
      }}
    >
      {/* Spinning arc ring + logo — centered */}
      <div className="relative flex items-center justify-center">
        <svg
          className="absolute animate-spin"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
        >
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="white"
            strokeOpacity="0.18"
            strokeWidth="1.5"
          />
          <path
            d="M28 4 A24 24 0 0 1 52 28"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <Logo tone="paper" size="sm" withWordmark={false} />
      </div>
    </div>
  );
}
