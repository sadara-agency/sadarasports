import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function ComingSoon({
  backHref = '/',
  backLabel = 'Go home',
  title = 'Coming soon.',
  lead = "We're working on this. Check back shortly.",
  kicker = 'In progress',
}: {
  backHref?: string;
  backLabel?: string;
  title?: string;
  lead?: string;
  kicker?: string;
}) {
  return (
    <main className="relative isolate flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-navy px-6 text-center">
      {/* subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-electric) 1px, transparent 1px), linear-gradient(90deg, var(--color-electric) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <span className="font-mono text-xs uppercase tracking-[0.25em] text-electric">{kicker}</span>

      <h1 className="mt-5 max-w-xl text-4xl font-extrabold text-white md:text-5xl">{title}</h1>

      <p className="mt-5 max-w-md text-base text-white/60">{lead}</p>

      <div className="mt-10">
        <Button href={backHref} variant="secondary" size="md">
          {backLabel}
        </Button>
      </div>
    </main>
  );
}
