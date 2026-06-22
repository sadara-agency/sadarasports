import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-navy px-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-electric) 1px, transparent 1px), linear-gradient(90deg, var(--color-electric) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <span className="font-mono text-xs uppercase tracking-[0.25em] text-electric">404</span>

      <h1 className="mt-5 max-w-xl text-4xl font-extrabold text-white md:text-5xl">Page not found.</h1>

      <p className="mt-5 max-w-md text-base text-white/60">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>

      <div className="mt-10">
        <Button href="/en" variant="secondary" size="md">
          Return home
        </Button>
      </div>
    </main>
  );
}
