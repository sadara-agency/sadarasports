'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { browserClient } from '@/lib/supabase/browser';
import { cn } from '@/lib/cn';
import { useAdminPrefs } from './AdminPrefsContext';

const AR: Record<string, string> = {
  Content: 'المحتوى',
  Lists: 'القوائم',
  Home: 'الرئيسية',
  'Navigation & Footer': 'التنقل والتذييل',
  Talent: 'المواهب',
  Advisory: 'الاستشارات',
  Markets: 'الأسواق',
  Institution: 'المؤسسة',
  Network: 'الشبكة',
  Careers: 'الوظائف',
  'Insights & Press': 'الرؤى والصحافة',
  Contact: 'التواصل',
  Images: 'الصور',
  Analytics: 'التحليلات',
  Pages: 'الصفحات',
  Athletes: 'الرياضيون',
  'Articles & News': 'المقالات والأخبار',
  'Open Roles': 'الوظائف المتاحة',
  'Media Library': 'مكتبة الوسائط',
  'Activity Log': 'سجل النشاط',
  'Contact Inbox': 'صندوق التواصل',
  'Content management': 'إدارة المحتوى',
  'View live site': 'عرض الموقع',
  'Sign out': 'تسجيل الخروج',
};

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
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/athletes', label: 'Athletes' },
  { href: '/admin/articles', label: 'Articles & News' },
  { href: '/admin/roles', label: 'Open Roles' },
  { href: '/admin/media', label: 'Media Library' },
  { href: '/admin/audit', label: 'Activity Log' },
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
  const { locale, setLocale, theme, setTheme } = useAdminPrefs();

  const dark = theme === 'dark';
  const ar = locale === 'ar';
  const tr = (s: string) => (ar ? (AR[s] ?? s) : s);

  async function signOut() {
    await browserClient().auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div
      dir={ar ? 'rtl' : 'ltr'}
      data-theme={theme}
      className={cn('admin-shell min-h-screen', ar ? 'font-ar' : 'font-en')}
      style={{ background: 'var(--adm-bg)', color: 'var(--adm-text)' }}
    >
      <div className="flex">
        <aside
          className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-e"
          style={{ background: 'var(--adm-surface)', borderColor: 'var(--adm-border)' }}
        >
          <div className="px-5 py-5">
            <Link href="/admin">
              <Image
                src={dark ? '/brand/logo-lockup-on-navy.svg' : '/brand/logo-lockup-blue.svg'}
                alt="Sadara"
                width={120}
                height={36}
                priority
              />
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 pb-6">
            <SectionLabel>{tr('Content')}</SectionLabel>
            {DOC_LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} active={pathname === l.href} label={tr(l.label)} />
            ))}
            <SectionLabel>{tr('Lists')}</SectionLabel>
            {LIST_LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} active={pathname.startsWith(l.href)} label={tr(l.label)} />
            ))}
          </nav>
          <div className="border-t p-4 text-xs adm-divider" style={{ borderColor: 'var(--adm-border)' }}>
            <div className="truncate" style={{ color: 'var(--adm-text-sm)' }}>{email}</div>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setLocale(ar ? 'en' : 'ar')}
                className="rounded px-2 py-1 text-[11px] font-mono font-semibold tracking-wider transition-colors"
                style={{ background: 'var(--adm-hover)', color: 'var(--adm-text)' }}
              >
                {ar ? 'EN' : 'AR'}
              </button>
              <button
                onClick={() => setTheme(dark ? 'light' : 'dark')}
                className="rounded px-2 py-1 text-[13px] transition-colors"
                style={{ background: 'var(--adm-hover)' }}
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {dark ? '☀️' : '🌙'}
              </button>
            </div>
            <button onClick={signOut} className="mt-2 hover:underline" style={{ color: 'var(--adm-danger)' }}>
              {tr('Sign out')}
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div
            className="flex items-center justify-between border-b px-8 py-4"
            style={{ borderColor: 'var(--adm-border)' }}
          >
            <span className="text-sm" style={{ color: 'var(--adm-text-sm)' }}>
              {tr('Content management')}
            </span>
            <a
              href="/en"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border px-3 py-1.5 text-sm transition-colors hover:opacity-80"
              style={{ borderColor: 'var(--adm-border-md)', color: 'var(--adm-text-md)' }}
            >
              {tr('View live site')} ↗
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
    <div
      className="px-3 pb-2 pt-5 font-mono text-[10px] uppercase tracking-[0.18em]"
      style={{ color: 'var(--adm-text-xs)' }}
    >
      {children}
    </div>
  );
}

function NavLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={cn('block rounded-lg px-3 py-2 text-sm transition-colors')}
      style={active
        ? { background: 'rgba(60,60,250,0.15)', color: 'var(--adm-accent)' }
        : { color: 'var(--adm-text-sm)' }
      }
    >
      {label}
    </Link>
  );
}
