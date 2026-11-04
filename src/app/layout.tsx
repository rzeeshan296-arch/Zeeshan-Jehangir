import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Zeeshan Jehangir | SEO & AI Digital Growth Specialist', description: 'I help businesses grow through strategic SEO, Local SEO, AI automation, performance marketing and modern web solutions.', openGraph: { title: 'Zeeshan Jehangir — Turning Digital Challenges Into Measurable Growth', description: 'SEO & AI Digital Growth Specialist', type: 'website' } };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
