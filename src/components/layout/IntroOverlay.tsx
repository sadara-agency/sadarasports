'use client';
import { SadaraLogo } from './SadaraLogo';
import './intro.css';

export function IntroOverlay() {
  return (
    <div className="sl-intro" role="presentation" aria-hidden="true">
      <div className="sl-slab" />
      <div className="sl-wipe">
        <SadaraLogo className="sl-logo" />
      </div>
    </div>
  );
}
