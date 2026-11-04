import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zeeshan Jehangir | SEO & AI Digital Growth Specialist',
  description: 'I help businesses grow through strategic SEO, Local SEO, AI automation, performance marketing and modern web solutions.',
  applicationName: 'Zeeshan Jehangir Portfolio',
  openGraph: {
    title: 'Zeeshan Jehangir — Turning Digital Challenges Into Measurable Growth',
    description: 'SEO & AI Digital Growth Specialist',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Zeeshan Jehangir | SEO & AI Digital Growth Specialist',
    description: 'Strategy. Search visibility. Digital growth.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Zeeshan Jehangir',
  jobTitle: 'SEO & AI Digital Growth Specialist',
  description: 'Digital growth specialist working across SEO, Local SEO, paid media, AI automation and web experiences.',
  sameAs: ['https://www.linkedin.com/in/zeeshanjehangir'],
  knowsAbout: ['Search Engine Optimization', 'Local SEO', 'Google Business Profile', 'Google Ads', 'Meta Ads', 'AI Automation', 'WordPress', 'Shopify'],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </body>
    </html>
  );
}
