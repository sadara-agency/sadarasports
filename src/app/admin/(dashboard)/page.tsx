import Link from 'next/link';

const CARDS = [
  { href: '/admin/docs/home', title: 'Home', desc: 'Hero, pillars, proof stats, CTAs.' },
  { href: '/admin/docs/nav', title: 'Navigation & Footer', desc: 'Menu, audiences, footer columns.' },
  { href: '/admin/pages', title: 'Pages', desc: 'Build custom pages from blocks.' },
  { href: '/admin/athletes', title: 'Athletes', desc: 'Roster profiles, stats, photos.' },
  { href: '/admin/articles', title: 'Articles & News', desc: 'Insights feed items.' },
  { href: '/admin/roles', title: 'Open Roles', desc: 'Careers listings.' },
  { href: '/admin/docs/images', title: 'Images', desc: 'Hero & section imagery.' },
  { href: '/admin/inbox', title: 'Contact Inbox', desc: 'Form submissions.' },
];

export default function AdminHome() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="mt-1 text-white/55">Pick a section to edit. Changes go live within seconds of saving.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#3C3CFA]/50 hover:bg-white/[0.05]"
          >
            <h2 className="font-medium">{c.title}</h2>
            <p className="mt-1 text-sm text-white/50">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
