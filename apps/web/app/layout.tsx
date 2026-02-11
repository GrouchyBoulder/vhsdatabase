import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'VHS Collector Database',
  description: 'TMDb/Letterboxd-style VHS collector graph in Nostalgia Maxxer Studios theme.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scanlines min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
