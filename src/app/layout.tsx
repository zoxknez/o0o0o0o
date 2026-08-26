import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://o0o0o0o.com'),
  title: {
    default: 'o0o0o0o - IT Blog',
    template: '%s | o0o0o0o',
  },
  description: 'Najsavremeniji IT blog na srpskom. Tutorijali, programi, operativni sistemi, vesti, igre i zabava - sve na jednom mestu.',
  keywords: ['IT blog', 'tutorijali', 'linux', 'windows', 'programiranje', 'software', 'vesti', 'tehnologija'],
  authors: [{ name: 'o0o0o0o tim' }],
  creator: 'o0o0o0o',
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    siteName: 'o0o0o0o',
    title: 'o0o0o0o - IT Blog',
    description: 'Najsavremeniji IT blog na srpskom. Tutorijali, programi, operativni sistemi i više.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'o0o0o0o - IT Blog',
    description: 'Najsavremeniji IT blog na srpskom.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#00d4ff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      {/* Next.js automatically injects the <head> element. */}
      <body>
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
