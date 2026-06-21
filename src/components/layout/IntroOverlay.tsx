'use client';

import { useEffect, useState } from 'react';
import { SadaraLogo } from './SadaraLogo';
import './intro.css';

/**
 * One-time cinematic logo intro. Plays once per browser session.
 *
 * No-flash: an inline <head> script (see app/layout.tsx) reads the
 * sessionStorage flag before first paint and sets
 * document.documentElement.dataset.intro = "seen" | "show". CSS hides the
 * overlay instantly when "seen". This component reads the same flag, plays
 * when "show", writes the flag, then unmounts after the lift finishes.
 *
 * The overlay is position:fixed on top of the already server-rendered page —
 * it never gates the homepage, so LCP/SEO are unaffected.
 */
export function IntroOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== 'show') return;
    // Mark seen immediately so internal nav / back button never replays it.
    try {
      sessionStorage.setItem('sadara_intro_seen', '1');
    } catch {
      /* sessionStorage unavailable (private mode) — still play this once */
    }
    document.documentElement.dataset.intro = 'seen';
    setShow(true);
  }, []);

  if (!show) return null;

  // Unmount when the lift (or reduced-motion fade) animation completes on the root.
  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setShow(false);
  };

  return (
    <div
      className="sl-intro"
      role="presentation"
      aria-hidden="true"
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="sl-slab" />
      <div className="sl-wipe">
        <SadaraLogo className="sl-logo" />
      </div>
    </div>
  );
}
