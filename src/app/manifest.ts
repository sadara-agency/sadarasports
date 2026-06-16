import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sadara Sports — صدارة الرياضية',
    short_name: 'Sadara',
    description: 'An institution, not an agency.',
    start_url: '/ar',
    display: 'browser',
    background_color: '#11132B',
    theme_color: '#1629E2',
    icons: [
      { src: '/brand/logo-icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
