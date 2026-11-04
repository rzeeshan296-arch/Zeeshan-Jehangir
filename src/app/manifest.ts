import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Zeeshan Jehangir — SEO & AI Digital Growth', short_name: 'Zeeshan J.', description: 'Personal portfolio of Zeeshan Jehangir.', start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#102A56', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }] };
}
