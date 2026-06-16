'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { browserClient } from '@/lib/supabase/browser';
import { cn } from '@/lib/cn';

// Doc editors (one per content_docs key) + list managers + inbox.
const DOC_LINKS: { href: string; label: string }[] = [
  { href: '/admin/docs/home', label: 'Home' },
  { href: '/admin/docs/nav', label: 'Navigation & Footer' },
  { href: '/admin/docs/talent', label: 'Talent' },
  { href: '/admin/docs/advisory', label: 'Advisory' },
  { href: '/admin/docs/markets', label: 'Markets' },
  { href: '/admin/docs/institution', label: 'Institution' },
  { href: '/admin/docs/network', label: 'Network' },
  { href: '/admin/docs/careers', label: 'Careers' },
  { href: '/admin/docs/insights', label: 'Insights & Press' },
  { href: '/admin/docs/contact', label: 'Contact' },
  { href: '/admin/docs/images', label: 'Images' },
];

const LIST_LINKS = [
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/athletes', label: 'Athletes' },
  { href: '/admin/articles', label: 'Articles & News' },
  { href: '/admin/roles', label: 'Open Roles' },
  { href: '/admin/inbox', label: 'Contact Inbox' },
];

export function AdminShell({
  email,
  children,
}: {
  email: string | null;
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await browserClient().auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0c0e22] text-white">
      <div className="flex">
        <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#11132B]">
          <div className="px-5 py-5">
            <Link href="/admin">
              <Image
                src="/brand/logo-lockup-on-navy.svg"
                alt="Sadara"
                width={120}
                height={36}
                priority
              />
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 pb-6">
            <SectionLabel>Content</SectionLabel>
            {DOC_LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} active={pathname === l.href} label={l.label} />
            ))}
            <SectionLabel>Lists</SectionLabel>
            {LIST_LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} active={pathname.startsWith(l.href)} label={l.label} />
            ))}
          </nav>
          <div className="border-t border-white/10 p-4 text-xs text-white/50">
            <div className="truncate">{email}</div>
            <button onClick={signOut} className="mt-2 text-[#FF453A] hover:underline">
              Sign out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="flex items-center justify-between border-b border-white/10 px-8 py-4">
            <span className="text-sm text-white/50">Content management</span>
            <a
              href="/en"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/80 hover:bg-white/5"
            >
              View live site ↗
            </a>
          </div>
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 pb-2 pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
      {children}
    </div>
  );
}

function NavLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'block rounded-lg px-3 py-2 text-sm transition-colors',
        active ? 'bg-[#3C3CFA]/20 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white',
      )}
    >
      {label}
    </Link>
  );
}
