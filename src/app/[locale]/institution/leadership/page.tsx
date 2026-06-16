import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { PeopleGrid } from '@/components/sections/PeopleGrid';
import { CTASection } from '@/components/sections/Blocks';
import { leadership, experts } from '@/content/institution';
import { images } from '@/content/images';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(leadership.title), description: tr(leadership.lead) };
}

export default async function LeadershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(leadership.kicker)}
        title={tr(leadership.title)}
        lead={tr(leadership.lead)}
        image={images.pageHero.institution}
        crumbs={[
          { label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
          { label: loc === 'ar' ? 'المؤسسة' : 'Institution', href: '/institution' },
          { label: loc === 'ar' ? 'القيادة' : 'Leadership' },
        ]}
      />
      <PeopleGrid locale={loc} people={leadership.people} />
      <PeopleGrid
        locale={loc}
        people={experts.people}
        heading={loc === 'ar' ? 'الخبراء والفريق الفني' : 'Experts & Technical Team'}
        subheading={loc === 'ar' ? 'منصّة التخصّص خلف التنفيذ.' : 'The specialist bench behind delivery.'}
      />
      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'انضمّ إلى المؤسسة.' : 'Join the institution.'}
        primary={{ label: loc === 'ar' ? 'الوظائف' : 'Careers', href: '/careers' }}
      />
    </>
  );
}
