import { cn } from '@/lib/cn';

/** The Sadara four-point burst emblem — inline so it can be tinted (currentColor). */
export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 71 72" fill="none" className={cn('h-8 w-8', className)} aria-hidden="true">
      <path
        d="M68.4451 35.1082V36.4741C52.4595 37.659 39.8649 51.0033 39.8649 67.2906C39.8649 67.8852 39.8821 68.4798 39.9166 69.0658C39.9166 69.1218 39.9209 69.1778 39.9252 69.2338H38.6627C38.6627 69.2338 38.6627 69.2166 38.6627 69.208C38.7489 68.273 38.792 67.325 38.792 66.3599C38.792 49.2927 24.9564 35.4529 7.8893 35.4529C6.0753 35.4529 4.30009 35.6124 2.57227 35.914V34.8282C18.769 33.8587 31.6049 20.4196 31.6049 3.98156C31.6049 3.92554 31.6049 3.86953 31.6049 3.8092H32.8415C32.8372 4.0548 32.8329 4.30471 32.8329 4.55032C32.8329 21.6174 46.6685 35.4529 63.7399 35.4529C65.3385 35.4529 66.9112 35.3323 68.4494 35.0996L68.4451 35.1082Z"
        fill="currentColor"
      />
      <path d="M70.9615 24.5687C66.9759 12.293 56.7209 2.8438 43.9712 0C47.513 12.5472 57.9662 22.1946 70.9615 24.5687Z" fill="currentColor" />
      <path d="M0 44.2169C3.18851 58.13 14.2492 69.0398 28.2485 72C25.6373 57.7724 14.3052 46.5954 0 44.2169Z" fill="currentColor" />
      <path d="M51.3911 69.4014C60.2715 65.2865 67.2389 57.7375 70.5825 48.4564C61.5383 52.3386 54.4891 59.9738 51.3911 69.4014Z" fill="currentColor" />
      <path d="M20.2987 2.58069C11.8621 6.53615 5.17056 13.5896 1.69336 22.2848C10.2765 18.5404 17.0413 11.4094 20.2987 2.58069Z" fill="currentColor" />
    </svg>
  );
}

/** Full lockup. `tone` controls wordmark color for dark (over-photo) vs light headers.
 *  `size` controls the icon and text scale: 'sm' = default, 'lg' = homepage. */
export function Logo({
  className,
  withWordmark = true,
  tone = 'ink',
  size = 'sm',
}: {
  className?: string;
  withWordmark?: boolean;
  tone?: 'ink' | 'paper';
  size?: 'sm' | 'lg';
}) {
  const word = tone === 'paper' ? 'text-white' : 'text-ink';
  const sub = tone === 'paper' ? 'text-white/70' : 'text-faint';
  const mark = tone === 'paper' ? 'text-white' : 'text-electric';
  const iconSize = size === 'lg' ? 'h-10 w-10' : 'h-7 w-7';
  const wordSize = size === 'lg' ? 'text-[20px]' : 'text-[15px]';
  const subSize = size === 'lg' ? 'text-[13px]' : 'text-[11px]';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoIcon className={cn(iconSize, mark)} />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className={cn('font-extrabold tracking-tight', wordSize, word)}>Sadara</span>
          <span className={cn('font-ar font-medium', subSize, sub)}>صدارة الرياضية</span>
        </span>
      )}
    </span>
  );
}
