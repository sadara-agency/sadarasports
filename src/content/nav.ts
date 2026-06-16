import type { Bi } from '@/lib/i18n';

export type NavChild = { label: Bi; href: string; desc?: Bi };
export type NavItem = { label: Bi; href: string; children?: NavChild[] };

// Primary navigation — mirrors the IA sitemap. Shallow by design; depth lives
// inside each section.
export const navItems: NavItem[] = [
  {
    label: { ar: 'المؤسسة', en: 'The Institution' },
    href: '/institution',
    children: [
      { label: { ar: 'من نحن', en: 'Who We Are' }, href: '/institution/about', desc: { ar: 'الأطروحة وقصة التأسيس', en: 'The thesis and founding story' } },
      { label: { ar: 'نموذج صدارة', en: 'The Sadara Model' }, href: '/institution/model', desc: { ar: 'مؤسسة واحدة، ثلاث وحدات', en: 'One institution, three units' } },
      { label: { ar: 'القيادة', en: 'Leadership' }, href: '/institution/leadership', desc: { ar: 'الفريق التنفيذي', en: 'The executive team' } },
      { label: { ar: 'الخبراء والفريق الفني', en: 'Experts & Technical Team' }, href: '/institution/experts', desc: { ar: 'منصة التخصص خلف التنفيذ', en: 'The specialist bench' } },
      { label: { ar: 'الحوكمة والحماية', en: 'Governance & Safeguarding' }, href: '/institution/governance', desc: { ar: 'حوكمة بمعايير اللجان والامتثال', en: 'Committee-grade governance & compliance' } },
      { label: { ar: 'الرؤية والأثر', en: 'Vision & Impact' }, href: '/institution/impact', desc: { ar: 'متوائمة مع رؤية 2030 و2034', en: 'Aligned to Vision 2030 & 2034' } },
    ],
  },
  {
    label: { ar: 'ما نقدمه', en: 'What We Do' },
    href: '/what-we-do',
    children: [
      { label: { ar: 'إدارة المواهب', en: 'Talent Management' }, href: '/talent', desc: { ar: 'نمثّل ونطوّر اللاعبين كأصول طويلة الأمد', en: 'Represent & develop athletes as long-term assets' } },
      { label: { ar: 'الاستشارات للأندية والاتحادات', en: 'Club & Federation Advisory' }, href: '/advisory', desc: { ar: 'نستشير المؤسسات — بأصول خفيفة', en: 'Advise institutions — asset-light' } },
      { label: { ar: 'الأسواق والشراكات', en: 'Markets & Partnerships' }, href: '/markets', desc: { ar: 'نتعامل ونربط — محرك النقد', en: 'Transact & connect — the cash engine' } },
    ],
  },
  { label: { ar: 'لاعبونا', en: 'Our Athletes' }, href: '/athletes' },
  { label: { ar: 'رؤى وأخبار', en: 'Insights & News' }, href: '/insights' },
  { label: { ar: 'الشبكة', en: 'The Network' }, href: '/network' },
  { label: { ar: 'الوظائف', en: 'Careers' }, href: '/careers' },
];

export const cta = {
  contact: { ar: 'تواصل معنا', en: 'Contact' },
  represented: { ar: 'كُن ممثَّلاً من صدارة', en: 'Be represented by Sadara' },
  briefing: { ar: 'اطلب إحاطة', en: 'Request a briefing' },
  partner: { ar: 'اشترك معنا', en: 'Partner with us' },
};

// Three audience quick-links surfaced from the homepage and nav.
export const audiences = [
  { key: 'athletes', label: { ar: 'اللاعبون والعائلات', en: 'Athletes & Families' }, href: '/talent/join', cta: cta.represented },
  { key: 'clubs', label: { ar: 'الأندية والاتحادات', en: 'Clubs & Federations' }, href: '/advisory/engage', cta: cta.briefing },
  { key: 'corporates', label: { ar: 'الشركات والوكلاء', en: 'Corporates & Agents' }, href: '/markets/connect', cta: cta.partner },
];

export const footer = {
  tagline: {
    ar: 'الثقافة أولاً، منظَّمة حسب ما نقوم به، مبنية لكل جمهور — معمار مؤسسة، لا وكالة.',
    en: 'Culture first, organised by what we do, built for every audience — the architecture of an institution, not an agency.',
  },
  columns: [
    {
      title: { ar: 'المؤسسة', en: 'Institution' },
      links: [
        { label: { ar: 'من نحن', en: 'Who We Are' }, href: '/institution/about' },
        { label: { ar: 'القيادة', en: 'Leadership' }, href: '/institution/leadership' },
        { label: { ar: 'الخبراء والفريق الفني', en: 'Experts & Technical Team' }, href: '/institution/experts' },
        { label: { ar: 'الحوكمة', en: 'Governance' }, href: '/institution/governance' },
        { label: { ar: 'الرؤية والأثر', en: 'Vision & Impact' }, href: '/institution/impact' },
      ],
    },
    {
      title: { ar: 'ما نقدمه', en: 'What We Do' },
      links: [
        { label: { ar: 'إدارة المواهب', en: 'Talent Management' }, href: '/talent' },
        { label: { ar: 'الاستشارات', en: 'Advisory' }, href: '/advisory' },
        { label: { ar: 'الأسواق والشراكات', en: 'Markets & Partnerships' }, href: '/markets' },
      ],
    },
    {
      title: { ar: 'المزيد', en: 'More' },
      links: [
        { label: { ar: 'لاعبونا', en: 'Our Athletes' }, href: '/athletes' },
        { label: { ar: 'رؤى وأخبار', en: 'Insights & News' }, href: '/insights' },
        { label: { ar: 'الوظائف', en: 'Careers' }, href: '/careers' },
        { label: { ar: 'تواصل', en: 'Contact' }, href: '/contact' },
      ],
    },
  ],
  legal: [
    { label: { ar: 'الحوكمة والحماية', en: 'Governance & Safeguarding' }, href: '/institution/governance' },
    { label: { ar: 'الخصوصية (PDPL)', en: 'Privacy (PDPL)' }, href: '/contact' },
    { label: { ar: 'الشروط', en: 'Terms' }, href: '/contact' },
    { label: { ar: 'إمكانية الوصول', en: 'Accessibility' }, href: '/contact' },
  ],
};
