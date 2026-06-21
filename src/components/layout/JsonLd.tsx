const SITE = 'https://www.sadarasport.sa';

/** Organization + WebSite structured data. Rendered once in the root layout. */
export function OrganizationJsonLd() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sadara Sports',
    alternateName: 'صدارة الرياضية',
    url: SITE,
    logo: `${SITE}/brand/logo-icon.png`,
    description:
      'An institution, not an agency. Sadara represents and develops athletes, advises clubs and federations, and connects markets — one institution, three strategic units.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Riyadh',
      addressCountry: 'SA',
    },
    areaServed: 'MENA',
    knowsLanguage: ['ar', 'en'],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sadara Sports',
    alternateName: 'صدارة الرياضية',
    url: SITE,
    inLanguage: ['ar', 'en'],
    publisher: { '@type': 'Organization', name: 'Sadara Sports', url: SITE },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  url: string;
  locale: string;
}

export function ArticleJsonLd({ headline, description, image, datePublished, url, locale }: ArticleJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    ...(image ? { image: image.startsWith('http') ? image : `${SITE}${image}` } : {}),
    ...(datePublished ? { datePublished } : {}),
    inLanguage: locale,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'Sadara Sports',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/brand/logo-icon.png` },
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface AthleteJsonLdProps {
  name: string;
  description: string;
  image?: string;
  jobTitle?: string;
  memberOf?: string;
  url: string;
}

export function AthleteJsonLd({ name, description, image, jobTitle, memberOf, url }: AthleteJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    description,
    ...(image ? { image: image.startsWith('http') ? image : `${SITE}${image}` } : {}),
    ...(jobTitle ? { jobTitle } : {}),
    ...(memberOf ? { memberOf: { '@type': 'SportsTeam', name: memberOf } } : {}),
    url,
    worksFor: { '@type': 'Organization', name: 'Sadara Sports', url: SITE },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
